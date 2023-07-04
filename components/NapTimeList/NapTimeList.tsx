'use client';

import { v4 as uuidv4 } from 'uuid';
import { useAuthRedirect } from '@/hooks';
import { useNapTimeContext } from './NapTimeContext';
import NapTimeYearSelector from './NapTimeYearSelector/NapTimeYearSelector';
import NapTimeMonthSelector from './NapTimeMonthSelector/NapTimeMonthSelector';
import NapTimeDay from './NapTimeDay/NapTimeDay';

const NapTimeList = () => {
    const {
        state: {
            selectedYear,
            selectedMonth,
            filteredNapTimeMonth,
            totalNapTimeYear,
            totalNapTimeMonth,
            averageNapTimeMonth,
        },
        uniqueDays,
    } = useNapTimeContext();

    useAuthRedirect();

    return (
        <div className="p-4 grid gap-y-4 justify-center bg-base-200">
            <h1>Nap History</h1>
            <h2>Year:</h2>
            <NapTimeYearSelector />
            {selectedYear && (
                <p>
                    Total year nap time:{' '}
                    <span className="font-bold">{totalNapTimeYear}</span> hours.
                </p>
            )}
            {selectedYear && (
                <>
                    <h2>Month:</h2>
                    <NapTimeMonthSelector />
                </>
            )}
            {selectedMonth && (
                <>
                    {' '}
                    <p>
                        Total month nap time:{' '}
                        <span className="font-bold">{totalNapTimeMonth}</span>{' '}
                        hours.
                    </p>
                    <p>
                        Monthly average nap time:{' '}
                        <span className="font-bold">{averageNapTimeMonth}</span>{' '}
                        hours per day.
                    </p>
                </>
            )}
            {selectedMonth && (
                <>
                    <h2>Days:</h2>
                    {filteredNapTimeMonth?.length ? (
                        uniqueDays?.map((day: string) => (
                            <NapTimeDay day={day} key={uuidv4()} />
                        ))
                    ) : (
                        <div>No Nap Time Recorded Yet</div>
                    )}
                </>
            )}
        </div>
    );
};

export default NapTimeList;
