import React from 'react';
import { Star, BadgeCheck } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  text: string;
  stars: number;
  img: string;
  date?: string;
  verified?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, text, stars, img, date, verified }) => {
  // Styling adjusted to mimic a typical clean, social media card (like Facebook)
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      
      <div className="flex items-start gap-3">
        
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img 
            src={img} 
            alt={name} 
            className="w-10 h-10 rounded-full object-cover" 
          />
        </div>
        
        {/* User Info & Rating */}
        <div className="flex-1 min-w-0">
          
          {/* Name and Verification */}
          <div className="flex items-center gap-1">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{name}</h4>
            {verified && (
              // Facebook typically uses a blue checkmark next to the name
              <BadgeCheck size={14} className="text-blue-500" />
            )}
          </div>
          
          {/* Rating and Date Line */}
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            
            {/* Stars Rating */}
            <div className="flex gap-0.5 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  fill={i < stars ? "currentColor" : "none"} 
                  className={i < stars ? "" : "text-gray-300 dark:text-gray-600"}
                />
              ))}
            </div>
            
            {date && (
              <>
                {/* Separator */}
                <span className="mx-1.5 text-gray-400 dark:text-gray-500">•</span>
                <span className="text-[11px]">{date}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Review Text Body */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-normal mt-3">{text}</p>

    </div>
  );
};

export default ReviewCard;