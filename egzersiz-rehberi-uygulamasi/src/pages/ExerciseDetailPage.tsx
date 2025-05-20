import {React, useEffect} from "react";
import { useParams, useNavigate, } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useFavorites } from '../hooks/useFavorites';
import { getExerciseById, getExercisesByTarget } from "../services/exerciseApi";
import type { Exercise } from "../types/exercise";

const getDifficulty = (exercise: Exercise): { level: string, text: string } => {
  if (exercise.target === 'delts' || exercise.equipment === 'barbell' || exercise.bodyPart === 'upper arms') {
    return { level: 'expert', text: 'İleri' };
  } else if (exercise.target === 'abs' || exercise.equipment === 'cable' || exercise.bodyPart === 'back') {
    return { level: 'intermediate', text: 'Orta' };
  }
  return { level: 'beginner', text: 'Başlangıç' };
};

const getStartingPosition = (exercise: Exercise): string => {
  const positions: Record<string, string> = {
    'abs': 'Sırtüstü yatın ve dizlerinizi bükün.',
    'waist': 'Ayakta durun ve ayaklarınızı omuz genişliğinde açın.',
    'back': 'Yere yüzüstü uzanın veya duruma göre otururken sırtınızı dik tutun.',
    'chest': 'Sırt üstü bench\'e uzanın veya yere uzanın.',
    'shoulders': 'Dik bir şekilde oturun veya ayakta durun.',
    'upper arms': 'Ayakta durun, sırtınız dik ve dirsekleriniz vücudunuza yakın olsun.',
    'lower arms': 'Bir bench\'e oturun, kolunuzu dizinize yaslayın.',
    'upper legs': 'Ayakta durun ve ayaklarınızı omuz genişliğinde açın.',
    'lower legs': 'Ayakta durun veya oturun, ayak bileğinize odaklanın.',
    'cardio': 'Rahat bir başlangıç pozisyonu alın.',
    'neck': 'Dik oturun, omuzlarınız rahat pozisyonda olsun.'
  };
  
  return positions[exercise.bodyPart] || 'Uygun bir pozisyonda durun ve harekete hazırlanın.';
};

const getMovementDescription = (exercise: Exercise): string => {
  const bodyPartMovements: Record<string, string> = {
    'abs': 'Karın kaslarınızı sıkarak üst vücudunuzu yerden kaldırın ve kontrollü bir şekilde indirin.',
    'waist': 'Üst vücudunuzu bir tarafa doğru döndürün ve sonra diğer tarafa döndürün.',
    'back': 'Sırt kaslarınızı kullanarak üst vücudunuzu yerden kaldırın.',
    'chest': 'Ağırlığı göğsünüze doğru indirin ve ardından itin.',
    'shoulders': 'Ağırlıkları başınızın üzerine doğru yukarı itin.',
    'upper legs': 'Dizlerinizi bükerek çömelin ve sonra başlangıç pozisyonuna dönün.',
    'lower legs': 'Ayak parmaklarınızı kendinize doğru çekin veya uzaklaştırın.',
    'upper arms': 'Dirseğinizi bükerek ağırlığı omzunuza doğru kaldırın.',
    'lower arms': 'Bileğinizi bükerek ağırlığı kaldırın veya indirin.'
  };
  
  const equipmentSpecificMovements: Record<string, string> = {
    'barbell': `${exercise.bodyPart === 'chest' ? 'Barbell\'i' : 'Barı'} kontrollü bir şekilde kaldırın ve indirin.`,
    'dumbbell': 'Dumbbell\'ları kontrollü bir şekilde kaldırın ve indirin.',
    'cable': 'Kablo makinesini kullanarak hareketi kontrollü bir şekilde gerçekleştirin.',
    'body weight': 'Vücut ağırlığınızı kullanarak hareketi gerçekleştirin.',
    'leverage machine': 'Makineyi kullanarak hedef kaslarınıza odaklanın.'
  };
  
  return bodyPartMovements[exercise.bodyPart] || 
         equipmentSpecificMovements[exercise.equipment] || 
         `${exercise.name} hareketini kontrollü bir şekilde gerçekleştirin ve hedef kas olan ${exercise.target} üzerine odaklanın.`;
};

const getTips = (exercise: Exercise): string[] => {
  const standardTips = [
    'Hareketi kontrollü bir şekilde yapın, hızlı hareket etmeyin.',
    'Doğru formu koruyun ve sırtınızı düz tutun.',
    'Nefes alıp vermeyi unutmayın: zorlanırken nefes verin, gevşerken nefes alın.'
  ];
  
  const bodyPartTips: Record<string, string[]> = {
    'abs': [
      'Boyun gerginliğini önlemek için elinizle başınızı desteklemeyin.',
      'Karın kaslarınızı tüm hareket boyunca sıkı tutun.'
    ],
    'back': [
      'Bel incinmelerini önlemek için ani hareketlerden kaçının.',
      'Hareketi sırt kaslarınızla yapın, kollarınızla değil.'
    ],
    'chest': [
      'Göğüs kaslarınızı her tekrarda tamamen sıkıştırın.',
      'Dirseklerinizi vücudunuza çok yakın veya çok uzak tutmayın.'
    ],
    'shoulders': [
      'Omuz sakatlıklarını önlemek için ağır ağırlıklarla başlamayın.',
      'Hareket sırasında vücudunuzu sallamaktan kaçının.'
    ],
    'upper arms': [
      'Biseps hareketlerinde dirseklerinizi sabit tutun.',
      'Triseps hareketlerinde üst kolunuzu sabit tutun.'
    ]
  };
  
  const equipmentTips: Record<string, string[]> = {
    'barbell': [
      'Bar\'ı sıkıca kavrayın ama çok sıkmayın.',
      'Ağırlığı dengeli bir şekilde kaldırdığınızdan emin olun.'
    ],
    'dumbbell': [
      'Hareketi her iki tarafta da eşit şekilde gerçekleştirin.',
      'Bileklerinizi düz tutun, bükmeyin.'
    ],
    'cable': [
      'Kablonun gerginliğini hareket boyunca koruyun.',
      'Hızlı, ani çekmelerden kaçının.'
    ],
    'body weight': [
      'Egzersizi zorlaştırmak için temponuzu yavaşlatın.',
      'Denge ve stabiliteye odaklanın.'
    ]
  };
  
  const bodySpecific = bodyPartTips[exercise.bodyPart] || [];
  const equipmentSpecific = equipmentTips[exercise.equipment] || [];
  
  return [...standardTips, ...bodySpecific, ...equipmentSpecific];
};

const getTargetMuscles = (exercise: Exercise): string[] => {
  const primaryMuscle = exercise.target;
  
  const secondaryMusclesByBodyPart: Record<string, string[]> = {
    'abs': ['Rectus Abdominis', 'Obliques', 'Transverse Abdominis'],
    'waist': ['Obliques', 'Quadratus Lumborum', 'Erector Spinae'],
    'back': ['Latissimus Dorsi', 'Rhomboids', 'Trapezius', 'Erector Spinae'],
    'chest': ['Pectoralis Major', 'Pectoralis Minor', 'Serratus Anterior', 'Anterior Deltoids'],
    'shoulders': ['Anterior Deltoid', 'Lateral Deltoid', 'Posterior Deltoid', 'Trapezius'],
    'upper arms': ['Biceps Brachii', 'Triceps Brachii', 'Brachialis'],
    'lower arms': ['Forearm Flexors', 'Forearm Extensors'],
    'upper legs': ['Quadriceps', 'Hamstrings', 'Gluteus Maximus', 'Adductors'],
    'lower legs': ['Gastrocnemius', 'Soleus', 'Tibialis Anterior']
  };
  
  const muscleList = secondaryMusclesByBodyPart[exercise.bodyPart];
  
  if (!muscleList) {
    return [primaryMuscle, 'İlgili destek kasları'];
  }
  
  if (muscleList.some(muscle => muscle.toLowerCase().includes(primaryMuscle.toLowerCase()))) {
    return muscleList;
  }
  
  return [primaryMuscle.charAt(0).toUpperCase() + primaryMuscle.slice(1), ...muscleList.slice(0, 3)];
};

const ExerciseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const { 
    data: exercise, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['exercise', id],
    queryFn: () => getExerciseById(id || ''),
    enabled: !!id
  });

  const { 
    data: relatedExercises = [] 
  } = useQuery({
    queryKey: ['relatedExercises', exercise?.target],
    queryFn: () => getExercisesByTarget(exercise?.target || ''),
    enabled: !!exercise?.target,
    select: (data) => data
      .filter(ex => ex.id !== exercise?.id)
      .slice(0, 4)
  });

  const isExerciseFavorite = exercise ? isFavorite(exercise.id) : false;

  const handleToggleFavorite = () => {
    if (!exercise) return;
    
    if (isExerciseFavorite) {
      removeFavorite(exercise.id);
    } else {
      addFavorite(exercise);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Egzersiz bilgileri yükleniyor...</p>
      </div>
    );
  }

  if (isError || !exercise) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-lg mx-auto bg-red-50 border border-red-200 rounded-lg p-8">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-red-700 mb-4">Egzersiz Bulunamadı</h2>
          <p className="text-gray-600 mb-6">İstediğiniz egzersiz mevcut değil veya bir hata oluştu. Lütfen farklı bir egzersiz seçin.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  const difficulty = getDifficulty(exercise);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <nav className="flex mb-6 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">Ana Sayfa</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/exercises')} className="hover:text-blue-600">Egzersizler</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate(`/exercises?bodyPart=${exercise.bodyPart}`)} className="hover:text-blue-600 capitalize">{exercise.bodyPart}</button>
          <span className="mx-2">/</span>
          <span className="text-gray-800 capitalize">{exercise.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative pb-[75%] h-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                {exercise.gifUrl ? (
                  <img 
                    src={exercise.gifUrl} 
                    alt={`${exercise.name} egzersizi`} 
                    className="absolute top-0 left-0 w-full h-full object-contain p-4"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <p className="text-gray-500">Görsel bulunamadı</p>
                  </div>
                )}

                <div className={`absolute top-6 left-6 px-3 py-1 rounded-full text-sm font-medium shadow-md
                  ${difficulty.level === 'beginner' ? 'bg-green-100 text-green-800' : 
                    difficulty.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`
                }>
                  {difficulty.text} Seviye
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-5">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">{exercise.name}</h1>
                  <button 
                    onClick={handleToggleFavorite} 
                    className={`p-2 rounded-full transition-all ${isExerciseFavorite ? 
                      'bg-red-100 text-red-500 hover:bg-red-200' : 
                      'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                    aria-label={isExerciseFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isExerciseFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isExerciseFavorite ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <h3 className="text-xs font-semibold text-blue-700 mb-1">HEDEF KAS</h3>
                    <p className="text-gray-800 font-medium capitalize">{exercise.target}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                    <h3 className="text-xs font-semibold text-purple-700 mb-1">EKİPMAN</h3>
                    <p className="text-gray-800 font-medium capitalize">{exercise.equipment}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                    <h3 className="text-xs font-semibold text-green-700 mb-1">BÖLGE</h3>
                    <p className="text-gray-800 font-medium capitalize">{exercise.bodyPart}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                    <h3 className="text-xs font-semibold text-amber-700 mb-1">ID</h3>
                    <p className="text-gray-800 font-medium">{exercise.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Nasıl Yapılır?
              </h2>
              <div className="space-y-5">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-semibold text-gray-700 flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    Başlangıç Pozisyonu
                  </h3>
                  <p className="text-gray-600">
                    {getStartingPosition(exercise)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-semibold text-gray-700 flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Hareket
                  </h3>
                  <p className="text-gray-600">
                    {getMovementDescription(exercise)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-semibold text-gray-700 flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    İpuçları
                  </h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {getTips(exercise).map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Çalıştırdığı Kaslar
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {getTargetMuscles(exercise).map((muscle, index) => (
                  <div 
                    key={index} 
                    className={`px-4 py-3 rounded-lg ${
                      index === 0 
                        ? 'bg-blue-100 text-blue-800 font-medium' 
                        : 'bg-blue-50 text-blue-700'
                    } flex items-center`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {muscle}
                  </div>
                ))}
              </div>
            </div>
            
            {relatedExercises.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                  Benzer Egzersizler
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {relatedExercises.map(relExercise => (
                    <div 
                      key={relExercise.id}
                      onClick={() => navigate(`/exercise/${relExercise.id}`)}
                      className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                    >
                      <div className="w-12 h-12 mr-3 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {relExercise.gifUrl ? (
                          <img 
                            src={relExercise.gifUrl} 
                            alt={relExercise.name} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-gray-800 capitalize line-clamp-1">{relExercise.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{relExercise.equipment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate(-1)} 
            className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Geri Dön
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailPage;