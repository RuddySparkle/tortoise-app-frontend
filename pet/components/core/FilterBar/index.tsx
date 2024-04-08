'use client'

import { useState } from "react";
import { fira_sans_800, fira_sans_600 } from "@core/theme/theme";
import { CustomTextField } from "../CustomInput/type";
import { Box, Typography, Stack, Button, MenuItem, Grid, Slider } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import useGetPetCategory from "@services/api/master/useGetPetCategory";
import { IPetCategoryMasterData } from "@services/api/master/useGetPetCategory";
import { IPetFilter, PetSearchParams } from "@services/api/v1/pets/type";

type filterProps = {
    onFiltersChange: Function
}

const SEX_MASTER = ['Male', 'Female']

export default function FilterBar(props: filterProps) {

    const { data: petCategory, isSuccess: petCategorySuccess } = useGetPetCategory();
    const petCategoryList = ((petCategory || []) as IPetCategoryMasterData[]);

    const [category, setCategory] = useState('');
    const [sex, setSex] = useState('');
    const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);

    const onSubmit = () => {

        const data = {
            category: category,
            species: '',
            sex: sex,
            behavior: '',
            minAge: '',
            maxAge: '',
            minWeight: '',
            maxWeight: '',
            minPrice: priceRange.at(0)?.toString(),
            maxPrice: priceRange.at(1)?.toString(),
        } as PetSearchParams

        props.onFiltersChange(data)
    }

    return (
        <Stack
            direction={'column'}
            spacing={3}
            border={'2px solid #472F05'}
            borderRadius={1}
            boxShadow={'3px 3px #472F05'}
            px={'2%'}
            py={3}
            sx={{
                backgroundColor: '#F3C194'
            }}
        >
            <Typography
                fontFamily={fira_sans_800.style.fontFamily}
                fontSize={27}
                color={'#472F05'}
            >
                Filter Your Ideal Pet
            </Typography>
            <Grid container columnGap={4} rowGap={3} alignItems={'center'} justifyContent={'center'}>
                <Grid item xs={11} sm={11} md={3}>
                    <CustomTextField 
                        fullWidth
                        select 
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{
                            textAlign: 'left',
                            backgroundColor: '#FEF1DA'
                        }}
                    >
                        <MenuItem
                            key={'Any'}
                            value={''}
                            sx={{
                                fontFamily: fira_sans_600.style.fontFamily,
                                '&:hover': { backgroundColor: '#F3DDD1' },
                                '&:focus': { backgroundColor: 'rgb(272, 174, 133) !important' },
                            }}
                        >
                            Any
                        </MenuItem>
                        {petCategoryList.map((option) => (
                            <MenuItem
                                key={option.category}
                                value={option.category.replace(/^\w/, (first) => first.toUpperCase())}
                                sx={{
                                    fontFamily: fira_sans_600.style.fontFamily,
                                    '&:hover': { backgroundColor: '#F3DDD1' },
                                    '&:focus': { backgroundColor: 'rgb(272, 174, 133) !important' },
                                }}
                            >
                                {option.category.replace(/^\w/, (first) => first.toUpperCase())}
                            </MenuItem>
                        ))}
                    </CustomTextField> 
                </Grid>
                <Grid item xs={11} sm={11} md={3}>
                    <CustomTextField 
                        fullWidth
                        select 
                        label="Sex" 
                        onChange={(e) => setSex(e.target.value)}
                        sx={{
                            textAlign: 'left',
                            backgroundColor: '#FEF1DA'
                        }}
                    >
                        <MenuItem
                            key={'Any'}
                            value={''}
                            sx={{
                                fontFamily: fira_sans_600.style.fontFamily,
                                '&:hover': { backgroundColor: '#F3DDD1' },
                                '&:focus': { backgroundColor: 'rgb(272, 174, 133) !important' },
                            }}
                        >
                            Any
                        </MenuItem>
                        {SEX_MASTER.map((element) => (
                            <MenuItem
                                key={element}
                                value={element}
                                sx={{
                                    fontFamily: fira_sans_600.style.fontFamily,
                                    '&:hover': { backgroundColor: '#F3DDD1' },
                                    '&:focus': { backgroundColor: 'rgb(272, 174, 133) !important' },
                                }}
                            >
                                {element}
                            </MenuItem>
                        ))}
                    </CustomTextField> 
                </Grid>
                <Grid item xs={11} sm={11} md={3}>
                    <Stack 
                        direction={'column'} 
                        alignItems={'start'}
                    >
                        <Typography
                            fontFamily={fira_sans_600.style.fontFamily}
                            fontSize={16}
                            color={'#472F05'}
                        >
                            Price Range (Baht)
                        </Typography>
                        <Slider
                            min={0}
                            step={1000}
                            max={50000}
                            getAriaLabel={() => 'Temperature range'}
                            value={priceRange}
                            onChange={(e, newValue) => setPriceRange(newValue as number[])}
                            valueLabelDisplay="auto"
                            sx={{
                                color: '#472F05'
                            }}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={11} sm={11} md={1.5} alignContent={'center'}>
                    <Button
                        onClick={onSubmit}
                        sx={{
                            '&.MuiButton-root': {
                                border: '2px solid #472F05',
                                borderRadius: 0,
                                boxShadow: '3px 3px #472F05',
                                py: 1,
                                px: 1.5,
                                color: '#472F05',
                                fontSize: 18,
                                fontFamily: fira_sans_800.style.fontFamily,
                                backgroundColor: '#E18813',
                            },
                            '&:hover': {
                                backgroundColor: '#C66A15',
                            },
                        }}
                    >
                        <Stack spacing={0.5} direction={'row'} alignItems={'center'}>
                            <SearchIcon />
                            <Typography
                                fontFamily={fira_sans_800.style.fontFamily}
                                fontSize={18}
                                color={'#472F05'}
                            >
                                Search
                            </Typography>
                        </Stack>
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    )
}