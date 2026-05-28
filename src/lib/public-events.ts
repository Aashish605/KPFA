import { supabase } from '@/config/supabase'
import type { EventRecord } from '@/lib/admin-events'

const IMAGE_BUCKET = 'events'

/**
 * Get a public URL for an event image.
 */
const getEventImageUrl = (imagePath: string): string => {
    const { data } = supabase.storage
        .from(IMAGE_BUCKET)
        .getPublicUrl(imagePath)

    return data?.publicUrl ?? ''
}

/**
 * Attach image URLs to a list of event records.
 */
const attachImageUrls = (events: EventRecord[]): EventRecord[] =>
    events.map(event => ({
        ...event,
        image_url: event.image_path ? getEventImageUrl(event.image_path) : null
    }))

export const fetchLatestEvents = async (limit: number): Promise<EventRecord[]> => {
    const { data, error } = await supabase
        .from('events')
        .select('*')

    if (error || !data) {
        console.error('Failed to fetch latest events:', error?.message)
        return []
    }

    const events = attachImageUrls(data)

    // Sort: ongoing first, then upcoming (closest first), then completed (newest first)
    events.sort((a, b) => {
        const statusOrder = { ongoing: 0, upcoming: 1, completed: 2 }
        const aOrder = statusOrder[a.status] ?? 1
        const bOrder = statusOrder[b.status] ?? 1

        if (aOrder !== bOrder) {
            return aOrder - bOrder
        }

        const aTime = new Date(a.start_date).getTime()
        const bTime = new Date(b.start_date).getTime()

        if (a.status === 'upcoming') {
            return aTime - bTime // closest first
        }
        return bTime - aTime // newest/most recent first
    })

    return events.slice(0, limit)
}

/**
 * Fetch all events (sorted by start_date descending).
 */
export const fetchAllEvents = async (): Promise<EventRecord[]> => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: false })

    if (error || !data) {
        console.error('Failed to fetch events:', error?.message)
        return []
    }

    return attachImageUrls(data)
}

/**
 * Fetch a single event by its UUID id.
 */
export const fetchEventById = async (id: string): Promise<EventRecord | null> => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) {
        return null
    }

    const [withImage] = attachImageUrls([data])

    return withImage
}
