'use client';

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, SxProps, Theme, Typography, styled } from '@mui/material';
import { fira_sans_600 } from '../../../core/theme/theme';
import { UseFormReturn } from 'react-hook-form';

export interface SelectFieldChoice {
    label: string;
    value: string;
}

interface SelectFieldProps {
    name: string;
    label?: string;
    choices: SelectFieldChoice[];
    sx?: SxProps<Theme>;
    disabled?: boolean;
    defaultValue?: string;
    placeholder?: string;
    setFormValue: (value: string) => void;
}

export default function SelectField(props: SelectFieldProps) {
    const [choiceValue, setChoiceValue] = React.useState(props.defaultValue || '');

    const handleChange = (event: SelectChangeEvent) => {
        setChoiceValue(event.target.value);
        props.setFormValue(event.target.value);
    };
    return (
        <FormControl sx={
            { 
                ...props.sx, 
                width: '100%',
            }}
        >
            {props.label && <InputLabel id="demo-simple-select-filled-label">
                <Typography
                    fontFamily={fira_sans_600.style.fontFamily}
                    color={'gray'}
                >
                    {props.label}
                </Typography>
            </InputLabel>}
            <Select
                fullWidth
                name={props.name}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={props.defaultValue}
                value={choiceValue}
                onChange={handleChange}
                disabled={props.disabled}
                placeholder={props.placeholder}
                variant={'outlined'}
                sx={{
                    width: '100%',
                    backgroundColor: 'rgb(255, 255, 255)',
                    fontFamily: fira_sans_600.style.fontFamily,
                    borderRadius: 0,
                    '& label.Mui-focused': {
                        color: '#472F05',
                    },
                    '& label': {
                        fontFamily: fira_sans_600.style.fontFamily
                    },
                    '& .MuiOutlinedInput-input': {
                        transition: '0.1s',
                        boxShadow: '3px 3px #472F05',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#B2BAC2',
                    },
                    '& .MuiInputBase-input': {
                        borderRadius: 0,
                        border: '1px solid #472F05',
                        transition: '0.2s',
                        fontFamily: fira_sans_600.style.fontFamily,
                        '&.Mui-focused': {
                            border: '2px solid #472F05',
                        }
                    },
                    '& .MuiInputBase-input:hover': {
                        border: '1px solid #472F05',
                        backgroundColor: '#E5CB9A'
                    },
                    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                        border: '1px solid #472F05',
                        '&.Mui-focused fieldset': {
                            border: '1px solid #472F05'
                        }
                    },
                    '& .MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused': {
                        '& .MuiInputBase-input': {
                            border: '1px solid #472F05',
                        }
                    }
                    
                }}
            >
                {props.choices.map((eachChoice, index) => (
                    <MenuItem
                        id={eachChoice.value}
                        key={index}
                        value={eachChoice.value}
                        sx={{
                            m: 0,
                            borderRadius: 0,
                            fontFamily: fira_sans_600.style.fontFamily,
                            '&:hover': {
                                backgroundColor: '#FFF8E8',
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#E5CB9A !important',
                            },
                        }}
                    >
                        {eachChoice.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        
    );
}
