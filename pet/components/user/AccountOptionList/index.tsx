import { Box, Typography } from '@mui/material';
import ChangePasswordDialog from '@components/user/ChangePasswordDialog';
import DeleteUserDialog from '@components/user/DeleteUserDialog';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { fira_sans_600 } from '@core/theme/theme';
import { useRouter } from 'next/navigation';
import DeleteBankAccountDialog from '@components/user/DeleteBankAccountDialog';
import { useUpdateUserPassword } from '@services/api/v1/user/useUpdateUserPassword';
import useToastUI from '@core/hooks/useToastUI';
import useGetSession from '@core/auth/useGetSession';
import SellerOptionLists from './SellerOption';
import useDeleteBankAccount from '@services/api/v1/seller/useDeleteBankAccount';
import { ISellerQueryParams } from '@services/api/v1/seller/type';

export default function AccountOptionList() {
    const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
    const [openDeleteUserDialog, setOpenDeleteUserDialog] = useState(false);
    const [openDeleteBankAccountDialog, setOpenDeleteBankAccountDialog] = useState(false);

    const router = useRouter();
    const toastUI = useToastUI();
    const session = useGetSession();

    const handleChangePasswordConfirm = async () => {
        console.log('confirm change password');
    };

    const handleDeleteUserConfirm = async () => {
        console.log('confirm delete user');
    };

    const handleDeleteBankAccountConfirm = async () => {
        console.log('confirm delete bank account');
    };

    return (
        <Box sx={{ mt: 2 }}>
            <ChangePasswordDialog
                open={openChangePasswordDialog}
                setOpen={setOpenChangePasswordDialog}
                header={'Change Password'}
                cancelText="Cancel"
                confirmText="Confirm"
                handleConfirm={handleChangePasswordConfirm}
            />
            <DeleteUserDialog
                open={openDeleteUserDialog}
                setOpen={setOpenDeleteUserDialog}
                header={'Delete User Account'}
                cancelText="Cancel"
                confirmText="Delete"
                handleConfirm={handleDeleteUserConfirm}
            />
            <DeleteBankAccountDialog
                open={openDeleteBankAccountDialog}
                setOpen={setOpenDeleteBankAccountDialog}
                header={'Delete Bank Account'}
                cancelText="Cancel"
                confirmText="Delete"
                handleConfirm={handleDeleteBankAccountConfirm}
            />
            <List
                sx={{ width: 300, border: '2px solid #472F05', boxShadow: '4px 4px #472F05', borderRadius: 1, my: 2 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{
                            pt: 1,
                            borderTopRightRadius: 1,
                            borderTopLeftRadius: 1,
                            backgroundColor: '#F9C067',
                        }}
                    >
                        <Typography sx={{ fontFamily: fira_sans_600.style.fontFamily, pb: 1, color: '#472F05' }}>
                            Profile Settings
                        </Typography>
                    </ListSubheader>
                }
            >
                <ListItemButton
                    sx={{ backgroundColor: '#FCF1E5', '&:hover': { backgroundColor: '#E5CB9A' } }}
                    onClick={() => router.push('account/edit-profile')}
                >
                    <ListItemIcon>
                        <AccountCircleIcon sx={{ color: '#472F05' }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography sx={{ fontFamily: fira_sans_600.style.fontFamily, color: '#472F05' }}>
                                Edit Profile
                            </Typography>
                        }
                    />
                </ListItemButton>

                <ListItemButton
                    sx={{ backgroundColor: '#FCF1E5', '&:hover': { backgroundColor: '#E5CB9A' } }}
                    onClick={() => setOpenChangePasswordDialog(true)}
                >
                    <ListItemIcon>
                        <PasswordIcon sx={{ color: '#472F05' }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography sx={{ fontFamily: fira_sans_600.style.fontFamily, color: '#472F05' }}>
                                Change Password
                            </Typography>
                        }
                    />
                </ListItemButton>

                <ListItemButton
                    sx={{ backgroundColor: '#FCF1E5', '&:hover': { backgroundColor: '#E18A7A' } }}
                    onClick={() => setOpenDeleteUserDialog(true)}
                >
                    <ListItemIcon>
                        <DeleteIcon sx={{ color: 'red' }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography sx={{ fontFamily: fira_sans_600.style.fontFamily, color: 'red' }}>
                                Delete Account
                            </Typography>
                        }
                    />
                </ListItemButton>
            </List>

            {session?.role === 'seller' && (
                <SellerOptionLists
                    seller_id={session.userID as string}
                    setOpenDeleteBankAccountDialog={setOpenDeleteBankAccountDialog}
                />
            )}
        </Box>
    );
}
