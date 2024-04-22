import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ISubmitReviewPayload } from './type';
import { requestClient } from '@services/clients/requestClient';
import { IMutationHook, IResponseData, IAxiosResponse } from '@services/api/models';

export default function useSubmitReview({
    onSuccess,
    onError,
    options,
}: IMutationHook<IResponseData<unknown>, ISubmitReviewPayload>) {
    return useMutation({
        mutationKey: ['useSubmitReview'],
        mutationFn: async (payload: ISubmitReviewPayload) => {
            try {
                const response: IAxiosResponse = await requestClient.post(`api/v1/review/create`, payload);
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
