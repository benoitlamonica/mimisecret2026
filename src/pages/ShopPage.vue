<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import BoosterOpeningOverlay from '@/components/BoosterOpeningOverlay.vue'
import UiButton from '@/components/UiButton.vue'
import {
  CLASSIC_BOOSTER_COST,
  SPECIAL_BOOSTER_COST,
  usePoints,
} from '@/composables/usePoints'

const boosterOverlay = ref<{ open: (kind: 'standard' | 'special') => void } | null>(null)
const { points, spendPoints } = usePoints()

function buyBooster(kind: 'standard' | 'special') {
  const cost = kind === 'standard' ? CLASSIC_BOOSTER_COST : SPECIAL_BOOSTER_COST
  if (!spendPoints(cost)) return

  boosterOverlay.value?.open(kind)
}
</script>

<template>
  <div class="min-h-screen bg-[#101a26] text-[#f7f3ea]">
    <AppHeader />

    <main class="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-10">
      <section class="snow-drift relative overflow-hidden rounded-4xl border border-white/10 bg-[#172536] px-6 py-12 md:px-12">
        <div class="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-[#b46e36]/20 blur-3xl"></div>
        <div class="relative flex flex-wrap items-end justify-between gap-8">
          <div>
            <p class="mb-4 text-xs font-bold uppercase tracking-[.3em] text-[#e2bd72]">La réserve de Mimi</p>
            <h1 class="font-display text-6xl leading-none text-[#fff9ed] md:text-8xl">La boutique</h1>
            <p class="mt-6 max-w-xl text-lg leading-relaxed text-[#b9c5cc]">Échange tes points Mimi contre des boosters et agrandis ta collection.</p>
          </div>
          <div class="rounded-2xl border border-[#e2bd72]/30 bg-[#e2bd72]/10 px-6 py-4 text-right">
            <p class="text-xs uppercase tracking-[.2em] text-[#aebdc2]">Mon solde</p>
            <p class="mt-1 font-display text-4xl text-[#f2d58d]">{{ points }} <span class="text-base">pts</span></p>
          </div>
        </div>
      </section>

      <section class="grid gap-6 py-12 md:grid-cols-2">
        <article class="relative overflow-hidden rounded-2xl border border-[#d6b975]/30 bg-[#172536] p-8">
          <div class="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#31576a]/40 blur-3xl"></div>
          <div class="relative">
            <p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Le classique</p>
            <h2 class="font-display text-4xl text-[#fff8e9]">Booster quotidien</h2>
            <p class="mt-4 min-h-14 leading-relaxed text-[#9cafb6]">Cinq cartes avec une rareté garantie à partir de Rare.</p>
            <div class="mt-8 flex items-center justify-between gap-4"><span class="font-display text-3xl text-[#f2d58d]">{{ CLASSIC_BOOSTER_COST }} pts</span><UiButton :disabled="points < CLASSIC_BOOSTER_COST" @click="buyBooster('standard')">Acheter</UiButton></div>
          </div>
        </article>
        <article class="relative overflow-hidden rounded-2xl border border-[#e2bd72]/50 bg-linear-to-br from-[#4a3b2a] via-[#302b2d] to-[#172536] p-8">
          <div class="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#e2bd72]/20 blur-3xl"></div>
          <div class="relative">
            <p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#f2d58d]">Le précieux</p>
            <h2 class="font-display text-4xl text-[#fff8e9]">Booster spécial</h2>
            <p class="mt-4 min-h-14 leading-relaxed text-[#c5bca8]">Cinq cartes avec des chances renforcées sur les grandes raretés.</p>
            <div class="mt-8 flex items-center justify-between gap-4"><span class="font-display text-3xl text-[#f2d58d]">{{ SPECIAL_BOOSTER_COST }} pts</span><UiButton :disabled="points < SPECIAL_BOOSTER_COST" @click="buyBooster('special')">Acheter</UiButton></div>
          </div>
        </article>
      </section>
    </main>

    <BoosterOpeningOverlay ref="boosterOverlay" />
  </div>
</template>
