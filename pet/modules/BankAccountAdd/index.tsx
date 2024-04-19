'use client';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ColorButton, CustomTextField } from '@components/core/CustomInput/type';
import { SubmitHandler } from 'react-hook-form';
import { register } from 'module';
import { CustomGreenButton, CustomGreenTextField, fira_sans_600, fira_sans_800 } from '@core/theme/theme';
import { useRouter } from 'next/navigation';
import { IBankAccountCreateParams, IBankAccountInfo } from '@services/api/v1/seller/type';
import useCreateBankAccount from '@services/api/v1/seller/useCreateBankAccount';
import useToastUI from '@core/hooks/useToastUI';
import useGetSession from '@core/auth/useGetSession';

export default function AddBankForm() {
    const router = useRouter();
    const form = useForm<IBankAccountInfo>();
    const toastUI = useToastUI();
    const session = useGetSession();

    const { mutateAsync: mutateCreateBankAccount } = useCreateBankAccount({
        onSuccess: () => {
            toastUI.toastSuccess('Bank Account Created!');
            router.push('/user/my-shop');
        },
        onError: () => {
            toastUI.toastError('Bank Account Creation Failed!');
        },
    });

    const onSubmit: SubmitHandler<IBankAccountInfo> = async (data: IBankAccountInfo) => {
        try {
            await mutateCreateBankAccount({ seller_id: session?.userID, payload: data } as IBankAccountCreateParams);
            router.push('/user/account');
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
                Add New Bank-Account
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
                            {...form.register('bank_account_name')}
                            name="bank_account_name"
                            label="Account Name"
                            variant="outlined"
                            sx={{ width: '100%' }}
                        />

                        <CustomGreenTextField
                            {...form.register('bank_account_number')}
                            name="bank_account_number"
                            label="Account Number"
                            variant="outlined"
                            sx={{ width: '100%' }}
                        />

                        <CustomGreenTextField
                            {...form.register('bank_name')}
                            name="bank_name"
                            label="Bank Name"
                            variant="outlined"
                            sx={{ width: '100%' }}
                        />

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
                                Add new account
                            </CustomGreenButton>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}
