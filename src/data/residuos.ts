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
 * Dois bancos equivalentes, A e B, com 30 itens cada: 5 por lixeira, sendo
 * 15 diretos e 15 ambíguos. Necessário porque pré-teste e pós-teste não podem
 * repetir os mesmos itens: isso mediria memória da atividade, não conhecimento
 * sobre descarte.
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
    id: 'revista',
    nome: 'Revista velha',
    emoji: '📖',
    destinoCorreto: 'papel',
    justificativa:
      'Papel de revista é reciclável, mesmo o couchê.',
    ambiguo: false,
  },
  {
    id: 'folha_sulfite',
    nome: 'Folha de sulfite',
    emoji: '📄',
    destinoCorreto: 'papel',
    justificativa:
      'Papel de escritório limpo é reciclável.',
    ambiguo: false,
  },
  {
    id: 'envelope_janela',
    nome: 'Envelope com janelinha plástica',
    emoji: '✉️',
    destinoCorreto: 'papel',
    justificativa:
      'A janelinha não impede a reciclagem; o conjunto vai junto na coleta de papel.',
    ambiguo: true,
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
    id: 'pote_iogurte',
    nome: 'Pote de iogurte',
    emoji: '🥣',
    destinoCorreto: 'plastico',
    justificativa:
      'Embalagem plástica rígida e limpa é reciclável.',
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
    id: 'tampa_garrafa',
    nome: 'Tampa de garrafa PET',
    emoji: '🔘',
    destinoCorreto: 'plastico',
    justificativa:
      'A tampa é plástico reciclável; pode seguir junto com a garrafa.',
    ambiguo: true,
  },
  {
    id: 'frasco_detergente',
    nome: 'Frasco de detergente vazio',
    emoji: '🧼',
    destinoCorreto: 'plastico',
    justificativa:
      'Frasco de limpeza vazio e enxaguado é reciclável.',
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
    id: 'garrafa_cerveja',
    nome: 'Garrafa de cerveja',
    emoji: '🍺',
    destinoCorreto: 'vidro',
    justificativa:
      'Vidro de embalagem é reciclável; o rótulo não atrapalha.',
    ambiguo: false,
  },
  {
    id: 'pote_geleia',
    nome: 'Pote de geleia',
    emoji: '🍯',
    destinoCorreto: 'vidro',
    justificativa:
      'Pote de vidro vazio vai na coleta de vidro.',
    ambiguo: false,
  },
  {
    id: 'frasco_perfume',
    nome: 'Frasco de perfume vazio',
    emoji: '🧪',
    destinoCorreto: 'vidro',
    justificativa:
      'Vidro de embalagem é reciclável, mesmo sendo pequeno.',
    ambiguo: true,
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
    id: 'lata_conserva',
    nome: 'Lata de conserva',
    emoji: '🥫',
    destinoCorreto: 'metal',
    justificativa:
      'Aço da lata é reciclável; basta esvaziar e enxaguar.',
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
    id: 'lata_aerosol',
    nome: 'Lata de aerossol vazia',
    emoji: '💨',
    destinoCorreto: 'metal',
    justificativa:
      'Lata totalmente vazia é reciclável como metal.',
    ambiguo: true,
  },
  {
    id: 'tampa_metal',
    nome: 'Tampa metálica de garrafa',
    emoji: '🔩',
    destinoCorreto: 'metal',
    justificativa:
      'Tampinha de metal é reciclável; junte várias para não se perderem na triagem.',
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
    id: 'sobra_legumes',
    nome: 'Sobra de legumes',
    emoji: '🥕',
    destinoCorreto: 'organico',
    justificativa:
      'Restos vegetais são compostáveis.',
    ambiguo: false,
  },
  {
    id: 'folhas_secas',
    nome: 'Folhas secas',
    emoji: '🍂',
    destinoCorreto: 'organico',
    justificativa:
      'Material vegetal é compostável.',
    ambiguo: false,
  },
  {
    id: 'casca_ovo',
    nome: 'Casca de ovo',
    emoji: '🥚',
    destinoCorreto: 'organico',
    justificativa:
      'É orgânica e compostável, e ainda fornece cálcio ao composto.',
    ambiguo: true,
  },
  {
    id: 'filtro_cafe',
    nome: 'Filtro de papel com pó de café',
    emoji: '☕',
    destinoCorreto: 'organico',
    justificativa:
      'Papel e pó de café são compostáveis juntos.',
    ambiguo: true,
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
    id: 'embalagem_metalizada',
    nome: 'Embalagem de salgadinho',
    emoji: '🍟',
    destinoCorreto: 'rejeito',
    justificativa:
      'Apesar do brilho, é plástico laminado multicamada, sem reciclagem usual.',
    ambiguo: true,
  },
  {
    id: 'fralda',
    nome: 'Fralda descartável',
    emoji: '🍼',
    destinoCorreto: 'rejeito',
    justificativa:
      'Material sanitário usado não é reciclável.',
    ambiguo: false,
  },
  {
    id: 'ponta_cigarro',
    nome: 'Ponta de cigarro',
    emoji: '🚬',
    destinoCorreto: 'rejeito',
    justificativa:
      'O filtro é de material não reciclável.',
    ambiguo: false,
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
    id: 'caixa_ovos',
    nome: 'Cartela de ovos de papelão',
    emoji: '🥚',
    destinoCorreto: 'papel',
    justificativa:
      'Papelão moldado é reciclável quando seco e limpo.',
    ambiguo: false,
  },
  {
    id: 'folheto',
    nome: 'Folheto de propaganda',
    emoji: '📑',
    destinoCorreto: 'papel',
    justificativa:
      'Papel impresso é reciclável.',
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
    id: 'caixa_fita',
    nome: 'Caixa de papelão com fita adesiva',
    emoji: '📦',
    destinoCorreto: 'papel',
    justificativa:
      'A fita não impede a reciclagem do papelão.',
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
    id: 'pote_sorvete',
    nome: 'Pote de sorvete',
    emoji: '🍦',
    destinoCorreto: 'plastico',
    justificativa:
      'Plástico rígido e limpo é reciclável.',
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
    id: 'copo_descartavel',
    nome: 'Copo plástico descartável',
    emoji: '🥤',
    destinoCorreto: 'plastico',
    justificativa:
      'Copo de poliestireno limpo é reciclável como plástico.',
    ambiguo: true,
  },
  {
    id: 'tampa_pote',
    nome: 'Tampa de pote plástico',
    emoji: '🔘',
    destinoCorreto: 'plastico',
    justificativa:
      'É plástico reciclável; vai junto com as demais embalagens plásticas.',
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
    id: 'pote_palmito',
    nome: 'Pote de palmito',
    emoji: '🫙',
    destinoCorreto: 'vidro',
    justificativa:
      'Vidro de embalagem vazio vai na coleta de vidro.',
    ambiguo: false,
  },
  {
    id: 'vidro_molho',
    nome: 'Vidro de molho',
    emoji: '🍅',
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
    id: 'garrafa_rotulo',
    nome: 'Garrafa de vidro com rótulo',
    emoji: '🍷',
    destinoCorreto: 'vidro',
    justificativa:
      'O rótulo de papel sai no processo; a garrafa é reciclável.',
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
    id: 'lata_atum',
    nome: 'Lata de atum',
    emoji: '🐟',
    destinoCorreto: 'metal',
    justificativa:
      'Aço da lata é reciclável; basta enxaguar.',
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
    id: 'panela_velha',
    nome: 'Panela velha',
    emoji: '🍳',
    destinoCorreto: 'metal',
    justificativa:
      'Utensílio de metal vai para reciclagem como sucata metálica.',
    ambiguo: true,
  },
  {
    id: 'clipes',
    nome: 'Clipes de papel',
    emoji: '📎',
    destinoCorreto: 'metal',
    justificativa:
      'São de aço e recicláveis; junte em uma lata para não se perderem.',
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
    id: 'casca_laranja',
    nome: 'Casca de laranja',
    emoji: '🍊',
    destinoCorreto: 'organico',
    justificativa:
      'Casca de fruta é compostável.',
    ambiguo: false,
  },
  {
    id: 'flores_murchas',
    nome: 'Flores murchas',
    emoji: '🥀',
    destinoCorreto: 'organico',
    justificativa:
      'Material vegetal é compostável.',
    ambiguo: false,
  },
  {
    id: 'saquinho_cha',
    nome: 'Sachê de chá usado',
    emoji: '🍵',
    destinoCorreto: 'organico',
    justificativa:
      'Erva e papel do sachê são compostáveis, se não houver grampo ou fio plástico.',
    ambiguo: true,
  },
  {
    id: 'restos_arroz',
    nome: 'Sobras de arroz e feijão',
    emoji: '🍚',
    destinoCorreto: 'organico',
    justificativa:
      'Comida cozida também é resíduo orgânico.',
    ambiguo: true,
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
    justificativa:
      'Papel sanitário usado não retorna à cadeia de reciclagem.',
    ambiguo: true,
  },
  {
    id: 'ceramica_quebrada',
    nome: 'Prato de cerâmica quebrado',
    emoji: '🍽️',
    destinoCorreto: 'rejeito',
    justificativa:
      'Cerâmica não se funde como o vidro e contamina a reciclagem.',
    ambiguo: true,
  },
  {
    id: 'chiclete',
    nome: 'Chiclete mascado',
    emoji: '🫧',
    destinoCorreto: 'rejeito',
    justificativa:
      'Não há reciclagem para esse material.',
    ambiguo: false,
  },
  {
    id: 'cotonete',
    nome: 'Cotonete usado',
    emoji: '🪥',
    destinoCorreto: 'rejeito',
    justificativa:
      'Material de higiene usado não é reciclável.',
    ambiguo: false,
  },
]

export const BANCOS = { A: BANCO_A, B: BANCO_B }