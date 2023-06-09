'use client';

import InputForm from '@/components/UI/InputForm/InputForm';
import AddNapTime from './AddNapTime';
import useWelcomeText from './useWelcomeText';
import NapTime from './NapTime/NapTime';

const WelcomeText = (): JSX.Element => {
    const { user, addBabyName, babyName, displayName, handleUpdateUserName } =
        useWelcomeText();

    return (
        <>
            {' '}
            {user ? (
                <>
                    <h1 className="text-5xl font-bold">Hey, </h1>
                    <h2 className="text-4xl font-bold break-all">
                        {displayName ? user.displayName : user?.email}!
                    </h2>
                    {!displayName ? (
                        <InputForm
                            placeholder="Enter your name"
                            buttonHandler={handleUpdateUserName}
                        />
                    ) : null}
                    {displayName && !babyName ? (
                        <InputForm
                            placeholder="Enter your baby name"
                            buttonHandler={addBabyName}
                        />
                    ) : null}
                    <NapTime />
                    <AddNapTime />
                </>
            ) : (
                <>
                    <h1 className="text-5xl font-bold">Welcome</h1>
                    <h2 className="text-4xl font-bold">to Baby Time!</h2>
                </>
            )}
        </>
    );
};

export default WelcomeText;
