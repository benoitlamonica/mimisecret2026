<script setup lang="ts">
import { ref } from 'vue'
import { exempleCards, rarityDetails, type Card } from '@/data/cards'
import UiCard from '@/components/UiCard.vue'
import UiButton from '@/components/UiButton.vue'
import { useAdventCalendar } from '@/composables/useAdventCalendar'
import { useBoosterOpening } from '@/composables/useBoosterOpening'

const selectedCard = ref<Card | null>(null)
const openedDay = ref(1)
const {
  availableBoosters,
  canOpenBooster,
  claimDay,
  claimBooster,
  isDayClaimed,
  isDayUnlocked,
  totalDays,
  unlockedDays,
} = useAdventCalendar()
const {
  boosterCards,
  boosterPhase,
  closeBooster,
  cutBooster,
  isCardRevealed,
  isCutting,
  isDraggingPack,
  movePackDrag,
  isOpening,
  openBooster,
  packDragProgress,
  rarityEffect,
  revealCard,
  revealedCards,
  startPackDrag,
  endPackDrag,
} = useBoosterOpening()

function openDailyBooster(day?: number) {
  if (isOpening.value || !canOpenBooster.value) return

  const claimedDay = day === undefined ? claimBooster() : claimDay(day)
  if (!claimedDay) return

  openedDay.value = claimedDay
  openBooster()
}

function handlePackPointerDown(event: PointerEvent) {
  const target = event.currentTarget
  if (target instanceof HTMLElement) target.setPointerCapture(event.pointerId)
  startPackDrag(event.clientX)
}

function handlePackPointerMove(event: PointerEvent) {
  movePackDrag(event.clientX)
}

function handlePackPointerUp() {
  endPackDrag()
}
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-[#101a26] text-[#f7f3ea]">
    <header class="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
      <a href="#" class="flex items-center gap-3" aria-label="Le Secret de Mimi, accueil">
        <span class="grid h-10 w-10 place-items-center rounded-full border border-[#d6b975]/40 bg-[#d6b975]/10 text-xl text-[#f2d58d]">✦</span>
        <span class="font-display text-xl tracking-wide text-[#fff8e9]">Le Secret de Mimi</span>
      </a>
      <nav class="hidden items-center gap-8 text-sm text-[#b8c2c8] md:flex">
        <a class="transition hover:text-[#f2d58d]" href="#concept">Le concept</a>
        <a class="transition hover:text-[#f2d58d]" href="#raretés">Les raretés</a>
        <a class="transition hover:text-[#f2d58d]" href="#cartes">Les cartes</a>
        <a class="transition hover:text-[#f2d58d]" href="/collection">Ma collection</a>
      </nav>
      <UiButton href="#ouvrir" variant="secondary" class="px-5 py-2.5 text-xs uppercase tracking-[.18em]">Ouvrir {{ availableBoosters }} booster{{ availableBoosters > 1 ? 's' : '' }}</UiButton>
    </header>

    <main>
      <section id="concept" class="snow-drift relative isolate mx-4 overflow-hidden rounded-4xl border border-white/10 bg-[#172536] lg:mx-8">
        <div class="absolute -left-40 -top-32 h-96 w-96 rounded-full bg-[#b46e36]/20 blur-3xl"></div>
        <div class="absolute -bottom-48 right-0 h-136 w-136 rounded-full bg-[#254d62]/40 blur-3xl"></div>
        <div class="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:px-12 lg:grid-cols-[1.05fr_.95fr] lg:px-20 lg:py-28">
          <div>
            <p class="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[.3em] text-[#e2bd72]"><span class="h-px w-8 bg-[#e2bd72]"></span>Édition hiver 2026</p>
            <h1 class="text-balance max-w-xl font-display text-6xl leading-[.9] text-[#fff9ed] md:text-8xl">Chaque jour,<br><em class="font-normal text-[#e2bd72]">une magie.</em></h1>
            <p class="mt-8 max-w-lg text-lg leading-relaxed text-[#b9c5cc]">Un calendrier de l’Avent pas comme les autres. Ouvre un booster chaque matin et collectionne les cartes les plus précieuses de l’hiver.</p>
            <div class="mt-12 flex items-center gap-8 border-t border-white/10 pt-6 text-sm text-[#8fa0aa]">
              <span><strong class="mr-1 text-xl font-normal text-[#f1e8d2]">{{ totalDays }}</strong> jours de magie</span>
              <span><strong class="mr-1 text-xl font-normal text-[#f1e8d2]">5</strong> raretés</span>
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
                <div class="flex items-end justify-between border-t border-[#e4c67d]/20 pt-4 text-left"><span class="text-[9px] uppercase tracking-widest text-[#aebdc2]">Carte à collectionner</span><span class="font-display text-2xl text-[#e4c67d]">01</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ouvrir" class="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div class="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div><p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Le rendez-vous quotidien</p><h2 class="font-display text-5xl text-[#fff8e9]">Le calendrier de Mimi</h2></div>
          <p class="max-w-xs text-right text-sm leading-relaxed text-[#8fa0aa]">Un nouveau chapitre attend d’être découvert chaque jour jusqu’à Noël.</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-[#172536]/70 p-5 md:p-8">
          <div class="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-12 md:gap-3">
            <button v-for="day in totalDays" :key="day" :disabled="isOpening || !canOpenBooster || !isDayUnlocked(day) || isDayClaimed(day)" @click="openDailyBooster(day)" :class="isDayClaimed(day) ? 'border-[#537382] bg-[#2b4654] text-[#c2d2d3]' : day === openedDay ? 'border-[#e2bd72] bg-[#e2bd72] text-[#172536]' : isDayUnlocked(day) ? 'border-[#d6b975]/60 bg-[#d6b975]/10 text-[#e2bd72]' : 'border-white/10 bg-white/3 text-[#71858e]'" class="aspect-square rounded-lg border text-sm font-bold transition hover:border-[#e2bd72] hover:text-[#e2bd72] disabled:cursor-not-allowed md:rounded-xl">{{ String(day).padStart(2, '0') }}</button>
          </div>
          <div class="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs uppercase tracking-[.15em] text-[#7f939d]"><span>Jour {{ String(openedDay).padStart(2, '0') }} sur {{ totalDays }}</span><span class="flex items-center gap-2 text-[#e2bd72]"><span class="h-2 w-2 rounded-full bg-[#e2bd72]"></span>{{ availableBoosters > 0 ? `${availableBoosters} booster${availableBoosters > 1 ? 's' : ''} à ouvrir` : unlockedDays === 0 ? 'Le calendrier ouvre bientôt' : 'Tous les boosters sont ouverts' }}</span></div>
        </div>
      </section>

      <section id="raretés" class="bg-[#152331] px-6 py-24 lg:px-10">
        <div class="mx-auto max-w-7xl">
          <div class="mb-12 max-w-xl"><p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">À collectionner</p><h2 class="font-display text-5xl text-[#fff8e9]">Chaque carte a son éclat.</h2><p class="mt-5 leading-relaxed text-[#94a8b0]">Des trouvailles délicates aux trésors les plus convoités, cinq niveaux de rareté rendent chaque ouverture unique.</p></div>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="(rarity, index) in rarityDetails" :key="rarity.name" :class="`rarity-${rarity.color}`" class="rounded-2xl border border-white/10 bg-[#1b2c3b] p-6 transition hover:-translate-y-1">
              <div class="mb-12 flex items-center justify-between"><span class="font-display text-4xl">{{ rarity.name === 'Extraordinaire' ? '✹' : rarity.name === 'Légendaire' ? '★' : rarity.name === 'Épique' ? '✧' : rarity.name === 'Rare' ? '◆' : '✦' }}</span><span class="text-[10px] uppercase tracking-[.2em] text-[#84969e]">{{ String(index + 1).padStart(2, '0') }} / {{ rarityDetails.length }}</span></div>
              <h3 class="font-display text-2xl text-[#f8f2e5]">{{ rarity.name }}</h3><p class="mt-2 text-sm leading-relaxed text-[#8fa0aa]">{{ rarity.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="cartes" class="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div class="mb-12 flex items-end justify-between"><div><p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Un avant-goût</p><h2 class="font-display text-5xl text-[#fff8e9]">Les premières merveilles</h2></div><span class="hidden text-sm text-[#778b95] md:block">4 cartes • Collection 01</span></div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <UiCard v-for="card in exempleCards" :key="card.id" :card="card" :rarity="card.rarity" @click="selectedCard = card" />
        </div>
      </section>
    </main>

    <footer class="border-t border-white/10 px-6 py-8 text-center text-xs text-[#71858e]"><span class="font-display text-lg text-[#d9c48e]">Le Secret de Mimi</span><span class="mx-3 text-[#425661]">·</span>Une carte, chaque jour, jusqu’à Noël.</footer>

    <div v-if="isOpening" class="fixed inset-0 z-30 overflow-y-auto bg-[#09111a]/90 p-5 backdrop-blur-md md:p-10">
      <div class="mx-auto flex min-h-full max-w-6xl flex-col justify-center">
        <div class="mb-8 flex items-start justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Booster du jour {{ String(openedDay).padStart(2, '0') }}</p>
            <h2 class="mt-2 font-display text-5xl text-[#fff8e9] md:text-6xl">{{ boosterPhase === 'pack' ? 'Le paquet est arrivé' : 'Révèle tes cartes' }}</h2>
          </div>
          <button aria-label="Fermer le booster" class="text-3xl text-[#8fa0aa] transition hover:text-white" :disabled="boosterPhase === 'pack' || revealedCards.size < boosterCards.length" @click="closeBooster">×</button>
        </div>
        <p class="mb-10 text-[#9cafb6]">{{ boosterPhase === 'pack' ? 'Découpe le paquet pour faire apparaître les cinq cartes du jour.' : 'Clique sur chaque carte pour la retourner. La dernière cache toujours une rareté au minimum.' }}</p>

        <div v-if="boosterPhase === 'pack'" class="flex flex-col items-center justify-center py-8">
          <button :class="{ 'is-cutting': isCutting, 'is-dragging': isDraggingPack }" :style="{ '--tear-progress': `${packDragProgress}px` }" class="booster-pack relative h-96 w-64" :disabled="isCutting" aria-label="Ouvrir le booster en le déchirant" @pointerdown="handlePackPointerDown" @pointermove="handlePackPointerMove" @pointerup="handlePackPointerUp" @pointercancel="handlePackPointerUp">
            <div class="booster-pack__glow absolute -inset-12 rounded-full"></div>
            <div class="booster-pack__body card-shine relative flex h-full flex-col justify-between bg-[#203747] p-6 text-center shadow-[0_20px_70px_rgba(0,0,0,.45)]">
              <span class="booster-pack__crimp booster-pack__crimp--top"></span>
              <div class="booster-pack__seal absolute left-0 right-0 top-0 flex items-center justify-between px-4 py-2 text-[8px] uppercase tracking-[.2em] text-[#e2bd72]"><span>✦ Le Secret de Mimi</span><span class="booster-pack__tear-line">DÉCHIRER</span></div>
              <div class="flex justify-between text-[9px] uppercase tracking-[.25em] text-[#e2bd72]"><span>Booster 01</span><span>✦</span></div>
              <div><div class="mx-auto mb-4 grid h-28 w-28 place-items-center rounded-full border border-[#e2bd72]/40 text-7xl text-[#e2bd72]">✦</div><p class="font-display text-4xl text-[#fff8e9]">Le Secret</p><p class="mt-2 text-[10px] uppercase tracking-[.25em] text-[#93a7ae]">Collection d’hiver</p></div>
              <div class="border-t border-[#e2bd72]/20 pt-3 text-[9px] uppercase tracking-widest text-[#93a7ae]">5 cartes à découvrir</div>
              <span class="booster-pack__crimp booster-pack__crimp--bottom"></span>
            </div>
            <span class="booster-pack__scissors absolute -right-10 top-1/2 text-4xl text-[#f4d994]">✂</span>
          </button>
          <p class="mt-8 text-xs uppercase tracking-[.2em] text-[#8499a1]">{{ isCutting ? 'Le paquet s’ouvre…' : 'Fais glisser pour déchirer le paquet' }}</p>
          <UiButton :disabled="isCutting" class="mt-5 px-8 py-4" @click="cutBooster">{{ isCutting ? 'Le paquet s’ouvre…' : 'Découper le booster' }} <span class="ml-2">✂</span></UiButton>
        </div>

        <div v-else class="booster-circle">
          <div v-for="(card, index) in boosterCards" :key="`${card.id}-${index}`" :style="{ '--card-index': index }" class="booster-circle-card">
            <div :class="{ 'is-revealed': isCardRevealed(index) }" class="booster-flip">
              <button class="booster-card-face booster-card__back flex aspect-[.72] w-full items-center justify-center rounded-2xl border border-[#d6b975]/40 shadow-2xl" :aria-label="`Révéler la carte ${index + 1}`" @click="revealCard(index)">
                <span class="font-display text-6xl text-[#e2bd72]/70">✦</span>
              </button>
              <div class="booster-card-face booster-card-front relative">
                <span :class="['rarity-burst', rarityEffect(card.rarity)]"></span>
                <UiCard :card="card" @click="selectedCard = card" />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
          <span class="text-xs uppercase tracking-[.18em] text-[#7f939d]">{{ revealedCards.size }} / {{ boosterCards.length }} cartes révélées</span>
          <UiButton v-if="revealedCards.size === boosterCards.length" @click="closeBooster">Garder mes cartes</UiButton>
        </div>
      </div>
    </div>

    <div v-if="selectedCard" class="fixed inset-0 z-30 grid place-items-center bg-[#09111a]/80 p-6 backdrop-blur-sm" @click.self="selectedCard = null">
      <div class="w-full max-w-md rounded-2xl border border-[#e2bd72]/40 bg-[#172536] p-7 shadow-2xl">
        <div class="mb-8 flex items-start justify-between"><div><p class="text-xs uppercase tracking-[.2em] text-[#e2bd72]">{{ selectedCard.type }}</p><h2 class="mt-2 font-display text-4xl text-[#fff8e9]">{{ selectedCard.name }}</h2></div><button aria-label="Fermer" class="text-2xl text-[#9aabb1] hover:text-white" @click="selectedCard = null">×</button></div>
        <div class="mb-6 flex items-center gap-5 rounded-xl border border-white/10 bg-[#203747] p-5"><span class="text-6xl text-[#e2c978]">{{ selectedCard.symbol }}</span><div><span class="rounded-full bg-[#fff0bc] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#95601d]">{{ selectedCard.rarity }}</span><p class="mt-3 text-xs uppercase tracking-widest text-[#8fa0aa]">{{ selectedCard.power }}</p></div></div>
        <p class="leading-relaxed text-[#b9c5cc]">{{ selectedCard.description }}</p>
        <UiButton class="mt-8 w-full" @click="selectedCard = null">Continuer l’exploration</UiButton>
      </div>
    </div>
  </div>
</template>
