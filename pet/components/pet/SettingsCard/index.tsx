'use client';

import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dayjs } from 'dayjs';
import { IPetDetail } from '../../../services/api/v1/pets/type';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Fira_Sans_Condensed } from 'next/font/google';
import { ButtonProps, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import useGetUserProfile from '@services/api/v1/user/useGetUserProfile';
import { fira_sans_800 } from '@core/theme/theme';
import SellerShopBriefCard from '@components/user/SellerShopBriefCard';
import SellerProfileCard from '@components/user/SellerProfileCard';
import useGetSession from '@core/auth/useGetSession';

const fira_sans_600 = Fira_Sans_Condensed({ weight: ['600'], subsets: ['latin'] });

const theme = createTheme({
    typography: {
        fontFamily: ['Arial', 'sans-serif'].join(','),
    },
});

export default function SettingsCard(props: IPetDetail) {

    const session = useGetSession()

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#F9C067'),
        '&:hover': {
            backgroundColor: '#F79762',
        },
    }));

    const router = useRouter();

    const rows: GridRowsProp = [
        { id: 1, col1: 'Sex:', col2: props.sex === 'F' ? 'Female' : 'Male' },
        { id: 2, col1: 'Weight:', col2: props.weight + ' kg' },
        { id: 3, col1: 'Age:', col2: `${props.age} year` },
        { id: 4, col1: 'Category:', col2: props.category },
        { id: 5, col1: 'Species:', col2: props.species },
        { id: 6, col1: 'Behavior:', col2: props.behavior },
    ];

    const columns: GridColDef[] = [
        { field: 'col1', headerName: 'Column 1', width: 130 },
        { field: 'col2', headerName: 'Column 2', flex: 1 },
    ];

    return (
        
        <Box sx={{ height: 'auto', width: 'auto', margin: 1, mx: 1 }}>
            <Box sx={{ boxShadow: '3px 3px #472F05' }}>
                <Box
                    sx={{
                        height: 'auto',
                        paddingLeft: 3,
                        paddingY: 1,
                        fontSize: 30,
                        backgroundColor: '#FAA943',
                        border: '2px solid #472F05',
                    }}
                >
                    {props.name}
                </Box>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    hideFooter={true}
                    columnHeaderHeight={0}
                    rowHeight={45}
                    sx={{
                        border: '2px solid #472F05',
                        borderRadius: 0,
                        fontFamily: fira_sans_600.style.fontFamily,
                        fontSize: 18,
                        '& .MuiDataGrid-cell': {
                            paddingLeft: 3,
                            backgroundColor: '#FEF1DA'
                        },
                    }}
                />
                <Box 
                    sx={{ 
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: 'auto', 
                        height: 'auto',
                        border: '2px solid #472F05',
                        borderTop: 0,
                        backgroundColor: '#F3C894'
                    }}
                >
                   
                </Box>
            </Box>
            <Box
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    marginTop: 4,
                    py: 2, px: 2,
                    border: '2px solid #472F05',
                    borderRadius: 1,
                    boxShadow: '3px 3px #472F05',
                    backgroundColor: '#FEF1DA'
                }}
            >
                <Box 
                    sx={{ 
                        py: 1, px: 1,
                        // border: '2px solid #472F05',
                        // borderRadius: 1,
                        // boxShadow: '2px 2px #472F05',
                        // backgroundColor: '#FCD082'

                    }}
                >
                    <Typography
                        fontFamily={fira_sans_600.style.fontFamily}
                        fontSize={25}
                    >
                        Price: ฿{props.price}
                    </Typography>
                </Box>
                {
                    session.role == 'seller' ? null :
                    <Box sx={{ width: 'auto', height: 'auto', }}>
                        <Button
                            onClick={() => {
                                router.push(`${props.id}/checkout`);
                            }}
                            sx={{
                                '&.MuiButton-root': {
                                    border: '2px solid #472F05',
                                    boxShadow: '3px 3px #472F05',
                                    color: '#472F05',
                                    borderRadius: 0,
                                    backgroundColor: '#FAA943',
                                    px: 2,
                                    py: 1,
                                },
                                '&:hover': {
                                    backgroundColor: '#F79762',
                                },
                            }}
                        >
                            <Typography
                                fontFamily={fira_sans_800.style.fontFamily}
                                fontSize={18}
                                color={'#472F05'}
                            >
                                Buy Now!
                            </Typography>
                        </Button>
                    </Box>
                }
                
            </Box>
            
        </Box>

        //         {/* Medical Records */}
        //         <Typography variant="body1" gutterBottom style={{ marginTop: '20px', fontWeight: 'bold' }}>
        //             Medical Records:
        //         </Typography>
        //         {/* {props.medical_record ? ( */}
        //         {false ? (
        //             props.medical_records.map((record, index) => (
        //                 <Paper key={index} sx={{ p: 2, marginBottom: 2 }}>
        //                     <Typography variant="body1" gutterBottom>
        //                         Medical ID: {record.medical_id}
        //                     </Typography>
        //                     <Typography variant="body1" gutterBottom>
        //                         Date: {record.medical_date}
        //                     </Typography>
        //                     <Typography variant="body1">Description: {record.description}</Typography>
        //                 </Paper>
        //             ))
        //         ) : (
        //             <Typography>No Medical Record</Typography>
        //         )}
        //     </CardContent>
        // </Card>
    );
}
