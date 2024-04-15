'use client';

import SellerCardForAdmin from '@components/admin/SellerCardForAdmin';
import { fira_sans_800 } from '@core/theme/theme';
import { Box, Typography, Grid } from '@mui/material';
import useGetSellers from '@services/api/v1/seller/useGetSellers';

export default function AdminReviewPage() {
    const { data: sellers, isSuccess: sellerProfileSuccess } = useGetSellers();
    if (!sellerProfileSuccess) {
        return null;
    }
    console.log(sellers);

    return (
        <Box
            my={5}
            mx={'7%'}
            py={4}
            px={4}
            border={'2px solid #315369'}
            borderRadius={0}
            boxShadow={'8px 8px #315369'}
            sx={{
                backgroundColor: 'whitesmoke',
            }}
        >
            <Typography
                fontFamily={fira_sans_800.style.fontFamily}
                fontSize={30}
                color={'#213948'}
                textAlign={'center'}
                pb={4}
            >
                Reviews on each Seller
            </Typography>
            <Box
                sx={{
                    border: '2px solid #213948',
                    boxShadow: '4px 4px #213948',
                    backgroundColor: '#DAE6EE',
                    mx: 3,
                    p: 2,
                }}
            >
                <Grid container spacing={4} p={2}>
                    {(sellers || []).map((item) => (
                        <SellerCardForAdmin sellerId={item.id} />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
