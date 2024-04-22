'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Avatar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import UserSettingsCard from '@components/user/UserSettings';
import { fira_sans_400, fira_sans_600, fira_sans_800 } from '@core/theme/theme';
import AccountOptionList from '@components/user/AccountOptionList';
import { IUserDetail } from '@services/api/v1/user/type';
import useGetUserProfile from '@services/api/v1/user/useGetUserProfile';
import useGetSession from '@core/auth/useGetSession';
import useGetBankAccount from '@services/api/v1/seller/useGetBankAccount';
import { ISellerQueryParams } from '@services/api/v1/seller/type';
import BankAccountShowCase from '@components/user/BankAccountShowCase';

export default function UserProfilePage() {
    const session = useGetSession();
    const { data: userProfile, isSuccess: userProfileSuccess } = useGetUserProfile(session.userID || '');

    if (!userProfileSuccess) {
        return null;
    }

    return (
        <Box sx={{ alignSelf: 'center', mt: 5 }}>
            <Grid container direction="column" sx={{ overflowX: 'hidden', flexWrap: 'nowrap' }}>
                <Grid
                    container
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 0, md: 10 }}
                    sx={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        top: '15vh',
                        px: { xs: 7, md: 12 },
                        pt: 0,
                    }}
                >
                    <Grid item md={4} sx={{ alignSelf: 'normal', justifySelf: 'center' }}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                            border={'2px solid #472F05'}
                            borderRadius={1}
                            boxShadow={'3px 3px #472F05'}
                            p={3}
                            sx={{
                                backgroundColor: '#F9E6CF',
                            }}
                        >
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                alignItems={'center'}
                                py={3}
                                px={4}
                                border={'3px solid #472F05'}
                                boxShadow={'6px 6px #472F05'}
                                borderRadius={0}
                                sx={{
                                    backgroundColor: '#E5CB9A',
                                }}
                            >
                                <Avatar
                                    alt="Profile Picture"
                                    src={userProfile.image}
                                    sx={{
                                        width: 180,
                                        height: 180,
                                        border: '2px solid #472F05',
                                        boxShadow: 10,
                                        fontSize: 70,
                                        fontFamily: fira_sans_800.style.fontFamily,
                                    }}
                                >
                                    {userProfile.username[0].toUpperCase()}
                                </Avatar>
                                <Typography
                                    variant="h5"
                                    fontFamily={fira_sans_800.style.fontFamily}
                                    color={'#472F05'}
                                    pt={5}
                                >
                                    {userProfile.username}
                                </Typography>
                            </Box>

                            <AccountOptionList />
                        </Box>
                    </Grid>

                    <Grid item md={7.5} sx={{ width: '100%', alignSelf: 'normal', right: 0 }}>
                        <Box
                            border={'2px solid #472F05'}
                            borderRadius={1}
                            boxShadow={'3px 3px #472F05'}
                            p={5}
                            sx={{
                                backgroundColor: '#F1C9B7',
                            }}
                        >
                            <UserSettingsCard
                                _id={userProfile._id}
                                username={userProfile.username}
                                first_name={userProfile.first_name}
                                last_name={userProfile.last_name}
                                gender={userProfile.gender}
                                phoneNumber={userProfile.phoneNumber}
                                address={userProfile.address}
                                image={userProfile.image}
                            />
                            <Box
                                sx={{
                                    width: '100%',
                                    alignSelf: 'normal',
                                    border: '3px solid #472F05',
                                    borderRadius: 0,
                                    boxShadow: '5px 5px #472F05',
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: '#84B66B',
                                    }}
                                >
                                    <Typography
                                        align="center"
                                        color={'#472F05'}
                                        fontFamily={fira_sans_600.style.fontFamily}
                                        fontSize={22}
                                        py={1}
                                    >
                                        Bank Account
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        py: 2,
                                        backgroundColor: '#EBEBD3',
                                    }}
                                >
                                    {session?.role === 'seller' && (
                                        <BankAccountShowCase seller_id={session.userID as string} />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
