'use client';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SettingsCard from '@components/pet/SettingsCard';
import { Box, Button, IconButton, Typography } from '@mui/material';
import useGetPetByID from '@services/api/v1/pets/useGetPetByID';
import { useParams, useRouter } from 'next/navigation';
import { IPetDetail, IPetQueryParams, IPetUpdateParams, IPetUpdatePayload } from '@services/api/v1/pets/type';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '@components/core/ConfirmDialog';
import ProfileCard from '@components/pet/ProfileCard';
import useDeletePet from '@services/api/v1/pets/useDeletePet';
import PetEditCard from '@components/pet/PetEditCard';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { useUpdatePet } from '@services/api/v1/pets/useUpdatePet';
import { fira_sans_600, fira_sans_800 } from '@core/theme/theme';
import useToastUI from '@core/hooks/useToastUI';
import ImageUploader from '@components/core/ImageDropbox';

export default function EditPetForm() {
    const toastUI = useToastUI();
    const params = useParams();
    const router = useRouter();
    const [editMode, setEditMode] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [base64Img, setBase64Img] = useState('');
    const form = useForm<IPetUpdatePayload>();
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

    const deletePet = useDeletePet({
        onSuccess: () => {
            router.push('/user/my-shop');
        },
    });

    const handleDelete = () => {
        deletePet.mutate(petParams);
    };

    const { mutateAsync: mutateUpdatePet } = useUpdatePet({
        onSuccess: () => {
            refetch();
        },
    });

    const handleSubmitEdit = async (data: IPetUpdatePayload) => {
        const updateData: IPetUpdatePayload = {
            ...({
                name: petFullDetail?.name,
                age: petFullDetail?.age,
                price: petFullDetail?.price,
                is_sold: petFullDetail?.is_sold,
                description: petFullDetail?.description,
                weight: petFullDetail?.weight,
                sex: petFullDetail?.sex,
                species: petFullDetail?.species,
                category: petFullDetail?.category,
                behavior: petFullDetail?.behavior,
                medical_records: petFullDetail?.medical_records,
            } as IPetUpdatePayload),
            ...data,
        };
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
            updateData.media = base64Img;
        }
        console.log(updateData);
        try {
            await mutateUpdatePet({ petId: petParams.petId, payload: updateData } as IPetUpdateParams);
            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    if (!petSuccess || refetchingEditPage) return null;

    return (
        <form onSubmit={form.handleSubmit(handleSubmitEdit)} noValidate>
            {petFullDetail.is_sold ? (
                <Typography
                    sx={{
                        mt: 4,
                        fontFamily: fira_sans_800.style.fontFamily,
                        textAlign: 'center',
                        fontSize: 30,
                        color: '#472F05',
                    }}
                >
                    This pet has been sold!
                </Typography>
            ) : (
                <Typography
                    sx={{
                        mt: 4,
                        fontFamily: fira_sans_800.style.fontFamily,
                        textAlign: 'center',
                        fontSize: 30,
                        color: '#472F05',
                    }}
                >
                    Edit your Pet Information Here
                </Typography>
            )}

            <Box sx={{ alignSelf: 'center', marginTop: 1 }}>
                <ConfirmDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    header={`Confirm Delete ${petFullDetail?.name} 🥺?`}
                    cancelText="Cancel"
                    confirmText="Delete"
                    handleConfirm={handleDelete}
                />
                {petFullDetail.is_sold ? null : (
                    <Box sx={{ px: 7, textAlign: 'end', float: 'inline-end', display: 'flex', flexDirection: 'row' }}>
                        <Button
                            sx={{
                                display: editMode ? 'none' : 'flex',
                                // backgroundColor: 'whitesmoke',
                                '&.MuiButton-root': {
                                    border: '2px solid #472F05',
                                    boxShadow: '3px 3px #472F05',
                                    color: '#472F05',
                                    borderRadius: 0,
                                    backgroundColor: '#FAA943',
                                    px: 2,
                                },
                                '&:hover': {
                                    backgroundColor: '#F79762',
                                },
                            }}
                            onClick={() => {
                                setEditMode(true);
                            }}
                        >
                            {<EditIcon />}
                            <Typography
                                sx={{ fontFamily: fira_sans_600.style.fontFamily, fontSize: 18 }}
                            >{`Edit`}</Typography>
                        </Button>
                        <Button
                            type="submit"
                            sx={{
                                display: editMode ? 'flex' : 'none',
                                '&.MuiButton-root': {
                                    border: '2px solid #472F05',
                                    boxShadow: '3px 3px #472F05',
                                    color: '#472F05',
                                    borderRadius: 0,
                                    backgroundColor: '#FAA943',
                                    px: 2,
                                },
                                '&:hover': {
                                    backgroundColor: '#F79762',
                                },
                            }}
                            onClick={() => {
                                setEditMode(false);
                            }}
                        >
                            {<SaveIcon />}
                            <Typography sx={{ fontFamily: fira_sans_600.style.fontFamily }}>{`Save`}</Typography>
                        </Button>
                        <Button
                            onClick={() => {
                                setOpenDialog(true);
                            }}
                            sx={{
                                '&.MuiButton-root': {
                                    border: '2px solid #472F05',
                                    boxShadow: '3px 3px #472F05',
                                    color: '#472F05',
                                    borderRadius: 0,
                                    backgroundColor: '#E18A7A',
                                    px: 2,
                                    mx: 2,
                                },
                                '&:hover': {
                                    backgroundColor: '#E2725B',
                                },
                            }}
                        >
                            <DeleteIcon />
                            <Typography
                                sx={{ fontFamily: fira_sans_600.style.fontFamily, fontSize: 18 }}
                            >{`Delete`}</Typography>
                        </Button>
                    </Box>
                )}
                <Grid container direction="column" sx={{ overflowX: 'hidden', flexWrap: 'nowrap', mb: 3 }}>
                    <Grid
                        container
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={7}
                        sx={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            top: '15vh',
                            px: { xs: 5, md: 7 },
                        }}
                    >
                        <Grid
                            item
                            md={5}
                            sx={{ alignSelf: { xs: 'center', md: 'normal' }, justifySelf: 'center', mt: 3 }}
                        >
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                border={'2px solid #472F05'}
                                borderRadius={1}
                                boxShadow={'4px 4px #472F05'}
                                p={3}
                                pb={3}
                                mb={3}
                                sx={{
                                    backgroundColor: '#FDE5BA',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ProfileCard petImage={petFullDetail.media} />
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item md={7}>
                            <PetEditCard
                                form={form}
                                id={petFullDetail.id}
                                media={petFullDetail.media}
                                seller_id={petFullDetail.seller_id}
                                age={petFullDetail.age}
                                behavior={petFullDetail.behavior}
                                category={petFullDetail.category}
                                description={petFullDetail.description}
                                is_sold={petFullDetail.is_sold}
                                medical_records={petFullDetail.medical_records}
                                name={petFullDetail.name}
                                price={petFullDetail.price}
                                sex={petFullDetail.sex}
                                species={petFullDetail.species}
                                weight={petFullDetail.weight}
                                editMode={editMode}
                            />
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
                                <ImageUploader images={images} setImages={setImages} {...form.register('media')} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}
