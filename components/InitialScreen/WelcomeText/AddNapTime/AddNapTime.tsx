'use client';

import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Input from '@/components/UI/Input/Input';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Button from '@/components/UI/Button/Button';
import Toast from '@/components/UI/Toast/Toast';
import useAddNapTime from './useAddNapTime';

const AddNapTime = () => {
    const {
        state: {
            isOpen,
            isFormOpen,
            napStart,
            napFinish,
            napDateFinish,
            napDateStart,
            napType,
            successMessage,
        },
        onAdd,
        dispatch,
        setNapStart,
        setNapFinish,
        setNapDateStart,
        setNapDateFinish,
        addNapTime,
        selectNapType,
    } = useAddNapTime();

    const openCloseButton = isOpen ? (
        <Button
            type="button"
            ariaLabel="Close"
            classes="btn-ghost p-0"
            onClick={onAdd}
        >
            <FaRegMinusSquare className="w-12 h-12" />
        </Button>
    ) : (
        <Button
            type="button"
            ariaLabel="Open"
            classes="btn-ghost p-0"
            onClick={onAdd}
        >
            <FaRegPlusSquare className="w-12 h-12" />
        </Button>
    );

    const napTypes = ['🌞', '🌚'];

    const napTypeSelect = (
        <div className="min-w-72">
            <Listbox value={napType} onChange={selectNapType}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm hover:cursor-pointer">
                        <span className="block truncate">
                            {napType || 'Select Type'}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-neutral"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg focus:outline-none sm:text-sm">
                            {napTypes.map((type: string) => (
                                <Listbox.Option
                                    key={uuidv4()}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? 'bg-base-300 text-primary'
                                                : 'text-base-content'
                                        }`
                                    }
                                    value={type}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? 'font-medium'
                                                        : 'font-normal'
                                                }`}
                                            >
                                                {type}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-focus">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );

    const dateForm = (
        <>
            <label className="label">
                <span className="label-text">Nap date start:</span>
            </label>
            <Input
                type="date"
                onChange={(e) =>
                    dispatch({
                        type: setNapDateStart,
                        payload: e.target.value,
                    })
                }
                classes="input input-ghost w-full max-w-xs my-2 fhd:my-4 text-center focus:text-start fhd:text-start fhd:pl-0 fhd:focus:pl-4"
            />
            <label className="label">
                <span className="label-text">Nap date finish:</span>
            </label>
            <Input
                type="date"
                onChange={(e) =>
                    dispatch({
                        type: setNapDateFinish,
                        payload: e.target.value,
                    })
                }
                classes="input input-ghost w-full max-w-xs my-2 fhd:my-4 text-center focus:text-start fhd:text-start fhd:pl-0 fhd:focus:pl-4"
            />
        </>
    );

    const napTimeForm = (isOpen || isFormOpen) && (
        <div className="flex flex-col">
            <label className="label">
                <span className="label-text">Nap time type:</span>
            </label>
            {napTypeSelect}
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
                classes="input input-ghost w-full max-w-xs text-center focus:text-start fhd:text-start fhd:pl-0 fhd:focus:pl-4 my-2 fhd:my-4"
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
                classes="input input-ghost w-full max-w-xs text-center focus:text-start fhd:text-start fhd:pl-0 fhd:focus:pl-4 my-2 fhd:my-4"
            />
            {napType === '🌚' && dateForm}
            {napStart &&
                napFinish &&
                napType &&
                (napType !== '🌚' ||
                    (napType === '🌚' && napDateFinish && napDateStart)) && (
                    <Button
                        type="submit"
                        ariaLabel="Submit"
                        onClick={() => addNapTime()}
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
                    isOpen ? 'max-h-[750px] duration-[2000ms] ease-in' : ''
                }`}
            >
                {napTimeForm}
            </div>
            {successToast}
        </>
    );
};

export default AddNapTime;
