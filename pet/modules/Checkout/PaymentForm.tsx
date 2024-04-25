import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PaymentMethodTab from '@components/payment/PaymentMethodTab';
import { useState, Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import MockQR from '@public/image/MockQR.png';
import { CustomTextField } from '@components/core/CustomInput/type';
import { fira_sans_600, fira_sans_800 } from '@core/theme/theme';

export default function PaymentForm({
    paymentMethod,
    updatePaymentMethod,
    cardHolder,
    updateCardHolder,
    cardNumber,
    updateCardNumber,
    expDate,
    updateExpDate,
    cvv,
    updateCvv,
}: {
    paymentMethod: any;
    updatePaymentMethod: any;
    cardHolder: any;
    updateCardHolder: any;
    cardNumber: any;
    updateCardNumber: any;
    expDate: any;
    updateExpDate: any;
    cvv: any;
    updateCvv: any;
}) {
    return (
        <Fragment>
            <Box sx={{ px: 4 }}>
                <Typography
                    sx={{
                        fontFamily: fira_sans_800.style.fontFamily,
                        textAlign: 'center',
                        fontSize: 20,
                        color: '#472F05',
                        mb: 2,
                    }}
                >
                    Select your Payment Method
                </Typography>
                <PaymentMethodTab value={paymentMethod} setValue={updatePaymentMethod} />
                {paymentMethod == 0 ? (
                    <Grid container spacing={3} sx={{ py: '24px' }}>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                required
                                id="cardName"
                                label="Name on card"
                                fullWidth
                                autoComplete="cc-name"
                                value={cardHolder}
                                onChange={updateCardHolder}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                required
                                id="cardNumber"
                                label="Card number"
                                fullWidth
                                autoComplete="cc-number"
                                value={cardNumber}
                                onChange={updateCardNumber}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                required
                                id="expDate"
                                label="Expiry date"
                                helperText={
                                    <Typography fontFamily={fira_sans_600.style.fontFamily} fontSize={13} pt={0.5}>
                                        Format: MM/YY
                                    </Typography>
                                }
                                fullWidth
                                autoComplete="cc-exp"
                                value={expDate}
                                onChange={updateExpDate}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                required
                                id="cvv"
                                label="CVV"
                                helperText={
                                    <Typography fontFamily={fira_sans_600.style.fontFamily} fontSize={13} pt={0.5}>
                                        Last three digits on signature strip
                                    </Typography>
                                }
                                fullWidth
                                autoComplete="cc-csc"
                                value={cvv}
                                onChange={updateCvv}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ overflow: 'hidden' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        name="saveCard"
                                        value="yes"
                                        sx={{
                                            '&.MuiCheckbox-colorPrimary': {
                                                color: '#472F05',
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <Typography fontFamily={fira_sans_600.style.fontFamily} color={'#472F05'}>
                                        Remember credit card details for next time
                                    </Typography>
                                }
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <Box
                        sx={{
                            display: 'block',
                            py: 2,
                            px: 2,
                            mx: 15,
                            my: 3,
                            textAlign: '-webkit-center',
                            border: { xs: '2px solid #472F05', md: '4px solid #472F05' },
                            boxShadow: '5px 5px #472F05',
                        }}
                    >
                        <Image src={MockQR} alt="QR Image" sizes={'80%'} style={{ position: 'relative' }} />
                    </Box>
                )}
            </Box>
        </Fragment>
    );
}
