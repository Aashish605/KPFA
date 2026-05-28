import { supabase } from '@/config/supabase'

export type NewsRecord = {
    id: string
    title: string
    content: string
    image_path?: string | null
    image_url?: string | null
    created_by: string
    inserted_at: string
    updated_at: string
}

export type NewsValues = {
    title: string
    content: string
    image_path?: string
}

const IMAGE_BUCKET = 'news'

const getNewsImageUrl = async (imagePath: string) => {
    const publicUrl = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(imagePath).data.publicUrl

    if (publicUrl) {
        return publicUrl
    }

    const { data, error } = await supabase.storage.from(IMAGE_BUCKET).createSignedUrl(imagePath, 60)

    if (error || !data?.signedUrl) {
        throw new Error(error?.message ?? 'Unable to generate image URL')
    }

    return data.signedUrl
}

export const uploadNewsImage = async (file: File) => {
    const imagePath = `${crypto.randomUUID()}-${file.name}`

    const { data, error } = await supabase.storage.from(IMAGE_BUCKET).upload(imagePath, file, {
        upsert: true
    })

    if (error || !data?.path) {
        throw new Error(error?.message ?? 'Image upload failed')
    }

    return data.path
}

export const fetchAdminNews = async (): Promise<NewsRecord[]> => {
    const { data, error } = await supabase.from('news').select('*').order('inserted_at', { ascending: false })

    if (error || !data) {
        throw new Error(error?.message ?? 'Unable to load news')
    }

    const withImages = await Promise.all(
        data.map(async item => {
            if (!item.image_path) return { ...item, image_url: null }

            try {
                const image_url = await getNewsImageUrl(item.image_path)
                return { ...item, image_url }
            } catch {
                return { ...item, image_url: null }
            }
        })
    )

    return withImages
}

export const createAdminNews = async (values: NewsValues) => {
    const { data, error } = await supabase.from('news').insert(values).select().single()

    if (error || !data) {
        throw new Error(error?.message ?? 'Unable to create news')
    }

    return data
}

export const updateAdminNews = async (id: string, values: Partial<NewsValues>) => {
    const { data, error } = await supabase.from('news').update(values).eq('id', id).select().single()

    if (error || !data) {
        throw new Error(error?.message ?? 'Unable to update news')
    }

    return data
}

export const deleteAdminNews = async (id: string) => {
    // fetch image path
    const { data: existing, error: fetchError } = await supabase.from('news').select('image_path').eq('id', id).single()

    if (fetchError) {
        throw new Error(fetchError.message ?? 'Unable to fetch news before delete')
    }

    const imagePath = existing?.image_path ?? null

    if (imagePath) {
        const { error: removeError } = await supabase.storage.from(IMAGE_BUCKET).remove([imagePath])

        if (removeError) {
            console.warn('Failed to remove news image from storage:', removeError.message)
        }
    }

    const { error } = await supabase.from('news').delete().eq('id', id)

    if (error) {
        throw new Error(error.message)
    }
}
