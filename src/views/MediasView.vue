<script setup lang="ts">
import TitleBar from '../components/TitleBar.vue'
import NavBar from '../components/NavBar.vue'
import ContentLayout from '../components/ContentLayout.vue'
import WindowPanel from '../components/WindowPanel.vue'
import TipsPanel from '../components/TipsPanel.vue'
import FooterBar from '../components/FooterBar.vue'

interface Video {
  title: string
  author: string
  date: string
  type: string
  duration: string
  desc: string
  cover: string
  isFlash?: boolean
  hasDownload?: boolean
  hasBilibili?: boolean
}

const videos: Video[] = [
  {
    title: 'Mission Impossible : The Long Dark Basement - 碟中谍9：永夜堡垒',
    author: '@xxt8582753 @Kingstar @AbCd @Cookie',
    date: '2/9/26',
    type: 'MP4 视频',
    duration: '03:49',
    desc: '前情提要：建议观看 <a href="../articles/webuildnas.html">垃圾佬在学校里开网吧惨遭制裁</a> 和 <a href="../articles/wefuckedsalt.html">我和AbCd白嫖了一台12代i5电脑！</a> 以加深对本片的体会。Kingstar（xxt8582753 的同学）常常用班级电脑给他女朋友发消息，这次，他想完成一些"Impossible Mission"：逃离寝室，晚上在我们组 NAS 的办公室远程桌面连接到 207 继续聊天，并连接到 404-2 的高性能电脑上玩游戏。我们学校戒备森严，很难从寝室逃出来，并且违纪成本极高，但我们做到了...',
    cover: '/media/cover/imf9.jpg',
  },
  {
    title: '对蛋仔派对市场颓势以及创作者大会脱离群众的锐评',
    author: '@20年冬',
    date: '9/20/25',
    type: 'MP4 视频',
    duration: '05:30',
    desc: '由于视频是在晚上睡不着时临时起意进行录制，且情绪较为上头，很难保证没有主观性内容，观点仅供参考，顺便在简介里补充一下我个人在视频里未提到的想法，粉丝是蛋仔派对ugc生态里的重要一环，创作者大会邀请制举办无疑是一个重大的脱离群众错误',
    cover: '/media/cover/dzpd.jpg',
    hasDownload: true,
    hasBilibili: true,
  },
  {
    title: 'maimaiでらっくす × ナンファン ミードー スゴー ちほー - 栄光と夢想（舞萌DX × 株洲市南方中学联动区域 - 光荣与梦想）Lv.15',
    author: '@xxt8582753',
    date: '9/7/25',
    type: 'MP4 视频',
    duration: '01:18',
    desc: '纯属虚构，仅供娱乐，视频中的片假名是我直接按读音翻译的，若有错误请指出。其实我觉得中考和解潘盒子或白xx一样，前面的史歌大歌都打完了，结果发现后面还有高中这个15（？',
    cover: '/media/cover/nfzx.JPG',
    hasDownload: true,
  },
  {
    title: '如何在Win 7以及更高版本上使用NetMeeting 3.0.1',
    author: '@WindowsVistaSP',
    date: '9/6/25',
    type: 'Flash',
    duration: '--:--',
    desc: '这个视频介绍了如何在Win 7以及更高版本上使用NetMeeting 3.0.1，安装包下载链接：http://www.winvistasp.top/download/nm30.exe，补丁包下载链接：http://www.winvistasp.top/download/cracks.zip',
    cover: '/media/cover/win7n.JPG',
    isFlash: true,
  },
  {
    title: 'Flash测试',
    author: '@xxt8582753',
    date: '9/6/25',
    type: 'Flash',
    duration: '--:--',
    desc: '测试',
    cover: '/media/cover/test.JPG',
    isFlash: true,
  },
  {
    title: 'world.execute(me); 但是Scratch',
    author: '@阿巴巴ab3',
    date: '7/30/25',
    type: 'MP4 视频',
    duration: '01:02',
    desc: '并不是完成品，做了一周实在做不下去了发上来看看反响',
    cover: '/media/cover/world.execute(me)_但是scratch.jpg',
    hasBilibili: true,
  },
  {
    title: '欸，我不是窗口吗？——胭脂，但是Windows',
    author: '@AbCd',
    date: '7/23/25',
    type: 'MP4 视频',
    duration: '02:47',
    desc: '本家：BV1ucGzzuEhw @蛋包饭咖喱饭 特别感谢 @BSOD-MEMZ 的灵感和帮助 使用 Python 3.13 + PySide6 制作 耗时一周，花了不少心思，毕竟谁家好人一上来就拿 PyQt 整这玩意',
    cover: '/media/cover/enji_but_win.jpg',
    hasDownload: true,
    hasBilibili: true,
  },
  {
    title: 'world.execute(me); 但是全Win32控件',
    author: '@xxt8582753',
    date: '7/13/25',
    type: 'MP4 视频',
    duration: '03:28',
    desc: '链接https://www.123912.com/s/LQJuVv-rLcNd 一定要读压缩包里的readme.txt！！！时间仓促，做的不是很好，见谅 如果大家喜欢这种类型的下次有空多做点',
    cover: '/media/cover/videoCover-world.execute(me);__但是全Win32控件.31014912874.jpg',
    hasDownload: true,
    hasBilibili: true,
  },
  {
    title: '你会在世界终焉吃掉哈基米（あなたは世界の終わりにはちみを食べるのだ）',
    author: '@AbCd',
    date: '7/12/25',
    type: 'MP4 视频',
    duration: '02:21',
    desc: '耄耋蜘蛛：BV15s5LzpEyR 像素小马：转换自 ChatGPT 似鸣：棍哥 新人接触调音的第一次尝试，过程中或许有点苛求完美，踩了很多坑，效率也是非常低下，一个星期才出来，只能说相当生涩，毕竟也是第一次，凑合听吧，也希望可以稍微支持一下。',
    cover: '/media/cover/videoCover-你会在世界终焉吃掉哈基米(あなたは世界の終わりにはちみを食べるのだ).30985816140.jpg',
    hasDownload: true,
    hasBilibili: true,
  },
]
</script>

<template>
  <TitleBar />

  <NavBar />

  <ContentLayout>
    <template #main>
      <h2><span style="color: #003399">示例多媒体库</span></h2>
      <p>这是一个示例多媒体页面，用于展示视频列表组件的样式效果</p>
      <p><b>样式来源：</b>视频列表、播放图标、分页等样式提取自 xxt85web</p>

      <TipsPanel>
        <p><b>说明</b></p>
        <p>本页面内容为示例数据，用于展示视频列表组件的视觉效果。</p>
        <p>视频封面图片来自 xxt85web 的原始资源。</p>
      </TipsPanel>

      <p>分类：全部</p>

      <div class="video-list">
        <div v-for="(video, idx) in videos" :key="idx" class="video-item">
          <a href="#">
            <div class="video-thumb">
              <img :src="video.cover" :alt="video.title" />
              <div :class="video.isFlash ? 'flash-play-icon' : 'play-icon'"></div>
              <div class="video-duration">{{ video.duration }}</div>
            </div>
            <div class="video-info">
              <h3 class="video-title">{{ video.title }}</h3>
              <div class="video-author">
                作者：{{ video.author }} 发布时间：{{ video.date }} 类型：{{ video.type }}
              </div>
              <div class="video-desc">{{ video.desc }}</div>
            </div>
          </a>
          <div v-if="video.hasDownload || video.hasBilibili" style="margin-top: 8px; padding-left: 175px;">
            <a v-if="video.hasDownload" href="#" style="margin-right: 12px;">
              下载原片
            </a>
            <a v-if="video.hasBilibili" href="#">
              在哔哩哔哩上观看
            </a>
          </div>
        </div>
      </div>

      <div class="pagination">
        <a href="#" class="active">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
      </div>
    </template>

    <template #sidebar>
      <WindowPanel title="统计">
        <ul class="itemlist">
          <li>全部（9）</li>
          <li>科技（4）</li>
          <li>游戏（2）</li>
          <li>生活（1）</li>
          <li>鬼畜（1）</li>
          <li>动画</li>
          <li>影视</li>
          <li>知识</li>
          <li>资讯</li>
          <li>其它（1）</li>
          <br />
          <li>音视频（7）</li>
          <li>Flash（2）</li>
        </ul>
      </WindowPanel>

      <WindowPanel title="你知道吗">
        <ul>
          <li><b>kksk</b>是日语<b>ここ好き</b>的罗马音缩写，意思是喜欢这里。一般会出现在视频的弹幕中，表示这一段很喜欢</li>
          <li><b>233</b>是一个网络用语，大致意思就是啊哈哈，非常好笑的意思</li>
          <li><b>114514</b>是日语<b>いいよ、来（こ）いよ</b>的谐音，意为"好啊，来啊"</li>
          <li>阅读更多（未完成）</li>
        </ul>
      </WindowPanel>
    </template>
  </ContentLayout>

  <FooterBar>
    <p>版权没有 示例站点 不保留任何权利</p>
    <p>Best view at 1024x768</p>
  </FooterBar>
</template>
