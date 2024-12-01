'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth.context'
import Cookies from 'js-cookie'

interface UserProfile {
  id: number
  email: string
  fullName: string
  dateOfBirth: string
  preferredLocation: {
    id: number
    locationName: string
  }
  resumeSummary: string
  programmingSkills: Array<{
    id: number
    name: string
  }>
}

export default function UserProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchProfile = async () => {
      try {
        const accessToken = Cookies.get('access_token')
        const userDataStr = Cookies.get('user_data')
        const isRegistered = Cookies.get('userRegistered')
        
        if (!accessToken || !isRegistered) {
          router.replace('/')
          return
        }

        await new Promise(resolve => setTimeout(resolve, 100))

        if (userDataStr) {
          try {
            const userData = JSON.parse(userDataStr)
            if (isMounted) {
              setProfile(userData)
            }
          } catch (error) {
            console.error('Failed to parse user data:', error)
            router.replace('/')
            return
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchProfile()

    return () => {
      isMounted = false
    }
  }, [router])

  const handleLogout = () => {
    logout()
  }

  if (isLoading) {
    return (
      <div data-testid="loading-container" className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div 
              data-testid="loading-spinner"
              role="status"
              aria-label="Loading"
              className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"
            />
            <p data-testid="loading-text" className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-blue-600 px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-3xl text-white">
                      {profile.fullName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{profile.fullName}</h1>
                    <p className="text-blue-100">{profile.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                  <p className="text-gray-900">{formatDate(profile.dateOfBirth)}</p>
                </div>

                {/* Preferred Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Preferred Location</label>
                  <p className="text-gray-900">{profile.preferredLocation.locationName}</p>
                </div>

                {/* Resume Summary */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">Resume Summary</label>
                  <p className="text-gray-900">{profile.resumeSummary}</p>
                </div>

                {/* Programming Skills */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">Programming Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {profile.programmingSkills?.map(skill => (
                      <span
                        key={skill.id}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 