'use client';
import React, { useState } from 'react';
import {
    Box,
    Typography,
    CssBaseline,
    Container,
    Paper,
    IconButton,
    InputAdornment,
    TextField,
    styled,
} from '@mui/material';
import { Stack } from '@mui/material';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { fira_sans_600 } from '@core/theme/theme';
import useToastUI from '@core/hooks/useToastUI';
import { useRouter } from 'next/navigation';
import useVerifyEmail from '@services/api/v1/user/useVerifyEmail';
import useGetOTP from '@services/api/v1/user/useGetOTP';

type FormValues = {
    email: string;
    password: string;
};

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#472F05',
    },
    '& label': {
        fontFamily: fira_sans_600.style.fontFamily,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiInputBase-input': {
        fontFamily: fira_sans_600.style.fontFamily,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: 0,
            border: '1px solid #472F05',
        },
        '&:hover fieldset': {
            border: '2px solid #472F05',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #472F05',
        },
        '&.Mui-error': {
            color: 'red',
            boxShadow: '3px 2px #B12000',
        },
    },
});

const sxTextField = {
    boxShadow: '3px 3px #472F05',
    '&:hover': {
        backgroundColor: '#F3DDD1',
    },
};

export default function EmailRecoverForm() {
    const form = useForm<FormValues>();
    const toastUI = useToastUI();
    const router = useRouter();
    const [emailError, setEmailError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (data: FormValues) => {
        if (!data.email) {
            setEmailError(true);
            return toastUI.toastError('Email is required');
        }

        useVerifyEmail(data.email).then((res) => {
            if (!res) {
                setEmailError(true);
                return toastUI.toastError('Email is not registered');
            } else {
                useGetOTP(data.email).then((res) => {
                    if (!res) {
                        toastUI.toastError('Failed to send OTP');
                    } else {
                        toastUI.toastSuccess('OTP has been sent to your email');
                    }
                });
                router.push('recover/cSN7Z4xV6IYTbOaH?email=' + data.email);
            }
        });

        /*
        if (data.password !== confirmPassword) {
            setConfirmPasswordError(true);
            return toastUI.toastError('Password and Confirm Password do not match');
        }
        */
    };
    return (
        <React.Fragment>
            <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
                <CssBaseline />
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper
                        variant="outlined"
                        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, boxShadow: '3px 3px #472F05' }}
                    >
                        <Box
                            sx={{
                                fontFamily: 'sans-serif',
                                backgroundColor: 'rgb(255, 255, 255)',
                                width: '100%',
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: '2.1rem',
                                ' @media(max-width:479px)': { rowGap: '1.5rem', padding: '1rem' },
                            }}
                        >
                            <Stack sx={{ alignItems: 'flex-start', width: '100%' }} spacing="10px">
                                <Typography
                                    variant="h5"
                                    sx={{
                                        lineHeight: 'normal',
                                        ' @media(max-width:991px)': { fontSize: '1.7rem' },
                                        ' @media(max-width:479px)': { fontSize: '1.2rem' },
                                    }}
                                >
                                    Recover Username
                                </Typography>
                            </Stack>
                            <Stack sx={{ alignItems: 'center', width: '100%' }} spacing="10px">
                                <CustomTextField
                                    {...form.register('email')}
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    autoComplete="current-email"
                                    error={emailError}
                                    onChange={() => {
                                        setEmailError(false);
                                    }}
                                    sx={sxTextField}
                                />
                                {/*
                                <CustomTextField
                                    {...form.register('password')}
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    error={passwordError}
                                    onChange={() => {
                                        setPasswordError(false);
                                    }}
                                    sx={sxTextField}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <CustomTextField
                                    fullWidth
                                    label="Confirm Password"
                                    variant="outlined"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    sx={sxTextField}
                                    error={confirmPasswordError}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setConfirmPasswordError(false);
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                */}
                                <Button
                                    disableElevation
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        '&:hover': { backgroundColor: '#9ca3af' },
                                        gap: '8px',
                                        color: 'black',
                                        textTransform: 'none',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '8px',
                                        border: '1px solid rgb(147, 149, 150)',
                                        backgroundColor: '#64ccccff',
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: '600',
                                            fontSize: '18px',
                                        }}
                                    >
                                        Submit
                                    </Typography>
                                </Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Container>
            </form>
        </React.Fragment>
    );
}
