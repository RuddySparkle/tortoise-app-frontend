import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, Divider } from '@mui/material';
import { fira_sans_600, fira_sans_800 } from '@core/theme/theme';

export default function Review({
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    paymentMethod,
    cardHolder,
    cardNumber,
    expDate,
    cvv,
    petName,
    petDescription,
    petPrice,
}: {
    firstName: any;
    lastName: any;
    address1: any;
    address2: any;
    city: any;
    state: any;
    zip: any;
    country: any;
    paymentMethod: any;
    cardHolder: any;
    cardNumber: any;
    expDate: any;
    cvv: any;
    petName: any;
    petDescription: any;
    petPrice: any;
}) {
    const name = `${firstName} ${lastName}`;
    const address = [address1, city, state, zip, country].filter((part) => part !== '').join(', ');

    const payments = [
        { name: 'Card type', detail: 'Credit Card' },
        { name: 'Card holder', detail: name },
        { name: 'Card number', detail: 'xxxx-xxxx-xxxx-' + cardNumber.substr(cardNumber.length - 4) },
        { name: 'Expiry date', detail: expDate },
    ];

    const products = [
        {
            name: petName,
            desc: petDescription,
            price: '฿' + petPrice,
        },
        { name: 'Shipping', desc: '', price: 'Free' },
    ];

    return (
        <React.Fragment>
            <Box sx={{ px: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    fontFamily={fira_sans_800.style.fontFamily}
                    color={'#472F05'}
                    textAlign={'center'}
                >
                    Order summary
                </Typography>
                <List disablePadding>
                    {products.map((product) => (
                        <Box>
                            <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                                <ListItemText
                                    color={'#472F05'}
                                    primary={
                                        <Typography
                                            sx={{
                                                fontFamily: fira_sans_600.style.fontFamily,
                                                color: '#472F05',
                                                fontSize: 18,
                                                px: 1,
                                            }}
                                        >
                                            {product.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            sx={{
                                                fontFamily: fira_sans_600.style.fontFamily,
                                                color: '#472F05',
                                                fontSize: 14,
                                                px: 1,
                                            }}
                                        >
                                            {product.desc}
                                        </Typography>
                                    }
                                />
                                <Typography
                                    variant="body1"
                                    fontFamily={fira_sans_600.style.fontFamily}
                                    color={'#472F05'}
                                    px={1}
                                >
                                    {product.price}
                                </Typography>
                            </ListItem>
                            <Divider />
                        </Box>
                    ))}
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: fira_sans_800.style.fontFamily,
                                        color: '#472F05',
                                        px: 1,
                                    }}
                                >
                                    Total
                                </Typography>
                            }
                        />
                        <Typography
                            sx={{
                                fontFamily: fira_sans_800.style.fontFamily,
                                color: '#472F05',
                                fontSize: 22,
                                px: 1,
                            }}
                        >
                            {'฿' + petPrice}
                        </Typography>
                    </ListItem>
                </List>
                <Divider sx={{ border: '1.5px solid #472F05' }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                                mt: 2,
                                fontFamily: fira_sans_800.style.fontFamily,
                                color: '#472F05',
                            }}
                        >
                            Shipping
                        </Typography>
                        <Typography
                            gutterBottom
                            sx={{
                                fontFamily: fira_sans_600.style.fontFamily,
                                color: '#472F05',
                                fontSize: 16,
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            gutterBottom
                            sx={{
                                fontFamily: fira_sans_600.style.fontFamily,
                                color: '#472F05',
                                fontSize: 16,
                            }}
                        >
                            {address}
                        </Typography>
                    </Grid>
                    {paymentMethod === 0 && (
                        <Grid item container direction="column" xs={12} sm={6}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{
                                    fontFamily: fira_sans_800.style.fontFamily,
                                    color: '#472F05',
                                    mt: 2,
                                }}
                            >
                                Payment details
                            </Typography>
                            <Grid container>
                                {payments.map((payment) => (
                                    <React.Fragment key={payment.name}>
                                        <Grid item xs={5}>
                                            <Typography
                                                gutterBottom
                                                sx={{
                                                    fontFamily: fira_sans_800.style.fontFamily,
                                                    color: '#472F05',
                                                }}
                                            >
                                                {payment.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Typography
                                                gutterBottom
                                                sx={{
                                                    fontFamily: fira_sans_600.style.fontFamily,
                                                    color: '#472F05',
                                                }}
                                            >
                                                {payment.detail}
                                            </Typography>
                                        </Grid>
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </React.Fragment>
    );
}
