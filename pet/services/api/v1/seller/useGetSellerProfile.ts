import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { requestClient } from '../../../clients/requestClient';
import { ISellerProfile } from './type';

export default function useGetSellerProfile(queryParams: string, queryOptions?: any): UseQueryResult<ISellerProfile> {
    return useQuery({
        queryKey: ['seller', queryParams],
        queryFn: async () => {
            const sellerId = queryParams;
            try {
                const response = await requestClient.get(`api/v1/seller/${sellerId}`);
                const data = await response.data;
                return data as ISellerProfile;
            } catch (error) {
                throw error;
            }
        },
        refetchOnMount: true,
        ...queryOptions,
        throwOnError: true,
    });
}
