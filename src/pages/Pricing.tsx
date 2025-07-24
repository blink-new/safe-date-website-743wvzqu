import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CheckCircle, X, Star, Shield, Crown } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "Forever",
      description: "Essential safety features for secure dating",
      icon: Shield,
      popular: false,
      features: [
        "Identity verification",
        "Secure messaging",
        "Basic privacy controls",
        "Safe meeting place suggestions",
        "Community safety reporting",
        "Basic customer support"
      ],
      notIncluded: [
        "Background checks",
        "Video call verification",
        "AI safety scoring",
        "Priority support",
        "Advanced privacy controls"
      ]
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "per month",
      description: "Advanced safety features for confident dating",
      icon: Star,
      popular: true,
      features: [
        "Everything in Basic",
        "Comprehensive background checks",
        "Video call verification",
        "AI safety scoring",
        "Advanced privacy controls",
        "Emergency contact features",
        "Priority customer support",
        "Unlimited secure messaging"
      ],
      notIncluded: [
        "Dedicated safety concierge",
        "Personal safety consultation"
      ]
    },
    {
      name: "Elite",
      price: "$39.99",
      period: "per month",
      description: "Maximum security with personal safety concierge",
      icon: Crown,
      popular: false,
      features: [
        "Everything in Premium",
        "Dedicated safety concierge",
        "Personal safety consultation",
        "Enhanced background screening",
        "Real-time safety monitoring",
        "VIP customer support",
        "Custom safety protocols",
        "Exclusive verified member network"
      ],
      notIncluded: []
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Safety Level
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Select the plan that best fits your safety needs. All plans include our core security features, 
            with premium options offering enhanced protection and personalized support.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>30-day money-back guarantee</span>
            <span className="mx-2">•</span>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                plan.popular ? 'ring-2 ring-rose-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-rose-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-6 h-6 text-rose-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period !== "Forever" && (
                    <span className="text-gray-500 ml-2">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <Button 
                  className={`w-full mb-6 ${
                    plan.popular 
                      ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                  size="lg"
                >
                  {plan.name === "Basic" ? "Get Started Free" : `Choose ${plan.name}`}
                </Button>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-900 mb-3 mt-6">Not included:</h4>
                      {plan.notIncluded.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-500 text-sm">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's included in the background check?
              </h3>
              <p className="text-gray-600 text-sm">
                Our background checks include criminal history screening, sex offender registry verification, 
                and identity fraud detection through trusted third-party providers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes, you can cancel your subscription at any time. You'll continue to have access to premium 
                features until the end of your current billing period.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does the AI safety scoring work?
              </h3>
              <p className="text-gray-600 text-sm">
                Our AI analyzes profile authenticity, communication patterns, and user behavior to generate 
                safety scores that help you make informed decisions about potential matches.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is a safety concierge?
              </h3>
              <p className="text-gray-600 text-sm">
                Elite members get access to a dedicated safety expert who provides personalized safety advice, 
                custom protocols, and priority support for any safety concerns.
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Enterprise Solutions
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Looking for custom safety solutions for your organization or dating service? 
            We offer white-label safety technology and consulting services.
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;