import EventsFilterContainer from '@/components/blocks/events-filter-container'
import { fetchAllEvents } from '@/lib/public-events'

export const dynamic = 'force-dynamic'

const EventsPage = async () => {
  const events = await fetchAllEvents()

  return (
    <main className='bg-background text-foreground'>
      <section className=' '>
        <EventsFilterContainer initialEvents={events} />
      </section>
    </main>
  )
}

export default EventsPage
