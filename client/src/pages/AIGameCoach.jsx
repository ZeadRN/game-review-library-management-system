import FeatureShowcasePage from '../components/FeatureShowcasePage'

function AIGameCoach() {
  return (
    <FeatureShowcasePage
      title="AI Game Coach"
      subtitle="Instant strategy tips and play suggestions for different game types."
      description="The coach gives users lightweight guidance based on the game they are browsing, helping them decide whether a title fits their skill level and interests."
      icon="fa-robot"
      accent="#9b59b6"
      workspaceType="coach"
      stats={[
        { value: 'Instant', label: 'tip generation' },
        { value: '4', label: 'game style modes' },
        { value: 'Always on', label: 'support flow' }
      ]}
      highlights={[
        {
          icon: 'fa-chalkboard-teacher',
          title: 'Game-friendly guidance',
          description: 'Offer beginner, intermediate, or advanced tips that match the user profile.'
        },
        {
          icon: 'fa-route',
          title: 'Decision support',
          description: 'Help users decide whether to buy, compare, or wishlist a game using quick advice.'
        },
        {
          icon: 'fa-brain',
          title: 'Learning loop',
          description: 'Improve future tips by using previous browsing and comparison behavior as context.'
        }
      ]}
      steps={[
        'The user opens a game or comparison page and asks for guidance.',
        'The coach returns a short strategy summary and a next-best action.',
        'The user follows the advice to compare, subscribe, or buy with more confidence.'
      ]}
      primaryAction={{ to: '/compare', label: 'Compare Games' }}
      secondaryAction={{ to: '/subscription', label: 'Explore Plans' }}
      note="A lightweight coach keeps the site helpful without replacing the core marketplace flow."
    />
  )
}

export default AIGameCoach