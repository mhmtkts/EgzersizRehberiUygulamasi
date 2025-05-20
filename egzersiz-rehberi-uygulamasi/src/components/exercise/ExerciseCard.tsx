import React from "react";
import type { Exercise } from "../../types/exercise";
import { useFavorites } from "../../hooks/useFavorites";

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: (exercise: Exercise) => void;
  showFavoriteIcon?: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onClick,
  showFavoriteIcon = true
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isExerciseFavorite = isFavorite(exercise.id);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    if (isExerciseFavorite) {
      removeFavorite(exercise.id);
    } else {
      addFavorite(exercise);
    }
  };
  
  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer group"
      onClick={() => onClick(exercise)}
    >
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        <img
          src={exercise.gifUrl}
          alt={`${exercise.name} egzersiz animasyonu`}
          className="absolute top-0 left-0 w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {showFavoriteIcon && (
          <div 
            className="absolute top-3 right-3 bg-white bg-opacity-80 p-2 rounded-full cursor-pointer hover:bg-opacity-100 transition-colors"
            onClick={handleFavoriteClick}
            aria-label={isExerciseFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
          >
            <span className="text-lg" title={isExerciseFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}>
              {isExerciseFavorite ? '❤️' : '🤍'}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 text-gray-800">
          {exercise.name}
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-md p-2">
            <p className="text-xs text-blue-600 mb-1">BÖLGE</p>
            <p className="text-sm capitalize font-medium">{exercise.bodyPart}</p>
          </div>
          
          <div className="bg-purple-50 rounded-md p-2">
            <p className="text-xs text-purple-600 mb-1">HEDEF KAS</p>
            <p className="text-sm capitalize font-medium">{exercise.target}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;