import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { contactInfo } from '@/assets/data/contact-us'

const ContactPage = () => {
    return (
        <main className='bg-muted text-foreground'>
            <section id='contact-us' className='relative overflow-hidden py-16 sm:py-24 lg:py-32'>
                {/* <div className='bg-primary/10 absolute inset-x-0 top-0 h-48 blur-3xl' /> */}
                <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mx-auto max-w-3xl space-y-4 text-center'>
                        <Badge variant='outline' className='text-muted-foreground text-sm tracking-[0.32em] uppercase'>
                            Contact Us
                        </Badge>
                        <h1 className='text-3xl font-semibold sm:text-4xl lg:text-5xl'>
                            Reach out to KPFA for registration, events, and grassroots support
                        </h1>
                        <p className='text-muted-foreground mx-auto max-w-2xl text-base leading-8 sm:text-lg'>
                            Have a question for our provincial football association? Tell us who you are, what you need, and we'll
                            connect you with the right team.
                        </p>
                    </div>

                    <div className='mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] xl:gap-16'>
                        <div className='space-y-8'>
                            <div className='border-border bg-background/80 rounded-4xl border p-8 shadow-sm backdrop-blur-xl sm:p-10'>
                                <div className='space-y-6'>
                                    <div>
                                        <p className='text-primary text-sm font-medium tracking-[0.24em] uppercase'>Need assistance?</p>
                                        <h2 className='mt-3 text-2xl font-semibold sm:text-3xl'>Contact details and response times</h2>
                                    </div>
                                    <p className='text-muted-foreground text-base leading-7'>
                                        Whether you're a club manager, athlete, coach, or parent, our administration team is ready to answer
                                        questions about match schedules, membership, and youth programs.
                                    </p>
                                </div>

                                <div className='mt-10 grid gap-4 sm:grid-cols-2'>
                                    {contactInfo.map(info => (
                                        <Card
                                            key={info.title}
                                            className='bg-muted rounded-2xl border-border hover:border-primary border shadow-none transition-colors duration-300'
                                        >
                                            <CardContent className='flex flex-col gap-4 p-6'>
                                                <div className='flex items-center gap-3'>
                                                    <div className='bg-primary/10 text-primary grid h-11 w-11 place-items-center rounded-2xl'>
                                                        <info.icon className='size-5' />
                                                    </div>
                                                    <div>
                                                        <p className='text-base font-semibold'>{info.title}</p>
                                                    </div>
                                                </div>
                                                <p className='text-muted-foreground text-sm leading-6 whitespace-pre-line'>
                                                    {info.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='border-border bg-background rounded-4xl border p-8 shadow-sm sm:p-10'>
                            <div className='space-y-6'>
                                <div>
                                    <p className='text-primary text-sm font-medium tracking-[0.24em] uppercase'>Send your request</p>
                                    <h2 className='mt-3 text-2xl font-semibold sm:text-3xl'>Tell us about your question</h2>
                                    <p className='text-muted-foreground mt-4 text-base leading-7'>
                                        Complete the form below and we'll review your inquiry, then follow up by email or phone.
                                    </p>
                                </div>

                                <form className='space-y-5'>
                                    <div className='grid gap-4 sm:grid-cols-2'>
                                        <label className='text-foreground flex flex-col gap-2 text-sm font-medium'>
                                            Full name
                                            <Input id='name' name='name' type='text' placeholder='Your full name' className='rounded-xl' />
                                        </label>
                                        <label className='text-foreground flex flex-col gap-2 text-sm font-medium'>
                                            Email address
                                            <Input id='email' name='email' type='email' placeholder='name@example.com' className='rounded-xl' />
                                        </label>
                                    </div>

                                    <div className='grid gap-4 sm:grid-cols-2'>
                                        <label className='text-foreground flex flex-col gap-2 text-sm font-medium'>
                                            Phone number
                                            <Input id='phone' name='phone' type='tel' placeholder='+977 98XXXXXXX' className='rounded-xl' />
                                        </label>
                                        <label className='text-foreground  flex flex-col gap-2 text-sm font-medium'>
                                            Role
                                            <Input id='role' name='role' type='text' placeholder='Player, coach, club, parent' className='rounded-xl' />
                                        </label>
                                    </div>

                                    <label className='text-foreground flex flex-col gap-2 text-sm font-medium'>
                                        Your question
                                        <textarea
                                            id='message'
                                            name='message'
                                            rows={5}
                                            placeholder='Describe your request, concern, or topic in detail'
                                            className='border-input focus-visible:border-ring focus-visible:ring-ring/50 min-h-[140px] rounded-2xl border bg-transparent px-3 py-3 text-base shadow-xs transition-colors duration-200 outline-none'
                                        />
                                    </label>

                                    <div className='text-muted-foreground space-y-3 text-sm'>
                                        <p className='text-foreground font-medium'>What happens next?</p>
                                        <p>
                                            After submitting, our team will review your message and reach out to you within 1-2 business days.
                                            If you need immediate support, use the phone numbers above.
                                        </p>
                                    </div>

                                    <Button type='submit' className='w-full rounded-2xl'>
                                        Send Message
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ContactPage
