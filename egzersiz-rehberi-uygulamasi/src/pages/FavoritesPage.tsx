import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import ExerciseCard from '../components/exercise/ExerciseCard';
import Button from '../components/common/Button';

const FavoritesPage: React.FC = () => {
  const { favorites, clearFavorites } = useFavorites();
  const navigate = useNavigate();
  const [isClearing, setIsClearing] = useState(false);

  const handleExerciseClick = (exercise: any) => {
    navigate(`/exercise/${exercise.id}`);
  };


  const handleClearFavorites = () => {
    setIsClearing(true);
    setTimeout(() => {
      if (window.confirm('Tüm favorilerinizi silmek istediğinize emin misiniz?')) {
        clearFavorites();
      }
      setIsClearing(false);
    }, 300);
  };

  const navigateToExercises = () => {
    navigate('/exercises');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0 relative inline-block">
          <span className="relative z-10">Favori Egzersizlerim</span>
          <span className="absolute -bottom-1 left-0 w-full h-3 bg-red-100 -z-10 rounded-lg transform -rotate-1"></span>
        </h1>
        
        <div className="flex space-x-4">
          {favorites.length > 0 && (
            <Button 
              variant="danger"
              onClick={handleClearFavorites}
              className="relative overflow-hidden group transform hover:scale-105 transition-all duration-300"
              leftIcon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>}
              loading={isClearing}
              elevated
            >
              Tümünü Temizle
              <span className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          )}
          
          <Button 
            variant="secondary"
            onClick={navigateToExercises}
            className="transform hover:scale-105 transition-all duration-300"
            leftIcon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
            </svg>}
            elevated
          >
            Tüm Egzersizler
          </Button>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((exercise) => (
            <div key={exercise.id} className="transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <ExerciseCard
                exercise={exercise}
                onClick={handleExerciseClick}
                showFavoriteIcon={true}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-xl shadow-sm p-8 border-t-4 border-red-400">
          <div className="text-gray-400 text-6xl mb-4 animate-pulse">❤️</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Henüz favori egzersiziniz yok</h2>
          <p className="text-gray-600 mb-8 max-w-md">Beğendiğiniz egzersizleri favorilere ekleyerek burada görüntüleyebilirsiniz.</p>
          <Button 
            variant="primary"
            onClick={navigateToExercises}
            className="transform hover:scale-105 transition-all duration-300"
            rightIcon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>}
            elevated
          >
            Egzersizleri Keşfet
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;