import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IPetDetail, IPetUpdatePayload } from '@services/api/v1/pets/type';
import { Box, TextField } from '@mui/material';
import { fira_sans_600 } from '@core/theme/theme';
import { CustomTextField } from '@components/core/CustomInput/type';
import SelectField, { SelectFieldChoice } from '@components/core/SelectField';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import useGetPetCategory, { IPetCategoryMasterData } from '@services/api/master/useGetPetCategory';

interface PetEditCardProps extends IPetDetail {
    editMode: boolean;
    form: UseFormReturn<IPetUpdatePayload, any, any>;
}

const DEMO_CHOICES = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
];

export default function PetEditCard(props: PetEditCardProps) {
    const { form } = props;
    const watcher = useWatch({ name: 'category', control: form.control });
    const { data: petCategory, isSuccess: petCategorySuccess } = useGetPetCategory();
    const petCategoryList = (petCategory || []) as IPetCategoryMasterData[];
    const CATEGORY_CHOICES = (petCategoryList || []).map((category) => ({
        label: category.category.replace(/^\w/, (first) => first.toUpperCase()),
        value: category.category,
    })) as SelectFieldChoice[];
    const SPECIES_CHOICES = (
        petCategoryList.find((eachCategory) => eachCategory.category === watcher)?.species || []
    ).map((eachSpecies) => ({ label: eachSpecies, value: eachSpecies })) as SelectFieldChoice[];

    const columnsHeader: GridColDef[] = [
        { field: 'topic', headerName: 'Topic', flex: 2 },
        {
            field: 'value',
            headerName: 'Value',
            flex: 5,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        {(params.row?.type === 'text' || params.row?.type === 'number') && (
                            <CustomTextField
                                {...form.register(params.row?.name)}
                                fullWidth
                                type={params.row?.type}
                                name={params.row?.name}
                                defaultValue={params.value}
                                disabled={!props.editMode}
                                multiline
                                sx={{
                                    my: 0.5,
                                    mx: 1,
                                    border: '1.5px solid #472F05',
                                    boxShadow: '3px 3px #472F05',
                                    '&:hover': {
                                        backgroundColor: '#E5CB9A',
                                    },
                                }}
                            />
                        )}
                        {params?.row?.type === 'select' && (
                            <SelectField
                                {...form.register(params.row?.name)}
                                name={params.row?.name}
                                defaultValue={params.value}
                                choices={params.row?.choices?.length ? params.row?.choices : []}
                                disabled={!props.editMode}
                                setFormValue={(value) => {
                                    form.setValue(params.row?.name, value);
                                }}
                            ></SelectField>
                        )}
                    </>
                );
            },
            sortable: false,
        },
    ];
    const petDetail = [
        { id: 1, name: 'name', topic: 'Name', value: props.name, type: 'text' },
        { id: 2, name: 'age', topic: 'Age', value: props.age, type: 'number' },
        { id: 3, name: 'sex', topic: 'Gender', value: props.sex, type: 'select', choices: DEMO_CHOICES },
        {
            id: 4,
            name: 'category',
            topic: 'Category',
            value: props.category,
            type: 'select',
            choices: CATEGORY_CHOICES,
        },
        { id: 5, name: 'species', topic: 'Species', value: props.species, type: 'select', choices: SPECIES_CHOICES },
        { id: 6, name: 'weight', topic: 'Weight', value: props.weight, type: 'number' },
        { id: 7, name: 'behavior', topic: 'Behavior', value: props.behavior, type: 'text' },
        { id: 8, name: 'price', topic: 'Price', value: props.price, type: 'number' },
        { id: 9, name: 'description', topic: 'Description', value: props.description, type: 'text' },
    ];

    useEffect(() => {
        form.setValue('name', form.getValues().name || props.name);
        form.setValue('age', Number(form.getValues().age || props.age));
        form.setValue('sex', form.getValues().sex || props.sex);
        form.setValue('category', form.getValues().category || props.category);
        form.setValue('species', form.getValues().species || props.species);
        form.setValue('weight', Number(form.getValues().weight || props.weight));
        form.setValue('behavior', form.getValues().behavior || props.behavior);
        form.setValue('price', Number(form.getValues().price || props.price));
        form.setValue('description', form.getValues().description || props.description);
    }, [petDetail]);

    return (
        <Box sx={{ height: 'auto', width: 'auto', margin: 1, boxShadow: '6px 6px #472F05' }}>
            <DataGrid
                getRowHeight={() => 'auto'}
                columns={columnsHeader}
                rows={petDetail}
                disableDensitySelector
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableVirtualization
                disableRowSelectionOnClick
                hideFooter
                hideFooterPagination
                hideFooterSelectedRowCount
                sx={{
                    border: '3px solid #472F05',
                    borderRadius: 0,
                    fontFamily: fira_sans_600.style.fontFamily,
                    fontSize: 18,
                    '& .MuiDataGrid-cell': {
                        padding: '8px !important',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#FFF8E8',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        fontSize: 22,
                        color: 'whitesmoke',
                        backgroundColor: '#472F05',
                        borderRadius: 0,
                    },
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-columnHeader:focus': {
                        outline: 'none !important',
                    },
                    '& .MuiDataGrid-columnHeader:focus-within': {
                        outline: 'none !important',
                    },
                }}
            />
        </Box>
    );
}
