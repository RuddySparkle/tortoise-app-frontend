import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IBankAccountCreateParams } from './type';
import { requestClient } from '@services/clients/requestClient';
import { IMutationHook, IResponseData, IAxiosResponse } from '@services/api/models';

export default function useCreateBankAccount({
    onSuccess,
    onError,
    options,
}: IMutationHook<IResponseData<unknown>, IBankAccountCreateParams>) {
    return useMutation({
        mutationKey: ['useCreateBankAccount'],
        mutationFn: async (params: IBankAccountCreateParams) => {
            const { seller_id, payload } = params;
            try {
                const response: IAxiosResponse = await requestClient.post(`api/v1/bank/${seller_id}`, payload);
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
