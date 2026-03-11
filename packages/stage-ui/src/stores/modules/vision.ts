import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export interface VisionModuleState {
  enabled: boolean
  autoCapture: {
    enabled: boolean
    interval: number
  }
  model: {
    provider: 'openai' | 'ollama'
    modelName: string
    apiKey: string
    baseUrl: string
  }
  cooldown: number
}

export interface VisionProviderOption {
  label: string
  value: 'openai' | 'ollama'
}

export interface VisionModelOption {
  label: string
  value: string
}

export const VISION_PROVIDER_OPTIONS: VisionProviderOption[] = [
  { label: 'OpenAI', value: 'openai' },
  { label: 'Ollama (本地)', value: 'ollama' },
]

export const VISION_MODEL_OPTIONS: Record<string, VisionModelOption[]> = {
  openai: [
    { label: 'GPT-4o', value: 'gpt-4o' },
    { label: 'GPT-4o Mini', value: 'gpt-4o-mini' },
    { label: 'GPT-4 Turbo', value: 'gpt-4-turbo' },
  ],
  ollama: [
    { label: 'llama3.2-vision', value: 'llama3.2-vision' },
    { label: 'llama3.1-vision', value: 'llama3.1-vision' },
    { label: 'qwen2-vl', value: 'qwen2-vl' },
  ],
}

export const useVisionModuleStore = defineStore('vision-module', () => {
  const state = reactive<VisionModuleState>({
    enabled: false,
    autoCapture: {
      enabled: false,
      interval: 30000,
    },
    model: {
      provider: 'openai',
      modelName: 'gpt-4o',
      apiKey: '',
      baseUrl: '',
    },
    cooldown: 5000,
  })

  const isConfigured = ref(false)

  const currentModelOptions = computed(() => VISION_MODEL_OPTIONS[state.model.provider] || [])

  function saveSettings() {
    isConfigured.value = true
  }

  return {
    ...state,
    isConfigured,
    saveSettings,
    currentModelOptions,
  }
})
