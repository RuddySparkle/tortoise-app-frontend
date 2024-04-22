'use client';

import { Typography, Box, Divider, Grid, Button, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { CustomTextField } from '@components/core/CustomInput/type';
import { CustomBlueTextField, CustomGreenButton, fira_sans_600 } from '@core/theme/theme';
import { fira_sans_400, fira_sans_800 } from '@core/theme/theme';
import { useForm } from 'react-hook-form';
import { LoginInfo } from '@core/auth/type';
import PetsIcon from '@mui/icons-material/Pets';
import useToastUI from '@core/hooks/useToastUI';
import useLogin from '@core/auth/useAdminLogin';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {

    const form = useForm<LoginInfo>()
    const toastUI = useToastUI()
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async (data: LoginInfo) => {
        const res = await useLogin(data).then((d) => {
            return d;
        });
        console.log(res);
        if (!res) {
            toastUI.toastSuccess('Logged in successfully!');
            router.push('/admin/report');
        } else {
            toastUI.toastError('Wrong username or password.');
        }
    };
    
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                backgroundColor: '#82A9BB',
                zIndex: -10
            }}
        >
            <Box
                sx={{
                    width: {xs: '65%', md: '50%'},
                    height: '70%',
                    zIndex: 1,
                    borderRadius: 0,
                    boxShadow: '10px 10px 20px 5px #426779',
                    py: 2, 
                    backgroundColor: '#E1EAEF',
                }}
            >
                {/* <Typography 
                    fontFamily={fira_sans_800.style.fontFamily} 
                    fontSize={30} 
                    textAlign={'center'}
                    py={2}
                >
                    <PetsIcon/> PetPal
                </Typography> */}
                <Box sx={{ display: 'flex', px: '3%', color: 'black', position: 'relative', justifyContent: 'center' }}>
                    <Image 
                        src={"https://drive.google.com/uc?id=1Htzur4wU7MddA1xVm2jeH2U1UKFpsA2J"}
                        alt={'Petpal Logo'}
                        width={130}
                        height={250}
                        style={{ objectFit: 'fill' }}
                    />
                </Box>

                <Divider 
                    sx={{
                        mt: 2,
                        border: '0.75px solid #253A44',
                        boxShadow: '0px 3px 10px 0.75px #253A44'
                    }}
                />

                <Typography 
                    fontFamily={fira_sans_800.style.fontFamily} 
                    fontSize={25} 
                    textAlign={'center'}
                    py={4}
                >
                    LogIn for Admin
                </Typography>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Box
                        sx={{
                            px: 5,
                            py: 5,
                            mx: '15%',
                            border: '2px solid #283F49',
                            borderRadius: 1,
                            boxShadow: '4px 4px #283F49',
                            backgroundColor: '#ADC6D2'
                        }}
                    >
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <CustomBlueTextField
                                    {...form.register('username')}
                                    name={'username'}
                                    label="Username"
                                    variant="outlined"
                                    type={'text'}
                                    fullWidth
                                    // disabled={}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomBlueTextField
                                    {...form.register('password')}
                                    name={'password'}
                                    label="Password"
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => {
                                                        setShowPassword(!showPassword);
                                                    }}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    // disabled={}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        mt={4}
                    >
                        <Button
                            onClick={form.handleSubmit(onSubmit)}
                            sx={{
                                '&.MuiButton-root': {
                                    border: '2px solid #472F05',
                                    boxShadow: '3px 3px #472F05',
                                    color: '#472F05',
                                    borderRadius: 0,
                                    backgroundColor: '#A4B89D',
                                    px: 3,
                                    py: 1.5,
                                },
                                '&:hover': {
                                    backgroundColor: '#97AE8f',
                                },
                            }}
                        >
                            <Typography
                                fontFamily={fira_sans_800.style.fontFamily}
                                fontSize={18}
                                color={'#472F05'}
                            >
                                Login as Admin
                            </Typography>
                        </Button>
                    </Box>
                </form>

                
            </Box>
        </Box>
    );
}
