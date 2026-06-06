import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles/main.scss'

const baseUrl = import.meta.env.BASE_URL

function initBackground() {
  const savedBg = localStorage.getItem('bgIndex') || '0'
  const bgIndex = parseInt(savedBg)
  const backgrounds = [
    'background.webp',
    'background_1.webp',
    'background_2.webp',
    'background_3.webp',
    'background_4.webp',
  ]

  const body = document.body
  if (bgIndex >= 0 && bgIndex < backgrounds.length) {
    body.style.background = `url('${baseUrl}${backgrounds[bgIndex]}') no-repeat center center fixed`
  } else {
    body.style.background = `url('${baseUrl}background.webp') no-repeat center center fixed`
  }
  body.style.backgroundSize = 'cover'
}

initBackground()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
