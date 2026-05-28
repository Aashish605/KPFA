'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ContactMessage } from '@/lib/admin-contacts'

type AdminContactsListProps = {
    contacts: ContactMessage[]
    loading: boolean
    onToggleStatus: (id: string, currentStatus: 'complete' | 'uncomplete') => Promise<void>
    onDelete: (id: string) => Promise<void>
}

const AdminContactsList = ({ contacts, loading, onToggleStatus, onDelete }: AdminContactsListProps) => {
    return (
        <Card className='space-y-6'>
            <CardHeader>
                <CardTitle>Contact Queries</CardTitle>
            </CardHeader>
            <CardContent>
                {contacts.length === 0 ? (
                    <div className='rounded-3xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground'>
                        {loading ? 'Loading queries…' : 'No queries received yet.'}
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {contacts.map(contact => (
                            <article key={contact.id} className='rounded-3xl border border-border bg-muted p-5 shadow-sm'>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                                        <div>
                                            <div className='flex flex-wrap items-center gap-2'>
                                                <h3 className='text-lg font-semibold text-foreground'>{contact.name}</h3>
                                                {contact.role ? (
                                                    <Badge variant='outline' className='text-xs font-normal uppercase tracking-wider'>
                                                        {contact.role}
                                                    </Badge>
                                                ) : null}
                                                <Badge
                                                    variant={contact.status === 'complete' ? 'secondary' : 'default'}
                                                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                                                        contact.status === 'complete'
                                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30'
                                                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-900/30'
                                                    }`}
                                                >
                                                    {contact.status}
                                                </Badge>
                                            </div>
                                            <div className='mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground'>
                                                <a href={`mailto:${contact.email}`} className='hover:text-primary transition-colors hover:underline'>
                                                    {contact.email}
                                                </a>
                                                {contact.phone ? (
                                                    <span className='flex items-center gap-1.5'>
                                                        <span className='text-muted-foreground/50'>•</span>
                                                        <a href={`tel:${contact.phone}`} className='hover:text-primary transition-colors hover:underline'>
                                                            {contact.phone}
                                                        </a>
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <p className='text-xs text-muted-foreground sm:text-right'>
                                            {new Date(contact.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className='rounded-2xl border border-border bg-card p-4'>
                                        <p className='text-sm leading-6 text-foreground whitespace-pre-wrap'>{contact.message}</p>
                                    </div>
                                    <div className='flex flex-wrap gap-2 pt-1'>
                                        <Button
                                            variant={contact.status === 'complete' ? 'outline' : 'secondary'}
                                            size='sm'
                                            disabled={loading}
                                            onClick={() => void onToggleStatus(contact.id, contact.status)}
                                            className='rounded-xl'
                                        >
                                            Mark {contact.status === 'complete' ? 'Uncomplete' : 'Complete'}
                                        </Button>
                                        <Button
                                            variant='destructive'
                                            size='sm'
                                            disabled={loading}
                                            onClick={() => void onDelete(contact.id)}
                                            className='rounded-xl'
                                        >
                                            Delete
                                        </Button>
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

export default AdminContactsList
