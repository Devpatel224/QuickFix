import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AddReview({ bookingId, onReviewSubmitted }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const{ toast} = useToast()

  const handleSubmit = async () => {
    if (!rating || !comment) {
      alert("Please provide rating and comment");
      return;
    }

    try {
      setLoading(true);

      const res =  await axios.post(
        "http://localhost:3000/review/addReview",
        { rating, comment, bookingId },
        { withCredentials: true }
      );

      console.log(res);

      if(res?.data?.success){
           toast({
          variant: "success",
          title: "Review Submitted",
          description: "Review submitted successfully!",
        });
      }

      onReviewSubmitted(); 
    } catch (err) {

        
       toast({
          variant: "destructive",
          title: "Error submitting review",
          description: err.response?.data?.message || "Something went wrong.",
        });

    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-4 border-green-300">
      <CardContent className="p-4">
        <h4 className="font-semibold mb-2">Leave a Review</h4>

        {/* ⭐ Rating */}
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={22}
              className={`cursor-pointer ${
                (hover || rating) >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
        </div>

        <Textarea
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          onClick={handleSubmit}
          className="mt-3 bg-green-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default AddReview;
