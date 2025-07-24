import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import { Star, Shield, User, MessageCircle } from 'lucide-react'
import { blink } from '../../blink/client'

interface CommunityReviewsProps {
  user: any
}

export default function CommunityReviews({ user }: CommunityReviewsProps) {
  const [reviews, setReviews] = useState([])
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    reviewedUserId: '',
    trustRating: 5,
    safetyRating: 5,
    communicationRating: 5,
    reviewText: ''
  })
  const [loading, setLoading] = useState(false)

  const loadReviews = useCallback(async () => {
    try {
      const userReviews = await blink.db.reviews.list({
        where: { reviewerUserId: user.id },
        orderBy: { createdAt: 'desc' },
        limit: 20
      })
      setReviews(userReviews)
    } catch (error) {
      console.error('Error loading reviews:', error)
    }
  }, [user.id])

  useEffect(() => {
    if (user?.id) {
      loadReviews()
    }
  }, [user?.id, loadReviews])

  const handleSubmitReview = async () => {
    if (!reviewForm.reviewedUserId.trim() || !reviewForm.reviewText.trim()) return

    setLoading(true)
    try {
      await blink.db.reviews.create({
        id: `review_${Date.now()}`,
        reviewerUserId: user.id,
        reviewedUserId: reviewForm.reviewedUserId,
        trustRating: reviewForm.trustRating,
        safetyRating: reviewForm.safetyRating,
        communicationRating: reviewForm.communicationRating,
        reviewText: reviewForm.reviewText,
        isVerifiedReviewer: true // In real app, this would be based on user verification status
      })

      setReviewForm({
        reviewedUserId: '',
        trustRating: 5,
        safetyRating: 5,
        communicationRating: 5,
        reviewText: ''
      })
      setShowReviewForm(false)
      loadReviews()
    } catch (error) {
      console.error('Error submitting review:', error)
    } finally {
      setLoading(false)
    }
  }

  const StarRating = ({ rating, onRatingChange, label }: { rating: number, onRatingChange?: (rating: number) => void, label: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 cursor-pointer ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => onRatingChange?.(star)}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Community Reviews</h2>
          <p className="text-gray-600">Help keep the community safe by sharing your experiences</p>
        </div>
        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? 'Cancel' : 'Write Review'}
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            <CardDescription>
              Share your experience to help others make safer dating decisions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="reviewedUserId">Person's Profile ID or Name</Label>
              <Input
                id="reviewedUserId"
                placeholder="Enter profile ID or full name"
                value={reviewForm.reviewedUserId}
                onChange={(e) => setReviewForm({ ...reviewForm, reviewedUserId: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StarRating
                rating={reviewForm.trustRating}
                onRatingChange={(rating) => setReviewForm({ ...reviewForm, trustRating: rating })}
                label="Trust & Honesty"
              />
              <StarRating
                rating={reviewForm.safetyRating}
                onRatingChange={(rating) => setReviewForm({ ...reviewForm, safetyRating: rating })}
                label="Safety & Respect"
              />
              <StarRating
                rating={reviewForm.communicationRating}
                onRatingChange={(rating) => setReviewForm({ ...reviewForm, communicationRating: rating })}
                label="Communication"
              />
            </div>

            <div>
              <Label htmlFor="reviewText">Your Experience</Label>
              <Textarea
                id="reviewText"
                placeholder="Share details about your experience. Be honest and constructive..."
                value={reviewForm.reviewText}
                onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                rows={4}
              />
            </div>

            <Button onClick={handleSubmitReview} disabled={loading} className="w-full">
              {loading ? 'Submitting...' : 'Submit Review'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Reviews</CardTitle>
          <CardDescription>
            Reviews you've written to help the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">You haven't written any reviews yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Help the community by sharing your dating experiences
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review: any) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium">Review for: {review.reviewedUserId}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified Reviewer
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Trust</div>
                      <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.trustRating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Safety</div>
                      <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.safetyRating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Communication</div>
                      <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.communicationRating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-sm text-gray-700">{review.reviewText}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <User className="w-8 h-8 text-rose-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-sm text-gray-600">Verified Reviewers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">8,932</div>
            <div className="text-sm text-gray-600">Community Reviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-gray-600">Safety Score Average</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}