<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayerStore } from '../stores/player'

const router = useRouter()
const playerStore = usePlayerStore()

// ============ PRELOADER ============
const preloaderActive = ref(false)
const preloaderHidden = ref(false)

// ============ LANDING ============
const landingFadeout = ref(false)
const startBtnDisabled = ref(true)
const startBtnText = ref('LOADING')

// ============ VIDEO ============
const videoOverlayActive = ref(false)
const skipBtnVisible = ref(false)
const flashOpacity = ref('0')
const flashDisplay = ref('none')
const videoRef = ref<HTMLVideoElement | null>(null)
const introAudioRef = ref<HTMLAudioElement | null>(null)

// ============ MAIN CONTENT ============
const mainVisible = ref(false)
const gradientAnimate = ref(false)
const orbsVisible = ref(false)
const backLinkVisible = ref(false)
const scrollIndicatorVisible = ref(false)
const heroReveal = ref(false)

// ============ LYRICS ============
const lyricsBarVisible = ref(false)
const lyricsLineHTML = ref('')
const lyricsMode = ref<'jp' | 'cn'>('jp')
const lyricsToggleText = ref('JP')
let lyricsRafId = 0
let lastLyricIdx = -1

const lyricData: [number, number, string, string][] = [
  [21.378, 25.214, "ねえいくつ夢に出会った？", "呐 我们在梦中几度相遇？"],
  [25.214, 28.708, "そのいくつを叶えた？", "又有几回实现了呢？"],
  [28.708, 31.136, "次の旅へ行こうか", "踏上下一段旅途吧"],
  [31.136, 34.135, "わっはー　We're おニューなキメラ", "哇哈— 我们就是崭新的奇美拉"],
  [34.135, 37.921, "一人じゃダメなら　二人になればいい", "独自一人不够的话 那就两个人一起嘛"],
  [37.921, 41.060, "一緒ランド作りっこしよ", "一起造出我们的乐园吧"],
  [41.060, 44.763, "おすわりしてても　じれったくなるんでしょ", "就算乖乖坐着 也还是会心急难耐吧"],
  [44.763, 48.466, "だったら進むだけ　それでいいじゃん", "那就只管向前 不也挺好吗"],
  [48.466, 51.420, "愛とか恋とか僕とか君とかいつもデビってんのん？", "爱啊恋啊我啊你啊 总像小恶魔一样吗？"],
  [51.420, 54.871, "好きとか嫌いでウダウダ　たまには死ぬほどピュアピュアやってんのん", "为了爱啊恨啊去烦恼 偶尔也想装纯装到死"],
  [54.871, 58.341, "君に歌ってほしい歌　まだあるや", "我还有好多歌想让你去唱"],
  [58.341, 61.512, "ねえ全部いけるかな", "呐 这些都能实现吗"],
  [61.512, 62.134, "君が", "因为你"],
  [62.134, 63.902, "何回だって想うから", "无论多少次 都会再次想起"],
  [63.902, 65.637, "何回だって歌うよ\"39\"", "无论多少次 都会唱出\"39\""],
  [65.637, 68.362, "何回だって聴いてね　約束ね", "无论多少次 都请侧耳聆听 说好了哦"],
  [68.362, 70.877, "きっと1からゴールへ　その先だって", "想必从零到终点 甚至在终点的前方"],
  [70.877, 75.405, "君がやめらんない　愛言葉は終わらせない", "我都戒不掉你了 爱语不休"],
  [75.405, 76.054, "僕は", "而我"],
  [76.054, 77.782, "何回だって変わるけど", "无论多少次 都已不再如前"],
  [77.782, 79.557, "何回だって歌うよ\"39\"", "可无论多少次 我都还会再唱出\"39\""],
  [79.557, 82.368, "何回だっておいでよ　ここにいる", "无论多少次 都过来吧 我就在这等着哦"],
  [82.368, 84.722, "きっと1からゴールへ　その先だって", "想必从1到终点 甚至在终点的前方"],
  [84.722, 88.637, "君がやめらんない　愛言葉はいつまでも", "我都戒不掉你了 这句爱语直到永远都"],
  [88.637, 92.760, "ありがとう", "谢谢你"],
  [92.760, 96.199, "例えば　君が消えてしまうなら", "假如 你会就此消失的话"],
  [96.199, 99.670, "例えば　僕はやめてしまうでしょう", "假如 那我也会就此放弃吧"],
  [99.670, 103.156, "例えば　そんなのはごめんなの", "假如 我可绝对不能接受"],
  [103.156, 106.765, "だからさ　これからも戦うみょん", "所以 从今往后也要继续战斗下去喵"],
  [106.765, 107.265, "ああああ", "啊啊啊啊"],
  [107.265, 110.401, "ポップとロックでハイ&ロー　サイコなチャンバラやってんのん", "随着Pop和Rock 高潮与低谷间 刀光剑影疯狂起舞"],
  [110.401, 113.681, "あたしまだまだまだまだまだまだまだまだやれる　決まってんの", "人家还还还还还还能继续下去 那还用说"],
  [113.681, 117.130, "届いたテレパシ　やっと会えた", "传出一份心灵感应 终于与你相遇"],
  [117.130, 134.841, "やあ　ちゃんと見えてるかい", "喂 你在好好看着我吗"],
  [134.841, 138.310, "声が好き　…バカ。", "喜欢你的声音 …笨蛋"],
  [138.310, 141.607, "顔が好き　…バカ。", "喜欢你的脸 …笨蛋"],
  [141.607, 147.802, "バカだもん　これだけは一生言うんだもん", "我就这么傻 这句话我要说一辈子"],
  [147.802, 148.892, "…バカ。", "…笨蛋"],
  [149.683, 150.433, "君が", "因为你"],
  [150.433, 152.086, "何回だって想うから", "无论多少次 都会再次想起"],
  [152.086, 153.813, "何回だって歌うよ\"39\"", "无论多少次 都会唱出\"39\""],
  [153.813, 156.615, "何回だって聴いてね　約束ね", "无论多少次 都请侧耳聆听 说好了哦"],
  [156.615, 159.019, "きっと1からゴールへ　その先だって", "想必从零到终点 甚至在终点的前方"],
  [159.019, 163.509, "君がやめらんない　愛言葉は終わらせない", "我都戒不掉你了 爱语不休"],
  [163.509, 164.177, "僕は", "而我"],
  [164.177, 165.925, "何回だって変わるけど", "无论多少次 都已经变了"],
  [165.925, 167.624, "何回だって歌うよ\"39\"", "可无论多少次 我都还会再唱出\"39\""],
  [167.624, 170.495, "何回だっておいでよ　ここにいる", "无论多少次 都过来吧 我就在这等着哦"],
  [170.495, 172.833, "きっと1からゴールへ　その先だって", "想必从1到终点 甚至在终点的前方"],
  [172.833, 176.715, "君がやめらんない　愛言葉はいつまでも", "我都戒不掉你了 这句爱语直到永远都"],
  [176.715, 177.925, "ありがとう", "谢谢你"],
  [177.925, 184.001, "好好好のラブ連単　君としたいことがいっぱい", "好好好的恋爱连胜 我还有好多想和你一起做的事"],
  [184.001, 191.348, "サラマンダー　ホットが良くない？やっぱ大成功", "Salamander 炽热一点不好吗？就知道会大获全胜"],
  [191.348, 193.511, "もうやっぱアピってラビったらいいじゃん", "真是的 摇起兔尾巴去大胆诱惑就好了吧"],
  [193.511, 195.246, "サッドな愛も　歌ったらいいじゃん", "注定沦为悲剧的爱 也唱作歌声不就好了嘛"],
  [195.246, 197.455, "みっともないけど　嫉妬しちゃうけど　どうか許してね", "虽然有点狼狈 虽然会吃醋 不过要原谅我哦"],
  [197.832, 198, "どんな歌だってずっと　君と届け続けるよ", "无论什么歌 我都会永远和你一起传递下去"],
]

const baseUrl = import.meta.env.BASE_URL
const started = ref(false)

let introSrc = ''
let videoSrc = ''
let mediaLoaded = 0
const totalMedia = 2

// ============ PARTICLES ============
const particles: { left: string; duration: string; delay: string; size: string; bg: string }[] = []

for (let i = 0; i < 50; i++) {
  particles.push({
    left: Math.random() * 100 + '%',
    duration: (8 + Math.random() * 16) + 's',
    delay: Math.random() * 10 + 's',
    size: (2 + Math.random() * 3) + 'px',
    bg: Math.random() > 0.5 ? '#39c5bb' : '#0fd',
  })
}

// ============ MEDIA LOADING ============
function mediaReady() {
  mediaLoaded++
  if (mediaLoaded >= totalMedia) {
    setTimeout(() => {
      preloaderHidden.value = true
      preloaderActive.value = false
      startBtnDisabled.value = false
      startBtnText.value = '开 始'
      if (introAudioRef.value) {
        introAudioRef.value.volume = 0.8
        introAudioRef.value.play().catch(() => {})
      }
    }, 600)
  }
}

function startLoading() {
  videoSrc = `${baseUrl}support/aikotoba/intro_1080.mp4`
  introSrc = `${baseUrl}support/aikotoba/intro.mp3`

  mediaLoaded = 0
  preloaderActive.value = true
  preloaderHidden.value = false

  if (videoRef.value) {
    videoRef.value.src = videoSrc
    videoRef.value.load()
    const onVideoReady = () => {
      videoRef.value?.removeEventListener('canplaythrough', onVideoReady)
      mediaReady()
    }
    videoRef.value.addEventListener('canplaythrough', onVideoReady, { once: true })
  }

  if (introAudioRef.value) {
    introAudioRef.value.src = introSrc
    introAudioRef.value.load()
    const onIntroReady = () => {
      introAudioRef.value?.removeEventListener('canplaythrough', onIntroReady)
      mediaReady()
    }
    introAudioRef.value.addEventListener('canplaythrough', onIntroReady, { once: true })
  }

  // Fallback timeout
  setTimeout(() => {
    if (mediaLoaded < totalMedia) {
      mediaLoaded = totalMedia
      preloaderHidden.value = true
      preloaderActive.value = false
      startBtnDisabled.value = false
      startBtnText.value = '开 始'
      if (introAudioRef.value) {
        introAudioRef.value.volume = 0.3
        introAudioRef.value.play().catch(() => {})
      }
    }
  }, 8000)
}

// ============ START ============
function doStart() {
  if (started.value || startBtnDisabled.value) return
  started.value = true
  startBtnDisabled.value = true

  // Stop intro audio
  introAudioRef.value?.pause()
  if (introAudioRef.value) introAudioRef.value.currentTime = 0

  // Find and play 愛言葉IV in WMPlayer
  const songIndex = playerStore.songs.findIndex(s => s.title === '愛言葉IV')
  if (songIndex !== -1) {
    playerStore.playSong(songIndex)
  }

  landingFadeout.value = true

  setTimeout(() => {
    videoOverlayActive.value = true
    if (videoRef.value) {
      videoRef.value.currentTime = 0
      videoRef.value.play().catch(() => {})
    }
  }, 800)

  function onVideoEnded() {
    skipBtnVisible.value = false
    flashOpacity.value = '1'
    flashDisplay.value = 'block'
    setTimeout(() => {
      videoOverlayActive.value = false
    }, 100)

    setTimeout(() => {
      gradientAnimate.value = true
      orbsVisible.value = true
      mainVisible.value = true
      backLinkVisible.value = true
      flashOpacity.value = '0'
      setTimeout(() => { flashDisplay.value = 'none' }, 2000)
      revealContent()
      setTimeout(() => { scrollIndicatorVisible.value = true }, 2000)
    }, 300)
  }

  if (videoRef.value) {
    videoRef.value.addEventListener('ended', onVideoEnded, { once: true })
    videoRef.value.addEventListener('error', onVideoEnded, { once: true })
  }

  // Skip button
  skipBtnVisible.value = true
}

function skipVideo() {
  skipBtnVisible.value = false
  videoRef.value?.pause()
  // Trigger onVideoEnded via event if possible, otherwise let's refactor
  if (videoRef.value) {
    const endedEvent = new Event('ended')
    videoRef.value.dispatchEvent(endedEvent)
  }
}

// ============ CONTENT REVEAL ============
let observer: IntersectionObserver | null = null

function revealContent() {
  setTimeout(() => { heroReveal.value = true }, 200)

  const sections = document.querySelectorAll('.story-section')
  const finale = document.querySelector('.finale')

  observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('reveal')
    })
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' })

  sections.forEach(el => observer!.observe(el))
  if (finale) observer.observe(finale)

  // Cascade visible ones immediately
  setTimeout(() => {
    sections.forEach((s, i) => {
      if (s.getBoundingClientRect().top < window.innerHeight)
        setTimeout(() => s.classList.add('reveal'), i * 150)
    })
    if (finale && finale.getBoundingClientRect().top < window.innerHeight)
      setTimeout(() => finale.classList.add('reveal'), sections.length * 150 + 300)
  }, 600)

  startLyricsSync()
}

// ============ LYRICS ============
function toggleLyrics() {
  lyricsMode.value = lyricsMode.value === 'jp' ? 'cn' : 'jp'
  lyricsToggleText.value = lyricsMode.value === 'jp' ? 'JP' : 'CN'
  lastLyricIdx = -1
  updateLyric(playerStore.currentTime)
}

function updateLyric(t: number) {
  let idx = -1
  for (let i = 0; i < lyricData.length; i++) {
    if (t >= lyricData[i][0] && t < lyricData[i][1]) {
      idx = i
      break
    }
  }
  if (idx !== lastLyricIdx) {
    lastLyricIdx = idx
    setLyricHTML(idx)
  }
}

function setLyricHTML(idx: number) {
  if (idx < 0) {
    lyricsLineHTML.value = ''
    return
  }
  let text = lyricsMode.value === 'jp' ? lyricData[idx][2] : lyricData[idx][3]
  text = text.replace(/(39)/g, '<span class="hl">$1</span>')
  text = text.replace(/(ありがとう)/g, '<span class="hl">$1</span>')
  lyricsLineHTML.value = text
}

function startLyricsSync() {
  lyricsBarVisible.value = true
  lyricsLineHTML.value = ''
  lastLyricIdx = -1

  function tick() {
    // Check if player store is playing 愛言葉IV
    if (playerStore.currentSong?.title !== '愛言葉IV' || !playerStore.isPlaying) {
      lyricsRafId = requestAnimationFrame(tick)
      return
    }
    updateLyric(playerStore.currentTime)
    lyricsRafId = requestAnimationFrame(tick)
  }
  lyricsRafId = requestAnimationFrame(tick)
}

// ============ BACK TO HOME ============
function goHome() {
  // Stop all media before navigating away
  videoRef.value?.pause()
  if (videoRef.value) videoRef.value.src = ''
  introAudioRef.value?.pause()
  if (introAudioRef.value) introAudioRef.value.src = ''
  // If WMPlayer is playing the BGM, stop it
  if (playerStore.currentSong?.title === '愛言葉IV' && playerStore.isPlaying) {
    playerStore.togglePlay()
  }
  // Clean up lyrics RAF
  cancelAnimationFrame(lyricsRafId)
  // Navigate home
  router.push('/')
}

// ============ LIFECYCLE ============
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  startLoading()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  // Stop all media
  videoRef.value?.pause()
  if (videoRef.value) videoRef.value.src = ''
  introAudioRef.value?.pause()
  if (introAudioRef.value) introAudioRef.value.src = ''
  // Stop BGM if it's playing via WMPlayer
  if (playerStore.currentSong?.title === '愛言葉IV' && playerStore.isPlaying) {
    playerStore.togglePlay()
  }
  // Clean up
  cancelAnimationFrame(lyricsRafId)
  observer?.disconnect()
})

function handleKeydown(e: KeyboardEvent) {
  // Start with Space/Enter
  if ((e.code === 'Space' || e.code === 'Enter') && !started.value && !startBtnDisabled.value) {
    e.preventDefault()
    doStart()
  }
}
</script>

<template>
  <div class="fourth-anniversary">
    <!-- PRELOADER -->
    <div :class="['preloader', { active: preloaderActive, hidden: preloaderHidden }]">
      <div class="loader-ring"></div>
      <div class="loader-text">LOADING</div>
    </div>

    <!-- LANDING -->
    <div :class="['landing', { fadeout: landingFadeout }]">
      <div class="particles">
        <div
          v-for="(p, i) in particles"
          :key="i"
          class="particle"
          :style="{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
            background: p.bg,
          }"
        ></div>
      </div>
      <div class="start-btn-wrap">
        <button class="start-btn" :disabled="startBtnDisabled" @click="doStart">
          {{ startBtnText }}
        </button>
        <span class="start-hint">xxtsoft 4th Anniversary</span>
        <span class="landing-sub">本页面 CSS 使用 AI 生成</span>
      </div>
    </div>

    <!-- VIDEO OVERLAY -->
    <div :class="['video-overlay', { active: videoOverlayActive }]">
      <video ref="videoRef" preload="auto" playsinline></video>
      <button :class="['skip-btn', { visible: skipBtnVisible }]" @click="skipVideo">跳 过</button>
    </div>

    <!-- WHITE FLASH -->
    <div
      class="flash"
      :style="{ opacity: flashOpacity, display: flashDisplay }"
    ></div>

    <!-- MAIN CONTENT -->
    <div :class="['main-content', { visible: mainVisible }]">
      <div :class="['bg-gradient', { animate: gradientAnimate }]"></div>
      <div :class="['orb', 'orb-1', { visible: orbsVisible }]"></div>
      <div :class="['orb', 'orb-2', { visible: orbsVisible }]"></div>
      <div :class="['orb', 'orb-3', { visible: orbsVisible }]"></div>

      <div class="story-wrap">
        <div :class="['hero', { reveal: heroReveal }]">
          <h1>xxtsoft 四周年</h1>
          <div class="subtitle">一个小站 · 四年光阴</div>
          <div class="years">2022 — 2026</div>
        </div>

        <div class="story-section" data-reveal>
          <p>四年转瞬即逝，但我还记得<a href="https://www.bilibili.com/video/BV1vY4y157U2/">2022/5/22在B站发布的第一个视频</a>，那不仅仅是一个简单的 Windows 教学视频，更是我对世界喊出的第一声"Hello World"。</p>
          <p>四年前的这个时候，我还是个连 HTML 是啥都不知道的小屁孩，靠着朋友帮忙搭了个 WordPress 就算"有网站"了。那时候觉得，哇，我在互联网上有自己的地盘了，虽然那个地盘基本都是别人帮我砌的墙。</p>
          <p>四年后，我坐在这里，用着 VSCode 一个字一个字地敲下这些文字。我甚至有点恍惚——我居然真的学会了怎么写网页。</p>
        </div>

        <div class="story-section" data-reveal>
          <h2>四年，五个网站</h2>
          <p>如果你去看<a href="../museum.html">博物馆</a>，你会发现我搞过五个版本的网站。第一个是 WordPress 套皮，第二个第三个用了 Hexo，第四个是 Halo，第五个——也就是你现在看到的——是<a href="../index.html">纯手搓的静态 HTML</a>。</p>
          <p>说实话，每次换网站都像是一次重生。旧的域名过期了，旧的截图找不到了，旧的记忆也模糊了。但每次重新开始，我都比上一次更懂一点。第一个网站我连 FTP 都不会用，现在我已经能自己写 CSS、搞响应式、配 Git 了。</p>
          <blockquote>这大概就是成长的证据吧。</blockquote>
        </div>

        <div class="story-section" data-reveal>
          <h2>数据很难看，但我很开心</h2>
          <p>四年了，本站的访问量还不如别人一篇 CSDN 水文的多。必应搜索量还没我 GitHub 提交次数多。但我一点都不在乎——好吧，其实有一点点在乎。</p>
          <p>因为这不是一个商业网站，没有 SEO 优化，没有广告，没有引流。它就是一个高中生的个人空间，用着 Vista 风格的 UI，写着一些别人看不懂的碎碎念。如果有人偶然点进来，看到这些文字，笑了或者怒了，那这个网站就值了。</p>
          <p>而且你知道吗，虽然数据惨淡，但我确实收到过一些陌生人的反馈。有人说我的程序帮到了他，有人说看了我的文章觉得有意思。这些零星的正面反馈，比一万个 AI 洗稿网站的流量都有意义。</p>
        </div>

        <div class="story-section" data-reveal>
          <h2>感谢名单</h2>
          <p>四年了，这个网站不是我一个人撑起来的。</p>
          <ul>
            <li><b>AbCd</b> — 我最好的朋友，我有很多项目都经过他的 Refactor，没有他，我不可能接触到最新的技术栈。</li>
            <li><b>LAGSNES</b> — 提供了最早的服务器，让我的网站能在互联网上生根，而不是孤独地躺在本地磁盘里。</li>
            <li><b>Kingstar</b> — 我的同班同学，他和我在学校里坏事做尽，但也是他以实际行动教会我热爱生活，享受青春最纯粹的美好。</li>
            <li><b>南方中学信息组老师</b> — 给予我技术指导，允许我去机房（开玩笑，一周至少8.5节信息课）</li>
            <li><b>所有在B站关注我的人</b> — 虽然视频质量不咋地，但你们的点赞和评论是我继续下去的动力。</li>
            <li><b>每一个点进来看过的人</b> — 感谢你在这个信息爆炸的时代，愿意花时间看一个高中生的碎碎念。</li>
          </ul>
        </div>

        <div class="story-section" data-reveal>
          <h2>四年来的变化</h2>
          <p>四年前我还在搞 Scratch 和编程猫，现在已经能写 PyQt 桌面应用了。</p>
          <p>四年前我用的是那台开机三分钟的破笔记本，现在我有了一台 12 代 i7。</p>
          <p>四年前我热衷于修电脑，装系统，现在我更喜欢开发属于我自己的东西。</p>
          <p>四年前我在初中混日子，现在我在高中继续混日子。</p>
          <p>但最大的变化大概是——我开始有自己的想法了。四年前我只会跟着别人走，现在我知道自己想要什么、想做什么、想成为什么样的人。虽然前路依然迷茫，但至少我不再是那个只会复制粘贴代码的小白了。</p>
        </div>

        <div class="story-section" data-reveal>
          <h2>未来？</h2>
          <p>说实话，我不知道这个网站还能活多久。</p>
          <p>高中学业越来越重，大学的门槛也越来越高。如今我所掌握的技能，以后几乎都会被 AI 取代。也许哪一天我累了，不想再更新了，这个网站就会变成数字废墟，静静地躺在 Netlify 的服务器上，等待域名过期的那一天。</p>
          <p>但在那之前，我会继续写下去。</p>
          <p>继续写代码，继续写文章，继续分享我觉得有意思的东西。因为这个网站是我在压抑的高中生活中唯一的自由之地，是我向这个世界喊话的扩音器——虽然音量不大，但至少我在喊。</p>
          <p>四年了，xxtsoft 还在。</p>
          <p>希望下一个四年，我们还在这里。</p>
        </div>

        <div class="story-section finale" data-reveal>
          <div class="big-text">🎉 xxtsoft 四周年快乐！</div>
          <div class="small-text">2022 — 2026</div>
          <div class="emoji-row">✨</div>
        </div>
      </div>
    </div>

    <!-- BACK LINK -->
    <a :class="['back-link', { visible: backLinkVisible }]" @click.prevent="goHome">← 返回首页</a>

    <!-- SCROLL INDICATOR -->
    <div :class="['scroll-indicator', { visible: scrollIndicatorVisible }]">
      <span></span>
      <small>SCROLL</small>
    </div>

    <!-- LYRICS BAR -->
    <div :class="['lyrics-bar', { visible: lyricsBarVisible }]">
      <div class="lyrics-line" v-html="lyricsLineHTML"></div>
      <button class="lyrics-toggle" @click="toggleLyrics">{{ lyricsToggleText }}</button>
    </div>

    <!-- HIDDEN AUDIO -->
    <audio ref="introAudioRef" preload="auto" loop></audio>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

// All unique styles for the 4th anniversary page are imported from its dedicated SCSS file
// Scoped styles here handle only the component-specific overrides
</style>

<style lang="scss">
// Global styles for the 4th anniversary page (not scoped, needed for full-page effects)
@use '../styles/fourth-anniversary';
</style>
