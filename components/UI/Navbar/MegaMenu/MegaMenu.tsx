import { Fragment } from 'react';
import { RiMenuFill, RiCloseFill } from 'react-icons/ri';
import { Transition, Dialog } from '@headlessui/react';
import Link from 'next/link';
import Button from '../../Button/Button';
import LogoutButton from '../../LogoutButton/LogoutButton';
import useMegaMenu from './useMegaMenu';

const MegaMenu = () => {
    const { isMenuOpen, openMenuModal, closeMenuModal } = useMegaMenu();

    return (
        <>
            {' '}
            <Button type="button" classes="btn-ghost" onClick={openMenuModal}>
                <RiMenuFill />
            </Button>
            <Transition appear show={isMenuOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeMenuModal}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-start text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full h-screen max-w-md transform overflow-hidden lg:rounded-r-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 flex justify-end"
                                    >
                                        <Button
                                            type="button"
                                            classes="btn-ghost"
                                            onClick={closeMenuModal}
                                        >
                                            <RiCloseFill />
                                        </Button>
                                    </Dialog.Title>

                                    <Link
                                        href="/"
                                        className="my-2 lg:my-4 text-sm text-gray-500 flex flex-wrap justify-start items-center gap-x-2 lg:gap-x-4"
                                    >
                                        Home 🏠
                                    </Link>
                                    <Link
                                        href="/naptime"
                                        className="my-2 lg:my-4 text-sm text-gray-500 flex flex-wrap justify-start items-center gap-x-2 lg:gap-x-4"
                                    >
                                        Nap time
                                    </Link>
                                    <div className="flex flex-wrap justify-start items-center gap-x-2 lg:gap-x-4">
                                        <p className="my-2 lg:my-4 text-sm text-gray-500">
                                            Logout
                                        </p>
                                        <LogoutButton />
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

export default MegaMenu;
