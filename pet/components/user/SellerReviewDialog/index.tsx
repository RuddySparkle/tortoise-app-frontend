'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import { fira_sans_400, fira_sans_600, fira_sans_800 } from '@core/theme/theme';
import { Box, Grid, Zoom, InputAdornment, IconButton, Typography, Stack } from '@mui/material';
import useToastUI from '@core/hooks/useToastUI';
import SellerReviewItem from '@components/user/SellerReviewItem';
import { SellerReview } from '@services/api/v1/review/type';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Zoom ref={ref} {...props} />;
});

type SellerReviewDialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    header: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    handleConfirm: React.MouseEventHandler<HTMLButtonElement>;
    sellerId: string;
    sellerName: string;
    isMyShop: boolean;
    isAdmin?: boolean;
    sellerReviewData: SellerReview[];
    sellerReviewSuccess: boolean;
    refetchReview: (options?: RefetchOptions) => Promise<QueryObserverResult<any, any>>;
};

export default function SellerReviewDialog(props: SellerReviewDialogProps) {
    const toastUI = useToastUI();
    const {
        open,
        setOpen,
        header,
        description,
        cancelText,
        confirmText,
        sellerId,
        sellerReviewData,
        sellerReviewSuccess,
        refetchReview,
    } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const getCommentable = (itemLength: number) => {
        if (itemLength === 0 && props.isMyShop) {
            return true;
        }
        return false;
    };

    if (open) {
        if (!sellerReviewSuccess) {
            toastUI.toastError('Load Review Failed');
        } else {
            toastUI.toastSuccess('Load Review Success');
        }
    }

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
                        <Box
                            sx={{
                                mt: 3,
                                mx: 3,
                                width: 500,
                                height: 400,
                                border: '3px solid #472F05',
                                boxShadow: '5px 5px #472F05',
                                backgroundColor: '#FBF3DD',
                                overflowY: 'scroll',
                            }}
                        >
                            {!sellerReviewData || sellerReviewData.length === 0 ? (
                                <Typography
                                    height={'100%'}
                                    display={'flex'}
                                    flexDirection={'column'}
                                    justifyContent={'center'}
                                    textAlign={'center'}
                                    fontFamily={fira_sans_600.style.fontFamily}
                                    fontSize={18}
                                    color={'#472F05'}
                                >
                                    Nobody has reviewed this shop yet.
                                </Typography>
                            ) : null}
                            {((sellerReviewData || []) as SellerReview[]).map((item, idx) => (
                                <SellerReviewItem
                                    reviewId={item.id}
                                    reviewNo={idx + 1}
                                    rating={item.rating_score}
                                    review={item.description}
                                    shopComment={item.comment_records
                                        .map((eachRecord) => {
                                            return eachRecord?.comment;
                                        })
                                        .join(',\n')}
                                    isCommentable={getCommentable(item.comment_records.length)}
                                    isAdmin={props.isAdmin}
                                    refetch={refetchReview}
                                />
                            ))}
                        </Box>
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
                                py: 0.5,
                                px: 2,
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
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
