'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import useGetSession from '../../core/auth/useGetSession';
import useGetUserProfile from '../../services/api/v1/user/useGetUserProfile';
import { CustomTextField } from '../../components/core/CustomInput/type';
import { Address, IUserDetail, IUserUpdateParams, IUserUpdatePayload } from '../../services/api/v1/user/type';
import { useForm } from 'react-hook-form';
import { fira_sans_600, fira_sans_800 } from '../../core/theme/theme';
import { ColorButton } from '../../components/core/CustomInput/type';
import { useUpdateUserProfile } from '@services/api/v1/user/useUpdateUserProfile';
import useToastUI from '@core/hooks/useToastUI';
import ImageUploader from '../../components/core/ImageDropbox';

const SEX_CHOICES = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
];

export default function EditUserProfilePage() {
    const router = useRouter();
    const session = useGetSession();
    const toastUI = useToastUI();
    const { data: userProfile, isSuccess: userProfileSuccess } = useGetUserProfile(session.userID || '');

    const form = useForm<IUserUpdatePayload>();

    const [images, setImages] = useState<File[]>([]);
    const [base64Img, setBase64Img] = useState('');

    // useEffect(() => {
    //     form.setValue('first_name', form.getValues().first_name || userProfile.first_name);
    //     form.setValue('last_name', form.getValues().last_name || userProfile.last_name);
    //     form.setValue('phoneNumber', form.getValues().phoneNumber || userProfile.phoneNumber);
    //     form.setValue('gender', form.getValues().gender || userProfile.gender);
    //     form.setValue('address.houseNumber', form.getValues().address.houseNumber || userProfile.address.houseNumber);
    //     form.setValue('address.building', form.getValues().address.building || userProfile.address.building);
    //     form.setValue('address.street', form.getValues().address.street || userProfile.address.street);
    //     form.setValue('address.subdistrict', form.getValues().address.subdistrict || userProfile.address.subdistrict);
    //     form.setValue('address.district', form.getValues().address.district || userProfile.address.district);
    //     form.setValue('address.province', form.getValues().address.province || userProfile.address.province);
    //     form.setValue('address.postalCode', form.getValues().address.postalCode || userProfile.address.postalCode);
    //     // form.setValue('first_name', form.getValues().first_name || userProfile.first_name);
    // }, [form]);

    const { mutateAsync: mutateUpdateUserProfile } = useUpdateUserProfile({
        onSuccess: () => {
            toastUI.toastSuccess('Profile updated');
            router.push('/user/account');
        },
        onError: (err) => {
            toastUI.toastError(err.message);
        },
    });

    const onSubmit = async (data: IUserUpdatePayload) => {
        let base64String = '';
        let reader = new FileReader();

        reader.onload = function () {
            base64String = String(reader.result);
            setBase64Img(base64String);
        };
        if (images.at(0)) {
            reader.readAsDataURL(images[0]);
        }

        if (base64Img == '' && images[0] !== undefined) {
            return toastUI.toastWarning('Please wait for the image to upload.');
        }
        if (base64Img !== '') {
            data.image = base64Img;
        }

        try {
            console.log(data);
            await mutateUpdateUserProfile({ user_id: session.userID, payload: data } as IUserUpdateParams);
        } catch (err) {
            console.log(err);
        }
    };

    if (!userProfileSuccess) {
        return null;
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <Typography
                fontFamily={fira_sans_800.style.fontFamily}
                fontSize={30}
                color={'#472F05'}
                textAlign={'center'}
                mt={4}
            >
                Update your Profile HERE!
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    m: 5,
                    py: 0,
                    px: 3,
                    border: '2px solid #472F05',
                    borderRadius: 2,
                    boxShadow: '3px 3px #472F05',
                    backgroundColor: '#DDB892',
                }}
            >
                <Box
                    sx={{
                        fontFamily: fira_sans_600.style.fontFamily,
                        width: 450,
                        paddingLeft: 1,
                        paddingRight: 3,
                        fontSize: 18,
                    }}
                >
                    Upload your Profile Image:
                </Box>
                <ImageUploader images={images} setImages={setImages} {...form.register('image')} />
            </Box>
            <Box
                sx={{
                    m: 5,
                    p: 5,
                    border: '3px solid #472F05',
                    boxShadow: '7px 7px #472F05',
                    borderRadius: 2,
                    bgcolor: '#FDE5BA',
                }}
            >
                <Box
                    sx={{
                        p: 3,
                        border: '2px solid #472F05',
                        borderRadius: 1,
                        boxShadow: '4px 4px #472F05',
                        bgcolor: '#FFF8E8',
                    }}
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                {...form.register('first_name')}
                                name={'first_name'}
                                label="First Name"
                                variant="outlined"
                                defaultValue={userProfile.first_name}
                                type={'text'}
                                fullWidth
                                // disabled={}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                {...form.register('last_name')}
                                name={'last_name'}
                                label="Last Name"
                                variant="outlined"
                                defaultValue={userProfile.last_name}
                                type={'text'}
                                fullWidth
                                // disabled={}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                {...form.register('gender')}
                                select
                                fullWidth
                                label="Gender"
                                defaultValue={userProfile.gender}
                            >
                                {SEX_CHOICES.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                        sx={{
                                            fontFamily: fira_sans_600.style.fontFamily,
                                            '&:hover': { backgroundColor: '#F3DDD1' },
                                            '&:focus': { backgroundColor: 'rgb(272, 174, 133) !important' },
                                        }}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                            {/* <CustomTextField
                                {...form.register('gender')}
                                name={'gender'}
                                label="Gender"
                                variant="outlined"
                                defaultValue={userProfile.gender}
                                type={'text'}
                                fullWidth
                                // disabled={}
                            /> */}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                {...form.register('phoneNumber')}
                                name={'phoneNumber'}
                                label="Tel"
                                variant="outlined"
                                defaultValue={userProfile.phoneNumber}
                                type={'text'}
                                fullWidth
                                // disabled={}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Typography fontFamily={fira_sans_800.style.fontFamily} pt={3} fontSize={23} color={'#472F05'}>
                        Address:
                    </Typography>
                    <Box
                        sx={{
                            p: 3,
                            border: '2px solid #472F05',
                            borderRadius: 1,
                            boxShadow: '4px 4px #472F05',
                            bgcolor: '#FFF8E8',
                        }}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={2.5}>
                                <CustomTextField
                                    {...form.register('address.houseNumber')}
                                    name={'address.houseNumber'}
                                    label="House Number"
                                    variant="outlined"
                                    defaultValue={userProfile.address.houseNumber}
                                    type={'text'}
                                    fullWidth
                                    // disabled={}
                                />
                            </Grid>
                            <Grid item xs={12} md={4.5}>
                                <CustomTextField
                                    {...form.register('address.building')}
                                    name={'address.building'}
                                    label="Building"
                                    variant="outlined"
                                    defaultValue={userProfile.address.building}
                                    type={'text'}
                                    fullWidth
                                    // disabled={}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <CustomTextField
                                    {...form.register('address.street')}
                                    name={'address.street'}
                                    label="Street"
                                    variant="outlined"
                                    defaultValue={userProfile.address.street}
                                    type={'text'}
                                    fullWidth
                                    // disabled={}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomTextField
                                    {...form.register('address.subdistrict')}
                                    name={'address.subdistrict'}
                                    label="Sub-District"
                                    variant="outlined"
                                    defaultValue={userProfile.address.subdistrict}
                                    type={'text'}
                                    fullWidth
                                    // disabled={}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomTextField
                                    {...form.register('address.district')}
                                    name={'address.district'}
                                    label="District"
                                    variant="outlined"
                                    defaultValue={userProfile.address.district}
                                    type={'text'}
                                    fullWidth
                                    // disabled={}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomTextField
                                    {...form.register('address.province')}
                                    name={'address.province'}
                                    label="Province"
                                    variant="outlined"
                                    defaultValue={userProfile.address.province}
                                    type={'text'}
                                    fullWidth
                                    // disabled={}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomTextField
                                    {...form.register('address.postalCode')}
                                    name={'address.postalCode'}
                                    label="Postal Code"
                                    variant="outlined"
                                    defaultValue={userProfile.address.postalCode}
                                    type={'text'}
                                    fullWidth
                                    // disabled={}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                    <ColorButton
                        sx={{
                            mt: 5,
                            px: 3,
                            border: '2px solid #472F05',
                            borderRadius: 0,
                            boxShadow: '3px 2px #472F05',
                            fontFamily: fira_sans_600.style.fontFamily,
                            fontSize: 18,
                            textAlign: 'center',
                            bgcolor: '#FAA943',
                        }}
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        Update Profile!
                    </ColorButton>
                </Box>
            </Box>
        </form>
    );
}
