'use client';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
// import { ColorButton, CustomTextField } from '@components/CustomInput/type';
import { SubmitHandler } from 'react-hook-form';
import { register } from 'module';
import { CustomGreenButton, CustomGreenTextField, fira_sans_600, fira_sans_800 } from '@core/theme/theme';
import { useRouter } from 'next/navigation';
import useToastUI from '@core/hooks/useToastUI';
import useGetSession from '@core/auth/useGetSession';

export default function ReportFormPage() {
    interface ReportFormData {
        username: string;
        topic: string;
        infomation: string;
    }

    const router = useRouter();
    const form = useForm<ReportFormData>();
    const toastUI = useToastUI();
    const session = useGetSession();

    const onSubmit: SubmitHandler<ReportFormData> = async (data: ReportFormData) => {
        try {
            router.push('/user/account'); //ไม่รุ้ต้องไปไหน
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ px: { xs: '8%', md: '15%' } }}>
            <Typography
                py={4}
                align={'center'}
                fontFamily={fira_sans_800.style.fontFamily}
                fontSize={30}
                color={'#472F05'}
            >
                Add Report Here
            </Typography>
            <Box
                sx={{
                    py: 8,
                    px: 10,
                    border: '3px solid #472F05',
                    borderRadius: 2,
                    boxShadow: '10px 10px #472F05',
                    backgroundColor: '#EBEBD3',
                }}
            >
                <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                    <Box
                        sx={{
                            width: '100%',
                            height: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                        }}
                    >
                        <CustomGreenTextField
                            {...form.register('username')}
                            name="username"
                            label="username"
                            variant="outlined"
                            sx={{ width: '100%' }}
                        />

                        <CustomGreenTextField
                            {...form.register('topic')}
                            name="topic"
                            label="Topic to report"
                            variant="outlined"
                            sx={{ width: '100%' }}
                        />

                        <Typography
                            py={3}
                            align={'center'}
                            fontFamily={fira_sans_800.style.fontFamily}
                            fontSize={30}
                            color={'#472F05'}
                        >
                            Report Infomation
                        </Typography>

                        <textarea
                            rows={5}
                            name="infomation"
                            placeholder="ReportInfomation"
                            style={{
                                width: 'calc(100% - 10px)',
                                padding: '5px',
                                backgroundColor: '#EBEBD3',
                                boxShadow: '3px 3px #472F05',
                                borderRadius: 0,
                                border: '1px solid #472F05',
                                verticalAlign: 'middle',
                                marginBottom: '10px', // Added margin bottom for spacing
                            }}
                        ></textarea>

                        <Box
                            sx={{
                                marginTop: 2,
                                backgroundColor: '#74A059',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <CustomGreenButton
                                type="submit"
                                sx={{
                                    paddingY: 1,
                                    border: '2px solid #472F05',
                                    borderRadius: 0,
                                    boxShadow: '3px 2px #472F05',
                                    fontFamily: fira_sans_600.style.fontFamily,
                                    fontSize: 18,
                                }}
                                onClick={() => form.handleSubmit(onSubmit)}
                            >
                                Add Report
                            </CustomGreenButton>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}
