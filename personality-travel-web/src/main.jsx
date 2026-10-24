import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown, ArrowLeft, ArrowRight, Bookmark, Check, Compass, Heart,
  MapPin, Menu, Mountain, Sparkles, Sun, X, Clock3, Wallet, Share2,
  RotateCcw, Leaf, Waves, Building2, Footprints
} from 'lucide-react'
import './styles.css'

const questions = [
  { dimension: 'social', title: '理想的旅行第一天，你更想……', subtitle: '从你最自然的选择出发', options: [
    { label: '认识新朋友，感受热闹氛围', type: 'E' }, { label: '和熟悉的人慢慢探索', type: 'I' },
    { label: '参加当地活动，边走边聊', type: 'E' }, { label: '独自散步，观察城市细节', type: 'I' }
  ]},
  { dimension: 'senses', title: '面对一座陌生城市，你会先关注……', subtitle: '没有标准答案，选最像你的', options: [
    { label: '地标、路线和实用信息', type: 'S' }, { label: '城市气质和背后的故事', type: 'N' },
    { label: '当地美食、街道与生活细节', type: 'S' }, { label: '这座城市带来的灵感', type: 'N' }
  ]},
  { dimension: 'feeling', title: '决定下一站时，你通常更相信……', subtitle: '你做选择时的直觉', options: [
    { label: '计划是否合理、效率如何', type: 'T' }, { label: '大家是否开心、体验是否舒服', type: 'F' },
    { label: '预算、时间和实际条件', type: 'T' }, { label: '当下的感受和心动程度', type: 'F' }
  ]},
  { dimension: 'planning', title: '你喜欢怎样安排旅行？', subtitle: '行程安排也透露着旅行性格', options: [
    { label: '提前做好计划，心里有底', type: 'J' }, { label: '留白多一点，随时改变主意', type: 'P' },
    { label: '预订关键项目，其他随缘', type: 'J' }, { label: '走到哪算哪，惊喜最重要', type: 'P' }
  ]},
  { dimension: 'adventure', title: '看到一项没尝试过的户外活动，你会……', subtitle: '探索未知的意愿', options: [
    { label: '马上报名，挑战一下自己', type: 'A' }, { label: '先了解安全和难度', type: 'C' },
    { label: '只要有趣，就愿意试试', type: 'A' }, { label: '更喜欢轻松、熟悉的体验', type: 'C' }
  ]},
  { dimension: 'social', title: '旅行中最让你充电的时刻是？', subtitle: '想象一下你最舒服的状态', options: [
    { label: '和一群人分享快乐', type: 'E' }, { label: '安静享受自己的时间', type: 'I' },
    { label: '加入有趣的当地活动', type: 'E' }, { label: '找间咖啡馆独处片刻', type: 'I' }
  ]},
  { dimension: 'senses', title: '你更容易被哪种旅行体验打动？', subtitle: '选一个最有吸引力的画面', options: [
    { label: '亲眼看见壮丽的自然景观', type: 'S' }, { label: '理解一个地方的文化脉络', type: 'N' },
    { label: '发现一家当地人常去的小店', type: 'S' }, { label: '感受一段有故事的旅程', type: 'N' }
  ]},
  { dimension: 'feeling', title: '同行的人对行程有不同意见，你会……', subtitle: '每种方式都有自己的优点', options: [
    { label: '把选项列出来，比较利弊', type: 'T' }, { label: '先听大家的感受和想法', type: 'F' },
    { label: '优先考虑时间与交通效率', type: 'T' }, { label: '寻找让所有人都开心的方案', type: 'F' }
  ]},
  { dimension: 'planning', title: '你最享受的行程节奏是？', subtitle: '选择让你自在的节奏', options: [
    { label: '每天完成计划中的重点', type: 'J' }, { label: '一天只安排一两个目标', type: 'P' },
    { label: '提前订好门票和交通', type: 'J' }, { label: '看到喜欢的地方就多待一会儿', type: 'P' }
  ]},
  { dimension: 'adventure', title: '如果旅途中出现计划外的机会……', subtitle: '未知对你意味着什么？', options: [
    { label: '很兴奋，想看看会发生什么', type: 'A' }, { label: '评估一下风险再决定', type: 'C' },
    { label: '通常会跟着好奇心走', type: 'A' }, { label: '更希望按照原计划进行', type: 'C' }
  ]},
  { dimension: 'social', title: '你会选择哪种住宿？', subtitle: '住宿也是体验的一部分', options: [
    { label: '热闹的青旅，方便认识旅伴', type: 'E' }, { label: '安静舒适、私密性好的住处', type: 'I' },
    { label: '有公共空间和活动的民宿', type: 'E' }, { label: '有设计感的独立小住处', type: 'I' }
  ]},
  { dimension: 'senses', title: '你更喜欢怎样探索景点？', subtitle: '选择你的自然偏好', options: [
    { label: '看地图逐个打卡经典地标', type: 'S' }, { label: '跟着主题寻找隐藏线索', type: 'N' },
    { label: '仔细体验当地食物和手艺', type: 'S' }, { label: '从历史和传说理解此地', type: 'N' }
  ]},
  { dimension: 'feeling', title: '一趟成功的旅行，对你来说是……', subtitle: '什么会让你觉得不虚此行？', options: [
    { label: '行程顺利，收获满满', type: 'T' }, { label: '留下珍贵回忆和情感连接', type: 'F' },
    { label: '完成挑战，学到新东西', type: 'T' }, { label: '感到放松，与自己重新连接', type: 'F' }
  ]},
  { dimension: 'planning', title: '出发前一天，你的行李通常……', subtitle: '最后一个关于旅行习惯的问题组', options: [
    { label: '早就整理好了，清单逐项确认', type: 'J' }, { label: '大致收拾，留点空间给变化', type: 'P' },
    { label: '重要物品都按计划准备妥当', type: 'J' }, { label: '临出发前凭感觉收拾', type: 'P' }
  ]},
  { dimension: 'adventure', title: '给这次旅行选一个关键词，你会选？', subtitle: '选最让你心动的方向', options: [
    { label: '突破：挑战没做过的事', type: 'A' }, { label: '安心：轻松享受熟悉节奏', type: 'C' },
    { label: '探索：去看看未知的风景', type: 'A' }, { label: '疗愈：给身心好好放个假', type: 'C' }
  ]}
]

const destinations = [
  { id:'zhangjiajie', name:'张家界', region:'湖南 · 自然奇观', category:'自然探险', season:'3–11 月', cost:'¥2,000–5,000', days:'3–5 天', match:['A','S','P'], score:96, image:'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=85', desc:'穿行峰林峡谷，在云雾与山海之间打开感官。', tags:['山野探索','徒步','摄影'], attractions:['天门山','张家界国家森林公园','张家界大峡谷'], food:'土家三下锅、腊肉、莓茶', route:['Day 1：抵达张家界，熟悉城市与当地美食','Day 2：探索国家森林公园，预留自由徒步时间','Day 3：前往天门山，按天气调整观景安排'], advice:'山路较多，穿防滑徒步鞋；旺季提前确认门票与交通，户外项目按官方安全提示选择。' },
  { id:'lijiang', name:'丽江', region:'云南 · 慢生活与人文', category:'文化漫游', season:'全年（春秋舒适）', cost:'¥2,500–5,500', days:'3–5 天', match:['I','N','F'], score:93, image:'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85', desc:'在古城小巷、雪山远景和纳西文化中慢慢找回节奏。', tags:['古城漫步','文化','慢旅行'], attractions:['丽江古城','玉龙雪山','束河古镇'], food:'鸡豆凉粉、纳西烤肉、米灌肠', route:['Day 1：古城漫步，找一家小店感受当地生活','Day 2：根据天气安排玉龙雪山或周边徒步','Day 3：前往束河古镇，留出不赶路的午后'], advice:'留意高海拔活动的身体反应；古城石板路不平，选择舒适鞋履。' },
  { id:'qingdao', name:'青岛', region:'山东 · 海滨城市', category:'城市休闲', season:'5–10 月', cost:'¥1,500–4,000', days:'2–4 天', match:['E','S','F'], score:90, image:'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85', desc:'沿着海岸线散步，在海风、街区与海鲜里感受城市。', tags:['海边','美食','城市漫步'], attractions:['栈桥','八大关','崂山'], food:'海鲜、鲅鱼水饺、锅贴', route:['Day 1：海边散步，逛老城区街巷','Day 2：探索八大关与咖啡馆，傍晚看海','Day 3：视天气与体力安排崂山或自由活动'], advice:'海边天气变化较快，带一件薄外套；海鲜选择正规商家并确认价格。' },
  { id:'tibet', name:'西藏', region:'西藏自治区 · 高原风光', category:'深度探索', season:'5–10 月（视地区而定）', cost:'¥3,500–8,000+', days:'5–8 天', match:['A','N','I'], score:88, image:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85', desc:'辽阔山脉与深厚文化，让旅程成为一次慢下来的探索。', tags:['壮阔风景','人文','深度旅行'], attractions:['拉萨布达拉宫','大昭寺','纳木错（视开放与路况）'], food:'藏面、甜茶、糌粑', route:['Day 1：抵达后休息，适应海拔','Day 2：轻松参观市区文化景点','Day 3：根据身体状态与天气安排周边行程'], advice:'高原行程需预留适应时间，提前了解健康与入藏要求；路况、天气及景点开放情况以出行前官方信息为准。' },
  { id:'suzhou', name:'苏州', region:'江苏 · 园林与水巷', category:'人文静游', season:'3–5 月、9–11 月', cost:'¥1,200–3,500', days:'2–3 天', match:['I','S','J'], score:87, image:'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85', desc:'在园林、古桥与水巷间细看日常之美，适合不赶时间的旅行。', tags:['园林','艺术','安静漫游'], attractions:['拙政园','平江路','苏州博物馆'], food:'苏式汤面、松鼠鳜鱼、青团（时令）', route:['Day 1：园林与博物馆，提前预约热门场馆','Day 2：沿平江路慢走，体验苏式茶点','Day 3：选一处园林或周边水乡深度游览'], advice:'热门园林和博物馆注意预约；周末古街人流较多，可选择早晨出行。' },
  { id:'ningxia', name:'宁夏', region:'宁夏 · 沙漠与星空', category:'户外冒险', season:'4–10 月', cost:'¥2,000–4,500', days:'3–5 天', match:['A','S','T'], score:85, image:'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=85', desc:'沙丘、戈壁与星空构成鲜明对比，适合喜欢新鲜感的人。', tags:['沙漠','星空','户外'], attractions:['沙坡头','镇北堡西部影城','贺兰山岩画'], food:'手抓羊肉、羊杂、八宝茶', route:['Day 1：抵达银川，品尝当地美食','Day 2：前往沙坡头，按运营安排体验户外项目','Day 3：探索贺兰山或西部影城'], advice:'沙漠昼夜温差大，注意防晒补水；参加户外项目请遵守运营方安全要求。' },
  { id:'chengdu', name:'成都', region:'四川 · 美食与松弛感', category:'城市体验', season:'全年', cost:'¥1,500–4,000', days:'2–4 天', match:['E','F','P'], score:84, image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85', desc:'从街头小吃到茶馆闲坐，体验一座城市的生活温度。', tags:['美食','茶馆','城市生活'], attractions:['宽窄巷子','武侯祠','成都大熊猫繁育研究基地'], food:'火锅、担担面、钟水饺', route:['Day 1：街区漫步，安排一顿地道川菜','Day 2：根据预约游览熊猫基地，下午茶馆休息','Day 3：武侯祠与周边街巷，晚上自由觅食'], advice:'熊猫基地热门时段建议提前预约；川菜可提前说明辣度偏好。' },
  { id:'dali', name:'大理', region:'云南 · 湖畔与自由节奏', category:'慢旅行', season:'3–6 月、9–11 月', cost:'¥2,000–4,500', days:'3–5 天', match:['I','N','P'], score:82, image:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85', desc:'沿洱海骑行、在小院发呆，把时间还给风景与自己。', tags:['湖畔','骑行','慢节奏'], attractions:['洱海生态廊道','大理古城','喜洲古镇'], food:'乳扇、饵丝、酸辣鱼', route:['Day 1：古城散步，熟悉周边街巷','Day 2：选择合适路段骑行或步行洱海生态廊道','Day 3：前往喜洲，体验白族建筑与小吃'], advice:'环湖路线较长，骑行前确认车辆状况与天气；尊重当地居民生活与生态环境。' }
]

const profiles = {
  explorer: { label:'探险型冒险家', type:'ESTP', desc:'你喜欢刺激和新鲜感，说走就走是你的人生哲学。未知会点燃你的好奇心，能亲身体验的旅程最让你难忘。', keywords:['冒险','社交','自然','刺激'], styles:['自驾旅游','户外探索','背包客'], icon:Mountain },
  thinker: { label:'思想型学者', type:'INTJ', desc:'你深思熟虑，对事物本质充满好奇。你偏爱有内容、有脉络的旅行，在探索文化与自然时获得灵感。', keywords:['思考','文化','深度','独立'], styles:['文化漫游','深度旅行','主题探索'], icon:Compass },
  artist: { label:'感受型漫游者', type:'INFP', desc:'你重视感受、氛围与真实连接。比起匆忙打卡，你更愿意给一段风景、一家小店或一次相遇留下时间。', keywords:['感受','美学','慢旅行','灵感'], styles:['慢旅行','艺术探索','小众漫游'], icon:Leaf },
  connector: { label:'活力型体验家', type:'ESFP', desc:'你热爱生活与分享，容易被热闹、有趣的体验吸引。美食、城市活动和旅途中的新朋友会让你能量满满。', keywords:['活力','美食','社交','体验'], styles:['城市探索','美食之旅','朋友结伴'], icon:Sparkles },
  planner: { label:'秩序型探索者', type:'ISTJ', desc:'你喜欢清晰可靠的安排，也乐于在准备充分后安心探索。经典景点、丰富细节与顺畅的行程能让你收获踏实的满足感。', keywords:['规划','细节','可靠','探索'], styles:['经典路线','文化旅行','自驾游'], icon:MapPin }
}

function getProfile(answers) {
  const count = key => answers.filter(a => a.type === key).length
  const adventurous = count('A') >= count('C')
  const extrovert = count('E') >= count('I')
  const intuitive = count('N') >= count('S')
  const feeling = count('F') >= count('T')
  const perceiving = count('P') >= count('J')
  if (adventurous && extrovert) return profiles.explorer
  if (!extrovert && intuitive && feeling) return profiles.artist
  if (!extrovert && !feeling) return profiles.thinker
  if (extrovert && feeling) return profiles.connector
  return profiles.planner
}

function App() {
  const [page, setPage] = useState('home')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [profile, setProfile] = useState(null)
  const [selected, setSelected] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('xingge-favorites') || '[]') } catch { return [] }
  })
  const [activeDestination, setActiveDestination] = useState(null)
  const [toast, setToast] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { localStorage.setItem('xingge-favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2400)
    return () => clearTimeout(t)
  }, [toast])

  const recommended = useMemo(() => {
    if (!profile) return destinations.slice(0, 4)
    const type = profile.type
    return [...destinations].map(d => {
      let bonus = 0
      if (profile === profiles.explorer && d.match.includes('A')) bonus += 4
      if (profile === profiles.artist && d.match.includes('I')) bonus += 3
      if (profile === profiles.thinker && d.match.includes('N')) bonus += 3
      if (profile === profiles.connector && d.match.includes('E')) bonus += 3
      if (profile === profiles.planner && d.match.includes('J')) bonus += 3
      return { ...d, userScore: Math.min(99, d.score + bonus) }
    }).sort((a,b) => b.userScore - a.userScore).slice(0, 6)
  }, [profile])

  const startTest = () => {
    setAnswers([]); setQuestionIndex(0); setSelected(null); setPage('test')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const answerQuestion = (option) => {
    setSelected(option)
    const next = [...answers.slice(0, questionIndex), option]
    setAnswers(next)
    if (questionIndex < questions.length - 1) {
      setTimeout(() => { setQuestionIndex(i => i + 1); setSelected(null) }, 180)
    } else {
      const result = getProfile(next)
      setProfile(result)
      setTimeout(() => { setPage('result'); setSelected(null); window.scrollTo({top:0,behavior:'smooth'}) }, 220)
    }
  }
  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const has = prev.includes(id)
      setToast(has ? '已从收藏中移除' : '已加入我的收藏')
      return has ? prev.filter(x => x !== id) : [...prev, id]
    })
  }
  const openDestination = d => { setActiveDestination(d); setPage('detail'); window.scrollTo({top:0,behavior:'smooth'}) }
  const go = p => { setPage(p); setMenuOpen(false); window.scrollTo({top:0,behavior:'smooth'}) }
  const share = async () => {
    const text = profile ? `我的旅行人格是「${profile.label}」(${profile.type})，来《性格之旅》找到适合你的旅行方式吧！` : '来《性格之旅》找到适合你的旅行方式吧！'
    try {
      if (navigator.share) await navigator.share({ title:'性格之旅', text, url:location.href })
      else if (navigator.clipboard) { await navigator.clipboard.writeText(text + ' ' + location.href); setToast('分享文案已复制') }
      else setToast(text)
    } catch {}
  }

  const favoriteDestinations = destinations.filter(d => favorites.includes(d.id))
  const activeQuestion = questions[questionIndex]
  const activeProfile = profile || profiles.explorer

  return <div className="app-shell">
    <header className="site-header">
      <button className="brand" onClick={() => go('home')} aria-label="返回首页">
        <span className="brand-mark"><Compass size={22}/></span>
        <span><strong>性格之旅</strong><small>TRAVEL, YOUR WAY</small></span>
      </button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <button className={page === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => go('home')}>首页</button>
        <button className={page === 'explore' ? 'nav-link active' : 'nav-link'} onClick={() => go('explore')}>目的地</button>
        <button className={page === 'favorites' ? 'nav-link active' : 'nav-link'} onClick={() => go('favorites')}>我的收藏 <span className="nav-count">{favorites.length}</span></button>
        <button className="nav-cta" onClick={startTest}><Sparkles size={16}/> 开始测试</button>
      </nav>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="打开菜单">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      {page === 'home' && <HomePage destinations={destinations} onStart={startTest} onExplore={() => go('explore')} onOpen={openDestination} favorites={favorites} onFavorite={toggleFavorite} />}
      {page === 'test' && <section className="test-wrap">
        <button className="back-link" onClick={() => go('home')}><ArrowLeft size={16}/> 返回首页</button>
        <div className="test-card">
          <div className="test-kicker"><span className="eyebrow-dot"/> YOUR TRAVEL PERSONALITY</div>
          <div className="progress-meta"><span>探索你的旅行性格</span><span>{questionIndex + 1} / {questions.length}</span></div>
          <div className="progress-track"><div className="progress-fill" style={{width:`${((questionIndex+1)/questions.length)*100}%`}}/></div>
          <div className="question-content" key={questionIndex}>
            <p className="question-number">QUESTION {String(questionIndex + 1).padStart(2,'0')}</p>
            <h1>{activeQuestion.title}</h1><p className="muted">{activeQuestion.subtitle}</p>
            <div className="answer-list">{activeQuestion.options.map((o,i) => <button key={o.label} className={`answer-option ${selected?.label === o.label ? 'chosen' : ''}`} onClick={() => answerQuestion(o)}><span className="option-letter">{String.fromCharCode(65+i)}</span><span>{o.label}</span><ArrowRight className="answer-arrow" size={18}/></button>)}</div>
            <div className="test-foot"><span><Clock3 size={15}/> 约 2 分钟完成</span><span>没有对错，凭直觉选择</span></div>
          </div>
          {questionIndex > 0 && <button className="previous-question" onClick={() => { setQuestionIndex(i => i-1); setSelected(null); setAnswers(a => a.slice(0,-1)) }}><ArrowLeft size={15}/> 上一题</button>}
        </div>
      </section>}

      {page === 'result' && <ResultPage profile={activeProfile} destinations={recommended} onOpen={openDestination} onRetest={startTest} onShare={share} onExplore={() => go('explore')} favorites={favorites} onFavorite={toggleFavorite} />}
      {page === 'explore' && <ExplorePage destinations={recommended} profile={profile} onOpen={openDestination} favorites={favorites} onFavorite={toggleFavorite} onStart={startTest} />}
      {page === 'favorites' && <FavoritesPage destinations={favoriteDestinations} onOpen={openDestination} onExplore={() => go('explore')} onFavorite={toggleFavorite} />}
      {page === 'detail' && activeDestination && <DetailPage destination={activeDestination} profile={profile} onBack={() => go(profile ? 'explore' : 'home')} onFavorite={toggleFavorite} favorite={favorites.includes(activeDestination.id)} onShare={share} onExplore={() => go('explore')} />}
    </main>

    <footer className="site-footer">
      <div className="footer-main"><button className="brand footer-brand" onClick={() => go('home')}><span className="brand-mark"><Compass size={20}/></span><span><strong>性格之旅</strong><small>TRAVEL, YOUR WAY</small></span></button><p>认识自己，然后去看看世界。</p></div>
      <div className="footer-bottom"><span>© 2026 性格之旅 · 探索属于你的旅行方式</span><span>性格测试仅供娱乐与自我探索参考</span></div>
    </footer>
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
  </div>
}

function HomePage({ destinations, onStart, onExplore, onOpen, favorites, onFavorite }) {
  return <>
    <section className="hero">
      <div className="hero-photo"/>
      <div className="hero-content">
        <div className="eyebrow"><span className="eyebrow-dot"/> A JOURNEY THAT FEELS LIKE YOU</div>
        <h1>世界很大，<br/><em>去适合你的地方。</em></h1>
        <p>每个人都有自己的旅行节奏。用一场轻松的性格测试，找到与你契合的目的地、体验与旅程。</p>
        <div className="hero-actions"><button className="button-primary" onClick={onStart}>发现我的旅行人格 <ArrowRight size={18}/></button><button className="button-text light" onClick={onExplore}>探索目的地 <ArrowDown size={17}/></button></div>
        <div className="hero-proof"><div className="proof-avatars"><span>山</span><span>海</span><span>城</span></div><span>15 道轻量问题 · 约 2 分钟</span></div>
      </div>
      <div className="hero-caption"><span>01 / FIND YOUR WAY</span><span>山海之间，自有答案</span></div>
    </section>
    <section className="intro-strip">
      <div className="intro-title"><span className="section-kicker">TRAVEL PERSONALITY</span><h2>不只是去哪里，<br/>更是你如何感受世界。</h2></div>
      <div className="intro-copy"><p>喜欢热闹还是独处？偏爱计划周全，还是随心出发？了解自己的偏好，让每一次出发都更贴近内心。</p><button className="inline-link" onClick={onStart}>找到你的旅行风格 <ArrowRight size={16}/></button></div>
      <div className="intro-stat"><strong>15</strong><span>道轻量问题</span></div><div className="intro-stat"><strong>08</strong><span>个精选目的地</span></div>
    </section>
    <section className="destination-section section-pad">
      <div className="section-heading"><div><span className="section-kicker">CURATED FOR YOU</span><h2>灵感目的地</h2><p>从山野到海岸，发现下一段旅程的可能。</p></div><button className="inline-link" onClick={onExplore}>查看全部目的地 <ArrowRight size={16}/></button></div>
      <div className="destination-grid home-grid">{destinations.slice(0,4).map((d,i) => <DestinationCard key={d.id} destination={d} index={i} onOpen={onOpen} favorite={favorites.includes(d.id)} onFavorite={onFavorite}/>)}</div>
    </section>
    <section className="cta-band"><div className="cta-orbit"><Compass size={38}/></div><div><span className="section-kicker">YOUR NEXT CHAPTER</span><h2>下一段旅程，<em>从认识自己开始。</em></h2><p>没有标准答案，只有更适合你的选择。</p></div><button className="button-primary" onClick={onStart}>开始性格测试 <ArrowRight size={18}/></button></section>
  </>
}

function DestinationCard({ destination:d, index=0, onOpen, favorite, onFavorite }) {
  return <article className="destination-card">
    <button className="card-image-button" onClick={() => onOpen(d)} aria-label={`查看${d.name}详情`}><img src={d.image} alt={d.name} loading="lazy"/><span className="card-index">0{index+1}</span><span className="image-category">{d.category}</span></button>
    <button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={() => onFavorite(d.id)} aria-label={favorite ? '取消收藏' : '收藏目的地'}><Heart size={17} fill={favorite ? 'currentColor' : 'none'}/></button>
    <div className="card-body"><div className="card-location"><MapPin size={13}/>{d.region}</div><button className="card-title" onClick={() => onOpen(d)}>{d.name}<ArrowUpRightIcon/></button><p>{d.desc}</p><div className="card-tags">{d.tags.slice(0,3).map(t=><span key={t}>{t}</span>)}</div><div className="card-bottom"><span><Sparkles size={13}/> 匹配灵感</span><button onClick={() => onOpen(d)}>探索目的地 <ArrowRight size={15}/></button></div></div>
  </article>
}
function ArrowUpRightIcon(){ return <span className="up-right">↗</span> }

function ExplorePage({ destinations, profile, onOpen, favorites, onFavorite, onStart }) {
  const [filter,setFilter] = useState('全部')
  const categories = ['全部','自然探险','文化漫游','城市休闲','深度探索','人文静游','户外冒险','城市体验','慢旅行']
  const filtered = filter === '全部' ? destinations : destinations.filter(d => d.category === filter)
  return <section className="page-container">
    <div className="page-hero"><span className="section-kicker">THE WORLD IS YOURS</span><h1>目的地灵感<span className="serif-italic">，为你而来。</span></h1><p>{profile ? `根据「${profile.label}」的偏好，为你整理了一组旅行灵感。` : '从山川湖海到城市巷弄，挑选一处让你心动的地方。完成测试，还能获得更贴合你的推荐。'}</p>{!profile && <button className="button-primary" onClick={onStart}>先了解我的旅行人格 <ArrowRight size={17}/></button>}</div>
    <div className="filter-row">{categories.map(c=><button key={c} className={filter===c?'filter-chip selected':'filter-chip'} onClick={()=>setFilter(c)}>{c}</button>)}</div>
    {filtered.length ? <div className="destination-grid explore-grid">{filtered.map((d,i)=><DestinationCard key={d.id} destination={d} index={i} onOpen={onOpen} favorite={favorites.includes(d.id)} onFavorite={onFavorite}/>)}</div> : <div className="empty-state"><Compass size={34}/><p>这个分类暂时没有目的地，试试其他筛选。</p></div>}
  </section>
}

function ResultPage({ profile, destinations, onOpen, onRetest, onShare, onExplore, favorites, onFavorite }) {
  const Icon = profile.icon || Compass
  return <section className="result-page">
    <div className="result-top"><span className="section-kicker">YOUR PERSONALITY, DECODED</span><div className="result-check"><Check size={15}/> 测试完成</div></div>
    <div className="result-hero">
      <div className="result-copy"><span className="result-label">你的旅行人格是</span><h1>{profile.label}<span className="result-type">{profile.type}</span></h1><p>{profile.desc}</p><div className="keyword-row">{profile.keywords.map(k=><span key={k}># {k}</span>)}</div><div className="result-actions"><button className="button-primary" onClick={onExplore}>查看专属推荐 <ArrowRight size={17}/></button><button className="button-outline" onClick={onShare}><Share2 size={16}/> 分享结果</button></div></div>
      <div className="personality-art"><div className="art-circle circle-one"/><div className="art-circle circle-two"/><div className="art-icon"><Icon size={65} strokeWidth={1.1}/></div><span className="art-note note-one">GO YOUR OWN WAY</span><span className="art-note note-two">CURIOUS BY NATURE</span><span className="art-star star-one">✳</span><span className="art-star star-two">✦</span></div>
    </div>
    <div className="result-style"><div><span className="section-kicker">YOUR TRAVEL RHYTHM</span><h2>适合你的旅行方式</h2></div><div className="style-chips">{profile.styles.map((s,i)=><span key={s}><b>0{i+1}</b>{s}</span>)}</div></div>
    <section className="result-recommend"><div className="section-heading"><div><span className="section-kicker">MATCHED DESTINATIONS</span><h2>下一站，去这里</h2><p>根据你的偏好整理的旅行灵感。匹配仅供参考，真正的答案由你决定。</p></div></div><div className="destination-grid explore-grid">{destinations.map((d,i)=><DestinationCard key={d.id} destination={d} index={i} onOpen={onOpen} favorite={favorites.includes(d.id)} onFavorite={onFavorite}/>)}</div></section>
    <div className="result-footer-actions"><button className="button-outline" onClick={onRetest}><RotateCcw size={16}/> 重新测试</button><button className="inline-link" onClick={onShare}>分享我的旅行人格 <Share2 size={16}/></button></div>
  </section>
}

function DetailPage({ destination:d, profile, onBack, onFavorite, favorite, onShare, onExplore }) {
  const [tab,setTab] = useState('route')
  return <article className="detail-page">
    <div className="detail-nav"><button className="back-link" onClick={onBack}><ArrowLeft size={16}/> 返回</button><div><button className={`icon-action ${favorite?'active':''}`} onClick={()=>onFavorite(d.id)} aria-label="收藏"><Heart size={18} fill={favorite?'currentColor':'none'}/></button><button className="icon-action" onClick={onShare} aria-label="分享"><Share2 size={18}/></button></div></div>
    <div className="detail-cover"><img src={d.image} alt={d.name}/><div className="detail-cover-shade"/><div className="detail-cover-content"><span className="detail-category">{d.category}</span><h1>{d.name}</h1><p><MapPin size={16}/>{d.region}</p></div><span className="detail-cover-index">TRAVEL JOURNAL / 0{destinations.findIndex(x=>x.id===d.id)+1 || 1}</span></div>
    <div className="detail-content">
      <div className="detail-main"><p className="detail-lead">{d.desc}</p><div className="detail-facts"><div><Sun/><span>最佳季节</span><strong>{d.season}</strong></div><div><Wallet/><span>参考花费</span><strong>{d.cost}</strong></div><div><Clock3/><span>建议时长</span><strong>{d.days}</strong></div></div>
        <section className="detail-section"><span className="section-kicker">WHY YOU'LL LOVE IT</span><h2>为什么值得出发</h2><p>{profile ? `如果你是「${profile.label}」，这里的${d.tags.join('、')}体验，或许会与你对旅行的期待产生共鸣。` : '这里的自然景观、在地文化与多样体验，为不同旅行风格都留出了探索空间。'} {d.desc}</p><p>旅行没有唯一的正确方式。你可以按自己的节奏调整计划，也可以把偶遇和意外当成旅程的一部分。</p></section>
        <section className="detail-section"><span className="section-kicker">PLACES TO EXPLORE</span><h2>值得体验</h2><div className="attraction-list">{d.attractions.map((a,i)=><div key={a}><span>0{i+1}</span><strong>{a}</strong><ArrowRight size={16}/></div>)}</div></section>
        <section className="detail-section itinerary-section"><span className="section-kicker">A LITTLE ITINERARY</span><h2>旅行灵感</h2><div className="tab-row"><button className={tab==='route'?'selected':''} onClick={()=>setTab('route')}>三日路线</button><button className={tab==='food'?'selected':''} onClick={()=>setTab('food')}>当地风味</button><button className={tab==='tips'?'selected':''} onClick={()=>setTab('tips')}>出行建议</button></div>{tab==='route'&&<div className="route-list">{d.route.map((r,i)=><div key={r} className="route-item"><span className="route-day">0{i+1}</span><p>{r}</p></div>)}</div>}{tab==='food'&&<div className="detail-note"><span className="note-icon"><Waves/></span><div><strong>不妨尝尝当地特色</strong><p>{d.food}</p></div></div>}{tab==='tips'&&<div className="detail-note"><span className="note-icon"><Footprints/></span><div><strong>让旅程更从容</strong><p>{d.advice}</p></div></div>}</section>
      </div>
      <aside className="detail-aside"><div className="aside-card"><span className="section-kicker">YOUR TRAVEL NOTES</span><h3>把喜欢的地方，<br/>留给下一次出发。</h3><p>收藏目的地，慢慢规划自己的旅行清单。</p><button className={favorite?'button-outline full-width':'button-primary full-width'} onClick={()=>onFavorite(d.id)}><Heart size={16} fill={favorite?'currentColor':'none'}/>{favorite?'已收藏':'收藏这个目的地'}</button><button className="inline-link" onClick={onExplore}>继续探索其他目的地 <ArrowRight size={15}/></button></div><div className="aside-quote">“旅行不是为了抵达某处，而是重新看见世界。”</div></aside>
    </div>
  </article>
}

function FavoritesPage({ destinations, onOpen, onExplore, onFavorite }) {
  return <section className="page-container favorites-page"><div className="page-hero"><span className="section-kicker">YOUR LITTLE WISH LIST</span><h1>我的<span className="serif-italic">旅行收藏。</span></h1><p>把心动的目的地留在这里，等待合适的出发时机。</p></div>{destinations.length ? <><div className="favorites-count">已收藏 <strong>{destinations.length}</strong> 个目的地</div><div className="destination-grid explore-grid">{destinations.map((d,i)=><DestinationCard key={d.id} destination={d} index={i} onOpen={onOpen} favorite onFavorite={onFavorite}/>)}</div></> : <div className="empty-state"><span className="empty-heart"><Heart size={28}/></span><h2>你的旅行清单还是空的</h2><p>遇见喜欢的地方，就把它收藏起来吧。</p><button className="button-primary" onClick={onExplore}>发现目的地 <ArrowRight size={17}/></button></div>}</section>
}

createRoot(document.getElementById('root')).render(<App />)
