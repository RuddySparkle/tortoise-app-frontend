import { Box } from '@mui/material';
import Image from 'next/image';
import InteractionPetCard from '@components/pet/InteractionPetCard';
import { PetCardProps } from '@components/pet/PetCatalogue';
import { styled } from '@mui/material';
import useGetUserProfile from '@services/api/v1/user/useGetUserProfile';
import { fira_sans_400, fira_sans_600, fira_sans_800 } from '@core/theme/theme';

export default function PetCard(props: PetCardProps) {
    const { petId, petName, category, seller, price, imgSrc } = props;
    const { data: sellerProfile, isSuccess: sellerProfileSuccess } = useGetUserProfile(seller || '');
    if (!sellerProfileSuccess) {
        return null;
    }

    return (
        <InteractionPetCard petId={petId}>
            <Box sx={{ display: 'block', height: 250, position: 'relative' }}>
                <Image
                    src={imgSrc || '/petpicture'}
                    alt="Pet Picture"
                    fill
                    priority
                    sizes="100% 100%"
                    style={{
                        maxWidth: '-webkit-fill-available',
                        maxHeight: 'fit-content',
                        objectFit: 'cover',
                        minHeight: 'fit-content',
                        boxShadow: '0 4px 4px -2px #472F05',
                    }}
                />
            </Box>
            <div style={{ display: 'block', height: 100, padding: 10, overflowWrap: '-moz-initial' }}>
                <div style={{ textAlign: 'center', fontSize: 23, fontFamily: fira_sans_800.style.fontFamily }}>
                    {petName}
                </div>
                <div>Category: {category}</div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <p
                        style={{
                            display: 'block',
                            width: '55%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textAlign: 'left',
                            fontFamily: fira_sans_600.style.fontFamily,
                        }}
                    >
                        Seller: {sellerProfile?.first_name} {sellerProfile?.last_name}
                    </p>
                    <p
                        style={{
                            display: 'block',
                            width: '45%',
                            textAlign: 'end',
                            fontFamily: fira_sans_600.style.fontFamily,
                        }}
                    >
                        Price: ฿{price}
                    </p>
                </div>
            </div>
        </InteractionPetCard>
    );
}
