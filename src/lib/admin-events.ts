import { supabase } from '@/config/supabase'

export type EventRecord = {
    id: string
    title: string
    description: string
    location: string
    start_date: string
    end_date: string
    created_by: string
    image_path?: string | null
    image_url?: string | null
    inserted_at: string
    updated_at: string
}

export type EventValues = {
    title: string
    description: string
    location: string
    start_date: string
    end_date: string
    image_path?: string
}

const IMAGE_BUCKET = 'events'

/**
 * Get image URL (public first, fallback to signed)
 */
const getEventImageUrl = async (imagePath: string) => {
    // Public URL (fastest, preferred if bucket is public)
    const { data } = supabase.storage
        .from(IMAGE_BUCKET)
        .getPublicUrl(imagePath)

    if (data?.publicUrl) {
        return data.publicUrl
    }

    // Fallback: signed URL (for private buckets)
    const { data: signed, error } = await supabase.storage
        .from(IMAGE_BUCKET)
        .createSignedUrl(imagePath, 60)

    if (error || !signed?.signedUrl) {
        throw new Error(error?.message ?? 'Unable to generate image URL')
    }

    return signed.signedUrl
}

/**
 * Upload event image
 * FIX: removed duplicate "events/" prefix inside file path
 */
export const uploadEventImage = async (file: File) => {
    const imagePath = `${crypto.randomUUID()}-${file.name}`

    const { data, error } = await supabase.storage
        .from(IMAGE_BUCKET)
        .upload(imagePath, file, {
            upsert: true
        })

    if (error || !data?.path) {
        throw new Error(error?.message ?? 'Image upload failed')
    }

    return data.path
}

/**
 * Fetch all events + attach image URLs
 */
export const fetchAdminEvents = async (): Promise<EventRecord[]> => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true })

    if (error || !data) {
        throw new Error(error?.message ?? 'Unable to load events')
    }

    const eventsWithImages = await Promise.all(
        data.map(async (event) => {
            if (!event.image_path) {
                return { ...event, image_url: null }
            }

            try {
                const image_url = await getEventImageUrl(event.image_path)

                return { ...event, image_url }
            } catch {
                return { ...event, image_url: null }
            }
        })
    )

    return eventsWithImages
}

/**
 * Create event
 */
export const createAdminEvent = async (values: EventValues) => {
    const { data, error } = await supabase
        .from('events')
        .insert(values)
        .select()
        .single()

    if (error || !data) {
        throw new Error(error?.message ?? 'Unable to create event')
    }

    return data
}

/**
 * Update event
 */
export const updateAdminEvent = async (
    id: string,
    values: Partial<EventValues>
) => {
    const { data, error } = await supabase
        .from('events')
        .update(values)
        .eq('id', id)
        .select()
        .single()

    if (error || !data) {
        throw new Error(error?.message ?? 'Unable to update event')
    }

    return data
}

/**
 * Delete event + cleanup image
 */
export const deleteAdminEvent = async (id: string) => {
    // Get existing image path first
    const { data: existing, error: fetchError } = await supabase
        .from('events')
        .select('image_path')
        .eq('id', id)
        .single()

    if (fetchError) {
        throw new Error(fetchError.message ?? 'Unable to fetch event before delete')
    }

    const imagePath = existing?.image_path

    // Remove image from storage (non-blocking)
    if (imagePath) {
        const { error: removeError } = await supabase.storage
            .from(IMAGE_BUCKET)
            .remove([imagePath])

        if (removeError) {
            console.warn(
                'Failed to remove event image from storage:',
                removeError.message
            )
        }
    }

    // Delete DB record
    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)

    if (error) {
        throw new Error(error.message)
    }
}
