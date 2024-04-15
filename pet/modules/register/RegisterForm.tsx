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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Fira_Sans_Condensed } from 'next/font/google';
import useRegister from '../../core/auth/useRegister';

const fira_sans_condensed = Fira_Sans_Condensed({ weight: ['600'], subsets: ['latin'] });

type FormValues = {
    role: number;
    username: string;
    email: string;
    password: string;
};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#F9C067'),
    backgroundColor: '#FAA943',
    '&:hover': {
        backgroundColor: '#F79762',
    },
}));

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#472F05',
    },
    '& label': {
        fontFamily: fira_sans_condensed.style.fontFamily,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiInputBase-input': {
        fontFamily: fira_sans_condensed.style.fontFamily,
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

export default function RegisterForm() {
    const form = useForm<FormValues>();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
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
            return alert('Username field is blank.');
        }
        if (data.email === '') {
            setEmailError(true);
            return alert('Email field is blank.');
        }
        if (data.password === '') {
            setPasswordError(true);
            return alert('Password field is blank.');
        }
        if (confirmPassword !== data.password) {
            setConfirmPasswordError(true);
            return alert('Confirmed Password is not consistent.');
        }

        const res = await useRegister(data).then((d) => {
            return d;
        });
        if (!res.error) {
            alert(res.message);
        } else {
            alert(res.error);
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
                <CustomTextField {...form.register('role')} select label="Role" sx={sxTextField}>
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
                </CustomTextField>
                <CustomTextField
                    {...form.register('username')}
                    label="Username"
                    variant="outlined"
                    autoComplete="current-username"
                    error={usernameError}
                    onChange={() => {
                        setUsernameError(false);
                    }}
                    sx={sxTextField}
                />
                <CustomTextField
                    {...form.register('email')}
                    label="Email"
                    variant="outlined"
                    autoComplete="current-email"
                    error={emailError}
                    onChange={() => {
                        setEmailError(false);
                    }}
                    sx={sxTextField}
                />
                <CustomTextField
                    {...form.register('password')}
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
