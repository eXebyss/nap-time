import { useState } from 'react';
import { useBabyContext } from '@/context';
import InputForm from '@/components/InitialScreen/WelcomeText/InputForm/InputForm';
import Button from '@/components/UI/Button/Button';

const AddBabyName = () => {
    const { addBabyName } = useBabyContext();
    const [isFormOpen, setFormOpen] = useState<boolean>(false);

    const addBabyNameHandler = (name: string) => {
        addBabyName(name);
        setFormOpen(false);
    };

    return (
        <>
            {' '}
            {!isFormOpen ? (
                <Button
                    type="button"
                    ariaLabel="Add"
                    classes="btn-ghost"
                    onClick={() => setFormOpen(true)}
                >
                    Add
                </Button>
            ) : (
                <InputForm
                    placeholder="Enter your baby name"
                    buttonHandler={addBabyNameHandler}
                />
            )}
        </>
    );
};

export default AddBabyName;
