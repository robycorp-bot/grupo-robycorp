import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import brandLogo from './assets/images/logo.png'
import banner from './assets/images/banner.png'
import phoneImage from './assets/images/celular.png'
import googleBusinessImage from './assets/price/robycorp-google-meu-negocio.png'
import adsWebsiteImage from './assets/price/robycorp-site-campanha-ads.png'
import organicWebsiteImage from './assets/price/robycorp-site-organico.png'
import socialMediaImage from './assets/price/robycorp-gestao-midias-sociais.png'
import './styles.css'

const phone = '5517997725254'
const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent('Olá! Quero conversar sobre um projeto.')}`

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    external: <><path d="M14 4h6v6" /><path d="m20 4-9 9" /><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    code: <><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" /></>,
    chart: <><path d="M4 19V5M4 19h16" /><path d="m7 15 4-4 3 2 5-6" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2" /></>,
    workflow: <><rect x="3" y="4" width="7" height="6" rx="1" /><rect x="14" y="14" width="7" height="6" rx="1" /><path d="M10 7h4a2 2 0 0 1 2 2v5M7 10v4a2 2 0 0 0 2 2h5" /></>,
    message: <path d="M20 11.5a8.3 8.3 0 0 1-9 8.2 8.5 8.5 0 0 1-3.8-1.2L3 20l1.4-4A8.3 8.3 0 1 1 20 11.5Z" />,
    check: <path d="m5 12 4 4L19 6" />,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

const services = [
  {
    number: '01', icon: 'code', title: 'Desenvolvimento digital',
    text: 'Sites e soluções web rápidos, responsivos e desenhados para tornar cada interação mais simples.',
    tags: ['Sites', 'Aplicações web', 'Integrações'],
  },
  {
    number: '02', icon: 'workflow', title: 'Sistemas & automação',
    text: 'Processos e ferramentas digitais que conectam as etapas do trabalho e ajudam seu negócio a ganhar fluidez.',
    tags: ['Sistemas', 'Automação', 'Otimização'],
  },
  {
    number: '03', icon: 'chart', title: 'Marketing & performance',
    text: 'Estratégia digital apoiada em dados para ampliar sua presença e aproximar sua marca das pessoas certas.',
    tags: ['Estratégia', 'Mídia paga', 'Dados'],
  },
]

const steps = [
  ['01', 'Entender', 'Começamos pelo seu momento, seus objetivos e o que está impedindo o próximo passo.'],
  ['02', 'Construir', 'Definimos a solução e desenvolvemos cada etapa com clareza e colaboração.'],
  ['03', 'Evoluir', 'Acompanhamos o que funciona e aprimoramos a experiência junto com o seu negócio.'],
]

const offers = [
  {
    image: googleBusinessImage,
    imageAlt: 'Oferta Robycorp de gestão de perfil do Google Meu Negócio, com descrição do serviço e valores',
    category: 'Presença local',
    title: 'Google Meu Negócio',
    whatsappMessage: 'Olá! Tenho interesse na Gestão de Perfil do Google Meu Negócio da Robycorp.',
    benefits: [
      'Otimização completa e configuração estratégica do seu perfil',
      'Monitoramento e resposta às avaliações dos clientes',
      'Postagens e atualizações frequentes',
      'Mais visibilidade e credibilidade nas buscas locais',
    ],
    prices: [
      ['Valor inicial', 'R$ 700'],
      ['Manutenção mensal', 'R$ 150'],
    ],
    note: 'Fale com a gente e leve seu negócio para o próximo nível.',
  },
  {
    image: adsWebsiteImage,
    imageAlt: 'Oferta Robycorp de criação de site e campanha de anúncios, com descrição do serviço e valores',
    category: 'Performance e conversão',
    title: 'Site + Campanha Ads',
    whatsappMessage: 'Olá! Tenho interesse no pacote Site + Campanha Ads da Robycorp.',
    benefits: [
      'Criação de site profissional e otimizado',
      'Configuração e gestão de campanhas (Google/Meta Ads)',
      'Segmentação estratégica e otimização contínua',
      'Investimento diário da campanha: a combinar no fechamento (varia de cliente para cliente)',
    ],
    prices: [
      ['Valor inicial', 'R$ 1.350'],
      ['Manutenção mensal', 'R$ 200'],
    ],
    note: 'Fale com a gente e descubra o investimento ideal para sua campanha.',
  },
  {
    image: organicWebsiteImage,
    imageAlt: 'Oferta Robycorp de criação de site orgânico, com descrição do serviço e valores',
    category: 'Crescimento sustentável',
    title: 'Site Orgânico',
    whatsappMessage: 'Olá! Tenho interesse no projeto de Site Orgânico da Robycorp.',
    benefits: [
      'Estratégia de SEO focada em resultado orgânico',
      'Trabalho gradual, com resultados de médio a longo prazo',
      'Acompanhamento próximo entre agência e cliente',
      'Parceria conjunta até o site ficar totalmente indexado',
    ],
    prices: [
      ['Valor inicial', 'R$ 750'],
      ['Valor mensal', 'R$ 750'],
    ],
    note: 'Um projeto construído em parceria, passo a passo, até o topo do Google.',
  },
  {
    image: socialMediaImage,
    imageAlt: 'Oferta Robycorp de gestão de mídias sociais, com descrição do serviço e valor mensal',
    category: 'Instagram · TikTok · Facebook · Kwai',
    title: 'Gestão de Mídias Sociais',
    whatsappMessage: 'Olá! Tenho interesse no pacote de Gestão de Mídias Sociais da Robycorp.',
    benefits: [
      'Edição de vídeos, imagens e banners',
      'Postagem diária em todas as redes',
      'Atendimento 24h, com máxima agilidade',
      'Nenhuma demanda do dia fica para o dia seguinte',
    ],
    prices: [
      ['Pacote mensal', 'R$ 2.000'],
    ],
    note: 'O diferencial: agilidade total e presença constante nas suas redes.',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(
        entries => entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }),
        { threshold: 0.12 },
      )
      : null
    document.querySelectorAll('.reveal').forEach(element => {
      if (observer) observer.observe(element)
      else element.classList.add('is-visible')
    })
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Robycorp — início">
        <img className="brand-mark" src={brandLogo} alt="" aria-hidden="true" />
        <span className="brand-name">Robycorp<span className="brand-period">.</span></span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Icon name={menuOpen ? 'close' : 'menu'} />
      </button>
      <nav id="site-navigation" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegação principal">
        <a href="#solucoes" onClick={closeMenu}>Soluções</a>
        <a href="#planos" onClick={closeMenu}>Planos e valores</a>
        <a href="#metodo" onClick={closeMenu}>Como trabalhamos</a>
        <a href="#sobre" onClick={closeMenu}>Sobre a Robycorp</a>
        <a className="nav-cta" href="#contato" onClick={closeMenu}>Vamos conversar <Icon name="arrow" size={16} /></a>
      </nav>
    </header>

    <main id="conteudo">
      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner page-width">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> TECNOLOGIA COM PROPÓSITO</p>
            <h1>Ideias fortes.<br /><span>Tecnologia que</span><br /><em>faz acontecer.</em></h1>
            <p className="hero-description">A Robycorp conecta desenvolvimento e estratégia digital para transformar desafios do seu negócio em novas possibilidades.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">Conte sua ideia <Icon name="arrow" /></a>
              <a className="button button-secondary" href="#solucoes">Conheça as soluções <span className="button-down">↓</span></a>
            </div>
            <div className="hero-note"><span className="note-dot" /> Do primeiro passo à próxima fase do seu negócio</div>
          </div>
          <div className="hero-visual" aria-label="Identidade visual da Robycorp">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-glow" />
            <img src={brandLogo} alt="Robycorp — estratégia, código e propósito" fetchPriority="high" />
            <div className="visual-label"><span className="label-indicator" /> DIGITAL BY DESIGN</div>
            <div className="visual-coordinate">RC<span> / </span>001</div>
          </div>
        </div>
        <div className="hero-bottom page-width">
          <span>ESTRATÉGIA</span><i /> <span>TECNOLOGIA</span><i /> <span>CRESCIMENTO</span>
          <a href="#solucoes" aria-label="Rolar para soluções">↓</a>
        </div>
      </section>

      <section className="intro section-pad" id="sobre">
        <div className="intro-inner page-width">
          <div className="intro-heading reveal">
            <p className="eyebrow"><span className="eyebrow-line" /> MAIS QUE DIGITAL</p>
            <h2>O próximo passo<br />começa com <em>clareza.</em></h2>
          </div>
          <div className="intro-copy reveal">
            <p className="intro-lead">Tecnologia só faz sentido quando aproxima você dos seus objetivos.</p>
            <p>Por isso, a gente começa entendendo o que o seu negócio precisa. Depois, combinamos código, estratégia e execução para construir uma experiência digital que trabalha a favor de você.</p>
            <a className="inline-link" href="#metodo">Conheça nosso jeito de trabalhar <Icon name="arrow" size={17} /></a>
          </div>
        </div>
        <div className="intro-image page-width reveal">
          <img src={banner} alt="Identidade Robycorp: tecnologia, programação, marketing digital e performance" loading="lazy" />
          <div className="image-caption"><span>01 / VISÃO</span><p>Estratégia. Código. Propósito.</p></div>
        </div>
      </section>

      <section className="services section-pad" id="solucoes">
        <div className="page-width">
          <div className="section-heading reveal">
            <div><p className="eyebrow"><span className="eyebrow-line" /> O QUE FAZEMOS</p><h2>Uma parceria.<br /><em>Múltiplas soluções.</em></h2></div>
            <p>Da presença digital à operação, criamos soluções conectadas aos desafios reais da sua empresa.</p>
          </div>
          <div className="service-grid">
            {services.map(({ number, icon, title, text, tags }, index) => <article className="service-card reveal" style={{ transitionDelay: `${index * 100}ms` }} key={number}>
              <div className="card-top"><span>{number}</span><span className="card-icon"><Icon name={icon} size={21} /></span></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="service-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <a className="card-link" href="#contato" aria-label={`Converse com a Robycorp sobre ${title}`}><Icon name="arrow" /></a>
            </article>)}
          </div>
        </div>
      </section>

      <section className="offers section-pad" id="planos">
        <div className="page-width">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> SERVIÇOS ROBYCORP</p>
              <h2>Soluções claras.<br /><em>Investimento transparente.</em></h2>
            </div>
            <p>Escolha o serviço ideal para o momento do seu negócio. Cada conversa pelo WhatsApp já começa com o produto que você selecionou.</p>
          </div>
          <div className="offer-grid">
            {offers.map((offer, index) => <article className="offer-card reveal" style={{ transitionDelay: `${index * 80}ms` }} key={offer.title}>
              <div className="offer-art">
                <img src={offer.image} alt={offer.imageAlt} loading="lazy" />
              </div>
              <div className="offer-content">
                <p className="offer-category">{offer.category}</p>
                <h3>{offer.title}</h3>
                <ul className="offer-benefits">
                  {offer.benefits.map(benefit => <li key={benefit}><Icon name="check" size={16} /> <span>{benefit}</span></li>)}
                </ul>
                <div className={`offer-prices${offer.prices.length === 1 ? ' offer-prices-single' : ''}`}>
                  {offer.prices.map(([label, price]) => <div className="offer-price" key={label}>
                    <span>{label}</span>
                    <strong>{price}</strong>
                  </div>)}
                </div>
                <p className="offer-note">{offer.note}</p>
                <a
                  className="offer-cta"
                  href={`https://wa.me/${phone}?text=${encodeURIComponent(offer.whatsappMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="message" size={18} /> Conversar sobre este serviço <Icon name="arrow" size={17} />
                </a>
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="method section-pad" id="metodo">
        <div className="page-width method-layout">
          <div className="method-intro reveal">
            <p className="eyebrow"><span className="eyebrow-line" /> NOSSO PROCESSO</p>
            <h2>Bom trabalho começa com <em>boas perguntas.</em></h2>
            <p>Cada projeto tem seu próprio caminho. Nosso processo mantém tudo transparente, colaborativo e focado no que importa para você.</p>
            <a className="button button-outline" href={whatsapp} target="_blank" rel="noreferrer">Comece uma conversa <Icon name="arrow" size={17} /></a>
          </div>
          <div className="steps">
            {steps.map(([number, title, text], index) => <article className="step reveal" style={{ transitionDelay: `${index * 100}ms` }} key={number}>
              <span className="step-number">{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
              <Icon name="check" size={19} />
            </article>)}
          </div>
        </div>
      </section>

      <section className="about section-pad">
        <div className="page-width about-layout">
          <div className="about-art reveal"><img src={phoneImage} alt="Arte vertical da marca Robycorp, com lobo tecnológico e identidade azul" loading="lazy" /><span className="about-art-index">RC — DIGITAL STUDIO</span></div>
          <div className="about-copy reveal">
            <p className="eyebrow"><span className="eyebrow-line" /> SOBRE A ROBYCORP</p>
            <h2>Do desafio ao digital.<br /><em>Juntos.</em></h2>
            <p>A Robycorp é uma empresa de tecnologia que une pensamento estratégico e desenvolvimento digital. Trabalhamos lado a lado com empresas que querem organizar, evoluir e crescer com mais intenção.</p>
            <p>Sem fórmulas prontas: construímos soluções com diálogo, cuidado e uma visão clara do que vem depois.</p>
            <div className="about-values"><span><Icon name="check" size={16} /> Parceria próxima</span><span><Icon name="check" size={16} /> Tecnologia útil</span><span><Icon name="check" size={16} /> Evolução contínua</span></div>
          </div>
        </div>
      </section>

      <section className="contact section-pad" id="contato">
        <div className="contact-art" aria-hidden="true"><img src={banner} alt="" loading="lazy" /></div>
        <div className="contact-content page-width reveal">
          <p className="eyebrow"><span className="eyebrow-line" /> O PRÓXIMO PASSO É SEU</p>
          <h2>Tem um desafio?<br /><em>Vamos conversar.</em></h2>
          <p>Conte o que você precisa. A gente ajuda a encontrar o caminho e a tecnologia certos para tirar a ideia do papel.</p>
          <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer"><Icon name="message" /> Fale com a Robycorp <Icon name="arrow" /></a>
          <span className="contact-phone">Ou ligue <a href="tel:+5517997725254">(17) 99772-5254</a></span>
        </div>
        <div className="contact-meta page-width"><span>ESTRATÉGIA <i /> CÓDIGO <i /> PROPÓSITO</span><span>ROBYCORP © {new Date().getFullYear()}</span></div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="footer-main page-width">
        <a className="brand footer-brand" href="#inicio" aria-label="Robycorp — voltar ao início"><img className="brand-mark" src={brandLogo} alt="" aria-hidden="true" /><span className="brand-name">Robycorp<span className="brand-period">.</span></span></a>
        <p>Tecnologia com propósito.<br />Feita para mover o que vem a seguir.</p>
        <div className="footer-links"><a href="#solucoes">Soluções</a><a href="#metodo">Processo</a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp <Icon name="external" size={14} /></a><a href="https://www.instagram.com/lucasfarias.sph?igsh=Zmc1Y3hsbXpvbHh3" target="_blank" rel="noreferrer">Instagram <Icon name="external" size={14} /></a></div>
      </div>
      <div className="footer-bottom page-width"><span>© {new Date().getFullYear()} Robycorp. Todos os direitos reservados.</span><a href="#inicio">Voltar ao topo ↑</a></div>
    </footer>

    <a className="floating-contact" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Conversar com a Robycorp pelo WhatsApp"><Icon name="message" size={22} /></a>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
