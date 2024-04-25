import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { requestClient } from '@services/clients/requestClient';
import { SellerReview } from './type';

const fetchReviews = async (sellerId?: string) => {
    try {
        const response = await requestClient.get(`api/v1/review/seller/${sellerId}`);
        return (response.data as SellerReview[]) || [];
    } catch (error) {
        throw error;
    }
};

export default function useGetSellerReviews(sellerId: string, queryOptions?: any): UseQueryResult<SellerReview[]> {
    return useQuery({
        queryKey: ['reviews', sellerId],
        queryFn: () => fetchReviews(sellerId),
        refetchOnMount: true,
        ...queryOptions,
    });
}
