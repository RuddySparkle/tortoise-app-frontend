import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { requestClient } from '@services/clients/requestClient';
import { IUserDetail } from './type';

export default function useGetUserProfile(queryParams: string, queryOptions?: any): UseQueryResult<IUserDetail> {
    return useQuery({
        queryKey: ['user', queryParams],
        queryFn: async () => {
            const userId = queryParams;
            try {
                const response = await requestClient.get(`api/v1/user/${userId}`);
                const data = await response.data;
                return data as IUserDetail;
            } catch (error) {
                throw error;
            }
        },
        refetchOnMount: true,
        ...queryOptions,
        throwOnError: true,
    });
}
