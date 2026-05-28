import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

type PopularDish = {
  image: string
  alt: string
  name: string
  description: string
  position: string
}[]

const PopularDishes = ({ popularDishes }: { popularDishes: PopularDish }) => {
  return (
    <section id='featured-players' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Heading */}
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='text-sm font-normal'>
            KPFA Rising Stars
          </Badge>

          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Featured Players</h2>

          <p className='text-muted-foreground text-xl'>
            Meet the talented footballers of Karnali Province Football Association who are shaping the future of the
            game through dedication, skill, and passion.
          </p>
        </div>

        {/* Players Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:gap-y-10 xl:grid-cols-4'>
          {popularDishes.map((player, index) => (
            <Card
              key={index}
              className='hover:border-primary overflow-hidden rounded-4xl py-0 shadow-none transition-colors duration-300'
            >
              <CardContent className='px-0'>
                {/* Player Image */}
                <div className='bg-muted'>
                  <img src={player.image} alt={player.alt} className='h-auto w-full rounded-t-4xl object-cover' />
                </div>

                {/* Player Info */}
                <div className='space-y-3 px-6 py-5'>
                  <CardTitle className='text-lg'>{player.name}</CardTitle>

                  <Separator />

                  <div className='text-muted-foreground'>
                    <p className='mb-1 text-base font-medium'>{player.position}</p>
                    <p>{player.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularDishes
