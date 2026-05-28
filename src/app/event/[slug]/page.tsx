import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchEventById } from '@/lib/public-events'

export const dynamic = 'force-dynamic'

const EventDetailPage = async ({ params }: { params: Promise<{ slug: string | string[] }> }) => {
    const resolvedParams = await params
    const id = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug
    const event = await fetchEventById(id)

    if (!event) {
        notFound()
    }

    const startDate = new Date(event.start_date)
    const endDate = new Date(event.end_date)
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const dateMonth = monthNames[startDate.getMonth()] ?? 'TBD'
    const dateDay = String(startDate.getDate()).padStart(2, '0')
    const formattedStart = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const formattedEnd = endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const imageUrl = event.image_url ?? '/images/football.webp'

    return (
        <main className='bg-muted text-foreground'>
            <section className='py-12 sm:py-16 lg:py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                        <div className='space-y-3'>
                            <div className='flex flex-wrap items-center gap-2 text-sm text-muted-foreground'>
                                <Link href='/event' className='text-primary hover:text-primary/90 transition-colors'>
                                    Events
                                </Link>
                                <span className='text-muted-foreground'>/</span>
                                <span>{event.title}</span>
                            </div>
                            <div className='space-y-2'>
                                <Badge variant='outline' className='text-sm font-normal uppercase tracking-[0.24em]'>
                                    Event detail
                                </Badge>
                                <h1 className='text-3xl font-semibold sm:text-4xl lg:text-5xl'>{event.title}</h1>
                                <p className='max-w-3xl text-base leading-7 text-muted-foreground'>
                                    {event.description}
                                </p>
                            </div>
                        </div>

                        <Button variant='outline' asChild>
                            <Link href='/event' className='text-sm'>
                                <ArrowLeft className='size-4' />
                                Back to events
                            </Link>
                        </Button>
                    </div>

                    <div className='grid gap-10 lg:grid-cols-[1.2fr_0.8fr]'>
                        <div className='space-y-10'>
                            <Card className='overflow-hidden rounded-4xl border border-border bg-background shadow-sm'>
                                <CardContent className=''>
                                    <img src={imageUrl} alt={event.title} className=' w-full object-cover rounded-3xl' />
                                </CardContent>
                            </Card>

                            <Card className='rounded-4xl border border-border bg-muted shadow-sm'>
                                <CardHeader className='px-6 py-6'>
                                    <CardTitle className='text-xl font-semibold'>Event information</CardTitle>
                                </CardHeader>
                                <CardContent className='space-y-4 px-6 pb-6'>
                                    <div className='grid gap-4 sm:grid-cols-2'>
                                        <div className='rounded-3xl border border-border bg-background p-5'>
                                            <p className='text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground'>Venue</p>
                                            <div className='mt-2 text-base font-semibold'>{event.location}</div>
                                        </div>
                                        <div className='rounded-3xl border border-border bg-background p-5'>
                                            <p className='text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground'>Date</p>
                                            <div className='mt-2 flex items-end gap-2'>
                                                <span className='inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/5 text-primary font-bold'>
                                                    {dateDay}
                                                </span>
                                                <span className='text-lg font-semibold uppercase'>{dateMonth}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid gap-4 sm:grid-cols-2'>
                                        <div className='rounded-3xl border border-border bg-background p-5'>
                                            <p className='text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground'>Start Date</p>
                                            <p className='mt-2 text-base font-semibold'>{formattedStart}</p>
                                        </div>
                                        <div className='rounded-3xl border border-border bg-background p-5'>
                                            <p className='text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground'>End Date</p>
                                            <p className='mt-2 text-base font-semibold'>{formattedEnd}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className='rounded-4xl border border-border bg-muted shadow-sm'>
                            <CardContent className='space-y-6 p-6'>
                                <div>
                                    <p className='text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground'>Get involved</p>
                                    <p className='mt-2 text-base leading-7 text-muted-foreground'>
                                        Contact the KPFA office for registration details, volunteer opportunities, and sponsorship information.
                                    </p>
                                </div>
                                <div className='space-y-4'>
                                    <div className='rounded-3xl border border-border bg-background p-4'>
                                        <p className='text-sm font-medium text-muted-foreground'>Venue</p>
                                        <p className='mt-1 text-base font-semibold'>{event.location}</p>
                                    </div>
                                    <div className='rounded-3xl border border-border bg-background p-4'>
                                        <p className='text-sm font-medium text-muted-foreground'>Register</p>
                                        <p className='mt-1 text-base font-semibold'>Reach out via the KPFA contact page to confirm your place.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default EventDetailPage
