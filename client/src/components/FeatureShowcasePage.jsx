import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import SprintSixWorkspace from './SprintSixWorkspace'

const defaultNavLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/help', label: 'Help' }
]

function FeatureShowcasePage({
  title,
  subtitle,
  description,
  icon,
  accent = 'var(--primary)',
  stats = [],
  highlights = [],
  steps = [],
  primaryAction,
  secondaryAction,
  note,
  workspaceType
}) {
  return (
    <>
      <Navbar links={defaultNavLinks} />

      <section
        className="hero"
        style={{
          padding: '90px 0',
          background: `linear-gradient(135deg, #0c0c1e 0%, ${accent} 45%, #1a1a3e 100%)`
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '1.5rem' }}>
            <i className={`fas ${icon}`} style={{ fontSize: '3rem', color: 'white' }}></i>
          </div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <p style={{ maxWidth: '760px' }}>{description}</p>

          <div className="hero-buttons">
            {primaryAction && (
              <Link to={primaryAction.to} className="btn btn-primary">
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link to={secondaryAction.to} className="btn btn-secondary">
                {secondaryAction.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: 'var(--light)' }}>
        <div className="container">
          {stats.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: accent }}>{stat.value}</div>
                  <div style={{ color: 'var(--gray)', marginTop: '0.35rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {highlights.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.25rem'
              }}
            >
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="card"
                  style={{
                    padding: '1.5rem',
                    borderTop: `4px solid ${accent}`,
                    minHeight: '220px'
                  }}
                >
                  <div style={{ fontSize: '2rem', color: accent, marginBottom: '1rem' }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <h3 style={{ marginBottom: '0.75rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--gray)', lineHeight: '1.8' }}>{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {workspaceType && <SprintSixWorkspace type={workspaceType} />}

      {steps.length > 0 && (
        <section style={{ padding: '4rem 0', background: 'white' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ marginBottom: '0.75rem' }}>How It Works</h2>
              <p style={{ color: 'var(--gray)' }}>A simple path from discovery to action.</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem'
              }}
            >
              {steps.map((step, index) => (
                <div key={step} className="card" style={{ padding: '1.5rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: accent,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      marginBottom: '1rem'
                    }}
                  >
                    {index + 1}
                  </div>
                  <p style={{ color: 'var(--gray)', lineHeight: '1.8' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {note && (
        <section style={{ padding: '2.5rem 0', background: 'var(--dark)', color: 'white' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.05rem' }}>{note}</p>
          </div>
        </section>
      )}
    </>
  )
}

export default FeatureShowcasePage