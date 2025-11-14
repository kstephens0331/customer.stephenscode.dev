import React, { useState, useContext } from 'react';
import { doc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthProvider';

export default function ReviewModule() {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleStarClick = async (selectedRating) => {
    setRating(selectedRating);

    if (selectedRating === 5) {
      // 5 stars - redirect to Google Reviews
      window.open('https://g.page/r/CfXKZ8uMxQ5zEBM/review', '_blank');
      setSubmitted(true);
      setMessage('Thank you for your 5-star review! Redirecting you to Google Reviews...');
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setMessage('Please provide your feedback');
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'privateFeedback'), {
        userId: user.uid,
        userEmail: user.email,
        rating,
        feedback,
        createdAt: serverTimestamp(),
        status: 'pending'
      });

      setSubmitted(true);
      setMessage('Thank you for your feedback! We will review it and reach out to you.');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Error submitting feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setRating(0);
    setFeedback('');
    setSubmitted(false);
    setMessage('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Share Your Experience
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Your feedback helps us improve our services
          </p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 backdrop-blur-sm">
          <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm text-slate-300 font-semibold">Review System</span>
        </div>
      </div>

      {/* Main Review Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 border border-slate-600/50 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>
        <div className="relative">
          {!submitted ? (
            <>
              {/* Rating Section */}
              <div className="text-center mb-8">
                <div className="flex items-center gap-3 justify-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Rate Your Experience</h2>
                </div>

                <p className="text-slate-300 mb-6">
                  How would you rate your experience with StephensCode?
                </p>

                {/* Star Rating */}
                <div className="flex justify-center gap-3 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform duration-200 hover:scale-125 focus:outline-none"
                    >
                      <svg
                        className={`w-16 h-16 transition-colors duration-200 ${
                          star <= (hoveredRating || rating)
                            ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                            : 'text-slate-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>

                {rating > 0 && rating < 5 && (
                  <p className="text-sm text-slate-400">
                    You selected {rating} star{rating !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {/* Feedback Form (shown only for ratings 1-4) */}
              {rating > 0 && rating < 5 && (
                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                    <div className="flex items-start gap-3 mb-4">
                      <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="text-white font-semibold mb-1">We Value Your Feedback</h3>
                        <p className="text-sm text-slate-400">
                          This feedback is private and will not be published. We'll review your comments and reach out to address any concerns.
                        </p>
                      </div>
                    </div>

                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Please share your experience
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Tell us what we could improve..."
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </form>
              )}
            </>
          ) : (
            /* Success Message */
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {rating === 5 ? 'Thank You!' : 'Feedback Received'}
              </h3>

              <p className="text-slate-300 mb-6 max-w-md mx-auto">
                {message}
              </p>

              {rating < 5 && (
                <button
                  onClick={resetForm}
                  className="px-6 py-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold transition-all"
                >
                  Submit Another Review
                </button>
              )}
            </div>
          )}

          {message && !submitted && (
            <div className={`mt-4 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 'bg-blue-500/20 border border-blue-500/50 text-blue-400'}`}>
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Information Cards */}
      {!submitted && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 5 Star Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-600/10 p-6 border-2 border-yellow-500/30 overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }} />
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">5-Star Reviews</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Love our service? Give us 5 stars and you'll be redirected to share your experience on Google Reviews. Help others discover StephensCode!
              </p>
            </div>
          </div>

          {/* Private Feedback Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-6 border-2 border-blue-500/30 overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }} />
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Private Feedback</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Ratings under 5 stars stay private. Your feedback helps us improve, and we'll personally reach out to address your concerns. Nothing is published without your permission.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
