import FeatureShowcasePage from '../components/FeatureShowcasePage'

function AchievementBadges() {
  return (
    <FeatureShowcasePage
      title="Achievement Badges"
      subtitle="Reward users for activity, consistency, and community contribution."
      description="Badges turn routine actions into visible milestones. Users unlock rewards for buying games, leaving reviews, joining events, and helping other members."
      icon="fa-medal"
      accent="#f39c12"
      workspaceType="badges"
      stats={[
        { value: '12', label: 'starter badges' },
        { value: '3', label: 'badge tiers' },
        { value: '1 profile', label: 'to showcase them' }
      ]}
      highlights={[
        {
          icon: 'fa-trophy',
          title: 'Progress milestones',
          description: 'Celebrate repeat purchases, completed trades, and long-term platform activity.'
        },
        {
          icon: 'fa-comments',
          title: 'Community rewards',
          description: 'Encourage reviews, discussions, and helpful posts that improve the marketplace for everyone.'
        },
        {
          icon: 'fa-crown',
          title: 'Profile prestige',
          description: 'Show earned badges on the user dashboard so reputation is easy to see at a glance.'
        }
      ]}
      steps={[
        'A user completes an action such as buying, trading, or reviewing a game.',
        'The badge system checks milestones and unlocks the matching reward.',
        'Badges appear on the profile, dashboard, and leaderboard views.'
      ]}
      primaryAction={{ to: '/user-dashboard', label: 'View Dashboard' }}
      secondaryAction={{ to: '/leaderboard', label: 'See Rankings' }}
      note="This feature makes progress visible and gives returning users a reason to stay active."
    />
  )
}

export default AchievementBadges