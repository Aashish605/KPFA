'use client'

import { useState } from 'react'
import NewItems from './new-items-section/new-items'
import type { EventRecord } from '@/lib/admin-events'

type EventsFilterContainerProps = {
    initialEvents: EventRecord[]
}

const EventsFilterContainer = ({ initialEvents }: EventsFilterContainerProps) => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'ongoing' | 'upcoming' | 'completed'>('all')

    const categories: { label: string; value: 'all' | 'ongoing' | 'upcoming' | 'completed' }[] = [
        { label: 'All Events', value: 'all' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Completed', value: 'completed' }
    ]

    const filteredEvents = initialEvents.filter(event => {
        if (activeFilter === 'all') return true
        return event.status === activeFilter
    })

    // Sort logic:
    // - For upcoming: sort by start_date ascending (closest first).
    // - For completed: sort by start_date descending (most recently completed first).
    // - For ongoing: sort by start_date descending.
    // - For all: sort by status hierarchy (ongoing -> upcoming -> completed), then by date accordingly.
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (activeFilter === 'upcoming') {
            return new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        }
        if (activeFilter === 'completed') {
            return new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        }
        if (activeFilter === 'ongoing') {
            return new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        }

        const statusOrder = { ongoing: 0, upcoming: 1, completed: 2 }
        const aOrder = statusOrder[a.status] ?? 1
        const bOrder = statusOrder[b.status] ?? 1

        if (aOrder !== bOrder) {
            return aOrder - bOrder
        }

        const aTime = new Date(a.start_date).getTime()
        const bTime = new Date(b.start_date).getTime()

        if (a.status === 'upcoming') {
            return aTime - bTime
        }
        return bTime - aTime
    })

    const mapEventsToItems = (events: EventRecord[]) =>
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

    const eventItems = mapEventsToItems(sortedEvents)

    return (
        <NewItems newItems={eventItems} bg='bg-muted'>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 -mt-4">
                {categories.map(cat => (
                    <button
                        key={cat.value}
                        onClick={() => setActiveFilter(cat.value)}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer select-none ${
                            activeFilter === cat.value
                                ? 'bg-primary text-primary-foreground border-primary scale-[1.02] shadow-md'
                                : 'bg-background hover:bg-muted text-muted-foreground border-border hover:text-foreground'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
            {eventItems.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg">No events found matching this category.</p>
                </div>
            ) : null}
        </NewItems>
    )
}

export default EventsFilterContainer
