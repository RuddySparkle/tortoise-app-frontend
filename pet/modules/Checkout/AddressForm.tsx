import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, styled } from '@mui/material';
import { fira_sans_600, fira_sans_800 } from '@core/theme/theme';
import { CustomTextField } from '@components/core/CustomInput/type';
import { sxTextField } from '@core/theme/theme';

export default function AddressForm({
    firstName,
    updateFirstName,
    lastName,
    updateLastName,
    address1,
    updateAddress1,
    address2,
    updateAddress2,
    city,
    updateCity,
    state,
    updateState,
    zip,
    updateZip,
    country,
    updateCountry,
}: {
    firstName: any;
    updateFirstName: any;
    lastName: any;
    updateLastName: any;
    address1: any;
    updateAddress1: any;
    address2: any;
    updateAddress2: any;
    city: any;
    updateCity: any;
    state: any;
    updateState: any;
    zip: any;
    updateZip: any;
    country: any;
    updateCountry: any;
}) {
    return (
        <React.Fragment>
            <Box sx={{ px: 4 }}>
                <Typography
                    gutterBottom
                    sx={{
                        fontFamily: fira_sans_800.style.fontFamily,
                        textAlign: 'center',
                        fontSize: 20,
                        color: '#472F05',
                        mb: 2,
                    }}
                >
                    Shipping address
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            fullWidth
                            autoComplete="given-name"
                            value={firstName}
                            onChange={updateFirstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            fullWidth
                            autoComplete="family-name"
                            value={lastName}
                            onChange={updateLastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField
                            required
                            id="address1"
                            name="address1"
                            label="Address line 1"
                            fullWidth
                            autoComplete="shipping address-line1"
                            value={address1}
                            onChange={updateAddress1}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField
                            id="address2"
                            name="address2"
                            label="Address line 2"
                            fullWidth
                            autoComplete="shipping address-line2"
                            value={address2}
                            onChange={updateAddress2}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="shipping address-level2"
                            value={city}
                            onChange={updateCity}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            id="state"
                            name="state"
                            label="State/Province/Region"
                            fullWidth
                            value={state}
                            onChange={updateState}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required
                            id="zip"
                            name="zip"
                            label="Zip / Postal code"
                            fullWidth
                            autoComplete="shipping postal-code"
                            value={zip}
                            onChange={updateZip}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required
                            id="country"
                            name="country"
                            label="Country"
                            fullWidth
                            autoComplete="shipping country"
                            value={country}
                            onChange={updateCountry}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    name="saveAddress"
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
                                    Use this address for payment details
                                </Typography>
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
