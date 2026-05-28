import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { newsArticles } from '@/assets/data/testimonials'

const NewsPage = () => {
  return (
    <main className='bg-muted text-foreground'>
      <section className='relative py-16 sm:py-20 lg:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto mb-10 max-w-3xl text-center'>
            <Badge variant='outline' className='text-sm font-normal tracking-wider uppercase'>
              News
            </Badge>
            <h1 className='mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl'>
              Latest Announcements & Football News
            </h1>
            <p className='mt-4 text-base leading-7 text-muted-foreground sm:text-lg'>
              Browse the latest updates from KPFA, including tournaments, coaching notices, facility upgrades, and academy progress.
            </p>
          </div>

          <div className='grid gap-6 lg:grid-cols-2'>
            {newsArticles.map(article => (
              <Card key={article.slug ?? article.title} className='overflow-hidden rounded-[2rem] border border-border shadow-sm'>
                <CardContent className='space-y-5 p-6'>
                  <div className='flex items-center justify-between gap-4'>
                    <Badge variant='secondary' className='rounded-full px-3 py-1 text-xs uppercase tracking-[0.28em]'>
                      {article.category}
                    </Badge>
                    <span className='text-sm text-muted-foreground'>{article.date}</span>
                  </div>
                  <CardTitle className='text-2xl font-semibold'>
                    {article.slug ? (
                      <Link href={`/news/${article.slug}`} className='hover:text-primary transition-colors'>
                        {article.title}
                      </Link>
                    ) : (
                      article.title
                    )}
                  </CardTitle>
                  <CardDescription className='text-base leading-7 text-muted-foreground'>
                    {article.summary}
                  </CardDescription>
                </CardContent>
                <CardFooter className='flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4'>
                  <Button asChild size='sm' variant='outline'>
                    <Link href={article.slug ? `/news/${article.slug}` : '/news'}>Read article</Link>
                  </Button>
                  <span className='text-sm text-muted-foreground'>View full story</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default NewsPage
