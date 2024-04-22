import { Box, Typography } from '@mui/material';
import { Fira_Sans_Condensed } from 'next/font/google';
import Image from 'next/image';

const fira_sans_condensed = Fira_Sans_Condensed({ weight: ['600'], subsets: ['latin'] });

export default function TopBarHomepage() {
    return (
        <Box
            sx={{
                height: '15%',
                padding: 3,
                border: '2px solid black',
                boxShadow: 5,
                backgroundColor: '#472f05',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
            }}
        >
            {/* <Typography
                style={{
                    textAlign: 'center',
                    color: 'whitesmoke',
                    fontSize: 40,
                    fontFamily: fira_sans_condensed.style.fontFamily,
                }}
            >
                PetPal
            </Typography> */}
            <Image 
                src={"https://drive.google.com/uc?id=1Htzur4wU7MddA1xVm2jeH2U1UKFpsA2J"}
                alt={'Petpal Logo'}
                fill={true}
                style={{ objectFit: 'contain', padding: "1rem 0" }}
            />
        </Box>
    );
}
