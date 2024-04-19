import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import { fira_sans_600, fira_sans_800 } from '../../../core/theme/theme';
import { Grid, Zoom, InputAdornment, IconButton, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IChangePassword } from '../../../services/api/v1/user/type';
import { CustomPinkTextField } from '../../../core/theme/theme';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useToastUI from '../../../core/hooks/useToastUI';
import { CustomDialogProps } from '../../core/CustomDialog/type';
import path from 'path';
import { usePathname } from 'next/navigation';

interface ConfirmDeleteInput {
    password: string;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Zoom ref={ref} {...props} />;
});

export default function NewUserDialog(props: CustomDialogProps) {
    const { open, setOpen, header, description, cancelText, confirmText } = props;

    const toastUI = useToastUI();
    const router = useRouter();
    const path = usePathname();

    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<ConfirmDeleteInput>();

    const onSubmit = async () => {
        //mock showing data
        handleClose();
        router.push('/user/account/edit-profile');
    };

    const handleClose = () => {
        setOpen;
    };

    useEffect(() => {
        if(path.includes('edit-profile')){
            console.log('pass')
            setOpen(false)
        }
    }, [path])

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
            >
                <DialogTitle
                    sx={{
                        py: 2.5,
                        px: 4,
                        textAlign: 'center',
                        backgroundColor: '#782222',
                        fontFamily: fira_sans_800.style.fontFamily,
                        fontSize: 25,
                        color: 'whitesmoke',
                    }}
                >
                    {header}
                </DialogTitle>
                {
                    <DialogContent sx={{ backgroundColor: '#FFD2BE' }}>
                        <Typography
                            sx={{
                                fontFamily: fira_sans_600.style.fontFamily,
                                fontSize: 22,
                                color: '#472F05',
                                textAlign: 'center',
                                pt: 4,
                            }}
                        >
                            Please create your profile before using PetPal service.
                        </Typography>
                    </DialogContent>
                }
                <DialogActions sx={{ justifyContent: 'center', backgroundColor: '#FFD2BE', pb: 4, px: 4 }}>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        sx={{
                            '&.MuiButton-root': {
                                border: '2px solid #472F05',
                                borderRadius: 0,
                                boxShadow: '3px 3px #472F05',
                                py: 0.5,
                                px: 2,
                                color: '#472F05',
                                fontSize: 18,
                                fontFamily: fira_sans_600.style.fontFamily,
                                backgroundColor: '#FAA943',
                            },
                            '&:hover': {
                                backgroundColor: '#FB7B43',
                            },
                        }}
                    >
                        {confirmText}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
