import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { requestClient } from '@services/clients/requestClient';
import { IMutationHook, IResponseData, IAxiosResponse } from '@services/api/models';
import { IChangePasswordParams } from './type';

export const useUpdateUserPassword = ({
    onSuccess,
    onError,
    options,
}: IMutationHook<IResponseData<unknown>, IChangePasswordParams>) => {
    return useMutation({
        mutationKey: ['useUpdateUserPassword'],
        mutationFn: async (params: IChangePasswordParams) => {
            const { user_id, payload } = params;
            try {
                const response: IAxiosResponse = await requestClient.put(`api/v1/user/passwd/${user_id}`, payload);
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
