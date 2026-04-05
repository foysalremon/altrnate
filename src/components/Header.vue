<template>
  <header
    class="flex-shrink-0 border-b border-border bg-card px-4 py-3 flex items-center justify-between gap-4"
  >
    <div class="flex items-center gap-2.5">
      <div class="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
        <FlaskConical class="w-4 h-4 text-primary-foreground" />
      </div>
      <div>
        <span class="font-semibold text-sm text-foreground">A/B Testing Simulator</span>
        <span class="ml-2 text-xs text-muted-foreground hidden sm:inline"
          >Content-first landing page tester</span
        >
      </div>
    </div>

    <div class="flex items-center gap-2">
      <div class="flex items-center gap-1 bg-muted rounded-lg p-1">
        <button
          v-for="{ mode, icon: Icon, label } in deviceButtons"
          :key="mode"
          :title="label"
          :data-testid="`btn-device-${mode}`"
          :class="[
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer',
            store.deviceMode === mode
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          ]"
          @click="store.setDeviceMode(mode)"
        >
          <component :is="Icon" class="w-3.5 h-3.5" />
          <span class="hidden md:inline">{{ label }}</span>
        </button>
      </div>

      <div class="flex items-center gap-1 bg-muted rounded-lg p-1">
        <button
          v-for="{ mode, icon: Icon, label } in compareButtons"
          :key="mode"
          :title="label"
          :data-testid="`btn-compare-${mode}`"
          :class="[
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer',
            store.compareMode === mode
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          ]"
          @click="store.setCompareMode(mode)"
        >
          <component :is="Icon" class="w-3.5 h-3.5" />
          <span class="hidden md:inline">{{ label }}</span>
        </button>
      </div>

      <button
        @click="store.showExportFn(!store.showExport)"
        :data-testid="`btn-export`"
        class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer"
        :class="[
          store.showExport
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-background border-border hover:bg-muted',
        ]"
      >
        Export JSON
        <component :is="store.showExport ? ChevronUp : ChevronDown" class="w-3.5 h-3.5" />
      </button>
    </div>
  </header>
</template>
<script setup lang="ts">
import {
  FlaskConical,
  Monitor,
  Tablet,
  Smartphone,
  Columns2,
  Layers,
  ChevronUp,
  ChevronDown,
} from '@lucide/vue'
import { useSimulatorStore } from '@/stores/simulator'
import type { DeviceMode, CompareMode } from '@/stores/simulator'

const store = useSimulatorStore()

interface DeviceButton {
  mode: DeviceMode
  icon: Component
  label: string
}

interface CompareButton {
  mode: CompareMode
  icon: Component
  label: string
}

const deviceButtons: DeviceButton[] = [
  { mode: 'desktop', icon: Monitor, label: 'Desktop' },
  { mode: 'tablet', icon: Tablet, label: 'Tablet' },
  { mode: 'mobile', icon: Smartphone, label: 'Mobile' },
]

const compareButtons: CompareButton[] = [
  { mode: 'side-by-side', icon: Columns2, label: 'Side by Side' },
  { mode: 'overlay', icon: Layers, label: 'Slide Overlay' },
]
</script>
