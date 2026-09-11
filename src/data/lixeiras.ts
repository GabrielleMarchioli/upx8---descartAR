export type DestinoId =
  | 'papel'
  | 'plastico'
  | 'vidro'
  | 'metal'
  | 'organico'
  | 'rejeito'

export type Destino = {
  id: DestinoId
  nome: string
  cor: string
  posicao: [number, number, number]
}

export const DESTINOS: Destino[] = [
  {
    id: 'papel',
    nome: 'Papel',
    cor: '#1E5FA8',
    posicao: [-0.13, 0, 0.018],
  },
  {
    id: 'plastico',
    nome: 'Plástico',
    cor: '#E52521',
    posicao: [-0.078, 0, 0.005],
  },
  {
    id: 'vidro',
    nome: 'Vidro',
    cor: '#27A844',
    posicao: [-0.026, 0, -0.01],
  },
  {
    id: 'metal',
    nome: 'Metal',
    cor: '#F2C318',
    posicao: [0.026, 0, -0.01],
  },
  {
    id: 'organico',
    nome: 'Orgânico',
    cor: '#8B4A18',
    posicao: [0.078, 0, 0.005],
  },
  {
    id: 'rejeito',
    nome: 'Rejeito',
    cor: '#777777',
    posicao: [0.13, 0, 0.018],
  },
]

export const destinoPorId = (id: DestinoId) =>
  DESTINOS.find((d) => d.id === id)!