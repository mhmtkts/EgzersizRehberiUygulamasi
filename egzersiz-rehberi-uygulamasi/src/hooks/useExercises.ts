import { useQuery } from '@tanstack/react-query';
import { getAllExercises, getExercisesByBodyPart, getExerciseById, getBodyPartList, getTargetList, getEquipmentList, searchExercises } from '../services/exerciseApi';

export const useAllExercises = () => {
	return useQuery({
        queryKey: ['exercises'],
        queryFn: getAllExercises,
    });
}
export const useExercisesByBodyPart = (bodyPart: string) => {
    return useQuery({
        queryKey: ['exercises', bodyPart],
        queryFn: () => getExercisesByBodyPart(bodyPart),
        enabled: !!bodyPart,
    });
}
export const useExerciseById = (id: string) => {
    return useQuery({
        queryKey: ['exercise', id],
        queryFn: () => getExerciseById(id),
        enabled: !!id,
    });
}
export const useBodyPartList = () => {
    return useQuery({
        queryKey: ['bodyParts'],
        queryFn: getBodyPartList,
    });
}

export const useTargetList = () => {
    return useQuery({
        queryKey: ['targets'],
        queryFn: getTargetList,
    });
}

export const useEquipmentList = () => {
    return useQuery({
        queryKey: ['equipment'],
        queryFn: getEquipmentList,
    });
}

export const useSearchExercises = (query: string) => {
    return useQuery({
        queryKey: ['exercises','search', query],
        queryFn: () => searchExercises(query),
        enabled: !!query && query.length > 1,
    });
}

