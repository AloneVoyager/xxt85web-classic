<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { usePlayerStore } from '../stores/player'

const store = usePlayerStore()

const progressRef = ref<HTMLDivElement | null>(null)
const dotImageLoaded = ref(true)

const baseUrl = import.meta.env.BASE_URL

function handleDotImageError() {
  dotImageLoaded.value = false
}

function seekTo(e: MouseEvent) {
  if (!progressRef.value) return
  const rect = progressRef.value.getBoundingClientRect()
  const pct = (e.clientX - rect.left) / rect.width
  store.seekTo(pct)
}

onMounted(() => {
  store.initAudio()
})
</script>

<template>
  <div class="aero-player">
    <p class="wmp-info" v-html="`<strong>${store.currentSong?.title}</strong> - ${store.currentSong?.author || '未知作者'}`"></p>

    <div class="wmp-screen">
      <div class="wmp-album-art">
        <img :src="store.coverSrc" :alt="store.currentSong?.title" />
      </div>
      <div class="lyric-wrapper" v-html="store.currentLyric"></div>
    </div>

    <div class="wmp-progress-container" ref="progressRef" @click="seekTo">
      <div class="wmp-progress-bar" :style="{ width: store.progress + '%' }"></div>
      <template v-if="dotImageLoaded">
        <img :src="`${baseUrl}images/wmpdot.png`" class="wmp-dot" :style="{ left: store.progress + '%' }" @error="handleDotImageError" />
      </template>
      <div v-else class="wmp-dot-fallback" :style="{ left: store.progress + '%' }"></div>
    </div>

    <div class="wmp-controls">
      <img :src="`${baseUrl}media/assets/prev.png`" alt="Prev" @click="store.prevSong" />
      <img
        :src="store.isPlaying ? `${baseUrl}media/assets/pause.png` : `${baseUrl}media/assets/play.png`"
        :alt="store.isPlaying ? 'Pause' : 'Play'"
        @click="store.togglePlay"
      />
      <img :src="`${baseUrl}media/assets/next.png`" alt="Next" @click="store.nextSong" />
    </div>

    <div class="wmp-playlist">
      <ul>
        <li
          v-for="(song, idx) in store.songs"
          :key="idx"
          :class="{ active: idx === store.currentIndex }"
          @click="store.playSong(idx)"
        >
          {{ song.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.aero-player {
  padding: 8px;
}

.wmp-info {
  margin: 0 0 10px 0;
  font-size: 12px;
  color: #666;
}

.wmp-screen {
  background: linear-gradient(to bottom, #FFFFFF 0%,#E6F0FA 50%,#DCE6F4 51%,#DDE9F7 100%);
  display: flex;
  align-items: center;
  padding: 12px;
  height: 96px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #BFC7CF;
}

.wmp-album-art {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  margin-right: 15px;
}

.wmp-album-art img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
}

.lyric-wrapper {
  flex-grow: 1;
  color: #00025C;
  font-size: 14px;
  text-align: left;
  line-height: 1.6;
  padding-right: 5px;
  transition: opacity 0.2s ease-in-out;
}

.wmp-progress-container {
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  border: 1px solid #BEC3CB;
  position: relative;
  margin: 15px 5px;
  cursor: pointer;
}

.wmp-progress-bar {
  height: 100%;
  background: #0F41CD;
  border-radius: 2px;
  transition: width 0.1s linear;
}

.wmp-dot {
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 9px;
  pointer-events: none;
}

.wmp-dot-fallback {
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: linear-gradient(to bottom, #FFFFFF 0%, #E0E0E0 100%);
  border: 1px solid #999999;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}

.wmp-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0px;
  margin-bottom: 10px;
}

.wmp-controls img {
  cursor: pointer;
  transition: opacity 0.2s;
}

.wmp-controls img:hover {
  opacity: 0.8;
}

.wmp-playlist {
  max-height: 100px;
  overflow-y: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.wmp-playlist ul {
  list-style: none;
  padding: 0;
  margin: 5px 0;
}

.wmp-playlist li {
  padding: 3px 8px;
  cursor: pointer;
  font-size: 13px;
  color: #333;
  transition: background-color 0.2s;
}

.wmp-playlist li:hover {
  background-color: rgba(15, 65, 205, 0.1);
}

.wmp-playlist li.active {
  background-color: rgba(15, 65, 205, 0.2);
  color: #0F41CD;
  font-weight: bold;
}
</style>
