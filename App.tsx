import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  Modal,
  Pressable,
} from 'react-native'

import {
  ViroARSceneNavigator,
} from '@reactvision/react-viro'

import DescarteARScene from './src/ar/DescarteARScene'

import {
  QuizManager,
  embaralhar,
  type Resumo,
} from './src/quiz/QuizManager'

import {
  BANCOS,
} from './src/data/residuos'

import {
  type DestinoId,
} from './src/data/lixeiras'

import {
  TelaIdentificacao,
  TelaPreparo,
  TelaResultado,
  HudQuiz,
  Feedback,
} from './src/ui/telas'

type Etapa =
  | 'identificacao'
  | 'preparo'
  | 'quiz'
  | 'resultado'

type EstadoFeedback = {
  acerto: boolean
  escolhido: DestinoId
  correto: DestinoId
  justificativa: string
}

const DURACAO_FEEDBACK_MS = 2600

export default function App() {
  /*
   * TODOS os hooks ficam aqui em cima,
   * antes de qualquer return condicional.
   */
  const [etapa, setEtapa] =
    useState<Etapa>('identificacao')

  const [feedback, setFeedback] =
    useState<EstadoFeedback | null>(null)

  const [resumo, setResumo] =
    useState<Resumo | null>(null)

  const [modalSairVisivel, setModalSairVisivel] =
    useState(false)

  /*
   * true depois que a cena AR detectou o QR
   * de âncora e posicionou as lixeiras.
   */
  const [marcadorEncontrado, setMarcadorEncontrado] =
    useState(false)

  /*
   * Só força o React a atualizar
   * quando o QuizManager muda.
   * NÃO usar como key do Viro.
   */
  const [, setVersao] = useState(0)

  const quiz =
    useRef<QuizManager | null>(null)

  const travado = useRef(false)

  const feedbackTimeout =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    )

  const iniciar = useCallback(
    async (
      participante: string,
      banco: 'A' | 'B',
    ) => {
      if (Platform.OS === 'android') {
        const permissao =
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          )

        if (
          permissao !==
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          Alert.alert(
            'Câmera bloqueada',
            'O app precisa da câmera para utilizar a realidade aumentada. Libere a permissão nas configurações do sistema.',
          )

          return
        }
      }

      const itens = embaralhar(BANCOS[banco])

      quiz.current = new QuizManager(
        itens,
        banco,
        participante,
      )

      quiz.current.iniciar()

      setEtapa('preparo')
    },
    [],
  )

  const abrirCamera = useCallback(() => {
    setMarcadorEncontrado(false)
    setEtapa('quiz')
  }, [])

  const finalizar = useCallback(() => {
    if (!quiz.current) {
      return
    }

    setResumo(quiz.current.resumo())

    setEtapa('resultado')
  }, [])

  const voltarInicio = useCallback(() => {
    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current)

      feedbackTimeout.current = null
    }

    quiz.current = null
    travado.current = false

    setFeedback(null)
    setResumo(null)
    setMarcadorEncontrado(false)
    setModalSairVisivel(false)

    setEtapa('identificacao')
  }, [])

  const selecionarDestino = useCallback(
    (destino: DestinoId) => {
      const q = quiz.current

      if (!q || travado.current || q.finalizado) {
        return
      }

      const item = q.atual

      if (!item) {
        return
      }

      console.log(
        '[QUIZ] Destino selecionado:',
        destino,
      )

      const { acerto, justificativa } =
        q.responder(destino)

      travado.current = true

      setFeedback({
        acerto,
        escolhido: destino,
        correto: item.destinoCorreto,
        justificativa,
      })

      feedbackTimeout.current = setTimeout(() => {
        travado.current = false

        feedbackTimeout.current = null

        setFeedback(null)

        setVersao((v) => v + 1)

        if (q.finalizado) {
          finalizar()
        }
      }, DURACAO_FEEDBACK_MS)
    },
    [finalizar],
  )

  const pular = useCallback(() => {
    const q = quiz.current

    if (
      !marcadorEncontrado ||
      !q ||
      travado.current ||
      q.finalizado
    ) {
      return
    }

    q.pular()

    setVersao((v) => v + 1)

    if (q.finalizado) {
      finalizar()
    }
  }, [finalizar, marcadorEncontrado])

  const sairDaCamera = useCallback(() => {
    setModalSairVisivel(true)
  }, [])

  const reiniciar = useCallback(() => {
    voltarInicio()
  }, [voltarInicio])

  /*
   * O toque agora acontece direto nas lixeiras
   * 3D (onClick do Viro). A cena avisa o App
   * pelos callbacks abaixo.
   */
  const viroAppProps = useMemo(
    () => ({
      destinoDestacado:
        feedback && !feedback.acerto
          ? feedback.correto
          : null,
      onSelecionarDestino: selecionarDestino,
      onMarcadorEncontrado: () =>
        setMarcadorEncontrado(true),
    }),
    [feedback, selecionarDestino],
  )

  if (etapa === 'identificacao') {
    return (
      <TelaIdentificacao onContinuar={iniciar} />
    )
  }

  if (etapa === 'preparo') {
    return <TelaPreparo onAbrir={abrirCamera} />
  }

  if (etapa === 'resultado' && resumo) {
    return (
      <TelaResultado
        resumo={resumo}
        onReiniciar={reiniciar}
      />
    )
  }

  const item = quiz.current?.atual

  const progresso =
    quiz.current?.progresso ?? {
      atual: 0,
      total: 0,
    }

  return (
    <View style={estilos.container}>
      {/* CAMADA 1: câmera + objetos 3D */}
      <ViroARSceneNavigator
        autofocus
        initialScene={{
          scene: DescarteARScene,
        }}
        viroAppProps={viroAppProps}
        style={estilos.ar}
      />

      {/* CAMADA 2: dica até achar o QR */}
      {!marcadorEncontrado && (
        <View
          style={estilos.dicaAncora}
          pointerEvents="none"
        >
          <Text style={estilos.textoDica}>
            Aponte a câmera para o QR de âncora
          </Text>
        </View>
      )}

      {/* CAMADA 3: HUD do quiz */}
      {item && (
        <HudQuiz
          residuo={item}
          progresso={progresso}
          onPular={pular}
          onSair={sairDaCamera}
        />
      )}

      {feedback && <Feedback {...feedback} />}

      <Modal
        visible={modalSairVisivel}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setModalSairVisivel(false)
        }
      >
        <View style={estilos.modalFundo}>
          <View style={estilos.modalCard}>
            <Text style={estilos.modalTitulo}>
              Sair da sessão?
            </Text>

            <Text style={estilos.modalTexto}>
              O progresso desta sessão será
              descartado e você voltará para a
              tela inicial.
            </Text>

            <View style={estilos.modalAcoes}>
              <Pressable
                style={estilos.botaoContinuar}
                onPress={() =>
                  setModalSairVisivel(false)
                }
              >
                <Text style={estilos.textoContinuar}>
                  Continuar sessão
                </Text>
              </Pressable>

              <Pressable
                style={estilos.botaoSair}
                onPress={voltarInicio}
              >
                <Text style={estilos.textoSair}>
                  Sair
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  ar: {
    flex: 1,
  },

  dicaAncora: {
    position: 'absolute',
    left: 24,
    right: 24,
    top: '42%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: 'rgba(32, 36, 43, 0.88)',
    alignItems: 'center',
    zIndex: 20,
  },

  textoDica: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
  },

  modalTitulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },

  modalTexto: {
    fontSize: 16,
    lineHeight: 22,
    color: '#374151',
    marginBottom: 22,
  },

  modalAcoes: {
    gap: 12,
  },

  botaoContinuar: {
    minHeight: 50,
    borderRadius: 12,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  textoContinuar: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  botaoSair: {
    minHeight: 50,
    borderRadius: 12,
    backgroundColor: '#991B1B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  textoSair: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
})