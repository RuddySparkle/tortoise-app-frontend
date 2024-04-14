import { Button, ButtonProps, TextField, styled } from "@mui/material";
import { Fira_Sans_Condensed } from "next/font/google";

const fira_sans_condensed = Fira_Sans_Condensed({ weight: ['600'], subsets: ['latin'] });

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#F9C067'),
    backgroundColor: '#FAA943',
    '&:hover': {
      backgroundColor: '#F79762'
    }
}));

export const CustomTextField = styled(TextField)({
        
    '& label.Mui-focused': {
        color: '#472F05',
    },
    '& label': {
        fontFamily: fira_sans_condensed.style.fontFamily
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiInputBase-input': {
        transition: '0.3s',
        fontFamily: fira_sans_condensed.style.fontFamily
    },
    '& .MuiInputBase-input:hover': {
        backgroundColor: '#E5CB9A'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            transition: '0.1s',
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

