export interface BudgetTierJson {
  value: number
  label: string
  price: string
  icon: string
  features: string[]
}

export interface VibeStyleJson {
  gradient: string
  icon: string
}

export interface SpotJson {
  title: string
  description: string
  vibe: string
  budgetTier: number
}

export interface SpotsData {
  vibeFilters: string[]
  budgetTiers: BudgetTierJson[]
  vibeStyles: Record<string, VibeStyleJson>
  spots: SpotJson[]
}
