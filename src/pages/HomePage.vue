<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import CardDetailModal from '@/components/CardDetailModal.vue'
import UiButton from '@/components/UiButton.vue'
import UiCard from '@/components/UiCard.vue'
import { exempleCards, rarityDetails, type Card } from '@/data/cards'

const selectedCard = ref<Card | null>(null)
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-[#101a26] text-[#f7f3ea]">
    <AppHeader />

    <main>
      <section class="snow-drift relative isolate mx-4 overflow-hidden rounded-4xl border border-white/10 bg-[#172536] lg:mx-8">
        <div class="absolute -left-40 -top-32 h-96 w-96 rounded-full bg-[#b46e36]/20 blur-3xl"></div>
        <div class="absolute -bottom-48 right-0 h-136 w-136 rounded-full bg-[#254d62]/40 blur-3xl"></div>
        <div class="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:px-12 lg:grid-cols-[1.05fr_.95fr] lg:px-20 lg:py-28">
          <div>
            <p class="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[.3em] text-[#e2bd72]"><span class="h-px w-8 bg-[#e2bd72]"></span>Édition hiver 2026</p>
            <h1 class="max-w-xl font-display text-6xl leading-[.9] text-[#fff9ed] md:text-8xl">Chaque jour,<br><em class="font-normal text-[#e2bd72]">une magie.</em></h1>
            <p class="mt-8 max-w-lg text-lg leading-relaxed text-[#b9c5cc]">Le Secret de Mimi est une aventure de cartes, de questions et de découvertes. Réponds aux défis du calendrier, gagne des points et choisis tes prochains boosters.</p>
            <div class="mt-10 flex flex-wrap gap-4">
              <UiButton
                href="/calendar"
                class="px-7 py-4"
              >
                Découvrir le calendrier <span class="ml-2">→</span>
              </UiButton>
              <UiButton
                href="/shop"
                variant="ghost"
              >
                Visiter la boutique
              </UiButton>
            </div>
            <div class="mt-12 flex items-center gap-8 border-t border-white/10 pt-6 text-sm text-[#8fa0aa]">
              <span><strong class="mr-1 text-xl font-normal text-[#f1e8d2]">3</strong> questions par jour</span>
              <span><strong class="mr-1 text-xl font-normal text-[#f1e8d2]">10</strong> points par bonne réponse</span>
            </div>
          </div>

          <div class="relative mx-auto w-full max-w-100">
            <div class="absolute -right-4 top-4 h-full w-full rotate-[9deg] rounded-2xl border border-[#d6b975]/30 bg-[#ae7336]/20"></div>
            <div class="absolute -left-4 top-3 h-full w-full rotate-[-7deg] rounded-2xl border border-[#8cb3bd]/30 bg-[#31576a]/20"></div>
            <div class="relative rounded-2xl border border-[#f2d58d]/60 bg-linear-to-br from-[#d6b972] via-[#f6e5ad] to-[#a96930] p-1 shadow-[0_20px_80px_rgba(0,0,0,.4)]">
              <div class="card-shine flex aspect-[.7] flex-col justify-between rounded-[.8rem] border border-[#8f5d29]/50 bg-[#172536] p-6 text-center">
                <div class="flex items-center justify-between text-[9px] uppercase tracking-[.25em] text-[#e4c67d]"><span>Collection 01</span><span>✦</span></div>
                <div>
                  <div class="mx-auto mb-7 grid h-36 w-36 place-items-center rounded-full border border-[#e4c67d]/30 bg-[#e4c67d]/5 text-8xl text-[#e4c67d] shadow-[0_0_50px_rgba(228,198,125,.18)]">✦</div>
                  <p class="font-display text-4xl text-[#fff8df]">Le Secret</p>
                  <p class="mt-2 text-[10px] uppercase tracking-[.35em] text-[#aebdc2]">Calendrier enchanté</p>
                </div>
                <div class="flex items-end justify-between border-t border-[#e4c67d]/20 pt-4 text-left"><span class="text-[9px] uppercase tracking-widest text-[#aebdc2]">Cartes à collectionner</span><span class="font-display text-2xl text-[#e4c67d]">✦</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-[#152331] px-6 py-24 lg:px-10">
        <div class="mx-auto max-w-7xl">
          <div class="mb-12 max-w-xl"><p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">À collectionner</p><h2 class="font-display text-5xl text-[#fff8e9]">Chaque carte a son éclat.</h2><p class="mt-5 leading-relaxed text-[#94a8b0]">Des trouvailles délicates aux trésors les plus convoités, cinq niveaux de rareté rendent chaque ouverture unique.</p></div>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="(rarity, index) in rarityDetails"
              :key="rarity.name"
              :class="`rarity-${rarity.color}`"
              class="rounded-2xl border border-white/10 bg-[#1b2c3b] p-6 transition hover:-translate-y-1"
            >
              <div class="mb-12 flex items-center justify-between"><span class="font-display text-4xl">{{ rarity.name === 'Extraordinaire' ? '✹' : rarity.name === 'Légendaire' ? '★' : rarity.name === 'Épique' ? '✧' : rarity.name === 'Rare' ? '◆' : '✦' }}</span><span class="text-[10px] uppercase tracking-[.2em] text-[#84969e]">{{ String(index + 1).padStart(2, '0') }} / {{ rarityDetails.length }}</span></div>
              <h3 class="font-display text-2xl text-[#f8f2e5]">{{ rarity.name }}</h3><p class="mt-2 text-sm leading-relaxed text-[#8fa0aa]">{{ rarity.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div class="mb-12 flex items-end justify-between"><div><p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Un avant-goût</p><h2 class="font-display text-5xl text-[#fff8e9]">Les premières merveilles</h2></div><span class="hidden text-sm text-[#778b95] md:block">Collection 01</span></div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <UiCard
            v-for="card in exempleCards"
            :key="card.id"
            :card="card"
            :rarity="card.rarity"
            @click="selectedCard = card"
          />
        </div>
      </section>
    </main>

    <footer class="border-t border-white/10 px-6 py-8 text-center text-xs text-[#71858e]"><span class="font-display text-lg text-[#d9c48e]">Le Secret de Mimi</span><span class="mx-3 text-[#425661]">·</span>Une carte, chaque jour, jusqu’à Noël.</footer>

    <CardDetailModal
      v-if="selectedCard"
      v-model="selectedCard"
      :card="selectedCard"
    />
  </div>
</template>
