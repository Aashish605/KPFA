'use client'

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { EventRecord, EventValues } from '@/lib/admin-events'

type AdminEventFormProps = {
    selectedEvent: EventRecord | null
    loading: boolean
    onSubmit: (values: EventValues, imageFile: File | null) => Promise<void>
    onCancel: () => void
}

const AdminEventForm = ({ selectedEvent, loading, onSubmit, onCancel }: AdminEventFormProps) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    useEffect(() => {
        if (selectedEvent) {
            setTitle(selectedEvent.title)
            setDescription(selectedEvent.description)
            setLocation(selectedEvent.location)
            setStartDate(selectedEvent.start_date)
            setEndDate(selectedEvent.end_date)
            setPreviewUrl(selectedEvent.image_url ?? null)
            setImageFile(null)
            return
        }

        setTitle('')
        setDescription('')
        setLocation('')
        setStartDate('')
        setEndDate('')
        setImageFile(null)
        setPreviewUrl(null)
    }, [selectedEvent])

    useEffect(() => {
        if (!imageFile) {
            return
        }

        const objectUrl = URL.createObjectURL(imageFile)
        setPreviewUrl(objectUrl)

        return () => {
            URL.revokeObjectURL(objectUrl)
        }
    }, [imageFile])

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null
        setImageFile(file)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        await onSubmit(
            {
                title: title.trim(),
                description: description.trim(),
                location: location.trim(),
                start_date: startDate,
                end_date: endDate
            },
            imageFile
        )
    }

    return (
        <Card className='space-y-6'>
            <CardHeader>
                <CardTitle>{selectedEvent ? 'Edit event' : 'Create new event'}</CardTitle>
                <CardDescription>
                    {selectedEvent
                        ? 'Update event details and upload a new event image if needed.'
                        : 'Add a new event and upload an image to the Supabase event bucket.'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor='event-title' className='mb-2 block text-sm font-medium text-foreground'>Title</label>
                        <Input
                            id='event-title'
                            value={title}
                            onChange={event => setTitle(event.currentTarget.value)}
                            placeholder='Annual football championship'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='event-location' className='mb-2 block text-sm font-medium text-foreground'>Location</label>
                        <Input
                            id='event-location'
                            value={location}
                            onChange={event => setLocation(event.currentTarget.value)}
                            placeholder='Stadium, City'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='event-description' className='mb-2 block text-sm font-medium text-foreground'>Description</label>
                        <textarea
                            id='event-description'
                            value={description}
                            onChange={event => setDescription(event.currentTarget.value)}
                            placeholder='Describe the event for attendees.'
                            rows={5}
                            className='min-h-30 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-ring/50'
                            required
                        />
                    </div>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <div>
                            <label htmlFor='event-start' className='mb-2 block text-sm font-medium text-foreground'>Start date</label>
                            <Input
                                id='event-start'
                                type='datetime-local'
                                value={startDate}
                                onChange={event => setStartDate(event.currentTarget.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='event-end' className='mb-2 block text-sm font-medium text-foreground'>End date</label>
                            <Input
                                id='event-end'
                                type='datetime-local'
                                value={endDate}
                                onChange={event => setEndDate(event.currentTarget.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor='event-image' className='mb-2 block text-sm font-medium text-foreground'>Event image</label>
                        <input
                            id='event-image'
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                            className='file:rounded-full file:border-none file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground focus-visible:outline-none'
                        />
                    </div>
                    {previewUrl ? (
                        <div className='overflow-hidden rounded-3xl border border-border bg-muted p-2'>
                            <img src={previewUrl} alt='Event preview' className='h-48 w-full rounded-3xl object-cover' />
                        </div>
                    ) : null}
                    <div className='flex flex-col gap-3 sm:flex-row'>
                        <Button type='submit' disabled={loading} className='w-full'>
                            {selectedEvent ? (loading ? 'Updating event...' : 'Update event') : loading ? 'Creating event...' : 'Create event'}
                        </Button>
                        {selectedEvent ? (
                            <Button variant='outline' type='button' onClick={onCancel} className='w-full'>
                                Cancel edit
                            </Button>
                        ) : null}
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default AdminEventForm
