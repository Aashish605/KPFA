import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchNewsById } from '@/lib/public-news'

export const dynamic = 'force-dynamic'

const NewsDetailPage = async ({ params }: { params: Promise<{ slug: string | string[] }> }) => {
    const resolvedParams = await params
    const id = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : resolvedParams.slug
    const article = await fetchNewsById(id)

    if (!article) {
        notFound()
    }

    const dateStr = new Date(article.inserted_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <main className='bg-muted text-foreground'>
            <section className='py-12 sm:py-16 lg:py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                        <div className='space-y-3'>
                            <Badge variant='outline' className='text-sm font-normal uppercase tracking-[0.24em]'>
                                News detail
                            </Badge>
                            <h1 className='text-3xl font-semibold sm:text-4xl lg:text-5xl'>{article.title}</h1>
                            <div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
                                <span className='rounded-full border border-border bg-muted px-3 py-1 uppercase tracking-[0.28em]'>News</span>
                                <span>{dateStr}</span>
                            </div>
                        </div>
                        <Button variant='outline' asChild>
                            <Link href='/news'>Back to news</Link>
                        </Button>
                    </div>

                    <div className='grid gap-10 lg:grid-cols-[1.25fr_0.75fr]'>
                        <div className='space-y-8'>
                            {article.image_url ? (
                                <Card className='overflow-hidden rounded-[2rem] border border-border bg-background shadow-sm'>
                                    <CardContent className='p-0'>
                                        <img
                                            src={article.image_url}
                                            alt={article.title}
                                            className='w-full object-cover rounded-[2rem]'
                                        />
                                    </CardContent>
                                </Card>
                            ) : null}

                            <Card className='rounded-[2rem] border border-border bg-background shadow-sm'>
                                <CardContent className='space-y-6 p-8'>
                                    <div className='space-y-4 text-base leading-8 text-foreground'>
                                        {article.content.split('\n\n').map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className='space-y-6'>
                            <Card className='rounded-[2rem] border border-border bg-muted shadow-sm'>
                                <CardHeader className='px-6 py-6'>
                                    <CardTitle className='text-xl font-semibold'>Quick info</CardTitle>
                                </CardHeader>
                                <CardContent className='space-y-4 px-6 pb-6'>
                                    <div className='rounded-3xl border border-border bg-background p-5'>
                                        <p className='text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground'>Category</p>
                                        <p className='mt-2 text-base font-semibold'>News</p>
                                    </div>
                                    <div className='rounded-3xl border border-border bg-background p-5'>
                                        <p className='text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground'>Date</p>
                                        <p className='mt-2 text-base font-semibold'>{dateStr}</p>
                                    </div>
                                    <div className='rounded-3xl border border-border bg-background p-5'>
                                        <p className='text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground'>Share</p>
                                        <div className='mt-3 flex flex-wrap gap-3'>
                                            <Button asChild size='sm' variant='outline'>
                                                <Link href={`/news/${article.id}`} className='text-sm'>Copy link</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default NewsDetailPage
