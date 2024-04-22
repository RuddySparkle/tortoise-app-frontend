import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IUserUpdateParams } from './type';
import { requestClient } from '@services/clients/requestClient';
import { IMutationHook, IResponseData, IAxiosResponse } from '@services/api/models';

export const useUpdateUserProfile = ({
    onSuccess,
    onError,
    options,
}: IMutationHook<IResponseData<unknown>, IUserUpdateParams>) => {
    return useMutation({
        mutationKey: ['useUpdateUser'],
        mutationFn: async (params: IUserUpdateParams) => {
            const { user_id, payload } = params;
            try {
                const response: IAxiosResponse = await requestClient.put(`api/v1/user/${user_id}`, payload);
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
