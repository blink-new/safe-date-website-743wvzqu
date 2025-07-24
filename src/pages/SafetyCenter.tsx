import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Shield, 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Eye, 
  MessageSquare,
  FileText,
  Users,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

const SafetyCenter = () => {
  const safetyTips = [
    {
      category: "Before Meeting",
      icon: Eye,
      tips: [
        "Always verify the person's identity through video chat before meeting",
        "Research their social media profiles and cross-reference information",
        "Trust your instincts - if something feels off, don't proceed",
        "Never share personal information like your address or workplace",
        "Use SafeDate's secure messaging system for all communications"
      ]
    },
    {
      category: "First Date Safety",
      icon: MapPin,
      tips: [
        "Always meet in a public place with good lighting and security cameras",
        "Choose locations from our verified safe meeting places list",
        "Inform a trusted friend or family member about your plans",
        "Arrange your own transportation - don't rely on your date",
        "Keep your phone charged and easily accessible"
      ]
    },
    {
      category: "Communication Safety",
      icon: MessageSquare,
      tips: [
        "Use SafeDate's encrypted messaging system exclusively",
        "Never share financial information or send money",
        "Be cautious of anyone asking for personal photos",
        "Report suspicious behavior immediately to our safety team",
        "Don't share your real phone number until you're comfortable"
      ]
    },
    {
      category: "Red Flags to Watch",
      icon: AlertTriangle,
      tips: [
        "Refuses to video chat or meet in public places",
        "Asks for money, gifts, or financial information",
        "Has inconsistent stories or limited photos",
        "Pressures you to move off the platform quickly",
        "Shows aggressive or controlling behavior"
      ]
    }
  ];

  const emergencyResources = [
    {
      title: "National Domestic Violence Hotline",
      phone: "1-800-799-7233",
      description: "24/7 confidential support for domestic violence survivors",
      website: "thehotline.org"
    },
    {
      title: "RAINN National Sexual Assault Hotline",
      phone: "1-800-656-4673",
      description: "24/7 support for sexual assault survivors",
      website: "rainn.org"
    },
    {
      title: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "24/7 crisis support via text message",
      website: "crisistextline.org"
    },
    {
      title: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7 suicide prevention and crisis support",
      website: "suicidepreventionlifeline.org"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Safety Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive guide to safe online dating. Learn how to protect yourself, 
            recognize warning signs, and access emergency resources when needed.
          </p>
        </div>

        {/* Safety Tips Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Essential Safety Guidelines
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {safetyTips.map((section, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-rose-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {section.category}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Resources */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Emergency Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              If you're in immediate danger, call 911. For other support needs, 
              these resources are available 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencyResources.map((resource, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">
                      {resource.title}
                    </h3>
                    <Badge className="bg-red-100 text-red-800 ml-2">
                      24/7
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="font-medium text-gray-900">{resource.phone}</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {resource.description}
                    </p>
                    <a 
                      href={`https://${resource.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-rose-600 hover:text-rose-700 text-sm font-medium"
                    >
                      Visit {resource.website}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Report Incident Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-20">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Report a Safety Incident
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you've experienced harassment, threats, or any safety concerns on SafeDate, 
              please report it immediately. Our safety team investigates all reports within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                Report Incident
              </Button>
              <Button size="lg" variant="outline">
                Contact Safety Team
              </Button>
            </div>
          </div>
        </div>

        {/* Safety Features Highlight */}
        <div className="bg-gradient-to-r from-rose-600 to-orange-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Your Safety is Our Priority
          </h2>
          <p className="text-rose-100 mb-6 max-w-2xl mx-auto">
            SafeDate employs advanced security measures, AI-powered safety scoring, 
            and a dedicated safety team to ensure your dating experience is secure and positive.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>24/7 Safety Monitoring</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>Dedicated Safety Team</span>
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              <span>Incident Response Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyCenter;