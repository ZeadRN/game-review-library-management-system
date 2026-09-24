import FeatureShowcasePage from '../components/FeatureShowcasePage'

function TradeEscrow() {
  return (
    <FeatureShowcasePage
      title="Trade Safety Escrow"
      subtitle="A safer exchange flow for user-to-user game swaps and high-value trades."
      description="Escrow holds trade value or confirmation steps until both users complete their side of the deal. That lowers friction and builds trust in swaps."
      icon="fa-shield-alt"
      accent="#0984e3"
      workspaceType="escrow"
      stats={[
        { value: '3', label: 'verification checkpoints' },
        { value: '0', label: 'manual chasing' },
        { value: '100%', label: 'trade clarity' }
      ]}
      highlights={[
        {
          icon: 'fa-lock',
          title: 'Protected handoff',
          description: 'Keep the exchange pending until both parties confirm the swap terms are met.'
        },
        {
          icon: 'fa-file-signature',
          title: 'Trade records',
          description: 'Track offer details, confirmation timestamps, and dispute notes in one place.'
        },
        {
          icon: 'fa-user-shield',
          title: 'Confidence boost',
          description: 'Give users the confidence to trade without worrying about unsafe direct swaps.'
        }
      ]}
      steps={[
        'A user proposes a trade and the system records the item, value, and conditions.',
        'Both users confirm the deal before the swap is released.',
        'Escrow closes the trade only after the confirmation flow is complete.'
      ]}
      primaryAction={{ to: '/contact', label: 'Contact Support' }}
      secondaryAction={{ to: '/register', label: 'Create Account' }}
      note="A trust-first trade flow is key if the site expands into swaps and higher-value exchanges."
    />
  )
}

export default TradeEscrow