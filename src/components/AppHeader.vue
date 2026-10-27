<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <header class="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
    <RouterLink to="/" class="flex items-center gap-3" aria-label="Le Secret de Mimi, accueil">
      <span class="grid h-10 w-10 place-items-center rounded-full border border-[#d6b975]/40 bg-[#d6b975]/10 text-xl text-[#f2d58d]">✦</span>
      <span class="font-display text-xl tracking-wide text-[#fff8e9]">Le Secret de Mimi</span>
    </RouterLink>
    <nav class="flex items-center gap-2 text-sm text-[#b8c2c8]" aria-label="Navigation principale">
      <RouterLink to="/calendar" :aria-current="isActive('/calendar') ? 'page' : undefined" :class="isActive('/calendar') ? 'bg-[#e2bd72] text-[#172536] shadow-[0_8px_24px_rgba(226,189,114,.18)]' : 'hover:bg-white/5 hover:text-[#f2d58d]'" class="group inline-flex items-center gap-2 rounded-full px-3 py-2 transition">
        <span :class="isActive('/calendar') ? 'text-[#172536]' : 'text-[#e2bd72]'" class="transition group-hover:scale-110" aria-hidden="true">▦</span>
        Calendrier
      </RouterLink>
      <RouterLink to="/shop" :aria-current="isActive('/shop') ? 'page' : undefined" :class="isActive('/shop') ? 'bg-[#e2bd72] text-[#172536] shadow-[0_8px_24px_rgba(226,189,114,.18)]' : 'hover:bg-white/5 hover:text-[#f2d58d]'" class="group inline-flex items-center gap-2 rounded-full px-3 py-2 transition">
        <span :class="isActive('/shop') ? 'text-[#172536]' : 'text-[#e2bd72]'" class="transition group-hover:scale-110" aria-hidden="true">◇</span>
        Boutique
      </RouterLink>
      <RouterLink to="/collection" :aria-current="isActive('/collection') ? 'page' : undefined" :class="isActive('/collection') ? 'bg-[#e2bd72] text-[#172536] shadow-[0_8px_24px_rgba(226,189,114,.18)]' : 'hover:bg-white/5 hover:text-[#f2d58d]'" class="group inline-flex items-center gap-2 rounded-full px-3 py-2 transition">
        <span :class="isActive('/collection') ? 'text-[#172536]' : 'text-[#e2bd72]'" class="transition group-hover:scale-110" aria-hidden="true">▤</span>
        Collection
      </RouterLink>
      <RouterLink to="/" :aria-current="isActive('/') ? 'page' : undefined" :class="isActive('/') ? 'bg-[#e2bd72] text-[#172536] shadow-[0_8px_24px_rgba(226,189,114,.18)]' : 'hover:bg-white/5 hover:text-[#f2d58d]'" class="group inline-flex items-center gap-2 rounded-full px-3 py-2 transition">
        <span :class="isActive('/') ? 'text-[#172536]' : 'text-[#e2bd72]'" class="transition group-hover:scale-110" aria-hidden="true">⌂</span>
        Accueil
      </RouterLink>
    </nav>
  </header>
</template>
