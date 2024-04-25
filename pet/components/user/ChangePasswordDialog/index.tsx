import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import { fira_sans_600, fira_sans_800 } from '@core/theme/theme';
import { Grid, Zoom, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IChangePassword, IChangePasswordParams } from '@services/api/v1/user/type';
import { CustomPinkTextField } from '@core/theme/theme';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useState } from 'react';
import useToastUI from '@core/hooks/useToastUI';
import { CustomDialogProps } from '@components/core/CustomDialog/type';
import { useUpdateUserPassword } from '@services/api/v1/user/useUpdateUserPassword';
import { useRouter } from 'next/navigation';
import useGetSession from '@core/auth/useGetSession';
import useLogout from '@core/auth/useLogout';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Zoom ref={ref} {...props} />;
});

export default function ChangePasswordDialog(props: CustomDialogProps) {
    const { open, setOpen, header, description, cancelText, confirmText } = props;

    const router = useRouter();
    const toastUI = useToastUI();
    const session = useGetSession();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const form = useForm<IChangePassword>();

    const { mutateAsync: mutateUpdateUserPassword } = useUpdateUserPassword({
        onSuccess: () => {
            toastUI.toastSuccess('Password updated');
            useLogout();
            router.push('/user/login');
        },
        onError: (err) => {
            toastUI.toastError(err.message);
        },
    });

    const onSubmit = async (data: IChangePassword) => {
        if (confirmPassword === '' || data.password !== confirmPassword) {
            return toastUI.toastError('Wrong Password Confirmation');
        }
        try {
            await mutateUpdateUserPassword({ user_id: session.userID, payload: data } as IChangePasswordParams);
        } catch (err) {
            toastUI.toastError(err as string);
        }
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
            >
                <DialogTitle
                    sx={{
                        py: 2.5,
                        px: 4,
                        textAlign: 'center',
                        backgroundColor: '#DDB892',
                        fontFamily: fira_sans_800.style.fontFamily,
                        fontSize: 25,
                        color: '#472F05',
                    }}
                >
                    {header}
                </DialogTitle>
                {
                    <DialogContent sx={{ backgroundColor: '#FFF8E8' }}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 30 }}
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12}>
                                    <CustomPinkTextField
                                        {...form.register('old_password')}
                                        name={'old_password'}
                                        label="Old Password"
                                        variant="outlined"
                                        type={showOldPassword ? 'text' : 'password'}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowOldPassword(!showOldPassword)}>
                                                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#F3DDD1',
                                            },
                                        }}
                                        // disabled={}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <CustomPinkTextField
                                        {...form.register('password')}
                                        name={'password'}
                                        label="New Password"
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
                                                backgroundColor: '#F3DDD1',
                                            },
                                        }}
                                        // disabled={}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <CustomPinkTextField
                                        name={'confirm_password'}
                                        label="Confirm New Password"
                                        variant="outlined"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                        }}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    >
                                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#F3DDD1',
                                            },
                                        }}
                                        // disabled={}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                }
                <DialogActions sx={{ backgroundColor: '#FFF8E8', pb: 3, px: 4 }}>
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
                                backgroundColor: '#E18A7A',
                            },
                            '&:hover': {
                                backgroundColor: '#E2725B',
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
                                backgroundColor: '#FAA943',
                            },
                            '&:hover': {
                                backgroundColor: '#F79762',
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
