"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Tab = "sobre" | "ingredientes" | "nutricao";

type MediaItem = { type: "image" | "video"; src: string };

type Product = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  short: string;
  pot: string;
  candy: string;
  gallery: MediaItem[];
  shopee: string;
  accent: string;
  position: string;
  ingredients: string;
  allergens: string;
};

function gallery(id: string): MediaItem[] {
  return [
    { type: "image", src: `/images/gallery/${id}-1.png` },
    { type: "image", src: `/images/gallery/${id}-2.png` },
  ];
}

const SHOP_URL = "https://shopee.com.br/distribuidora.excelencia";

const products: Product[] = [
  {
    id: "palha",
    name: "Palha Italiana",
    eyebrow: "Chocolate & biscoito",
    description: "Brigadeiro cremoso com pedacinhos de biscoito: a mistura que transforma qualquer pausa em sobremesa.",
    short: "Brigadeiro com biscoito.",
    pot: "/images/potes/palha.webp",
    candy: "/images/doces-cut/palha.webp",
    gallery: gallery("palha"),
    shopee: "https://shopee.com.br/Doce-Palha-Italiana-marca-Ouro-de-Minas-i.1112128723.23692629263",
    accent: "#7b3d2b",
    position: "pot1",
    ingredients: "A composição completa e atualizada está disponível no rótulo do produto.",
    allergens: "Consulte o rótulo para informações sobre glúten, lactose e possíveis alergênicos.",
  },
  {
    id: "pe-de-moca",
    name: "Pé de Moça",
    eyebrow: "Amendoim & leite",
    description: "Amendoim, leite condensado e uma dose generosa de tradição. Macio, marcante e irresistível.",
    short: "Amendoim com leite condensado.",
    pot: "/images/potes/pedemoca.webp",
    candy: "/images/doces-cut/pe-de-moca.webp",
    gallery: gallery("pe-de-moca"),
    shopee: "https://shopee.com.br/Doce-P%C3%A9-de-Mo%C3%A7a-marca-Ouro-de-Minas-i.1112128723.22792630023",
    accent: "#8a4828",
    position: "pot2",
    ingredients: "Açúcar, amendoim, leite em pó integral, xarope de glucose, amido de milho modificado, cacau em pó, sal, conservador sorbato de potássio, regulador de acidez e aromas.",
    allergens: "Contém amendoim e derivados de leite. Pode conter soja, centeio, cevada, trigo, aveia e castanha de caju. Contém lactose e glúten.",
  },
  {
    id: "brigadeiro",
    name: "Brigadeiro",
    eyebrow: "Chocolate & afeto",
    description: "O clássico brasileiro em uma receita macia e chocolatuda, pronta para compartilhar.",
    short: "Leite condensado e chocolate.",
    pot: "/images/potes/brigadeiro.webp",
    candy: "/images/doces-cut/brigadeiro.webp",
    gallery: gallery("brigadeiro"),
    shopee: "https://shopee.com.br/Doce-Brigadeiro-marca-Ouro-de-Minas-i.1112128723.23097126042",
    accent: "#592a20",
    position: "pot3",
    ingredients: "A composição completa e atualizada está disponível no rótulo do produto.",
    allergens: "Consulte o rótulo para informações sobre glúten, lactose e possíveis alergênicos.",
  },
  {
    id: "pingo-bel",
    name: "Pingo Bel",
    eyebrow: "O sabor da casa",
    description: "Um doce macio de leite com personalidade mineira e sabor que fica na memória.",
    short: "Doce de leite macio e envolvente.",
    pot: "/images/potes/pingobel.webp",
    candy: "/images/doces-cut/pingo-bel.webp",
    gallery: gallery("pingo-bel"),
    shopee: "https://shopee.com.br/Doce-Pingo-Bel-marca-Ouro-de-Minas-doce-com-leite-i.1112128723.22792644605",
    accent: "#e55e18",
    position: "pot4",
    ingredients: "A composição completa e atualizada está disponível no rótulo do produto.",
    allergens: "Consulte o rótulo para informações sobre glúten, lactose e possíveis alergênicos.",
  },
  {
    id: "beijo-chocolate",
    name: "Beijo com Chocolate",
    eyebrow: "Coco & chocolate",
    description: "O encontro delicado do coco com o chocolate em uma receita feita para dividir.",
    short: "Leite condensado, coco e chocolate.",
    pot: "/images/potes/beijochoco.webp",
    candy: "/images/doces-cut/beijo-chocolate.webp",
    gallery: gallery("beijo-chocolate"),
    shopee: "https://shopee.com.br/Doce-Beijo-com-Chocolate-marca-Ouro-de-Minas-i.1112128723.23497126003",
    accent: "#5e3026",
    position: "pot5",
    ingredients: "A composição completa e atualizada está disponível no rótulo do produto.",
    allergens: "Consulte o rótulo para informações sobre glúten, lactose e possíveis alergênicos.",
  },
  {
    id: "beijo",
    name: "Beijo",
    eyebrow: "Coco & delicadeza",
    description: "Leite condensado e coco em um doce suave, cremoso e cheio de carinho.",
    short: "Leite condensado e coco.",
    pot: "/images/potes/beijo.webp",
    candy: "/images/doces-cut/beijo.webp",
    gallery: gallery("beijo"),
    shopee: SHOP_URL,
    accent: "#d68a42",
    position: "pot6",
    ingredients: "A composição completa e atualizada está disponível no rótulo do produto.",
    allergens: "Consulte o rótulo para informações sobre glúten, lactose e possíveis alergênicos.",
  },
  {
    id: "beijo-de-moca",
    name: "Beijo de Moça",
    eyebrow: "Amendoim & coco",
    description: "Uma combinação cremosa de amendoim, leite e coco, com o jeitinho acolhedor de Minas.",
    short: "Amendoim com leite e coco.",
    pot: "/images/potes/beijodemoca.webp",
    candy: "/images/doces-cut/beijo-de-moca.webp",
    gallery: gallery("beijo-de-moca"),
    shopee: "https://shopee.com.br/Doce-Beijo-de-Mo%C3%A7a-marca-Ouro-de-Minas-i.1112128723.22992644150",
    accent: "#8b4d36",
    position: "pot7",
    ingredients: "A composição completa e atualizada está disponível no rótulo do produto.",
    allergens: "Consulte o rótulo para informações sobre glúten, lactose e possíveis alergênicos.",
  },
];

function Icon({ name }: { name: "leaf" | "award" | "heart" | "pin" | "box" | "calendar" | "bag" }) {
  const paths = {
    leaf: <><path d="M19 4C10 5 5 10 5 18c5 1 12-1 14-14Z"/><path d="M4 21c3-6 7-9 13-12"/></>,
    award: <><circle cx="12" cy="9" r="6"/><path d="m8 14-1 7 5-3 5 3-1-7"/><path d="m12 6 1 2 2 .3-1.5 1.5.4 2.2-1.9-1-1.9 1 .4-2.2L9 8.3l2-.3Z"/></>,
    heart: <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z"/>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    box: <><path d="m4 8 8-4 8 4-8 4Z"/><path d="M4 8v8l8 4 8-4V8M12 12v8"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-13 4h3m2 0h3m-8 3h3"/></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function ProductCarousel({ items, alt }: { items: MediaItem[]; alt: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const drag = useRef<{ startX: number; scrollLeft: number; dragging: boolean } | null>(null);

  const goTo = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(items.length - 1, target));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    track.setPointerCapture(event.pointerId);
    drag.current = { startX: event.clientX, scrollLeft: track.scrollLeft, dragging: true };
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current?.dragging) return;
    track.scrollLeft = drag.current.scrollLeft - (event.clientX - drag.current.startX);
  };
  const endDrag = () => {
    const track = trackRef.current;
    if (!track || !drag.current) return;
    drag.current.dragging = false;
    goTo(Math.round(track.scrollLeft / track.clientWidth));
  };
  const onScroll = () => {
    const track = trackRef.current;
    if (!track || drag.current?.dragging) return;
    const next = Math.round(track.scrollLeft / track.clientWidth);
    if (next !== index) setIndex(next);
  };

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onScroll={onScroll}
      >
        {items.map((item, i) => (
          <div className="carousel-slide" key={item.src}>
            {item.type === "video" ? (
              <video className="carousel-media" src={item.src} controls playsInline preload="metadata" />
            ) : (
              <Image src={item.src} alt={alt} fill draggable={false} sizes="(max-width: 850px) 100vw, 34vw" className="carousel-media" priority={i === 0} />
            )}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <>
          <button className="carousel-nav prev" aria-label="Foto anterior" onClick={() => goTo(index - 1)} disabled={index === 0}>‹</button>
          <button className="carousel-nav next" aria-label="Próxima foto" onClick={() => goTo(index + 1)} disabled={index === items.length - 1}>›</button>
          <div className="carousel-dots" role="tablist" aria-label="Selecionar imagem">
            {items.map((item, i) => (
              <button key={item.src} role="tab" aria-selected={i === index} aria-label={`Ver foto ${i + 1}`} onClick={() => goTo(i)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("sobre");

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar informações">×</button>
        <div className="modal-visual" style={{ "--accent": product.accent } as React.CSSProperties}>
          <button className="modal-back" onClick={onClose}>‹ <span>Voltar aos sabores</span></button>
          <ProductCarousel items={product.gallery} alt={product.name} />
          <p>Tradição que adoça<br />a vida!</p>
        </div>
        <div className="modal-content">
          <p className="modal-kicker">DOCE OURO DE MINAS</p>
          <h2 id="modal-title">{product.name}</h2>
          <p className="modal-lead">{product.description}</p>
          <div className="tabs" role="tablist" aria-label="Informações do doce">
            <button role="tab" aria-selected={tab === "sobre"} onClick={() => setTab("sobre")}>Sobre o doce</button>
            <button role="tab" aria-selected={tab === "ingredientes"} onClick={() => setTab("ingredientes")}>Ingredientes</button>
            <button role="tab" aria-selected={tab === "nutricao"} onClick={() => setTab("nutricao")}>Tabela nutricional</button>
          </div>
          <div className="tab-panel" role="tabpanel">
            {tab === "sobre" && <><div className="facts"><div><span><Icon name="box" /></span><p><strong>21</strong> unidades</p></div><div><span><Icon name="bag" /></span><p><strong>1,050 kg</strong> peso líquido</p></div><div><span><Icon name="calendar" /></span><p>Validade: <strong>6 meses</strong></p></div></div><div className="distribution"><span><Icon name="leaf" /></span><div><strong>Disponível para distribuição</strong><p>Consulte os pontos de venda da sua região.</p></div></div></>}
            {tab === "ingredientes" && <div className="text-panel"><h3>Ingredientes</h3><p>{product.ingredients}</p><h3>Alérgicos</h3><p>{product.allergens}</p></div>}
            {tab === "nutricao" && <div className="text-panel nutrition-note"><h3>Informação nutricional</h3><p>Para garantir dados corretos e atualizados, consulte a tabela nutricional impressa no rótulo do produto.</p><small>As informações podem variar conforme atualização de embalagem e lote.</small></div>}
          </div>
          <div className="modal-actions"><a className="action-primary" href="#onde-encontrar" onClick={onClose}><Icon name="pin" />Onde encontrar</a><a className="action-secondary" href={product.shopee} target="_blank" rel="noopener noreferrer"><Icon name="bag" />Ver na Shopee</a></div>
          <div className="modal-trust"><span><Icon name="leaf" /> Receita mineira</span><span><Icon name="heart" /> Produção cuidadosa</span><span><Icon name="award" /> Qualidade em cada pote</span></div>
        </div>
      </section>
    </div>
  );
}

function smoothScrollTo(target: number, duration = 850) {
  const start = window.scrollY;
  const distance = target - start;
  const startedAt = performance.now();
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  const easeInOutCubic = (value: number) =>
    value < 0.5
      ? 4 * value * value * value
      : 1 - Math.pow(-2 * value + 2, 3) / 2;

  const step = (now: number) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
    else root.style.scrollBehavior = previousScrollBehavior;
  };

  requestAnimationFrame(step);
}

function smoothScrollToSection(id: string, duration = 850) {
  const section = document.getElementById(id);
  if (!section) return;
  smoothScrollTo(section.getBoundingClientRect().top + window.scrollY, duration);
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 420);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      type="button"
      className={visible ? "scroll-to-top is-visible" : "scroll-to-top"}
      onClick={() => smoothScrollTo(0, 760)}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <span>↑</span>
    </button>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setMenuOpen(false);
    smoothScrollToSection(id);
  };
  return (
    <main>
      <div className="social-strip"><div><a href="https://www.instagram.com/docesourodeminas" target="_blank" rel="noopener noreferrer">◎ &nbsp;@docesourodeminas</a><a href="https://www.instagram.com/granfrutalleoficila_grupodom" target="_blank" rel="noopener noreferrer">◎ &nbsp;@granfrutalleoficila_grupodom</a></div><span>Sabores que contam histórias</span></div>
      <header className="site-header">
        <button className="menu-toggle" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>Menu <i /></button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal"><a href="#sabores" onClick={(event) => navigateTo(event, "sabores")}>Sabores</a><a href="#historia" onClick={(event) => navigateTo(event, "historia")}>Nossa história</a><a href="#receitas" onClick={(event) => navigateTo(event, "receitas")}>Receitas</a><span className="nav-space" /><a href="#onde-encontrar" onClick={(event) => navigateTo(event, "onde-encontrar")}>Onde encontrar</a><a href="#contato" onClick={(event) => navigateTo(event, "contato")}>Contato</a></nav>
        <a className="logo" href="#inicio" onClick={(event) => navigateTo(event, "inicio")} aria-label="Doces Ouro de Minas — início"><Image src="/images/logo-ouro-de-minas.png" alt="Doces Ouro de Minas" fill priority sizes="150px" /></a>
      </header>
      <section className="hero" id="inicio">
        <div className="hero-copy"><p className="eyebrow"><i /> Sabores que contam histórias</p><h1>Doce de verdade,<br /><em>felicidade em<br />cada pote.</em></h1><p className="hero-description">Doces artesanais com o sabor autêntico de Minas Gerais. Tradição, qualidade e muito mais doce para o seu dia.</p><div className="hero-ctas"><a className="cta" href="#sabores" onClick={(event) => navigateTo(event, "sabores")}>Conheça os sabores <span>→</span></a><a className="history-link" href="#historia" onClick={(event) => navigateTo(event, "historia")}>Conheça nossa história</a></div></div>
        <div className="product-stage" aria-label="Escolha um doce para conhecer"><p className="discover-note">Passe o mouse<br />para descobrir <span>↙</span></p>{products.map((product) => <button key={product.id} className={`hero-pot ${product.position}`} onClick={() => setSelected(product)} aria-label={`Conhecer ${product.name}`}><Image src={product.pot} alt="" fill priority sizes="(max-width: 700px) 28vw, 16vw" /><span>{product.name}</span></button>)}</div>
        <button type="button" className="hero-scroll-next" onClick={() => smoothScrollToSection("sabores", 950)} aria-label="Ir para a próxima seção"><small>Próxima</small><span>↓</span></button>
        <div className="hero-features"><span><Icon name="leaf" /> Receitas tradicionais<br />mineiras</span><span><Icon name="award" /> Qualidade em<br />cada pote</span><span><Icon name="heart" /> Feito para<br />compartilhar</span><span><Icon name="pin" /> Onde encontrar</span></div>
      </section>
      <section className="flavors" id="sabores"><div className="section-intro"><p className="eyebrow"><i /> Nossos sabores</p><h2>Tem um doce para<br />cada história.</h2><p>Clique em um sabor para conhecer cada detalhe — da receita às informações do pote.</p></div><div className="flavor-grid">{products.map((product, index) => <button className="flavor-card" key={product.id} onClick={() => setSelected(product)} style={{ "--card-accent": product.accent } as React.CSSProperties}><span className="card-number">0{index + 1}</span><div className="card-image"><Image src={product.candy} alt="" fill sizes="(max-width: 700px) 80vw, 24vw" /></div><div><p>{product.eyebrow}</p><h3>{product.name}</h3><span>Conhecer o doce →</span></div></button>)}</div></section>
      <section className="story" id="historia"><div className="story-mark">OM</div><div><p className="eyebrow"><i /> Nossa história</p><h2>De Minas para<br />todo o Brasil.</h2></div><div><p>Receitas que atravessam gerações, feitas com cuidado e aquele sabor que a gente reconhece de olhos fechados.</p><p>Ouro de Minas nasceu da tradição e cresceu sem perder a essência: criar doces para compartilhar bons momentos.</p></div></section>
      <section className="recipes" id="receitas"><div className="recipe-copy"><p className="eyebrow"><i /> Receitas & momentos</p><h2>Um doce,<br />muitas maneiras<br />de aproveitar.</h2><p>No café, na sobremesa ou naquele presente especial: sempre existe um motivo para abrir mais um pote.</p></div><div className="recipe-visual"><Image src="/images/doces/pe-de-moca.png" alt="Pé de Moça Ouro de Minas" fill sizes="50vw" /><span>Receita mineira<br />para compartilhar</span></div></section>
      <section className="find" id="onde-encontrar"><div><p className="eyebrow"><i /> Onde encontrar</p><h2>O sabor de Minas<br />mais perto de você.</h2></div><div><p>Encontre os produtos em pontos de venda parceiros ou visite a loja oficial na Shopee.</p><a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className="cta">Visitar a loja oficial <span>↗</span></a></div></section>
      <footer className="site-footer" id="contato">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-logo" href="#inicio" onClick={(event) => navigateTo(event, "inicio")} aria-label="Voltar ao início"><Image src="/images/logo-ouro-de-minas.png" alt="Doces Ouro de Minas" width={112} height={136} /></a>
            <span className="footer-rule" />
            <div><h3>Doces Ouro de Minas</h3><p>Receitas mineiras feitas com cuidado, tradição e aquele sabor que transforma qualquer momento.</p></div>
            <div className="footer-note"><Icon name="heart" /><span>Doce de verdade, feito para compartilhar.</span></div>
          </div>
          <div className="footer-links">
            <p className="footer-heading">Links rápidos</p>
            <a href="#sabores" onClick={(event) => navigateTo(event, "sabores")}><span><Icon name="leaf" />Nossos sabores</span><b>›</b></a>
            <a href="#historia" onClick={(event) => navigateTo(event, "historia")}><span><Icon name="award" />Nossa história</span><b>›</b></a>
            <a href="#receitas" onClick={(event) => navigateTo(event, "receitas")}><span><Icon name="heart" />Receitas & momentos</span><b>›</b></a>
            <a href="#onde-encontrar" onClick={(event) => navigateTo(event, "onde-encontrar")}><span><Icon name="pin" />Onde encontrar</span><b>›</b></a>
            <a href="https://www.instagram.com/docesourodeminas" target="_blank" rel="noopener noreferrer"><span><Icon name="heart" />Instagram</span><b>↗</b></a>
          </div>
          <a className="footer-showcase" href={SHOP_URL} target="_blank" rel="noopener noreferrer" aria-label="Visitar a loja Ouro de Minas na Shopee">
            <Image src="/images/gallery/pingo-bel-1.png" alt="Pingo Bel Ouro de Minas" fill sizes="(max-width: 760px) 92vw, 32vw" />
            <span className="footer-showcase-shade" />
            <span className="footer-showcase-badge"><Icon name="bag" /></span>
            <span className="footer-showcase-copy"><small>Loja oficial</small><strong>Encontre nossos doces na Shopee</strong><em>Visitar agora ↗</em></span>
          </a>
        </div>
        <div className="footer-bottom"><span>Sabores que contam histórias.</span><span>© {new Date().getFullYear()} Doces Ouro de Minas. Todos os direitos reservados.</span></div>
      </footer>
      <ScrollToTop />
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
