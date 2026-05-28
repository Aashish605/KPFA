'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { EventRecord } from '@/lib/admin-events'

type AdminEventListProps = {
    events: EventRecord[]
    loading: boolean
    onEdit: (event: EventRecord) => void
    onDelete: (id: string) => Promise<void>
}

const AdminEventList = ({ events, loading, onEdit, onDelete }: AdminEventListProps) => {
    return (
        <Card className='space-y-6'>
            <CardHeader>
                <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent>
                {events.length === 0 ? (
                    <div className='rounded-3xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground'>
                        {loading ? 'Loading events…' : 'No events created yet.'}
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {events.map(event => (
                            <article key={event.id} className='rounded-3xl border border-border bg-muted p-5 shadow-sm'>
                                <div className='grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]'>
                                    <div className='overflow-hidden rounded-3xl bg-slate-950/5'>
                                        {event.image_url ? (
                                            <img src={event.image_url} alt={event.title} className='h-44 w-full object-cover' />
                                        ) : (
                                            <div className='flex h-44 items-center justify-center bg-muted text-sm text-muted-foreground'>No image</div>
                                        )}
                                    </div>
                                    <div className='grid gap-4'>
                                        <div className='space-y-2'>
                                            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                                                 <div>
                                                     <div className="flex flex-wrap items-center gap-2">
                                                         <p className='text-lg font-semibold text-foreground'>{event.title}</p>
                                                         <Badge variant={event.status === 'ongoing' ? 'default' : event.status === 'completed' ? 'secondary' : 'outline'} className='text-xs font-semibold capitalize'>
                                                             {event.status ?? 'upcoming'}
                                                         </Badge>
                                                     </div>
                                                     <p className='text-sm text-muted-foreground'>{event.location}</p>
                                                 </div>
                                                <p className='text-sm text-muted-foreground'>
                                                    {new Date(event.start_date).toLocaleString()} → {new Date(event.end_date).toLocaleString()}
                                                </p>
                                            </div>
                                            <p className='text-sm leading-6 text-muted-foreground'>{event.description}</p>
                                        </div>
                                        <div className='flex flex-wrap gap-3'>
                                            <Button variant='outline' onClick={() => onEdit(event)}>
                                                Edit
                                            </Button>
                                            <Button variant='destructive' onClick={() => void onDelete(event.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default AdminEventList
