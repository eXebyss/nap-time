import { v4 as uuidv4 } from 'uuid';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import NapTimeCard from '@/components/UI/NapTimeCard/NapTimeCard';
import Divider from '@/components/UI/Divider/Divider';
import { NapTimeListData } from '../types';
import useNapTimeDay from './useNapTimeDay';

const NapTimeDay = ({ day }: { day: string }) => {
    const { filteredNapTime, totalNapTime } = useNapTimeDay(day);

    return (
        <div className="w-full">
            <div className="mx-auto w-full rounded-2xl">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg hover:bg-base-100 px-4 py-2 text-left text-sm font-medium text-base-content focus:outline-none">
                                <span>{day}</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-base-content`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="py-2 text-sm text-content-base">
                                <p className="py-2 fhd:py-4">
                                    Total nap time:{' '}
                                    <span className="font-bold">
                                        {totalNapTime?.toFixed(2)}
                                    </span>{' '}
                                    hours.
                                </p>
                                {filteredNapTime?.length ? (
                                    <div className="grid">
                                        {filteredNapTime?.map(
                                            (
                                                napTime: NapTimeListData,
                                                index: number,
                                            ) => (
                                                <NapTimeCard
                                                    key={uuidv4()}
                                                    napTime={napTime}
                                                    idx={index}
                                                />
                                            ),
                                        )}
                                    </div>
                                ) : null}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
            <Divider classes="my-0" />
        </div>
    );
};

export default NapTimeDay;
