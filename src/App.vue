<script setup lang="ts">
import CardDetailModal from '@/components/CardDetailModal.vue'
import { useStellarUnlock } from '@/composables/useStellarUnlock'

const { unlockedCard } = useStellarUnlock()
</script>

<template>
  <RouterView />
  <CardDetailModal
    v-if="unlockedCard"
    v-model="unlockedCard"
    :card="unlockedCard"
    :message="`You've unlocked ${unlockedCard.name}`"
  />
</template>

<style scoped></style>
