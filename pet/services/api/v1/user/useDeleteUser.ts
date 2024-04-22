import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { requestClient } from '../../../clients/requestClient';
import { IMutationHook, IResponseData, IAxiosResponse } from '../../models';
import { IDeleteUserParams } from './type';

export const useDeleteUser = ({
    onSuccess,
    onError,
    options,
}: IMutationHook<IResponseData<unknown>, IDeleteUserParams>) => {
    return useMutation({
        mutationKey: ['useDeleteUser'],
        mutationFn: async (params: IDeleteUserParams) => {
            const { user_id, payload } = params;
            try {
                const response: IAxiosResponse = await requestClient.post(`api/v1/user/${user_id}`, payload);
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
