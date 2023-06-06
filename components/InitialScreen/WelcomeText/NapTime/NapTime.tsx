import { v4 as uuidv4 } from 'uuid';
import Divider from '@/components/UI/Divider/Divider';
import useNapTime from './useNapTime';
import { NapTimeData } from './types';
import NapTimeCard from './NapTimeCard/NapTimeCard';

const NapTime = () => {
    const { babyName, filteredNapTime, totalNapTime } = useNapTime();

    const todayNapTime = filteredNapTime?.length && (
        <div className="grid justify-center">
            {filteredNapTime?.map((napTime: NapTimeData, idx: number) => (
                <NapTimeCard key={uuidv4()} napTime={napTime} idx={idx} />
            ))}
        </div>
    );

    return (
        <>
            {' '}
            {todayNapTime ? (
                <>
                    <p>{babyName}'s, current nap time: </p>
                    <Divider />
                    {todayNapTime}
                    <Divider />
                    <p>Total nap time: {totalNapTime.toFixed(2)} hours</p>
                </>
            ) : (
                <p>
                    No nap time today for{' '}
                    <span className="font-bold">{babyName}</span>!
                </p>
            )}
        </>
    );
};

export default NapTime;
