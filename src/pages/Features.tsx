import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Shield, 
  UserCheck, 
  Lock, 
  MapPin, 
  MessageSquare, 
  Star,
  Eye,
  AlertTriangle,
  Phone,
  Camera,
  FileText,
  Users
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: UserCheck,
      title: "Multi-Layer Identity Verification",
      description: "Comprehensive verification process including government ID, phone number, email, and optional biometric confirmation.",
      details: [
        "Government-issued ID verification",
        "Phone number confirmation via SMS",
        "Email address verification",
        "Optional facial recognition matching",
        "Social media account linking"
      ],
      badge: "Core Feature",
      badgeColor: "bg-green-100 text-green-800"
    },
    {
      icon: Shield,
      title: "Background Check Integration",
      description: "Optional comprehensive background screening through trusted third-party providers for enhanced safety.",
      details: [
        "Criminal history screening",
        "Sex offender registry check",
        "Identity fraud detection",
        "Professional verification",
        "Reference checks available"
      ],
      badge: "Premium",
      badgeColor: "bg-blue-100 text-blue-800"
    },
    {
      icon: MessageSquare,
      title: "Secure Communication",
      description: "End-to-end encrypted messaging with advanced privacy features and screenshot protection.",
      details: [
        "End-to-end encryption",
        "Screenshot detection & blocking",
        "Disappearing messages",
        "Message recall feature",
        "Safe word emergency alerts"
      ],
      badge: "Security",
      badgeColor: "bg-purple-100 text-purple-800"
    },
    {
      icon: MapPin,
      title: "Safe Meeting Places",
      description: "Curated database of verified safe public locations with security features and good lighting.",
      details: [
        "Security camera presence verified",
        "Well-lit public areas",
        "Staff-monitored locations",
        "Emergency services nearby",
        "User safety ratings"
      ],
      badge: "Location",
      badgeColor: "bg-orange-100 text-orange-800"
    },
    {
      icon: Eye,
      title: "Privacy Control Center",
      description: "Granular privacy settings to control visibility of your profile, photos, and personal information.",
      details: [
        "Profile visibility controls",
        "Photo access permissions",
        "Location sharing settings",
        "Contact information privacy",
        "Activity status controls"
      ],
      badge: "Privacy",
      badgeColor: "bg-indigo-100 text-indigo-800"
    },
    {
      icon: Star,
      title: "AI Safety Score",
      description: "Machine learning algorithms analyze user behavior and profile authenticity to generate safety ratings.",
      details: [
        "Profile authenticity analysis",
        "Behavioral pattern recognition",
        "Communication style assessment",
        "Photo verification scoring",
        "Community feedback integration"
      ],
      badge: "AI Powered",
      badgeColor: "bg-yellow-100 text-yellow-800"
    },
    {
      icon: AlertTriangle,
      title: "Emergency Features",
      description: "Built-in safety tools including panic buttons, emergency contacts, and automatic check-ins.",
      details: [
        "One-touch emergency alerts",
        "Automatic check-in reminders",
        "Emergency contact notifications",
        "Location sharing with trusted contacts",
        "Integration with local emergency services"
      ],
      badge: "Emergency",
      badgeColor: "bg-red-100 text-red-800"
    },
    {
      icon: Users,
      title: "Community Safety Network",
      description: "User-driven safety reporting system with community moderation and rapid response protocols.",
      details: [
        "User reporting system",
        "Community moderation",
        "Rapid response team",
        "Safety incident tracking",
        "Preventive action protocols"
      ],
      badge: "Community",
      badgeColor: "bg-teal-100 text-teal-800"
    },
    {
      icon: Phone,
      title: "Video Call Verification",
      description: "Secure in-app video calling with identity confirmation before meeting in person.",
      details: [
        "In-app video calling",
        "Identity confirmation during calls",
        "Call recording for safety",
        "Screen sharing prevention",
        "Call quality monitoring"
      ],
      badge: "Verification",
      badgeColor: "bg-pink-100 text-pink-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Advanced Safety Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive security tools designed to protect you at every step of your dating journey. 
            From verification to communication, we've got your safety covered.
          </p>
          <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white">
            Start Your Safe Dating Journey
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-orange-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-rose-600" />
                  </div>
                  <Badge className={feature.badgeColor}>
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-white rounded-2xl shadow-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Experience the Safest Dating Platform
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join millions of verified users who trust SafeDate for secure online dating. 
            Your safety is our priority, your happiness is our goal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;