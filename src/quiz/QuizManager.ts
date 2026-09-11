import type { DestinoId } from '../data/lixeiras'
import type { Residuo } from '../data/residuos'

export type Tentativa = {
  residuoId: string
  escolhido: DestinoId
  correto: DestinoId
  acerto: boolean
  /** ms desde que o item foi apresentado */
  latenciaMs: number
}

export type Confusao = {
  residuoId: string
  residuoNome: string
  escolhido: DestinoId
  correto: DestinoId
  vezes: number
}

export type Resumo = {
  participante: string
  banco: 'A' | 'B'
  iniciadoEm: string
  duracaoMs: number
  totalItens: number
  acertosPrimeiraTentativa: number
  latenciaMediaMs: number
  /** separado por tipo de item: é a comparação central do trabalho */
  acertosItensDiretos: number
  acertosItensAmbiguos: number
  tentativas: Tentativa[]
  confusoes: Confusao[]
}

/**
 * Controla o percurso do participante pelo banco de itens.
 *
 * O dado que interessa não é o placar. É registrar PARA ONDE o participante
 * mandou cada resíduo quando errou: a matriz de confusão resultante mostra
 * padrões sistemáticos (papel contaminado indo para a coleta de papel, por
 * exemplo) que uma prova de múltipla escolha não revelaria.
 */
export class QuizManager {
  private itens: Residuo[]
  private indice = 0
  private tentativas: Tentativa[] = []
  private itemMostradoEm = 0
  private iniciadoEm = 0

  constructor(
    itens: Residuo[],
    private banco: 'A' | 'B',
    private participante: string,
  ) {
    this.itens = itens
  }

  iniciar() {
    this.iniciadoEm = Date.now()
    this.itemMostradoEm = Date.now()
    this.indice = 0
    this.tentativas = []
  }

  get atual(): Residuo | null {
    return this.itens[this.indice] ?? null
  }

  get progresso() {
    return {
      atual: Math.min(this.indice + 1, this.itens.length),
      total: this.itens.length,
    }
  }

  get finalizado() {
    return this.indice >= this.itens.length
  }

  /**
   * Registra a escolha. No acerto avança; no erro permanece no mesmo item para
   * que o participante tente de novo depois de ler a justificativa.
   */
  responder(escolhido: DestinoId): { acerto: boolean; justificativa: string } {
    const item = this.atual
    if (!item) return { acerto: false, justificativa: '' }

    const acerto = escolhido === item.destinoCorreto

    this.tentativas.push({
      residuoId: item.id,
      escolhido,
      correto: item.destinoCorreto,
      acerto,
      latenciaMs: Date.now() - this.itemMostradoEm,
    })

    if (acerto) this.avancar()

    return { acerto, justificativa: item.justificativa }
  }

  pular() {
    if (this.atual) this.avancar()
  }

  private avancar() {
    this.indice += 1
    this.itemMostradoEm = Date.now()
  }

  resumo(): Resumo {
    // Só a primeira tentativa de cada item conta como acerto: é ela que mede
    // conhecimento prévio, sem o efeito da justificativa já exibida.
    const primeiras = new Map<string, Tentativa>()
    for (const t of this.tentativas) {
      if (!primeiras.has(t.residuoId)) primeiras.set(t.residuoId, t)
    }
    const primeirasLista = [...primeiras.values()]

    const acertouItem = (id: string) => primeiras.get(id)?.acerto === true
    const ambiguos = this.itens.filter((i) => i.ambiguo)
    const diretos = this.itens.filter((i) => !i.ambiguo)

    const contagem = new Map<string, Confusao>()
    for (const t of this.tentativas) {
      if (t.acerto) continue
      const chave = `${t.residuoId}>${t.escolhido}`
      const nome = this.itens.find((i) => i.id === t.residuoId)?.nome ?? t.residuoId
      const atual = contagem.get(chave) ?? {
        residuoId: t.residuoId,
        residuoNome: nome,
        escolhido: t.escolhido,
        correto: t.correto,
        vezes: 0,
      }
      atual.vezes += 1
      contagem.set(chave, atual)
    }

    const somaLatencias = primeirasLista.reduce((s, t) => s + t.latenciaMs, 0)

    return {
      participante: this.participante,
      banco: this.banco,
      iniciadoEm: new Date(this.iniciadoEm).toISOString(),
      duracaoMs: Date.now() - this.iniciadoEm,
      totalItens: this.itens.length,
      acertosPrimeiraTentativa: primeirasLista.filter((t) => t.acerto).length,
      latenciaMediaMs: primeirasLista.length
        ? Math.round(somaLatencias / primeirasLista.length)
        : 0,
      acertosItensDiretos: diretos.filter((i) => acertouItem(i.id)).length,
      acertosItensAmbiguos: ambiguos.filter((i) => acertouItem(i.id)).length,
      tentativas: this.tentativas,
      confusoes: [...contagem.values()].sort((a, b) => b.vezes - a.vezes),
    }
  }
}

export function embaralhar<T>(itens: T[]): T[] {
  const copia = [...itens]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}
