import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type DeviceMode = 'desktop' | 'tablet' | 'mobile'
export type CompareMode = 'side-by-side' | 'overlay'
export type Tab = 'json' | 'vue' | 'react'
export type Variant = 'A' | 'B'
export type VariantConfig = {
  headline: string
  subtext: string
  ctaText: string
  ctaColor: string
  badgeText: string
  bgColor: string
  heroImageUrl: string
}

export const useSimulatorStore = defineStore('simulator', () => {
  const deviceMode = ref<DeviceMode>('desktop')
  const compareMode = ref<CompareMode>('side-by-side')
  const showExport = ref(false)
  const tab = ref<Tab>('json')

  function setDeviceMode(mode: DeviceMode) {
    deviceMode.value = mode
  }

  function setCompareMode(mode: CompareMode) {
    compareMode.value = mode
  }

  function showExportFn(show: boolean) {
    showExport.value = show
  }

  function setTab(mode: Tab) {
    tab.value = mode
  }

  const json = `{
    "abTest": {
        "version": "1.0",
        "exportedAt": "2026-04-04T16:09:30.245Z",
        "deviceMode": "desktop",
        "compareMode": "side-by-side",
        "variants": {
        "A": {
            "headline": "Ship Faster, Break Less",
            "subtext": "The all-in-one platform that helps engineering teams deploy with confidence. Automated rollbacks, real-time monitoring, and zero-downtime deployments.",
            "ctaText": "Start Free Trial",
            "ctaColor": "#2563eb",
            "badgeText": "Trusted by 10,000+ teams",
            "bgColor": "#f0f4ff",
            "heroImageUrl": ""
        },
        "B": {
            "headline": "Deploy Without Fear",
            "subtext": "Stop worrying about broken releases. Our platform catches issues before your users do — with intelligent monitoring, instant rollbacks, and confidence at every commit.",
            "ctaText": "Get Started Free",
            "ctaColor": "#7c3aed",
            "badgeText": "4.9★ rated by developers",
            "bgColor": "#f5f0ff",
            "heroImageUrl": ""
        }
        },
        "usage": {
        "vue": "// In your Vue component:\nimport { useABStore } from './stores/abStore'\nconst store = useABStore()\n// Access: store.variants.A.headline, store.variants.B.ctaText, etc.\n\n// Toggle variant:\nconst activeVariant = ref('A')\nconst content = computed(() => store.variants[activeVariant.value])",
        "react": "// In your React component:\nconst variant = useVariant('ab-test-id') // 'A' | 'B'\nconst content = variant === 'A' ? variantA : variantB"
        }
    }
}`
  const vue = `<script setup lang="ts">
        import { ref, computed } from 'vue'

        const variantConfig = {
        "A": {
            "headline": "Ship Faster, Break Less",
            "subtext": "The all-in-one platform that helps engineering teams deploy with confidence. Automated rollbacks, real-time monitoring, and zero-downtime deployments.",
            "ctaText": "Start Free Trial",
            "ctaColor": "#2563eb",
            "badgeText": "Trusted by 10,000+ teams",
            "bgColor": "#f0f4ff",
            "heroImageUrl": ""
        },
        "B": {
            "headline": "Deploy Without Fear",
            "subtext": "Stop worrying about broken releases. Our platform catches issues before your users do — with intelligent monitoring, instant rollbacks, and confidence at every commit.",
            "ctaText": "Get Started Free",
            "ctaColor": "#7c3aed",
            "badgeText": "4.9★ rated by developers",
            "bgColor": "#f5f0ff",
            "heroImageUrl": ""
        }
        }

        const activeVariant = ref<'A' | 'B'>('A')
        const content = computed(() => variantConfig[activeVariant.value])
        </script>

        <template>
        <div :style="{ backgroundColor: content.bgColor }">
            <span class="badge">{{ content.badgeText }}</span>
            <h1>{{ content.headline }}</h1>
            <p>{{ content.subtext }}</p>
            <button :style="{ backgroundColor: content.ctaColor }">
            {{ content.ctaText }}
            </button>
        </div>
    </template>`
  const react = `import { useState } from 'react'

        const variantConfig = {
        "A": {
            "headline": "Ship Faster, Break Less",
            "subtext": "The all-in-one platform that helps engineering teams deploy with confidence. Automated rollbacks, real-time monitoring, and zero-downtime deployments.",
            "ctaText": "Start Free Trial",
            "ctaColor": "#2563eb",
            "badgeText": "Trusted by 10,000+ teams",
            "bgColor": "#f0f4ff",
            "heroImageUrl": ""
        },
        "B": {
            "headline": "Deploy Without Fear",
            "subtext": "Stop worrying about broken releases. Our platform catches issues before your users do — with intelligent monitoring, instant rollbacks, and confidence at every commit.",
            "ctaText": "Get Started Free",
            "ctaColor": "#7c3aed",
            "badgeText": "4.9★ rated by developers",
            "bgColor": "#f5f0ff",
            "heroImageUrl": ""
        }
        }

        export function LandingPage() {
        const [activeVariant] = useState<'A' | 'B'>('A') // Toggle via feature flags
        const content = variantConfig[activeVariant]

        return (
            <div style={{ backgroundColor: content.bgColor }}>
            <span>{content.badgeText}</span>
            <h1>{content.headline}</h1>
            <p>{content.subtext}</p>
            <button style={{ backgroundColor: content.ctaColor }}>
                {content.ctaText}
            </button>
            </div>
        )
    }`

  const snippets = ref({
    json,
    vue,
    react,
  })

  const variantA = ref<VariantConfig>({
    headline: 'Ship Faster, Break Less',
    subtext: 'The all-in-one platform that helps engineering teams deploy with confidence.',
    ctaText: 'Start Free Trial',
    ctaColor: '#2563eb',
    badgeText: 'Trusted by 10,000+ teams',
    bgColor: '#f0f4ff',
    heroImageUrl: '',
  })

  const variantB = ref<VariantConfig>({
    headline: 'Deploy Without Fear',
    subtext:
      'Stop worrying about broken releases. Our platform catches issues before your users do.',
    ctaText: 'Get Started Free',
    ctaColor: '#7c3aed',
    badgeText: '4.9★ rated by developers',
    bgColor: '#f5f0ff',
    heroImageUrl: '',
  })

  const variants = computed(() => ({ A: variantA.value, B: variantB.value }))

  const jsonOutput = computed(() =>
    JSON.stringify(
      {
        abTest: {
          version: '1.0',
          exportedAt: new Date().toISOString(),
          variants: variants.value,
        },
      },
      null,
      2,
    ),
  )

  function updateVariant(variant: Variant, config: Partial<VariantConfig>) {
    if (variant === 'A') {
      variantA.value = { ...variantA.value, ...config }
    } else {
      variantB.value = { ...variantB.value, ...config }
    }
  }

  return {
    deviceMode,
    setDeviceMode,
    compareMode,
    setCompareMode,
    showExport,
    showExportFn,
    tab,
    setTab,
    snippets,
    variantA,
    variantB,
    variants,
    jsonOutput,
    updateVariant,
  }
})
