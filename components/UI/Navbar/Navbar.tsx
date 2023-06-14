'use client';

import Image from 'next/image';
import { useBrowserCheck } from '@/hooks';
import LogoutButton from '../LogoutButton';
import MenuButton from './MegaMenu';
import useNavbar from './useNavbar';
import NavbarShimmer from './NavbarShimmer';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

const Navbar = (): JSX.Element | null => {
    const { loading, user, babyName, userName, userPhoto } = useNavbar();
    const isBrowser = useBrowserCheck();

    const path = isBrowser ? window.location.pathname : null;

    if (path?.startsWith('/studio') && path.length > '/studio'.length + 1) {
        return null;
    }

    const navBar = loading ? (
        <div className="navbar justify-between bg-base-100 sticky top-0 z-10">
            <div className="flex-none">
                <MenuButton />
                <ThemeSwitch />
            </div>
            <div className="flex-none">
                <NavbarShimmer />
            </div>
            <div className="flex-none">
                <NavbarShimmer />
                <LogoutButton />
            </div>
        </div>
    ) : (
        user && (
            <div className="navbar justify-between bg-base-100 sticky top-0 z-10">
                <div className="flex">
                    <MenuButton />
                    <ThemeSwitch />
                </div>
                {babyName && (
                    <div className="flex-none">
                        <p>
                            <span className="font-bold">{babyName}</span>
                        </p>
                    </div>
                )}
                <div className="flex-none">
                    {userPhoto && (
                        <div className="avatar">
                            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <Image
                                    src={userPhoto}
                                    alt={userName || 'User photo'}
                                    width={48}
                                    height={48}
                                    priority
                                />
                            </div>
                        </div>
                    )}
                    {!userPhoto && <p>{userName}</p>}
                    <LogoutButton />
                </div>
            </div>
        )
    );

    return navBar ?? null;
};

export default Navbar;
