'use client'

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { NewsRecord, NewsValues } from '@/lib/admin-news'

type AdminNewsFormProps = {
    selectedNews: NewsRecord | null
    loading: boolean
    onSubmit: (values: NewsValues, imageFile: File | null) => Promise<void>
    onCancel: () => void
}

const AdminNewsForm = ({ selectedNews, loading, onSubmit, onCancel }: AdminNewsFormProps) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    useEffect(() => {
        if (selectedNews) {
            setTitle(selectedNews.title)
            setContent(selectedNews.content)
            setPreviewUrl(selectedNews.image_url ?? null)
            setImageFile(null)

            return
        }

        setTitle('')
        setContent('')
        setImageFile(null)
        setPreviewUrl(null)
    }, [selectedNews])

    useEffect(() => {
        if (!imageFile) return
        const objectUrl = URL.createObjectURL(imageFile)

        setPreviewUrl(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [imageFile])

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null

        setImageFile(file)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await onSubmit({ title: title.trim(), content: content.trim() }, imageFile)
    }

    return (
        <Card className='space-y-6'>
            <CardHeader>
                <CardTitle>{selectedNews ? 'Edit news' : 'Create news'}</CardTitle>
                <CardDescription>{selectedNews ? 'Update news and image.' : 'Add news with optional image upload.'}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor='news-title' className='mb-2 block text-sm font-medium text-foreground'>Title</label>
                        <Input id='news-title' value={title} onChange={e => setTitle(e.currentTarget.value)} required />
                    </div>
                    <div>
                        <label htmlFor='news-content' className='mb-2 block text-sm font-medium text-foreground'>Content</label>
                        <textarea id='news-content' value={content} onChange={e => setContent(e.currentTarget.value)} rows={4} className='min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none' required />
                    </div>
                    <div>
                        <label htmlFor='news-image' className='mb-2 block text-sm font-medium text-foreground'>Image</label>
                        <input id='news-image' type='file' accept='image/*' onChange={handleImageChange} className='file:rounded-full file:border-none file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground' />
                    </div>
                    {previewUrl ? <div className='overflow-hidden rounded-lg border border-border bg-muted p-2'><img src={previewUrl} alt='Preview' className='h-40 w-full object-cover' /></div> : null}
                    <div className={selectedNews ? 'flex flex-col gap-3' : 'flex gap-3'}>
                        <Button type='submit' disabled={loading}>{selectedNews ? 'Update news' : 'Create news'}</Button>
                        {selectedNews ? <Button variant='outline' onClick={onCancel} className={selectedNews ? 'w-full sm:w-auto' : ''}>Cancel</Button> : null}
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default AdminNewsForm
