import { supabase } from '@/config/supabase'

export type ContactMessage = {
    id: string
    name: string
    email: string
    phone?: string | null
    role?: string | null
    message: string
    status: 'complete' | 'uncomplete'
    created_at: string
}

export type ContactMessageValues = {
    name: string
    email: string
    phone?: string
    role?: string
    message: string
}

/**
 * Submit a contact query to Supabase contact_messages table.
 */
export const submitContactMessage = async (values: ContactMessageValues) => {
    const { data, error } = await supabase
        .from('contact_messages')
        .insert(values)
        .select()
        .single()

    if (error || !data) {
        throw new Error(error?.message ?? 'Unable to send message')
    }

    return data
}

/**
 * Fetch all contact queries, sorted by creation time (newest first).
 */
export const fetchContactMessages = async (): Promise<ContactMessage[]> => {
    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

    if (error || !data) {
        throw new Error(error?.message ?? 'Unable to load contact messages')
    }

    return data
}

/**
 * Update the status of a contact query (complete or uncomplete).
 */
export const updateContactMessageStatus = async (id: string, status: 'complete' | 'uncomplete') => {
    const { data, error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id)
        .select()
        .single()

    if (error || !data) {
        throw new Error(error?.message ?? 'Unable to update status')
    }

    return data
}

/**
 * Delete a contact query from the database.
 */
export const deleteContactMessage = async (id: string) => {
    const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

    if (error) {
        throw new Error(error.message)
    }
}
