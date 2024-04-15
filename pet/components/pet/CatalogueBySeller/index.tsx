'use client';
import PetCard from '../PetCard';

import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useGetPets from '../../../services/api/v1/pets/useGetPets';
import PetAddCard from '../PetAddCard';
import useGetSession from '../../../core/auth/useGetSession';
import useGetPetsBySeller from '../../../services/api/v1/pets/useGetPetsBySeller';

export default function CatalogueBySeller() {
    const session = useGetSession();
    const {
        data: [sellerPetList, pagination] = [],
        refetch,
        isSuccess: petListSuccess,
    } = useGetPetsBySeller(session.userID || '');

    if (!petListSuccess) {
        return null;
    }

    const petListData = sellerPetList || [];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
                justifyContent="space-around stretch"
            >
                <Grid item xs={2} sm={4} md={4}>
                    <PetAddCard />
                </Grid>
                {petListData.map((eachpetCard, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <PetCard
                            petId={eachpetCard.id}
                            petName={eachpetCard.name}
                            category={eachpetCard.category}
                            seller={session.userID}
                            price={eachpetCard.price}
                            imgSrc={eachpetCard.media}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
