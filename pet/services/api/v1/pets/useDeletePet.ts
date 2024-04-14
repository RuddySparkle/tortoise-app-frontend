import { useMutation } from '@tanstack/react-query';
import { requestClient } from '../../../clients/requestClient';
import { IPetQueryParams } from './type';
import { IAxiosResponse, IMutationHook, IResponseData } from '../../models';
import { AxiosError } from 'axios';

export default function useDeletePet({
    onSuccess,
    onError,
    options,
}: IMutationHook<IResponseData<IPetQueryParams>, IPetQueryParams>) {
    return useMutation({
        mutationKey: ['deletePet'],
        mutationFn: async (request: IPetQueryParams) => {
            try {
                const { petId } = request;
                const response: IAxiosResponse = await requestClient.delete(`/api/v1/pets/pet/${petId}`);
                const responseData = response.data;
                return responseData as IResponseData<IPetQueryParams>;
            } catch (err) {
                throw err as AxiosError;
            }
        },
        onSuccess: onSuccess,
        onError: onError,
        ...options,
    });
}
