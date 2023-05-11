import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import moment from 'moment';
import { useNapTimeContext } from '../NapTimeContext';

export default function NapTimeMonthSelector() {
    const {
        state: { selectedMonth },
        setSelectedMonth,
        uniqueMonths,
    } = useNapTimeContext();

    return (
        <div className="min-w-72">
            <Listbox value={selectedMonth} onChange={setSelectedMonth}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm hover:cursor-pointer">
                        <span className="block truncate">
                            {selectedMonth
                                ? moment(selectedMonth, 'MM').format('MMMM')
                                : 'Select Month'}
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
                        <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg focus:outline-none sm:text-sm">
                            {uniqueMonths.map((month: string) => (
                                <Listbox.Option
                                    key={uuidv4()}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? 'bg-base-300 text-primary'
                                                : 'text-base-content'
                                        }`
                                    }
                                    value={month}
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
                                                {moment(month, 'MM').format(
                                                    'MMMM',
                                                )}
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
}
