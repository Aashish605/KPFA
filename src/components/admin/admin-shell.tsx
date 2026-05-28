import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'

type Tab = 'events' | 'news' | 'contacts'

type AdminShellProps = {
    children: ReactNode
    activeTab: Tab
    setActiveTab: (t: Tab) => void
    user?: { id: string; email?: string } | null
    onLogout?: () => Promise<void>
}

const AdminShell = ({ children, activeTab, setActiveTab, user, onLogout }: AdminShellProps) => {
    return (
        <div className='min-h-screen bg-background text-foreground'>
            <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                <div className='mb-6 rounded-[1.25rem] border border-border bg-card shadow-sm'>
                    <div className='flex flex-col gap-4 rounded-[1.25rem] p-4 sm:flex-row sm:items-center sm:justify-between'>
                        <div className='space-y-2'>
                            <p className='text-sm font-semibold uppercase tracking-[0.24em] text-primary'>Admin Dashboard</p>
                            <div>
                                <h1 className='text-2xl font-semibold tracking-tight text-foreground'>Content management</h1>
                                <p className='text-sm text-muted-foreground'>Manage events and news content, including images.</p>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <Button variant={activeTab === 'events' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('events')}>Events</Button>
                            <Button variant={activeTab === 'news' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('news')}>News</Button>
                            <Button variant={activeTab === 'contacts' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('contacts')}>Queries</Button>
                        </div>
                    </div>
                </div>

                <div className='grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]'>
                    <aside className='space-y-4'>
                        <div className='rounded-lg border border-border bg-card p-4 shadow-sm'>
                            <p className='text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground'>Navigation</p>
                            <div className='mt-4 flex flex-col gap-2'>
                                <Button variant={activeTab === 'events' ? 'outline' : 'ghost'} className='justify-start' onClick={() => setActiveTab('events')}>Events</Button>
                                <Button variant={activeTab === 'news' ? 'outline' : 'ghost'} className='justify-start' onClick={() => setActiveTab('news')}>News</Button>
                                <Button variant={activeTab === 'contacts' ? 'outline' : 'ghost'} className='justify-start' onClick={() => setActiveTab('contacts')}>Queries</Button>
                            </div>
                        </div>

                        {user ? (
                            <div className='rounded-md border border-border bg-muted p-3 text-sm'>
                                <p className='text-xs text-muted-foreground'>Signed in as</p>
                                <p className='truncate font-medium'>{user.email ?? user.id}</p>
                                <div className='mt-2'>
                                    <Button variant='ghost' onClick={onLogout} className='px-3 py-1 text-sm'>Sign out</Button>
                                </div>
                            </div>
                        ) : null}
                    </aside>

                    <main>{children}</main>
                </div>
            </div>
        </div>
    )
}

export default AdminShell
