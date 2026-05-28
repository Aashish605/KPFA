'use client'

import { useEffect, useState, type FormEvent } from 'react'

import AdminAuthCard from '@/components/admin/admin-auth-card'
import AdminEventForm from '@/components/admin/admin-event-form'
import AdminEventList from '@/components/admin/admin-event-list'
import AdminShell from '@/components/admin/admin-shell'
import AdminNewsForm from '@/components/admin/admin-news-form'
import AdminNewsList from '@/components/admin/admin-news-list'
import AdminContactsList from '@/components/admin/admin-contacts-list'
import { supabase } from '@/config/supabase'
import {
    createAdminEvent,
    deleteAdminEvent,
    fetchAdminEvents,
    type EventRecord,
    type EventValues,
    updateAdminEvent,
    uploadEventImage
} from '@/lib/admin-events'
import {
    createAdminNews,
    deleteAdminNews,
    fetchAdminNews,
    type NewsRecord,
    type NewsValues,
    updateAdminNews,
    uploadNewsImage
} from '@/lib/admin-news'
import {
    fetchContactMessages,
    updateContactMessageStatus,
    deleteContactMessage,
    type ContactMessage
} from '@/lib/admin-contacts'

type AdminUser = {
    id: string
    email?: string
}

const AdminPage = () => {
    const [email, setEmail] = useState('admin@gmail.com')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState<AdminUser | null>(null)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState<EventRecord[]>([])
    const [selectedEvent, setSelectedEvent] = useState<EventRecord | null>(null)
    const [activeTab, setActiveTab] = useState<'events' | 'news' | 'contacts'>('events')

    // news state
    const [news, setNews] = useState<NewsRecord[]>([])
    const [selectedNews, setSelectedNews] = useState<NewsRecord | null>(null)

    // contacts state
    const [contacts, setContacts] = useState<ContactMessage[]>([])

    useEffect(() => {
        const initializeUser = async () => {
            const { data } = await supabase.auth.getSession()

            setUser(data.session?.user ?? null)
        }

        initializeUser()

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)

            if (!session) {
                setEvents([])
                setSelectedEvent(null)
            }
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    useEffect(() => {
        const loadEvents = async () => {
            if (!user) {
                return
            }

            setLoading(true)
            setMessage('')

            try {
                const events = await fetchAdminEvents()

                setEvents(events)
            } catch (error) {
                setMessage(error instanceof Error ? error.message : 'Unable to load events')
            } finally {
                setLoading(false)
            }
        }

        const loadNews = async () => {
            if (!user) return

            try {
                const items = await fetchAdminNews()

                setNews(items)
            } catch {
                // non-fatal
            }
        }

        const loadContacts = async () => {
            if (!user) return

            try {
                const items = await fetchContactMessages()

                setContacts(items)
            } catch {
                // non-fatal
            }
        }

        void loadEvents()
        void loadNews()
        void loadContacts()
    }, [user])

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        setMessage('')

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        setLoading(false)

        if (error) {
            setMessage(error.message)

            return
        }

        setUser(data.user ?? null)
        setMessage('Logged in successfully.')
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setEvents([])
        setSelectedEvent(null)
        setMessage('Logged out successfully.')
    }

    const handleSaveEvent = async (values: EventValues, imageFile: File | null) => {
        setLoading(true)
        setMessage('')

        try {
            const image_path = imageFile ? await uploadEventImage(imageFile) : undefined

            const payload: EventValues = {
                title: values.title,
                description: values.description,
                location: values.location,
                start_date: values.start_date,
                end_date: values.end_date,
                ...(image_path ? { image_path } : {})
            }

            if (selectedEvent) {
                await updateAdminEvent(selectedEvent.id, payload)
                setMessage('Event updated successfully.')
                setSelectedEvent(null)
            } else {
                await createAdminEvent(payload)
                setMessage('Event created successfully.')
            }

            const refreshedEvents = await fetchAdminEvents()

            setEvents(refreshedEvents)
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Unable to save event')
        } finally {
            setLoading(false)
        }
    }

    const handleEditEvent = (event: EventRecord) => {
        setSelectedEvent(event)
        setMessage('')
    }

    const handleDeleteEvent = async (id: string) => {
        const confirmed = window.confirm('Delete this event permanently?')

        if (!confirmed) {

            return
        }

        setLoading(true)
        setMessage('')

        try {
            await deleteAdminEvent(id)

            setEvents(current => current.filter(event => event.id !== id))
            setMessage('Event deleted successfully.')

            if (selectedEvent?.id === id) {
                setSelectedEvent(null)
            }
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Unable to delete event')
        } finally {
            setLoading(false)
        }
    }

    /* News handlers */
    const handleSaveNews = async (values: NewsValues, imageFile: File | null) => {
        setLoading(true)
        setMessage('')

        try {
            const image_path = imageFile ? await uploadNewsImage(imageFile) : undefined

            const payload: NewsValues = {
                title: values.title,
                content: values.content,
                ...(image_path ? { image_path } : {})
            }

            if (selectedNews) {
                await updateAdminNews(selectedNews.id, payload)
                setMessage('News updated successfully.')
                setSelectedNews(null)
            } else {
                await createAdminNews(payload)
                setMessage('News created successfully.')
            }

            const refreshed = await fetchAdminNews()

            setNews(refreshed)
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Unable to save news')
        } finally {
            setLoading(false)
        }
    }

    const handleEditNews = (item: NewsRecord) => {
        setSelectedNews(item)
        setMessage('')
    }

    const handleDeleteNews = async (id: string) => {
        const confirmed = window.confirm('Delete this news item permanently?')

        if (!confirmed) {
            return
        }

        setLoading(true)
        setMessage('')

        try {
            await deleteAdminNews(id)
            setNews(current => current.filter(n => n.id !== id))
            setMessage('News deleted successfully.')

            if (selectedNews?.id === id) setSelectedNews(null)
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Unable to delete news')
        } finally {
            setLoading(false)
        }
    }

    const handleToggleContactStatus = async (id: string, currentStatus: 'complete' | 'uncomplete') => {
        setLoading(true)
        setMessage('')

        try {
            const nextStatus = currentStatus === 'complete' ? 'uncomplete' : 'complete'
            await updateContactMessageStatus(id, nextStatus)
            setContacts(current =>
                current.map(c => (c.id === id ? { ...c, status: nextStatus } : c))
            )
            setMessage('Query status updated successfully.')
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Unable to update status')
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteContact = async (id: string) => {
        const confirmed = window.confirm('Delete this query permanently?')

        if (!confirmed) {
            return
        }

        setLoading(true)
        setMessage('')

        try {
            await deleteContactMessage(id)
            setContacts(current => current.filter(c => c.id !== id))
            setMessage('Query deleted successfully.')
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Unable to delete query')
        } finally {
            setLoading(false)
        }
    }

    if (!user) {
        return (
            <div className='flex min-h-[75vh] items-center justify-center px-4 py-12 bg-background'>
                <div className='w-full max-w-md space-y-6'>
                    <AdminAuthCard
                        user={user}
                        email={email}
                        password={password}
                        loading={loading}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                        onLogin={handleLogin}
                        onLogout={handleLogout}
                    />
                    {message ? (
                        <div className='rounded-3xl border border-border bg-muted p-4 text-sm text-foreground text-center'>{message}</div>
                    ) : null}
                </div>
            </div>
        )
    }

    return (
        <AdminShell activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout}>
            <div className='space-y-6'>
                {activeTab !== 'contacts' ? (
                    <div className='max-w-3xl'>
                        {activeTab === 'events' ? (
                            <AdminEventForm selectedEvent={selectedEvent} loading={loading} onSubmit={handleSaveEvent} onCancel={() => setSelectedEvent(null)} />
                        ) : (
                            <AdminNewsForm selectedNews={selectedNews} loading={loading} onSubmit={handleSaveNews} onCancel={() => setSelectedNews(null)} />
                        )}
                    </div>
                ) : null}

                {message ? (
                    <div className='rounded-3xl border border-border bg-muted p-4 text-sm text-foreground'>{message}</div>
                ) : null}

                {activeTab === 'contacts' ? (
                    <AdminContactsList
                        contacts={contacts}
                        loading={loading}
                        onToggleStatus={handleToggleContactStatus}
                        onDelete={handleDeleteContact}
                    />
                ) : activeTab === 'events' ? (
                    <AdminEventList events={events} loading={loading} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
                ) : (
                    <AdminNewsList news={news} loading={loading} onEdit={handleEditNews} onDelete={handleDeleteNews} />
                )}
            </div>
        </AdminShell>
    )
}

export default AdminPage
