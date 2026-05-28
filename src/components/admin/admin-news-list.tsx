'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { NewsRecord } from '@/lib/admin-news'

type AdminNewsListProps = {
    news: NewsRecord[]
    loading: boolean
    onEdit: (n: NewsRecord) => void
    onDelete: (id: string) => Promise<void>
}

const AdminNewsList = ({ news, loading, onEdit, onDelete }: AdminNewsListProps) => {
    return (
        <Card className='space-y-6'>
            <CardHeader>
                <CardTitle>News</CardTitle>
            </CardHeader>
            <CardContent>
                {news.length === 0 ? (
                    <div className='rounded-3xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground'>
                        {loading ? 'Loading news…' : 'No news created yet.'}
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {news.map(item => (
                            <article key={item.id} className='rounded-3xl border border-border bg-muted p-5 shadow-sm'>
                                <div className='grid gap-4 lg:grid-cols-[160px_minmax(0,1fr)]'>
                                    <div className='overflow-hidden rounded-2xl bg-slate-950/5'>
                                        {item.image_url ? <img src={item.image_url} alt={item.title} className='h-32 w-full object-cover' /> : <div className='flex h-32 items-center justify-center bg-muted text-sm text-muted-foreground'>No image</div>}
                                    </div>
                                    <div className='grid gap-2'>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p className='text-lg font-semibold text-foreground'>{item.title}</p>
                                                <p className='text-sm text-muted-foreground'>{new Date(item.inserted_at).toLocaleString()}</p>
                                            </div>
                                            <div className='flex gap-2'>
                                                <Button variant='outline' onClick={() => onEdit(item)}>Edit</Button>
                                                <Button variant='destructive' onClick={() => void onDelete(item.id)}>Delete</Button>
                                            </div>
                                        </div>
                                        <p className='text-sm leading-6 text-muted-foreground'>{item.content}</p>
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

export default AdminNewsList
