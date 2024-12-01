'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { getPreferredLocations, getProgrammingSkills } from '@/lib/services/options.service'
import { type ProgrammingSkill, type PreferredLocation } from '@/lib/services/options.service'
import { updateUserProfile, UserApiError } from '@/lib/services/user.service'
import Cookies from 'js-cookie'

const createRegistrationSchema = (locations: PreferredLocation[], programmingSkills: ProgrammingSkill[]) => z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  dateOfBirth: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear()
    return age >= 18
  }, 'You must be at least 18 years old'),
  resumeSummary: z.string().min(5, 'Resume summary must be at least 5 characters'),
  preferredLocationId: z.number().min(1, 'Please select a location'),
  programmingSkills: z.array(z.number()).min(1, 'Select at least one skill'),
})

type RegistrationForm = {
  fullName: string;
  dateOfBirth: string;
  resumeSummary: string;
  preferredLocationId: number;
  programmingSkills: number[];
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

export default function UserRegistrationPage() {
  const router = useRouter()

  // Check auth synchronously
  const accessToken = Cookies.get('access_token')
  const userDataCookie = Cookies.get('user_data')
  
  useEffect(() => {
    if (!accessToken || !userDataCookie) {
      setTimeout(() => {
        router.replace('/')
      }, 0)
    }
  }, [accessToken, userDataCookie, router])

  if (!accessToken || !userDataCookie) {
    return null
  }
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationForm, string>>>({})
  const [locations, setLocations] = useState<PreferredLocation[]>([])
  const [programmingSkills, setProgrammingSkills] = useState<ProgrammingSkill[]>([])
  const [formData, setFormData] = useState<RegistrationForm>({
    fullName: '',
    dateOfBirth: '',
    resumeSummary: '',
    preferredLocationId: 0,
    programmingSkills: [],
  })
  const [isLoadingOptions, setIsLoadingOptions] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const userDataCookie = Cookies.get('user_data')
    if (!userDataCookie || isInitialized) return

    try {
      const userData = JSON.parse(userDataCookie)
      setFormData({
        fullName: userData.fullName || '',
        dateOfBirth: formatDate(userData.dateOfBirth),
        resumeSummary: userData.resumeSummary || '',
        preferredLocationId: userData.preferredLocation?.id || 0,
        programmingSkills: userData.programmingSkills?.map((skill: any) => skill.id) || [],
      })
      setIsInitialized(true)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/')
    }
  }, [isInitialized, router])

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [locationsData, skillsData] = await Promise.all([
          getPreferredLocations(),
          getProgrammingSkills()
        ])
        
        if (locationsData?.length > 0) {
          setLocations(locationsData)
        }
        
        if (skillsData?.length > 0) {
          setProgrammingSkills(skillsData)
        }
      } catch (error) {
        console.error('Error fetching options:', error)
      } finally {
        setIsLoadingOptions(false)
      }
    }

    fetchOptions()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'preferredLocationId' ? Number(value) : value
    }))
    if (errors[name as keyof RegistrationForm]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleCheckboxChange = (skillId: number) => {
    setFormData(prev => ({
      ...prev,
      programmingSkills: prev.programmingSkills.includes(skillId)
        ? prev.programmingSkills.filter(id => id !== skillId)
        : [...prev.programmingSkills, skillId]
    }))
    if (errors.programmingSkills) {
      setErrors(prev => ({
        ...prev,
        programmingSkills: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const userData = Cookies.get('user_data')
      if (!userData) {
        throw new UserApiError('User data not found', 401, '/user/register')
      }

      const user = JSON.parse(userData)
      
      const registrationSchema = createRegistrationSchema(locations, programmingSkills)
      const validatedData = registrationSchema.parse(formData)
      
      const response = await updateUserProfile(user.id, validatedData)
      
      if (response.success) {
        // Set cookies
        Cookies.set('user_data', JSON.stringify(response.data), {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/'
        })
        
        Cookies.set('userRegistered', 'true', {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/'
        })

        window.location.href = '/user';
        return ;
      } else {
        setErrors({
          fullName: response.message || 'Registration failed. Please try again.'
        })
      }
    } catch (err) {
      // console.error('Registration error:', err)
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof RegistrationForm, string>> = {}
        err.errors.forEach((error) => {
          const [field] = error.path
          fieldErrors[field as keyof RegistrationForm] = error.message
        })
        setErrors(fieldErrors)
      } else if (err instanceof UserApiError) {
        if (err.status === 401) {
          window.location.href = '/'
          return
        }
        setErrors({
          fullName: err.message
        })
      } else {
        setErrors({
          fullName: 'An unexpected error occurred. Please try again.'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingOptions) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading options...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 px-6 py-8">
              <h1 className="text-2xl font-bold text-white">Complete Your Profile</h1>
              <p className="text-blue-100 mt-2">Please provide your information to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6" role="form">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Resume Summary */}
              <div className="space-y-1.5">
                <label htmlFor="resumeSummary" className="block text-sm font-medium text-gray-700">
                  Resume Summary
                </label>
                <textarea
                  id="resumeSummary"
                  name="resumeSummary"
                  required
                  value={formData.resumeSummary}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                  placeholder="Brief summary of your professional background"
                />
                {errors.resumeSummary && (
                  <p className="text-sm text-red-500">{errors.resumeSummary}</p>
                )}
              </div>

              {/* Preferred Location */}
              <div className="space-y-1.5">
                <label htmlFor="preferredLocationId" className="block text-sm font-medium text-gray-700">
                  Preferred Location
                </label>
                <select
                  id="preferredLocationId"
                  name="preferredLocationId"
                  required
                  value={formData.preferredLocationId}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                >
                  <option value="">Select a location</option>
                  {locations?.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.locationName}
                    </option>
                  ))}
                </select>
                {errors.preferredLocationId && (
                  <p className="text-sm text-red-500">{errors.preferredLocationId}</p>
                )}
              </div>

              {/* Programming Skills */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Programming Skills
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {programmingSkills?.map(skill => (
                    <label key={skill.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.programmingSkills.includes(skill.id)}
                        onChange={() => handleCheckboxChange(skill.id)}
                        className="rounded border-gray-300 text-blue-600 
                          focus:ring-blue-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-700">{skill.name}</span>
                    </label>
                  ))}
                </div>
                {errors.programmingSkills && (
                  <p className="text-sm text-red-500">{errors.programmingSkills}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex justify-center items-center py-3 px-6 border border-transparent 
                    rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
} 