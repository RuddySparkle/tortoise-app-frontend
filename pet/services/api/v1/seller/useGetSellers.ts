import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { requestClient } from '@services/clients/requestClient';
import { ISellerProfile } from './type';
import useToastUI from '@core/hooks/useToastUI';

const fetchSellerList = async () => {
    const { toastError } = useToastUI();
    try {
        //   const searchValue = queryParams?.search?.trim() ?? '';
        const response = await requestClient.get(`api/v1/seller/`);
        return response.data as ISellerProfile[];
    } catch (error) {
        toastError('Failed loading seller lists');
        throw error;
    }
};

export default function useGetSellers(
    // queryParams: PetSearchParams,
    queryOptions?: any,
): UseQueryResult<[ISellerProfile]> {
    return useQuery({
        queryKey: ['seller'],
        queryFn: () => fetchSellerList(),
        refetchOnMount: true,
        ...queryOptions,
    });
}
