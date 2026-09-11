import React, {
  useState,
} from 'react'

import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Share,
} from 'react-native'

import {
  cores,
  fonte,
  espaco,
  raio,
} from './tokens'

import {
  destinoPorId,
  type DestinoId,
} from '../data/lixeiras'

import type {
  Residuo,
} from '../data/residuos'

import type {
  Resumo,
} from '../quiz/QuizManager'

/* --------------------------------------------------------- */

export const TelaIdentificacao: React.FC<{
  onContinuar: (
    participante: string,
    banco: 'A' | 'B',
  ) => void
}> = ({
  onContinuar,
}) => {
  const [
    participante,
    setParticipante,
  ] = useState('')

  const [
    banco,
    setBanco,
  ] =
    useState<
      'A' | 'B'
    >('A')

  const valido =
    participante
      .trim()
      .length > 0

  return (
    <ScrollView
      style={s.scroll}
      contentContainerStyle={
        s.telaScroll
      }
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={
        false
      }
    >
      <Marca />

      <Text
        style={
          s.eyebrow
        }
      >
        IDENTIFICAÇÃO DA SESSÃO
      </Text>

      <Text
        style={
          s.heading
        }
      >
        Antes de iniciar
      </Text>

      <Text
        style={
          s.sub
        }
      >
        Informe o
        identificador do
        participante e
        selecione o banco de
        itens.
      </Text>

      <Text
        style={
          s.label
        }
      >
        Identificador do
        participante
      </Text>

      <TextInput
        style={s.input}
        placeholder="Ex.: P023"
        placeholderTextColor={
          cores.muted
        }
        value={
          participante
        }
        onChangeText={
          setParticipante
        }
        autoCapitalize="characters"
        autoCorrect={
          false
        }
      />

      <Text
        style={
          s.label
        }
      >
        Banco de itens
      </Text>

      <View
        style={
          s.segmento
        }
      >
        {(
          [
            'A',
            'B',
          ] as const
        ).map(
          (b) => (
            <Pressable
              key={b}
              onPress={() =>
                setBanco(
                  b,
                )
              }
              style={[
                s.segmentoItem,

                banco ===
                  b &&
                  s.segmentoAtivo,
              ]}
            >
              <Text
                style={[
                  s.segmentoTexto,

                  banco ===
                    b &&
                    s.segmentoTextoAtivo,
                ]}
              >
                Banco {b}
              </Text>
            </Pressable>
          ),
        )}
      </View>

      <View
        style={
          s.nota
        }
      >
        <Text
          style={
            s.notaTitulo
          }
        >
          Por que pedimos isso?
        </Text>

        <Text
          style={
            s.notaTexto
          }
        >
          O identificador
          permite parear
          pré-teste e
          pós-teste sem usar
          o nome do
          participante.
        </Text>
      </View>

      <View
        style={
          s.espacador
        }
      />

      <Pressable
        style={[
          s.botao,

          !valido &&
            s.botaoDesabilitado,
        ]}
        disabled={
          !valido
        }
        onPress={() =>
          onContinuar(
            participante.trim(),
            banco,
          )
        }
      >
        <Text
          style={
            s.botaoTexto
          }
        >
          Continuar
        </Text>
      </Pressable>

      <Text
        style={
          s.rodape
        }
      >
        Os dados da sessão
        poderão ser
        exportados ao final.
      </Text>
    </ScrollView>
  )
}

/* --------------------------------------------------------- */

const PASSOS = [
  {
    t: 'Abra a câmera',
    d: 'As seis lixeiras aparecerão automaticamente na tela.',
  },

  {
    t: 'Observe o item',
    d: 'O resíduo que deve ser descartado aparece na parte superior.',
  },

  {
    t: 'Toque na lixeira',
    d: 'Escolha diretamente a lixeira que considera correta.',
  },
]

export const TelaPreparo: React.FC<{
  onAbrir: () => void
}> = ({
  onAbrir,
}) => (
  <ScrollView
    style={s.scroll}
    contentContainerStyle={
      s.telaScroll
    }
    showsVerticalScrollIndicator={
      false
    }
  >
    <Marca />

    <Text
      style={
        s.eyebrow
      }
    >
      REALIDADE AUMENTADA
    </Text>

    <Text
      style={
        s.heading
      }
    >
      Prepare a câmera
    </Text>

    <Text
      style={
        s.sub
      }
    >
      As lixeiras ficarão
      disponíveis
      automaticamente à
      frente da câmera.
    </Text>

    <View
      style={s.card}
    >
      {PASSOS.map(
        (p, i) => (
          <View
            key={p.t}
            style={[
              s.passo,

              i <
                PASSOS.length -
                  1 &&
                s.passoBorda,
            ]}
          >
            <View
              style={
                s.passoNum
              }
            >
              <Text
                style={
                  s.passoNumTexto
                }
              >
                {i + 1}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={
                  s.passoTitulo
                }
              >
                {p.t}
              </Text>

              <Text
                style={
                  s.passoDesc
                }
              >
                {p.d}
              </Text>
            </View>
          </View>
        ),
      )}
    </View>

    <View
      style={
        s.aviso
      }
    >
      <Text
        style={
          s.avisoTitulo
        }
      >
        Dica
      </Text>

      <Text
        style={
          s.avisoTexto
        }
      >
        Segure o celular em
        uma posição
        confortável e toque
        diretamente nas
        lixeiras para
        responder.
      </Text>
    </View>

    <View
      style={
        s.espacador
      }
    />

    <Pressable
      style={s.botao}
      onPress={
        onAbrir
      }
    >
      <Text
        style={
          s.botaoTexto
        }
      >
        Abrir câmera
      </Text>
    </Pressable>
  </ScrollView>
)

/* --------------------------------------------------------- */

export const HudQuiz: React.FC<{
  residuo: Residuo

  progresso: {
    atual: number
    total: number
  }

  onPular: () => void

  onSair: () => void
}> = ({
  residuo,
  progresso,
  onPular,
  onSair,
}) => (
  <>
    <View
      style={
        s.hudTopo
      }
      pointerEvents="box-none"
    >
      <View
        style={
          s.marcaLinhaHud
        }
      >
        <MarcaCompacta />

        <View
          style={
            s.acoesTopo
          }
        >
          <View
            style={
              s.contador
            }
          >
            <Text
              style={
                s.contadorTexto
              }
            >
              {progresso.atual}{' '}
              de{' '}
              {progresso.total}
            </Text>
          </View>

          <Pressable
            style={
              s.botaoSair
            }
            onPress={
              onSair
            }
            hitSlop={8}
          >
            <Text
              style={
                s.botaoSairTexto
              }
            >
              ✕
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={
          s.cardItem
        }
      >
        <Text
          style={
            s.cardItemEyebrow
          }
        >
          DESCARTE ESTE ITEM
        </Text>

        <Text
          style={
            s.cardItemNome
          }
        >
          {residuo.emoji}{' '}
          {residuo.nome}
        </Text>

        <Text
          style={
            s.cardItemDica
          }
        >
          Toque na lixeira
          correta
        </Text>

        <View
          style={
            s.barra
          }
        >
          <View
            style={[
              s.barraPreenchida,
              {
                width:
                  progresso.total >
                  0
                    ? `${
                        (progresso.atual /
                          progresso.total) *
                        100
                      }%`
                    : '0%',
              },
            ]}
          />
        </View>
      </View>
    </View>

    <View
      style={
        s.hudRodape
      }
      pointerEvents="box-none"
    >
      <View
        style={
          s.chip
        }
      >
        <View
          style={
            s.pontoChip
          }
        />

        <Text
          style={
            s.chipTexto
          }
        >
          Lixeiras prontas
        </Text>
      </View>

      <Pressable
        style={
          s.pular
        }
        onPress={
          onPular
        }
      >
        <Text
          style={
            s.pularTexto
          }
        >
          Pular item
        </Text>
      </Pressable>
    </View>
  </>
)

/* --------------------------------------------------------- */

export const Feedback: React.FC<{
  acerto: boolean
  escolhido: DestinoId
  correto: DestinoId
  justificativa: string
}> = ({
  acerto,
  escolhido,
  correto,
  justificativa,
}) => (
  <View
    style={[
      s.feedback,

      acerto
        ? s.feedbackAcerto
        : s.feedbackErro,
    ]}
  >
    <Text
      style={
        s.feedbackTitulo
      }
    >
      {acerto
        ? '✓  RESPOSTA CORRETA'
        : '✕  RESPOSTA INCORRETA'}
    </Text>

    {!acerto && (
      <View
        style={
          s.feedbackLinha
        }
      >
        <Text
          style={
            s.feedbackDestino
          }
        >
          ✕ Escolhido:{' '}
          {
            destinoPorId(
              escolhido,
            ).nome
          }
        </Text>

        <Text
          style={
            s.feedbackDestino
          }
        >
          ✓ Correto:{' '}
          {
            destinoPorId(
              correto,
            ).nome
          }
        </Text>
      </View>
    )}

    <Text
      style={
        s.feedbackTexto
      }
    >
      {justificativa}
    </Text>
  </View>
)

/* --------------------------------------------------------- */

export const TelaResultado: React.FC<{
  resumo: Resumo
  onReiniciar: () => void
}> = ({
  resumo,
  onReiniciar,
}) => {
  const exportar = () =>
    Share.share({
      title:
        `sessao_${resumo.participante}_${resumo.banco}.json`,

      message:
        JSON.stringify(
          resumo,
          null,
          2,
        ),
    })

  const minutos =
    Math.floor(
      resumo.duracaoMs /
        60000,
    )

  const segundos =
    Math.round(
      (resumo.duracaoMs %
        60000) /
        1000,
    )

  return (
    <ScrollView
      style={
        s.scrollEscuro
      }
      contentContainerStyle={
        s.telaEscuraScroll
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <View
        style={
          s.marcaLinha
        }
      >
        <MarcaCompacta />

        <View
          style={
            s.contador
          }
        >
          <Text
            style={
              s.contadorTexto
            }
          >
            Sessão concluída
          </Text>
        </View>
      </View>

      <Text
        style={
          s.eyebrowClaro
        }
      >
        RESULTADO DA SESSÃO
      </Text>

      <Text
        style={
          s.headingClaro
        }
      >
        {resumo.confusoes
          .length
          ? 'Itens com erro'
          : 'Sem erros'}
      </Text>

      <Text
        style={
          s.subClaro
        }
      >
        Participante{' '}
        {resumo.participante}
        {' · '}
        Banco{' '}
        {resumo.banco}
      </Text>

      <View
        style={
          s.resumoLinha
        }
      >
        <Metrica
          valor={`${resumo.acertosPrimeiraTentativa}/${resumo.totalItens}`}
          rotulo="1ª tentativa"
        />

        <Metrica
          valor={`${minutos}m ${segundos}s`}
          rotulo="duração"
        />

        <Metrica
          valor={`${resumo.acertosItensAmbiguos}`}
          rotulo="ambíguos certos"
        />
      </View>

      <View
        style={
          s.listaErros
        }
      >
        {resumo.confusoes.map(
          (c) => (
            <View
              key={`${c.residuoId}-${c.escolhido}`}
              style={
                s.cardErro
              }
            >
              <Text
                style={
                  s.cardErroNome
                }
              >
                {
                  c.residuoNome
                }
              </Text>

              <View
                style={
                  s.feedbackLinha
                }
              >
                <Text
                  style={
                    s.cardErroDestino
                  }
                >
                  ✕ Escolhido:{' '}
                  {
                    destinoPorId(
                      c.escolhido,
                    ).nome
                  }
                </Text>

                <Text
                  style={
                    s.cardErroDestino
                  }
                >
                  ✓ Correto:{' '}
                  {
                    destinoPorId(
                      c.correto,
                    ).nome
                  }
                </Text>
              </View>
            </View>
          ),
        )}
      </View>

      <Pressable
        style={
          s.botaoAccent
        }
        onPress={
          exportar
        }
      >
        <Text
          style={
            s.botaoTexto
          }
        >
          Exportar dados da
          sessão
        </Text>
      </Pressable>

      <Text
        style={
          s.rodapeClaro
        }
      >
        JSON com respostas,
        acertos, erros e matriz
        de confusão.
      </Text>

      <Pressable
        style={
          s.botaoSecundario
        }
        onPress={
          onReiniciar
        }
      >
        <Text
          style={
            s.botaoSecundarioTexto
          }
        >
          Nova sessão
        </Text>
      </Pressable>
    </ScrollView>
  )
}

/* --------------------------------------------------------- */

const Metrica: React.FC<{
  valor: string
  rotulo: string
}> = ({
  valor,
  rotulo,
}) => (
  <View
    style={
      s.metrica
    }
  >
    <Text
      style={
        s.metricaValor
      }
    >
      {valor}
    </Text>

    <Text
      style={
        s.metricaRotulo
      }
    >
      {rotulo}
    </Text>
  </View>
)

const Marca = () => (
  <View
    style={
      s.marcaLinha
    }
  >
    <MarcaCompacta />
  </View>
)

const MarcaCompacta =
  () => (
    <View
      style={
        s.marca
      }
    >
      <View
        style={
          s.marcaBadge
        }
      >
        <Text
          style={
            s.marcaBadgeTexto
          }
        >
          AR
        </Text>
      </View>

      <Text
        style={
          s.marcaTexto
        }
      >
        descartAR
      </Text>
    </View>
  )

/* --------------------------------------------------------- */

const s =
  StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor:
        cores.surface,
    },

    scrollEscuro: {
      flex: 1,
      backgroundColor:
        cores.graphite,
    },

    telaScroll: {
      flexGrow: 1,
      backgroundColor:
        cores.surface,
      padding:
        espaco.xl,
      paddingTop:
        espaco.xxl +
        espaco.lg,
      paddingBottom:
        espaco.xxl +
        espaco.lg,
    },

    telaEscuraScroll: {
      flexGrow: 1,
      backgroundColor:
        cores.graphite,
      padding:
        espaco.xl,
      paddingTop:
        espaco.xxl +
        espaco.lg,
      paddingBottom:
        espaco.xxl +
        espaco.lg,
      gap:
        espaco.sm,
    },

    espacador: {
      flexGrow: 1,
      minHeight:
        espaco.xl,
    },

    marca: {
      flexDirection:
        'row',
      alignItems:
        'center',
      gap:
        espaco.sm,
    },

    marcaLinha: {
      flexDirection:
        'row',
      alignItems:
        'center',
      justifyContent:
        'space-between',
      marginBottom:
        espaco.xl,
    },

    marcaLinhaHud: {
      flexDirection:
        'row',
      alignItems:
        'center',
      justifyContent:
        'space-between',
      marginBottom:
        espaco.md,
    },

    acoesTopo: {
      flexDirection:
        'row',
      alignItems:
        'center',
      gap:
        espaco.sm,
    },

    botaoSair: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor:
        cores.overlay,
      alignItems:
        'center',
      justifyContent:
        'center',
    },

    botaoSairTexto: {
      color:
        cores.surface,
      fontSize: 20,
      fontWeight:
        '600',
      lineHeight: 22,
    },

    marcaBadge: {
      width: 26,
      height: 26,
      borderRadius:
        raio.sm,
      backgroundColor:
        cores.graphite,
      alignItems:
        'center',
      justifyContent:
        'center',
    },

    marcaBadgeTexto: {
      color:
        cores.surface,
      fontSize: 10,
      fontWeight:
        '700',
    },

    marcaTexto: {
      fontSize:
        fonte.body,
      fontWeight:
        '700',
      color:
        cores.ink,
    },

    eyebrow: {
      fontSize:
        fonte.caption,
      fontWeight:
        '700',
      letterSpacing: 1,
      color:
        cores.muted,
    },

    eyebrowClaro: {
      fontSize:
        fonte.caption,
      fontWeight:
        '700',
      letterSpacing: 1,
      color:
        cores.muted,
    },

    heading: {
      fontSize:
        fonte.heading,
      fontWeight:
        '700',
      color:
        cores.ink,
    },

    headingClaro: {
      fontSize:
        fonte.heading,
      fontWeight:
        '700',
      color:
        cores.surface,
    },

    sub: {
      fontSize:
        fonte.bodySmall,
      color:
        cores.muted,
      marginBottom:
        espaco.xl,
    },

    subClaro: {
      fontSize:
        fonte.bodySmall,
      color:
        cores.muted,
      marginBottom:
        espaco.lg,
    },

    label: {
      fontSize:
        fonte.bodySmall,
      fontWeight:
        '600',
      color:
        cores.ink,
      marginBottom:
        espaco.sm,
    },

    input: {
      borderWidth: 1,
      borderColor:
        cores.border,
      borderRadius:
        raio.md,
      paddingHorizontal:
        espaco.lg,
      height: 48,
      fontSize:
        fonte.body,
      color:
        cores.ink,
      marginBottom:
        espaco.lg,
    },

    segmento: {
      flexDirection:
        'row',
      gap:
        espaco.md,
      marginBottom:
        espaco.lg,
    },

    segmentoItem: {
      flex: 1,
      height: 46,
      borderRadius:
        raio.md,
      borderWidth: 1,
      borderColor:
        cores.border,
      alignItems:
        'center',
      justifyContent:
        'center',
    },

    segmentoAtivo: {
      backgroundColor:
        cores.graphite,
      borderColor:
        cores.graphite,
    },

    segmentoTexto: {
      fontSize:
        fonte.bodySmall,
      fontWeight:
        '600',
      color:
        cores.ink,
    },

    segmentoTextoAtivo: {
      color:
        cores.surface,
    },

    nota: {
      backgroundColor:
        cores.surfaceSoft,
      borderRadius:
        raio.md,
      padding:
        espaco.lg,
    },

    notaTitulo: {
      fontSize:
        fonte.bodySmall,
      fontWeight:
        '700',
      color:
        cores.ink,
      marginBottom:
        espaco.xs,
    },

    notaTexto: {
      fontSize:
        fonte.bodySmall,
      color:
        cores.muted,
      lineHeight: 18,
    },

    card: {
      borderWidth: 1,
      borderColor:
        cores.border,
      borderRadius:
        raio.lg,
      marginBottom:
        espaco.lg,
    },

    passo: {
      flexDirection:
        'row',
      gap:
        espaco.md,
      padding:
        espaco.lg,
    },

    passoBorda: {
      borderBottomWidth:
        1,
      borderBottomColor:
        cores.border,
    },

    passoNum: {
      width: 26,
      height: 26,
      borderRadius:
        raio.sm,
      backgroundColor:
        cores.graphite,
      alignItems:
        'center',
      justifyContent:
        'center',
    },

    passoNumTexto: {
      color:
        cores.surface,
      fontSize:
        fonte.caption,
      fontWeight:
        '700',
    },

    passoTitulo: {
      fontSize:
        fonte.body,
      fontWeight:
        '600',
      color:
        cores.ink,
    },

    passoDesc: {
      fontSize:
        fonte.bodySmall,
      color:
        cores.muted,
    },

    aviso: {
      backgroundColor:
        cores.surfaceSoft,
      borderRadius:
        raio.md,
      padding:
        espaco.lg,
    },

    avisoTitulo: {
      fontSize:
        fonte.bodySmall,
      fontWeight:
        '700',
      color:
        cores.ink,
    },

    avisoTexto: {
      fontSize:
        fonte.bodySmall,
      color:
        cores.muted,
    },

    botao: {
      height: 52,
      borderRadius:
        raio.md,
      backgroundColor:
        cores.graphite,
      alignItems:
        'center',
      justifyContent:
        'center',
    },

    botaoAccent: {
      height: 52,
      borderRadius:
        raio.md,
      backgroundColor:
        cores.accent,
      alignItems:
        'center',
      justifyContent:
        'center',
    },

    botaoDesabilitado: {
      opacity: 0.35,
    },

    botaoTexto: {
      color:
        cores.surface,
      fontSize:
        fonte.body,
      fontWeight:
        '600',
    },

    botaoSecundario: {
      height: 48,
      borderRadius:
        raio.md,
      borderWidth: 1,
      borderColor:
        cores.borderDark,
      alignItems:
        'center',
      justifyContent:
        'center',
    },

    botaoSecundarioTexto: {
      color:
        cores.surface,
      fontSize:
        fonte.bodySmall,
      fontWeight:
        '600',
    },

    rodape: {
      fontSize:
        fonte.caption,
      color:
        cores.muted,
      textAlign:
        'center',
      marginTop:
        espaco.md,
    },

    rodapeClaro: {
      fontSize:
        fonte.caption,
      color:
        cores.muted,
      textAlign:
        'center',
      marginVertical:
        espaco.sm,
    },

    hudTopo: {
      position:
        'absolute',
      top: 0,
      left: 0,
      right: 0,
      padding:
        espaco.lg,
      paddingTop:
        espaco.xxl +
        espaco.lg,
    },

    hudRodape: {
      position:
        'absolute',
      bottom:
        espaco.xl,
      left: 0,
      right: 0,
      alignItems:
        'center',
      gap:
        espaco.md,
    },

    contador: {
      backgroundColor:
        cores.overlay,
      borderRadius:
        raio.sm,
      paddingHorizontal:
        espaco.md,
      paddingVertical:
        espaco.xs + 2,
    },

    contadorTexto: {
      color:
        cores.surface,
      fontSize:
        fonte.caption,
      fontWeight:
        '600',
    },

    cardItem: {
      backgroundColor:
        cores.overlay,
      borderRadius:
        raio.lg,
      padding:
        espaco.lg,
      gap:
        espaco.xs,
    },

    cardItemEyebrow: {
      fontSize:
        fonte.caption,
      fontWeight:
        '700',
      letterSpacing: 1,
      color:
        cores.muted,
    },

    cardItemNome: {
      fontSize:
        fonte.item,
      fontWeight:
        '700',
      color:
        cores.surface,
    },

    cardItemDica: {
      fontSize:
        fonte.bodySmall,
      color:
        cores.muted,
    },

    barra: {
      height: 3,
      backgroundColor:
        cores.borderDark,
      borderRadius: 2,
      marginTop:
        espaco.sm,
    },

    barraPreenchida: {
      height: 3,
      backgroundColor:
        cores.accent,
      borderRadius: 2,
    },

    chip: {
      flexDirection:
        'row',
      alignItems:
        'center',
      gap:
        espaco.sm,
      backgroundColor:
        cores.overlay,
      borderRadius: 999,
      paddingHorizontal:
        espaco.lg,
      paddingVertical:
        espaco.sm,
    },

    pontoChip: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor:
        cores.acerto,
    },

    chipTexto: {
      color:
        cores.surface,
      fontSize:
        fonte.bodySmall,
    },

    pular: {
      paddingHorizontal:
        espaco.lg,
      paddingVertical:
        espaco.md,
    },

    pularTexto: {
      color:
        cores.surface,
      fontSize:
        fonte.bodySmall,
      opacity: 0.75,
    },

    feedback: {
      position:
        'absolute',
      left:
        espaco.lg,
      right:
        espaco.lg,
      bottom: 110,
      borderRadius:
        raio.lg,
      padding:
        espaco.lg,
      gap:
        espaco.sm,
      borderLeftWidth:
        4,
    },

    feedbackAcerto: {
      backgroundColor:
        cores.overlay,
      borderLeftColor:
        cores.acerto,
    },

    feedbackErro: {
      backgroundColor:
        cores.overlay,
      borderLeftColor:
        cores.erro,
    },

    feedbackTitulo: {
      fontSize:
        fonte.caption,
      fontWeight:
        '700',
      letterSpacing: 1,
      color:
        cores.surface,
    },

    feedbackLinha: {
      flexDirection:
        'row',
      gap:
        espaco.lg,
      flexWrap:
        'wrap',
    },

    feedbackDestino: {
      fontSize:
        fonte.bodySmall,
      color:
        cores.surface,
    },

    feedbackTexto: {
      fontSize:
        fonte.bodySmall,
      color:
        cores.muted,
      lineHeight: 18,
    },

    resumoLinha: {
      flexDirection:
        'row',
      gap:
        espaco.md,
      marginBottom:
        espaco.lg,
    },

    listaErros: {
      gap:
        espaco.md,
      marginBottom:
        espaco.lg,
    },

    metrica: {
      flex: 1,
      backgroundColor:
        cores.cardDark,
      borderRadius:
        raio.md,
      padding:
        espaco.md,
    },

    metricaValor: {
      fontSize:
        fonte.item,
      fontWeight:
        '700',
      color:
        cores.surface,
    },

    metricaRotulo: {
      fontSize:
        fonte.caption,
      color:
        cores.muted,
    },

    cardErro: {
      backgroundColor:
        cores.cardDark,
      borderRadius:
        raio.md,
      padding:
        espaco.lg,
      gap:
        espaco.xs,
    },

    cardErroNome: {
      fontSize:
        fonte.body,
      fontWeight:
        '600',
      color:
        cores.surface,
    },

    cardErroDestino: {
      fontSize:
        fonte.bodySmall,
      color:
        cores.muted,
    },
  })