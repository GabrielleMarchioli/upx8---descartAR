import React, {
  useRef,
  useState,
} from 'react'

import {
  ViroARScene,
  ViroAmbientLight,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroBox,
  ViroNode,
  ViroText,
  ViroMaterials,
} from '@reactvision/react-viro'

import {
  DESTINOS,
  type DestinoId,
} from '../data/lixeiras'

/*
 * ============ AJUSTES ============
 *
 * LARGURA_QR_M: largura REAL da imagem impressa
 * (moldura inclusa), em metros. Meça com régua.
 * Impresso com 15 cm de lado => 0.15
 *
 * OFFSET_Z_M: distância das lixeiras em relação
 * ao centro do QR, na direção do usuário.
 *
 * ESCALA_LIXEIRAS: tamanho geral das lixeiras.
 */
const LARGURA_QR_M = 0.15
const OFFSET_Z_M = 0.18
const ESCALA_LIXEIRAS = 1

type PropsViro = {
  destinoDestacado?: DestinoId | null
  onSelecionarDestino?: (
    destino: DestinoId,
  ) => void
  onMarcadorEncontrado?: () => void
}

type Posicao = [number, number, number]

ViroARTrackingTargets.createTargets({
  qrAncora: {
    source: require('../assets/qr_ancora.png'),
    orientation: 'Up',
    physicalWidth: LARGURA_QR_M,
    type: 'Image',
  },
})

ViroMaterials.createMaterials({
  aberturaLixeira: {
    diffuseColor: '#151515',
    lightingModel: 'Constant',
  },

  papelMaterial: {
    diffuseColor: '#1E5FA8',
    lightingModel: 'Constant',
  },

  plasticoMaterial: {
    diffuseColor: '#E52521',
    lightingModel: 'Constant',
  },

  vidroMaterial: {
    diffuseColor: '#27A844',
    lightingModel: 'Constant',
  },

  metalMaterial: {
    diffuseColor: '#F2C318',
    lightingModel: 'Constant',
  },

  organicoMaterial: {
    diffuseColor: '#8B4A18',
    lightingModel: 'Constant',
  },

  rejeitoMaterial: {
    diffuseColor: '#777777',
    lightingModel: 'Constant',
  },
})

const MATERIAL_POR_DESTINO: Record<
  DestinoId,
  string
> = {
  papel: 'papelMaterial',
  plastico: 'plasticoMaterial',
  vidro: 'vidroMaterial',
  metal: 'metalMaterial',
  organico: 'organicoMaterial',
  rejeito: 'rejeitoMaterial',
}

export default function DescarteARScene({
  arSceneNavigator,
}: any) {
  const appProps: PropsViro =
    arSceneNavigator?.viroAppProps ?? {}

  const {
    destinoDestacado,
    onSelecionarDestino,
    onMarcadorEncontrado,
  } = appProps

  /*
   * Posição do QR no mundo, gravada na
   * primeira detecção. Depois disso as
   * lixeiras ficam fixas nesse ponto e o
   * QR não precisa mais ficar enquadrado.
   */
  const [ancora, setAncora] =
    useState<Posicao | null>(null)

  const ancoraTravada =
    useRef(false)

  const aoEncontrarQr = (
    anchor: any,
  ) => {
    if (ancoraTravada.current) {
      return
    }

    const p = anchor?.position

    if (
      !Array.isArray(p) ||
      p.length < 3
    ) {
      return
    }

    ancoraTravada.current = true

    setAncora([p[0], p[1], p[2]])

    onMarcadorEncontrado?.()
  }

  const tocar = (id: DestinoId) => {
    onSelecionarDestino?.(id)
  }

  return (
    <ViroARScene>
      <ViroAmbientLight
        color="#FFFFFF"
        intensity={500}
      />

      <ViroARImageMarker
        target="qrAncora"
        onAnchorFound={aoEncontrarQr}
      />

      {ancora && (
        <ViroNode
          position={[
            ancora[0],
            ancora[1],
            ancora[2] + OFFSET_Z_M,
          ]}
          scale={[
            ESCALA_LIXEIRAS,
            ESCALA_LIXEIRAS,
            ESCALA_LIXEIRAS,
          ]}
        >
          {DESTINOS.map((d) => {
            const destacado =
              destinoDestacado === d.id

            const escala: Posicao =
              destacado
                ? [1.18, 1.18, 1.18]
                : [1, 1, 1]

            return (
              <ViroNode
                key={d.id}
                position={[
                  d.posicao[0],
                  0,
                  0,
                ]}
                scale={escala}
              >
                {/* Corpo */}
                <ViroBox
                  width={0.042}
                  height={0.065}
                  length={0.040}
                  position={[0, 0.0325, 0]}
                  materials={[
                    MATERIAL_POR_DESTINO[d.id],
                  ]}
                  onClick={() => tocar(d.id)}
                />

                {/* Tampa */}
                <ViroBox
                  width={0.048}
                  height={0.009}
                  length={0.046}
                  position={[0, 0.069, 0]}
                  materials={[
                    MATERIAL_POR_DESTINO[d.id],
                  ]}
                  onClick={() => tocar(d.id)}
                />

                {/* Abertura */}
                <ViroBox
                  width={0.026}
                  height={0.004}
                  length={0.018}
                  position={[0, 0.075, 0]}
                  materials={[
                    'aberturaLixeira',
                  ]}
                  onClick={() => tocar(d.id)}
                />

                {/* Nome */}
                <ViroText
                  text={d.nome}
                  position={[0, 0.103, 0]}
                  scale={[
                    0.034,
                    0.034,
                    0.034,
                  ]}
                  width={2.8}
                  height={1}
                  fontSize={24}
                  color="#FFFFFF"
                  textAlign="center"
                  textAlignVertical="center"
                  outerStroke={{
                    type: 'Outline',
                    width: 2,
                    color: '#111111',
                  }}
                />
              </ViroNode>
            )
          })}
        </ViroNode>
      )}
    </ViroARScene>
  )
}