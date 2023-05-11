'use client';

import Input from '@/components/UI/Input/Input';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import Button from '@/components/UI/Button/Button';
import Toast from '@/components/UI/Toast/Toast';
import useAddNapTime from './useAddNapTime';

const AddNapTime = () => {
    const {
        isOpen,
        isFormOpen,
        onAdd,
        dispatch,
        setNapStart,
        setNapFinish,
        napStart,
        napFinish,
        addNapTime,
        successMessage,
    } = useAddNapTime();

    const openCloseButton = isOpen ? (
        <Button type="button" classes="btn-ghost p-0" onClick={onAdd}>
            <FaRegMinusSquare className="w-12 h-12" />
        </Button>
    ) : (
        <Button type="button" classes="btn-ghost p-0" onClick={onAdd}>
            <FaRegPlusSquare className="w-12 h-12" />
        </Button>
    );

    const napTimeForm = (isOpen || isFormOpen) && (
        <div className="flex flex-col">
            <label className="label">
                <span className="label-text">Nap time start:</span>
            </label>
            <Input
                type="time"
                placeholder="e.g. 9:36"
                onChange={(e) =>
                    dispatch({
                        type: setNapStart,
                        payload: e.target.value,
                    })
                }
                classes="input input-ghost w-full max-w-xs my-2 fhd:my-4 text-center focus:text-start fhd:text-start fhd:pl-0 fhd:focus:pl-4"
            />
            <label className="label">
                <span className="label-text">Nap time finish:</span>
            </label>
            <Input
                type="time"
                placeholder="e.g. 13:58"
                onChange={(e) =>
                    dispatch({
                        type: setNapFinish,
                        payload: e.target.value,
                    })
                }
                classes="input input-ghost w-full max-w-xs my-2 fhd:my-4 text-center focus:text-start fhd:text-start fhd:pl-0 fhd:focus:pl-4"
            />
            {napStart && napFinish && (
                <Button
                    type="button"
                    onClick={() => addNapTime(napStart, napFinish)}
                    classes="btn-ghost ml-2"
                >
                    Submit
                </Button>
            )}
        </div>
    );

    const successToast = successMessage && (
        <Toast type="success" message={successMessage} />
    );

    return (
        <>
            {openCloseButton}
            <div
                className={`grid justify-center max-h-0 overflow-hidden transition-all duration-500 ease-out ${
                    isOpen ? 'max-h-[500px] duration-[2000ms] ease-in' : ''
                }`}
            >
                {napTimeForm}
            </div>
            {successToast}
        </>
    );
};

export default AddNapTime;
