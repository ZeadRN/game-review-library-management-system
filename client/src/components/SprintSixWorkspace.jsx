import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const DEFAULT_STREAMS = [
  { title: 'Arena Warmup', creator: 'Maya Streams', category: 'Competitive', status: 'LIVE', viewers: 1240, url: 'https://www.twitch.tv' },
  { title: 'Building Kingdoms at Dawn', creator: 'Tactics Lab', category: 'Strategy', status: 'LIVE', viewers: 684, url: 'https://www.youtube.com' },
  { title: 'Indie Discovery Showcase', creator: 'Gambit Picks', category: 'Indie', status: 'UP NEXT', viewers: 0, url: 'https://www.youtube.com' }
]

function SprintSixWorkspace({ type }) {
  const [listings, setListings] = useState([])
  const [category, setCategory] = useState('All')
  const [budget, setBudget] = useState('100')
  const [selectedGame, setSelectedGame] = useState(null)
  const [coachMode, setCoachMode] = useState('Beginner')
  const [tip, setTip] = useState('')
  const [trade, setTrade] = useState({ game: '', partner: '', note: '' })
  const [tradeStatus, setTradeStatus] = useState('Draft')
  const [streamFilter, setStreamFilter] = useState('All')
  const [streams, setStreams] = useState(DEFAULT_STREAMS)
  const [profile, setProfile] = useState(null)
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    if (type === 'recommendations' || type === 'coach') {
      fetch('/api/listings').then(res => res.json()).then(data => setListings(data.listings || [])).catch(() => setListings([]))
    }
    if (type === 'badges') {
      Promise.all([
        fetch('/api/user/profile').then(res => res.json()),
        fetch('/api/user/purchases').then(res => res.json())
      ]).then(([profileData, purchasesData]) => {
        setProfile(profileData.user || null)
        setPurchases(purchasesData.purchases || [])
      }).catch(() => {})
    }
    if (type === 'streaming') {
      const savedStreams = localStorage.getItem('liveStreams')
      if (savedStreams) setStreams(JSON.parse(savedStreams))
    }
  }, [type])

  if (type === 'recommendations') {
    const categories = ['All', ...new Set(listings.map(listing => listing.category_name).filter(Boolean))]
    const matches = listings.filter(listing => (
      (category === 'All' || listing.category_name === category) && Number(listing.price) <= Number(budget)
    )).slice(0, 6)

    return (
      <section className="container" style={{ padding: '2.5rem 0' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end', marginBottom: '1.5rem' }}>
            <div className="form-group" style={{ margin: 0, minWidth: '190px' }}>
              <label htmlFor="recommendation-category">Genre</label>
              <select id="recommendation-category" value={category} onChange={event => setCategory(event.target.value)}>
                {categories.map(item => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0, minWidth: '190px' }}>
              <label htmlFor="recommendation-budget">Maximum budget</label>
              <input id="recommendation-budget" type="number" min="1" value={budget} onChange={event => setBudget(event.target.value)} />
            </div>
            <span style={{ color: 'var(--gray)' }}>{matches.length} matched games</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {matches.map(game => (
              <div key={game.listing_id} className="game-card">
                <h3>{game.game_name}</h3>
                <p style={{ color: 'var(--gray)' }}>{game.category_name || 'Game'} · {game.rating_avg || 0}/5</p>
                <strong>${Number(game.price).toFixed(2)}</strong>
                <Link to={`/game/${game.listing_id}`} className="btn btn-primary" style={{ display: 'block', marginTop: '1rem', textAlign: 'center' }}>View game</Link>
              </div>
            ))}
          </div>
          {matches.length === 0 && <p style={{ color: 'var(--gray)' }}>No games match those preferences yet.</p>}
        </div>
      </section>
    )
  }

  if (type === 'badges') {
    const purchaseCount = purchases.length
    const badges = [
      { icon: 'fa-shopping-bag', name: 'First Purchase', progress: Math.min(purchaseCount, 1), target: 1 },
      { icon: 'fa-star', name: 'Collector', progress: Math.min(purchaseCount, 5), target: 5 },
      { icon: 'fa-user-circle', name: 'Profile Ready', progress: profile?.bio ? 1 : 0, target: 1 },
      { icon: 'fa-coins', name: 'Seller', progress: Number(profile?.total_sales || 0) > 0 ? 1 : 0, target: 1 }
    ]

    return (
      <section className="container" style={{ padding: '2.5rem 0' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2>{profile ? `${profile.username}'s badge progress` : 'Your badge progress'}</h2>
          <p style={{ color: 'var(--gray)' }}>Complete marketplace actions to unlock profile badges.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
            {badges.map(badge => (
              <div key={badge.name} className="game-card" style={{ textAlign: 'center' }}>
                <i className={`fas ${badge.icon}`} style={{ fontSize: '2rem', color: badge.progress === badge.target ? 'var(--success)' : 'var(--primary)' }}></i>
                <h3>{badge.name}</h3>
                <p>{badge.progress}/{badge.target} complete</p>
                <progress value={badge.progress} max={badge.target} style={{ width: '100%' }} />
              </div>
            ))}
          </div>
          {!profile && <Link to="/login" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Log in to track badges</Link>}
        </div>
      </section>
    )
  }

  if (type === 'streaming') {
    const filteredStreams = streams.filter(stream => streamFilter === 'All' || stream.status === streamFilter)
    return (
      <section className="container" style={{ padding: '2.5rem 0' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <h2>Creator broadcast directory</h2>
            <select value={streamFilter} onChange={event => setStreamFilter(event.target.value)} aria-label="Filter streams">
              <option>All</option><option>LIVE</option><option>UP NEXT</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem' }}>
            {filteredStreams.map(stream => (
              <div key={stream.title} className="game-card">
                <span style={{ color: stream.status === 'LIVE' ? 'var(--danger)' : 'var(--primary)', fontWeight: 'bold' }}>{stream.status}</span>
                <h3>{stream.title}</h3>
                <p>{stream.creator} · {stream.category}</p>
                <p style={{ color: 'var(--gray)' }}>{stream.viewers ? `${stream.viewers.toLocaleString()} watching` : 'Starts soon'}</p>
                <a href={stream.url} target="_blank" rel="noreferrer" className="btn btn-primary">Open broadcast</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (type === 'escrow') {
    const stages = ['Draft', 'Confirmed', 'Protected', 'Released']
    const stageIndex = stages.indexOf(tradeStatus)
    return (
      <section className="container" style={{ padding: '2.5rem 0' }}>
        <div className="card" style={{ padding: '1.5rem', maxWidth: '760px', margin: '0 auto' }}>
          <h2>Create a protected trade</h2>
          <div className="form-group"><label htmlFor="trade-game">Game or item</label><input id="trade-game" value={trade.game} onChange={event => setTrade({ ...trade, game: event.target.value })} placeholder="Example: Eternal Realms" /></div>
          <div className="form-group"><label htmlFor="trade-partner">Trading partner</label><input id="trade-partner" value={trade.partner} onChange={event => setTrade({ ...trade, partner: event.target.value })} placeholder="Username" /></div>
          <div className="form-group"><label htmlFor="trade-note">Trade terms</label><textarea id="trade-note" rows="3" value={trade.note} onChange={event => setTrade({ ...trade, note: event.target.value })} placeholder="Describe what each person sends" /></div>
          <button className="btn btn-primary" disabled={!trade.game || !trade.partner} onClick={() => setTradeStatus('Confirmed')}>Confirm trade terms</button>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginTop: '2rem' }}>
            {stages.map((stage, index) => <div key={stage} style={{ textAlign: 'center', color: index <= stageIndex ? 'var(--success)' : 'var(--gray)' }}><i className={`fas ${index <= stageIndex ? 'fa-check-circle' : 'fa-circle'}`}></i><small style={{ display: 'block' }}>{stage}</small></div>)}
          </div>
          {tradeStatus === 'Confirmed' && <button className="btn btn-secondary" style={{ marginTop: '1.5rem' }} onClick={() => setTradeStatus('Protected')}>Lock in escrow</button>}
          {tradeStatus === 'Protected' && <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setTradeStatus('Released')}>Release trade</button>}
        </div>
      </section>
    )
  }

  const generateTip = () => {
    if (!selectedGame) return
    const tips = {
      Beginner: `Start ${selectedGame.game_name} on the easiest setting, learn one core mechanic, and keep your first session focused on exploration.`,
      Intermediate: `For ${selectedGame.game_name}, build around one strength, review your first mistakes, and adjust your loadout before the next session.`,
      Advanced: `Master ${selectedGame.game_name} by tracking decisions between runs, optimizing your opening route, and practicing the highest-impact mechanic.`
    }
    setTip(tips[coachMode])
  }

  return (
    <section className="container" style={{ padding: '2.5rem 0' }}>
      <div className="card" style={{ padding: '1.5rem', maxWidth: '760px', margin: '0 auto' }}>
        <h2>Ask the coach about a game</h2>
        <div className="form-group"><label htmlFor="coach-game">Game</label><select id="coach-game" value={selectedGame?.listing_id || ''} onChange={event => setSelectedGame(listings.find(game => String(game.listing_id) === event.target.value) || null)}><option value="">Choose a game</option>{listings.map(game => <option key={game.listing_id} value={game.listing_id}>{game.game_name}</option>)}</select></div>
        <div className="form-group"><label htmlFor="coach-mode">Experience level</label><select id="coach-mode" value={coachMode} onChange={event => setCoachMode(event.target.value)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
        <button className="btn btn-primary" disabled={!selectedGame} onClick={generateTip}>Generate advice</button>
        {tip && <div className="card" style={{ marginTop: '1.5rem', background: 'var(--light)' }}><strong>Coach advice</strong><p style={{ marginBottom: 0 }}>{tip}</p></div>}
      </div>
    </section>
  )
}

export default SprintSixWorkspace
