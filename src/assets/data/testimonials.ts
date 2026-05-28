export interface NewsItem {
  slug?: string
  title: string
  category: 'Tournament' | 'Notice' | 'Academy' | 'Press Release'
  date: string
  summary: string
  content?: string
}

export const newsArticles: NewsItem[] = [
  {
    slug: 'chief-minister-cup-football-tournament-announced',
    title: 'Karnali Province Chief Minister Cup Football Tournament Announced',
    category: 'Tournament',
    date: 'May 24, 2026',
    summary:
      'The Karnali Province Football Association has officially declared the dates for the upcoming Chief Minister Cup. Clubs from all ten districts will compete in Birendranagar for the provincial title.',
    content:
      'The Karnali Province Football Association has announced the schedule for the Chief Minister Cup, bringing district champions across Karnali together for a week of competitive football. The tournament will showcase local talent and strengthen provincial football pathways by offering scouts and coaches a chance to evaluate players in a high-stakes environment. Spectators are encouraged to attend the opening ceremony and final match at Birendranagar Stadium.'
  },
  {
    slug: 'anfa-youth-coaching-course-registration-open',
    title: 'ANFA Youth Coaching Course Registration Now Open',
    category: 'Notice',
    date: 'May 18, 2026',
    summary:
      'Applications are now being accepted for the grassroots ANFA coaching clinic in Surkhet. Local athletes and aspiring coaches looking to obtain their coaching licenses are encouraged to apply before next week.',
    content:
      'The ANFA coaching clinic will cover technical training methods, youth development strategies, and match preparation best practices. Candidates will participate in classroom sessions and field-based drills led by certified instructors. Successful participants will receive certification that supports coaching assignments within district and provincial youth programs.'
  },
  {
    slug: 'stadium-infrastructure-upgrades-approved-for-birendranagar',
    title: 'New Stadium Infrastructure Upgrades Approved for Birendranagar',
    category: 'Press Release',
    date: 'May 10, 2026',
    summary:
      'In coordination with provincial sports authorities, funding has been secured to improve regional playing facilities. The enhancements will include advanced turf systems and modernized locker room spaces.',
    content:
      'The approved upgrades will deliver safer playing surfaces, improved drainage, and upgraded spectator seating. Work begins in June and is planned to finish before the next provincial tournament season. KPFA officials say these improvements will support higher-quality training and help attract more competitive fixtures to the Karnali region.'
  },
  {
    slug: 'karnali-youth-academy-top-talents-selected',
    title: 'Karnali Youth Academy Selects Top Talents from District Trials',
    category: 'Academy',
    date: 'April 28, 2026',
    summary:
      'Following extensive scouting scouting camps across Jumla, Dailekh, and Salyan, the final list of selected youth players has been finalized for the residential training program.',
    content:
      'The youth academy has identified promising players through district trials and is now preparing them for the next phase of development. Selected athletes will receive specialized coaching, sports nutrition guidance, and academic support to balance training with school commitments. This initiative aims to build a deep pipeline of talent for future provincial competitions.'
  }
]
