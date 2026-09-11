import React from 'react'

import {
  ViroARScene,
  ViroAmbientLight,
  ViroBox,
  ViroCamera,
  ViroNode,
  ViroText,
  ViroMaterials,
} from '@reactvision/react-viro'

import {
  DESTINOS,
  type DestinoId,
} from '../data/lixeiras'

type PropsViro = {
  destinoDestacado?: DestinoId | null
}

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
  } = appProps

  return (
    <ViroARScene>
      <ViroAmbientLight
        color="#FFFFFF"
        intensity={500}
      />

      <ViroCamera
        active
        position={[0, 0, 0]}
      >
        {/*
         * As lixeiras ficam presas
         * à câmera.
         *
         * Y negativo = mais para baixo.
         * Z negativo = distância da câmera.
         */}
        <ViroNode
          position={[
            0,
            -0.13,
            -0.60,
          ]}
        >
          {DESTINOS.map(
            (d) => {
              const destacado =
                destinoDestacado === d.id

              const escala:
                [
                  number,
                  number,
                  number,
                ] =
                destacado
                  ? [
                      1.18,
                      1.18,
                      1.18,
                    ]
                  : [
                      1,
                      1,
                      1,
                    ]

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
                  {/*
                   * Corpo
                   */}
                  <ViroBox
                    width={0.042}
                    height={0.065}
                    length={0.040}
                    position={[
                      0,
                      0.0325,
                      0,
                    ]}
                    materials={[
                      MATERIAL_POR_DESTINO[
                        d.id
                      ],
                    ]}
                  />

                  {/*
                   * Tampa
                   */}
                  <ViroBox
                    width={0.048}
                    height={0.009}
                    length={0.046}
                    position={[
                      0,
                      0.069,
                      0,
                    ]}
                    materials={[
                      MATERIAL_POR_DESTINO[
                        d.id
                      ],
                    ]}
                  />

                  {/*
                   * Abertura
                   */}
                  <ViroBox
                    width={0.026}
                    height={0.004}
                    length={0.018}
                    position={[
                      0,
                      0.075,
                      0,
                    ]}
                    materials={[
                      'aberturaLixeira',
                    ]}
                  />

                  {/*
                   * Nome
                   */}
                  <ViroText
                    text={d.nome}
                    position={[
                      0,
                      0.103,
                      0,
                    ]}
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
            },
          )}
        </ViroNode>
      </ViroCamera>
    </ViroARScene>
  )
}
export default DescarteARScene;