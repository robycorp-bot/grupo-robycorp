import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/hanken-grotesk/latin-400.css'
import '@fontsource/hanken-grotesk/latin-500.css'
import '@fontsource/hanken-grotesk/latin-700.css'
import '@fontsource/chakra-petch/latin-600.css'
import portrait from './assets/images/icone.png'
import emblem from './assets/images/logo.png'
import googleBusinessImage from './assets/price/robinho-dev-google-meu-negocio.png'
import adsWebsiteImage from './assets/price/robinho-dev-site-campanha-ads.png'
import organicWebsiteImage from './assets/price/robinho-dev-site-organico.png'
import socialMediaImage from './assets/price/robinho-dev-gestao-midias-sociais.png'
import './styles.css'

const phone = '5517997725254'
const wa = text => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
const whatsapp = wa('Olá! Quero conversar sobre um projeto.')
const instagram = 'https://www.instagram.com/lucasfarias.sph?igsh=Zmc1Y3hsbXpvbHh3'

function Icon({ name = 'arrow', size = 20 }) {
  const paths = {
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
    external: <><path d="M5 19 19 5M5 5h14v14" /></>,
    menu: <path d="M4 8h16M4 16h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    check: <path d="m5 12 4 4L19 6" />,
    code: <path d="m7 7-5 5 5 5m10-10 5 5-5 5M14 4l-4 16" />,
    flow: <><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M6 9v9h9M15 6h6m-3-3v6" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    message: <path d="M21 11.5a9 9 0 0 1-9 8.5 10 10 0 0 1-4-.9L3 21l1.5-5a8 8 0 1 1 16.5-4.5Z" />,
    plus: <path d="M12 5v14M5 12h14" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

/* Marca real: retrato + letreiro no mesmo desenho angular do logo. */
function Brand() {
  return <><img className="brand-avatar" src={portrait} alt="" width="36" height="36" /><span className="brand-word">robinho<span className="brand-suffix">.dev</span></span></>
}

/* Chuva de bits em azul: o fundo vivo do site.
   Acelera com a velocidade do scroll, acende perto do cursor,
   pausa com a aba oculta e fica parada para quem pede menos movimento. */
function BitRain() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const glyphs = '0101010110100110{}<>/=+;01'
    const size = 15
    let w = 0, h = 0, cols = [], frame = 0, last = 0, energy = 0, lastY = scrollY
    const pointer = { x: -999, y: -999 }
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5)
      w = innerWidth; h = innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const gap = w < 700 ? 26 : 22
      cols = Array.from({ length: Math.ceil(w / gap) }, (_, i) => ({
        x: i * gap + Math.random() * 6,
        y: Math.random() * h * 1.4 - h * .4,
        speed: .5 + Math.random() * 1.4,
        len: 6 + Math.floor(Math.random() * 18),
        depth: .35 + Math.random() * .65,
        seed: Math.floor(Math.random() * 999),
      }))
      draw(0)
    }
    const draw = delta => {
      ctx.clearRect(0, 0, w, h)
      ctx.font = `${size - 2}px ui-monospace, Consolas, monospace`
      for (const c of cols) {
        c.y += delta * .06 * c.speed * (1 + energy * .09)
        if (c.y - c.len * size > h) { c.y = -Math.random() * h * .3; c.len = 6 + Math.floor(Math.random() * 18) }
        for (let j = 0; j < c.len; j++) {
          const y = c.y - j * size
          if (y < -size || y > h + size) continue
          const near = Math.max(0, 1 - Math.hypot(c.x - pointer.x, y - pointer.y) / 160)
          const fade = 1 - j / c.len
          const a = j === 0 ? .85 : fade * .32 * c.depth + near * .45
          ctx.fillStyle = j === 0 ? `rgba(214, 242, 255, ${a})` : `rgba(64, 170, 255, ${a})`
          ctx.fillText(glyphs[(c.seed + j * 7 + Math.floor(c.y / size)) % glyphs.length], c.x, y)
        }
      }
    }
    const tick = now => {
      frame = requestAnimationFrame(tick)
      const delta = Math.min(now - last, 50); last = now
      const dy = Math.abs(scrollY - lastY); lastY = scrollY
      energy = energy * .9 + Math.min(dy, 80) * .1
      draw(delta)
    }
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; last = performance.now()
      if (!reduced.matches && !document.hidden) frame = requestAnimationFrame(tick)
      else draw(0)
    }
    const move = e => { pointer.x = e.clientX; pointer.y = e.clientY }
    resize(); sync()
    addEventListener('resize', resize); addEventListener('pointermove', move, { passive: true })
    document.addEventListener('visibilitychange', sync); reduced.addEventListener('change', sync)
    return () => { cancelAnimationFrame(frame); removeEventListener('resize', resize); removeEventListener('pointermove', move); document.removeEventListener('visibilitychange', sync); reduced.removeEventListener('change', sync) }
  }, [])
  return <canvas ref={ref} className="bit-rain" aria-hidden="true" />
}

/* Selo (印章): a assinatura da marca, entalhada e carimbada. */
function Seal({ size = 72, className = '' }) {
  return <svg className={`seal ${className}`} width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Selo robinho.dev">
    <defs>
      <filter id="seal-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="7" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.55" result="mask" />
        <feComposite in="SourceGraphic" in2="mask" operator="in" />
      </filter>
    </defs>
    <g filter="url(#seal-grain)">
      <rect x="4" y="4" width="92" height="92" rx="7" className="seal-ink" />
      <rect x="11" y="11" width="78" height="78" rx="3" className="seal-cut" />
      <line x1="15" y1="50" x2="85" y2="50" className="seal-cut" />
      <text x="30.5" y="42" className="seal-glyph">RO</text>
      <text x="69.5" y="42" className="seal-glyph">BI</text>
      <text x="30.5" y="76" className="seal-glyph">NH</text>
      <text x="69.5" y="76" className="seal-glyph">O.</text>
    </g>
  </svg>
}

/* Trilho vertical, como as colunas de título dos cartazes chineses. */
function Rail({ n, label }) {
  return <div className="rail" aria-hidden="true"><span className="rail-n">{String(n).padStart(2, '0')}</span><i /><span className="rail-text">{label}</span></div>
}

/* Símbolo genérico usado só dentro da demonstração de "site do cliente". */
function Mark() {
  return <span className="brand-symbol" aria-hidden="true"><i /><i /></span>
}

/* Reveal once: settled content stays readable when scrolling back. */
function useMotion() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const elements = [...document.querySelectorAll('[data-reveal]')]
    const stages = [...document.querySelectorAll('[data-stage]')]
    const inks = [...document.querySelectorAll('[data-ink]')]
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target,isIntersecting}) => {
        if (isIntersecting) { target.classList.add('is-visible'); observer.unobserve(target) }
      })
    }, { threshold: .08, rootMargin: '0px 0px -32px 0px' })
    elements.forEach(el => observer.observe(el))
    document.documentElement.classList.add('motion-ready')
    let frame = 0
    const update = () => {
      frame = 0
      // Performance optimization: Batch DOM layout reads before DOM style writes to eliminate forced synchronous layout (layout thrashing) on every scroll frame.
      const height = document.documentElement.scrollHeight - innerHeight
      const scrollRatio = height > 0 ? scrollY / height : 0

      // Batch 1: READ - Query element geometries in a single pass
      const stageProgress = stages.map(el => {
        const top = el.getBoundingClientRect().top
        const p = reduced.matches ? 1 : Math.min(1, Math.max(0, (innerHeight - top) / (innerHeight * .78)))
        return p.toFixed(3)
      })

      const inkProgress = inks.map(el => {
        const top = el.getBoundingClientRect().top
        const p = reduced.matches ? 1 : Math.min(1, Math.max(0, (innerHeight * 1.02 - top) / (innerHeight * .62)))
        return p.toFixed(3)
      })

      // Batch 2: WRITE - Apply computed CSS custom properties after all reads complete
      document.documentElement.style.setProperty('--scroll', scrollRatio)
      stages.forEach((el, i) => {
        el.style.setProperty('--stage', stageProgress[i])
      })
      /* Painéis de tinta: a pincelada atravessa da esquerda para a direita ao entrar na tela */
      inks.forEach((el, i) => {
        el.style.setProperty('--ink', inkProgress[i])
      })
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(update) }
    const preference = () => {
      if (reduced.matches) elements.forEach(el => el.classList.add('is-visible'))
      request()
    }
    preference()
    addEventListener('scroll',request,{passive:true})
    addEventListener('resize',request)
    reduced.addEventListener('change',preference)
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame)
      removeEventListener('scroll',request); removeEventListener('resize',request)
      reduced.removeEventListener('change',preference)
      document.documentElement.classList.remove('motion-ready')
    }
  },[])
}

const previewViews = ['Site', 'Automação', 'Sistema']

function ProductScene() {
  const [view,setView] = useState(0)
  const ref = useRef(null)
  const move = e => {
    if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    ref.current.style.setProperty('--rx', `${(e.clientY-r.top-r.height/2)/r.height*-5}deg`)
    ref.current.style.setProperty('--ry', `${(e.clientX-r.left-r.width/2)/r.width*6}deg`)
  }
  const reset = () => { ref.current.style.setProperty('--rx','0deg'); ref.current.style.setProperty('--ry','0deg') }
  return <div className="product-scene" ref={ref} onPointerMove={move} onPointerLeave={reset}>
    <div className="scene-grid" aria-hidden="true" />
    <div className="scene-orbit" aria-hidden="true" />
    <div className="scene-topline"><span className="mono">Da ideia à interface</span><span className="scene-cross" aria-hidden="true">+</span></div>
    <div className="scene-assembly">
      <div className="browser-panel">
        <div className="browser-bar"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span>seu próximo projeto</span><Icon name="external" size={12} /></div>
        <div className="browser-screen" key={view}>
          {view === 0 ? <>
            <div className="demo-nav"><span><Mark /> sua marca</span><span>Sobre <i /> Contato</span></div>
            <div className="demo-website"><div><span className="demo-label">FEITO PARA O SEU NEGÓCIO</span><p>Uma presença<br />à altura da<br /><em>sua marca.</em></p><span className="demo-button">Conheça <Icon size={12} /></span></div><div className="demo-sculpture" aria-hidden="true"><i /><i /><i /></div></div>
            <div className="demo-footer"><span>Estratégia</span><span>Design</span><span>Desenvolvimento</span></div>
          </> : view === 1 ? <div className="demo-flow"><span className="demo-label">ROTINA CONECTADA</span><p>Uma entrada.<br />Tudo em movimento.</p>{['Formulário recebido','Dados organizados no CRM','Equipe notificada'].map((item,i)=><div className="demo-task" key={item}><span>0{i+1}</span>{item}<Icon name="check" size={14} /></div>)}</div> : <div className="demo-system"><div className="demo-nav"><strong>Visão da operação</strong><Icon name="grid" size={16} /></div><p>Informação organizada.<br />Decisões mais claras.</p><div className="demo-table"><span>ATIVIDADE</span><span>ETAPA</span>{['Solicitação recebida','Conferência dos dados','Encaminhamento'].map((item,i)=><div key={item}><span>{item}</span><i>{['Entrada','Em análise','Concluído'][i]}</i></div>)}</div></div>}
        </div>
      </div>
      <div className="scene-chip chip-design"><span className="chip-icon"><Icon name="grid" size={17} /></span><div><small>UMA EXPERIÊNCIA</small><strong>Design + código</strong></div><span className="chip-dot" /></div>
      <div className="scene-chip chip-flow"><div className="chip-flow-head"><Icon name="flow" size={18} /><span>Conexões que funcionam</span><Icon name="check" size={14} /></div><div className="chip-route"><span>Site</span><i /><span>Sistema</span><i /><span>Equipe</span></div><div className="chip-progress"><span /></div></div>
      <div className="scene-module module-one" aria-hidden="true">01<span>Interface</span></div>
      <div className="scene-module module-two" aria-hidden="true">02<span>Integração</span></div>
    </div>
    <div className="scene-controls" role="group" aria-label="Explorar demonstração">{previewViews.map((label,i)=><button type="button" key={label} aria-pressed={view===i} onClick={()=>setView(i)}>{label}<span>0{i+1}</span></button>)}</div>
    <p className="scene-caption">Demonstração visual de soluções. Seu projeto tem identidade própria.</p>
  </div>
}

const services = [
  {title:'Sites & experiências',text:'Do primeiro contato à conversão: estrutura, interface e desenvolvimento pensados juntos.',tags:['Sites institucionais','Landing pages','Aplicações web'],icon:'code'},
  {title:'Sistemas & automações',text:'Integrações que organizam informações e reduzem as tarefas manuais da operação.',tags:['Sistemas sob medida','Integrações','Fluxos automáticos'],icon:'flow'},
  {title:'Presença & performance',text:'Uma estratégia para conectar sua marca às pessoas certas e acompanhar o que funciona.',tags:['Google & Meta Ads','SEO','Conteúdo'],icon:'external'},
]

const flows = [
  {label:'Atendimento',input:'Nova solicitação',action:'Organizar e direcionar',output:'Equipe notificada',description:'Centralize as informações que chegam e encaminhe cada solicitação para a próxima etapa.'},
  {label:'Operação',input:'Dados recebidos',action:'Conectar os sistemas',output:'Informação organizada',description:'Conecte as ferramentas da empresa para evitar a mesma informação sendo digitada várias vezes.'},
  {label:'Conteúdo',input:'Publicação aprovada',action:'Preparar a distribuição',output:'Conteúdo agendado',description:'Organize a passagem entre aprovação e publicação em um fluxo claro para a equipe.'},
]

function Automation() {
  const [selected,setSelected] = useState(0)
  const flow = flows[selected]
  return <section className="automation section-space" id="automacoes" data-ink>
    <div className="wrap">
      <Rail n={2} label="Conexões" />
      <div className="section-heading" data-reveal><p className="eyebrow">02 / Conexões</p><h2>O trabalho flui.<br /><span>Você avança.</span></h2><p>Ferramentas conversando entre si.<br />Menos tarefas repetidas no seu dia.</p></div>
      <div className="automation-shell" data-stage>
        <div className="automation-sidebar"><span className="mono">Explore um fluxo</span><div className="flow-switch" role="group" aria-label="Exemplo de automação">{flows.map((f,i)=><button key={f.label} type="button" aria-pressed={i===selected} onClick={()=>setSelected(i)}><span>0{i+1}</span>{f.label}<Icon size={16} /></button>)}</div><p>{flow.description}</p><a href={wa('Olá! Quero conversar sobre automações para o meu negócio.')} className="text-link" target="_blank" rel="noreferrer">Planejar uma automação <Icon name="external" size={17} /></a></div>
        <div className="automation-canvas">
          <div className="canvas-heading"><span><i /> Fluxo conectado</span><span className="mono">Exemplo ilustrativo</span></div>
          <div className="flow-route" key={selected} aria-live="polite" aria-atomic="true">
            {[['Entrada',flow.input,'message'],['Processamento',flow.action,'flow'],['Saída',flow.output,'check']].map(([label,text,icon],i)=><div className="flow-step-wrap" key={label}>{i>0&&<div className="flow-wire" aria-hidden="true"><i /></div>}<div className={`flow-node node-${i}`} style={{'--i':i}}><span className="node-icon"><Icon name={icon} /></span><small>{label}</small><strong>{text}</strong><span className="node-port" aria-hidden="true" /></div></div>)}
          </div>
          <div className="canvas-bottom"><Icon name="code" size={14} /><span>Integração desenhada para a sua rotina.</span><span className="signal-bars" aria-hidden="true"><i /><i /><i /><i /></span></div>
        </div>
      </div>
    </div>
  </section>
}

const offers = [
  {
    image: googleBusinessImage,
    category: 'Presença local',
    title: 'Google Meu Negócio',
    message: 'Olá! Tenho interesse na Gestão de Perfil do Google Meu Negócio com o robinho.dev.',
    benefits: ['Otimização completa e configuração estratégica do seu perfil', 'Monitoramento e resposta às avaliações dos clientes', 'Postagens e atualizações frequentes', 'Mais visibilidade e credibilidade nas buscas locais'],
    prices: [['Valor inicial', 'R$ 700'], ['Manutenção mensal', 'R$ 150']],
  },
  {
    image: adsWebsiteImage,
    category: 'Performance e conversão',
    title: 'Site + Campanha Ads',
    message: 'Olá! Tenho interesse no pacote Site + Campanha Ads do robinho.dev.',
    benefits: ['Criação de site profissional e otimizado', 'Configuração e gestão de campanhas no Google e Meta Ads', 'Segmentação estratégica e otimização contínua', 'Investimento diário em anúncios combinado no fechamento'],
    prices: [['Valor inicial', 'R$ 1.350'], ['Manutenção mensal', 'R$ 200']],
  },
  {
    image: organicWebsiteImage,
    category: 'Crescimento sustentável',
    title: 'Site Orgânico',
    message: 'Olá! Tenho interesse no projeto de Site Orgânico do robinho.dev.',
    benefits: ['Estratégia de SEO focada em resultado orgânico', 'Trabalho gradual, com resultados de médio a longo prazo', 'Acompanhamento próximo e direto, sem intermediários', 'Parceria até o site ficar totalmente indexado'],
    prices: [['Valor inicial', 'R$ 750'], ['Valor mensal', 'R$ 750']],
  },
  {
    image: socialMediaImage,
    category: 'Instagram, TikTok, Facebook e Kwai',
    title: 'Gestão de Mídias Sociais',
    message: 'Olá! Tenho interesse no pacote de Gestão de Mídias Sociais do robinho.dev.',
    benefits: ['Edição de vídeos, imagens e banners', 'Postagem diária em todas as redes', 'Atendimento 24h, com máxima agilidade', 'Nenhuma demanda do dia fica para o dia seguinte'],
    prices: [['Pacote mensal', 'R$ 2.000']],
  },
]


const steps = [
  ['Contexto','Entendo seu negócio, o problema e o que precisa mudar.'],
  ['Direção','Definimos escopo, prioridades e o caminho da solução.'],
  ['Construção','Design e desenvolvimento com acompanhamento das etapas.'],
  ['Evolução','Ajustes, orientação e próximos passos após a entrega.'],
]

/* ---------------------------------------------------------------------------
   Trilha de fundo. O arquivo fica em public/audio/trilha.mp3 (você coloca
   um áudio que tenha licença para usar). Sem o arquivo, nada de som aparece.
--------------------------------------------------------------------------- */
const trackUrl = `${import.meta.env.BASE_URL}audio/trilha.mp3`

function useSoundtrack() {
  const audio = useRef(null)
  const [available, setAvailable] = useState(false)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    let alive = true
    fetch(trackUrl, { method: 'HEAD' })
      .then(r => { if (alive && r.ok && (r.headers.get('content-type') || '').startsWith('audio')) setAvailable(true) })
      .catch(() => {})
    return () => { alive = false; audio.current?.pause() }
  }, [])
  const fadeTo = (target, ms = 1800) => {
    const el = audio.current; if (!el) return
    const start = el.volume, t0 = performance.now()
    const step = now => {
      const k = Math.min(1, (now - t0) / ms)
      el.volume = start + (target - start) * k
      if (k < 1) requestAnimationFrame(step); else if (target === 0) el.pause()
    }
    requestAnimationFrame(step)
  }
  const play = () => {
    if (!available) return
    if (!audio.current) { audio.current = new Audio(trackUrl); audio.current.loop = true; audio.current.volume = 0 }
    audio.current.play().then(() => { setPlaying(true); fadeTo(.35) }).catch(() => setPlaying(false))
    try { localStorage.setItem('rd-sound', 'on') } catch { /* sem armazenamento */ }
  }
  const stop = () => {
    fadeTo(0, 700); setPlaying(false)
    try { localStorage.setItem('rd-sound', 'off') } catch { /* sem armazenamento */ }
  }
  return { available, playing, play, stop, toggle: () => (playing ? stop() : play()) }
}

function SoundToggle({ sound }) {
  if (!sound.available) return null
  return <button type="button" className={`sound-toggle${sound.playing ? ' is-on' : ''}`} aria-pressed={sound.playing} onClick={sound.toggle}>
    <span className="sound-bars" aria-hidden="true"><i /><i /><i /><i /></span>
    {sound.playing ? 'Trilha ligada' : 'Ligar trilha'}
  </button>
}

/* ---------------------------------------------------------------------------
   Loader: os bits caem, o nome é decifrado, a pincelada pinta, o selo bate
   e a tela se abre em dois painéis de tinta. Uma vez por sessão.
--------------------------------------------------------------------------- */
const loaderWord = 'robinho.dev'
const scramble = '01<>/{}=+*#$%&01'

function Loader({ sound, onEnter }) {
  const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  const [text, setText] = useState(reduced ? loaderWord : loaderWord.replace(/./g, '0'))
  const [phase, setPhase] = useState(reduced ? 4 : 0) // 0 chuva · 1 decifra · 2 pincel · 3 selo · 4 escolha · 5 saindo
  const firstButton = useRef(null)
  useEffect(() => {
    if (reduced) return
    const timers = []
    const at = (ms, fn) => timers.push(setTimeout(fn, ms))
    at(500, () => setPhase(1))
    let frame = 0
    const decode = setInterval(() => {
      frame++
      setText(loaderWord.split('').map((ch, i) => (frame > 6 + i * 2.2 ? ch : scramble[(frame * 7 + i * 13) % scramble.length])).join(''))
      if (frame > 6 + loaderWord.length * 2.2) clearInterval(decode)
    }, 45)
    timers.push(decode)
    at(1500, () => setPhase(2))
    at(2150, () => setPhase(3))
    at(2750, () => setPhase(4))
    return () => timers.forEach(t => { clearTimeout(t); clearInterval(t) })
  }, [reduced])
  useEffect(() => { if (phase === 4) firstButton.current?.focus({ preventScroll: true }) }, [phase])
  const enter = withSound => {
    if (withSound) sound.play()
    setPhase(5)
    setTimeout(onEnter, reduced ? 0 : 1100)
  }
  useEffect(() => {
    const key = e => { if (e.key === 'Escape') enter(false) }
    addEventListener('keydown', key)
    return () => removeEventListener('keydown', key)
  })
  return <div className={`loader phase-${phase}`} role="dialog" aria-modal="true" aria-label="Abertura do robinho.dev">
    <div className="loader-panel loader-left" aria-hidden="true" />
    <div className="loader-panel loader-right" aria-hidden="true" />
    <div className="loader-rain" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <span key={i} style={{ '--i': i, '--d': `${(i * 37) % 11 / 10}s`, '--s': `${1.4 + (i * 13 % 7) / 5}s` }}>{(i % 3 ? '10110010' : '0110{1}0')}</span>)}</div>
    <div className="loader-stage">
      <div className="loader-stroke" aria-hidden="true" />
      <p className="loader-word" aria-label={loaderWord}><span aria-hidden="true">{text.slice(0, 7)}</span><em aria-hidden="true">{text.slice(7)}</em></p>
      <p className="loader-tag">Estratégia <i /> Código <i /> Propósito</p>
      <div className="loader-seal" aria-hidden="true"><Seal size={92} /><span className="seal-ring" /></div>
    </div>
    <div className="loader-choice">
      {sound.available
        ? <><button ref={firstButton} type="button" className="btn btn-primary" onClick={() => enter(true)}>Entrar com trilha <Icon name="external" size={17} /></button>
            <button type="button" className="loader-silent" onClick={() => enter(false)}>Entrar em silêncio</button></>
        : <button ref={firstButton} type="button" className="btn btn-primary" onClick={() => enter(false)}>Entrar <Icon name="external" size={17} /></button>}
    </div>
  </div>
}

function App() {
  const [menuOpen,setMenuOpen] = useState(false)
  const [scrolled,setScrolled] = useState(false)
  const menuRef = useRef(null)
  const menuButton = useRef(null)
  useMotion()
  const sound = useSoundtrack()
  const [loading, setLoading] = useState(() => { try { return !sessionStorage.getItem('rd-loader') } catch { return true } })
  const finishLoader = () => { try { sessionStorage.setItem('rd-loader', '1') } catch { /* sem armazenamento */ } setLoading(false) }
  useEffect(() => { document.body.classList.toggle('is-loading', loading) }, [loading])
  useEffect(()=>{
    const scroll = ()=>setScrolled(scrollY>20)
    scroll(); addEventListener('scroll',scroll,{passive:true})
    return ()=>removeEventListener('scroll',scroll)
  },[])
  useEffect(()=>{
    document.body.classList.toggle('menu-open',menuOpen)
    const key = e=>{
      if(e.key==='Escape'&&menuOpen){setMenuOpen(false);menuButton.current?.focus()}
      if(e.key==='Tab'&&menuOpen){
        const links=[...menuRef.current.querySelectorAll('a')]
        if(e.shiftKey&&document.activeElement===menuButton.current){e.preventDefault();links.at(-1).focus()}
        else if(!e.shiftKey&&document.activeElement===links.at(-1)){e.preventDefault();menuButton.current.focus()}
      }
    }
    if(menuOpen) menuRef.current.querySelector('a')?.focus()
    const media=matchMedia('(max-width: 820px)')
    const resize=e=>{if(!e.matches)setMenuOpen(false)}
    media.addEventListener('change',resize); addEventListener('keydown',key)
    return ()=>{document.body.classList.remove('menu-open');removeEventListener('keydown',key);media.removeEventListener('change',resize)}
  },[menuOpen])
  const closeMenu=()=>setMenuOpen(false)
  return <>
    <BitRain />
    {loading && <Loader sound={sound} onEnter={finishLoader} />}
    <SoundToggle sound={sound} />
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <header className={`site-header${scrolled?' is-scrolled':''}${menuOpen?' is-open':''}`}>
      <a href="#inicio" className="brand" aria-label="robinho.dev, início" onClick={closeMenu}><Brand /></a>
      <button ref={menuButton} className="menu-toggle" type="button" aria-label={menuOpen?'Fechar menu':'Abrir menu'} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={()=>setMenuOpen(!menuOpen)}><Icon name={menuOpen?'close':'menu'} /></button>
      <nav ref={menuRef} className="site-nav" id="site-navigation" aria-label="Navegação principal"><a href="#solucoes" onClick={closeMenu}>Soluções</a><a href="#automacoes" onClick={closeMenu}>Automações</a><a href="#planos" onClick={closeMenu}>Investimento</a><a href="#sobre" onClick={closeMenu}>Sobre</a><a href={whatsapp} className="nav-cta" target="_blank" rel="noreferrer" onClick={closeMenu}>Conversar sobre um projeto <Icon name="external" size={15} /></a></nav>
    </header>
    <main id="conteudo" tabIndex="-1" inert={menuOpen?true:undefined}>
      <section className="hero" id="inicio">
        <p className="hero-vertical" aria-hidden="true"><span>Estratégia</span><i /><span>Código</span><i /><span>Propósito</span></p>
        <div className="hero-layout wrap">
          <div className="hero-copy">
            <p className="eyebrow hero-entry"><span className="status-dot" /> Estratégia, design & desenvolvimento</p>
            <h1><span className="title-mask"><span>Digital.</span></span><span className="title-mask"><span>Bem resolvido<span className="title-period">.</span></span></span></h1>
            <p className="hero-lead hero-entry">Sites que posicionam sua marca.<br />Sistemas que simplificam sua operação.<br />Do planejamento à entrega, direto comigo.</p>
            <div className="hero-actions hero-entry"><a className="btn btn-primary" href={whatsapp} target="_blank" rel="noreferrer">Vamos falar do seu projeto <Icon name="external" size={19} /></a><a className="text-link" href="#solucoes">Conheça as soluções <Icon size={17} /></a></div>
            <div className="hero-note hero-entry"><img src={portrait} alt="" width="40" height="40" /><span><strong>Robinho</strong>Desenvolvedor e estrategista digital</span><Seal size={46} className="hero-seal" /></div>
          </div>
          <ProductScene />
        </div>
        <div className="hero-bottom wrap"><span className="mono">Independente na criação. Próximo na execução.</span><a href="#solucoes">Explore o que vem a seguir <span>↓</span></a><span className="mono hero-bottom-index">01 — 05</span></div>
      </section>

      <div className="capability-band" role="note" aria-label="Da estratégia à entrega: design, desenvolvimento, integrações, performance, SEO, automações, Google Meu Negócio e mídias sociais">
        <div className="ticker" aria-hidden="true">{[0,1].map(k=><p key={k}>{['Design','Desenvolvimento','Integrações','Performance','SEO','Automações','Google Meu Negócio','Mídias sociais','Sistemas sob medida','Landing pages'].map(t=><span key={t}>{t}<i>◆</i></span>)}</p>)}</div>
      </div>

      <section className="services section-space wrap" id="solucoes">
        <Rail n={1} label="Soluções" />
        <div className="section-heading" data-reveal><p className="eyebrow">01 / O que eu resolvo</p><h2>Uma visão completa.<br /><span>Cada detalhe conectado.</span></h2><p>Sua presença digital e sua operação precisam funcionar juntas. Eu conecto as duas.</p></div>
        <div className="service-list">{services.map((service,i)=><article className="service-row" key={service.title} data-reveal style={{'--delay':`${i*65}ms`}}><span className="service-index">0{i+1}</span><div className="service-title"><Icon name={service.icon} size={27} /><h3>{service.title}</h3></div><div className="service-body"><p>{service.text}</p><ul className="tags">{service.tags.map(tag=><li key={tag}>{tag}</li>)}</ul></div><a className="round-link" href={wa(`Olá! Quero conversar sobre ${service.title.toLowerCase()}.`)} target="_blank" rel="noreferrer" aria-label={`Conversar sobre ${service.title}`}><Icon name="external" /></a></article>)}</div>
      </section>

      <Automation />

      <section className="method section-space wrap" id="metodo">
        <Rail n={3} label="Processo" />
        <div className="method-intro" data-reveal><p className="eyebrow">03 / Como acontece</p><h2>Clareza em<br /><span>cada etapa.</span></h2><p>Você sabe o que estamos construindo,<br />por que estamos construindo e o que vem depois.</p></div>
        <div className="process-grid" data-stage>{steps.map(([title,text],i)=><article className="process-card" key={title} style={{'--i':i}}><div className="process-top"><span>0{i+1}</span><Icon name={i===3?'check':'plus'} size={18} /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="offers section-space" id="planos" data-ink><div className="wrap">
        <Rail n={4} label="Investimento" />
        <div className="section-heading" data-reveal><p className="eyebrow">04 / Investimento</p><h2>O próximo passo.<br /><span>Com valores claros.</span></h2><p>Quatro pontos de partida para a sua presença digital. Sistemas e automações recebem uma proposta sob medida.</p></div>
        <div className="offer-grid">{offers.map((offer,i)=><article className="offer-card" key={offer.title} id={`plano-${i+1}`} data-reveal style={{'--delay':`${i%2*80}ms`}}><div className="offer-heading"><span className="mono">0{i+1} / {offer.category}</span><Seal size={52} className="stamp" /></div><h3>{offer.title}</h3><dl className="offer-prices">{offer.prices.map(([label,price])=><div key={label}><dt>{label}</dt><dd>{price}</dd></div>)}</dl><ul className="offer-benefits">{offer.benefits.map(benefit=><li key={benefit}><Icon name="check" size={15} /><span>{benefit}</span></li>)}</ul><a className="btn offer-cta" href={wa(offer.message)} target="_blank" rel="noreferrer">Conversar sobre este plano <Icon size={17} /></a><a className="offer-material" href={offer.image} target="_blank" rel="noreferrer">Ver apresentação do serviço <Icon name="external" size={12} /></a></article>)}</div>
      </div></section>

      <section className="about section-space wrap" id="sobre">
        <Rail n={5} label="Quem entrega" />
        <div className="about-heading" data-reveal><p className="eyebrow">05 / Quem entrega</p><h2>Você fala com<br /><span>quem constrói.</span></h2><figure className="about-emblem"><img src={emblem} alt="Emblema robinho.dev: retrato do Robinho no anel rúnico, com o lema estratégia, código e propósito" loading="lazy" width="1254" height="1254" /></figure></div>
        <div className="about-body" data-reveal><div className="person-name"><img className="person-photo" src={portrait} alt="Retrato ilustrado do Robinho" loading="lazy" width="56" height="56" /><div><h3>Robinho</h3><p>Desenvolvimento & estratégia digital</p></div><span className="person-mark">↗</span></div><p>Sou o desenvolvedor por trás do robinho.dev. Trabalho com empresas que precisam de uma presença digital bem construída e de ferramentas que facilitem a operação.</p><p>Participo do projeto do início ao fim: entendo o contexto, proponho o caminho e desenvolvo a solução. Contato direto, decisões explicadas e atenção aos detalhes.</p><ul className="about-values"><li><Icon name="check" size={15} />Contato direto</li><li><Icon name="check" size={15} />Escopo definido</li><li><Icon name="check" size={15} />Acompanhamento próximo</li></ul></div>
      </section>

      <section className="contact" id="contato" data-ink><div className="wrap">
        <p className="eyebrow" data-reveal>O próximo projeto pode ser o seu.</p>
        <a className="contact-link" href={whatsapp} target="_blank" rel="noreferrer" data-reveal><h2>Vamos construir<br /><span>o que vem depois.</span></h2><span className="contact-arrow"><Icon name="external" size={48} /></span></a>
        <span className="contact-seal" data-reveal><Seal size={120} className="stamp" /></span>
        <div className="contact-details"><p>Conte seu desafio. Vamos definir o próximo passo.</p><a href="tel:+5517997725254">+55 (17) 99772-5254</a><a href={instagram} target="_blank" rel="noreferrer">Instagram <Icon name="external" size={14} /></a></div>
      </div></section>
    </main>
    <footer className="site-footer wrap" inert={menuOpen?true:undefined}><a className="brand" href="#inicio"><Brand /></a><span>© {new Date().getFullYear()} · Estratégia, código e propósito.</span><a href="#inicio" className="footer-top">Voltar ao topo <span>↑</span></a></footer>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
