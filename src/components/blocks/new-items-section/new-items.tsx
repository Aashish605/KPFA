import Link from 'next/link'
import { ArrowRightIcon, MapPinIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card'

export interface EventItem {
  img: string
  alt: string
  title: string
  venue: string
  date: {
    month: string
    day: string
  }
  description: string
  eventLink: string
}

import type { ReactNode } from 'react'

type EventProps = {
  newItems: EventItem[]
  bg?: string
  children?: ReactNode
}

const NewItems = ({ newItems, bg, children }: EventProps) => {
  const sectionClass = bg
    ? `py-8 sm:py-16 lg:py-24 ${bg}   `
    : `py-8 sm:py-16 lg:py-24`

  return (
    <section id='upcoming-events' className={sectionClass}>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='text-sm font-normal tracking-wider uppercase'>
            Schedules
          </Badge>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Upcoming Events & Matches</h2>
          <p className='text-muted-foreground text-xl'>
            Stay informed about upcoming matchdays, coaching seminars, and grassroots football tournaments happening
            across Karnali Province.
          </p>
        </div>

        {children}

        {/* Grid Layout matching image_82b043.jpg structure */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {newItems.map((event, index) => (
            <Card
              className='hover:border-primary flex flex-col justify-between rounded-4xl pt-0 shadow-none transition-colors duration-300 max-lg:last:col-span-full'
              key={index}
            >
              <div>
                {/* Event Image with Calendar Date Overlay */}
                <CardContent className='bg-muted relative overflow-hidden px-0'>
                  <img
                    src={event.img}
                    alt={event.alt}
                    className='aspect-video h-60 w-full rounded-t-4xl object-cover'
                  />

                  {/* Floating Date Badge */}
                  <div className='bg-background/95 border-border absolute top-4 left-4 border px-3 py-1.5 text-center shadow-md backdrop-blur-sm select-none'>
                    <span className='text-primary block text-xs font-bold tracking-wide uppercase'>
                      {event.date.month}
                    </span>
                    <span className='text-foreground block text-xl leading-none font-extrabold'>{event.date.day}</span>
                  </div>
                </CardContent>

                <CardHeader className='mb-2 gap-2 pt-6'>
                  {/* Venue Indicator */}
                  <div className='text-muted-foreground flex items-center gap-1 text-xs font-medium'>
                    <MapPinIcon className='text-primary size-3.5' />
                    {event.venue}
                  </div>

                  <CardTitle className='line-clamp-2 min-h-[3.5rem] pt-1 text-xl'>
                    <Link href={event.eventLink} className='hover:text-primary transition-colors'>
                      {event.title}
                    </Link>
                  </CardTitle>

                  <CardDescription className='line-clamp-3 text-base'>{event.description}</CardDescription>
                </CardHeader>
              </div>

              {/* CTA Footer matching image_82b043.jpg action button */}
              <CardFooter className='pt-2'>
                <Button
                  className='group bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm has-[>svg]:px-6'
                  size='lg'
                  asChild
                >
                  <Link href={event.eventLink}>
                    Event details
                    <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewItems
