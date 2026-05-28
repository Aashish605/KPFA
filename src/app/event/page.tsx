import NewItems from '@/components/blocks/new-items-section/new-items'
import { fetchAllEvents } from '@/lib/public-events'

/**
 * Map DB event records to the EventItem shape expected by the NewItems component.
 */
const mapEventsToItems = (events: Awaited<ReturnType<typeof fetchAllEvents>>) =>
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

const EventsPage = async () => {
  const events = await fetchAllEvents()
  const eventItems = mapEventsToItems(events)

  return (
    <main className='bg-background text-foreground'>
      <section className=' '>
        <NewItems newItems={eventItems} bg='bg-muted' />
      </section>
    </main>
  )
}

export default EventsPage
