import { useState } from 'react';

const useMegaMenu = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const openMenuModal = () => {
        setMenuOpen(true);
    };

    const closeMenuModal = () => {
        setMenuOpen(false);
    };

    return { isMenuOpen, openMenuModal, closeMenuModal };
};

export default useMegaMenu;
