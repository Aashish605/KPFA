// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

// import { Rating } from '@/components/ui/rating'

export interface NewsItem {
  slug?: string
  title: string
  category: 'Tournament' | 'Notice' | 'Academy' | 'Press Release'
  date: string
  summary: string
  content?: string
}

type TestimonialsComponentProps = {
  testimonials: NewsItem[]
}

const TestimonialsComponent = ({ testimonials }: TestimonialsComponentProps) => {
  return (
    <section
      id='news-announcements'
      className='before:border-primary/20 relative py-14 before:absolute before:inset-0 before:-z-10 before:-skew-y-3 before:border-b sm:py-28 lg:py-36'
    >
      <Carousel
        className='mx-auto flex max-w-7xl gap-12 px-4 max-sm:flex-col sm:items-center sm:gap-16 sm:px-6 lg:gap-24 lg:px-8'
        opts={{
          align: 'start',
          slidesToScroll: 1
        }}
      >
        {/* Left Content */}
        <div className='space-y-4 sm:w-1/2 lg:w-1/3'>
          <Badge variant='outline' className='text-sm font-normal'>
            Updates
          </Badge>

          <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>
            Latest News & <br />
            Announcements
          </h2>

          <p className='text-muted-foreground text-xl'>
            Stay updated with match results, tournament schedules, and official notices from Karnali Province FA.
          </p>

          <div className='flex items-center gap-4'>
            <CarouselPrevious
              variant='default'
              className='disabled:bg-primary/10 disabled:text-primary static size-9 translate-y-0 rounded-full disabled:opacity-100'
            />
            <CarouselNext
              variant='default'
              className='disabled:bg-primary/10 disabled:text-primary static size-9 translate-y-0 rounded-full disabled:opacity-100'
            />
          </div>
        </div>

        {/* Right News Carousel */}
        <div className='relative max-w-196 sm:w-1/2 lg:w-2/3'>
          <CarouselContent className='sm:-ml-6'>
            {testimonials.map((article, index) => (
              <CarouselItem key={index} className='sm:pl-6 lg:basis-1/2'>
                {article.slug ? (
                  <Link href={`/news/${article.slug}`} className='block h-full cursor-pointer'>
                    <Card className='hover:border-primary hover:shadow-md flex h-full flex-col justify-between rounded-3xl transition-all duration-300'>
                      <CardContent className='space-y-4 pt-6'>
                        <div className='text-muted-foreground flex items-center justify-between gap-3 text-xs'>
                          <Badge variant='secondary' className='rounded-xl text-[12px] tracking-wider uppercase'>
                            {article.category}
                          </Badge>
                          <span>{article.date}</span>
                        </div>

                        <h4 className='line-clamp-2 text-xl font-semibold hover:text-primary transition-colors'>
                          {article.title}
                        </h4>

                        <p className='text-muted-foreground line-clamp-3 text-sm'>{article.summary}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className='hover:border-primary flex h-full flex-col justify-between rounded-3xl transition-colors duration-300'>
                    <CardContent className='space-y-4 pt-6'>
                      <div className='text-muted-foreground flex items-center justify-between gap-3 text-xs'>
                        <Badge variant='secondary' className='rounded-xl text-[12px] tracking-wider uppercase'>
                          {article.category}
                        </Badge>
                        <span>{article.date}</span>
                      </div>

                      <h4 className='line-clamp-2 text-xl font-semibold'>
                        {article.title}
                      </h4>

                      <p className='text-muted-foreground line-clamp-3 text-sm'>{article.summary}</p>
                    </CardContent>
                  </Card>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  )
}

export default TestimonialsComponent
