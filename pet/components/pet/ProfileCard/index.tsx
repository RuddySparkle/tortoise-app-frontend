// IMPORTS
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Badge from '@mui/material/Badge';
import useGetPetByID from '@services/api/v1/pets/useGetPetByID';
import { Fira_Sans_Condensed } from 'next/font/google';

// STYLES
const fira_sans_600 = Fira_Sans_Condensed({ weight: ['600'], subsets: ['latin'] });

const styles = {
    details: {
        padding: '1rem',
        borderTop: '1px solid #e1e1e1',
    },
    value: {
        padding: '1rem 2rem',
        borderTop: '1px solid #e1e1e1',
        color: '#899499',
    },
};

//APP
export default function ProfileCard({ petImage }: { petImage: string }) {
    return (
        <Card
            variant="outlined"
            style={{
                height: 350,
                width: 400,
                margin: 10,
                boxShadow: '8px 8px #472F05',
                backgroundColor: '#F3DDD1',
                borderRadius: 0,
                border: '2px solid #472F05',
                position: 'relative',
            }}
        >
            <Image
                src={petImage}
                alt="Pet Picture"
                fill={true}
                style={{
                    objectFit: 'cover',
                }}
            />
        </Card>
    );
}
