import FeatureShowcasePage from '../components/FeatureShowcasePage'

function LiveStreamingHub() {
  return (
    <FeatureShowcasePage
      title="Live Streaming Hub"
      subtitle="A central place to follow live gameplay, launches, and creator showcases."
      description="Users can discover featured streams, event broadcasts, and highlight reels without leaving the gaming marketplace experience."
      icon="fa-video"
      accent="#e84393"
      workspaceType="streaming"
      stats={[
        { value: 'Live', label: 'stream status' },
        { value: '3', label: 'featured channels' },
        { value: '1 feed', label: 'for events and launches' }
      ]}
      highlights={[
        {
          icon: 'fa-broadcast-tower',
          title: 'Live now panels',
          description: 'Spot currently streaming creators and event broadcasts in a dedicated visual feed.'
        },
        {
          icon: 'fa-calendar-day',
          title: 'Schedule highlights',
          description: 'Surface upcoming streams so users can plan around tournaments, previews, and drops.'
        },
        {
          icon: 'fa-play-circle',
          title: 'Replay friendly',
          description: 'Promote clips and replays for users who miss a live session but still want the highlights.'
        }
      ]}
      steps={[
        'Admins or partners publish live stream links and event schedules.',
        'Visitors browse the hub to see what is live now or coming up next.',
        'Users jump into a stream or event without leaving the platform flow.'
      ]}
      primaryAction={{ to: '/events', label: 'Open Events' }}
      secondaryAction={{ to: '/help', label: 'Get Support' }}
      note="This feature blends content discovery with community engagement and event promotion."
    />
  )
}

export default LiveStreamingHub