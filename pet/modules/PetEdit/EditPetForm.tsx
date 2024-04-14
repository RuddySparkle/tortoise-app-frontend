'use client';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SettingsCard from '../../components/pet/SettingsCard';
import { Box, Button, IconButton, Typography } from '@mui/material';
import useGetPetByID from '../../services/api/v1/pets/useGetPetByID';
import { useParams, useRouter } from 'next/navigation';
import { IPetDetail, IPetQueryParams, IPetUpdateParams, IPetUpdatePayload } from '../../services/api/v1/pets/type';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../../components/core/ConfirmDialog';
import ProfileCard from '../../components/pet/ProfileCard';
import useDeletePet from '../../services/api/v1/pets/useDeletePet';
import PetEditCard from '../../components/pet/PetEditCard';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { useUpdatePet } from '../../services/api/v1/pets/useUpdatePet';
import { fira_sans_600 } from '../../core/theme/theme';

export default function EditPetForm() {
    const params = useParams();
    const router = useRouter();
    const [editMode, setEditMode] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
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
        console.log(updateData)
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
            <Typography sx={{ mt: 4, fontFamily: fira_sans_600.style.fontFamily, textAlign: 'center', fontSize: 30 }}>
                Edit your Pet Information Here
            </Typography>
            <Box sx={{ alignSelf: 'center', marginTop: 1 }}>
                <ConfirmDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    header={`Confirm Delete ${petFullDetail?.name} 🥺?`}
                    cancelText="Cancel"
                    confirmText="Delete"
                    handleConfirm={handleDelete}
                />
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
                            <ProfileCard petImage={petFullDetail.media} />
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
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}
