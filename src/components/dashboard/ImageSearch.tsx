import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Alert, AlertDescription } from '../ui/alert'
import { Camera, Upload, Search, AlertTriangle, Star, Shield } from 'lucide-react'
import { blink } from '../../blink/client'

interface ImageSearchProps {
  user: any
}

export default function ImageSearch({ user }: ImageSearchProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [searchResults, setSearchResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleImageSearch = async () => {
    if (!selectedFile) return

    setLoading(true)
    try {
      // Upload image to storage first
      const { publicUrl } = await blink.storage.upload(
        selectedFile,
        `image-searches/${user.id}/${Date.now()}.${selectedFile.name.split('.').pop()}`,
        { upsert: true }
      )

      // Mock search results - in real implementation, this would call
      // facial recognition API or reverse image search service
      const mockResults = {
        matches: [
          {
            id: 'match_1',
            name: 'John Smith',
            platform: 'Dating App X',
            similarity: 95,
            verified: true,
            safetyScore: 85,
            reviews: [
              { rating: 4, comment: 'Great conversation, felt safe throughout the date' },
              { rating: 5, comment: 'Respectful and genuine person' }
            ],
            warnings: []
          },
          {
            id: 'match_2',
            name: 'Unknown Profile',
            platform: 'Social Media',
            similarity: 78,
            verified: false,
            safetyScore: 45,
            reviews: [],
            warnings: ['Multiple fake profiles reported', 'Inconsistent information']
          }
        ],
        searchTime: Date.now()
      }

      // Save search to database
      await blink.db.imageSearches.create({
        id: `search_${Date.now()}`,
        userId: user.id,
        imageUrl: publicUrl,
        searchResults: JSON.stringify(mockResults)
      })

      setSearchResults(mockResults)
    } catch (error) {
      console.error('Image search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    setSearchResults(null)
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-rose-600" />
            <span>Upload Photo to See Reviews</span>
          </CardTitle>
          <CardDescription>
            Upload a photo to search for reviews and safety information about potential matches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!selectedFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Drop an image here or click to upload</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Choose Image
                  </Button>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-xs max-h-64 rounded-lg border"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleImageSearch} disabled={loading} className="flex-1">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Search for Reviews
                      </>
                    )}
                  </Button>
                  <Button onClick={clearSearch} variant="outline">
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {searchResults.matches.length} potential matches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.matches.map((match: any) => (
                <div key={match.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{match.name}</h3>
                      <p className="text-sm text-gray-600">{match.platform}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={match.verified ? "default" : "secondary"}>
                        {match.similarity}% match
                      </Badge>
                      {match.verified && (
                        <Badge className="bg-green-100 text-green-800">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Safety Score</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              match.safetyScore >= 70 ? 'bg-green-500' :
                              match.safetyScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${match.safetyScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{match.safetyScore}/100</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Community Reviews</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= (match.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / match.reviews.length || 0)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({match.reviews.length} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {match.warnings.length > 0 && (
                    <Alert className="mt-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Safety Warnings:</strong>
                        <ul className="mt-1 list-disc list-inside">
                          {match.warnings.map((warning: string, index: number) => (
                            <li key={index} className="text-sm">{warning}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {match.reviews.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium text-sm mb-2">Recent Reviews</h4>
                      <div className="space-y-2">
                        {match.reviews.slice(0, 2).map((review: any, index: number) => (
                          <div key={index} className="bg-gray-50 rounded p-3">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">How Image Search Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Upload a photo of someone you're considering meeting</p>
            <p>• Our AI searches across dating platforms and social media</p>
            <p>• View community reviews and safety ratings</p>
            <p>• Get warnings about potential red flags or fake profiles</p>
            <p>• All searches are private and encrypted</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}