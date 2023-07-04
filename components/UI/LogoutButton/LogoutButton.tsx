import { RiLogoutBoxRLine } from 'react-icons/ri';
import logOut from '@/firebase/auth/logOut';
import Button from '../Button';

const LogoutButton = () => {
    return (
        <Button
            type="button"
            ariaLabel="Logout"
            aria-label="log out"
            onClick={logOut}
            classes="btn btn-square btn-ghost !my-0 !md:my-0"
        >
            <RiLogoutBoxRLine />
        </Button>
    );
};

export default LogoutButton;
