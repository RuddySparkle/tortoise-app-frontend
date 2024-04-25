import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { requestClient } from '@services/clients/requestClient';

export type IPetCategoryMasterData = {
    category: string;
    species: string[];
};

const fetchPetCategoryList = async () => {
    try {
        const response = await requestClient.get(`api/v1/pets/master`);
        return response.data as IPetCategoryMasterData[];
    } catch (error) {
        throw error;
    }
};

function useGetPetCategory(queryOptions?: any): UseQueryResult {
    return useQuery({
        queryKey: ['petCategories'],
        queryFn: () => fetchPetCategoryList(),
        refetchOnMount: true,
        ...queryOptions,
    });
}

export default useGetPetCategory;
