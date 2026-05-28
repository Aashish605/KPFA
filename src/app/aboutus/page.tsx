import AboutUs from '@/components/blocks/about-us-section/about-us-page'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import { stats } from '@/assets/data/about-us'
import { menudata } from '@/assets/data/hero'

const page = () => {
    return (
        <>
            <AboutUs stats={stats} bg='bg-background' />

            <section className='relative py-16 bg-muted sm:py-20 lg:py-28'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mx-auto max-w-3xl text-center'>
                        <Badge variant='outline' className='text-sm font-normal'>
                            Association Members
                        </Badge>
                        <h1 className='mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl'>
                            Meet the members driving KPFA
                        </h1>
                        <p className='mt-4 text-base leading-7 text-muted-foreground sm:text-lg'>
                            Explore the team profiles and testimonials from the people supporting football growth across Karnali Province.
                        </p>
                    </div>

                    <div className='mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                        {menudata.map(member => (
                            <Card
                                key={member.id}
                                className='p-0 overflow-hidden rounded-[2rem] border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
                            >
                                <div className='relative overflow-hidden'>
                                    <img src={member.img} alt={member.imgAlt} className='h-64 w-full object-cover transition duration-500 hover:scale-105' />
                                    <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4 text-white'>
                                        <p className='text-xs uppercase tracking-[0.3em] text-primary/80'>Role</p>
                                        <p className='text-lg font-semibold'>{member.role}</p>
                                    </div>
                                </div>

                                <CardContent className='space-y-4 p-6'>
                                    <div className='flex items-center gap-4'>
                                        <img
                                            src={member.userAvatar}
                                            alt={`${member.role} avatar`}
                                            className='h-14 w-14 rounded-full object-cover ring-2 ring-primary/20'
                                        />
                                        <div>
                                            <p className='text-base font-semibold'>{member.name ?? member.role}</p>
                                            <p className='text-sm text-muted-foreground'>{member.role}</p>
                                        </div>
                                    </div>
                                    <p className='text-sm leading-7 text-muted-foreground'>{member.userComment}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default page
