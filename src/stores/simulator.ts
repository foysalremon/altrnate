import { ref } from 'vue'
import { defineStore } from 'pinia'

export type DeviceMode = 'desktop' | 'tablet' | 'mobile'
export type CompareMode = 'side-by-side' | 'overlay'

export const useSimulatorStore = defineStore('simulator', () => {
  const deviceMode = ref<DeviceMode>('desktop')
  const compareMode = ref<CompareMode>('side-by-side')
  const showExport = ref(false)

  function setDeviceMode(mode: DeviceMode) {
    deviceMode.value = mode
  }

  function setCompareMode(mode: CompareMode) {
    compareMode.value = mode
  }

  function showExportFn(show: boolean) {
    showExport.value = show
  }

  return {
    deviceMode,
    setDeviceMode,
    compareMode,
    setCompareMode,
    showExport,
    showExportFn,
  }
})
