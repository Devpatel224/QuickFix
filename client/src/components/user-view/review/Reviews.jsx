import { useEffect, useState } from "react";
import axios from "axios";

export default function Reviews({ serviceId, currentUser }) {
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [serviceId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/review/getReviews",
        { serviceId },
        { withCredentials: true }
      );

      if (res.data.success) {
        setReviews(res.data.data);

        
        const alreadyReviewed = res.data.data.find(
          (rev) => rev.user._id === currentUser?._id
        );

        if (alreadyReviewed) {
          setUserReview(alreadyReviewed);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>

      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      {reviews.map((review) => (
        <div
          key={review._id}
          className="border-b py-3 flex flex-col gap-1"
        >
          <p className="font-semibold">{review.user?.name}</p>
          <p className="text-yellow-500">⭐ {review.rating}/5</p>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}

      {/* If user already reviewed */}
      {userReview && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-green-600 font-semibold">
            ✅ You already submitted a review.
          </p>
        </div>
      )}
    </div>
  );
}
