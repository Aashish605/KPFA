import type { ComponentType } from 'react'

import { Clock8Icon, MapPinIcon, Mail, PhoneIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

type ContactInfo = {
  title: string
  icon: ComponentType
  description: string
}[]

const ContactUs = ({ contactInfo }: { contactInfo: ContactInfo }) => {
  return (
    <section id='contact-us' className='relative py-12 sm:py-24 lg:py-32'>
      {/* Background element skewed ONLY at the top */}
      <div className='bg-muted absolute inset-0 -z-10 [clip-path:polygon(0_3vw,_100%_0,_100%_100%,_0_100%)]' />

      <div className='mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='text-sm font-normal tracking-wider uppercase'>
            Contact Us
          </Badge>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Get in Touch with KPFA</h2>
          <p className='text-muted-foreground text-xl'>
            Have questions about club registration, upcoming leagues, or grassroots player programs? Reach out to our
            provincial administration team.
          </p>
        </div>

        <div className='grid items-center gap-12 lg:grid-cols-2'>
          {/* Updated Image with sports/football association theme */}
          <img
            src='/images/match.jpg'
            alt='Karnali Province Football Association Headquarters'
            className='size-full rounded-4xl object-cover max-lg:max-h-70'
          />

          <div>
            <h3 className='mb-2 text-2xl font-semibold'>Supporting Local Football Growth</h3>
            <p className='text-muted-foreground mb-10 text-lg'>
              Whether you represent a registered district club, an aspiring athlete, or a community partner, we are here
              to support football administration and governance across the region.
            </p>

            {/* Contact Info Grid */}
            <div className='grid gap-6 sm:grid-cols-2'>
              {contactInfo.map((info, index) => (
                <Card
                  className='bg-background hover:border-primary rounded-2xl shadow-none transition-colors duration-300'
                  key={index}
                >
                  <CardContent className='flex flex-col items-center gap-4 pt-6 text-center'>
                    <Avatar className='border-primary/20 size-9 border'>
                      <AvatarFallback className='text-primary bg-transparent [&>svg]:size-5'>
                        <info.icon />
                      </AvatarFallback>
                    </Avatar>
                    <div className='space-y-2'>
                      <h4 className='text-lg font-semibold'>{info.title}</h4>
                      <div className='text-muted-foreground text-sm leading-relaxed font-medium'>
                        {info.description.split('\n').map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
