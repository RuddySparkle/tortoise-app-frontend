import { useMutation } from '@tanstack/react-query';
import { requestClient } from '@services/clients/requestClient';
import { IAxiosResponse, IMutationHook, IResponseData } from '@services/api/models';
import { AxiosError } from 'axios';
import { IReviewQueryParams } from './type';

export default function useRemoveReview({
    onSuccess,
    onError,
    options,
}: IMutationHook<IResponseData<IReviewQueryParams>, IReviewQueryParams>) {
    return useMutation({
        mutationKey: ['removeReview'],
        mutationFn: async (request: IReviewQueryParams) => {
            try {
                const { review_id } = request;
                const response: IAxiosResponse = await requestClient.delete(`/api/v1/review/${review_id}`);
                const responseData = response.data;
                return responseData as IResponseData<IReviewQueryParams>;
            } catch (err) {
                throw err as AxiosError;
            }
        },
        onSuccess: onSuccess,
        onError: onError,
        ...options,
    });
}
