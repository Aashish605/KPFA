'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import MenuDropdown from '@/components/blocks/menu-dropdown'
import MenuNavigation from '@/components/blocks/menu-navigation'
import type { NavigationSection } from '@/components/blocks/menu-navigation'
import { ModeToggle } from '@/components/layout/mode-toggle'

import { cn } from '@/lib/utils'


import { supabase } from '@/config/supabase'

// Active section hook based on which section is closest to the top of the
// viewport (accounts for header offset). This is more deterministic than
// an IntersectionObserver for this layout and avoids lingering active states.
const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return

    const headerHeight = 80

    const update = () => {
      let closestId = ''
      let minDistance = Number.POSITIVE_INFINITY

      sectionIds.forEach(id => {
        const el = document.getElementById(id)

        if (!el) return

        const rectTop = el.getBoundingClientRect().top - headerHeight
        const distance = Math.abs(rectTop)

        if (distance < minDistance) {
          minDistance = distance
          closestId = id
        }
      })

      // Only set an active section when it's reasonably close to the
      // viewport top. This prevents a stale/incorrect active state when
      // the user has scrolled elsewhere on the page.
      const activationThreshold = 200 // px

      if (minDistance <= activationThreshold) {
        setActiveSection(closestId)
      } else {
        setActiveSection('')
      }
    }

    // Update on scroll and resize and run once to initialise
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sectionIds])

  return activeSection
}

type HeaderProps = {
  navigationData: NavigationSection[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  // Extract section IDs from navigation data - only include valid sections
  const sectionIds = navigationData.map(item => item.href?.replace('#', '')).filter(Boolean) as string[]

  // Only use active section if it's actually in our navigation list
  const detectedActiveSection = useActiveSection(sectionIds)
  const activeSection = sectionIds.includes(detectedActiveSection) ? detectedActiveSection : ''

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  useEffect(() => {
    const signup = async () => {
      const { data, error } = await supabase.auth.signUp({
        email: 'admin@gmail.com',
        password: '123456',
      });

      console.log('signup data:', data, error);
    }

    signup();
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 h-16 w-full border-b transition-all duration-300',
        {
          'bg-background shadow-md': isScrolled
        },
        className
      )}
    >
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-3'>
          <img width={52} height={52} src='/images/logo.png' alt='Bistro' className='' />
          <span className='text-primary text-[20px] font-semibold'>KPFA</span>
        </Link>

        {/* Navigation */}
        <MenuNavigation
          navigationData={navigationData}
          activeSection={activeSection}
          className='**:data-[slot=navigation-menu-list]:gap-1 max-lg:hidden'
        />

        {/* Actions */}
        <div className='flex items-center'>
          <ModeToggle />

          {/* Mobile menu button */}
          <MenuDropdown
            align='end'
            navigationData={navigationData}
            activeSection={activeSection}
            trigger={
              <Button variant='outline' size='icon' className='ml-3 rounded-full lg:hidden'>
                <MenuIcon />
                <span className='sr-only'>Menu</span>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  )
}

export default Header
