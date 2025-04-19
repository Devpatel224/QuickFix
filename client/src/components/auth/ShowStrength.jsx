import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function getPasswordStrength(password) {
  let strength = 0;

  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password) && password.length >= 8) strength++;

  return Math.min(strength, 4); 
}

const strengthColors = ["bg-red-500", "bg-yellow-400", "bg-orange-400", "bg-green-500"];
const strengthLabels = ["Too Weak", "Weak", "Medium", "Strong"];
const textColors = ["text-red-600", "text-yellow-600", "text-orange-600", "text-green-600"];

function ShowStrength({ password }) {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    setStrength(getPasswordStrength(password));
  }, [password]);

  return (
    <div className="mt-1">
      
      <div className="flex gap-2 h-2 rounded overflow-hidden bg-white">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`h-full w-1/4 rounded ${
              i <= strength - 1 ? strengthColors[strength - 1] : "bg-gray-300"
            }`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: i <= strength - 1 ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ originX: 0 }}
          />
        ))}
      </div>

      
      {password && (
        <motion.p
          className="text-sm mt-1 font-medium"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          Strength:{" "}
          <span className={textColors[strength === 0 ? 0 : strength - 1]}>
            {strengthLabels[strength === 0 ? 0 : strength - 1]}
          </span>
        </motion.p>
      )}
    </div>
  );
}

export default ShowStrength;
