'use client';

import useGetSession from '@core/auth/useGetSession';
import { fira_sans_400, fira_sans_600, fira_sans_800, sxFormLabel, sxTypography } from '@core/theme/theme';
import { Box, Typography, Stack, Card, Divider, FormLabel, FormControl, Avatar, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import useGetUserProfile from '@services/api/v1/user/useGetUserProfile';
import { useState } from 'react';
import SellerReviewDialog from '@components/user/SellerReviewDialog';
import useGetSellerReviews from '@services/api/v1/review/useGetSellerReview';
import { SellerReview } from '@services/api/v1/review/type';

export default function SellerProfileCard({ sellerId }: { sellerId: string }) {
    const [openSellerReviewDialog, setOpenSellerReviewDialog] = useState(false);
    const router = useRouter();
    const handleSellerReviewDialog = async () => {
        console.log('Seller Review Dialog');
    };
    const { data: sellerProfile, isSuccess: sellerProfileSuccess } = useGetUserProfile(sellerId || '');
    const {
        data: sellerReviewData,
        isSuccess: sellerReviewSuccess,
        refetch: refetchReview,
    } = useGetSellerReviews(sellerId);

    if (!sellerProfileSuccess) {
        return null;
    }

    return (
        <Box
            sx={{
                flex: 1,
                width: '100%',
                my: 3,
                display: 'block',
                position: 'relative',
            }}
        >
            <SellerReviewDialog
                open={openSellerReviewDialog}
                setOpen={setOpenSellerReviewDialog}
                header={`${sellerProfile.username}'s Shop Reviews`}
                handleConfirm={handleSellerReviewDialog}
                cancelText="Close"
                sellerId={sellerId}
                sellerName={sellerProfile.username}
                isMyShop={false}
                sellerReviewData={(sellerReviewData || []) as SellerReview[]}
                sellerReviewSuccess={Boolean(sellerReviewSuccess)}
                refetchReview={refetchReview}
            />
            <Card
                sx={{ border: '2px solid black', boxShadow: '5px 4px #472F05', backgroundColor: '#F3DDD1', py: '8px' }}
            >
                <Box sx={{ mb: 1 }}>
                    <Typography
                        sx={{
                            overflow: 'hidden',
                            textWrap: 'nowrap',
                            fontFamily: fira_sans_800.style.fontFamily,
                            fontSize: 24,
                            textAlign: 'center',
                            color: '#472F05',
                        }}
                    >
                        Seller's info
                    </Typography>
                </Box>
                <Divider />
                <Stack
                    direction="row"
                    spacing={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyItems: 'center',
                        alignItems: 'center',
                        my: 2,
                        mx: 3,
                    }}
                >
                    <Stack direction="column" spacing={1} sx={{ px: 1 }}>
                        <Avatar
                            sx={{
                                width: 130,
                                height: 130,
                                mb: 1.5,
                                boxShadow: '2px 2px 10px 3px grey',
                                border: '1.5px solid #472F05',
                            }}
                            src={sellerProfile.image}
                        ></Avatar>
                    </Stack>
                    <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
                        <Stack direction="row" spacing={3} sx={{ color: '#472F05' }}>
                            <Typography fontFamily={fira_sans_600.style.fontFamily} fontSize={18}>
                                Name:{' '}
                            </Typography>
                            <Typography fontFamily={fira_sans_400.style.fontFamily} fontSize={18}>
                                {sellerProfile.first_name} {sellerProfile.last_name}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={3} sx={{ color: '#472F05' }}>
                            <Typography fontFamily={fira_sans_600.style.fontFamily} fontSize={18}>
                                Tel:{' '}
                            </Typography>
                            <Typography fontFamily={fira_sans_400.style.fontFamily} fontSize={18}>
                                {sellerProfile.phoneNumber}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={3} sx={{ color: '#472F05' }}>
                            <Typography fontFamily={fira_sans_600.style.fontFamily} fontSize={18}>
                                Rating:{' '}
                            </Typography>
                            <Typography fontFamily={fira_sans_400.style.fontFamily} fontSize={18}>
                                Mock Rating 404
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: 'auto',
                        height: 'auto',
                        borderTop: 0,
                    }}
                >
                    <Button
                        onClick={() => setOpenSellerReviewDialog(true)}
                        sx={{
                            '&.MuiButton-root': {
                                border: '2px solid #472F05',
                                boxShadow: '3px 3px #472F05',
                                color: '#472F05',
                                borderRadius: 0,
                                backgroundColor: '#A4B89D',
                                my: 0.5,
                                px: 2,
                                py: 1,
                            },
                            '&:hover': {
                                backgroundColor: '#97AE8F',
                            },
                        }}
                    >
                        <Typography fontFamily={fira_sans_800.style.fontFamily} fontSize={16} color={'#472F05'}>
                            Reviews' Detail
                        </Typography>
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}
