'use client';

import { Box, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function PetAddCard({status}: {status: string}) {
    const [hover, setHover] = useState(false);
    const router = useRouter();

    function onMouseAction(event: React.SyntheticEvent) {
        if (event.type === 'mouseover') {
            setHover(true);
        } else {
            setHover(false);
        }
    }

    function handleClick(event: React.MouseEvent) {

        if (status === 'unverified') {
            return
        }
        router.push(`my-shop/add`);
    }

    return (
        <Box
            style={
                hover
                    ? {
                          backgroundColor: '#F3DDD1',
                          cursor: 'pointer',
                      }
                    : {
                          backgroundColor: '#E4E4E4',
                          cursor: 'default',
                      }
            }
            sx={{ border: '2px solid black', boxShadow: '5px 4px #472F05', width: '100%', height: '100%' }}
            onMouseOver={(event) => onMouseAction(event)}
            onMouseOut={(event) => onMouseAction(event)}
            onClick={(event) => handleClick(event)}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 3,
                    height: '100%',
                }}
            >
                <AddCircleIcon sx={{ color: '#4BAE4F', width: '75%', height: '75%' }} />

                <Box sx={{ textAlign: 'center', fontSize: 20 }}>Create a new Pet</Box>
            </Box>
        </Box>
    );
}
