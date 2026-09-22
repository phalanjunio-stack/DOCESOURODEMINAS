"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SoundFX } from "./fx";

const BACKGROUND = "/images/links-bg.png";

const INSTAGRAM = "https://www.instagram.com/docesourodeminas";
const GRANFRUTALLE = "https://www.instagram.com/granfrutalleoficila_grupodom";

function GlobeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 4C10 5 5 10 5 18c5 1 12-1 14-14Z" />
      <path d="M4 21c3-6 7-9 13-12" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1 13H6L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

export function MobileGate({ shopUrl }: { shopUrl: string }) {
  const [leaving, setLeaving] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    // Só trava a rolagem quando a tela realmente aparece (breakpoint do CSS).
    if (!window.matchMedia("(max-width: 760px)").matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [dismissed]);

  if (dismissed) return null;

  const enterSite = () => {
    SoundFX.open();
    setLeaving(true);
    window.setTimeout(() => setDismissed(true), 320);
  };

  return (
    <div className={leaving ? "mobile-gate is-leaving" : "mobile-gate"} role="dialog" aria-label="Doces Ouro de Minas — links">
      <div className="gate-bg">
        <Image src={BACKGROUND} alt="" fill priority sizes="100vw" />
      </div>
      <div className="gate-content">
        <div className="gate-logo">
          <Image src="/images/logo-ouro-de-minas.png" alt="Doces Ouro de Minas" fill priority sizes="200px" />
        </div>
        <p className="gate-tagline">Sabores que contam histórias</p>
        <span className="gate-ornament" aria-hidden="true" />
        <nav className="gate-links">
          <button type="button" className="gate-link" onClick={enterSite}>
            <GlobeIcon />
            <span><strong>Site Oficial</strong></span>
            <i aria-hidden="true">→</i>
          </button>
          <a className="gate-link" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            <span><strong>Instagram</strong><small>@docesourodeminas</small></span>
            <i aria-hidden="true">→</i>
          </a>
          <a className="gate-link" href={GRANFRUTALLE} target="_blank" rel="noopener noreferrer">
            <LeafIcon />
            <span><strong>Granfrutalle</strong></span>
            <i aria-hidden="true">→</i>
          </a>
          <a className="gate-link is-shop" href={shopUrl} target="_blank" rel="noopener noreferrer">
            <BagIcon />
            <span><strong>Comprar na Shopee</strong></span>
            <i aria-hidden="true">→</i>
          </a>
        </nav>
      </div>
    </div>
  );
}
