import axios from 'axios';
import type { Exercise } from '../types/exercise';

const API = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST || 'exercisedb.p.rapidapi.com'
  }
});

const handleApiError = (error: any, message: string) => {
  console.error(message, error);
  throw error;
};

export const getExercisesWithPagination = async (limit: number = 12, offset: number = 0): Promise<Exercise[]> => {
  try {
    const response = await API.get(`/exercises`, {
      params: {
        limit,
        offset
      }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Egzersizler alınamadı:');
  }
};

export const getAllExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await API.get(`/exercises`, {
      params: {
        limit: 0
      }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Tüm egzersizler alınamadı:');
  }
};

export const getExercisesByBodyPart = async (bodyPart: string, limit: number = 12, offset: number = 0): Promise<Exercise[]> => {
  try {
    const response = await API.get(`/exercises/bodyPart/${bodyPart}`, {
      params: {
        limit,
        offset
      }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, `${bodyPart} bölgesi için egzersizler alınamadı:`);
  }
};

export const getExercisesByTarget = async (target: string, limit: number = 12, offset: number = 0): Promise<Exercise[]> => {
  try {
    const response = await API.get(`/exercises/target/${target}`, {
      params: {
        limit,
        offset
      }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, `${target} hedef kası için egzersizler alınamadı:`);
  }
};

export const getExercisesByEquipment = async (equipment: string, limit: number = 12, offset: number = 0): Promise<Exercise[]> => {
  try {
    const response = await API.get(`/exercises/equipment/${equipment}`, {
      params: {
        limit,
        offset
      }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, `${equipment} ekipmanı için egzersizler alınamadı:`);
  }
};

export const getExerciseById = async (id: string): Promise<Exercise> => {
  try {
    const response = await API.get(`/exercises/exercise/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, `ID: ${id} için egzersiz alınamadı:`);
  }
};

export const getBodyPartList = async (): Promise<string[]> => {
  try {
    const response = await API.get(`/exercises/bodyPartList`);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Vücut bölümleri alınamadı:');
  }
};

export const getTargetList = async (): Promise<string[]> => {
  try {
    const response = await API.get(`/exercises/targetList`);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Hedef kas listesi alınamadı:');
  }
};

export const getEquipmentList = async (): Promise<string[]> => {
  try {
    const response = await API.get(`/exercises/equipmentList`);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Ekipman listesi alınamadı:');
  }
};

export const searchExercises = async (query: string, limit: number = 12, offset: number = 0): Promise<Exercise[]> => {
  try {
    const allExercises = await getAllExercises();
    const lowerCaseQuery = query.toLowerCase();
    
    const filteredExercises = allExercises.filter(exercise => 
      exercise.name.toLowerCase().includes(lowerCaseQuery) ||
      exercise.bodyPart.toLowerCase().includes(lowerCaseQuery) ||
      exercise.target.toLowerCase().includes(lowerCaseQuery) ||
      exercise.equipment.toLowerCase().includes(lowerCaseQuery)
    );
    
    return filteredExercises.slice(offset, offset + limit);
  } catch (error) {
    return handleApiError(error, `${query} için arama yapılırken hata oluştu:`);
  }
};