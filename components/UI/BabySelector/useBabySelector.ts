import { useState } from 'react';
import { useBabyContext } from '@/context';

const useBabySelector = () => {
    const { selectBabyName } = useBabyContext();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const selectBabyNameHandler = (name: string) => {
        selectBabyName(name);
        closeModal();
    };

    return { isModalOpen, closeModal, openModal, selectBabyNameHandler };
};

export default useBabySelector;
