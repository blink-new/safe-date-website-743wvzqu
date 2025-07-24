import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { MessageCircle, Bot, User, Send, Shield, AlertTriangle } from 'lucide-react'
import { blink } from '../../blink/client'

interface SafetyBotProps {
  user: any
}

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

export default function SafetyBot({ user }: SafetyBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm SafeDate Bot, your AI safety assistant. I can help you with concerns about potential matches, analyze profiles for red flags, and provide safety advice. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setLoading(true)

    try {
      // Generate AI response using Blink AI
      const { text } = await blink.ai.generateText({
        prompt: `You are SafeDate Bot, an AI safety assistant for online dating. You help users stay safe by:
        - Analyzing potential matches for red flags
        - Providing safety advice for online dating
        - Answering questions about dating safety
        - Reviewing profiles and conversations for warning signs
        - Suggesting safety precautions for meetups

        User question: "${inputMessage}"

        Respond helpfully and focus on safety. Be supportive but direct about potential risks. If asked about a specific person or situation, provide practical safety advice.`,
        maxTokens: 300
      })

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: text,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error generating response:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "How can I verify someone's identity?",
    "What are red flags to watch for?",
    "How to plan a safe first date?",
    "Someone is asking for money - is this normal?",
    "How to do a background check?",
    "What if someone won't video chat?"
  ]

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-rose-600" />
            <span>SafeDate AI Assistant</span>
            <Badge className="bg-green-100 text-green-800">
              <Shield className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </CardTitle>
          <CardDescription>
            Get instant safety advice and profile analysis from our AI assistant
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Chat Interface */}
      <Card>
        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-rose-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && (
                      <Bot className="w-4 h-4 mt-1 text-rose-600" />
                    )}
                    {message.type === 'user' && (
                      <User className="w-4 h-4 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-rose-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-rose-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about dating safety, red flags, or profile analysis..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={loading || !inputMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Safety Questions</CardTitle>
          <CardDescription>
            Click on any question to get instant advice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left justify-start h-auto p-3"
                onClick={() => handleQuickQuestion(question)}
              >
                <MessageCircle className="w-4 h-4 mr-2 text-rose-600" />
                <span className="text-sm">{question}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span>AI Safety Analysis Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Profile Analysis</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Detect fake or stolen photos</li>
                <li>• Identify inconsistent information</li>
                <li>• Flag suspicious behavior patterns</li>
                <li>• Check against known scammer databases</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Conversation Analysis</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Detect manipulation tactics</li>
                <li>• Identify love bombing patterns</li>
                <li>• Flag requests for money/personal info</li>
                <li>• Analyze communication consistency</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}