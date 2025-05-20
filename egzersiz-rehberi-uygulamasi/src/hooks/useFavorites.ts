import { useState, useEffect } from "react";
import type { Exercise } from "../types/exercise";

const FAVORITES_KEY = "exercise_favorites";

let globalFavorites: Exercise[] = [];
let globalSetters: React.Dispatch<React.SetStateAction<Exercise[]>>[] = [];

const notifyAllComponents = (newValue: Exercise[]) => {
  globalFavorites = newValue;
  globalSetters.forEach(setter => setter(newValue));
};

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Exercise[]>(() => {
        try {
            const storedFavorites = localStorage.getItem(FAVORITES_KEY);
            
            const oldFavorites = localStorage.getItem("favorites");
            if (oldFavorites && !storedFavorites) {
                localStorage.setItem(FAVORITES_KEY, oldFavorites);
                localStorage.removeItem("favorites");
                return JSON.parse(oldFavorites);
            }
            
            if (storedFavorites) {
                const parsedFavorites = JSON.parse(storedFavorites);
                if (Array.isArray(parsedFavorites)) {
                    globalFavorites = parsedFavorites;
                    return parsedFavorites;
                }
            }
        } catch (error) {
            console.error("Favoriler yüklenirken hata oluştu:", error);
        }
        return globalFavorites || [];
    });

    useEffect(() => {
        globalSetters.push(setFavorites);
        
        return () => {
            const index = globalSetters.indexOf(setFavorites);
            if (index > -1) {
                globalSetters.splice(index, 1);
            }
        };
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.error("Favoriler kaydedilirken hata oluştu:", error);
        }
    }, [favorites]);

    const addFavorite = (exercise: Exercise) => {
        if (!exercise || !exercise.id) {
            console.error("Geçersiz egzersiz verisi");
            return;
        }

        const isAlreadyFavorite = favorites.some(fav => fav.id === exercise.id);
        if (isAlreadyFavorite) {
            return;
        }

        const newFavorites = [...favorites, exercise];
        notifyAllComponents(newFavorites);
    };

    const removeFavorite = (id: string) => {
        if (!id) {
            console.error("Geçersiz ID");
            return;
        }

        const newFavorites = favorites.filter(exercise => exercise.id !== id);
        notifyAllComponents(newFavorites);
    };

    const isFavorite = (id: string): boolean => {
        if (!id) return false;
        return favorites.some(exercise => exercise.id === id);
    };

    const clearFavorites = () => {
        notifyAllComponents([]);
    };

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites
    };
};