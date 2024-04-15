import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { requestClient } from '../../../clients/requestClient';
import { IMutationHook, IResponseData, IAxiosResponse } from '../../models';

export const useDeleteUser = ({ onSuccess, onError, options }: IMutationHook<IResponseData<unknown>, string>) => {
    return useMutation({
        mutationKey: ['useDeleteUser'],
        mutationFn: async (params: string) => {
            try {
                const response: IAxiosResponse = await requestClient.delete(`api/v1/user/${params}`);
                if (!response.success) {
                    throw new Error() as AxiosError;
                }
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
