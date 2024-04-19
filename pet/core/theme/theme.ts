'use client';

import { Tabs, styled, TextField, Button, ButtonProps } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Fira_Sans_Condensed } from 'next/font/google';
export const fira_sans_400 = Fira_Sans_Condensed({ weight: ['400'], subsets: ['latin'] });
export const fira_sans_600 = Fira_Sans_Condensed({ weight: ['600'], subsets: ['latin'] });
export const fira_sans_800 = Fira_Sans_Condensed({ weight: ['800'], subsets: ['latin'] });

export const sxTextField = {
    boxShadow: '3px 3px #472F05',
    transition: '0.3s',
    '&:hover': {
        backgroundColor: '#E5CB9A',
    },
};

export const THEME = createTheme({
    typography: {
        fontFamily: ['Fira Sans Condensed', 'Roboto Condensed', 'sans-serif'].join(','),
        fontSize: 14,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: '#6b6b6b #2b2b2b',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: '#2b2b2b',
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: '#6b6b6b',
                        minHeight: 24,
                        border: '3px solid #2b2b2b',
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: '#959595',
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: '#959595',
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#959595',
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: '#2b2b2b',
                    },
                },
            },
        },
        MuiTypography: {
            variants: [
                {
                    props: { variant: 'h2' },
                    style: {
                        fontFamily: ['Fira Sans Condensed', 'Roboto Condensed', 'sans-serif'].join(','),
                        fontSize: 14,
                    },
                },
            ],
        },
    },
});

export const CustomGreenButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#F9C067'),
    backgroundColor: '#F6F4D2',
    '&:hover': {
        backgroundColor: '#5C984A',
    },
}));

export const CustomTabs = styled(Tabs)({
    '& .css-1bgl54s-MuiButtonBase-root-MuiTab-root.Mui-selected': {
        fontFamily: fira_sans_600.style.fontFamily,
        color: '#6A443E',
    },
    '& .css-1bgl54s-MuiButtonBase-root-MuiTab-root': {
        fontFamily: fira_sans_600.style.fontFamily,
        color: 'grey',
    },
    '& .css-1aquho2-MuiTabs-indicator': {
        backgroundColor: '#6A443E',
        border: '1.75px solid #806550',
    },
    '& .css-1fbyp6v-MuiButtonBase-root-MuiTab-root': {
        fontFamily: fira_sans_600.style.fontFamily,
    },
    '& .MuiButtonBase-root-MuiTab-root.Mui-selected': {
        color: '#6A443E',
    },
});

export const CustomPinkTextField = styled(TextField)({
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
        transition: '0.3s',
        fontFamily: fira_sans_600.style.fontFamily,
    },
    '& .MuiInputBase-input:hover': {
        backgroundColor: '#F3DDD1',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            transition: '0.3s',
            borderRadius: 0,
            border: '1px solid #472F05',
            boxShadow: '3px 3px #472F05',
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

export const CustomGreenTextField = styled(TextField)({
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
        transition: '0.3s',
        fontFamily: fira_sans_600.style.fontFamily,
    },
    '& .MuiInputBase-input:hover': {
        backgroundColor: '#A5BE7D',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: 0,
            border: '1px solid #472F05',
            boxShadow: '3px 3px #472F05',
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

export const CustomBlueTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#472F05',
    },
    '& label': {
        fontFamily: fira_sans_600.style.fontFamily
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiInputBase-input': {
        fontFamily: fira_sans_600.style.fontFamily,
        backgroundColor: '#D2DFE6'
    },
    '& .MuiInputBase-input:hover': {
        backgroundColor: '#D7E3E9'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: 0,
            border: '1px solid #472F05',
            boxShadow: '3px 3px #472F05',
        },
        '&:hover fieldset': {
            border: '2px solid #472F05',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #472F05',
        },
        '&.Mui-error': {
            color: 'red',
            boxShadow: '3px 2px #B12000'
        }
    },
  });

export const sxFormLabel = { fontFamily: fira_sans_600.style.fontFamily, fontSize: 24, color: '#472F05' };
export const sxTypography = {
    fontFamily: fira_sans_600.style.fontFamily,
    fontSize: 18,
    paddingLeft: 3,
    color: 'rgb(72,52,24)',
};

