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
 * Dois bancos equivalentes, A e B, com 10 itens cada: 5 diretos e 5 ambíguos,
 * cobrindo as seis lixeiras (papel, plástico, vidro e metal com 1 direto e
 * 1 ambíguo; orgânico com 1 direto; rejeito com 1 ambíguo). Necessário porque
 * pré-teste e pós-teste não podem repetir os mesmos itens: isso mediria
 * memória da atividade, não conhecimento sobre descarte.
 */
export const BANCO_A: Residuo[] = [
  {
    id: 'caixa_papelao',
    nome: 'Caixa de papelão limpa',
    emoji: '📦',
    destinoCorreto: 'papel',
    justificativa:
      'Papelão seco e limpo é reciclável.',
    ambiguo: false,
  },
  {
    id: 'caixa_longa_vida',
    nome: 'Caixa de leite longa vida',
    emoji: '🥛',
    destinoCorreto: 'papel',
    justificativa:
      'Embalagem cartonada é reciclável e acompanha a coleta de papel, apesar das camadas de plástico e alumínio.',
    ambiguo: true,
  },
  {
    id: 'garrafa_pet',
    nome: 'Garrafa PET vazia',
    emoji: '🧴',
    destinoCorreto: 'plastico',
    justificativa:
      'PET limpo é reciclável e vai na coleta de plástico.',
    ambiguo: false,
  },
  {
    id: 'sacola_plastica',
    nome: 'Sacola plástica',
    emoji: '🛍️',
    destinoCorreto: 'plastico',
    justificativa:
      'Sacola limpa e seca é reciclável como plástico filme.',
    ambiguo: true,
  },
  {
    id: 'pote_conserva',
    nome: 'Pote de conserva de vidro',
    emoji: '🫙',
    destinoCorreto: 'vidro',
    justificativa:
      'Vidro de embalagem é reciclável integralmente.',
    ambiguo: false,
  },
  {
    id: 'garrafa_quebrada',
    nome: 'Garrafa de vidro quebrada',
    emoji: '🍾',
    destinoCorreto: 'vidro',
    justificativa:
      'Cacos de vidro de embalagem são recicláveis; embrulhe em jornal para proteger quem coleta.',
    ambiguo: true,
  },
  {
    id: 'lata_aluminio',
    nome: 'Lata de alumínio',
    emoji: '🥫',
    destinoCorreto: 'metal',
    justificativa:
      'Alumínio é reciclável infinitas vezes.',
    ambiguo: false,
  },
  {
    id: 'papel_aluminio',
    nome: 'Papel alumínio limpo',
    emoji: '🎞️',
    destinoCorreto: 'metal',
    justificativa:
      'Alumínio limpo e amassado em bola é reciclável.',
    ambiguo: true,
  },
  {
    id: 'casca_banana',
    nome: 'Casca de banana',
    emoji: '🍌',
    destinoCorreto: 'organico',
    justificativa:
      'Resíduo orgânico, destinado à compostagem.',
    ambiguo: false,
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
]

export const BANCO_B: Residuo[] = [
  {
    id: 'jornal',
    nome: 'Jornal velho',
    emoji: '📰',
    destinoCorreto: 'papel',
    justificativa:
      'Papel seco e limpo é reciclável.',
    ambiguo: false,
  },
  {
    id: 'caderno_espiral',
    nome: 'Caderno com espiral',
    emoji: '📓',
    destinoCorreto: 'papel',
    justificativa:
      'O papel é reciclável; a espiral metálica é separada na triagem.',
    ambiguo: true,
  },
  {
    id: 'garrafa_agua',
    nome: 'Garrafa de água vazia',
    emoji: '💧',
    destinoCorreto: 'plastico',
    justificativa:
      'PET limpo é reciclável e vai na coleta de plástico.',
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
  {
    id: 'garrafa_vidro',
    nome: 'Garrafa de vidro',
    emoji: '🍾',
    destinoCorreto: 'vidro',
    justificativa:
      'Vidro de embalagem é reciclável integralmente.',
    ambiguo: false,
  },
  {
    id: 'frasco_remedio',
    nome: 'Frasco de xarope vazio',
    emoji: '💊',
    destinoCorreto: 'vidro',
    justificativa:
      'Frasco de vidro vazio é reciclável.',
    ambiguo: true,
  },
  {
    id: 'lata_refrigerante',
    nome: 'Lata de refrigerante',
    emoji: '🥤',
    destinoCorreto: 'metal',
    justificativa:
      'Alumínio é reciclável infinitas vezes.',
    ambiguo: false,
  },
  {
    id: 'marmita_aluminio',
    nome: 'Marmita de alumínio',
    emoji: '🍱',
    destinoCorreto: 'metal',
    justificativa:
      'Alumínio é reciclável mesmo com leve sujeira; enxágue antes.',
    ambiguo: true,
  },
  {
    id: 'borra_cafe',
    nome: 'Borra de café',
    emoji: '☕',
    destinoCorreto: 'organico',
    justificativa:
      'Compostável, e ainda serve como adubo.',
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
]

export const BANCOS = { A: BANCO_A, B: BANCO_B }