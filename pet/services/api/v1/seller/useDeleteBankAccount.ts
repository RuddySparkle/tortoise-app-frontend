import { useMutation } from '@tanstack/react-query';
import { requestClient } from '@services/clients/requestClient';
import { ISellerQueryParams } from './type';
import { IAxiosResponse, IMutationHook, IResponseData } from '@services/api/models';
import { AxiosError } from 'axios';

export default function useDeleteBankAccount({
    onSuccess,
    onError,
    options,
}: IMutationHook<IResponseData<ISellerQueryParams>, ISellerQueryParams>) {
    return useMutation({
        mutationKey: ['deleteBankAccount'],
        mutationFn: async (request: ISellerQueryParams) => {
            try {
                const { seller_id } = request;
                const response: IAxiosResponse = await requestClient.delete(`/api/v1/bank/${seller_id}`);
                const responseData = response.data;
                return responseData as IResponseData<ISellerQueryParams>;
            } catch (err) {
                throw err as AxiosError;
            }
        },
        onSuccess: onSuccess,
        onError: onError,
        ...options,
    });
}
