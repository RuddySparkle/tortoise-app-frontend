/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
    interface ProcessEnv {
        SYSTEM_VERSION: string;
        BASE_URL: string;
        // API_PREFIX: 'http://35.171.56.239:8080';
        API_PREFIX: 'http://localhost:8080';

        FILE_SERVICE_URL: string;
        FILE_BUCKET_NAME: string;
        AUTH_URL: string;
    }
}
