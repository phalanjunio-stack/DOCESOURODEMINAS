"use client";

import type { CSSProperties } from "react";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let gestured = false;
let lastHover = 0;

if (typeof window !== "undefined") {
  const mark = () => {
    gestured = true;
  };
  ["click", "keydown", "touchstart", "pointerdown"].forEach((event) =>
    window.addEventListener(event, mark, { once: true, capture: true }),
  );
}

function audio(): AudioContext | null {
  if (!gestured || typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.25;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume().catch(() => undefined);
  return ctx;
}

function note(type: OscillatorType, freq: number, start: number, dur: number, peak = 0.25, attack = 0.008, freqEnd?: number) {
  const ac = audio();
  if (!ac || !master) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (freqEnd != null) osc.frequency.exponentialRampToValueAtTime(freqEnd, start + dur);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(peak, start + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(gain);
  gain.connect(master);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

export const SoundFX = {
  hover() {
    const now = Date.now();
    if (now - lastHover < 80) return;
    lastHover = now;
    const t = audio()?.currentTime;
    if (t == null) return;
    note("sine", 1568, t, 0.1, 0.1, 0.006);
    note("sine", 3136, t + 0.004, 0.06, 0.04, 0.004);
  },
  click() {
    const t = audio()?.currentTime;
    if (t == null) return;
    note("sine", 880, t, 0.12, 0.18, 0.005);
    note("sine", 440, t + 0.002, 0.16, 0.1, 0.008);
  },
  open() {
    const t = audio()?.currentTime;
    if (t == null) return;
    note("sine", 880, t, 0.18, 0.18, 0.008);
    note("sine", 1320, t + 0.06, 0.16, 0.16, 0.008);
    note("sine", 2200, t + 0.1, 0.1, 0.05, 0.006);
  },
  close() {
    const t = audio()?.currentTime;
    if (t == null) return;
    note("sine", 600, t, 0.2, 0.28, 0.012, 300);
    note("sine", 1200, t + 0.02, 0.1, 0.05, 0.006);
  },
  magic() {
    const t = audio()?.currentTime;
    if (t == null) return;
    note("sine", 880, t, 0.34, 0.2, 0.012);
    note("sine", 1047, t, 0.26, 0.22, 0.006);
    note("sine", 1319, t + 0.04, 0.24, 0.2, 0.006);
    note("sine", 1568, t + 0.08, 0.22, 0.2, 0.006);
    note("sine", 2093, t + 0.13, 0.2, 0.18, 0.006);
    note("sine", 4186, t + 0.18, 0.14, 0.05, 0.004);
  },
  magicLow() {
    const t = audio()?.currentTime;
    if (t == null) return;
    note("sine", 1568, t, 0.26, 0.16, 0.01);
    note("sine", 2093, t, 0.16, 0.14, 0.005);
    note("sine", 2637, t + 0.028, 0.14, 0.13, 0.005);
    note("sine", 3136, t + 0.056, 0.12, 0.12, 0.005);
    note("sine", 4186, t + 0.084, 0.1, 0.11, 0.004);
    note("sine", 5274, t + 0.12, 0.08, 0.06, 0.004);
  },
};

const sparks = [
  { ang: "35deg", d: "1.8s", del: "0s" },
  { ang: "125deg", d: "2.1s", del: "0.4s" },
  { ang: "215deg", d: "1.7s", del: "0.7s" },
  { ang: "305deg", d: "2s", del: "0.2s" },
];

/** Camadas da aura dourada — usar dentro de um elemento com a classe `smoke-glow`. */
export function GlowFx() {
  return (
    <>
      <span className="sg-aura" />
      <span className="sg-halo" />
      {sparks.map((spark) => (
        <span
          key={spark.ang}
          className="sg-spark"
          style={{ "--ang": spark.ang, "--d": spark.d, "--del": spark.del } as CSSProperties}
        />
      ))}
    </>
  );
}
