<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{ 'update:visible': [value: boolean] }>()

const bgIndex = ref(0)
const umamiEnabled = ref(true)

const bgOptions = [
  { value: 0, label: '默认背景' },
  { value: 1, label: '背景 1' },
  { value: 2, label: '背景 2' },
  { value: 3, label: '背景 3' },
  { value: 4, label: '背景 4' },
]

onMounted(() => {
  loadSettings()
  applyBackgroundFromStorage()
})

watch(() => props.visible, (newVal) => {
  if (newVal) {
    loadSettings()
  }
})

function loadSettings() {
  const savedBg = localStorage.getItem('bgIndex') || '0'
  const savedUmami = localStorage.getItem('umami_enabled') !== 'false'
  bgIndex.value = parseInt(savedBg)
  umamiEnabled.value = savedUmami
}

function applyBackgroundFromStorage() {
  const savedBg = localStorage.getItem('bgIndex') || '0'
  applyBackground(parseInt(savedBg))
}

function close() {
  emit('update:visible', false)
}

function saveSettings() {
  localStorage.setItem('bgIndex', bgIndex.value.toString())
  localStorage.setItem('umami_enabled', umamiEnabled.value.toString())
  applyBackground(bgIndex.value)
  close()
}

function applyBackground(index: number) {
  const backgrounds = [
    'background.webp',
    'background_1.webp',
    'background_2.webp',
    'background_3.webp',
    'background_4.webp',
  ]
  const body = document.body

  body.style.transition = 'background-image 0.5s ease-in-out'

  if (index >= 0 && index < backgrounds.length) {
    body.style.background = `url('/${backgrounds[index]}') no-repeat center center fixed`
    body.style.backgroundSize = 'cover'
  } else {
    body.style.background = 'url("/background.webp") no-repeat center center fixed'
    body.style.backgroundSize = 'cover'
  }
}
</script>

<template>
  <div v-if="visible" class="dialog-overlay" @click.self="close">
    <div class="vista-dialog" style="width: 300px">
      <div class="window-titlebar settings-titlebar">
        控制面板
        <img src="/static/Window_CloseButton.png" class="vista-close-btn" alt="关闭" @click="close" />
      </div>
      <div class="window-content">
        <div style="margin-bottom: 10px;">
          <label>背景图片：</label>
          <select v-model="bgIndex" style="width: 100%;">
            <option v-for="opt in bgOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>
        <div style="margin-bottom: 15px;">
          <label><input type="checkbox" v-model="umamiEnabled"> 启用 Umami 统计</label>
        </div>
        <div style="text-align: right;">
          <button type="button" @click="saveSettings">确定</button>
        </div>
        <label><img alt="" src="/images/icons/info.png" width="16" height="16" />某些设置项需要刷新网页才能应用</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.vista-dialog {
  margin-bottom: 0;
}

.vista-close-btn {
  cursor: pointer;
  float: right;
  margin-top: 2px;
}
</style>
