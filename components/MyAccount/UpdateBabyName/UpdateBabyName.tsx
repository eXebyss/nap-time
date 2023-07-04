import { useState } from 'react';
import { useBabyContext } from '@/context';
import InputForm from '@/components/UI/InputForm/InputForm';
import Button from '@/components/UI/Button/Button';

const UpdateBabyName = () => {
    const { updateBabyName } = useBabyContext();
    const [isFormOpen, setFormOpen] = useState<boolean>(false);

    const updateBabyNameHandler = (name: string) => {
        updateBabyName(name);
        setFormOpen(false);
    };

    return (
        <>
            {' '}
            {!isFormOpen ? (
                <Button
                    type="button"
                    ariaLabel="Update"
                    classes="btn-ghost"
                    onClick={() => setFormOpen(true)}
                >
                    Update
                </Button>
            ) : (
                <InputForm
                    placeholder="Enter new baby name"
                    buttonHandler={updateBabyNameHandler}
                />
            )}
        </>
    );
};

export default UpdateBabyName;
