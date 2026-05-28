import HeroSectionPage from '@/components/blocks/hero-section/hero-section'
import PopularDishes from '@/components/blocks/popular-dishes/popular-dishes'
import AboutUs from '@/components/blocks/about-us-section/about-us-page'
import Testimonials from '@/components/blocks/testimonials-section/testimonials-section'
import NewItems from '@/components/blocks/new-items-section/new-items'
import ContactUs from '@/components/blocks/contact-us-section/contact-us-page'
// import Offers from '@/components/blocks/offers-section/offers-section'

import { menudata } from '@/assets/data/hero'
import { featuredPlayers as popularDishes } from '@/assets/data/popular-dishes'
import { stats } from '@/assets/data/about-us'
import { contactInfo } from '@/assets/data/contact-us'

import { fetchLatestNews } from '@/lib/public-news'
import { fetchLatestEvents } from '@/lib/public-events'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${process.env.NEXT_PUBLIC_APP_URL}#website`,
      name: 'Bistro',
      description:
        'Enjoy fresh ingredients, thoughtfully prepared meals, and a welcoming space designed for memorable moments. Experience bistro dining made simple and delicious.',
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      inLanguage: 'en-US'
    }
  ]
}

/**
 * Map DB event records to the EventItem shape expected by the NewItems component.
 */
const mapEventsToItems = (events: Awaited<ReturnType<typeof fetchLatestEvents>>) =>
  events.map(event => {
    const d = new Date(event.start_date)
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    return {
      img: event.image_url ?? '/images/football.webp',
      alt: event.title,
      title: event.title,
      venue: event.location,
      date: {
        month: monthNames[d.getMonth()] ?? 'TBD',
        day: String(d.getDate()).padStart(2, '0')
      },
      description: event.description,
      eventLink: `/event/${event.id}`
    }
  })

/**
 * Map DB news records to the NewsItem shape expected by the Testimonials component.
 */
const mapNewsToItems = (news: Awaited<ReturnType<typeof fetchLatestNews>>) =>
  news.map(item => {
    const d = new Date(item.inserted_at)
    const dateStr = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    return {
      slug: item.id,
      title: item.title,
      category: 'Press Release' as const,
      date: dateStr,
      summary: item.content.length > 180 ? item.content.slice(0, 180) + '…' : item.content,
      content: item.content
    }
  })

const Home = async () => {
  const [latestNews, latestEvents] = await Promise.all([
    fetchLatestNews(3),
    fetchLatestEvents(3)
  ])

  const newsItems = mapNewsToItems(latestNews)
  const eventItems = mapEventsToItems(latestEvents)

  return (
    <>
      <HeroSectionPage menudata={menudata} />
      <PopularDishes popularDishes={popularDishes} />
      <AboutUs stats={stats} />
      <Testimonials testimonials={newsItems} />
      <NewItems newItems={eventItems} />
      <ContactUs contactInfo={contactInfo} />
      {/* <Offers galleryImage={GalleryImage} /> */}
      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default Home
