import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { fira_sans_600 } from '@core/theme/theme';
import { CustomDialogProps } from '@components/core/CustomDialog/type';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog(props: CustomDialogProps) {
    const { open, setOpen, header, description, cancelText, confirmText, handleConfirm } = props;

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
                        py: 3,
                        px: 4,
                        backgroundColor: '#FFF8E8',
                        fontFamily: fira_sans_600.style.fontFamily,
                        color: '#472F05',
                    }}
                >
                    {header}
                </DialogTitle>
                {description && (
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">{description}</DialogContentText>
                    </DialogContent>
                )}
                <DialogActions sx={{ backgroundColor: '#E5CB9A', p: 1.5 }}>
                    {cancelText && (
                        <Button
                            onClick={handleClose}
                            sx={{
                                '&.MuiButton-root': {
                                    border: '1px solid #472F05',
                                    borderRadius: 0,
                                    boxShadow: '2px 2px #472F05',
                                    py: 0.25,
                                    px: 0.5,
                                    color: '#472F05',
                                    fontSize: 15,
                                    fontFamily: fira_sans_600.style.fontFamily,
                                    backgroundColor: '#FAA943',
                                },
                                '&:hover': {
                                    backgroundColor: '#F79762',
                                },
                            }}
                        >
                            {cancelText}
                        </Button>
                    )}
                    <Button
                        onClick={handleConfirm}
                        sx={{
                            '&.MuiButton-root': {
                                border: '1px solid #472F05',
                                borderRadius: 0,
                                boxShadow: '2px 2px #472F05',
                                py: 0.25,
                                px: 0.5,
                                color: '#472F05',
                                fontSize: 15,
                                fontFamily: fira_sans_600.style.fontFamily,
                                backgroundColor: '#E18A7A',
                            },
                            '&:hover': {
                                backgroundColor: '#E2725B',
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
