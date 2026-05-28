'use client'

import { type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type AdminAuthCardProps = {
    user: { id: string; email?: string } | null
    email: string
    password: string
    loading: boolean
    onEmailChange: (value: string) => void
    onPasswordChange: (value: string) => void
    onLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>
    onLogout: () => Promise<void>
}

const AdminAuthCard = ({
    user,
    email,
    password,
    loading,
    onEmailChange,
    onPasswordChange,
    onLogin,
    onLogout
}: AdminAuthCardProps) => {
    return (
        <Card className='space-y-6'>
            <CardHeader>
                <CardTitle>Admin access</CardTitle>
                <CardDescription>Sign in with your admin account to manage events and image uploads.</CardDescription>
            </CardHeader>
            <CardContent>
                {user ? (
                    <div className='space-y-2'>
                        <Button variant='secondary' onClick={onLogout} className='w-full'>
                            Sign out
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={onLogin} className='space-y-4'>
                        <div className='grid gap-4'>
                            <div>
                                <label htmlFor='admin-email' className='mb-2 block text-sm font-medium text-foreground'>Email</label>
                                <Input
                                    id='admin-email'
                                    type='email'
                                    value={email}
                                    onChange={event => onEmailChange(event.currentTarget.value)}
                                    placeholder='admin@example.com'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='admin-password' className='mb-2 block text-sm font-medium text-foreground'>Password</label>
                                <Input
                                    id='admin-password'
                                    type='password'
                                    value={password}
                                    onChange={event => onPasswordChange(event.currentTarget.value)}
                                    placeholder='••••••••'
                                    required
                                />
                            </div>
                        </div>
                        <Button className='w-full' type='submit' disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>
                )}
            </CardContent>
        </Card>
    )
}

export default AdminAuthCard
