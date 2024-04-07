'use client';
import PetCard from '../PetCard';
import React, { useEffect } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useGetPets from '../../../services/api/v1/pets/useGetPets';
import useToastUI from '../../../core/hooks/useToastUI';
import { Typography } from '@mui/material';
import { PetSearchParams } from '@services/api/v1/pets/type';
import { fira_sans_600, fira_sans_800 } from '@core/theme/theme';

export interface PetCardProps {
    petId: string;
    petName: string;
    breed: string;
    seller: string;
    price: number;
    imgSrc: string;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

type petFilterType = {
    petFilters: PetSearchParams,
}

export default function PetCatalogue(props: petFilterType) {
    const { toastError } = useToastUI();
    const {
        data: [petList, pagination] = [],
        refetch,
        isSuccess: petListSuccess,
        isError,
    } = useGetPets(
        props.petFilters,
        {
            enabled: true,
        },
    );

    const petListData = petList || [];

    return (
        <Box 
            sx={{ 
                flexGrow: 1,
                my: 2,
                p: 3,
                border: '2px solid #472F05',
                borderRadius: 1,
                boxShadow: '3px 3px #472F05',
                backgroundColor: '#F8C4A7'
            }}
        >
            {
                (!petListSuccess || petListData?.length == 0) ?

                <Typography
                    fontFamily={fira_sans_800.style.fontFamily}
                    fontSize={24}
                    color={'#472F05'}
                >
                    No pets found
                </Typography> : 

                <Grid
                    container
                    spacing={{ xs: 3, md: 4 }}
                    columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
                    justifyContent="space-around stretch"
                >
                    {petListData.map((eachpetCard, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <PetCard
                                petId={eachpetCard.id}
                                petName={eachpetCard.name}
                                breed={eachpetCard.category}
                                seller={`${eachpetCard.seller_name} ${eachpetCard.seller_surname}`}
                                price={eachpetCard.price}
                                imgSrc={eachpetCard.media}
                            />
                        </Grid>
                    ))}
                </Grid>
            }

        </Box>
    );
}
