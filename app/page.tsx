'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth.context'
import { loginSchema, type LoginInput } from '@/lib/validations/auth.schema'
import { loginUser, AuthError } from '@/lib/services/auth.service'
import { ZodError } from "zod"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<LoginInput>({
    email: 'user3@test.com',
    password: '123456789',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({})
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear field-specific error when user starts typing
    if (errors[name as keyof LoginInput]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setErrors({})

    try {
      const validatedData = loginSchema.parse(formData)
      const response = await loginUser(validatedData)
      
      // Call login from auth context
      login(response.data.access_token, response.data.user)

      // Check if user has completed registration
      if (response.data.user.fullName) {
        router.push('/user')
      } else {
        router.push('/user/register')
      }
    } catch (err) {
      console.error('Login error:', err)
      if (err instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof LoginInput, string>> = {}
        err.errors.forEach((error) => {
          const [field] = error.path
          fieldErrors[field as keyof LoginInput] = error.message
        })
        setErrors(fieldErrors)
      } else if (err instanceof AuthError) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">      
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg">
          {/* Form Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome back
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Please sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-5">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 
                    focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-colors
                    sm:text-sm"
                  placeholder="Enter your email"
                  aria-label="Email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 
                    focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-colors
                    sm:text-sm"
                  placeholder="Enter your password"
                  aria-label="Password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div 
                className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg text-center" 
                role="alert"
              >
                {error}
              </div>
            )}



            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full inline-flex items-center justify-center px-8 py-3 text-base font-medium 
                  text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transform hover:-translate-y-0.5"
                aria-label="Sign in to your account"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  )
}
