import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { requestClient } from '@services/clients/requestClient';
import { IPetQueryParams, IPetDetail } from './type';

export default function useGetPetByID(queryParams: IPetQueryParams, queryOptions?: any): UseQueryResult<IPetDetail> {
    return useQuery({
        queryKey: ['pets', queryParams],
        queryFn: async () => {
            const petId = queryParams?.petId;
            try {
                const response = await requestClient.get(`api/v1/pets/pet/${petId}`);
                const data = await response.data;
                return data as IPetDetail;
            } catch (error) {
                throw error;
            }
        },
        refetchOnMount: true,
        ...queryOptions,
    });
}
