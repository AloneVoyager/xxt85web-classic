<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import NavBar from '../components/NavBar.vue'
import ContentLayout from '../components/ContentLayout.vue'
import WindowPanel from '../components/WindowPanel.vue'
import FooterBar from '../components/FooterBar.vue'
</script>

<template>
  <TitleBar />

  <NavBar />

  <ContentLayout>
    <template #main>
      <h2><span style="color: #003399">关于</span></h2>

      <div style="margin: 12px 0;">
        <a href="#" style="margin-right: 8px;">Vue 3.4+</a>
        <a href="#" style="margin-right: 8px;">TypeScript 5.0+</a>
        <a href="#" style="margin-right: 8px;">Vite 5.0+</a>
        <a href="#" style="margin-right: 8px;">SCSS</a>
        <a href="#">MIT License</a>
      </div>

      <p>这是一个 Vue3 示例站点，旨在展示如何提取和复用 xxt85web 的基础样式。</p>
      <p>本项目可作为学习 Vue3 组件化开发和 SCSS 样式重构的参考示例。</p>

      <WindowPanel title="项目信息">
        <h3>关于本项目</h3>
        <ul>
          <li><b>项目名称：</b>xxt85web-style-vue3</li>
          <li><b>源码仓库：</b><a href="#">GitHub 链接</a></li>
          <li><b>在线预览：</b><a href="#">示例站点</a></li>
        </ul>

        <h3>技术栈</h3>
        <ul>
          <li>Vue 3 Composition API</li>
          <li>TypeScript 类型系统</li>
          <li>Vite 构建工具</li>
          <li>SCSS 预处理器</li>
          <li>Vue Router 路由管理</li>
        </ul>

        <h3>样式来源</h3>
        <ul>
          <li><b>原始站点：</b><a href="https://xxtsoft.top" target="_blank">xxt85web</a></li>
          <li><b>样式文件：</b>src/styles/</li>
          <li><b>组件目录：</b>src/components/</li>
          <li><b>提取的样式包括：</b></li>
          <li>· 标题栏与导航栏</li>
          <li>· 窗口组件与内容布局</li>
          <li>· WMP 播放器样式</li>
          <li>· 进度条与搜索框</li>
          <li>· 悬停预览框</li>
        </ul>

        <h3>项目结构</h3>
        <ul>
          <li>src/styles/ - SCSS 样式文件</li>
          <li>src/components/ - Vue 组件</li>
          <li>src/views/ - 页面视图</li>
          <li>src/router/ - 路由配置</li>
          <li>public/ - 静态资源</li>
        </ul>

        <h3>使用说明</h3>
        <ul>
          <li><b>安装依赖：</b>npm install</li>
          <li><b>开发模式：</b>npm run dev</li>
          <li><b>构建生产：</b>npm run build</li>
          <li><b>类型检查：</b>npm run type-check</li>
        </ul>
      </WindowPanel>
    </template>

    <template #sidebar>
      <WindowPanel title="项目特色">
        <ul>
          <li>完整 Vue3 项目结构</li>
          <li>TypeScript 类型支持</li>
          <li>SCSS 样式模块化</li>
          <li>响应式布局适配</li>
          <li>Vista/Aero 风格设计</li>
        </ul>
      </WindowPanel>

      <WindowPanel title="参考链接">
        <ul>
          <li><a href="https://vuejs.org" target="_blank">Vue.js 官方文档</a></li>
          <li><a href="https://www.typescriptlang.org" target="_blank">TypeScript 文档</a></li>
          <li><a href="https://vitejs.dev" target="_blank">Vite 官网</a></li>
          <li><a href="https://sass-lang.com" target="_blank">Sass 文档</a></li>
          <li><a href="https://xxtsoft.top" target="_blank">xxt85web 原站</a></li>
        </ul>
      </WindowPanel>
    </template>
  </ContentLayout>

  <FooterBar>
    <p>版权没有 示例站点 不保留任何权利</p>
    <p>Best view at 1024x768</p>
  </FooterBar>
</template>
