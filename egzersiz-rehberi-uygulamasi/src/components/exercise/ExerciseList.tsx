import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import type { Exercise } from "../../types/exercise";
import ExerciseCard from "./ExerciseCard";
import SearchBar from "./SearchBar";
import { 
  getExercisesWithPagination, 
  getExercisesByBodyPart, 
  searchExercises,
  getExercisesByTarget,
  getExercisesByEquipment
} from "../../services/exerciseApi";
import { useInfiniteQuery } from "@tanstack/react-query";

interface ExerciseListProps {
  title?: string;
  exercises?: Exercise[];
  bodyPart?: string;
  equipment?: string;
  target?: string;
  onExerciseClick: (exercise: Exercise) => void;
  className?: string;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  title = "Egzersizler",
  exercises: externalExercises,
  bodyPart: propBodyPart,
  equipment: propEquipment,
  target: propTarget,
  onExerciseClick,
  className = "",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const urlBodyPart = searchParams.get("bodyPart");
  const urlEquipment = searchParams.get("equipment");
  const urlTarget = searchParams.get("target");
  const urlSearch = searchParams.get("search");
  
  const [locationKey, setLocationKey] = useState(location.search);
  
  const bodyPart = propBodyPart || urlBodyPart || "";
  const equipment = propEquipment || urlEquipment || "";
  const target = propTarget || urlTarget || "";
  const [searchTerm, setSearchTerm] = useState(urlSearch || "");
  
  const [initialLoading, setInitialLoading] = useState(true);
  
  const [autoLoadedPages, setAutoLoadedPages] = useState(0);
  const [pauseAutoLoading, setPauseAutoLoading] = useState(false);

  const PAGE_SIZE = 12;
  const MAX_AUTO_LOAD = 3; 
  
  const lastExerciseRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (locationKey !== location.search) {
      setLocationKey(location.search);
      
      //const newUrlBodyPart = searchParams.get("bodyPart") || "";
      //const newUrlEquipment = searchParams.get("equipment") || "";
      //const newUrlTarget = searchParams.get("target") || "";
      const newUrlSearch = searchParams.get("search") || "";
      
      setSearchTerm(newUrlSearch);
      
      setInitialLoading(true);
      setAutoLoadedPages(0);
      setPauseAutoLoading(false);
    }
  }, [location.search, searchParams, locationKey]);

  const fetchExercises = useCallback(({ pageParam = 0 }) => {
    if (searchTerm) {
      return searchExercises(searchTerm, PAGE_SIZE, pageParam);
    }
    if (bodyPart) {
      return getExercisesByBodyPart(bodyPart, PAGE_SIZE, pageParam);
    }
    if (target) {
      return getExercisesByTarget(target, PAGE_SIZE, pageParam);
    }
    if (equipment) {
      return getExercisesByEquipment(equipment, PAGE_SIZE, pageParam);
    }
    return getExercisesWithPagination(PAGE_SIZE, pageParam);
  }, [searchTerm, bodyPart, target, equipment]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isFetching,
    isSuccess,
    refetch
  } = useInfiniteQuery({
    queryKey: ['exercises', searchTerm, bodyPart, target, equipment, locationKey],
    queryFn: fetchExercises,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length * PAGE_SIZE;
    },
    enabled: !externalExercises,
    staleTime: 1000 * 60 * 5, 
  });

  useEffect(() => {
    if (isSuccess && !isFetching && initialLoading) {
      setInitialLoading(false);
    }
  }, [isSuccess, isFetching, initialLoading]);

  useEffect(() => {
    if (locationKey && !externalExercises) {
      refetch();
    }
  }, [locationKey, externalExercises, refetch]);

  const allExercises = useMemo(() => {
    if (externalExercises) return externalExercises;
    return data?.pages.flat() || [];
  }, [externalExercises, data]);
  
  const lastExerciseElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage || pauseAutoLoading || autoLoadedPages >= MAX_AUTO_LOAD) return;
      
      if (lastExerciseRef.current) {
        lastExerciseRef.current = null;
      }
      
      if (node && hasNextPage) {
        lastExerciseRef.current = node;
        
        const observer = new IntersectionObserver(
          entries => {
            if (entries[0]?.isIntersecting && hasNextPage && !pauseAutoLoading && autoLoadedPages < MAX_AUTO_LOAD) {
              console.log("Son elemana gelindiği tespit edildi, daha fazla egzersiz yükleniyor!");
              fetchNextPage().then(() => {
                setAutoLoadedPages(prev => prev + 1);
              });
            }
          },
          { threshold: 0.1 }
        );
        
        observer.observe(node);
        
        return () => {
          if (node) observer.unobserve(node);
          observer.disconnect();
        };
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage, pauseAutoLoading, autoLoadedPages]
  );
  
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term.trim()) {
      setSearchParams({ search: term });
    } else {
      setSearchParams({});
    }
  };

  const generateTitle = () => {
    if (title !== "Egzersizler") return title;
    
    let generatedTitle = "Egzersizler";
    
    if (bodyPart) {
      generatedTitle = `${bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)} Egzersizleri`;
    }
    
    if (target) {
      generatedTitle = `${target.charAt(0).toUpperCase() + target.slice(1)} Egzersizleri`;
    }
    
    if (equipment) {
      generatedTitle = `${equipment.charAt(0).toUpperCase() + equipment.slice(1)} ile Egzersizler`;
    }
    
    if (searchTerm) {
      generatedTitle = `"${searchTerm}" için Sonuçlar`;
    }
    
    return generatedTitle;
  };

  const displayTitle = generateTitle();
  const isLoading = status === 'pending' || initialLoading;
  const isError = status === 'error';

  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:justify-between mb-6">
        <h1 className="text-3xl font-bold mb-2">{displayTitle}</h1>
        <p className="text-gray-600">
          {!isLoading && allExercises.length > 0 ? `${allExercises.length} egzersiz bulundu` : ""}
          {hasNextPage && autoLoadedPages >= MAX_AUTO_LOAD && " (daha fazlasını görmek için aşağıdaki butona tıklayın)"}
        </p>
      </div>
      
      <div className="mb-6">
        <SearchBar 
          onSearch={handleSearch}
          initialValue={searchTerm}
          placeholder="Egzersiz adı, hedef kas veya ekipman ara..."
        />
      </div>
      
      {(bodyPart || equipment || target) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {bodyPart && (
            <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm">
              Bölge: {bodyPart}
              <button 
                className="ml-2 font-bold" 
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete("bodyPart");
                  setSearchParams(params);
                }}
              >
                &times;
              </button>
            </div>
          )}
          
          {equipment && (
            <div className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm">
              Ekipman: {equipment}
              <button 
                className="ml-2 font-bold" 
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete("equipment");
                  setSearchParams(params);
                }}
              >
                &times;
              </button>
            </div>
          )}
          
          {target && (
            <div className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm">
              Hedef: {target}
              <button 
                className="ml-2 font-bold" 
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete("target");
                  setSearchParams(params);
                }}
              >
                &times;
              </button>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Egzersizler yükleniyor...</p>
        </div>
      )}
      
      {!isLoading && allExercises.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allExercises.map((exercise, index) => (
            <div 
              key={`${exercise.id}-${locationKey}`}
              ref={index === allExercises.length - 1 ? lastExerciseElementRef : null}
            >
              <ExerciseCard
                exercise={exercise}
                onClick={onExerciseClick}
              />
            </div>
          ))}
          
          {isFetchingNextPage && (
            <div className="col-span-full flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-3"></div>
              <p>Daha fazla egzersiz yükleniyor...</p>
            </div>
          )}
        </div>
      )}
      
      {!isLoading && !isFetchingNextPage && hasNextPage && autoLoadedPages >= MAX_AUTO_LOAD && (
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleLoadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors"
          >
            Daha Fazla Egzersiz Göster
          </button>
        </div>
      )}

      {!isLoading && !isError && allExercises.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-400 text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Egzersiz bulunamadı
          </h3>
          <p className="text-gray-600">
            Arama kriterlerinize uygun egzersiz bulunamadı. Lütfen filtreleri değiştirerek tekrar deneyin.
          </p>
        </div>
      )}

      {isError && !externalExercises && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-red-500 mb-2">
            Bir hata oluştu
          </h3>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : 'Egzersizler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Yeniden Dene
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseList;