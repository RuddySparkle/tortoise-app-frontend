import { fira_sans_400, fira_sans_600, fira_sans_800 } from '@core/theme/theme';
import { Box, Grid, Stack, Typography, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import useToastUI from '@core/hooks/useToastUI';
import useApproveSeller from '@services/api/v1/admin/useApproveSeller';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { ISellerProfile } from '@services/api/v1/seller/type';
import useGetUserProfile from '@services/api/v1/user/useGetUserProfile';
import useGetSellerProfile from '@services/api/v1/seller/useGetSellerProfile';

type SellerProps = {
    id: string;
    first_name: string;
    last_name: string;
    license: string;
    refetchSellers: (options?: RefetchOptions) => Promise<QueryObserverResult<any, any>>;
};

export default function UnverifiedUserCard(props: SellerProps) {
    const { refetchSellers } = props;
    const toastUI = useToastUI();
    const { mutateAsync: mutateApproveSeller } = useApproveSeller({
        onSuccess: () => {
            toastUI.toastSuccess('Seller Approved!');
            refetchSellers();
        },
        onError: (err) => {
            toastUI.toastError(err.message);
        },
    });

    const handleApprove = async (sellerId: string) => {
        try {
            await mutateApproveSeller(sellerId);
        } catch (err) {
            throw err;
        }
    };

    return (
        <Grid item xs={12} md={4}>
            <Box
                border={'2px solid #213948'}
                borderRadius={1}
                boxShadow={'3px 3px #213948'}
                p={2}
                sx={{
                    backgroundColor: '#A8C4D6',
                }}
            >
                <Typography
                    fontFamily={fira_sans_800.style.fontFamily}
                    fontSize={22}
                    textAlign={'center'}
                    color={'#213948'}
                >
                    {!props.first_name && !props.last_name ? '(Undefined Name)' : `${props.first_name} ${props.last_name}`}
                </Typography>
                <Stack direction={'row'} spacing={1} textAlign={'center'} flex={'row'} justifyContent={'center'}>
                    <Typography
                        fontFamily={fira_sans_600.style.fontFamily}
                        fontSize={18}
                        textAlign={'center'}
                        color={'#213948'}
                    >
                        Seller's License: 
                    </Typography>
                    <Typography
                        fontFamily={fira_sans_400.style.fontFamily}
                        fontSize={18}
                        textAlign={'center'}
                        color={'#213948'}
                    >
                        {props.license}
                    </Typography>
                </Stack>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'end'} height={35} mt={1}>
                    <Button
                        sx={{
                            '&.MuiButton-root': {
                                border: '2px solid #472F05',
                                borderRadius: 0,
                                boxShadow: '2px 2px #472F05',
                                px: 2,
                                mr: 1,
                                color: '#472F05',
                                fontSize: 16,
                                fontFamily: fira_sans_600.style.fontFamily,
                                backgroundColor: '#BAD128',
                            },
                            '&:hover': {
                                backgroundColor: '#9FB322',
                            },
                        }}
                        onClick={() => handleApprove(props.id)}
                    >
                        <CheckIcon />
                    </Button>
                    {/* <Button
                        // onClick={}
                        sx={{
                            '&.MuiButton-root': {
                                border: '2px solid #472F05',
                                borderRadius: 0,
                                boxShadow: '2px 2px #472F05',
                                px: 2,
                                color: '#472F05',
                                fontSize: 16,
                                fontFamily: fira_sans_600.style.fontFamily,
                                backgroundColor: '#E18A7A',
                            },
                            '&:hover': {
                                backgroundColor: '#CF5555',
                            },
                        }}
                    >
                        <DoNotDisturbAltIcon />
                    </Button> */}
                </Box>
            </Box>
        </Grid>
    );
}
