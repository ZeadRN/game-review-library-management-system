import FeatureShowcasePage from '../components/FeatureShowcasePage'

function SmartRecommendations() {
  return (
    <FeatureShowcasePage
      title="Smart Recommendations"
      subtitle="Personalized game picks that fit your taste, budget, and play style."
      description="This feature helps shoppers discover the right games faster by combining browsing history, wishlist activity, and category preferences into a tailored suggestion feed."
      icon="fa-lightbulb"
      accent="#00b894"
      workspaceType="recommendations"
      stats={[
        { value: '5', label: 'recommendation signals' },
        { value: '1 tap', label: 'to save a pick' },
        { value: '24/7', label: 'always updated' }
      ]}
      highlights={[
        {
          icon: 'fa-brain',
          title: 'Taste-aware matches',
          description: 'Show games based on genres, price range, and player preferences instead of generic lists.'
        },
        {
          icon: 'fa-tags',
          title: 'Deal discovery',
          description: 'Surface discounted titles and bundle offers that fit the user budget automatically.'
        },
        {
          icon: 'fa-heart',
          title: 'Wishlist synergy',
          description: 'Turn wishlist activity into a better feed so users keep seeing games they actually want.'
        }
      ]}
      steps={[
        'Users pick their favorite genres, platforms, and budget preferences.',
        'The system highlights games that best match those choices.',
        'Users can compare, wishlist, or buy from the recommendation feed.'
      ]}
      primaryAction={{ to: '/compare', label: 'Compare Games' }}
      secondaryAction={{ to: '/subscription', label: 'See Savings' }}
      note="Great for helping new visitors find a first purchase and for keeping returning users engaged."
    />
  )
}

export default SmartRecommendations