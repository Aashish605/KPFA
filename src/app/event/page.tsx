import NewItems from '@/components/blocks/new-items-section/new-items'
import { upcomingEvents } from '@/assets/data/new-items'

const EventsPage = () => {
  return (
    <main className='bg-background text-foreground'>
      <section className=' '>

        <NewItems newItems={upcomingEvents} bg='bg-muted' />
      </section>
    </main>
  )
}

export default EventsPage
