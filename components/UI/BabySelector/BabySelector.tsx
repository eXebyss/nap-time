import { Fragment } from 'react';
import { Listbox, Transition, Dialog } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useBabyContext } from '@/context';
import Button from '../Button/Button';
import useBabySelector from './useBabySelector';

const BabySelector = () => {
    const { babyName, babyNames } = useBabyContext();
    const { closeModal, isModalOpen, openModal, selectBabyNameHandler } =
        useBabySelector();

    return (
        <>
            <div className="flex items-center justify-center">
                <Button
                    type="button"
                    ariaLabel="Baby name"
                    onClick={openModal}
                    classes="btn-ghost font-bold capitalize"
                >
                    {babyName}
                </Button>
            </div>

            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-base-content bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md h-[50vh] transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-neutral-content"
                                    >
                                        Select baby
                                    </Dialog.Title>

                                    <div className="w-72 mx-auto">
                                        <Listbox
                                            value={babyName}
                                            onChange={selectBabyNameHandler}
                                        >
                                            <div className="mt-1">
                                                <Listbox.Button className="flex justify-between w-full cursor-default rounded-lg bg-base-100 py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-primary-focus focus-visible:ring-2 focus-visible:ring-base-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-accent sm:text-sm">
                                                    <span className="block truncate">
                                                        {babyName}
                                                    </span>
                                                    <span className="pointer-events-none inset-y-0 right-0 flex items-center">
                                                        <ChevronUpDownIcon
                                                            className="h-5 w-5 text-base-content"
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
                                                    <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-base-content ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {babyNames.map(
                                                            ({ id, name }) => (
                                                                <Listbox.Option
                                                                    key={id}
                                                                    className={({
                                                                        active,
                                                                    }) =>
                                                                        `flex justify-between cursor-default select-none py-2 px-4 ${
                                                                            active
                                                                                ? 'bg-accent text-accent-content'
                                                                                : 'text-neutral-content'
                                                                        }`
                                                                    }
                                                                    value={name}
                                                                >
                                                                    {({
                                                                        selected,
                                                                    }) => (
                                                                        <>
                                                                            <span
                                                                                className={`block truncate ${
                                                                                    selected
                                                                                        ? 'font-medium'
                                                                                        : 'font-normal'
                                                                                }`}
                                                                            >
                                                                                {
                                                                                    name
                                                                                }
                                                                            </span>
                                                                            {selected ? (
                                                                                <span className="inset-y-0 left-0 flex items-center pl-3 text-accent-content">
                                                                                    <CheckIcon
                                                                                        className="h-5 w-5"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ),
                                                        )}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </Listbox>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default BabySelector;
