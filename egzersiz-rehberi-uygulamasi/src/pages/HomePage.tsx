import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBodyPartList, getExercisesByBodyPart } from '../services/exerciseApi';
import SearchBar from '../components/exercise/SearchBar';
import Button from '../components/common/Button';
import ExerciseCard from '../components/exercise/ExerciseCard';
import type { Exercise } from '../types/exercise';
import bicepsImage from '../assets/body-parts/Biceps.avif';
import backImage from '../assets/body-parts/back.avif';
import  chestImage from '../assets/body-parts/chest.avif';
import  lowerLegsImage from '../assets/body-parts/lowerleg.avif';
import  upperLegsImage from '../assets/body-parts/upperleg.avif';
import lowerArmsImage from '../assets/body-parts/Forearms.avif';
import waistImage from '../assets/body-parts/waist.avif';
import neckImage from '../assets/body-parts/Traps.avif';
import shouldersImage from '../assets/body-parts/Shoulders.avif';
import cardioImage from '../assets/body-parts/cardio.jpg';

const getBodyPartIcon = (bodyPart: string) => {
  const icons: Record<string, React.ReactNode> = {
    'back': <img 
      src={backImage} 
      alt="Back" 
      className="w-15 h-15 object-cover rounded-full" 
    />,
    'cardio': <img 
      src={cardioImage} 
      alt="Cardio" 
      className="w-15 h-15 object-cover rounded-full" 
    />,
    'chest': <img 
      src={chestImage} 
      alt="Chest" 
      className="w-15 h-15 object-cover rounded-full" 
    />,
    'lower arms': <img 
      src={lowerArmsImage} 
      alt="Lower arms" 
      className="w-15 h-15 object-cover rounded-full" 
    />,
    'lower legs': <img 
      src={lowerLegsImage} 
      alt="Lower legs" 
      className="w-15 h-15 object-cover rounded-full" 
    />,
    'neck': <img 
      src={neckImage} 
      alt="Neck" 
      className="w-15 h-15 object-cover rounded-full" 
    />,
    'shoulders': <img 
      src={shouldersImage} 
      alt="Shoulders" 
      className="w-15 h-15 object-cover rounded-full" 
    />,
    'upper arms': <img 
      src={bicepsImage} 
      alt="Upper arms" 
      className="w-15 h-15 object-cover rounded-full" 
    />,
    'upper legs': <img 
      src={upperLegsImage} 
      alt="Upper legs" 
      className="w-15 h-15 object-cover rounded-full" 
    />,
    'waist': <img 
      src={waistImage} 
      alt="Waist" 
      className="w-15 h-15 object-cover rounded-full" 
    />,
  };
  return icons[bodyPart] || <span className="text-4xl">💪</span>;
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: bodyParts = [] } = useQuery({
    queryKey: ['bodyParts'],
    queryFn: getBodyPartList,
    staleTime: 1000 * 60 * 60,
  });

  const { data: chestExercises = [] } = useQuery({
    queryKey: ['exercises', 'chest'],
    queryFn: () => getExercisesByBodyPart('chest'),
    staleTime: 1000 * 60 * 60,
  });

  const { data: abExercises = [] } = useQuery({
    queryKey: ['exercises', 'waist'],
    queryFn: () => getExercisesByBodyPart('waist'),
    staleTime: 1000 * 60 * 60,
  });

  const popularExercises = React.useMemo(() => {
    const exercises = [...(chestExercises.slice(0, 4) || []), ...(abExercises.slice(0, 4) || [])];
    return exercises.slice(0, 4);
  }, [chestExercises, abExercises]);

  const handleSearch = (searchTerm: string) => {
    navigate(`/exercises?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleExerciseClick = (exercise: Exercise) => {
    navigate(`/exercise/${exercise.id}`);
  };

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Egzersiz Rehberiniz
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in-up animation-delay-200">
              Vücut bölgenize ve hedeflerinize göre en uygun egzersizleri keşfedin, 
              favorilerinizi kaydedin ve fitness yolculuğunuzda başarıya ulaşın.
            </p>
            
            <div className="bg-white p-3 rounded-lg shadow-lg mb-8 animate-fade-in-up animation-delay-300">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Egzersiz adı, hedef kas veya ekipman ara..."
                initialValue=""
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up animation-delay-400">
              <Button
                id="all-exercises-button"
                variant="primary"
                size="lg"
                onClick={() => navigate('/exercises')}
                className="relative overflow-hidden group"
                elevated
                leftIcon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>}
              >
                Tüm Egzersizleri Görüntüle
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Button>
              
              <Button
                id="favorites-button"
                variant="outline"
                size="lg"
                onClick={() => navigate('/favorites')}
                className="relative overflow-hidden group"
                elevated
                leftIcon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>}
              >
                Favorilerim
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 relative inline-block">
              <span className="relative z-10">Bölgelere Göre Keşfedin</span>
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-blue-100 -z-10 rounded-lg transform -rotate-1"></span>
            </h2>
            <p className="text-gray-600 text-lg mt-2">Çalıştırmak istediğiniz vücut bölgesini seçin</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {bodyParts?.map((bodyPart: string) => (
              <div
                key={bodyPart}
                className="group relative bg-white rounded-xl overflow-hidden cursor-pointer
                           shadow-md hover:shadow-xl transition-all duration-300 ease-in-out
                           transform hover:-translate-y-2 hover:scale-105"
                onClick={() => navigate(`/exercises?bodyPart=${bodyPart}`)}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                
                <div className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center
                              bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full
                              group-hover:from-blue-100 group-hover:to-indigo-200
                              transition-all duration-300 transform group-hover:scale-110">
                    {getBodyPartIcon(bodyPart)}
                  </div>
                  
                  <h3 className="font-semibold text-lg capitalize text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {bodyPart}
                  </h3>
                  
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Keşfet
                    </span>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-indigo-500/0 
                              group-hover:from-blue-500/5 group-hover:to-indigo-500/20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 relative inline-block">
                <span className="relative z-10">Popüler Egzersizler</span>
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-purple-100 -z-10 rounded-lg transform -rotate-1"></span>
              </h2>
              <p className="text-gray-600 mt-3">Kullanıcılarımızın en çok tercih ettiği egzersizler</p>
            </div>
            <Button
              variant="secondary"
              onClick={() => navigate('/exercises')}
              className="mt-4 md:mt-0 transform hover:scale-105 transition-all duration-300"
            >
              Tümünü Gör
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularExercises.map((exercise: Exercise) => (
              <div key={exercise.id} className="transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <ExerciseCard
                  exercise={exercise}
                  onClick={handleExerciseClick}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Doğru Egzersiz, Doğru Sonuç</h2>
            <p className="text-lg mb-8 leading-relaxed">
              Egzersiz Rehberi uygulaması, fitness yolculuğunuzda size yardımcı olmak için geliştirilmiştir. 
              Detaylı egzersiz açıklamaları, animasyonlu görseller ve hedef kas bilgileri ile 
              antrenmanlarınızı daha etkili hale getirin.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="!bg-white !text-indigo-700 hover:!bg-white/90 relative overflow-hidden group"
              elevated
              onClick={() => navigate('/exercises')}
              rightIcon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>}
            >
              Şimdi Keşfedin
              <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </div>
        </div>
      </section>
      
      <div className="bg-gradient-to-b from-white to-gray-50 h-16">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
          <path fill="#f3f4f6" fillOpacity="1" d="M0,224L60,229.3C120,235,240,245,360,234.7C480,224,600,192,720,192C840,192,960,224,1080,229.3C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HomePage;