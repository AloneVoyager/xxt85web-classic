<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import TitleBar from '../components/TitleBar.vue'
import NavBar from '../components/NavBar.vue'
import ContentLayout from '../components/ContentLayout.vue'
import WindowPanel from '../components/WindowPanel.vue'
import TipsPanel from '../components/TipsPanel.vue'
import FooterBar from '../components/FooterBar.vue'
import ProgressBar from '../components/ProgressBar.vue'
import WMPPlayer from '../components/WMPPlayer.vue'
import SettingsDialog from '../components/SettingsDialog.vue'

// 示例文章列表
const articles = [
  { title: 'Vue3 组件化开发实战', href: '#' },
  { title: 'TypeScript 类型体操入门', href: '#' },
  { title: 'SCSS 高级用法指南', href: '#' },
  { title: 'Vite 构建优化技巧', href: '#' },
  { title: '响应式设计最佳实践', href: '#' },
  { title: '前端性能优化备忘录', href: '#' },
]

// 示例歌曲列表
const songs = [
  { title: '神のまにまに', author: '初音ミク/GUMI/鏡音リン', cover: '/music/kaminomanimani.png' },
  { title: 'お砂糖哀歌', author: 'MIMI/初音ミク', cover: '/music/osatouaika.jpg' },
  { title: "I Can't Wait", author: 'd0tc0mmie/GUMI', cover: '/music/icantwait.jpg' },
  { title: 'ロストワンの号哭', author: 'Neru/鏡音リン', cover: '/music/lostone.jpg' },
]

const currentSongIndex = ref(0)
const dialogVisible = ref(false)

function onSongPlay(index: number) {
  currentSongIndex.value = index
}

function openDialog() {
  dialogVisible.value = true
}
</script>

<template>
  <TitleBar />

  <NavBar />

  <ContentLayout>
    <template #main>
      <h2><span style="color: #003399">示例首页</span></h2>
      <p>这是一个基于 Vue3 + TypeScript + SCSS 构建的示例站点</p>
      <p>本页面的样式提取自 <a href="https://xxtsoft.top" target="_blank">xxtsoft.top</a>，使用 Vista/Aero 风格的设计元素</p>

      <TipsPanel>
        <p><b>样式来源说明</b></p>
        <p>本示例站点复用了 xxt85web 的以下样式：</p>
        <p>· 标题栏渐变背景 (.titlebar)</p>
        <p>· 导航栏样式 (.navbar)</p>
        <p>· 窗口组件 (.window, .window-titlebar)</p>
        <p>· 公告提示框 (.tips)</p>
        <p>· 双栏布局 (.content, .main, .sidebar)</p>
        <p>· 进度条 (.progress-item, .vista-progress)</p>
        <p>· WMP 播放器样式</p>
        <p>所有样式文件位于 src/styles/ 目录下</p>
      </TipsPanel>

      <br />

      <WindowPanel title="示例文章列表">
        <h3>最新文章</h3>
        <ul>
          <li v-for="(art, idx) in articles" :key="idx">
            <a :href="art.href">{{ art.title }}</a>
          </li>
        </ul>

        <h3>技术专栏</h3>
        <ul>
          <li><a href="#">Vue3 Composition API</a></li>
          <li><a href="#">TypeScript 泛型</a></li>
          <li><a href="#">CSS 动画</a></li>
        </ul>

        <h3>开发笔记</h3>
        <ul>
          <li>样式重构过程中的心得</li>
          <li>组件拆分与复用经验</li>
        </ul>
      </WindowPanel>

    </template>

    <template #sidebar>
      <WindowPanel title="功能">
        <ul>
          <li>收藏本站</li>
          <li><RouterLink to="/search">搜索</RouterLink></li>
          <li><a href="#">留言本</a></li>
          <li><a href="#">调查</a></li>
          <li><a href="#">博物馆</a></li>
          <li><a href="#">捐助</a></li>
          <li><a href="#" @click.prevent="openDialog" class="settings"><img alt="" src="/images/icons/control.png" width="16" height="16" /> 控制面板</a></li>
        </ul>
      </WindowPanel>

      <WindowPanel title="新闻">
        <ul>
          <li>示例新闻条目 1</li>
          <li>示例新闻条目 2</li>
        </ul>
      </WindowPanel>

      <WindowPanel title="关注我们">
        <ul>
          <li><a href="#">哔哩哔哩</a></li>
          <li><a href="#">GitHub</a></li>
          <li>交流群：123456789</li>
        </ul>
      </WindowPanel>

      <WindowPanel title="项目进度">
        <ProgressBar label="项目 A" :percent="60" />
        <ProgressBar label="项目 B" :percent="90" :style="{ marginTop: '12px' }" />
        <ProgressBar label="项目 C" :percent="50" :style="{ marginTop: '12px' }" />
        <p style="margin-top: 12px">状态：<b>开发中</b><br /><i>持续更新中</i></p>
      </WindowPanel>

      <WindowPanel title="Windows Media Player">
        <WMPPlayer :songs="songs" :currentIndex="currentSongIndex" @play="onSongPlay" />
      </WindowPanel>
    </template>
  </ContentLayout>

  <FooterBar>
    <p>版权没有 示例站点 不保留任何权利</p>
    <p>Best view at 1024x768</p>
    <p>样式来源：xxt85web · 技术栈：Vue3 + TypeScript + SCSS</p>
  </FooterBar>

  <SettingsDialog v-model:visible="dialogVisible" />
</template>
