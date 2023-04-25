'use client';

import { v4 as uuidv4 } from 'uuid';
import useNapTimeList from './useNapTimeList';
import { NapTimeData } from './types';
import NapTimeRecord from './NapTimeRecord/NapTimeRecord';

const NapTimeList = () => {
    const { babyNapTime } = useNapTimeList();

    return (
        <>
            {' '}
            {babyNapTime?.length ? (
                babyNapTime?.map((napTime: NapTimeData, index: number) => (
                    <NapTimeRecord
                        key={uuidv4()}
                        napTime={napTime}
                        index={index}
                    />
                ))
            ) : (
                <div>No Nap Time Recorded Yet</div>
            )}
        </>
    );
};

export default NapTimeList;
