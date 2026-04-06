<template>
  <div
    class="relative w-full h-full overflow-hidden rounded-xl border border-border"
    :style="{ backgroundColor: props.config.bgColor }"
    data-testid="{`preview-variant-${props.variant}`}"
  >
    <div
      class="[ 'absolute top-3 left-3 z-10 text-xs font-bold px-2 py-0.5 rounded-full', labelColors[props.variant] ]"
    >
      Variant {{ variant }}
    </div>

    <div
      :class="[
        'h-full flex flex-col items-center justify-center text-center overflow-y-auto',
        props.deviceMode == 'mobile'
          ? 'px-6 py-10'
          : props.deviceMode === 'tablet'
            ? 'px-8 py-10'
            : 'px-10 py-12',
      ]"
    >
      <div
        v-if="props.config.badgeText"
        class="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur border border-black/10 rounded-full px-3 py-1 mb-5 text-xs font-medium text-gray-600 shadow-sm"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
        {{ props.config.badgeText }}
      </div>

      <h1
        :class="[
          'font-bold leading-tight tracking-tight text-gray-900 mb-4',
          props.deviceMode === 'mobile'
            ? 'text-2xl'
            : props.deviceMode === 'tablet'
              ? 'text-3xl'
              : 'text-4xl',
        ]"
        :data-testid="`headline-variant-${props.variant}`"
      >
        <template v-if="props.config.headline">{{ props.config.headline }}</template>
        <span v-else class="text-gray-400 italic">Enter a headline...</span>
      </h1>

      <p
        :class="[
          'text-gray-600 mb-8 max-w-sm leading-relaxed',
          props.deviceMode === 'mobile' ? 'text-sm' : 'text-base',
        ]"
        :data-testid="`subtext-variant-${props.variant}`"
      >
        <template v-if="props.config.subtext">{{ props.config.subtext }}</template>
        <span v-else class="text-gray-400 italic">Enter subtext...</span>
      </p>

      <button
        :class="[
          'font-semibold rounded-lg text-white shadow-md transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95',
          props.deviceMode === 'mobile' ? 'px-6 py-2.5 text-sm' : 'px-8 py-3 text-base',
        ]"
        :style="{ backgroundColor: props.config.ctaColor }"
        :data-testid="`cta-variant-${props.variant}`"
      >
        <template v-if="props.config.ctaText">{{ props.config.ctaText }}</template>
        <template v-else class="text-gray-400 italic">Click Here</template>
      </button>

      <div
        :class="[
          'flex items-center gap-5 mt-8',
          props.deviceMode === 'mobile' ? 'flex-col gap-3' : '',
        ]"
      >
        <span
          v-for="feature in ['No credit card required', 'Cancel anytime', 'Free onboarding']"
          :key="feature"
          class="flex items-center gap-1.5 text-xs text-gray-500"
        >
          <svg
            class="w-3.5 h-3.5 text-green-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              :stroke-width="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
          {{ feature }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DeviceMode, Variant, VariantConfig } from '@/stores/simulator'

interface Props {
  variant: Variant
  config: VariantConfig
  deviceMode: DeviceMode
}

const props = defineProps<Props>()

const labelColors = {
  A: 'bg-blue-500 text-white',
  B: 'bg-violet-500 text-white',
}
</script>
