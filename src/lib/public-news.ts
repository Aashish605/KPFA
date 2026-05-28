import { supabase } from '@/config/supabase'
import type { NewsRecord } from '@/lib/admin-news'

const IMAGE_BUCKET = 'news'

/**
 * Get a public URL for a news image.
 */
const getNewsImageUrl = (imagePath: string): string => {
    const { data } = supabase.storage
        .from(IMAGE_BUCKET)
        .getPublicUrl(imagePath)

    return data?.publicUrl ?? ''
}

/**
 * Attach image URLs to a list of news records.
 */
const attachImageUrls = (items: NewsRecord[]): NewsRecord[] =>
    items.map(item => ({
        ...item,
        image_url: item.image_path ? getNewsImageUrl(item.image_path) : null
    }))

/**
 * Fetch the latest N news items (sorted by inserted_at descending).
 */
export const fetchLatestNews = async (limit: number): Promise<NewsRecord[]> => {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('inserted_at', { ascending: false })
        .limit(limit)

    if (error || !data) {
        console.error('Failed to fetch latest news:', error?.message)
        return []
    }

    return attachImageUrls(data)
}

/**
 * Fetch all news items (sorted by inserted_at descending).
 */
export const fetchAllNews = async (): Promise<NewsRecord[]> => {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('inserted_at', { ascending: false })

    if (error || !data) {
        console.error('Failed to fetch news:', error?.message)
        return []
    }

    return attachImageUrls(data)
}

const isUuid = (str: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)

const slugify = (text: string) =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')

/**
 * Fetch a single news item by its UUID id, integer id, or slugified title fallback.
 */
export const fetchNewsById = async (id: string): Promise<NewsRecord | null> => {
    // 1. Try direct ID query (handles both UUID and integer IDs)
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .maybeSingle()

    if (!error && data) {
        const [withImage] = attachImageUrls([data])
        return withImage
    }

    if (error) {
        console.warn(`fetchNewsById direct query warning for id ${id}:`, error.message)
    }

    // 2. Fallback: match by slugified title or stringified ID
    const allNews = await fetchAllNews()
    const matched = allNews.find(item => slugify(item.title) === id || String(item.id) === id)
    return matched ?? null
}
