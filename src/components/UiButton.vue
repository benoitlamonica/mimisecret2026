<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost'

const props = withDefaults(defineProps<{
  variant?: Variant
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
})

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[#e6c77e] text-[#162330] shadow-[0_10px_30px_rgba(230,199,126,.2)] hover:bg-[#f4d994]',
  secondary: 'border border-[#d6b975]/50 text-[#f2d58d] hover:bg-[#d6b975] hover:text-[#15202b]',
  ghost: 'text-[#d9e3e5] underline decoration-[#e2bd72]/50 underline-offset-8 hover:text-[#f2d58d]',
}

const classes = () => variantClasses[props.variant]
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :class="classes()"
    class="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="classes()"
    class="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <slot />
  </button>
</template>
