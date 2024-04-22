'use client';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useParams, useRouter } from 'next/navigation';
import { fira_sans_600, fira_sans_800 } from '../../core/theme/theme';
import { StepIcon } from '@mui/material';
import { ColorButton } from '../../components/core/CustomInput/type';
import { useEffect, useState } from 'react';
import useToastUI from '@core/hooks/useToastUI';
import { IPetQueryParams } from '@services/api/v1/pets/type';
import useGetPetByID from '@services/api/v1/pets/useGetPetByID';
import useCreatePayment from '@services/api/v1/payment/useCreatePayment';

function Copyright() {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
                color: '#472F05',
                fontSize: 16,
                fontFamily: fira_sans_600.style.fontFamily,
            }}
        >
            {'Copyright © PetPal by Tortoise '}
            {/* <Link color="inherit" rel="preload">
                PetPal by Tortoise
            </Link>{' '} */}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];


export default function CheckoutPage() {
    const params = useParams();
    const petParams: IPetQueryParams = {
        petId: params?.petId as string,
    };
    const {
            data: petFullDetail,
            isSuccess: petSuccess,
            isError: petError,
            refetch,
            isRefetching: refetchingEditPage,
        } = useGetPetByID(petParams);

    const petName = petFullDetail?.name;
    const petDescription = petFullDetail?.description;
    const petPrice = petFullDetail?.price.toString();

    const [activeStep, setActiveStep] = React.useState(0);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');

    const updateFirstName = (e: any) => {
        setFirstName(e.target.value);
    };

    const updateLastName = (e: any) => {
        setLastName(e.target.value);
    };

    const updateAddress1 = (e: any) => {
        setAddress1(e.target.value);
    };

    const updateAddress2 = (e: any) => {
        setAddress2(e.target.value);
    };

    const updateCity = (e: any) => {
        setCity(e.target.value);
    };

    const updateState = (e: any) => {
        setState(e.target.value);
    };

    const updateZip = (e: any) => {
        setZip(e.target.value);
    };

    const updateCountry = (e: any) => {
        setCountry(e.target.value);
    };

    const [paymentMethod, setPaymentMethod] = React.useState(0);
    const [cardHolder, setCardHolder] = React.useState('');
    const [cardNumber, setCardNumber] = React.useState('');
    const [expDate, setExpDate] = React.useState('');
    const [cvv, setCvv] = React.useState('');

    const updatePaymentMethod = () => {
        setPaymentMethod(paymentMethod === 0 ? 1 : 0);
    };

    const updateCardHolder = (e: any) => {
        setCardHolder(e.target.value);
    };

    const updateCardNumber = (e: any) => {
        setCardNumber(e.target.value);
    };

    const updateExpDate = (e: any) => {
        setExpDate(e.target.value);
    };

    const updateCvv = (e: any) => {
        setCvv(e.target.value);
    };

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <AddressForm
                            firstName={firstName} updateFirstName={updateFirstName}
                            lastName={lastName} updateLastName={updateLastName}
                            address1={address1} updateAddress1={updateAddress1}
                            address2={address2} updateAddress2={updateAddress2}
                            city={city} updateCity={updateCity}
                            state={state} updateState={updateState}
                            zip={zip} updateZip={updateZip}
                            country={country} updateCountry={updateCountry}
                        />;
            case 1:
                return <PaymentForm
                            paymentMethod={paymentMethod} updatePaymentMethod={updatePaymentMethod}
                            cardHolder={cardHolder} updateCardHolder={updateCardHolder}
                            cardNumber={cardNumber} updateCardNumber={updateCardNumber}
                            expDate={expDate} updateExpDate={updateExpDate}
                            cvv={cvv} updateCvv={updateCvv}
                        />;
            case 2:
                return <Review
                            firstName={firstName} lastName={lastName}
                            address1={address1} address2={address2}
                            city={city} state={state}
                            zip={zip} country={country}
                            paymentMethod={paymentMethod}
                            cardHolder={cardHolder} cardNumber={cardNumber}
                            expDate={expDate} cvv={cvv}
                            petName={petName} petDescription={petDescription} petPrice={petPrice}
                        />;
            default:
                throw new Error('Unknown step');
        }
    }

    const router = useRouter();

    const toastUI = useToastUI();

    const handleNext = () => {
        if (firstName === '' || lastName === '' || address1 === '' || city === '' || zip === '' || country === '') {
            toastUI.toastError('Please fill in all required fields');
            return;
        }
        if (activeStep === 0){
            for(let c of firstName){
                let isAlphabetic = /^[a-zA-Z]+$/.test(c);
                if(!isAlphabetic){
                    toastUI.toastError('Firstname must not contains numbers or special characters');
                    return;
                }
            }
            for(let c of lastName){
                let isAlphabetic = /^[a-zA-Z]+$/.test(c);
                if(!isAlphabetic){
                    toastUI.toastError('Lastname must not contains numbers or special characters');
                    return;
                }
            }
            for(let c of city){
                let isAlphabetic = /^[a-zA-Z\s]+$/.test(c);
                if(!isAlphabetic){
                    toastUI.toastError('City must not contains numbers or special characters');
                    return;
                }
            }
            for(let c of zip){
                let isNumber = /^-?\d*\.?\d+$/.test(c);
                if(!isNumber){
                    toastUI.toastError('Zip code must be numbers');
                    return;
                }
            }
            for(let c of country){
                let isAlphabetic = /^[a-zA-Z\s]+$/.test(c);
                if(!isAlphabetic){
                    toastUI.toastError('Country must not contains numbers or special characters');
                    return;
                }
            }
        }
        if (activeStep === 1 && !paymentMethod && (cardHolder === '' || cardNumber === '' || expDate === '' || cvv === '')) {
            toastUI.toastError('Please fill in all required fields');
            return;
        }
        if(activeStep === 1){
            for(let c of cardHolder){
                let isAlphabetic = /^[a-zA-Z\s]+$/.test(c);
                if(!isAlphabetic){
                    toastUI.toastError('Name on card must not contains numbers or special characters');
                    return;
                }
            }
            for(let c of cardNumber){
                let isNumber = /^-?\d*\.?\d+$/.test(c);
                if(!isNumber){
                    toastUI.toastError('Card numbers must be numbers');
                    return;
                }
            }
            if(cardNumber.length < 13 || cardNumber.length > 19){
                toastUI.toastError('Card numbers must have 13 to 19 digits');
                return;
            }

            let isValidExpiredDate = /^(0[1-9]|1[0-2])\/(0[0-9]|[1-9][0-9])$/.test(expDate);
            if(!isValidExpiredDate){
                toastUI.toastError('Expiry date must be MM/YY format');
                return;
            }

            let isValidCVV = /^\d{3,4}$/.test(cvv);
            if(!isValidCVV){
                toastUI.toastError('CVV must be 3 or 4 digits number');
                return;
            }
        }
        if (activeStep === steps.length - 1) {
            const paymentMethodString = paymentMethod === 0 ? 'CreditCard': 'PromptPay';
            useCreatePayment(petFullDetail, paymentMethodString).then((res) => {
                if (res) {
                    toastUI.toastSuccess('Payment successful!');
                    setActiveStep(activeStep + 1);
                } else {
                    toastUI.toastError('Payment failed');
                    return;
                }
            });
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container component="main" sx={{ mb: 4, maxWidth: { xs: 'sm', md: 'md' } }}>
                <Paper
                    variant="outlined"
                    sx={{
                        my: { xs: 2, md: 3 },
                        p: { xs: 2, md: 3 },
                        border: '3px solid #472F05',
                        borderRadius: 0,
                        boxShadow: '6px 6px #472F05',
                        backgroundColor: '#FFF8E8',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h4"
                        align="center"
                        sx={{ overflow: 'hidden', fontFamily: fira_sans_800.style.fontFamily, color: '#472F05' }}
                    >
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, overflow: 'hidden' }}>
                        {steps.map((label) => (
                            <Step
                                key={label}
                                sx={{
                                    '& .MuiStepLabel-root .Mui-completed': {
                                        color: '#472F05',
                                    },
                                    '& .MuiStepLabel-root .Mui-active ': {
                                        color: '#472F05', // circle color (ACTIVE)
                                    },
                                    '& .MuiStepLabel-root .MuiStepIcon-text': {
                                        fontFamily: fira_sans_800.style.fontFamily, // circle's number
                                        fontSize: 15,
                                    },
                                }}
                            >
                                {/* <StepIcon></StepIcon> */}
                                <StepLabel>
                                    <Typography sx={{ fontFamily: fira_sans_800.style.fontFamily, color: '#472F05' }}>
                                        {label}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                    fontFamily: fira_sans_800.style.fontFamily,
                                    color: '#472F05',
                                    textAlign: 'center',
                                    pb: 2,
                                }}
                            >
                                Thank you for your order!
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontFamily: fira_sans_600.style.fontFamily,
                                    color: '#472F05',
                                    textAlign: 'center',
                                    px: 2,
                                }}
                            >
                                Your order number is #2001539. We have emailed your order confirmation, and will send
                                you an update when your order has shipped.
                            </Typography>
                            <Box sx={{ py: '16px', textAlign: 'center' }}>
                                <Button
                                    onClick={() => {
                                        router.push('/user/transaction-history');
                                    }}
                                    sx={{
                                        px: 3,
                                        py: 1,
                                        '&.MuiButton-root': {
                                            border: '2px solid #472F05',
                                            boxShadow: '3px 3px #472F05',
                                            color: '#472F05',
                                            borderRadius: 0,
                                            backgroundColor: '#FAA943',
                                        },
                                        '&:hover': {
                                            backgroundColor: '#F79762',
                                        },
                                    }}
                                >
                                    <Typography fontFamily={fira_sans_600.style.fontFamily}>
                                        Track Your Order Here!
                                    </Typography>
                                </Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', overflow: 'hidden', mt: 3, mx: 2 }}>
                                {activeStep !== 0 && (
                                    <Button
                                        onClick={handleBack}
                                        sx={{
                                            '&.MuiButton-root': {
                                                border: '2px solid #472F05',
                                                boxShadow: '3px 3px #472F05',
                                                color: '#472F05',
                                                borderRadius: 0,
                                                backgroundColor: '#E18A7A',
                                                px: 2,
                                                mr: 3,
                                                mb: 3,
                                            },
                                            '&:hover': {
                                                backgroundColor: '#E2725B',
                                            },
                                        }}
                                    >
                                        <Typography fontFamily={fira_sans_600.style.fontFamily}>Back</Typography>
                                    </Button>
                                )}
                                <Button
                                    onClick={handleNext}
                                    sx={{
                                        '&.MuiButton-root': {
                                            border: '2px solid #472F05',
                                            boxShadow: '3px 3px #472F05',
                                            color: '#472F05',
                                            borderRadius: 0,
                                            backgroundColor: '#FAA943',
                                            px: 2,
                                            mr: 3,
                                            mb: 3,
                                        },
                                        '&:hover': {
                                            backgroundColor: '#F79762',
                                        },
                                    }}
                                >
                                    <Typography fontFamily={fira_sans_600.style.fontFamily}>
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Typography>
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </React.Fragment>
    );
}
