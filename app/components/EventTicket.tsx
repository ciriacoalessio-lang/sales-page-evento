'use client';

import { TiltCard } from './TiltCard';

const BLUE = '#1f22f2';
const DARK = '#0a0a0a';

export const EventTicket = () => {
  return (
    <section style={{ background: DARK, padding: '80px 24px', textAlign: 'center' }}>
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        .ticket-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
          animation: shimmer 4s ease-in-out infinite;
          pointer-events: none;
          z-index: 30;
          overflow: hidden;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .ticket-right-strip { display: flex; }
        .ticket-stub { width: 90px; flex-shrink: 0; }
        @media (max-width: 520px) {
          .ticket-right-strip { display: none !important; }
          .ticket-stub { width: 56px !important; }
        }
      `}</style>

      {/* Label + title */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: BLUE,
        marginBottom: 16,
      }}>Il tuo posto ti aspetta</p>
      <h2 style={{
        fontFamily: "'Libre Baskerville', Georgia, serif",
        fontStyle: 'italic',
        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
        fontWeight: 400,
        color: '#ffffff',
        marginBottom: 48,
        lineHeight: 1.15,
      }}>Immagina il tuo nome qui.</h2>

      {/* Ticket wrapper — notches + TiltCard */}
      <div style={{ position: 'relative', display: 'inline-flex', maxWidth: 660, width: '100%' }}>

        {/* Left notch */}
        <div style={{
          position: 'absolute', left: -13, top: '50%', transform: 'translateY(-50%)',
          width: 26, height: 26, borderRadius: '50%', background: DARK, zIndex: 20,
        }} />
        {/* Right notch */}
        <div style={{
          position: 'absolute', right: -13, top: '50%', transform: 'translateY(-50%)',
          width: 26, height: 26, borderRadius: '50%', background: DARK, zIndex: 20,
        }} />

        <TiltCard
          tiltLimit={7}
          scale={1.02}
          effect="gravitate"
          spotlight
          className="ticket-shimmer w-full"
          style={{
            background: '#111111',
            border: `1px solid rgba(31,34,242,0.35)`,
            borderRadius: 20,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            minHeight: 220,
            boxShadow: `0 0 60px rgba(31,34,242,0.15), 0 20px 60px rgba(0,0,0,0.6)`,
          }}
        >
          {/* Left stub */}
          <div className="ticket-stub" style={{
            flexShrink: 0,
            background: BLUE,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 0',
            position: 'relative',
            gap: 8,
          }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 10,
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.9)',
              textTransform: 'uppercase',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}>Assembliamo la tua offerta</span>
            <div style={{
              width: 32,
              height: 1,
              background: 'rgba(255,255,255,0.4)',
              margin: '8px 0',
            }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.85)',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              letterSpacing: '0.05em',
            }}>14.06.2026</span>
          </div>

          {/* Dashed separator */}
          <div style={{
            width: 1,
            background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 6px, transparent 6px, transparent 12px)',
            flexShrink: 0,
          }} />

          {/* Main content */}
          <div style={{
            flex: 1,
            padding: '28px 28px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'left',
          }}>
            <div>
              {/* Placeholder name */}
              <div style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: 8,
                letterSpacing: '-0.01em',
              }}>
                Il tuo nome<span className="cursor-blink" style={{ color: BLUE, marginLeft: 2 }}>|</span>
              </div>

              {/* Role */}
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 2,
              }}>Ruolo</p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.75)',
                marginBottom: 14,
              }}>Freelancer</p>

              {/* Obiettivo */}
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8rem',
                color: BLUE,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 2,
              }}>Obiettivo</p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.5,
              }}>Costruire un'offerta per il mio cliente ideale</p>
            </div>

            {/* Bottom info */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16, marginTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 10,
                    color: BLUE,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}>IN PRESENZA</p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.5)',
                  }}>Torino, via Bertola 51 · 10:00–17:00</p>
                </div>
                {/* Ticket number */}
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.1em',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  #A-2026-0{Math.floor(Math.random() * 9 + 1)}
                </div>
              </div>
            </div>
          </div>

          {/* Right decorative strip */}
          <div className="ticket-right-strip" style={{
            width: 72,
            flexShrink: 0,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 12px',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            gap: 12,
          }}>
            {/* QR placeholder */}
            <div style={{
              width: 48,
              height: 48,
              border: `1px solid rgba(31,34,242,0.4)`,
              borderRadius: 6,
              display: 'grid',
              gridTemplateColumns: 'repeat(5,1fr)',
              gridTemplateRows: 'repeat(5,1fr)',
              gap: 2,
              padding: 6,
              opacity: 0.6,
            }}>
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} style={{
                  background: [0,1,5,6,4,9,15,20,21,24,23,19,12,13].includes(i)
                    ? BLUE : 'transparent',
                  borderRadius: 1,
                }} />
              ))}
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 8,
              color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textAlign: 'center',
              lineHeight: 1.4,
            }}>Il tuo<br />posto</p>
          </div>
        </TiltCard>
      </div>

      {/* Sub-caption */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.3)',
        marginTop: 24,
        letterSpacing: '0.03em',
      }}>I posti sono 15. Prenota il tuo e il tuo nome sarà qui.</p>
    </section>
  );
};
