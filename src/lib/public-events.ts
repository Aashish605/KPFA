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

/**
 * Fetch the latest N events (sorted by start_date descending).
 */
export const fetchLatestEvents = async (limit: number): Promise<EventRecord[]> => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: false })
        .limit(limit)

    if (error || !data) {
        console.error('Failed to fetch latest events:', error?.message)
        return []
    }

    return attachImageUrls(data)
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
