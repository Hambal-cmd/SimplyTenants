import ComingSoon from '../components/ui/ComingSoon'

export default function RoommateFinder() {
  return (
    <ComingSoon
      title="Roommate finder is coming soon"
      description="Swipe through profiles of students and working professionals who are also looking for a room, and match with people whose budget and habits fit yours."
      features={[
        'Swipe-style profiles with budget, area, and move-in date',
        'Matching on sleep schedule, cleanliness, and food habits',
        'Chat with a match before you commit to anything',
      ]}
      image="/roommates.jpg"
      imageAlt="Four roommates relaxing in a shared room with bunk beds"
    />
  )
}
