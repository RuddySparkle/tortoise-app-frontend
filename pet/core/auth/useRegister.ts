import { useQuery, useMutation } from '@tanstack/react-query';
import { RegistrationInfo } from './type';
import { requestClient } from '@services/clients/requestClient';

export default async function useRegister(data: RegistrationInfo) {
    // const url: string = 'http://35.171.56.239:8080';
    // const url: string = 'https://petpal-backend-inyfmq565q-as.a.run.app';
    const url: string = 'http://localhost:8080';
    const response = await fetch(`${url}/api/v1/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    // const response = await requestClient.post('/api/v1/register', data);

    return await response.json();
}
