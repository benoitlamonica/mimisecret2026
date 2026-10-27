<script setup lang="ts">
import type { Card, Rarity } from '@/data/cards'

const props = defineProps<{
  card: Card
}>()

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
    glow: 'shadow-[0_0_32px_rgba(118,205,231,.23)]',
    symbol: 'text-[#9fe3f2]',
  },
  Épique: {
    frame: 'from-[#dab8ff] via-[#fff5ff] to-[#8452bd]',
    badge: 'bg-[#f0ddff] text-[#71409d]',
    glow: 'shadow-[0_0_38px_rgba(205,134,255,.3)]',
    symbol: 'text-[#d2a4ff]',
  },
  Légendaire: {
    frame: 'from-[#f6dc93] via-[#fffaf0] to-[#b56b20]',
    badge: 'bg-[#fff0bc] text-[#95601d]',
    glow: 'shadow-[0_0_48px_rgba(245,191,79,.32)]',
    symbol: 'text-[#e7c56e]',
  },
}

const style = () => rarityStyles[props.card.rarity]
</script>

<template>
  <button class="group w-full text-left" :aria-label="`Voir la carte ${card.name}`">
    <div :class="[style().glow, `bg-linear-to-br ${style().frame}`]" class="rounded-2xl p-1 transition duration-300 group-hover:-translate-y-2">
      <div class="card-shine aspect-[.72] rounded-[.8rem] border border-black/20 bg-[#172536] p-4">
        <div class="flex justify-between text-[9px] uppercase tracking-widest text-[#b5c3c4]">
          <span>{{ card.type }}</span>
          <span>{{ card.symbol }}</span>
        </div>
        <div class="grid h-[68%] place-items-center">
          <span :class="style().symbol" class="text-8xl drop-shadow-[0_0_20px_currentColor]">{{ card.symbol }}</span>
        </div>
        <div class="border-t border-white/15 pt-3">
          <p class="font-display text-2xl text-[#fff8e9]">{{ card.name }}</p>
          <span :class="style().badge" class="mt-2 inline-block rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider">{{ card.rarity }}</span>
        </div>
      </div>
    </div>
  </button>
</template>
