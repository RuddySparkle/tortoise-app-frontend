import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { requestClient } from '@services/clients/requestClient';
import { AllReportQueryParams, IAllReports } from './type';

const fetchReports = async (queryParams: AllReportQueryParams) => {
    try {
        const response = await requestClient.get(
            `api/v1/admin/report?category=${queryParams.category}&is_solved=${queryParams.is_solved}`,
        );
        return response.data as IAllReports;
    } catch (error) {
        throw error;
    }
};

export default function useGetAllReport(
    queryParams: AllReportQueryParams,
    queryOptions?: any,
): UseQueryResult<IAllReports> {
    return useQuery({
        queryKey: ['reports', queryParams],
        queryFn: () => fetchReports(queryParams),
        refetchOnMount: true,
        ...queryOptions,
    });
}
