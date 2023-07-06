import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RiMenuFill, RiCloseFill } from 'react-icons/ri';
import { Transition, Dialog } from '@headlessui/react';
import Button from '../../Button/Button';
import LogoutButton from '../../LogoutButton/LogoutButton';
import useMegaMenu from './useMegaMenu';
import MegaMenuLink from './MegaMenuLink/MegaMenuLink';

const MegaMenu = () => {
    const { isMenuOpen, openMenuModal, closeMenuModal, links } = useMegaMenu();

    return (
        <>
            <Button
                type="button"
                ariaLabel="Open menu"
                classes="btn-ghost"
                onClick={openMenuModal}
            >
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
                        <div className="fixed inset-0 bg-base-neutral bg-opacity-25" />
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
                                <Dialog.Panel className="w-full h-screen max-w-md transform overflow-hidden fhd:rounded-r-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-neutral flex justify-end"
                                    >
                                        <Button
                                            type="button"
                                            ariaLabel="Close menu"
                                            classes="btn-ghost"
                                            onClick={closeMenuModal}
                                        >
                                            <RiCloseFill />
                                        </Button>
                                    </Dialog.Title>
                                    <div className="grid">
                                        {links.map((link) => (
                                            <MegaMenuLink
                                                key={uuidv4()}
                                                href={link.href}
                                                text={link.text}
                                                onClick={closeMenuModal}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap justify-start items-center gap-x-2 fhd:gap-x-4">
                                        <p className="my-2 fhd:my-4 text-sm text-base-content">
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
