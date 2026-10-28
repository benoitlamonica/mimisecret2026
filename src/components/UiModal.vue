<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import UiButton from '@/components/UiButton.vue'

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

function close() {
  if (props.dismissible) isOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(isOpen, (open) => {
  if (open) window.addEventListener('keydown', handleKeydown)
  else window.removeEventListener('keydown', handleKeydown)
}, { immediate: true })

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen"
class="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-[#09111a]/80 p-5 backdrop-blur-sm"
@click.self="close">
      <section :class="panelClass"
class="relative my-auto w-full rounded-2xl border border-[#e2bd72]/40 bg-[#172536] p-7 shadow-2xl"
role="dialog"
aria-modal="true"
:aria-label="ariaLabel">
        <UiButton v-if="showClose && dismissible"
variant="ghost"
aria-label="Fermer"
class="absolute right-5 top-4 z-10 p-0 text-2xl no-underline transition hover:text-white"
@click="close">×</UiButton>
        <slot />
      </section>
    </div>
  </Teleport>
</template>
