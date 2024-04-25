import { authClient } from '@services/clients';
import { requestClient } from '@services/clients/requestClient';
import { ISessionData, LoginInfo } from './type';

const setSessionData = async (sessionId: string) => {
    try {
        localStorage.setItem('session_id', sessionId);

        const identityResponse: ISessionData = await requestClient.get('/api/v1/token/session');
        localStorage.setItem('role', identityResponse.role);
        localStorage.setItem('user_id', identityResponse.userID);
        localStorage.setItem('username', identityResponse.username);
    } catch (err) {
        throw err;
    }
};

export default async function useLogin({ username, password }: LoginInfo) {
    try {
        const response = await authClient.post('/api/v1/admin/login', {
            username,
            password,
        });
        if (response.data.error || !response.data.token) throw new Error(response.data.error);
        const sessionId = response?.data?.token;
        setSessionData(sessionId);
        return Promise.resolve();
    } catch (err) {
        return err;
    }
}
