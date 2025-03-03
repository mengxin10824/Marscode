import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initAIService } from './services/aiService'
import { Model } from './model/Model'

// 应用启动时初始化
const defaultModel = new Model(
    import.meta.env.VITE_DEFAULT_MODEL_ID,
    'Default Model',
    '/model-icon.png',
    'https://api.siliconflow.cn/v1',
    import.meta.env.VITE_FALLBACK_API_KEY
)

initAIService(defaultModel)

const app = createApp(App)
app.mount('#app')
