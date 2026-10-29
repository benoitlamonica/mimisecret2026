<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import UiButton from '@/components/UiButton.vue'

let openModalCount = 0
let previousBodyOverflow = ''
let previousDocumentOverflow = ''

const props = withDefaults(defineProps<{
  dismissible?: boolean
  showClose?: boolean
  panelClass?: string
  ariaLabel?: string
}>(), {
  dismissible: true,
  showClose: true,
  panelClass: 'max-w-xl',
  ariaLabel: 'Fenêtre modale',
})

const isOpen = defineModel<boolean>({ required: true })
let hasScrollLock = false

function lockBodyScroll() {
  if (hasScrollLock) return

  if (openModalCount === 0) {
    previousBodyOverflow = document.body.style.overflow
    previousDocumentOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
  }

  openModalCount += 1
  hasScrollLock = true
}

function unlockBodyScroll() {
  if (!hasScrollLock) return

  openModalCount = Math.max(0, openModalCount - 1)
  if (openModalCount === 0) {
    document.body.style.overflow = previousBodyOverflow
    document.documentElement.style.overflow = previousDocumentOverflow
  }

  hasScrollLock = false
}

function close() {
  if (props.dismissible) isOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(isOpen, (open) => {
  if (open) {
    window.addEventListener('keydown', handleKeydown)
    lockBodyScroll()
  } else {
    window.removeEventListener('keydown', handleKeydown)
    unlockBodyScroll()
  }
}, { immediate: true })

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  unlockBodyScroll()
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-[#09111a]/80 p-5 backdrop-blur-sm"
      @click.self="close"
    >
      <section
        :class="panelClass"
        class="relative my-auto w-full rounded-2xl border border-[#e2bd72]/40 bg-[#172536] p-7 shadow-2xl"
        role="dialog"
        aria-modal="true"
        :aria-label="ariaLabel"
      >
        <UiButton
          v-if="showClose && dismissible"
          variant="ghost"
          aria-label="Fermer"
          class="absolute right-5 top-4 z-10 p-0 text-2xl no-underline transition hover:text-white"
          @click="close"
        >
          ×
        </UiButton>
        <slot />
      </section>
    </div>
  </Teleport>
</template>
