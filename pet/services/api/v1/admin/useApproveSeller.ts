import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { requestClient } from '@services/clients/requestClient';
import { IMutationHook, IResponseData, IAxiosResponse } from '@services/api/models';

export default function useApproveSeller({
    onSuccess,
    onError,
    options,
}: IMutationHook<IResponseData<unknown>, string>) {
    return useMutation({
        mutationKey: ['useApproveSeller'],
        mutationFn: async (sellerId: string) => {
            try {
                const response: IAxiosResponse = await requestClient.post(`api/v1/admin/approve-seller/${sellerId}`);
                return response.data;
            } catch (err) {
                throw err as AxiosError;
            }
        },
        onSuccess: onSuccess,
        onError: onError,
        ...options,
    });
}
