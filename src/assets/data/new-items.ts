export interface EventItem {
  img: string
  alt: string
  title: string
  venue: string
  date: {
    month: string
    day: string
  }
  slug: string
  description: string
  eventLink: string
  status: string
}

export const upcomingEvents: EventItem[] = [
  {
    slug: 'surkhet-district-player-selection-trials',
    img: '/images/football.webp',
    alt: 'Surkhet District Player Selection Trials',
    title: 'Surkhet District Player Selection Trials',
    venue: 'Rangasala Stadium, Birendranagar',
    date: { month: 'JUN', day: '05' },
    description:
      'Open selection trials for regional players looking to represent Surkhet district in the upcoming provincial club championships. Full kits required.',
    eventLink: '/event/surkhet-district-player-selection-trials',
    status: 'open'
  },
  {
    slug: 'anfa-community-referee-training-clinic',
    img: '/images/football.webp',
    alt: 'ANFA Community Referee Training Clinic',
    title: 'ANFA Community Referee Training Clinic',
    venue: 'KPFA Academy Hall, Dailekh',
    date: { month: 'JUN', day: '18' },
    description:
      'A multi-day intensive entry-level clinic for aspiring referees, covering official laws of the game, physical fitness exams, and fair play standards.',
    eventLink: '/event/anfa-community-referee-training-clinic',
    status: 'open'
  },
  {
    slug: 'karnali-grassroots-youth-football-festival',
    img: '/images/football.webp',
    alt: 'Karnali Grassroots Youth Football Festival',
    title: 'Karnali Grassroots Youth Football Festival',
    venue: 'Provincial Stadium Grounds',
    date: { month: 'JUL', day: '02' },
    description:
      'An exciting day of small-sided matches and skill drills open for young local boys and girls aged 6 to 12 to foster community engagement.',
    eventLink: '/event/karnali-grassroots-youth-football-festival',
    status: 'open'
  }
]
