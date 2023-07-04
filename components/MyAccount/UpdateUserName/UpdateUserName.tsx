import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import updateUserName from '@/firebase/auth/updateUserName';
import InputForm from '@/components/UI/InputForm/InputForm';
import Button from '@/components/UI/Button/Button';

const UpdateUserName = () => {
    const authContext = useAuthContext();
    const [displayName, setDisplayName] = useState(
        authContext?.user?.displayName,
    );
    const [isFormOpen, setFormOpen] = useState<boolean>(false);

    const user = authContext?.user;

    const handleUpdateUserName = async (name: string) => {
        await updateUserName(name);
        setDisplayName(name);
        setFormOpen(false);
    };

    return (
        <>
            {' '}
            {user ? (
                <>
                    <h3 className="mt-4 fhd:mt-8">Change user name</h3>
                    {!isFormOpen ? (
                        <Button
                            type="button"
                            ariaLabel="Add"
                            classes="btn-ghost text-primary"
                            onClick={() => setFormOpen(true)}
                        >
                            {displayName}
                        </Button>
                    ) : (
                        <InputForm
                            placeholder="Enter new name"
                            buttonHandler={handleUpdateUserName}
                        />
                    )}
                </>
            ) : (
                <>
                    <h3 className="mt-4 fhd:mt-8">Add user name</h3>
                    {!isFormOpen ? (
                        <Button
                            type="button"
                            ariaLabel="Add"
                            classes="btn-ghost text-primary"
                            onClick={() => setFormOpen(true)}
                        >
                            {displayName}
                        </Button>
                    ) : (
                        <InputForm
                            placeholder="Enter new name"
                            buttonHandler={handleUpdateUserName}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default UpdateUserName;
