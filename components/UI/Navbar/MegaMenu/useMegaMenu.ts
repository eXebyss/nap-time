import { useState } from 'react';
import { LINKS as links } from '@/constants';

const useMegaMenu = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const openMenuModal = () => {
        setMenuOpen(true);
    };

    const closeMenuModal = () => {
        setMenuOpen(false);
    };

    return { isMenuOpen, openMenuModal, closeMenuModal, links };
};

export default useMegaMenu;
