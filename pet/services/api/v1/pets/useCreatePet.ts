import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IPetCreateParams } from './type';
import { requestClient } from '@services/clients/requestClient';
import { IMutationHook, IResponseData, IAxiosResponse } from '@services/api/models';

export const useCreatePet = ({
    onSuccess,
    onError,
    options,
}: IMutationHook<IResponseData<unknown>, IPetCreateParams>) => {
    return useMutation({
        mutationKey: ['useCreatePet'],
        mutationFn: async (params: IPetCreateParams) => {
            const { sellerId, payload } = params;
            try {
                const response: IAxiosResponse = await requestClient.post(`api/v1/pets/seller/${sellerId}`, payload);
                return response.data;
            } catch (err) {
                throw err as AxiosError;
            }
        },
        onSuccess: onSuccess,
        onError: onError,
        ...options,
    });
};
