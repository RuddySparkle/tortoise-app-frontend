'use client';
import { getLocalStorageValue } from '@core/utils';
import TopBar from '@components/core/TopBar';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useGetSession from '@core/auth/useGetSession';
import useGetUserProfile from '@services/api/v1/user/useGetUserProfile';
import NewUserDialog from '@components/user/NewUserDialog';

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const path = usePathname();
    const session = useGetSession();
    const router = useRouter();
    const { data: userProfile, isSuccess: userProfileSuccess } = useGetUserProfile(session.userID || '');
    const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
    const [requiredProfile, setRequiredProfile] = useState(false);

    const required_props = [
        userProfile?.first_name,
        userProfile?.last_name,
        userProfile?.gender,
        userProfile?.phoneNumber,
        userProfile?.address.building,
        userProfile?.address.street,
        userProfile?.address.district,
        userProfile?.address.province,
        userProfile?.address.postalCode,
    ];

    const handleNewUserProfile = () => {
        setRequiredProfile(false);
        console.log(required_props);
        required_props.forEach((element) => {
            if (!element || element === '') {
                console.log('set');
                setRequiredProfile(true);
            }
            console.log(element);
        });
    };

    const sessionCheck = async () => {
        const session_id = await localStorage.getItem('session_id');
        if (!session_id) {
            router.push('/user/login');
            return null;
        }
    };

    useEffect(() => {
        sessionCheck();
    }, [typeof window]);

    useEffect(() => {
        console.log('pass1');
        handleNewUserProfile();
        console.log(requiredProfile);
        {
            requiredProfile && !path.includes('edit-profile')
                ? setOpenNewUserDialog(true)
                : setOpenNewUserDialog(false);
        }
    }, [userProfile, path]);

    useEffect(() => {
        console.log('pass2');
        {
            requiredProfile ? setOpenNewUserDialog(true) : setOpenNewUserDialog(false);
        }
    }, [requiredProfile]);

    if (!userProfileSuccess) {
        return null;
    }

    return (
        <>
            <NewUserDialog
                open={openNewUserDialog}
                setOpen={setOpenNewUserDialog}
                header={'Are you a new User?'}
                cancelText="Cancel"
                confirmText="Create Profile"
                handleConfirm={handleNewUserProfile}
            />
            <TopBar />
            {children}
        </>
    );
}
