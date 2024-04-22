import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import { CustomGreenTextField, fira_sans_600, fira_sans_800 } from '@core/theme/theme';
import { Grid, Zoom, InputAdornment, IconButton, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IChangePassword } from '@services/api/v1/user/type';
import { CustomPinkTextField } from '@core/theme/theme';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useToastUI from '@core/hooks/useToastUI';
import { CustomDialogProps } from '@components/core/CustomDialog/type';
import useDeleteBankAccount from '@services/api/v1/seller/useDeleteBankAccount';
import useGetSession from '@core/auth/useGetSession';
import { ISellerQueryParams } from '@services/api/v1/seller/type';

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

export default function DeleteBankAccountDialog(props: CustomDialogProps) {
    const { open, setOpen, header, description, cancelText, confirmText } = props;

    const toastUI = useToastUI();
    const router = useRouter();
    const session = useGetSession();

    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<ConfirmDeleteInput>();

    const deleteBankAccount = useDeleteBankAccount({
        onSuccess: () => {
            toastUI.toastSuccess('Bank Account Deleted');
        },
        onError: (error) => {
            toastUI.toastError(`Deletion Failed ${error}`);
        },
    });

    const onSubmit = async (data: ConfirmDeleteInput) => {
        deleteBankAccount.mutate({ seller_id: session.userID } as ISellerQueryParams);
        handleClose();
        window.location.reload();
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <DialogContent sx={{ backgroundColor: '#EBEBD3' }}>
                        <Typography
                            sx={{
                                fontFamily: fira_sans_600.style.fontFamily,
                                fontSize: 20,
                                color: '#472F05',
                                textAlign: 'center',
                                py: 3,
                            }}
                        >
                            Please provide your password to confirm delete account.
                        </Typography>

                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                            }}
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12}>
                                    <CustomGreenTextField
                                        {...form.register('password')}
                                        name={'password'}
                                        label="Password"
                                        variant="outlined"
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#A5BE7D',
                                            },
                                        }}
                                        // disabled={}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                }
                <DialogActions sx={{ backgroundColor: '#EBEBD3', pb: 3, px: 4 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            '&.MuiButton-root': {
                                border: '2px solid #472F05',
                                borderRadius: 0,
                                boxShadow: '3px 3px #472F05',
                                width: 90,
                                py: 0.5,
                                mr: 1,
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
                        {cancelText}
                    </Button>

                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        sx={{
                            '&.MuiButton-root': {
                                border: '2px solid #472F05',
                                borderRadius: 0,
                                boxShadow: '3px 3px #472F05',
                                width: 90,
                                py: 0.5,
                                px: 1,
                                color: '#472F05',
                                fontSize: 18,
                                fontFamily: fira_sans_600.style.fontFamily,
                                backgroundColor: '#E18A7A',
                            },
                            '&:hover': {
                                backgroundColor: '#CF5555',
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
