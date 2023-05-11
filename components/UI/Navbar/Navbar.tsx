'use client';

import LogoutButton from '../LogoutButton';
import MenuButton from './MegaMenu';
import useNavbar from './useNavbar';
import NavbarShimmer from './NavbarShimmer';

const Navbar = (): JSX.Element | null => {
    const { loading, user, babyName, userName } = useNavbar();

    const navBar = loading ? (
        <div className="navbar justify-between bg-base-100 sticky top-0 z-10">
            <div className="flex-none">
                <MenuButton />
            </div>
            <div className="flex-none">
                <NavbarShimmer /> 🐣
            </div>
            <div className="flex-none">
                <NavbarShimmer />
                <LogoutButton />
            </div>
        </div>
    ) : (
        user && (
            <div className="navbar justify-between bg-base-100 sticky top-0 z-10">
                <div className="flex-none">
                    <MenuButton />
                </div>
                <div className="flex-none">
                    <p>
                        <span className="font-bold">{babyName}</span> 🐣
                    </p>
                </div>
                <div className="flex-none">
                    <p>{userName}</p>
                    <LogoutButton />
                </div>
            </div>
        )
    );

    return navBar ?? null;
};

export default Navbar;
