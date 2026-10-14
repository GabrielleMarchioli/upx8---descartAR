import React, {
  useRef,
  useState,
} from 'react'

import {
  ViroARScene,
  ViroAmbientLight,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroAnimations,
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
 * (moldura inclusa), em metros.
 *
 * DISTANCIA_M: distancia da camera ate a fileira de
 * lixeiras, no momento em que o QR e reconhecido.
 *
 * ESPACAMENTO_M: distancia entre o centro de uma
 * lixeira e a proxima (lado a lado).
 *
 * ESCALA_LIXEIRA: tamanho visual de cada lixeira.
 *
 * AJUSTE_Y_M: sobe (+) ou desce (-) a fileira em
 * relacao ao centro da tela.
 *
 * ALTURA_PULO_M: quanto a lixeira sobe ao ser tocada.
 *
 * O toque usa uma "area de toque" invisivel, maior
 * que a lixeira. Ela ocupa toda a largura disponivel
 * (ate encostar na vizinha), entao tocar um pouco ao
 * lado da lixeira ainda conta.
 */
const LARGURA_QR_M = 0.15
const DISTANCIA_M = 0.6
const ESPACAMENTO_M = 0.082
const ESCALA_LIXEIRA = 1.3
const AJUSTE_Y_M = -0.05
const ALTURA_PULO_M = 0.06

/* true: mostra a area de toque (translucida) e loga cada evento */
const DEBUG_TOQUE = false

/* Area de toque (em unidades locais da lixeira) */
const TOQUE_LARGURA =
  ESPACAMENTO_M / ESCALA_LIXEIRA - 0.002
const TOQUE_ALTURA = 0.15
const TOQUE_PROFUNDIDADE = 0.09

type Vec3 = [number, number, number]

type CameraInfo = {
  position: Vec3
  forward: Vec3
  up?: Vec3
}

type PropsViro = {
  destinoDestacado?: DestinoId | null
  bloqueado?: boolean
  onSelecionarDestino?: (
    destino: DestinoId,
  ) => void
  onMarcadorEncontrado?: () => void
}

ViroARTrackingTargets.createTargets({
  qrAncora: {
    source: require('../assets/qr_ancora.png'),
    orientation: 'Up',
    physicalWidth: LARGURA_QR_M,
    type: 'Image',
  },
})

/*
 * Animacao ao tocar: a lixeira sobe, fica um
 * tempo no alto (durante o feedback) e desce.
 * Movimentos relativos, entao sempre volta
 * exatamente ao ponto de partida.
 */
ViroAnimations.registerAnimations({
  subir: {
    properties: {
      positionY: `+=${ALTURA_PULO_M}`,
    },
    duration: 220,
    easing: 'EaseOut',
  },
  descer: {
    properties: {
      positionY: `-=${ALTURA_PULO_M}`,
    },
    duration: 300,
    delay: 1900,
    easing: 'EaseIn',
  },
  pulo: [['subir', 'descer']],
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

  /*
   * Area de toque invisivel. Nao escreve no
   * buffer de profundidade para nao esconder
   * o nome nem a lixeira atras dela.
   */
  areaToque: {
    diffuseColor: '#FFFFFF',
    lightingModel: 'Constant',
    writesToDepthBuffer: false,
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

const ESCALA_NORMAL: Vec3 = [
  ESCALA_LIXEIRA,
  ESCALA_LIXEIRA,
  ESCALA_LIXEIRA,
]

const ESCALA_DESTACADA: Vec3 = [
  ESCALA_LIXEIRA * 1.18,
  ESCALA_LIXEIRA * 1.18,
  ESCALA_LIXEIRA * 1.18,
]

const ESCALA_TEXTO: Vec3 = [
  0.034,
  0.034,
  0.034,
]

function ehVec(v: any): v is number[] {
  return (
    Array.isArray(v) &&
    v.length >= 3 &&
    [v[0], v[1], v[2]].every(
      (n) =>
        typeof n === 'number' &&
        isFinite(n),
    )
  )
}

function lerCamera(
  evento: any,
): CameraInfo | null {
  const t =
    evento?.cameraTransform ?? evento

  const p = t?.position
  const f = t?.forward
  const u = t?.up

  if (!ehVec(p) || !ehVec(f)) {
    return null
  }

  return {
    position: [p[0], p[1], p[2]],
    forward: [f[0], f[1], f[2]],
    up: ehVec(u)
      ? [u[0], u[1], u[2]]
      : undefined,
  }
}

/*
 * Monta a fileira de lixeiras lado a lado, no
 * centro da tela (raio central da camera) e
 * alinhada com o eixo "direita" da camera.
 *
 * Se nao houver dados de camera, usa a posicao
 * do QR e a fileira ao longo do eixo X.
 */
function calcularPosicoes(
  cam: CameraInfo | null,
  qr: Vec3,
): Record<DestinoId, Vec3> {
  let centro: Vec3 = [
    qr[0],
    qr[1] + AJUSTE_Y_M,
    qr[2],
  ]

  let direita: [number, number] = [1, 0]

  if (cam) {
    const [fx, fy, fz] = cam.forward

    const norma =
      Math.hypot(fx, fy, fz) || 1

    centro = [
      cam.position[0] +
        (fx / norma) * DISTANCIA_M,
      cam.position[1] +
        (fy / norma) * DISTANCIA_M +
        AJUSTE_Y_M,
      cam.position[2] +
        (fz / norma) * DISTANCIA_M,
    ]

    /*
     * "Frente" horizontal. Se o celular aponta
     * quase reto para baixo/cima, usa o vetor
     * "up" da camera como frente.
     */
    let hx = fx
    let hz = fz

    if (
      Math.hypot(hx, hz) / norma < 0.3 &&
      cam.up
    ) {
      hx = cam.up[0]
      hz = cam.up[2]
    }

    const nh = Math.hypot(hx, hz)

    if (nh > 1e-6) {
      direita = [-hz / nh, hx / nh]
    }
  }

  const resultado = {} as Record<
    DestinoId,
    Vec3
  >

  DESTINOS.forEach((d, i) => {
    const x =
      (i - (DESTINOS.length - 1) / 2) *
      ESPACAMENTO_M

    resultado[d.id] = [
      centro[0] + direita[0] * x,
      centro[1],
      centro[2] + direita[1] * x,
    ]
  })

  return resultado
}

export default function DescarteARScene({
  arSceneNavigator,
}: any) {
  const appProps: PropsViro =
    arSceneNavigator?.viroAppProps ?? {}

  const {
    destinoDestacado,
    bloqueado,
    onSelecionarDestino,
    onMarcadorEncontrado,
  } = appProps

  /*
   * Posicoes no mundo, calculadas UMA vez quando o
   * QR e reconhecido. Depois disso as lixeiras ficam
   * fixas e o QR nao precisa mais ficar enquadrado.
   */
  const [posicoes, setPosicoes] =
    useState<Record<
      DestinoId,
      Vec3
    > | null>(null)

  const [levantada, setLevantada] =
    useState<DestinoId | null>(null)

  const ancoraTravada =
    useRef(false)

  const cameraRef =
    useRef<CameraInfo | null>(null)

  const aoMoverCamera = (
    evento: any,
  ) => {
    if (ancoraTravada.current) {
      return
    }

    const c = lerCamera(evento)

    if (c) {
      cameraRef.current = c
    }
  }

  const aoEncontrarQr = async (
    anchor: any,
  ) => {
    if (ancoraTravada.current) {
      return
    }

    const p = anchor?.position

    if (!ehVec(p)) {
      return
    }

    ancoraTravada.current = true

    let cam = cameraRef.current

    if (
      !cam &&
      typeof arSceneNavigator?.getCameraOrientationAsync ===
        'function'
    ) {
      try {
        cam = lerCamera(
          await arSceneNavigator.getCameraOrientationAsync(),
        )
      } catch {
        cam = null
      }
    }

    setPosicoes(
      calcularPosicoes(cam, [
        p[0],
        p[1],
        p[2],
      ]),
    )

    onMarcadorEncontrado?.()
  }

  const tocar = (id: DestinoId) => {
    if (bloqueado) {
      return
    }

    setLevantada(id)

    onSelecionarDestino?.(id)
  }

  /*
   * Dispara no instante em que o dedo encosta
   * (estado 1 = ClickDown) ou no toque completo
   * (estado 3 = Clicked). Reagir ao "encostar"
   * evita perder o toque quando o dedo escorrega
   * antes de soltar. Chamadas repetidas sao
   * ignoradas pelo App.
   */
  const aoTocar =
    (id: DestinoId) =>
    (estado: number) => {
      if (DEBUG_TOQUE) {
        console.log('[TOQUE]', id, 'estado', estado)
      }

      if (estado === 1 || estado === 3) {
        tocar(id)
      }
    }

  return (
    <ViroARScene
      onCameraTransformUpdate={
        posicoes ? undefined : aoMoverCamera
      }
    >
      <ViroAmbientLight
        color="#FFFFFF"
        intensity={500}
      />

      <ViroARImageMarker
        target="qrAncora"
        onAnchorFound={aoEncontrarQr}
      />

      {posicoes &&
        DESTINOS.map((d) => {
          const destacado =
            destinoDestacado === d.id

          const toque = aoTocar(d.id)

          return (
            <ViroNode
              key={d.id}
              position={posicoes[d.id]}
              scale={
                destacado
                  ? ESCALA_DESTACADA
                  : ESCALA_NORMAL
              }
              animation={{
                name: 'pulo',
                run: levantada === d.id,
                loop: false,
                onFinish: () =>
                  setLevantada(null),
              }}
            >
              {/* Area de toque invisivel (grande) */}
              <ViroBox
                width={TOQUE_LARGURA}
                height={TOQUE_ALTURA}
                length={TOQUE_PROFUNDIDADE}
                position={[
                  0,
                  TOQUE_ALTURA / 2,
                  0,
                ]}
                materials={['areaToque']}
                opacity={DEBUG_TOQUE ? 0.3 : 0.01}
                onClickState={toque}
              />

              {/* Corpo */}
              <ViroBox
                width={0.042}
                height={0.065}
                length={0.040}
                position={[0, 0.0325, 0]}
                materials={[
                  MATERIAL_POR_DESTINO[d.id],
                ]}
                onClickState={toque}
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
                onClickState={toque}
              />

              {/* Abertura */}
              <ViroBox
                width={0.026}
                height={0.004}
                length={0.018}
                position={[0, 0.075, 0]}
                materials={['aberturaLixeira']}
              />

              {/* Nome (sempre de frente para voce) */}
              <ViroText
                text={d.nome}
                position={[0, 0.103, 0]}
                scale={ESCALA_TEXTO}
                width={2.8}
                height={1}
                fontSize={24}
                color="#FFFFFF"
                textAlign="center"
                textAlignVertical="center"
                transformBehaviors={[
                  'billboardY',
                ]}
                outerStroke={{
                  type: 'Outline',
                  width: 2,
                  color: '#111111',
                }}
              />
            </ViroNode>
          )
        })}
    </ViroARScene>
  )
}