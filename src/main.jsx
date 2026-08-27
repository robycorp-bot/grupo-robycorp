import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import brandLogo from './assets/images/logo.png'
import brandIcon from './assets/images/icone.png'
import banner from './assets/images/banner.png'
import mascot from './assets/images/mascote.png'
import phoneImage from './assets/images/celular.png'
import './styles.css'

const phone = '5517997725254'
const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent('Olá! Quero conversar sobre um projeto.')}`

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>, menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>, close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    code: <><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" /></>, chart: <><path d="M4 19V5M4 19h16" /><path d="m7 15 4-4 3 2 5-6" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2" /></>, message: <path d="M20 11.5a8.3 8.3 0 0 1-9 8.2 8.5 8.5 0 0 1-3.8-1.2L3 20l1.4-4A8.3 8.3 0 1 1 20 11.5Z" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('shown')), { threshold: .12 })
    document.querySelectorAll('.reveal').forEach(element => reveal.observe(element))
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => { reveal.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])
  const close = () => setMenuOpen(false)
  const services = [['code', 'Tecnologia & Web', 'Sites rápidos, experiências que convertem e soluções pensadas para evoluir com o seu negócio.'], ['chart', 'Tráfego Pago', 'Campanhas inteligentes, leitura de dados e decisões focadas no que realmente importa: retorno.'], ['target', 'Consultoria Digital', 'Clareza para suas próximas decisões. Diagnóstico, estratégia e um plano que faz sentido.']]
  return <>
    <header className={scrolled ? 'header header-scrolled' : 'header'}>
      <a className="brand" href="#inicio" onClick={close}><img src={brandIcon} alt="" /><span>usuario.<b>senior</b></span></a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}><a onClick={close} href="#sobre">Sobre</a><a onClick={close} href="#solucoes">Soluções</a><a onClick={close} href="#essencia">Essência</a><a className="nav-contact" onClick={close} href="#contato">Vamos conversar <Icon name="arrow" size={16} /></a></nav>
      <button className="menu" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
    </header>
    <main>
      <section className="hero" id="inicio"><img className="hero-banner" src={banner} alt="" /><div className="hero-overlay" /><div className="grid-lines" /><div className="hero-copy"><p className="eyebrow"><span /> TECNOLOGIA COM PROPÓSITO</p><h1>Estratégia que<br /><em>acende</em> resultados.</h1><p className="hero-text">Tecnologia, tráfego pago e inteligência digital para empresas que não nasceram para passar despercebidas.</p><div className="hero-actions"><a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">Falar no WhatsApp <Icon name="arrow" /></a><a className="text-link" href="#solucoes">Conheça o método <Icon name="arrow" size={17} /></a></div></div><img className="hero-mascot" src={mascot} alt="Mascote usuario.senior" /><div className="scroll-cue"><span /> ROLE PARA EXPLORAR</div></section>
      <section className="intro section" id="sobre"><p className="eyebrow reveal"><span /> O QUE FAZEMOS</p><div className="intro-grid"><h2 className="reveal">Código, alcance<br />e <em>impacto real.</em></h2><div className="intro-content reveal"><p>Não entregamos apenas presença digital. Construímos sistemas de crescimento para transformar atenção em oportunidades — com visão técnica e olhar de negócio.</p><a href="#contato" className="text-link">Tire seu projeto do papel <Icon name="arrow" size={17} /></a></div></div></section>
      <section className="services section" id="solucoes"><div className="section-top reveal"><div><p className="eyebrow"><span /> NOSSAS FRENTES</p><h2>Uma equipe.<br /><em>Várias alavancas.</em></h2></div><p>O digital precisa conversar entre si. Por isso, unimos estratégia, tecnologia e mídia em uma única direção.</p></div><div className="service-grid">{services.map(([icon, title, text], i) => <article className="service-card reveal" style={{ transitionDelay: `${i * 90}ms` }} key={title}><div className="service-number">0{i + 1}</div><div className="service-icon"><Icon name={icon} /></div><h3>{title}</h3><p>{text}</p><a href="#contato" aria-label={`Saiba mais sobre ${title}`}><Icon name="arrow" /></a></article>)}</div></section>
      <section className="essence section" id="essencia"><div className="essence-art reveal"><img src={phoneImage} alt="Identidade visual usuario.senior" /></div><div className="essence-copy"><p className="eyebrow reveal"><span /> NOSSA ESSÊNCIA</p><h2 className="reveal">Por que estamos <em>aqui?</em></h2><p className="reveal">Porque há negócios incríveis que merecem ser encontrados. Estamos aqui para juntar boas ideias, tecnologia e coragem — e criar movimentos que deixam marca.</p><div className="pillars reveal"><div><h3>Visão</h3><p>Ser referência em tecnologia e produtos digitais, entregando com qualidade, clareza e compromisso com cada projeto.</p></div><div><h3>Missão</h3><p>Construir parcerias transparentes, transformar ideias em resultados e gerar impacto positivo por meio do nosso trabalho.</p></div><div><h3>Valores</h3><p>Honra, humildade, empatia e transparência.</p></div></div></div></section>
      <section className="contact section" id="contato"><div className="contact-glow" /><img className="contact-mark" src={brandLogo} alt="" /><p className="eyebrow reveal"><span /> VAMOS COMEÇAR</p><h2 className="reveal">Seu próximo nível<br />começa em uma <em>conversa.</em></h2><p className="reveal">Conte um pouco sobre o que você quer construir. A gente encontra o melhor caminho juntos.</p><div className="contact-actions reveal"><a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer"><Icon name="message" /> Chamar no WhatsApp</a><a className="phone" href="tel:+5517997725254">(17) 99772-5254</a></div><div className="social reveal"><a href="https://www.instagram.com/lucasfarias.sph?igsh=Zmc1Y3hsbXpvbHh3" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a><span>Instagram</span></div></section>
    </main>
    <footer><a className="brand" href="#inicio"><img src={brandIcon} alt="" /><span>usuario.<b>senior</b></span></a><p>© {new Date().getFullYear()} usuario.senior. Tecnologia com propósito.</p><a href="#inicio">Voltar ao topo ↑</a></footer><a className="floating-wa" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Conversar no WhatsApp"><Icon name="message" /></a>
  </>
}
createRoot(document.getElementById('root')).render(<App />)
