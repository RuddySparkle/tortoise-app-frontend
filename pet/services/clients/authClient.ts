import axios from 'axios';

import { DEFAULT_DEV_TOKEN, requestConfig } from './config';
import { getLocalStorageValue } from '@core/utils/localStorage';

const authClient = axios.create({
    ...requestConfig,
    validateStatus: () => true,
});

authClient.interceptors.request.use((config) => {
    return config;
});

export { authClient };
