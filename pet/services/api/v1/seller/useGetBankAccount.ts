import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { requestClient } from '@services/clients/requestClient';
import { IBankAccountInfo, ISellerQueryParams } from './type';

export default function useGetBankAccount(
    queryParams: ISellerQueryParams,
    queryOptions?: any,
): UseQueryResult<IBankAccountInfo> {
    return useQuery({
        queryKey: ['bankAccount', queryParams],
        queryFn: async () => {
            const { seller_id } = queryParams;
            try {
                const response = await requestClient.get(`api/v1/bank/${seller_id}`);
                const data = await response.data;
                return data as IBankAccountInfo;
            } catch (error) {
                throw error;
            }
        },
        refetchOnMount: true,
        ...queryOptions,
    });
}
