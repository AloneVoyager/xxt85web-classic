<script setup lang="ts">
interface Song {
  title: string
  author?: string
  cover?: string
  lrc?: string
}

const props = withDefaults(
  defineProps<{ songs: Song[]; currentIndex?: number }>(),
  { currentIndex: 0 },
)

const emit = defineEmits<{ play: [index: number] }>()

function getCover(idx: number): string {
  return props.songs[idx]?.cover || '/images/default_album.png'
}
</script>

<template>
  <div class="aero-player">
    <p class="wmp-info">
      <strong>{{ props.songs[props.currentIndex]?.title }}</strong>
      <span v-if="props.songs[props.currentIndex]?.author">
        - {{ props.songs[props.currentIndex]?.author }}
      </span>
    </p>
    <div class="wmp-screen">
      <div class="wmp-album-art">
        <img :src="getCover(props.currentIndex)" :alt="props.songs[props.currentIndex]?.title" />
      </div>
      <div id="lyric-wrapper">
        {{ props.songs[props.currentIndex]?.lrc || '就绪' }}
      </div>
    </div>

    <div class="wmp-progress-container">
      <div class="wmp-progress-bar" style="width: 35%"></div>
      <span class="wmp-dot"></span>
    </div>

    <div class="wmp-controls">
      <img src="/media/assets/prev.png" alt="prev" @click="emit('play', (props.currentIndex - 1 + props.songs.length) % props.songs.length)" />
      <img src="/media/assets/play.png" alt="play" @click="emit('play', props.currentIndex)" />
      <img src="/media/assets/next.png" alt="next" @click="emit('play', (props.currentIndex + 1) % props.songs.length)" />
    </div>

    <div class="wmp-playlist">
      <ul>
        <li
          v-for="(song, idx) in props.songs"
          :key="idx"
          :class="{ active: idx === props.currentIndex }"
          @click="emit('play', idx)"
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
</style>
