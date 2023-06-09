'use client';

import { useBabyContext } from '@/context';
import { useAuthRedirect } from '@/hooks';
import BabySelector from '../UI/BabySelector/BabySelector';
import Button from '../UI/Button/Button';
import AddBabyName from './AddBabyName/AddBabyName';
import UpdateBabyName from './UpdateBabyName/UpdateBabyName';
import UpdateUserName from './UpdateUserName/UpdateUserName';

const MyAccount = () => {
    const { babyName, deleteBabyName } = useBabyContext();

    useAuthRedirect();

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-2xl fhd:max-w-4xl">
                    <h1 className="mt-4 fhd:mt-8">My Account</h1>
                    <h2 className="mt-4 fhd:mt-8">User Settings</h2>
                    <UpdateUserName />
                    <h2 className="mt-4 fhd:mt-8">Baby Settings</h2>
                    <h3 className="mt-4 fhd:mt-8">Select Baby</h3>
                    <BabySelector />
                    <h3 className="mt-4 fhd:mt-8">Add new baby</h3>
                    <AddBabyName />
                    <h3 className="mt-4 fhd:mt-8">Update Baby Name</h3>
                    <UpdateBabyName />
                    <h3 className="mt-4 fhd:mt-8">Delete Baby</h3>
                    <Button
                        type="button"
                        ariaLabel="Delete baby name"
                        classes="btn-ghost text-red-600"
                        onClick={deleteBabyName}
                    >
                        Delete {babyName}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
