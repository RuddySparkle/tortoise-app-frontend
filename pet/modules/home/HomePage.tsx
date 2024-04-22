'use client';

import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TopBarHomepage from '@components/core/TopBarHomepage';
import Image from 'next/image';
import mockPicture from '@public/image/petHomepage.jpg';
import { Fira_Sans_Condensed } from 'next/font/google';

const fira_sans_condensed = Fira_Sans_Condensed({ weight: ['600'], subsets: ['latin'] });

export default function HomePage() {
    const router = useRouter();

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#F9C067'),
        backgroundColor: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#F79762',
        },
    }));

    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <TopBarHomepage />
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '85%', width: '100vw' }}>
                <Box
                    sx={{
                        width: '56%',
                        backgroundColor: '#F3DDD1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        paddingX: 15,
                    }}
                >
                    <Box sx={{ fontSize: 45, textAlign: 'center' }}>Where fluff meets fun</Box>
                    <Box sx={{ fontSize: 25, textAlign: 'center' }}>
                        PetPal is the ultimate destination for pet bliss. Discover a treasure trove of tail-wagging
                        wonders for your fur-ever friends!
                    </Box>
                    <Box sx={{ backgroundColor: '#FAA943' }}>
                        <ColorButton
                            sx={{
                                paddingX: 2,
                                paddingY: 1,
                                border: '3px solid #472F05',
                                borderRadius: 0,
                                boxShadow: '3px 2px #472F05',
                                fontFamily: fira_sans_condensed.style.fontFamily,
                                fontSize: 20,
                            }}
                            onClick={() => {
                                router.push('/user/login');
                            }}
                        >
                            Register Now!
                        </ColorButton>
                    </Box>
                </Box>
                <Box width="44%">
                    <Image
                        src={mockPicture}
                        alt="Pet Picture"
                        style={{ objectFit: 'cover', height: '100%', maxHeight: 'fit-content' }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
