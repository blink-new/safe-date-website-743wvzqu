import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { Alert, AlertDescription } from '../ui/alert'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { User, Shield, Phone, Mail, MapPin, Camera, CheckCircle, AlertTriangle } from 'lucide-react'
import { blink } from '../../blink/client'

interface ProfileManagerProps {
  user: any
}

export default function ProfileManager({ user }: ProfileManagerProps) {
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    age: '',
    location: '',
    phoneNumber: '',
    emergencyContact: '',
    emergencyContactName: '',
    privacySettings: {
      showLocation: false,
      allowImageSearch: true,
      shareWithEmergencyContact: true,
      publicProfile: false
    },
    verificationStatus: {
      email: true,
      phone: false,
      identity: false,
      background: false
    }
  })
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  const loadProfile = useCallback(async () => {
    try {
      const profiles = await blink.db.userProfiles.list({
        where: { userId: user.id }
      })
      
      if (profiles.length > 0) {
        const userProfile = profiles[0]
        setProfile(prev => ({
          ...prev,
          displayName: userProfile.displayName || '',
          bio: userProfile.bio || '',
          age: userProfile.age || '',
          location: userProfile.location || '',
          phoneNumber: userProfile.phoneNumber || '',
          emergencyContact: userProfile.emergencyContact || '',
          emergencyContactName: userProfile.emergencyContactName || '',
          privacySettings: userProfile.privacySettings ? JSON.parse(userProfile.privacySettings) : prev.privacySettings,
          verificationStatus: userProfile.verificationStatus ? JSON.parse(userProfile.verificationStatus) : prev.verificationStatus
        }))
        if (userProfile.profileImageUrl) {
          setImagePreview(userProfile.profileImageUrl)
        }
      }
    } catch (error) {
      console.error('Failed to load profile:', error)
    }
  }, [user.id])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      let profileImageUrl = imagePreview

      // Upload new profile image if selected
      if (profileImage) {
        const { publicUrl } = await blink.storage.upload(
          profileImage,
          `profiles/${user.id}/avatar.${profileImage.name.split('.').pop()}`,
          { upsert: true }
        )
        profileImageUrl = publicUrl
      }

      // Check if profile exists
      const existingProfiles = await blink.db.userProfiles.list({
        where: { userId: user.id }
      })

      const profileData = {
        userId: user.id,
        displayName: profile.displayName,
        bio: profile.bio,
        age: profile.age,
        location: profile.location,
        phoneNumber: profile.phoneNumber,
        emergencyContact: profile.emergencyContact,
        emergencyContactName: profile.emergencyContactName,
        profileImageUrl,
        privacySettings: JSON.stringify(profile.privacySettings),
        verificationStatus: JSON.stringify(profile.verificationStatus),
        updatedAt: new Date().toISOString()
      }

      if (existingProfiles.length > 0) {
        await blink.db.userProfiles.update(existingProfiles[0].id, profileData)
      } else {
        await blink.db.userProfiles.create({
          id: `profile_${user.id}`,
          ...profileData,
          createdAt: new Date().toISOString()
        })
      }

      alert('✅ Profile updated successfully!')
    } catch (error) {
      console.error('Failed to save profile:', error)
      alert('❌ Failed to save profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneVerification = async () => {
    if (!profile.phoneNumber) {
      alert('Please enter a phone number first')
      return
    }

    try {
      // Mock phone verification - in real implementation, this would send SMS OTP
      const otp = prompt('Enter the OTP sent to your phone (demo: use 123456):')
      if (otp === '123456') {
        setProfile(prev => ({
          ...prev,
          verificationStatus: {
            ...prev.verificationStatus,
            phone: true
          }
        }))
        alert('✅ Phone number verified successfully!')
      } else {
        alert('❌ Invalid OTP. Please try again.')
      }
    } catch (error) {
      console.error('Phone verification failed:', error)
    }
  }

  const handleIdentityVerification = async () => {
    // Mock identity verification - in real implementation, this would integrate with ID verification service
    const confirmed = confirm('This will redirect you to our identity verification partner. Continue?')
    if (confirmed) {
      // Simulate verification process
      setTimeout(() => {
        setProfile(prev => ({
          ...prev,
          verificationStatus: {
            ...prev.verificationStatus,
            identity: true
          }
        }))
        alert('✅ Identity verification completed!')
      }, 2000)
    }
  }

  const getVerificationScore = () => {
    const verifications = Object.values(profile.verificationStatus)
    const completed = verifications.filter(Boolean).length
    return Math.round((completed / verifications.length) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-rose-600" />
              <CardTitle>Profile Management</CardTitle>
            </div>
            <Badge variant={getVerificationScore() >= 75 ? "default" : "secondary"}>
              {getVerificationScore()}% Verified
            </Badge>
          </div>
          <CardDescription>
            Manage your profile information and verification status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="profile-image"
              />
              <label
                htmlFor="profile-image"
                className="absolute -bottom-1 -right-1 bg-rose-600 text-white rounded-full p-1 cursor-pointer hover:bg-rose-700"
              >
                <Camera className="w-3 h-3" />
              </label>
            </div>
            <div>
              <h3 className="font-medium">{profile.displayName || user.email}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      getVerificationScore() >= 75 ? 'bg-green-500' :
                      getVerificationScore() >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${getVerificationScore()}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{getVerificationScore()}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={profile.displayName}
                onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                placeholder="Your display name"
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Your age"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell others about yourself..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, Country"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex space-x-2">
                <Input
                  id="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={(e) => setProfile(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="+27 XX XXX XXXX"
                  className="flex-1"
                />
                <Button
                  onClick={handlePhoneVerification}
                  variant="outline"
                  size="sm"
                  disabled={!profile.phoneNumber || profile.verificationStatus.phone}
                >
                  {profile.verificationStatus.phone ? 'Verified' : 'Verify'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-orange-600" />
            <span>Emergency Contacts</span>
          </CardTitle>
          <CardDescription>
            Set up emergency contacts for safety check-ins and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input
                id="emergencyContactName"
                value={profile.emergencyContactName}
                onChange={(e) => setProfile(prev => ({ ...prev, emergencyContactName: e.target.value }))}
                placeholder="Contact person's name"
              />
            </div>
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
              <Input
                id="emergencyContact"
                value={profile.emergencyContact}
                onChange={(e) => setProfile(prev => ({ ...prev, emergencyContact: e.target.value }))}
                placeholder="+27 XX XXX XXXX"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Verification Status</span>
          </CardTitle>
          <CardDescription>
            Complete verifications to increase your trust score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email Verification</p>
                  <p className="text-sm text-gray-600">Verify your email address</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium">Phone Verification</p>
                  <p className="text-sm text-gray-600">Verify your phone number via SMS</p>
                </div>
              </div>
              {profile.verificationStatus.phone ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Button onClick={handlePhoneVerification} size="sm" variant="outline">
                  Verify Now
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium">Identity Verification</p>
                  <p className="text-sm text-gray-600">Verify with government ID</p>
                </div>
              </div>
              {profile.verificationStatus.identity ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Button onClick={handleIdentityVerification} size="sm" variant="outline">
                  Verify Now
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium">Background Check</p>
                  <p className="text-sm text-gray-600">Optional criminal background check</p>
                </div>
              </div>
              <Badge variant="secondary">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Pending
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>
            Control how your information is shared and used
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Location</p>
                <p className="text-sm text-gray-600">Allow others to see your general location</p>
              </div>
              <Switch
                checked={profile.privacySettings.showLocation}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    privacySettings: { ...prev.privacySettings, showLocation: checked }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Allow Image Search</p>
                <p className="text-sm text-gray-600">Let others search for you using photos</p>
              </div>
              <Switch
                checked={profile.privacySettings.allowImageSearch}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    privacySettings: { ...prev.privacySettings, allowImageSearch: checked }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Share with Emergency Contact</p>
                <p className="text-sm text-gray-600">Share safety status with emergency contacts</p>
              </div>
              <Switch
                checked={profile.privacySettings.shareWithEmergencyContact}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    privacySettings: { ...prev.privacySettings, shareWithEmergencyContact: checked }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Public Profile</p>
                <p className="text-sm text-gray-600">Make your profile visible to all users</p>
              </div>
              <Switch
                checked={profile.privacySettings.publicProfile}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    privacySettings: { ...prev.privacySettings, publicProfile: checked }
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveProfile} disabled={loading} className="px-8">
          {loading ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </div>
  )
}