import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { requestClient } from '@services/clients/requestClient';
import { IPetProfile, Pagination } from './type';
import useToastUI from '@core/hooks/useToastUI';

const fetchPetList = async (queryParams: string) => {
    const { toastError } = useToastUI();
    try {
        const sellerId = queryParams;
        const response = await requestClient.get(`api/v1/pets/seller/${sellerId}`);
        return [(response.data || []) as IPetProfile[], response.data?.pagination as Pagination];
    } catch (error) {
        toastError('Failed loading pet lists');
        throw error;
    }
};

export default function useGetPetsBySeller(
    queryParams: string,
    queryOptions?: any,
): UseQueryResult<[IPetProfile[], Pagination]> {
    return useQuery({
        queryKey: ['pets', queryParams],
        queryFn: () => fetchPetList(queryParams),
        refetchOnMount: true,
        ...queryOptions,
    });
}
