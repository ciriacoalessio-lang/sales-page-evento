'use client';

import { TiltCard } from './TiltCard';

const BLUE = '#1f22f2';
const IVORY = '#f5f0e8';

const reviews = [
  {
    quote: 'È stata una mattina meravigliosa fatta di scambi concreti che hanno aperto porte che altrimenti ognuno di noi non avrebbe esplorato. Tutto molto stimolante.',
    name: 'Eliana',
    role: 'Personal Brand',
  },
  {
    quote: 'Uno scambio che ti apre la mente ad altre prospettive che da solo non avresti considerato. Ci sarò sicuramente al prossimo.',
    name: 'Noemi',
    role: 'Social Media Manager',
  },
  {
    quote: 'Ha saputo darci degli ottimi spunti di riflessione sui nostri business e su come impacchettare un\'offerta che sia ben calata su di noi e sul nostro target.',
    name: 'Simone',
    role: 'Designer',
  },
  {
    quote: 'Il workshop è stato davvero illuminante, mi ha dato una visione più ampia di ciò che vorrei portare nella mia professione. Sei stato davvero molto disponibile.',
    name: 'Veronica',
    role: 'Coach',
  },
];

// duplicate for seamless loop
const allReviews = [...reviews, ...reviews];

export const Testimonials = () => {
  return (
    <section style={{ background: IVORY, padding: '80px 0', overflow: 'hidden' }}>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: marquee 32s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: 760, margin: '0 auto 48px', padding: '0 24px' }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: BLUE,
          marginBottom: 16,
        }}>Chi ha già partecipato</p>
        <h2 style={{
          fontFamily: "'Libre Baskerville', Georgia, serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400,
          color: '#0a0a0a',
          lineHeight: 1.15,
        }}>Cosa dicono i partecipanti.</h2>
      </div>

      {/* Marquee */}
      <div style={{ paddingLeft: 24 }}>
        <div className="marquee-track">
          {allReviews.map((r, i) => (
            <TiltCard
              key={i}
              tiltLimit={8}
              scale={1.02}
              className="rounded-2xl shadow-md flex-shrink-0"
              style={{
                width: 300,
                background: '#ffffff',
                border: `1px solid rgba(31,34,242,0.15)`,
                padding: '28px 24px',
                cursor: 'default',
              }}
            >
              <div style={{ position: 'relative', zIndex: 20 }}>
                {/* Stars */}
                <div style={{ marginBottom: 16, color: BLUE, fontSize: 14, letterSpacing: 2 }}>
                  {'★★★★★'}
                </div>
                {/* Quote */}
                <p style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  color: '#1a1a1a',
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}>"{r.quote}"</p>
                {/* Author */}
                <div style={{ borderTop: `1px solid rgba(31,34,242,0.1)`, paddingTop: 16 }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: BLUE,
                    marginBottom: 2,
                  }}>{r.name}</p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    color: '#888',
                  }}>{r.role}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
