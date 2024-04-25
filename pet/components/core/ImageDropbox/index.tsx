import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { Grid, Typography } from '@mui/material';
import { ColorButton } from '@components/core/CustomInput/type';
import { fira_sans_600 } from '@core/theme/theme';

type Props = {
    images: File[];
    setImages: (arg: File[]) => void;
};

const FileUploader = (props: Props) => {
    const maxImagesUpload = 1;
    const inputId = Math.random().toString(32).substring(2);

    const handleOnAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files: File[] = [];

        for (const file of e.target.files) {
            files.push(file);
        }

        props.setImages([...props.images, ...files]);
        e.target.value = '';
    };

    const handleOnRemoveImage = (index: number) => {
        const newImages = [...props.images];
        newImages.splice(index, 1);
        props.setImages(newImages);
    };

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 12, md: 12 }}>
                {props.images.map((image, i) => (
                    <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        key={i}
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <IconButton
                            aria-label="delete image"
                            style={{
                                position: 'revert',
                                top: 0,
                                right: 0,
                                color: '#AAA',
                            }}
                            onClick={() => handleOnRemoveImage(i)}
                        >
                            <CancelIcon />
                        </IconButton>
                        <img
                            src={URL.createObjectURL(image)}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                aspectRatio: '1 / 1',
                            }}
                            alt=""
                        />
                    </Grid>
                ))}
            </Grid>
            <label htmlFor={inputId}>
                {props.images.length >= maxImagesUpload ? null : (
                    <ColorButton
                        disabled={props.images.length >= maxImagesUpload}
                        component="span"
                        sx={{
                            my: 4,
                            width: 130,
                            border: '2px solid #472F05',
                            borderRadius: 0,
                            boxShadow: '2px 2px #472F05',
                        }}
                    >
                        <Typography sx={{ fontFamily: fira_sans_600.style.fontFamily, color: '#472F05' }}>
                            Upload Files
                        </Typography>
                    </ColorButton>
                )}

                {/* <Button
                    variant="contained"
                    disabled={props.images.length >= maxImagesUpload}
                    component="span"
                    sx={{ my: 4, width: 140, }}
                >
                    Upload Files
                </Button> */}
                <input
                    id={inputId}
                    type="file"
                    multiple
                    accept="image/*,.png,.jpg,.jpeg,.gif"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)}
                    style={{ display: 'none' }}
                />
            </label>
        </>
    );
};

export default FileUploader;
