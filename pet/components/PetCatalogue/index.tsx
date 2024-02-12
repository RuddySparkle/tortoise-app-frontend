'use client';
import PetCard from '../PetCard';
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { StaticImageData } from 'next/image';
import useGetPets from '../../services/api/v1/pets/useGetPets';

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

export default function PetCatalogue() {
    const {
        data: [petList, pagination] = [],
        refetch,
        isSuccess: petListSuccess,
    } = useGetPets(
        {
            search: '',
            filter: '',
        },
        {
            enabled: true,
        },
    );

    if (!petListSuccess) {
        return null;
    }

    const petListData = petList || [];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-around">
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
        </Box>
    );
}
