'use client';

import { PulseBeams } from './components/PulseBeams';
import { GlowCard } from './components/GlowCard';
import { Testimonials } from './components/Testimonials';
import { EventTicket } from './components/EventTicket';
import { useEffect, useState } from 'react';

const BLUE = '#1f22f2';
const DARK = '#0a0a0a';
const WHITE = '#ffffff';
const BG = '#f5f0e8';    // sfondo chiaro ivory
const TEXT = '#1a1a1a';  // testo scuro

const s = {
  section: {
    maxWidth: 760,
    margin: '0 auto',
    padding: 'clamp(48px, 8vw, 80px) 24px',
  } as React.CSSProperties,
  label: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: BLUE,
    marginBottom: 20,
  },
  h2: {
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontStyle: 'italic',
    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
    fontWeight: 400,
    color: TEXT,
    lineHeight: 1.15,
    marginBottom: 32,
  },
  body: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
    color: 'rgba(10,10,10,0.65)',
    lineHeight: 1.75,
  },
  divider: {
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 0,
  },
};

/* ── Countdown ───────────────────────────── */

const Countdown = () => {
  const [time, setTime] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const target = new Date('2026-06-14T10:00:00');
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const Unit = ({ n, label }: { n: number | null; label: string }) => (
    <div style={{ textAlign: 'center', minWidth: 64 }}>
      <p style={{
        fontFamily: "'Libre Baskerville', Georgia, serif",
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        color: TEXT,
        lineHeight: 1,
        marginBottom: 6,
      }}>{n === null ? '—' : String(n).padStart(2, '0')}</p>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.4)' }}>{label}</p>
    </div>
  );

  return (
    <div style={{ ...s.section, textAlign: 'center' }}>
      <p style={s.label}>L'evento inizia tra</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px, 4vw, 48px)', flexWrap: 'wrap' }}>
        <Unit n={time?.days ?? null} label="giorni" />
        <Unit n={time?.hours ?? null} label="ore" />
        <Unit n={time?.minutes ?? null} label="minuti" />
        <Unit n={time?.seconds ?? null} label="secondi" />
      </div>
    </div>
  );
};

/* ── helpers ─────────────────────────────── */

const Dot = () => (
  <span style={{ color: BLUE, marginRight: 10 }}>●</span>
);

const Step = ({ n, title, items }: { n: string; title: string; items: string[] }) => (
  <div style={{ marginBottom: 40 }}>
    <p style={{ ...s.label, marginBottom: 8 }}>Passo {n}</p>
    <h3 style={{
      fontFamily: "'Libre Baskerville', Georgia, serif",
      fontStyle: 'italic',
      fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
      fontWeight: 400,
      color: TEXT,
      marginBottom: 16,
    }}>{title}</h3>
    <ul style={{ listStyle: 'none', padding: 0, ...s.body }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 10 }}>
          <Dot /><span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Faq = ({ q, a }: { q: string; a: string }) => (
  <div style={{ marginBottom: 36, borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: 36 }}>
    <p style={{
      fontFamily: "'Libre Baskerville', Georgia, serif",
      fontStyle: 'italic',
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      color: TEXT,
      marginBottom: 10,
    }}>{q}</p>
    <p style={s.body}>{a}</p>
  </div>
);

const Ticket = ({
  name,
  tagline,
  price,
  items,
  highlight = false,
  href = '#acquista',
}: {
  name: string;
  tagline: string;
  price: string;
  items: string[];
  highlight?: boolean;
  href?: string;
}) => (
  <GlowCard highlight={highlight} className="flex-1 min-w-[260px] max-w-full">
    {highlight && (
      <p style={{ ...s.label, marginBottom: 12 }}>Più scelto</p>
    )}
    <p style={{
      fontFamily: "'Libre Baskerville', Georgia, serif",
      fontStyle: 'italic',
      fontSize: '1.3rem',
      color: WHITE,
      marginBottom: 6,
    }}>{name}</p>
    <p style={{ ...s.body, fontSize: '0.85rem', marginBottom: 20, color: 'rgba(255,255,255,0.5)' }}>{tagline}</p>
    <p style={{
      fontFamily: "'Libre Baskerville', Georgia, serif",
      fontSize: 'clamp(2rem, 5vw, 2.8rem)',
      color: WHITE,
      marginBottom: 24,
    }}>{price}</p>
    <ul style={{ listStyle: 'none', padding: 0, ...s.body, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', flex: 1 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 10 }}>
          <Dot /><span>{item}</span>
        </li>
      ))}
    </ul>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        marginTop: 28,
        background: highlight ? BLUE : 'transparent',
        border: highlight ? 'none' : `1px solid rgba(255,255,255,0.25)`,
        color: WHITE,
        padding: '14px 0',
        borderRadius: 50,
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        fontWeight: 500,
        textDecoration: 'none',
        textAlign: 'center',
        letterSpacing: '0.03em',
      }}
    >
      Scegli questo →
    </a>
  </GlowCard>
);

/* ── pulse beams config ──────────────────── */

const GRADIENT_COLORS = { start: '#1f22f2', middle: '#1f22f2', end: '#ffffff' };

const makeBeams = (cx: number, cy: number) => [
  {
    path: `M0,${cy} H${cx - 120}`,
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '0%', y2: '0%' },
      animate: { x1: ['0%', '100%', '100%'], x2: ['0%', '90%', '90%'], y1: ['0%', '0%', '0%'], y2: ['0%', '0%', '0%'] },
      transition: { duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 1.5, delay: 0 },
    },
    connectionPoints: [{ cx: 0, cy, r: 4 }, { cx: cx - 120, cy, r: 4 }],
  },
  {
    path: `M900,${cy} H${cx + 120}`,
    gradientConfig: {
      initial: { x1: '100%', x2: '100%', y1: '0%', y2: '0%' },
      animate: { x1: ['100%', '0%', '0%'], x2: ['100%', '10%', '10%'], y1: ['0%', '0%', '0%'], y2: ['0%', '0%', '0%'] },
      transition: { duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 1.5, delay: 0.4 },
    },
    connectionPoints: [{ cx: 900, cy, r: 4 }, { cx: cx + 120, cy, r: 4 }],
  },
  {
    path: `M${cx - 200},0 V${cy - 60}`,
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '0%', y2: '0%' },
      animate: { x1: ['0%', '0%', '0%'], x2: ['0%', '0%', '0%'], y1: ['0%', '100%', '100%'], y2: ['0%', '90%', '90%'] },
      transition: { duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 1.5, delay: 0.8 },
    },
    connectionPoints: [{ cx: cx - 200, cy: 0, r: 4 }, { cx: cx - 200, cy: cy - 60, r: 4 }],
  },
  {
    path: `M${cx + 200},0 V${cy - 60}`,
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '0%', y2: '0%' },
      animate: { x1: ['0%', '0%', '0%'], x2: ['0%', '0%', '0%'], y1: ['0%', '100%', '100%'], y2: ['0%', '90%', '90%'] },
      transition: { duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 1.5, delay: 1.2 },
    },
    connectionPoints: [{ cx: cx + 200, cy: 0, r: 4 }, { cx: cx + 200, cy: cy - 60, r: 4 }],
  },
  {
    path: `M${cx - 300},320 C${cx - 300},${cy + 40} ${cx - 120},${cy + 40} ${cx - 120},${cy}`,
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '100%', y2: '80%' },
      animate: { x1: ['0%', '100%', '100%'], x2: ['0%', '90%', '90%'], y1: ['100%', '20%', '20%'], y2: ['80%', '0%', '0%'] },
      transition: { duration: 2.5, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 1.5, delay: 0.6 },
    },
    connectionPoints: [{ cx: cx - 300, cy: 320, r: 4 }, { cx: cx - 120, cy, r: 3 }],
  },
  {
    path: `M${cx + 300},320 C${cx + 300},${cy + 40} ${cx + 120},${cy + 40} ${cx + 120},${cy}`,
    gradientConfig: {
      initial: { x1: '100%', x2: '100%', y1: '100%', y2: '80%' },
      animate: { x1: ['100%', '0%', '0%'], x2: ['100%', '10%', '10%'], y1: ['100%', '20%', '20%'], y2: ['80%', '0%', '0%'] },
      transition: { duration: 2.5, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 1.5, delay: 1.0 },
    },
    connectionPoints: [{ cx: cx + 300, cy: 320, r: 4 }, { cx: cx + 120, cy, r: 3 }],
  },
];

const CtaButton = ({ label, primary = true }: { label: string; primary?: boolean }) => (
  <a
    href="#acquista"
    style={{
      background: primary ? BLUE : 'transparent',
      border: primary ? 'none' : `1px solid rgba(255,255,255,0.25)`,
      color: WHITE,
      padding: '16px 40px',
      borderRadius: 50,
      fontFamily: 'Inter, sans-serif',
      fontSize: 16,
      fontWeight: 500,
      textDecoration: 'none',
      letterSpacing: '0.03em',
      display: 'inline-block',
      backdropFilter: 'blur(8px)',
    }}
  >
    {label}
  </a>
);

const PulseCtaSection = ({ label, caption }: { label: string; caption?: string }) => {
  const inner = (
    <div style={{ padding: 'clamp(48px, 8vw, 80px) 24px', textAlign: 'center' }}>
      {caption && (
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: BLUE,
          marginBottom: 20,
        }}>{caption}</p>
      )}
      <CtaButton label={label} />
    </div>
  );
  return (
    <div style={{ background: DARK }}>
      <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: 0 }} />
      {/* Desktop: con beams animati */}
      <div className="hidden sm:block">
        <PulseBeams beams={makeBeams(450, 160)} gradientColors={GRADIENT_COLORS} svgWidth={900} svgHeight={320}>
          {inner}
        </PulseBeams>
      </div>
      {/* Mobile: semplice CTA centrato */}
      <div className="sm:hidden">
        {inner}
      </div>
    </div>
  );
};

/* ── main component ──────────────────────── */

export const SalesPage = () => {
  return (
    <div style={{ background: BG, color: TEXT, position: 'relative', zIndex: 1 }}>

      {/* COUNTDOWN */}
      <hr style={s.divider} />
      <Countdown />

      {/* ROW 1 — I passi */}
      <hr style={s.divider} />
      <div style={s.section}>
        <p style={s.label}>I passi che faremo insieme</p>
        <Step
          n="1"
          title="Costruiamo la tua offerta"
          items={[
            "Cos'è un'offerta e a cosa serve.",
            'I 5 errori che ho visto fare durante la creazione dell\'offerta.',
            'I bisogni delle persone che vogliamo aiutare e come soddisfarli attraverso il nostro servizio.',
            "L'equazione di un'offerta — la creiamo nella pratica.",
            'Creiamo la tua offerta low ticket per dare accesso al tuo ecosistema.',
            'Il nome della tua offerta che conosce i bisogni del tuo target.',
            'Le garanzie che possiamo dare e quelle che non possiamo dare.',
            'I bonus: come strutturarli e come non strutturarli.',
          ]}
        />
      </div>

      {/* CTA 1 */}
      <PulseCtaSection label="Prenota il tuo posto →" />

      {/* ROW 2 — Cosa include */}
      <hr style={s.divider} />
      <div style={s.section}>
        <p style={s.label}>Cosa include il workshop</p>
        <h2 style={s.h2}>Non solo teoria.</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
          {[
            'Confronto e approfondimento',
            'Networking',
            'Tavola rotonda tra i partecipanti',
            'Feedback di gruppo',
            'La mia presenza per guidarti nel processo',
          ].map((item) => (
            <div key={item} style={{
              border: '1px solid rgba(0,0,0,0.15)',
              borderRadius: 40,
              padding: '10px 20px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              color: 'rgba(10,10,10,0.7)',
            }}>{item}</div>
          ))}
        </div>

        <p style={s.label}>Per chi è questo workshop</p>
        <p style={s.body}>
          Coach, terapeuti, professionisti del digital marketing (social media manager, copywriter, consulenti),
          chi ha un infoprodotto o vuole crearne uno.
        </p>
      </div>

      {/* CTA 2 */}
      <PulseCtaSection label="Assicurati il tuo posto →" caption="I posti sono limitati a 15" />

      {/* ROW 3 — Obiezioni emotive */}
      <hr style={s.divider} />
      <div style={s.section}>
        <p style={s.label}>Cose che potrebbero frullarti in testa</p>
        <h2 style={s.h2}>Risposte oneste.</h2>
        <Faq
          q="È un programma lungo?"
          a="Sono 5 ore, di cui la maggior parte pratica. Non passerai tutto il tempo ad ascoltare."
        />
        <Faq
          q="Quante persone ci saranno?"
          a="Non mi aspetto più di 15 partecipanti. Negli ultimi 4 eventi hanno partecipato più di 30 persone, anche per scelta. Questo è l'evento più completo tra i 4 che ho organizzato."
        />
        <Faq
          q="Il workshop è adatto anche a chi è agli inizi?"
          a="Sì. Anzi è il momento migliore per iniziare. Costruire l'offerta giusta dall'inizio ti evita di dover rifare tutto da capo più avanti."
        />
        <Faq
          q="C'è un modo per continuare a lavorare con te dopo il workshop?"
          a="Sì. Puoi scegliere il ticket che include una consulenza di approfondimento di 1 ora per definire i prossimi passi insieme."
        />
      </div>

      {/* ROW 4 — Chi sono */}
      <hr style={s.divider} />
      <div style={s.section}>
        <p style={s.label}>Chi sono</p>
        <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 56px)', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 40 }}>
          {/* Foto */}
          <img
            src="/alessio.jpg"
            alt="Alessio Ciriaco"
            style={{
              width: 'clamp(120px, 30vw, 200px)',
              aspectRatio: '3/4',
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: 16,
              flexShrink: 0,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }}
          />
          {/* Testo */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <h2 style={{ ...s.h2, marginBottom: 16 }}>Mi chiamo Alessio Ciriaco.</h2>
            <p style={{ ...s.body, marginBottom: 16 }}>
              Sono Business Strategist e Copywriter. Affianco professionisti che vendono servizi ad acquisire clienti
              e costruire un ecosistema di offerta che li rappresenta.
            </p>
            <p style={s.body}>
              In poche parole: se fai fatica a vendere il tuo servizio, lavoriamo sul tuo processo di vendita,
              capiamo dove stai sbagliando e aggiustiamo il tiro.
            </p>
          </div>
        </div>
        <div className="stats-grid" style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          {[
            { n: '4', label: 'eventi di formazione organizzati' },
            { n: '3', label: 'anni a costruire business con i professionisti' },
            { n: '+30', label: 'partecipanti agli eventi precedenti' },
          ].map(({ n, label }) => (
            <div key={label}>
              <p style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: TEXT,
                marginBottom: 4,
              }}>{n}</p>
              <p style={{ ...s.body, fontSize: '0.85rem' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 5 — Sei a un passo */}
      <hr style={s.divider} />
      <div style={{ ...s.section, textAlign: 'center' }}>
        <h2 style={{ ...s.h2, marginBottom: 8 }}>Sei a un passo dall'inizio.</h2>
        <p style={{ ...s.body, marginBottom: 32 }}>Prenota il tuo posto.</p>
      </div>

      {/* Event ticket */}
      <EventTicket />

      {/* Testimonials */}
      <Testimonials />

{/* ROW 6 — L'offerta (sezione scura per i ticket) */}
      <div id="acquista" style={{ background: DARK }}>
      <div style={{ ...s.section, color: WHITE }}>
        <p style={{ ...s.label }}>L'offerta</p>
        <h2 style={{ ...s.h2, color: WHITE }}>Scegli il tuo ticket.</h2>
        <div className="ticket-grid" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Ticket
            name="Alleanza base"
            tagline="Meno di una masterclass online — con zero pratica e zero confronto reale."
            price="30€"
            href="https://www.alleanzadeicreator.it/eventobasic-1ffb1f72"
            items={[
              'Partecipazione al workshop',
              'Materiali inediti per lavorare sulla tua offerta durante la giornata',
            ]}
          />
          <Ticket
            name="Alleanza + Manuali"
            tagline="Al prezzo di una cena per 2 che non ti farà guadagnare altri soldi. Questo evento invece sì."
            price="50€"
            href="https://www.alleanzadeicreator.it/eventobasic-abceca82"
            highlight
            items={[
              'Tutto quello che include Alleanza base',
              'Filo Rosso — Come vendere e fidelizzare la tua community attraverso le storie, senza sembrare un venditore',
              'Trova la nicchia dentro di te, non fuori — Come trovare la tua micro-nicchia senza chiuderti in una gabbia e costruire un business che ti assomiglia',
            ]}
          />
          <Ticket
            name="Alleanza Strategica"
            tagline="Questo ticket dovrebbe costare almeno il doppio. Il prezzo che vedi è riservato solo a chi sarà in sala il 14 giugno."
            href="https://www.alleanzadeicreator.it/eventobasic-6d042ebf"
            price="97€"
            items={[
              'Tutto quello che include Alleanza + Manuali',
              'Consulenza di approfondimento di 1 ora sulla creazione della tua offerta e i prossimi passi da fare insieme',
            ]}
          />
        </div>
      </div>
      </div>

      {/* CTA 3 */}
      <PulseCtaSection label="Scegli il tuo ticket →" caption="Scegli il tuo livello di partecipazione" />

      {/* ROW 7 — FAQ pratiche */}
      <hr style={s.divider} />
      <div style={s.section}>
        <p style={s.label}>FAQ</p>
        <Faq
          q="Hai bisogno della fattura?"
          a="Mandami tutti i dati a ciriacoalessio@gmail.com e ti mando la fattura."
        />
        <Faq
          q="Cosa succede se non riesco a venire?"
          a="Il biglietto non è rimborsabile, ma puoi convertirlo in uno sconto su un manuale o una consulenza."
        />
        <Faq
          q="Cosa succede se annullo l'evento?"
          a="Se annullo l'evento sarai rimborsato o potrai avere una consulenza strategica sul tuo problema specifico."
        />
        <Faq
          q="Riceverò i materiali anche se non riesco a venire?"
          a="No. I materiali sono pensati per essere usati durante il workshop, in modo pratico e guidato. Per questo ti consiglio di assicurarti il posto con anticipo."
        />
      </div>

      {/* Footer */}
      <hr style={s.divider} />
      <div style={{ ...s.section, textAlign: 'center', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(10,10,10,0.35)' }}>
          Alessio Ciriaco │ P.IVA 13113240017
        </p>
        <a
          href="https://www.iubenda.com/privacy-policy/68711795"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8rem',
            color: 'rgba(10,10,10,0.35)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(10,10,10,0.2)',
            paddingBottom: 1,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(10,10,10,0.8)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(10,10,10,0.35)')}
        >
          Privacy Policy
        </a>
      </div>

    </div>
  );
};

export default SalesPage;
