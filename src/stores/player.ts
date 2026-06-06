import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface LyricLine {
  t: number
  c: string
}

interface Song {
  title: string
  author?: string
  url: string
  cover?: string
  lrc?: LyricLine[]
}

const baseUrl = import.meta.env.BASE_URL

const defaultSongs: Song[] = [
  {
    title: '神のまにまに',
    author: '初音ミク/GUMI/鏡音リン/れるりり',
    url: 'music/初音ミク 鏡音リン GUMI れるりり - 神のまにまに.mp3',
    cover: 'music/kaminomanimani.png',
    lrc: [
      { t: 0.134, c: '神のまにまに - 初音未来 (初音ミク)/GUMI (グミ)/镜音铃(鏡音リン)' },
      { t: 4.559, c: '词：れるりり' },
      { t: 5.486, c: '曲：れるりり' },
      { t: 23.441, c: '思い通りにいかないことだらけ' },
      { t: 27.337, c: 'どうしようもなく自己嫌悪' },
      { t: 30.554, c: '八百万の痛みや悲しみから' },
      { t: 34.542, c: '逃げ出す場所を探してる' },
      { t: 38.381, c: 'いっそ岩の隙間に引きこもって' },
      { t: 42.449, c: '月も太陽も無視して眠ろう' },
      { t: 45.454, c: '生まれてきたことの意味なんて' },
      { t: 49.626, c: '知らない 分かんないよ' },
      { t: 52.898, c: 'でもそんな風に思えるもの' },
      { t: 56.632, c: '大切な何かがあるから' },
      { t: 61.278, c: 'ちょっとあっち向いて笑って 太陽が昇る' },
      { t: 65.340, c: '君の笑顔が照らすよ' },
      { t: 68.618, c: '何があってもいいさ' },
      { t: 70.925, c: '幸せになろう' },
      { t: 72.484, c: 'だってもっとずっと明日を待っていたいんだ' },
      { t: 76.242, c: 'ならいっそ誰も彼も 右往左往して' },
      { t: 80.375, c: '讃え合おうよ 人生を' },
      { t: 83.504, c: '世界はもっともっと' },
      { t: 85.954, c: '素晴らしいはずさ' },
      { t: 89.479, c: '神のまにまに' },
      { t: 93.385, c: '仰せのままに' },
      { t: 102.264, c: '誰かのせいにしたいことだらけ' },
      { t: 106.155, c: 'どうしようもなく誰かのせい' },
      { t: 109.281, c: '気に入らないもの全部壊して' },
      { t: 113.332, c: 'いないいないばあでさよなら' },
      { t: 117.155, c: 'そうさ結局心は鏡だって' },
      { t: 121.134, c: '昨日も明日も映してるんだよ' },
      { t: 124.238, c: 'だったら笑ったもん勝ちじゃない' },
      { t: 128.384, c: '楽しんだもん勝ちじゃない' },
      { t: 131.810, c: 'もしもなんてことはないよ' },
      { t: 135.343, c: '変えられるのは自分だけ' },
      { t: 140.061, c: 'ちょっとこっち向いて笑って 太陽が昇る' },
      { t: 144.132, c: '君の笑顔が照らすよ' },
      { t: 147.341, c: '何があってもいいさ' },
      { t: 149.689, c: '幸せになろう' },
      { t: 151.272, c: 'だってもっとずっと明日を待っていたいんだ' },
      { t: 155.071, c: 'ならいっそ誰も彼も 右往左往して' },
      { t: 159.083, c: '讃え合おうよ 人生を' },
      { t: 162.296, c: '世界はもっともっと' },
      { t: 164.839, c: '素晴らしいはずさ' },
      { t: 168.225, c: '神のまにまに' },
      { t: 172.181, c: '仰せのままに' },
      { t: 191.077, c: '本当に大事なものなんて' },
      { t: 194.887, c: '案外くだらないことの中にあるよ' },
      { t: 211.332, c: 'ちょっとあっち向いて笑って 太陽が昇る' },
      { t: 215.352, c: '君の笑顔が照らすよ' },
      { t: 218.618, c: '何があってもいいさ' },
      { t: 220.941, c: '幸せになろう' },
      { t: 222.483, c: 'だってもっとずっと明日を待っていたいんだ' },
      { t: 226.257, c: 'ならいっそ誰も彼も 右往左往して' },
      { t: 230.342, c: '讃え合おうよ 人生を' },
      { t: 233.513, c: '世界はもっともっと' },
      { t: 236.035, c: '素晴らしいはずさ' },
      { t: 239.467, c: '神のまにまに' },
      { t: 243.344, c: '仰せのままに' },
      { t: 247.014, c: '地球のまにまに' },
      { t: 250.751, c: '君のまにまに' },
      { t: 254.512, c: '神のまにまに' },
      { t: 283.475, c: '泥んこだけど歩いて行こう' },
      { t: 287.572, c: '泥んこだけど歩いて行こう' },
      { t: 291.206, c: 'まだまだ先は長いさ' },
      { t: 294.597, c: '本当に大事なものなんて' },
      { t: 297.868, c: '案外くだらないことの中にあるよ' },
      { t: 302.098, c: 'ときにはみんなで馬鹿騒ぎ' },
      { t: 304.862, c: '裸踊りで大笑い' },
    ],
  },
  {
    title: 'お砂糖哀歌 (feat. 初音ミク)',
    author: 'MIMI/初音ミク',
    url: 'music/MIMI,初音ミク - お砂糖哀歌 (feat. 初音ミク).mp3',
    cover: 'music/osatouaika.jpg',
    lrc: [
      { t: 0, c: 'お砂糖哀歌 (feat. 初音ミク) - MIMI' },
      { t: 5.117, c: '词：MIMI' },
      { t: 6.076, c: '曲：MIMI' },
      { t: 7.675, c: 'やがては 単純に 傷ついた 感情に' },
      { t: 11.596, c: 'このまま最終便 連れ去ってくれよ' },
      { t: 14.815, c: '嗚呼 ねぇどうしてねぇどうして' },
      { t: 17.848, c: '明日は来ちゃうの' },
      { t: 19.870, c: '問いかける夜の中' },
      { t: 23.658, c: '君のその声が連れ出した' },
      { t: 27.019, c: '2人の逃避行 たった数秒前の' },
      { t: 29.535, c: 'アイロニ も涙に' },
      { t: 31.468, c: 'とろ火で溶かした ハートに' },
      { t: 34.152, c: '混ざるように' },
      { t: 35.274, c: '最後は君にタラッタッタララ' },
      { t: 37.305, c: '愛して って言えたら' },
      { t: 39.155, c: 'ありのまま居れるの なんてね' },
      { t: 50.855, c: '何だって 仄かには考えて' },
      { t: 54.208, c: 'このまま劣等感' },
      { t: 55.634, c: '消えないままでさ 嗚呼' },
      { t: 58.313, c: 'ねぇどうしてどうしてもさ' },
      { t: 100.537, c: '明日がくるなら 君と歌わせてよ' },
      { t: 106.128, c: 'えぃ 最低温度の結露に' },
      { t: 107.938, c: '灯す 静かな感情舞うよに' },
      { t: 110.109, c: 'かすかに揺らいで溶けだす 心 だけ' },
      { t: 114.015, c: '及第点のオールデイならば' },
      { t: 116.022, c: 'これ以上何も求めないで居たい' },
      { t: 118.584, c: '目を瞑る' },
      { t: 121.197, c: '月夜の逃避行 たった3分間の' },
      { t: 123.660, c: 'ランデブー 覚えてる' },
      { t: 125.650, c: 'その魔法が解けるまで 待っててよ' },
      { t: 129.477, c: '最後に全部 タラッタッタララ' },
      { t: 131.555, c: '愛だけ 抱きしめて 君と踊りたいの' },
      { t: 136.344, c: 'このまま逃避行 たった数秒前の' },
      { t: 139.059, c: 'アイロニ も涙に' },
      { t: 141.128, c: 'とろ火で溶かした ハートに' },
      { t: 143.814, c: '混ざるように' },
      { t: 144.909, c: '最後は君にタラッタッタララ' },
      { t: 147.009, c: '愛して って言えたら' },
      { t: 148.834, c: 'ありのまま居れるの なんてね' },
      { t: 152.707, c: 'なんにもないまま待ってる' },
      { t: 154.600, c: '週末の明けに待ってる' },
      { t: 156.642, c: '持ち越せない気持ち' },
      { t: 159.371, c: 'このまま 嗚呼' },
      { t: 160.913, c: '鮮やかなまま 君と舞う この逃避行' },
      { t: 164.414, c: '明日が来る前に 来る前に' },
    ],
  },
  {
    title: "I Can't Wait (feat. GUMI)",
    author: 'd0tc0mmie/GUMI',
    url: "music/d0tc0mmie,GUMI - I Can't Wait (feat. GUMI).mp3",
    cover: 'music/icantwait.jpg',
    lrc: [
      { t: 0.000, c: "I Can't Wait - GUMI (グミ)" },
      { t: 3.112, c: "I can't wait" },
      { t: 4.216, c: 'No mistake' },
      { t: 5.791, c: "I'm in love" },
      { t: 6.983, c: 'Like a drug' },
      { t: 8.496, c: 'Pick me up' },
      { t: 9.897, c: 'These feelings' },
      { t: 11.346, c: 'Will never leave my heart' },
      { t: 14.232, c: 'Love me' },
      { t: 15.031, c: 'Love me ahh' },
      { t: 18.272, c: "I can't wait" },
      { t: 19.152, c: 'No mistake' },
      { t: 20.650, c: "I'm in love" },
      { t: 21.944, c: 'Like a drug' },
      { t: 23.376, c: 'Pick me up' },
      { t: 24.853, c: 'These feelings' },
      { t: 26.256, c: 'Will never leave my heart' },
      { t: 29.164, c: 'Love me love me ahh' },
      { t: 33.122, c: '（Teto sax solo ♪）' },
      { t: 48.971, c: 'ドキドキ 愛してる' },
      { t: 52.343, c: 'ずっと離さない' },
      { t: 55.259, c: 'この feeling good' },
      { t: 60.077, c: '愛して愛して aaa' },
      { t: 63.916, c: "I can't wait" },
      { t: 64.954, c: 'No mistake' },
      { t: 66.417, c: "I'm in love" },
      { t: 67.787, c: 'Like a drug' },
      { t: 69.139, c: 'Pick me up' },
      { t: 70.594, c: 'These feelings' },
      { t: 71.902, c: 'Will never leave my heart' },
      { t: 74.879, c: 'Love me love me ahh' },
    ],
  },
  {
    title: 'ロストワンの号哭',
    author: 'Neru/鏡音リン',
    url: 'music/Neru,鏡音リン - ロストワンの号哭.mp3',
    cover: 'music/lostone.jpg',
    lrc: [
      { t: 0, c: 'ロストワンの号哭 (被遗弃者的号哭) - Neru/鏡音リン' },
      { t: 0.63, c: '词：Neru<br>曲：Neru' },
      { t: 16.58, c: '刃渡り数センチの不信感が<br>持刀数厘米的不信任感' },
      { t: 19.34, c: '挙げ句の果てには静脈を刺しちゃって<br>最终竟刺入了静脉之中' },
      { t: 22.15, c: '病弱な愛が飛び出すもんで<br>病态虚弱的爱飞溅而出' },
      { t: 25.07, c: 'レスポールさえも凶器に変えてしまいました<br>就连Gibson Les Paul也化为了凶器' },
      { t: 28.01, c: 'ノーフィクション<br>并非虚构' },
      { t: 33.6, c: '数学と理科は好きですが<br>虽然喜欢数学和理科' },
      { t: 36.32, c: '国語はまともに読み書きできません<br>国语却无法正常地读写' },
      { t: 39.14, c: 'あぁ、そんなんじゃどうせ大人になったって<br>啊啊 这样下去反正就算长大成人' },
      { t: 42.14, c: '何処かの誰かが言っていたっけな<br>大概也会被不知哪里的谁那样说道吧' },
      { t: 45.1, c: 'いつまで経ったって僕たちは<br>不论经过多久我们' },
      { t: 47.78, c: 'こんな自尊心に振り回されて<br>都被这样的自尊心所摆布着' },
      { t: 50.7, c: 'まだ見ぬ本性を選び抜いて<br>在那尚未知晓的本性中进行抉择' },
      { t: 53.64, c: 'あぁ、どうしようもなくなって<br>啊啊 变得无计可施' },
      { t: 56.12, c: 'もう叫ぶしかないんだ<br>只能在此大声呼喊了' },
      { t: 59.29, c: '今日の宿題は　相変わらず<br>今天的作业 还是那样' },
      { t: 62.13, c: '解けないや<br>无法解答啊' },
      { t: 65.04, c: '不自由ない　最近の暮らし<br>并无不自由 如今的生活' },
      { t: 67.8, c: 'でも何故か　息苦しいんだ<br>但不知为何 却感到窒息难耐' },
      { t: 70.76, c: '「僕たちを、どうしたいんですか」<br>「你们到底，想把我们怎样」' },
      { t: 73.65, c: 'あんな事や　こんな事<br>那种事情也好 这类事情也罢' },
      { t: 76.54, c: '「どうだっていいだろう」<br>「无论怎样都无所谓吧」' },
      { t: 79.4, c: 'あんな夢や　こんな夢<br>那种梦想也好 这类梦想也罢' },
      { t: 82.26, c: '「そんなのもう、どうだっていいんだよ」<br>「那种东西已经，怎样都无所谓了啊」' },
      { t: 102.26, c: '面積比の公式言えますか<br>能够背出面积比的公式吗' },
      { t: 104.99, c: '子供の時の夢は言えますか<br>能够说出儿时的梦想吗' },
      { t: 107.82, c: 'その夢すら溝に捨てたのは<br>就连那个梦想也将其弃之沟渠的' },
      { t: 110.8, c: 'おい誰なんだよ　もう知ってんだろ<br>喂 到底是谁啊 其实早就已经知道了吧' },
      { t: 113.79, c: 'いつまで経ったら大人になれますか<br>究竟到什么时候才能成为大人呢' },
      { t: 116.48, c: 'そもそも大人とは一体全体何ですか<br>说到底大人这种东西究竟指的是什么啊' },
      { t: 119.34, c: '誰に聞けばいいんですか　おいどうすんだよ<br>去问谁才好呢 喂 到底要怎样才好啊' },
      { t: 122.3, c: 'もう、どうしようもないんだ<br>已经 无计可施了啊' },
      { t: 127.91, c: '今日の宿題は　相変わらず<br>今天的作业 还是那样' },
      { t: 130.82, c: '解けないや<br>无法解答啊' },
      { t: 133.7, c: '不自由ない　最近の暮らし<br>并无不自由 如今的生活' },
      { t: 136.43, c: 'でも何故か　息苦しいんだ<br>但不知为何 却感到窒息难耐' },
      { t: 139.42, c: '「僕のこの、心の穴は」<br>「我内心里的，这个空洞」' },
      { t: 142.3, c: '「何で埋めればいいですか」<br>「要用什么去填补才好呢」' },
      { t: 145.1, c: 'あんな事や　こんな事<br>那种事情也好 这类事情也罢' },
      { t: 148.1, c: '「もうどうだっていいんだよ」<br>「已经无论怎样都无所谓了啊」' },
      { t: 150.8, c: 'あんな夢や　こんな夢<br>那种梦想也好 这类梦想也罢' },
      { t: 153.76, c: '「もうどうだっていいんだよ」<br>「已经无论怎样都无所谓了啊」' },
      { t: 156.6, c: '「僕たちを、どうしたいんですか」<br>「你们到底，想把我们怎样」' },
      { t: 159.5, c: 'あんな事や　こんな事<br>那种事情也好 这类事情也罢' },
      { t: 162.3, c: '「どうだっていいだろう」<br>「无论怎样都无所谓吧」' },
      { t: 165.2, c: 'あんな夢や　こんな夢<br>那种梦想也好 这类梦想也罢' },
      { t: 168.1, c: '「そんなのもう、どうだっていいんだよ」<br>「那种东西已经，怎样都无所谓了啊」' },
      { t: 171.1, c: 'もうどうだっていいんだよ<br>已经无论怎样都无所谓了啊' },
    ],
  },
  {
    title: '愛言葉IV',
    author: 'DECO*27/初音ミク',
    url: 'music/aikotoba_bgm_320.mp3',
    cover: 'music/aikotoba_bgm_320.mp3',
    lrc: [
      { t: 21.378, c: 'ねえいくつ夢に出会った？' },
      { t: 25.214, c: 'そのいくつを叶えた？' },
      { t: 28.708, c: '次の旅へ行こうか' },
      { t: 31.136, c: 'わっはー We\'re おニューなキメラ' },
      { t: 34.135, c: '一人じゃダメなら　二人になればいい' },
      { t: 37.921, c: '一緒ランド作りっこしよ' },
      { t: 41.060, c: 'おすわりしてても　じれったくなるんでしょ' },
      { t: 44.763, c: 'だったら進むだけ　それでいいじゃん' },
      { t: 48.466, c: '愛とか恋とか僕とか君とかいつもデビってんのん？' },
      { t: 51.420, c: '好きとか嫌いでウダウダ　たまには死ぬほどピュアピュアやってんのん' },
      { t: 54.871, c: '君に歌ってほしい歌　まだあるや' },
      { t: 58.341, c: 'ねえ全部いけるかな' },
      { t: 61.512, c: '君が<br>因为你' },
      { t: 62.134, c: '何回だって想うから' },
      { t: 63.902, c: '何回だって歌うよ"39"' },
      { t: 65.637, c: '何回だって聴いてね　約束ね' },
      { t: 68.362, c: 'きっと1からゴールへ　その先だって' },
      { t: 70.877, c: '君がやめらんない　愛言葉は終わらせない' },
      { t: 75.405, c: '僕は<br>而我' },
      { t: 76.054, c: '何回だって変わるけど' },
      { t: 77.782, c: '何回だって歌うよ"39"' },
      { t: 79.557, c: '何回だっておいでよ　ここにいる' },
      { t: 82.368, c: 'きっと1からゴールへ　その先だって' },
      { t: 84.722, c: '君がやめらんない　愛言葉はいつまでも' },
      { t: 88.637, c: 'ありがとう' },
      { t: 92.760, c: '例えば　君が消えてしまうなら' },
      { t: 96.199, c: '例えば　僕はやめてしまうでしょう' },
      { t: 99.670, c: '例えば　そんなのはごめんなの' },
      { t: 103.156, c: 'だからさ　これからも戦うみょん' },
      { t: 106.765, c: 'ああああ' },
      { t: 107.265, c: 'ポップとロックでハイ&ロー　サイコなチャンバラやってんのん' },
      { t: 110.401, c: 'あたしまだまだまだまだまだまだまだまだやれる　決まってんの' },
      { t: 113.681, c: '届いたテレパシ　やっと会えた' },
      { t: 117.130, c: 'やあ　ちゃんと見えてるかい' },
      { t: 134.841, c: '声が好き　…バカ。' },
      { t: 138.310, c: '顔が好き　…バカ。' },
      { t: 141.607, c: 'バカだもん　これだけは一生言うんだもん' },
      { t: 147.802, c: '…バカ。' },
      { t: 149.683, c: '君が' },
      { t: 150.433, c: '何回だって想うから' },
      { t: 152.086, c: '何回だって歌うよ"39"' },
      { t: 153.813, c: '何回だって聴いてね　約束ね' },
      { t: 156.615, c: 'きっと1からゴールへ　その先だって' },
      { t: 159.019, c: '君がやめらんない　愛言葉は終わらせない' },
      { t: 163.509, c: '僕は' },
      { t: 164.177, c: '何回だって変わるけど' },
      { t: 165.925, c: '何回だって歌うよ"39"' },
      { t: 167.624, c: '何回だっておいでよ　ここにいる' },
      { t: 170.495, c: 'きっと1からゴールへ　その先だって' },
      { t: 172.833, c: '君がやめらんない　愛言葉はいつまでも' },
      { t: 176.715, c: 'ありがとう' },
      { t: 177.925, c: '好好好のラブ連単　君としたいことがいっぱい' },
      { t: 184.001, c: 'サラマンダー　ホットが良くない？やっぱ大成功' },
      { t: 191.348, c: 'もうやっぱアピってラビったらいいじゃん' },
      { t: 193.511, c: 'サッドな愛も　歌ったらいいじゃん' },
      { t: 195.246, c: 'みっともないけど　嫉妬しちゃうけど　どうか許してね' },
      { t: 197.832, c: 'どんな歌だってずっと　君と届け続けるよ' },
    ],
  },
]

export const usePlayerStore = defineStore('player', () => {
  // ---- 响应式状态 ----
  const songs = ref<Song[]>([...defaultSongs])
  const currentIndex = ref(0)
  const isPlaying = ref(false)
  const progress = ref(0)
  const currentLyric = ref('就绪')
  const currentTime = ref(0)

  // ---- 全局唯一的 Audio 实例（不依赖组件生命周期） ----
  let audio: HTMLAudioElement | null = null

  function ensureAudio(): HTMLAudioElement {
    if (!audio) {
      audio = new Audio()
      audio.addEventListener('timeupdate', onTimeUpdate)
      audio.addEventListener('ended', onEnded)
      audio.addEventListener('play', () => { isPlaying.value = true })
      audio.addEventListener('pause', () => { isPlaying.value = false })
    }
    return audio
  }

  // ---- 计算属性 ----
  const currentSong = computed(() => songs.value[currentIndex.value])

  const coverSrc = computed(() => {
    if (currentSong.value?.cover) {
      return `${baseUrl}${currentSong.value.cover}`
    }
    return `${baseUrl}images/default_album.png`
  })

  // ---- 内部事件处理 ----
  function onTimeUpdate() {
    if (!audio || !audio.duration) return
    currentTime.value = audio.currentTime
    progress.value = (audio.currentTime / audio.duration) * 100
    updateLyric()
  }

  function onEnded() {
    nextSong()
  }

  function updateLyric() {
    if (!audio || !currentSong.value?.lrc) {
      currentLyric.value = '无歌词'
      return
    }

    const currentTime = audio.currentTime
    const lrc = currentSong.value.lrc

    for (let i = lrc.length - 1; i >= 0; i--) {
      const line = lrc[i]
      if (line && currentTime >= line.t) {
        currentLyric.value = line.c
        return
      }
    }

    currentLyric.value = '就绪'
  }

  // ---- 对外操作 ----
  function initAudio() {
    const a = ensureAudio()
    if (!a.src && currentSong.value) {
      a.src = `${baseUrl}${currentSong.value.url}`
      a.load()
    }
  }

  function playSong(index: number) {
    currentIndex.value = index
    currentLyric.value = '就绪'
    const a = ensureAudio()
    if (!currentSong.value) {
      return
    }
    a.src = `${baseUrl}${currentSong.value.url}`
    a.load()
    a.play().catch(() => {
      isPlaying.value = false
    })
  }

  function togglePlay() {
    const a = ensureAudio()
    if (!a.src && currentSong.value) {
      a.src = `${baseUrl}${currentSong.value.url}`
      a.load()
    }
    if (a.paused) {
      a.play().catch(() => {
        isPlaying.value = false
      })
    } else {
      a.pause()
    }
  }

  function prevSong() {
    const newIndex = (currentIndex.value - 1 + songs.value.length) % songs.value.length
    playSong(newIndex)
  }

  function nextSong() {
    const newIndex = (currentIndex.value + 1) % songs.value.length
    playSong(newIndex)
  }

  function seekTo(pct: number) {
    const a = ensureAudio()
    if (a.duration) {
      a.currentTime = pct * a.duration
    }
  }

  // ---- 组件卸载时不再销毁 Audio，所以不需要 destroy ----
  // 如果确实需要在应用退出时清理，可以调用：
  function destroy() {
    if (audio) {
      audio.pause()
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
      audio.src = ''
      audio = null
    }
  }

  return {
    songs,
    currentIndex,
    isPlaying,
    progress,
    currentTime,
    currentLyric,
    currentSong,
    coverSrc,
    initAudio,
    playSong,
    togglePlay,
    prevSong,
    nextSong,
    seekTo,
    destroy,
  }
})
