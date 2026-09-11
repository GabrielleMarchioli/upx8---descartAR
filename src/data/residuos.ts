import type { DestinoId } from './lixeiras'

export type Residuo = {
  id: string
  nome: string
  emoji: string
  destinoCorreto: DestinoId
  /** mostrada quando o participante erra: é o momento educativo do app */
  justificativa: string
  /** true quando o item costuma ser destinado errado; são os itens de interesse */
  ambiguo: boolean
}

/**
 * Dois bancos equivalentes, A e B, cada um com metade de itens diretos e metade
 * ambíguos. Necessário porque pré-teste e pós-teste não podem repetir os mesmos
 * itens: isso mediria memória da atividade, não conhecimento sobre descarte.
 */
export const BANCO_A: Residuo[] = [
  {
    id: 'garrafa_pet',
    nome: 'Garrafa PET vazia',
    emoji: '🧴',
    destinoCorreto: 'plastico',
    justificativa: 'PET limpo é reciclável e vai na coleta de plástico.',
    ambiguo: false,
  },
  {
    id: 'lata_aluminio',
    nome: 'Lata de alumínio',
    emoji: '🥫',
    destinoCorreto: 'metal',
    justificativa: 'Alumínio é reciclável infinitas vezes.',
    ambiguo: false,
  },
  {
    id: 'copo_cafe_sujo',
    nome: 'Copo de café usado',
    emoji: '☕',
    destinoCorreto: 'rejeito',
    justificativa:
      'Papel contaminado por líquido e gordura perde a fibra e não é reciclável.',
    ambiguo: true,
  },
  {
    id: 'espelho',
    nome: 'Espelho quebrado',
    emoji: '🪞',
    destinoCorreto: 'rejeito',
    justificativa:
      'Espelho tem camada metálica e ponto de fusão diferente do vidro comum.',
    ambiguo: true,
  },
  {
    id: 'casca_banana',
    nome: 'Casca de banana',
    emoji: '🍌',
    destinoCorreto: 'organico',
    justificativa: 'Resíduo orgânico, destinado à compostagem.',
    ambiguo: false,
  },
  {
    id: 'embalagem_metalizada',
    nome: 'Embalagem de salgadinho',
    emoji: '🍟',
    destinoCorreto: 'rejeito',
    justificativa:
      'Apesar do brilho, é plástico laminado multicamada, sem reciclagem usual.',
    ambiguo: true,
  },
]

export const BANCO_B: Residuo[] = [
  {
    id: 'jornal',
    nome: 'Jornal velho',
    emoji: '📰',
    destinoCorreto: 'papel',
    justificativa: 'Papel seco e limpo é reciclável.',
    ambiguo: false,
  },
  {
    id: 'garrafa_vidro',
    nome: 'Garrafa de vidro',
    emoji: '🍾',
    destinoCorreto: 'vidro',
    justificativa: 'Vidro de embalagem é reciclável integralmente.',
    ambiguo: false,
  },
  {
    id: 'caixa_pizza',
    nome: 'Caixa de pizza engordurada',
    emoji: '🍕',
    destinoCorreto: 'rejeito',
    justificativa:
      'A gordura impede a separação das fibras no processo de reciclagem.',
    ambiguo: true,
  },
  {
    id: 'guardanapo',
    nome: 'Guardanapo usado',
    emoji: '🧻',
    destinoCorreto: 'rejeito',
    justificativa: 'Papel sanitário usado não retorna à cadeia de reciclagem.',
    ambiguo: true,
  },
  {
    id: 'borra_cafe',
    nome: 'Borra de café',
    emoji: '☕',
    destinoCorreto: 'organico',
    justificativa: 'Compostável, e ainda serve como adubo.',
    ambiguo: false,
  },
  {
    id: 'isopor',
    nome: 'Bandeja de isopor',
    emoji: '📦',
    destinoCorreto: 'plastico',
    justificativa:
      'Isopor é poliestireno expandido: reciclável como plástico onde há coleta, desde que limpo.',
    ambiguo: true,
  },
]

export const BANCOS = { A: BANCO_A, B: BANCO_B }
