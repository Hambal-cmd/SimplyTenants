import ComingSoon from '../components/ui/ComingSoon'

export default function LegalHelp() {
  return (
    <ComingSoon
      title="Legal help is coming soon"
      description="Ask questions about your tenancy and get a draft rental agreement, based on Indian tenancy rules."
      features={[
        'Plain-language answers about deposits, notice periods, and rent increases',
        'Rental agreement drafts built from reviewed templates',
        'Clear notes on what the bot cannot advise on',
      ]}
      image="/legalhelp.jpg"
      imageAlt="Stamp on document"
    />
  )
}
