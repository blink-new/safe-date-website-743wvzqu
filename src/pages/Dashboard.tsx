import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'
import { blink } from '../blink/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Shield, MapPin, Phone, Camera, MessageCircle, AlertTriangle, Star, Clock, Users } from 'lucide-react'
import SafetyFeatures from '../components/dashboard/SafetyFeatures'
import ImageSearch from '../components/dashboard/ImageSearch'
import CommunityReviews from '../components/dashboard/CommunityReviews'
import SafetyBot from '../components/dashboard/SafetyBot'
import ProfileManager from '../components/dashboard/ProfileManager'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const [userProfile, setUserProfile] = useState(null)
  const [activeCheckIn, setActiveCheckIn] = useState(null)

  const loadUserProfile = useCallback(async () => {
    if (!user?.id) return
    try {
      const profiles = await blink.db.users.list({
        where: { userId: user.id },
        limit: 1
      })
      if (profiles.length > 0) {
        setUserProfile(profiles[0])
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }, [user?.id])

  const loadActiveCheckIn = useCallback(async () => {
    if (!user?.id) return
    try {
      const checkIns = await blink.db.checkIns.list({
        where: { 
          userId: user.id,
          status: 'active'
        },
        orderBy: { createdAt: 'desc' },
        limit: 1
      })
      if (checkIns.length > 0) {
        setActiveCheckIn(checkIns[0])
      }
    } catch (error) {
      console.error('Error loading check-in:', error)
    }
  }, [user?.id])

  useEffect(() => {
    if (user?.id) {
      loadUserProfile()
      loadActiveCheckIn()
    }
  }, [user?.id, loadUserProfile, loadActiveCheckIn])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your SafeDate dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.displayName || user?.email}</h1>
              <p className="text-gray-600">Your safety dashboard and dating tools</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={userProfile?.verifiedIdentity ? "default" : "secondary"} className="bg-rose-100 text-rose-800">
                <Shield className="w-4 h-4 mr-1" />
                {userProfile?.verifiedIdentity ? 'Verified' : 'Unverified'}
              </Badge>
              <div className="text-right">
                <div className="text-sm text-gray-500">Safety Score</div>
                <div className="text-2xl font-bold text-rose-600">{userProfile?.safetyScore || 0}/100</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="safety" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="safety" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Safety Tools</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Image Search</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="bot" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Safety Bot</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="safety">
            <SafetyFeatures 
              user={user} 
              activeCheckIn={activeCheckIn}
              onCheckInUpdate={loadActiveCheckIn}
            />
          </TabsContent>

          <TabsContent value="search">
            <ImageSearch user={user} />
          </TabsContent>

          <TabsContent value="reviews">
            <CommunityReviews user={user} />
          </TabsContent>

          <TabsContent value="bot">
            <SafetyBot user={user} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileManager user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}