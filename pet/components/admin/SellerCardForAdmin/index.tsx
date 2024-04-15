import { Box, Grid, Typography, Stack, Button, ButtonBase } from '@mui/material';
import { fira_sans_400, fira_sans_600, fira_sans_800 } from '@core/theme/theme';
import useGetUserProfile from '@services/api/v1/user/useGetUserProfile';
import SellerReviewDialog from '@components/user/SellerReviewDialog';
import { useState } from 'react';
import useGetSellerProfile from '@services/api/v1/seller/useGetSellerProfile';
import useGetSellerReviews from '@services/api/v1/review/useGetSellerReview';
import { SellerReview } from '@services/api/v1/review/type';

interface sellerProps {
    sellerId: string;
}

export default function SellerCardForAdmin(props: sellerProps) {
    const [openSellerReviewDialog, setOpenSellerReviewDialog] = useState(false);
    const handleSellerReviewDialog = async () => {
        console.log('Seller Review Dialog');
    };

    const { data: sellerProfile, isSuccess: sellerProfileSuccess } = useGetSellerProfile(props.sellerId || '');
    const {
        data: sellerReviewData,
        isSuccess: sellerReviewSuccess,
        refetch: refetchReview,
    } = useGetSellerReviews(props.sellerId || '');
    if (!sellerProfileSuccess) {
        return null;
    }
    console.log(sellerProfile);

    return (
        <Grid item xs={12} md={4}>
            <SellerReviewDialog
                open={openSellerReviewDialog}
                setOpen={setOpenSellerReviewDialog}
                header={`${sellerProfile.first_name}'s Shop Reviews`}
                handleConfirm={handleSellerReviewDialog}
                cancelText="Close"
                sellerId={props.sellerId}
                sellerName={sellerProfile.first_name}
                isMyShop={false}
                isAdmin={true}
                sellerReviewData={(sellerReviewData || []) as SellerReview[]}
                sellerReviewSuccess={Boolean(sellerReviewSuccess)}
                refetchReview={refetchReview}
            />
            <ButtonBase
                sx={{
                    width: '100%',
                }}
                onClick={() => setOpenSellerReviewDialog(true)}
            >
                <Box
                    display={'block'}
                    border={'2px solid #213948'}
                    borderRadius={1}
                    boxShadow={'3px 3px #213948'}
                    p={2}
                    sx={{
                        height: 130,
                        width: '100%',
                        backgroundColor: '#A8C4D6',
                        transition: '0.3s',
                        overflowWrap: '-moz-initial',
                        overflowX: 'hidden',
                        '&:hover': {
                            backgroundColor: '#78A1B5',
                        },
                    }}
                >
                    <Box
                        component={'div'}
                        display={'block'}
                        width={'100%'}
                        sx={{
                            textOverflow: 'ellipsis',
                        }}
                    >
                        <Typography
                            component={'div'}
                            display={'inline-block'}
                            fontFamily={fira_sans_800.style.fontFamily}
                            fontSize={20}
                            textAlign={'center'}
                            color={'#213948'}
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                        >
                            {sellerProfile.first_name} {sellerProfile.last_name}
                        </Typography>
                    </Box>

                    <Stack direction={'row'} spacing={1} textAlign={'center'} flex={'row'} justifyContent={'center'}>
                        <Typography
                            fontFamily={fira_sans_600.style.fontFamily}
                            fontSize={18}
                            textAlign={'center'}
                            color={'#213948'}
                        >
                            License:
                        </Typography>
                        <Typography
                            fontFamily={fira_sans_400.style.fontFamily}
                            fontSize={18}
                            textAlign={'center'}
                            color={'#213948'}
                        >
                            {sellerProfile.license}
                        </Typography>
                    </Stack>
                    {/* <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'end'}
                        height={35}
                        mt={1}
                    >
                        
                    </Box> */}
                </Box>
            </ButtonBase>
        </Grid>
    );
}
