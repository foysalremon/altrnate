<template>
  <div class="flex flex-col gap-4" data-testid="{`editor-variant-${props.variant}`}">
    <div
      :class="[
        'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold',
        props.variant === 'A'
          ? 'bg-blue-50 border-blue-200 text-blue-700'
          : 'bg-violet-50 border-violet-200 text-violet-700',
      ]"
    >
      <span
        :class="[
          'w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold',
          props.variant === 'A' ? 'bg-blue-500' : 'bg-violet-500',
        ]"
      >
        {{ props.variant }}
      </span>
      Variant {{ props.variant }}
    </div>

    <div class="flex flex-col gap-3">
      <label class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Headline
      </label>
      <textarea
        :class="[
          'w-full text-sm border rounded-lg px-3 py-2 bg-background resize-none focus:outline-none focus:ring-2 transition-all',
          accentClass,
        ]"
        :rows="2"
        :value="props.config.headline"
        placeholder="Enter your headline..."
        :data-testid="`input-headline-${props.variant}`"
        @input="
          store.updateVariant(props.variant, {
            headline: ($event.target as HTMLInputElement).value,
          })
        "
      />
    </div>

    <div class="flex flex-col gap-3">
      <label class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Subtext
      </label>
      <textarea
        :class="[
          'w-full text-sm border rounded-lg px-3 py-2 bg-background resize-none focus:outline-none focus:ring-2 transition-all',
          accentClass,
        ]"
        :rows="3"
        :value="props.config.subtext"
        placeholder="Describe your value proposition..."
        :data-testid="`input-subtext-${props.variant}`"
        @input="
          store.updateVariant(props.variant, {
            subtext: ($event.target as HTMLInputElement).value,
          })
        "
      />
    </div>

    <div class="flex flex-col gap-3">
      <label class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        CTA Button Text
      </label>
      <input
        type="text"
        :className="[
          'w-full text-sm border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 transition-all',
          accentClass,
        ]"
        :value="props.config.ctaText"
        placeholder="e.g. Get Started Free"
        :data-testid="`input-cta-text-${variant}`"
        @input="
          store.updateVariant(props.variant, {
            ctaText: ($event.target as HTMLInputElement).value,
          })
        "
      />
    </div>

    <div class="flex flex-col gap-3">
      <label class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Badge Text
      </label>
      <input
        type="text"
        :className="[
          'w-full text-sm border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 transition-all',
          accentClass,
        ]"
        :value="props.config.badgeText"
        placeholder="e.g. Trusted by 10k teams"
        :data-testid="`input-badge-${variant}`"
        @input="
          store.updateVariant(props.variant, {
            badgeText: ($event.target as HTMLInputElement).value,
          })
        "
      />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        CTA Button Color
      </label>
      <div class="flex items-center gap-2 flex-wrap">
        <button
          v-for="{ label, value } in COLOR_PRESETS"
          :key="`color-preset-${props.variant}-${value}`"
          :title="label"
          :data-testid="`color-preset-${props.variant}-${label.toLowerCase()}`"
          :class="[
            'w-6 h-6 rounded-full border-2 transition-transform hover:scale-110',
            props.config.ctaColor === value
              ? 'border-gray-900 scale-110 shadow-md'
              : 'border-transparent',
          ]"
          :style="{ backgroundColor: value }"
          @click="
            store.updateVariant(props.variant, {
              ctaColor: value,
            })
          "
        />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Background Color
      </label>
      <div class="flex items-center gap-2 flex-wrap">
        <button
          v-for="{ label, value } in BG_PRESETS"
          :key="`bg-preset-${props.variant}-${value}`"
          :title="label"
          :data-testid="`bg-preset-${props.variant}-${label.toLowerCase()}`"
          :class="[
            'w-6 h-6 rounded-full border-2 transition-transform hover:scale-110',
            props.config.ctaColor === value
              ? 'border-gray-900 scale-110 shadow-md'
              : 'border-gray-300',
          ]"
          :style="{ backgroundColor: value }"
          @click="
            store.updateVariant(props.variant, {
              bgColor: value,
            })
          "
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSimulatorStore } from '@/stores/simulator'
import type { Variant, VariantConfig } from '@/stores/simulator'

interface Props {
  variant: Variant
  config: VariantConfig
}

const props = defineProps<Props>()

const store = useSimulatorStore()

const accentClass =
  props.variant === 'A'
    ? 'border-blue-400 focus:ring-blue-400'
    : 'border-violet-400 focus:ring-violet-400'

const COLOR_PRESETS = [
  { label: 'Blue', value: '#2563eb' },
  { label: 'Violet', value: '#7c3aed' },
  { label: 'Green', value: '#059669' },
  { label: 'Rose', value: '#e11d48' },
  { label: 'Orange', value: '#ea580c' },
  { label: 'Teal', value: '#0d9488' },
  { label: 'Indigo', value: '#4f46e5' },
  { label: 'Pink', value: '#db2777' },
]

const BG_PRESETS = [
  { label: 'Blue Tint', value: '#f0f4ff' },
  { label: 'Violet Tint', value: '#f5f0ff' },
  { label: 'Green Tint', value: '#f0fff4' },
  { label: 'Rose Tint', value: '#fff0f3' },
  { label: 'Warm White', value: '#fffdf0' },
  { label: 'Pure White', value: '#ffffff' },
  { label: 'Cool Gray', value: '#f8fafc' },
  { label: 'Slate', value: '#f1f5f9' },
]
</script>
