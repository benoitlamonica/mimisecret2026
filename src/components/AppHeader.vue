<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import UiButton from '@/components/UiButton.vue'
import UiModal from '@/components/UiModal.vue'
import { usePoints } from '@/composables/usePoints'
import { exportProgress, importProgress } from '@/composables/useProgressTransfer'

const route = useRoute()
const { points } = usePoints()
const isMenuOpen = ref(false)
const isProgressModalOpen = ref(false)
const exportCode = ref('')
const importCode = ref('')
const transferMessage = ref('')
const transferError = ref(false)
const navLinks = [
  { path: '/calendar', label: 'Calendrier', icon: '▦' },
  { path: '/shop', label: 'Boutique', icon: '◇' },
  { path: '/collection', label: 'Collection', icon: '▤' },
]

function isActive(path: string) {
  return route.path === path
}

watch(() => route.path, () => {
  isMenuOpen.value = false
})

function openProgressModal() {
  exportCode.value = exportProgress()
  importCode.value = ''
  transferMessage.value = ''
  transferError.value = false
  isProgressModalOpen.value = true
}

async function copyExportCode() {
  try {
    await navigator.clipboard.writeText(exportCode.value)
    transferError.value = false
    transferMessage.value = 'Code copié dans le presse-papiers.'
  } catch (error) {
    console.error('Impossible de copier le code de progression.', error)
    transferError.value = true
    transferMessage.value = 'Copie impossible. Sélectionne le code manuellement.'
  }
}

function loadProgress() {
  if (!importCode.value.trim()) return

  try {
    importProgress(importCode.value)
    window.location.reload()
  } catch (error) {
    console.error('Impossible d’importer la progression.', error)
    transferError.value = true
    transferMessage.value = error instanceof Error ? error.message : 'Impossible d’importer cette progression.'
  }
}
</script>

<template>
  <header class="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
    <RouterLink
      to="/"
      class="flex items-center gap-3"
      aria-label="Le Secret de Mimi, accueil"
    >
      <span class="grid h-10 w-10 place-items-center rounded-full border border-[#d6b975]/40 bg-[#d6b975]/10 text-xl text-[#f2d58d]">✦</span>
      <span class="font-display text-xl tracking-wide text-[#fff8e9]">Le Secret de Mimi</span>
    </RouterLink>
    <div class="flex items-center gap-2">
      <button
        class="grid h-11 w-11 place-items-center rounded-full border border-[#d6b975]/40 p-0 text-xl no-underline transition hover:bg-white/5 md:hidden"
        :aria-expanded="isMenuOpen"
        aria-controls="main-navigation"
        aria-label="Ouvrir le menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span aria-hidden="true">{{ isMenuOpen ? '×' : '☰' }}</span>
      </button>
    </div>
    <nav
      id="main-navigation"
      :class="{ 'hidden md:flex': !isMenuOpen, 'absolute left-6 right-6 top-full flex flex-col rounded-2xl border border-white/10 bg-[#172536] p-3 shadow-2xl md:static md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none': isMenuOpen }"
      class="z-20 gap-4 text-sm text-[#b8c2c8]"
      aria-label="Navigation principale"
    >
      <RouterLink
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        :aria-current="isActive(link.path) ? 'page' : undefined"
        :class="isActive(link.path) ? 'bg-[#e2bd72] text-[#172536] shadow-[0_8px_24px_rgba(226,189,114,.18)]' : 'bg-white/4 hover:bg-white/5 hover:text-[#f2d58d]'"
        class="group inline-flex items-center gap-3 rounded-xl px-4 py-3 transition md:rounded-full md:px-3 md:py-2"
      >
        <span
          :class="isActive(link.path) ? 'text-[#172536]' : 'text-[#e2bd72]'"
          class="transition group-hover:scale-110"
          aria-hidden="true"
        >{{ link.icon }}</span>
        {{ link.label }}
      </RouterLink>
      <div
        class="rounded-full border border-[#d6b975]/40 bg-[#d6b975]/10 px-3 py-2 text-xs font-bold text-[#f2d58d]"
        aria-label="Solde de points Mimi"
      >
        ✦ {{ points }} pts
      </div>
      <button
        class="group inline-flex items-center gap-3 rounded-lg border-0 bg-[#e2bd72] px-4 py-3 text-left font-[inherit] text-[#b8c2c8] transition md:px-3 md:py-2"
        aria-label="Gérer ma progression"
        @click="openProgressModal"
      >
        <span
          class="text-[#172536] transition group-hover:scale-110"
          aria-hidden="true"
        >⚙</span>
      </button>
    </nav>
  </header>

  <UiModal
    v-model="isProgressModalOpen"
    panel-class="max-w-2xl p-6 md:p-8"
    aria-label="Gérer ma progression"
  >
    <div class="pr-8">
      <p class="text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Paramètres</p>
      <h2 class="mt-2 font-display text-4xl text-[#fff8e9]">Ma progression</h2>
      <p class="mt-3 text-sm leading-relaxed text-[#9cafb6]">Exporte ton code pour le conserver ou le transférer sur un autre appareil. L’import remplacera la progression présente sur cet appareil.</p>
    </div>

    <div class="mt-7 space-y-6">
      <div>
        <label
          for="progress-export"
          class="mb-2 block text-sm font-bold text-[#d9e3e5]"
        >Exporter ma progression</label>
        <textarea
          id="progress-export"
          :value="exportCode"
          readonly
          rows="4"
          class="w-full resize-none rounded-xl border border-white/10 bg-[#101a26] p-3 text-xs leading-relaxed text-[#b9c5cc] outline-none focus:border-[#e2bd72]"
          @focus="($event.target as HTMLTextAreaElement).select()"
        ></textarea>
        <UiButton
          variant="secondary"
          class="mt-3"
          @click="copyExportCode"
        >
          Copier le code
        </UiButton>
      </div>

      <div class="border-t border-white/10 pt-6">
        <label
          for="progress-import"
          class="mb-2 block text-sm font-bold text-[#d9e3e5]"
        >Importer ma progression</label>
        <textarea
          id="progress-import"
          v-model="importCode"
          rows="4"
          placeholder="Colle ton code de progression ici…"
          class="w-full resize-none rounded-xl border border-white/10 bg-[#101a26] p-3 text-xs leading-relaxed text-[#b9c5cc] outline-none placeholder:text-[#71858e] focus:border-[#e2bd72]"
        ></textarea>
        <UiButton
          class="mt-3"
          :disabled="!importCode.trim()"
          @click="loadProgress"
        >
          Importer et remplacer
        </UiButton>
      </div>

      <p
        v-if="transferMessage"
        class="text-sm"
        :class="transferError ? 'text-rose-300' : 'text-emerald-300'"
      >
        {{ transferMessage }}
      </p>
    </div>
  </UiModal>
</template>
