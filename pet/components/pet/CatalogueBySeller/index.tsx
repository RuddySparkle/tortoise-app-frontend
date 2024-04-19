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
import useGetUserProfile from '@services/api/v1/user/useGetUserProfile';
import useGetSellerProfile from '@services/api/v1/seller/useGetSellerProfile';
import { Typography } from '@mui/material';
import { ClosedCaptionDisabledSharp } from '@mui/icons-material';
import { fira_sans_600, fira_sans_800 } from '@core/theme/theme';

export default function CatalogueBySeller() {
    const session = useGetSession();
    const {
        data: [sellerPetList, pagination] = [],
        refetch,
        isSuccess: petListSuccess,
    } = useGetPetsBySeller(session.userID || '');

    const petListData = sellerPetList || [];
    
    const { data: sellerProfile, isSuccess: sellerProfileSuccess } = useGetSellerProfile(session.userID || '');

    if (!sellerProfileSuccess) {
        return null;
    }

    if (!petListSuccess) {
        return null;
    }

    console.log(sellerProfile)

    return (
        <Box
            sx={{
                mx: '5%',
                py: 3,
                px: 4,
                backgroundColor: '#F4B983',
                border: '2px solid #472F05',
                borderRadius: 1,
                boxShadow: '5px 5px #472F05',
            }}
        >
            {
                sellerProfile.status === 'verified' ?
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
                    justifyContent="space-around stretch"
                >
                
                        <Grid item xs={2} sm={4} md={4}>
                            <PetAddCard status={sellerProfile.status}/>
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
                :
                <Typography
                    fontFamily={fira_sans_800.style.fontFamily}
                    fontSize={25}
                    color={'#472F05'}
                    textAlign={'center'}
                    py={3}
                >
                    Your shop has not been approved yet. Please wait for admin to approve.
                </Typography>
            }
        </Box>
    );
}
