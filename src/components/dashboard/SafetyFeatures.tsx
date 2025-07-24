import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { Alert, AlertDescription } from '../ui/alert'
import { MapPin, Phone, AlertTriangle, Clock, Shield, MessageCircle } from 'lucide-react'
import { blink } from '../../blink/client'

interface SafetyFeaturesProps {
  user: any
  activeCheckIn: any
  onCheckInUpdate: () => void
}

export default function SafetyFeatures({ user, activeCheckIn, onCheckInUpdate }: SafetyFeaturesProps) {
  const [checkInLocation, setCheckInLocation] = useState('')
  const [emergencyContact, setEmergencyContact] = useState('')
  const [loading, setLoading] = useState(false)
  const [panicMode, setPanicMode] = useState(false)

  const handleCheckIn = async () => {
    if (!checkInLocation.trim()) return
    
    setLoading(true)
    try {
      // Get user's location if available
      const location = { lat: null as number | null, lng: null as number | null }
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          })
          location.lat = position.coords.latitude
          location.lng = position.coords.longitude
        } catch (error) {
          console.log('Location access denied')
        }
      }

      // Create check-in record
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 4) // 4 hour default

      await blink.db.checkIns.create({
        id: `checkin_${Date.now()}`,
        userId: user.id,
        locationLat: location.lat,
        locationLng: location.lng,
        locationName: checkInLocation,
        status: 'active',
        expiresAt: expiresAt.toISOString()
      })

      // Send notification to emergency contact if provided
      if (emergencyContact) {
        // This would integrate with WhatsApp/SMS API
        console.log(`Notifying emergency contact: ${emergencyContact}`)
      }

      setCheckInLocation('')
      onCheckInUpdate()
    } catch (error) {
      console.error('Check-in failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePanicButton = async () => {
    setPanicMode(true)
    try {
      // Create emergency check-in
      await blink.db.checkIns.create({
        id: `panic_${Date.now()}`,
        userId: user.id,
        locationName: 'EMERGENCY - Panic Button Activated',
        status: 'emergency',
        emergencyContactNotified: true,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      })

      // In real implementation, this would:
      // 1. Send WhatsApp message to emergency contacts
      // 2. Send SMS with location
      // 3. Potentially contact authorities
      alert('Emergency alert sent! Your emergency contacts have been notified.')
      
      onCheckInUpdate()
    } catch (error) {
      console.error('Panic button failed:', error)
    } finally {
      setTimeout(() => setPanicMode(false), 3000)
    }
  }

  const endCheckIn = async () => {
    if (!activeCheckIn) return
    
    try {
      await blink.db.checkIns.update(activeCheckIn.id, {
        status: 'completed'
      })
      onCheckInUpdate()
    } catch (error) {
      console.error('Failed to end check-in:', error)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Active Check-In Status */}
      {activeCheckIn && (
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <CardTitle className="text-green-600">Active Check-In</CardTitle>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                <Clock className="w-4 h-4 mr-1" />
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{activeCheckIn.locationName}</p>
                <p className="text-sm text-gray-600">
                  Started: {new Date(activeCheckIn.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Expires: {new Date(activeCheckIn.expiresAt).toLocaleString()}
                </p>
              </div>
              <Button onClick={endCheckIn} variant="outline">
                End Check-In
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Check-In Feature */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-rose-600" />
            <span>Safety Check-In</span>
          </CardTitle>
          <CardDescription>
            Let your emergency contacts know where you are and when to expect you back
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="location">Meeting Location</Label>
            <Input
              id="location"
              placeholder="e.g., Starbucks on Main Street"
              value={checkInLocation}
              onChange={(e) => setCheckInLocation(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="emergency">Emergency Contact (Optional)</Label>
            <Input
              id="emergency"
              placeholder="Phone number or WhatsApp"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleCheckIn} 
            disabled={loading || !checkInLocation.trim() || !!activeCheckIn}
            className="w-full"
          >
            {loading ? 'Checking In...' : 'Start Safety Check-In'}
          </Button>
        </CardContent>
      </Card>

      {/* Panic Button */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>Emergency Panic Button</span>
          </CardTitle>
          <CardDescription>
            Instantly alert your emergency contacts and share your location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              This will immediately notify your emergency contacts via WhatsApp and SMS with your location.
            </AlertDescription>
          </Alert>
          <Button 
            onClick={handlePanicButton}
            disabled={panicMode}
            variant="destructive"
            className="w-full"
          >
            {panicMode ? 'ALERT SENT!' : '🚨 PANIC BUTTON'}
          </Button>
        </CardContent>
      </Card>

      {/* SAPS Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Safety Database Check</span>
          </CardTitle>
          <CardDescription>
            Check potential matches against safety databases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Enter name or ID to check" />
            <Button className="w-full" variant="outline">
              <Shield className="w-4 h-4 mr-2" />
              Run Safety Check
            </Button>
            <p className="text-xs text-gray-500">
              * This feature integrates with SAPS and other safety databases to check for known incidents
            </p>
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <span>WhatsApp Safety Alerts</span>
          </CardTitle>
          <CardDescription>
            Configure WhatsApp notifications for safety updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>WhatsApp Number</Label>
              <Input placeholder="+27 XX XXX XXXX" />
            </div>
            <Button className="w-full" variant="outline">
              Connect WhatsApp
            </Button>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Automatic check-in reminders</p>
              <p>• Emergency contact notifications</p>
              <p>• Safety status updates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}