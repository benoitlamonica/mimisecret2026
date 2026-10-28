<script setup lang="ts">
import type { Card, Rarity } from '@/data/cards'

const props = withDefaults(defineProps<{
  card: Card
  disabled?: boolean
  mystery?: boolean
}>(), {
  disabled: false,
  mystery: false,
})

const rarityStyles: Record<Rarity, { frame: string; badge: string; glow: string; symbol: string }> = {
  Commun: {
    frame: 'from-[#d3d8d5] via-[#f5f4ed] to-[#9ca8a7]',
    badge: 'bg-[#e9eee9] text-[#53645f]',
    glow: 'shadow-[0_0_30px_rgba(212,224,220,.2)]',
    symbol: 'text-[#d4e4de]',
  },
  Rare: {
    frame: 'from-[#9fc8d6] via-[#effaff] to-[#4d879b]',
    badge: 'bg-[#d9f3fa] text-[#236078]',
    glow: 'shadow-[0_0_20px_rgba(118,205,231,.14)]',
    symbol: 'text-[#9fe3f2]',
  },
  Épique: {
    frame: 'from-[#dab8ff] via-[#fff5ff] to-[#8452bd]',
    badge: 'bg-[#f0ddff] text-[#71409d]',
    glow: 'shadow-[0_0_22px_rgba(205,134,255,.18)]',
    symbol: 'text-[#d2a4ff]',
  },
  Légendaire: {
    frame: 'from-[#f6dc93] via-[#fffaf0] to-[#b56b20]',
    badge: 'bg-[#fff0bc] text-[#95601d]',
    glow: 'shadow-[0_0_22px_rgba(245,191,79,.18)]',
    symbol: 'text-[#e7c56e]',
  },
  Extraordinaire: {
    frame: 'from-[#ff8fb3] via-[#f6dc75] to-[#8ddcff]',
    badge: 'bg-gradient-to-r from-[#ffd5e4] via-[#fff2b0] to-[#c6f4ff] text-[#76517d]',
    glow: 'shadow-[0_0_55px_rgba(255,182,117,.45)]',
    symbol: 'text-[#ff72b6]',
  },
}

const style = () => rarityStyles[props.card.rarity]
</script>

<template>
  <button
    :disabled="disabled"
    :aria-disabled="disabled"
    :class="{ 'ui-card--rare': card.rarity === 'Rare', 'ui-card--epic': card.rarity === 'Épique', 'ui-card--legendary': card.rarity === 'Légendaire', 'ui-card--extraordinary': card.rarity === 'Extraordinaire' }"
    class="ui-card group w-full text-left disabled:cursor-not-allowed"
    :aria-label="mystery ? 'Carte extraordinaire mystérieuse' : `Voir la carte ${card.name}`"
  >
    <div
      :class="[style().glow, `bg-linear-to-br ${style().frame}`, { 'opacity-35 grayscale': disabled && !mystery, 'group-hover:-translate-y-2': !disabled }]"
      class="rounded-2xl p-1 transition duration-300"
    >
      <div class="ui-card__surface card-shine aspect-[.72] rounded-[.8rem] border border-black/20 bg-[#172536]">
        <div
          v-if="mystery"
          class="ui-card__mystery grid h-full place-items-center text-center"
        >
          <div><span class="ui-card__mystery-mark">?</span><p class="mt-3 text-[10px] uppercase tracking-[.2em] text-[#e2bd72]">Carte secrète</p></div>
        </div>
        <template v-else>
          <div class="ui-card__meta flex justify-between uppercase text-[#b5c3c4]">
            <span>{{ card.type }}</span>
            <span>{{ card.symbol }}</span>
          </div>
          <div class="grid h-[58%] place-items-center">
            <span
              :class="style().symbol"
              class="ui-card__symbol drop-shadow-[0_0_20px_currentColor]"
            >{{ card.symbol }}</span>
          </div>
          <div class="border-t border-white/15 pt-3">
            <p
              :title="card.name"
              class="ui-card__name font-display text-[#fff8e9]"
            >
              {{ card.name }}
            </p>
            <p class="ui-card__description mt-1 line-clamp-2 text-[#9cafb6]">{{ card.description }}</p>
            <span
              :class="style().badge"
              class="ui-card__badge mt-2 inline-block rounded-full px-2.5 py-1 font-bold uppercase tracking-wider"
            >{{ card.rarity }}</span>
          </div>
        </template>
      </div>
    </div>
  </button>
</template>
