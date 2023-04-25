'use client';

import LogoutButton from '../LogoutButton';
import MenuButton from './MegaMenu';
import useNavbar from './useNavbar';

const Navbar = (): JSX.Element | null => {
    const { user, babyName, userName } = useNavbar();

    const navBar = (
        <div className="navbar justify-between bg-base-100 sticky top-0">
            <div className="flex-none">
                <MenuButton />
            </div>
            <div className="flex-none">
                <p>{babyName} 🐣</p>
            </div>
            <div className="flex-none">
                <p>{userName}</p>
                <LogoutButton />
            </div>
        </div>
    );

    return user ? navBar : null;
};

export default Navbar;
