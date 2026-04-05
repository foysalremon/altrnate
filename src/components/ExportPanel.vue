<template>
  <div class="flex flex-col gap-3" data-testid="export-panel">
    <div class="flex items-center gap-2 flex-wrap">
      <button
        v-for="{ mode, label } in tabButtons"
        :key="mode"
        :title="label"
        :data-testid="`export-tab-${mode}`"
        :class="[
          'px-3 py-1 rounded-md text-xs font-semibold transition-all',
          store.tab === mode
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-secondary',
        ]"
        @click="store.setTab(mode)"
      >
        {{ label }}
      </button>
      <div class="ml-auto flex gap-2">
        <!-- Copy Button -->
        <button
          class="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-secondary hover:bg-secondary/80 transition-all"
          data-testid="button-copy"
          @click="copy"
        >
          <Check v-if="copied" class="w-3 h-3 text-green-500" />
          <Copy v-else class="w-3 h-3" />
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>

        <!-- Download Button (only when json tab is active) -->
        <button
          v-if="store.tab === 'json'"
          class="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all"
          data-testid="button-download"
          @click="download"
        >
          <Download class="w-3 h-3" />
          Download
        </button>
      </div>
    </div>
    <pre
      class="text-xs bg-muted rounded-lg p-3 overflow-auto max-h-52 font-mono text-foreground border border-border leading-relaxed whitespace-pre-wrap"
      data-testid="export-code"
      >{{ store.snippets[store.tab] }}</pre
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Check, Copy, Download } from '@lucide/vue'
import { useSimulatorStore } from '@/stores/simulator'
import type { Tab } from '@/stores/simulator'

const copied = ref(false)

const store = useSimulatorStore()

interface TabButton {
  mode: Tab
  label: string
}

const tabButtons: TabButton[] = [
  { mode: 'json', label: 'JSON Config' },
  { mode: 'vue', label: 'Vue 3' },
  { mode: 'react', label: 'React' },
]

function copy() {
  navigator.clipboard.writeText(store.snippets[store.tab])
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

function download() {
  const blob = new Blob([store.snippets.json], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ab-test-config.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
