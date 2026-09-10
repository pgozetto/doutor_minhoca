"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import "./nocturne.css";
import "./enhancements.css";

const phone = "5512991503502";
const address = "Estrada Municipal José Silvino Figueira, 3333 - Bairro Santa Cruz, Aparecida - SP";
const wa = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const humus = [
  { name: "Húmus Puro", tag: "", image: "/images/humus-padrao.png", detailImage: "/images/humus-puro-embalagens.png", detailAlt: "Embalagens de 1,2 kg, 5 kg e 10 kg do Húmus Puro Doutor Minhoca", sizes: "Embalagens: 1,2 kg · 5 kg · 10 kg · 25 kg", description: "Húmus natural, peneirado e pronto para uso. Melhora a estrutura do solo e fornece matéria orgânica de forma equilibrada.", uses: ["Hortas e canteiros", "Vasos e jardins", "Preparo de substratos"], rotateDetail: false },
  { name: "Húmus peletizado", tag: "Sem cheiro, baixa umidade", image: "/images/humus-peletizado.png", detailImage: "/images/humus-peletizado-embalagens.png", detailAlt: "Embalagens de Húmus peletizado Doutor Minhoca", sizes: "Embalagem: 800 gramas", description: "Formato compacto, fácil de dosar e armazenar. Liberação gradual e sem desperdício.", uses: ["Plantas de Interior (Orquídeas, Vasos de Orquídeas)", "Adubação Garantida por 3 meses"], rotateDetail: true },
];

const species = [
  { name: "Gigante-africana", latin: "Eudrilus eugeniae", image: "/images/minhoca-gigante-africana.png", uses: "Indicação: Pescaria.", orders: ["100 un.", "200 un.", "300 un.", "500 un.", "1.000 un."] },
  { name: "Vermelha-da-califórnia", latin: "Eisenia fetida", image: "/images/minhoca-vermelha-california.png", uses: "Indicação: Alta produção de húmus.", orders: ["250 un.", "500 un.", "1.000 un.", "2.000 un."] },
  { name: "Aninha-verde", latin: "Dichogaster annae", image: "/images/minhoca-aninha-verde.png", uses: "Indicação: Alimentação de répteis, pássaros, peixes de água doce ou salgada.", orders: ["100 un.", "200 un."] },
  { name: "Dama-cheirosa", latin: "Perionyx excavatus", image: "/images/minhoca-dama-cheirosa.png", uses: "Indicação: Aves recém-nascidas e peixes de pequeno porte.", orders: ["100 un.", "200 un."] },
];

function WhatsAppIcon() {
  return <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.2 1.6 6L.1 24l6.3-1.7c1.8 1 3.7 1.5 5.7 1.5 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4Zm-8.4 18.3a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6Zm5.4-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.7.1-.2.1-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z" /></svg>;
}

function SocialIcon({ network }: { network: "facebook" | "instagram" | "tiktok" | "youtube" }) {
  const paths = {
    facebook: <path d="M14 8h3V4.2c-.5-.1-2.2-.2-4.2-.2C8.7 4 6 6.5 6 11v3H2v4h4v10h5V18h4l1-4h-5v-2.6C11 9.6 11.7 8 14 8Z" />,
    instagram: <><rect x="3" y="3" width="26" height="26" rx="7" /><circle cx="16" cy="16" r="6" /><circle cx="24" cy="8" r="1.4" className="social-dot" /></>,
    tiktok: <path d="M20.7 4c.7 3 2.4 4.8 5.3 5.5v4.2a12 12 0 0 1-5.2-1.6v8.1A8.2 8.2 0 1 1 13.6 12v4.3a4.1 4.1 0 1 0 2.9 3.9V4h4.2Z" />,
    youtube: <path d="M29 9.2a4 4 0 0 0-2.8-2.8C23.7 5.7 16 5.7 16 5.7s-7.7 0-10.2.7A4 4 0 0 0 3 9.2c-.7 2.5-.7 6.8-.7 6.8s0 4.3.7 6.8a4 4 0 0 0 2.8 2.8c2.5.7 10.2.7 10.2.7s7.7 0 10.2-.7a4 4 0 0 0 2.8-2.8c.7-2.5.7-6.8.7-6.8s0-4.3-.7-6.8ZM13.3 20.4v-8.8l7.5 4.4-7.5 4.4Z" />,
  };
  return <svg className={`social-icon social-icon-${network}`} viewBox="0 0 32 32" aria-hidden="true">{paths[network]}</svg>;
}

function StepIcon({ type }: { type: "choose" | "chat" | "pin" | "box" }) {
  if (type === "choose") return <svg viewBox="0 0 24 24"><path d="M3 5h2l2.2 9.3a2 2 0 0 0 2 1.5h7.9a2 2 0 0 0 1.9-1.4L21 8H7M10 20h.01M18 20h.01" /></svg>;
  if (type === "chat") return <svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-8 8H5l1.8-3.6A8 8 0 1 1 21 12Z" /><path d="M9 12h.01M13 12h.01M17 12h.01" /></svg>;
  if (type === "pin") return <svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  return <svg viewBox="0 0 24 24"><path d="m3 7 9-4 9 4-9 4-9-4Z" /><path d="m3 7 9 4 9-4v10l-9 4-9-4V7ZM12 11v10" /></svg>;
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [startTypewriting, setStartTypewriting] = useState(false);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [activeProductPhoto, setActiveProductPhoto] = useState<null | { src: string; alt: string; name: string; rotate: boolean }>(null);
  const [photoClosing, setPhotoClosing] = useState(false);
  const ctaLead = "Interessado? Fale comigo aqui embaixo para ";
  const ctaAccent = "encomendar seus produtos!";
  const totalCtaCharacters = ctaLead.length + ctaAccent.length;

  useEffect(() => {
    const hero = heroRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hero || reducedMotion.matches) return;

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const centerDistance = rect.top + rect.height / 2 - window.innerHeight / 2;
      const shift = Math.max(-28, Math.min(28, centerDistance * -0.08));
      hero.style.setProperty("--parallax-y", `${shift}px`);
      hero.style.setProperty("--parallax-content-y", `${shift * -0.34}px`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const section = ctaRef.current;
    if (!section) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setStartTypewriting(true);
      setTypedCharacters(totalCtaCharacters);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setStartTypewriting(true);
      observer.disconnect();
    }, { threshold: 0.42 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [totalCtaCharacters]);

  useEffect(() => {
    if (!startTypewriting || typedCharacters >= totalCtaCharacters) return;
    const timer = window.setTimeout(() => setTypedCharacters((current) => current + 1), 27);
    return () => window.clearTimeout(timer);
  }, [startTypewriting, typedCharacters, totalCtaCharacters]);

  useEffect(() => {
    if (!activeProductPhoto) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProductPhoto();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProductPhoto]);

  const openProductPhoto = (item: (typeof humus)[number]) => {
    setPhotoClosing(false);
    setActiveProductPhoto({ src: item.detailImage, alt: item.detailAlt, name: item.name, rotate: item.rotateDetail });
  };

  const closeProductPhoto = () => {
    if (!activeProductPhoto || photoClosing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveProductPhoto(null);
      return;
    }
    setPhotoClosing(true);
    window.setTimeout(() => {
      setActiveProductPhoto(null);
      setPhotoClosing(false);
    }, 280);
  };

  const handleHeroMouseMove = (event: MouseEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    hero.style.setProperty("--pointer-x", `${x}px`);
    hero.style.setProperty("--pointer-y", `${y}px`);
    hero.style.setProperty("--content-x", `${(x / rect.width - 0.5) * -10}px`);
    hero.style.setProperty("--content-y", `${(y / rect.height - 0.5) * -8}px`);
  };

  const resetHeroPointer = () => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.style.setProperty("--content-x", "0px");
    hero.style.setProperty("--content-y", "0px");
  };

  return <main className="nocturne">
    <div className="grain" aria-hidden="true" />
    <header className="night-nav container"><a className="night-brand" href="#inicio"><span className="logo-wrap"><Image src="/images/logo-doutor-minhoca.png" alt="" fill sizes="48px" /></span><span>DOUTOR<br /><b>MINHOCA</b></span></a><nav><a href="#sobre">O sítio</a><a href="#produtos">Húmus</a><a href="#matrizes">Minhocas</a><a href="#envio">Envios</a></nav><a className="line-button desktop-cta" href={wa("Olá, Doutor Minhoca! Quero fazer uma encomenda.")} target="_blank" rel="noreferrer">Encomendar <span>↗</span></a></header>

    <section id="inicio" ref={heroRef} className="hero-overlay container" onMouseMove={handleHeroMouseMove} onMouseLeave={resetHeroPointer}><div className="hero-backdrop"><Image src="/images/ricardo-humus.jpg" alt="Ricardo segurando um saco de húmus Doutor Minhoca" fill preload sizes="100vw" /></div><div className="hero-vignette" /><div className="hero-orb orb-one" aria-hidden="true" /><div className="hero-orb orb-two" aria-hidden="true" /><div className="hero-logo-mark"><Image src="/images/logo-doutor-minhoca.png" alt="Logo do Doutor Minhoca" fill sizes="(max-width: 780px) 160px, 290px" /></div><div className="hero-content"><p className="kicker hero-kicker"><i /> CULTIVO NATURAL DESDE 1992</p><h1 className="hero-title"><em>Dr. Minhoca:</em><br />Comece sua <span>minhocultura</span> hoje.</h1><p className="hero-description">Matrizes Selecionadas para seu projeto de pequeno ou grande porte. Orientação Profissional.</p><div className="hero-links hero-actions"><a className="solid-button" href="#produtos">Explorar produtos <span>↓</span></a><a className="whatsapp-button" href={wa("Olá, Doutor Minhoca! Quero fazer uma encomenda. Pode me ajudar?")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Fazer encomenda</a></div><div className="numbers hero-numbers"><b>+17 mil</b><span>clientes que escolheram<br />cuidar melhor do solo</span></div></div></section>

    <section id="sobre" className="story container"><div className="story-image"><div className="story-orbit" /><Image src="/images/ricardo-livro.jpeg" alt="Ricardo Migliano Monteleone apresentando um livro sobre minhocas e húmus" fill sizes="(max-width: 780px) 90vw, 42vw" /><span>DO SÍTIO<br />PARA A SUA TERRA</span></div><div className="story-copy"><p className="kicker"><i /> 01 — UM POUCO DA MINHA PESSOA</p><h2>Quem é o<br /><em>Dr. Minhoca?</em></h2><p>Eu sou Ricardo Migliano Monteleone. Há mais de três décadas tenho como missão incentivar as pessoas a terem seu próprio minhocário.</p><p>No Sítio São José, cada produto é preparado com respeito à natureza.</p><a className="location-card" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer"><span>⌖</span><div><b>Visite o Sítio São José</b><small>{address}</small></div><span>↗</span></a></div></section>

    <section id="produtos" className="humus-section container"><header className="catalog-heading"><div><p className="kicker"><i /> 02 — HÚMUS DE MINHOCA</p><h2>Nutrição que nasce<br /><em>da terra.</em></h2></div><p>Escolha uma opção e clique no card para conhecer as embalagens, as características e os melhores usos.</p></header><div className="humus-grid">{humus.map((item, index) => <details className="humus-product" key={item.name}><summary><span className="product-index">0{index + 1}</span><div className="humus-image"><Image src={item.image} alt={`Imagem ilustrativa de ${item.name}`} fill sizes="(max-width: 780px) 90vw, 48vw" /></div><div className="product-heading">{item.tag && <p>{item.tag}</p>}<h3>{item.name}</h3><span className="expand-hint">Ver destaques</span></div></summary><div className="product-details"><small>{item.sizes}</small><p>{item.description}</p><button className={`detail-photo-trigger ${item.rotateDetail ? "is-rotated" : ""}`} type="button" onClick={() => openProductPhoto(item)} aria-label={`Ampliar foto real de ${item.name}`}><span className="detail-photo-frame"><Image src={item.detailImage} alt={item.detailAlt} fill sizes="(max-width: 780px) 82vw, 40vw" /></span><span>Ver foto do produto <i>↗</i></span></button><h4>Melhores usos</h4><ul>{item.uses.map((use) => <li key={use}>{use}</li>)}</ul><a className="whatsapp-button compact" href={wa(`Olá, Doutor Minhoca! Quero encomendar ${item.name}. Pode me orientar sobre quantidade e envio?`)} target="_blank" rel="noreferrer"><WhatsAppIcon /> Encomendar este húmus</a></div></details>)}</div></section>

    <section id="matrizes" className="species-section"><div className="container"><p className="kicker"><i /> MATRIZES DE MINHOCA</p><div className="species-heading"><h2>Nossos tipos<br /><em>de minhocas.</em></h2><p>Clique em uma espécie para expandir seus melhores usos, consultar as quantidades e encomendar diretamente.</p></div><div className="species-grid">{species.map((item, index) => <details className="species-card" key={item.name}><summary><div className="species-top"><span>0{index + 1}</span><span className="worm-photo"><Image src={item.image} alt={`Imagem ilustrativa da ${item.name}`} fill sizes="150px" /></span></div><h3>{item.name}</h3><em>{item.latin}</em><span className="expand-hint">Ver preços e usos</span></summary><div className="worm-details"><p>{item.uses}</p><div className="order-list">{item.orders.map((order) => <a key={order} href={wa(`Olá, Doutor Minhoca! Quero encomendar ${item.name}: ${order}. Pode me orientar sobre o envio?`)} target="_blank" rel="noreferrer"><span>{order}</span><span>↗</span></a>)}</div><a className="whatsapp-button compact" href={wa(`Olá, Doutor Minhoca! Tenho interesse na ${item.name}. Pode me ajudar a escolher a quantidade?`)} target="_blank" rel="noreferrer"><WhatsAppIcon /> Encomendar esta espécie</a></div></details>)}</div></div></section>

    <section id="envio" className="shipping-night container"><div><p className="kicker"><i /> 03 — ENVIO E ATENDIMENTO</p><h2>Enviamos para<br /><em>todo o Brasil!</em></h2></div><div className="shipping-steps"><article><span className="step-icon"><StepIcon type="choose" /></span><p><b>Escolha seus produtos</b><small>Selecione o tipo e a quantidade ideal.</small></p></article><article><span className="step-icon"><StepIcon type="chat" /></span><p><b>Fale conosco</b><small>Envie seu pedido pelo WhatsApp.</small></p></article><article><span className="step-icon"><StepIcon type="pin" /></span><p><b>Informe seus dados</b><small>Nome, telefone, CPF, CEP e endereço.</small></p></article><article><span className="step-icon"><StepIcon type="box" /></span><p><b>Receba em casa</b><small>Calculamos o frete e cuidamos do envio.</small></p></article></div></section>

    <section ref={ctaRef} className={`cta-night container ${startTypewriting ? "is-typing" : ""} ${typedCharacters === totalCtaCharacters ? "is-complete" : ""}`}><p>✦</p><h2 aria-label={`${ctaLead}${ctaAccent}`}><span className="type-lead">{ctaLead.slice(0, Math.min(typedCharacters, ctaLead.length))}</span>{typedCharacters <= ctaLead.length && startTypewriting && <i className="type-caret" aria-hidden="true" />}<em>{typedCharacters > ctaLead.length ? ctaAccent.slice(0, typedCharacters - ctaLead.length) : ""}</em>{typedCharacters > ctaLead.length && typedCharacters < totalCtaCharacters && <i className="type-caret" aria-hidden="true" />}</h2><a className="whatsapp-button cta-whatsapp" href={wa("Olá, Doutor Minhoca! Quero encomendar seus produtos. Pode me ajudar?")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Iniciar encomenda</a></section>
    {activeProductPhoto && <div className={`product-photo-modal ${photoClosing ? "is-closing" : ""}`} role="dialog" aria-modal="true" aria-label={`Foto ampliada de ${activeProductPhoto.name}`} onClick={closeProductPhoto}><button className="product-photo-close" type="button" onClick={closeProductPhoto} aria-label="Fechar foto ampliada">×</button><div className={`product-photo-modal-card ${activeProductPhoto.rotate ? "is-rotated" : ""}`} onClick={(event) => event.stopPropagation()}><div className="product-photo-modal-image"><Image src={activeProductPhoto.src} alt={activeProductPhoto.alt} fill sizes="92vw" /></div><p>{activeProductPhoto.name} <span>Foto real do produto</span></p></div></div>}
    <footer><div className="footer-night container"><div><a className="night-brand" href="#inicio"><span className="logo-wrap"><Image src="/images/logo-doutor-minhoca.png" alt="" fill sizes="48px" /></span><span>DOUTOR<br /><b>MINHOCA</b></span></a><p>Húmus e matrizes de minhocas desde 1992.</p></div><div className="footer-contact"><p>FALE COM A TERRA</p><a href="tel:+5512991503502">(12) 99150-3502</a></div><div className="footer-social"><p>ACOMPANHE O DOUTOR MINHOCA</p><div className="social-links"><a href="https://www.facebook.com/doutorminhoca" target="_blank" rel="noreferrer" aria-label="Facebook do Doutor Minhoca"><SocialIcon network="facebook" /><span>Facebook</span></a><a href="https://www.instagram.com/doutor_minhoca/" target="_blank" rel="noreferrer" aria-label="Instagram do Doutor Minhoca"><SocialIcon network="instagram" /><span>Instagram</span></a><a href="https://www.tiktok.com/@doutorminhoca" target="_blank" rel="noreferrer" aria-label="TikTok do Doutor Minhoca"><SocialIcon network="tiktok" /><span>TikTok</span></a><a href="https://www.youtube.com/@doutorminhoca" target="_blank" rel="noreferrer" aria-label="YouTube do Doutor Minhoca"><SocialIcon network="youtube" /><span>YouTube</span></a></div></div></div><div className="copyright container"><span>© {new Date().getFullYear()} Doutor Minhoca</span><span>Feito para quem cultiva com cuidado.</span></div></footer>
  </main>;
}
