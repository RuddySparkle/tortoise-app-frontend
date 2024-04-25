'use-client';

import {
    Typography,
    TextField,
    Box,
    IconButton,
    InputAdornment,
    createTheme,
    MenuItem,
    Button,
    ButtonProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Fira_Sans_Condensed } from 'next/font/google';
import useRegister from '@core/auth/useRegister';
import { CustomPinkTextField, fira_sans_600 } from '@core/theme/theme';
import useToastUI from '@core/hooks/useToastUI';

const fira_sans_condensed = Fira_Sans_Condensed({ weight: ['600'], subsets: ['latin'] });

type FormValues = {
    role: number;
    username: string;
    email: string;
    password: string;
    license?: string;
};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#F9C067'),
    backgroundColor: '#FAA943',
    '&:hover': {
        backgroundColor: '#F79762',
    },
}));

export default function RegisterForm() {
    const form = useForm<FormValues>();
    const toastUI = useToastUI();
    const router = useRouter();

    const [roleSelected, setRoleSelected] = useState(0);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [licenseError, setLicenseError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const roles = [
        { label: 'Pet Seller', value: 1 },
        { label: 'Pet Buyer', value: 2 },
    ];

    const sxTextField = {
        boxShadow: '3px 3px #472F05',
        '&:hover': {
            backgroundColor: '#F3DDD1',
        },
    };

    const onSubmit = async (data: FormValues) => {
        if (data.username === '') {
            setUsernameError(true);
            return toastUI.toastError('Username field is blank.');
        }
        if (data.email === '') {
            setEmailError(true);
            return toastUI.toastError('Email field is blank.');
        }
        if (data.password === '') {
            setPasswordError(true);
            return toastUI.toastError('Password field is blank.');
        }
        if (confirmPassword !== data.password) {
            setConfirmPasswordError(true);
            return toastUI.toastError('Confirmed Password is not consistent.');
        }
        if (roleSelected == 1) {
            if (!data.license || !data.license.match(/^\d{2}\/.+$/)) {
                setLicenseError(true);
                return toastUI.toastError("Please add a valid form of Pet seller's license");
            }
        } else {
            data.license = '';
        }

        console.log(data);

        const res = await useRegister(data).then((d) => {
            return d;
        });
        if (!res.error) {
            toastUI.toastSuccess('Successfully Register');
        } else {
            toastUI.toastSuccess('Register Error');
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <Box
                sx={{
                    width: '100%',
                    height: '57vh',
                    display: 'flex',
                    flexDirection: 'column',
                    p: '8%',
                    gap: '20px',
                    overflow: 'scroll',
                }}
            >
                <CustomPinkTextField
                    {...form.register('role')}
                    select
                    label="Role"
                    onChange={(e) => setRoleSelected(Number(e.target.value))}
                >
                    {roles.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            sx={{
                                fontFamily: fira_sans_condensed.style.fontFamily,
                                '&:hover': { backgroundColor: '#F3DDD1' },
                                '&:focus': { backgroundColor: 'rgb(272, 174, 133) !important' },
                            }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </CustomPinkTextField>
                <CustomPinkTextField
                    {...form.register('username')}
                    label="Username"
                    variant="outlined"
                    autoComplete="current-username"
                    error={usernameError}
                    onChange={() => {
                        setUsernameError(false);
                    }}
                />
                <CustomPinkTextField
                    {...form.register('email')}
                    label="Email"
                    variant="outlined"
                    autoComplete="current-email"
                    error={emailError}
                    onChange={() => {
                        setEmailError(false);
                    }}
                />
                <CustomPinkTextField
                    {...form.register('password')}
                    label="Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    error={passwordError}
                    onChange={() => {
                        setPasswordError(false);
                    }}
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
                <CustomPinkTextField
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
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {roleSelected == 1 ? (
                    <CustomPinkTextField
                        {...form.register('license')}
                        label="Seller's License"
                        variant="outlined"
                        autoComplete="current-username"
                        error={licenseError}
                        helperText={
                            <Typography
                                fontFamily={fira_sans_600.style.fontFamily}
                                fontSize={13}
                                pt={0.5}
                                color={'gray'}
                            >
                                Please type in form of Year/No. (Ex. 23/097)
                            </Typography>
                        }
                        onChange={() => {
                            setLicenseError(false);
                        }}
                    />
                ) : null}
                <Box
                    sx={{
                        backgroundColor: '#FAA943',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <ColorButton
                        sx={{
                            paddingY: 0.5,
                            border: '2px solid #472F05',
                            borderRadius: 0,
                            boxShadow: '3px 2px #472F05',
                            fontFamily: fira_sans_condensed.style.fontFamily,
                            fontSize: 15,
                        }}
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        Register NOW!
                    </ColorButton>
                </Box>
            </Box>
        </form>
    );
}
