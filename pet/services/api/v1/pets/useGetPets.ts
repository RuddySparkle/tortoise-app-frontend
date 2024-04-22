import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { requestClient } from '@services/clients/requestClient';
import { IPetProfile, PetSearchParams, Pagination } from './type';
import useToastUI from '@core/hooks/useToastUI';

const fetchPetList = async (queryParams: PetSearchParams) => {
    const { toastError } = useToastUI();
    try {
        const filteredQueryParams = Object.fromEntries(
            Object.entries(queryParams).filter(([_, value]) => Boolean(value)),
        );
        const queryParamsString = new URLSearchParams(filteredQueryParams as Record<string, string>).toString();
        const response = await requestClient.get(`api/v1/pets/?${queryParamsString}`);
        return [response.data as IPetProfile[], response.data.pagination as Pagination];
    } catch (error) {
        toastError('Failed loading pet lists');
        throw error;
    }
};

export default function useGetPets(
    queryParams: PetSearchParams,
    queryOptions?: any,
): UseQueryResult<[IPetProfile[], Pagination]> {
    return useQuery({
        queryKey: ['pets', queryParams],
        queryFn: () => fetchPetList(queryParams),
        refetchOnMount: true,
        ...queryOptions,
    });
}
