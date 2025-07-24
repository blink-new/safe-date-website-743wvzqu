import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Shield, 
  CheckCircle, 
  Users, 
  Lock, 
  Heart, 
  Star,
  ArrowRight,
  MapPin,
  MessageSquare,
  UserCheck
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-white to-orange-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100">
                <Shield className="w-4 h-4 mr-2" />
                #1 Most Secure Dating Platform
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Date Safely,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500">
                {' '}Love Confidently
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The only dating platform with military-grade security, identity verification, 
              and comprehensive safety tools. Connect with verified singles in a protected environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/dashboard">
                <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 text-lg">
                  Start Dating Safely
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-gray-300">
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>100% Identity Verified</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-blue-500 mr-2" />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-purple-500 mr-2" />
                <span>2M+ Safe Connections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why SafeDate is Different
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced security features that put your safety first, without compromising on the dating experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Identity Verification */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-6">
                  <UserCheck className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Identity Verification</h3>
                <p className="text-gray-600 mb-4">
                  Multi-step verification process including government ID, phone number, and biometric confirmation.
                </p>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </CardContent>
            </Card>

            {/* Background Checks */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Background Checks</h3>
                <p className="text-gray-600 mb-4">
                  Optional comprehensive background screening to ensure you're connecting with trustworthy individuals.
                </p>
                <Badge className="bg-blue-100 text-blue-800">
                  Premium Feature
                </Badge>
              </CardContent>
            </Card>

            {/* Safe Meeting Places */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Safe Meeting Places</h3>
                <p className="text-gray-600 mb-4">
                  Curated list of verified safe public locations with security cameras and good lighting.
                </p>
                <Badge className="bg-orange-100 text-orange-800">
                  Location Verified
                </Badge>
              </CardContent>
            </Card>

            {/* Secure Messaging */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure Messaging</h3>
                <p className="text-gray-600 mb-4">
                  End-to-end encrypted messages with screenshot protection and disappearing message options.
                </p>
                <Badge className="bg-purple-100 text-purple-800">
                  <Lock className="w-3 h-3 mr-1" />
                  Encrypted
                </Badge>
              </CardContent>
            </Card>

            {/* Privacy Controls */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy Controls</h3>
                <p className="text-gray-600 mb-4">
                  Granular privacy settings to control who sees your profile, photos, and personal information.
                </p>
                <Badge className="bg-green-100 text-green-800">
                  Full Control
                </Badge>
              </CardContent>
            </Card>

            {/* Safety Score */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Score</h3>
                <p className="text-gray-600 mb-4">
                  AI-powered safety rating system that evaluates profile authenticity and user behavior patterns.
                </p>
                <Badge className="bg-yellow-100 text-yellow-800">
                  AI Powered
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Millions
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from users who found love safely on SafeDate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                location: "New York",
                text: "Finally, a dating app that takes safety seriously. The verification process gave me confidence, and I met my fiancé here!",
                rating: 5
              },
              {
                name: "Michael R.",
                location: "Los Angeles",
                text: "The background check feature is a game-changer. I feel so much safer knowing everyone is verified.",
                rating: 5
              },
              {
                name: "Emma L.",
                location: "Chicago",
                text: "The safe meeting place suggestions helped me feel comfortable on first dates. Great platform!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Love Safely?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Join over 2 million verified singles who trust SafeDate for secure online dating.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Create Free Account
                <Heart className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-600 px-8 py-4 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;