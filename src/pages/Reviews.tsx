import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Send, User, MessageSquare, CheckCircle } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Excellent service! My tires were fitted and balanced in no time. Highly recommend Tyre Zone.",
    date: "2026-03-10"
  },
  {
    id: 2,
    name: "Sarah Smith",
    rating: 4,
    comment: "Great experience. The staff was very professional and the prices were fair.",
    date: "2026-03-12"
  }
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim() || !comment.trim()) {
      setFormError("Please fill in both your name and your experience.");
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setName('');
    setComment('');
    setRating(5);
    setSubmitted(true);
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-bold uppercase mb-12 border-l-8 border-red-600 pl-6"
        >
          Client Reviews
        </motion.h1>

        {/* Review Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800 mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="text-red-600" />
            Leave a Review
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold uppercase text-gray-400 mb-2">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    placeholder="Enter your name"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-red-600 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase text-gray-400 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <Star 
                        size={28} 
                        className={star <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-600"} 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold uppercase text-gray-400 mb-2">Your Experience</label>
              <textarea 
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  if (formError) setFormError(null);
                }}
                placeholder="Tell us about your visit..."
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 outline-none focus:border-red-600 transition resize-none"
              ></textarea>
            </div>

            {formError && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm font-bold"
              >
                {formError}
              </motion.p>
            )}

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <Send size={18} />
              Submit Review
            </button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-400 flex items-center gap-2"
              >
                <CheckCircle size={18} />
                Thank you! Your review has been submitted successfully.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Reviews List */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold uppercase mb-8">Recent Feedback</h2>
          {reviews.map((review) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 p-6 rounded-xl border border-gray-800"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-xl">{review.name}</h4>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-700"} 
                      />
                    ))}
                  </div>
                </div>
                <span className="text-gray-500 text-sm">{review.date}</span>
              </div>
              <p className="text-gray-300 italic">"{review.comment}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
