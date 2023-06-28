import moment from 'moment';
import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { RiCloseFill } from 'react-icons/ri';
import Button from '@/components/UI/Button/Button';
import NapTimeRecord from '@/components/UI/NapTimeRecord/NapTimeRecord';
import useNapTimeCard from './useNapTimeCard';

const NapTimeCard = ({
    napTime,
    idx,
}: {
    napTime: { start: string; finish: string; type?: string };
    idx: number;
}) => {
    const { start, finish, type } = napTime;

    const { napDuration, isCardModalOpen, openCardModal, closeCardModal } =
        useNapTimeCard(start, finish);

    return (
        <>
            <button
                type="button"
                onClick={openCardModal}
                className={`btn my-1 ${type === '🌞' && 'btn-secondary'} ${
                    type === '🌚' && 'btn-primary'
                } ${type ?? 'btn-ghost'}`}
            >
                <p>
                    {idx + 1}. {type} {napDuration} hours (
                    {moment(start).format('HH:mm')} -{' '}
                    {moment(finish).format('HH:mm')}).
                </p>
            </button>
            <Transition appear show={isCardModalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeCardModal}
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 flex justify-end"
                                    >
                                        <Button
                                            type="button"
                                            ariaLabel="Close card"
                                            classes="btn-ghost my-0"
                                            onClick={closeCardModal}
                                        >
                                            <RiCloseFill />
                                        </Button>
                                    </Dialog.Title>
                                    <NapTimeRecord
                                        napTime={napTime}
                                        index={idx}
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default NapTimeCard;
