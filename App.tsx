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
  DESTINOS,
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

const DURACAO_FEEDBACK_MS =
  2600

export default function App() {
  const [
    etapa,
    setEtapa,
  ] =
    useState<Etapa>(
      'identificacao',
    )

  const [
    feedback,
    setFeedback,
  ] =
    useState<EstadoFeedback | null>(
      null,
    )

  const [
    resumo,
    setResumo,
  ] =
    useState<Resumo | null>(
      null,
    )

  const [
    modalSairVisivel,
    setModalSairVisivel,
  ] =
    useState(false)

  /*
   * Só força o React a atualizar
   * quando o QuizManager muda.
   *
   * NÃO usar como key do Viro.
   */
  const [, setVersao] =
    useState(0)

  const quiz =
    useRef<QuizManager | null>(
      null,
    )

  const travado =
    useRef(false)

  const feedbackTimeout =
    useRef<
      ReturnType<
        typeof setTimeout
      > | null
    >(null)

  const iniciar = useCallback(
    async (
      participante: string,
      banco: 'A' | 'B',
    ) => {
      if (
        Platform.OS ===
        'android'
      ) {
        const permissao =
          await PermissionsAndroid.request(
            PermissionsAndroid
              .PERMISSIONS.CAMERA,
          )

        if (
          permissao !==
          PermissionsAndroid
            .RESULTS.GRANTED
        ) {
          Alert.alert(
            'Câmera bloqueada',
            'O app precisa da câmera para utilizar a realidade aumentada. Libere a permissão nas configurações do sistema.',
          )

          return
        }
      }

      const itens =
        embaralhar(
          BANCOS[banco],
        )

      quiz.current =
        new QuizManager(
          itens,
          banco,
          participante,
        )

      quiz.current.iniciar()

      setEtapa(
        'preparo',
      )
    },
    [],
  )

  const finalizar =
    useCallback(() => {
      if (!quiz.current) {
        return
      }

      setResumo(
        quiz.current.resumo(),
      )

      setEtapa(
        'resultado',
      )
    }, [])

  const voltarInicio =
    useCallback(() => {
      if (
        feedbackTimeout.current
      ) {
        clearTimeout(
          feedbackTimeout.current,
        )

        feedbackTimeout.current =
          null
      }

      quiz.current = null
      travado.current = false

      setFeedback(null)
      setResumo(null)

      setModalSairVisivel(
        false,
      )

      setEtapa(
        'identificacao',
      )
    }, [])

  const selecionarDestino =
    useCallback(
      (
        destino: DestinoId,
      ) => {
        const q =
          quiz.current

        if (
          !q ||
          travado.current ||
          q.finalizado
        ) {
          return
        }

        const item =
          q.atual

        if (!item) {
          return
        }

        console.log(
          '[QUIZ] Destino selecionado:',
          destino,
        )

        const {
          acerto,
          justificativa,
        } =
          q.responder(
            destino,
          )

        travado.current =
          true

        setFeedback({
          acerto,
          escolhido: destino,
          correto:
            item.destinoCorreto,
          justificativa,
        })

        feedbackTimeout.current =
          setTimeout(
            () => {
              travado.current =
                false

              feedbackTimeout.current =
                null

              setFeedback(
                null,
              )

              setVersao(
                (v) =>
                  v + 1,
              )

              if (
                q.finalizado
              ) {
                finalizar()
              }
            },
            DURACAO_FEEDBACK_MS,
          )
      },
      [finalizar],
    )

  const pular =
    useCallback(() => {
      const q =
        quiz.current

      if (
        !q ||
        travado.current ||
        q.finalizado
      ) {
        return
      }

      q.pular()

      setVersao(
        (v) => v + 1,
      )

      if (
        q.finalizado
      ) {
        finalizar()
      }
    }, [finalizar])

  const sairDaCamera =
    useCallback(() => {
      setModalSairVisivel(
        true,
      )
    }, [])

  const reiniciar =
    useCallback(() => {
      voltarInicio()
    }, [voltarInicio])

  const viroAppProps =
    useMemo(
      () => ({
        /*
         * Agora o Viro não recebe mais
         * callback de clique.
         *
         * Ele só precisa saber qual
         * lixeira destacar quando há erro.
         */
        destinoDestacado:
          feedback &&
          !feedback.acerto
            ? feedback.correto
            : null,
      }),
      [
        feedback,
      ],
    )

  if (
    etapa ===
    'identificacao'
  ) {
    return (
      <TelaIdentificacao
        onContinuar={
          iniciar
        }
      />
    )
  }

  if (
    etapa ===
    'preparo'
  ) {
    return (
      <TelaPreparo
        onAbrir={() =>
          setEtapa(
            'quiz',
          )
        }
      />
    )
  }

  if (
    etapa ===
      'resultado' &&
    resumo
  ) {
    return (
      <TelaResultado
        resumo={
          resumo
        }
        onReiniciar={
          reiniciar
        }
      />
    )
  }

  const item =
    quiz.current?.atual

  const progresso =
    quiz.current
      ?.progresso ?? {
      atual: 0,
      total: 0,
    }

  return (
    <View
      style={
        estilos.container
      }
    >
      {/*
       * CAMADA 1
       *
       * Câmera + objetos 3D.
       */}
      <ViroARSceneNavigator
        autofocus
        initialScene={{
          scene:
            DescarteARScene,
        }}
        viroAppProps={
          viroAppProps
        }
        style={
          estilos.ar
        }
      />

      {/*
       * CAMADA 2
       *
       * Áreas de toque normais do
       * React Native.
       *
       * Elas ficam posicionadas
       * exatamente sobre a região
       * onde as lixeiras aparecem.
       */}
      {item && (
        <View
          style={
            estilos.areaLixeiras
          }
          pointerEvents="box-none"
        >
          {DESTINOS.map(
            (destino) => (
              <Pressable
                key={
                  destino.id
                }
                style={({
                  pressed,
                }) => [
                  estilos.areaToque,

                  pressed &&
                    estilos.areaToquePressionada,
                ]}
                disabled={
                  !!feedback
                }
                onPress={() =>
                  selecionarDestino(
                    destino.id,
                  )
                }
                accessibilityRole="button"
                accessibilityLabel={`Lixeira ${destino.nome}`}
              >
                {/*
                 * Este texto fica invisível.
                 *
                 * Ele existe para deixar
                 * a área acessível para
                 * leitores de tela.
                 */}
                <Text
                  style={
                    estilos.textoToqueInvisivel
                  }
                >
                  {
                    destino.nome
                  }
                </Text>
              </Pressable>
            ),
          )}
        </View>
      )}

      {/*
       * CAMADA 3
       *
       * HUD normal do quiz.
       */}
      {item && (
        <HudQuiz
          residuo={
            item
          }
          progresso={
            progresso
          }
          onPular={
            pular
          }
          onSair={
            sairDaCamera
          }
        />
      )}

      {feedback && (
        <Feedback
          {...feedback}
        />
      )}

      <Modal
        visible={
          modalSairVisivel
        }
        transparent
        animationType="fade"
        onRequestClose={() =>
          setModalSairVisivel(
            false,
          )
        }
      >
        <View
          style={
            estilos.modalFundo
          }
        >
          <View
            style={
              estilos.modalCard
            }
          >
            <Text
              style={
                estilos.modalTitulo
              }
            >
              Sair da sessão?
            </Text>

            <Text
              style={
                estilos.modalTexto
              }
            >
              O progresso desta
              sessão será
              descartado e você
              voltará para a tela
              inicial.
            </Text>

            <View
              style={
                estilos.modalAcoes
              }
            >
              <Pressable
                style={
                  estilos.botaoContinuar
                }
                onPress={() =>
                  setModalSairVisivel(
                    false,
                  )
                }
              >
                <Text
                  style={
                    estilos.textoContinuar
                  }
                >
                  Continuar sessão
                </Text>
              </Pressable>

              <Pressable
                style={
                  estilos.botaoSair
                }
                onPress={
                  voltarInicio
                }
              >
                <Text
                  style={
                    estilos.textoSair
                  }
                >
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

const estilos =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#000000',
    },

    ar: {
      flex: 1,
    },

    /*
     * Essa é a região horizontal
     * onde as 6 lixeiras ficam.
     *
     * É a principal configuração
     * para alinhar toque e 3D.
     */
    areaLixeiras: {
      position:
        'absolute',

      left: '4%',
      right: '4%',

      /*
       * Aproximadamente no meio
       * inferior da tela.
       */
      top: '46%',

      height: 150,

      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'space-between',

      zIndex: 20,
    },

    /*
     * Cada lixeira recebe 1/6
     * da largura total.
     *
     * A altura grande torna o
     * clique confortável.
     */
    areaToque: {
      flex: 1,

      height: 135,

      marginHorizontal: 1,

      borderRadius: 12,

      alignItems:
        'center',

      justifyContent:
        'center',

      /*
       * Totalmente transparente.
       */
      backgroundColor:
        'rgba(255,255,255,0.001)',
    },

    /*
     * Quando pressiona existe uma
     * alteração mínima, praticamente
     * invisível.
     *
     * Se quiser testar visualmente
     * onde estão as áreas, pode trocar
     * 0.015 por 0.15 temporariamente.
     */
    areaToquePressionada: {
      backgroundColor:
        'rgba(255,255,255,0.015)',
    },

    textoToqueInvisivel: {
      opacity: 0,
      fontSize: 1,
    },

    modalFundo: {
      flex: 1,
      backgroundColor:
        'rgba(0, 0, 0, 0.72)',
      alignItems:
        'center',
      justifyContent:
        'center',
      paddingHorizontal: 24,
    },

    modalCard: {
      width: '100%',
      maxWidth: 420,
      backgroundColor:
        '#FFFFFF',
      borderRadius: 18,
      padding: 22,
    },

    modalTitulo: {
      fontSize: 22,
      fontWeight:
        '700',
      color:
        '#111827',
      marginBottom: 10,
    },

    modalTexto: {
      fontSize: 16,
      lineHeight: 22,
      color:
        '#374151',
      marginBottom: 22,
    },

    modalAcoes: {
      gap: 12,
    },

    botaoContinuar: {
      minHeight: 50,
      borderRadius: 12,
      backgroundColor:
        '#1F2937',
      alignItems:
        'center',
      justifyContent:
        'center',
      paddingHorizontal: 16,
    },

    textoContinuar: {
      fontSize: 16,
      fontWeight:
        '700',
      color:
        '#FFFFFF',
    },

    botaoSair: {
      minHeight: 50,
      borderRadius: 12,
      backgroundColor:
        '#991B1B',
      alignItems:
        'center',
      justifyContent:
        'center',
      paddingHorizontal: 16,
    },

    textoSair: {
      fontSize: 16,
      fontWeight:
        '700',
      color:
        '#FFFFFF',
    },
  })