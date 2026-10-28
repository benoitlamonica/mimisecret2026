<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePoints } from '@/composables/usePoints'

const route = useRoute()
const { points } = usePoints()
const isMenuOpen = ref(false)
const navLinks = [
  { path: '/calendar', label: 'Calendrier', icon: '▦' },
  { path: '/shop', label: 'Boutique', icon: '◇' },
  { path: '/collection', label: 'Collection', icon: '▤' },
  { path: '/', label: 'Accueil', icon: '⌂' },
]

function isActive(path: string) {
  return route.path === path
}

watch(() => route.path, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <header class="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
    <RouterLink to="/" class="flex items-center gap-3" aria-label="Le Secret de Mimi, accueil">
      <span class="grid h-10 w-10 place-items-center rounded-full border border-[#d6b975]/40 bg-[#d6b975]/10 text-xl text-[#f2d58d]">✦</span>
      <span class="font-display text-xl tracking-wide text-[#fff8e9]">Le Secret de Mimi</span>
    </RouterLink>
    <div class="flex items-center gap-2">
      <div class="rounded-full border border-[#d6b975]/40 bg-[#d6b975]/10 px-3 py-2 text-xs font-bold text-[#f2d58d]" aria-label="Solde de points Mimi">✦ {{ points }} pts</div>
      <button class="grid h-11 w-11 place-items-center rounded-full border border-[#d6b975]/40 text-xl text-[#f2d58d] transition hover:bg-white/5 md:hidden" :aria-expanded="isMenuOpen" aria-controls="main-navigation" aria-label="Ouvrir le menu" @click="isMenuOpen = !isMenuOpen">
        <span aria-hidden="true">{{ isMenuOpen ? '×' : '☰' }}</span>
      </button>
    </div>
    <nav id="main-navigation" :class="{ 'hidden md:flex': !isMenuOpen, 'absolute left-6 right-6 top-full flex flex-col rounded-2xl border border-white/10 bg-[#172536] p-3 shadow-2xl md:static md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none': isMenuOpen }" class="z-20 gap-2 text-sm text-[#b8c2c8]" aria-label="Navigation principale">
      <RouterLink v-for="link in navLinks" :key="link.path" :to="link.path" :aria-current="isActive(link.path) ? 'page' : undefined" :class="isActive(link.path) ? 'bg-[#e2bd72] text-[#172536] shadow-[0_8px_24px_rgba(226,189,114,.18)]' : 'hover:bg-white/5 hover:text-[#f2d58d]'" class="group inline-flex items-center gap-3 rounded-xl px-4 py-3 transition md:rounded-full md:px-3 md:py-2">
        <span :class="isActive(link.path) ? 'text-[#172536]' : 'text-[#e2bd72]'" class="transition group-hover:scale-110" aria-hidden="true">{{ link.icon }}</span>
        {{ link.label }}
      </RouterLink>
    </nav>
  </header>
</template>
