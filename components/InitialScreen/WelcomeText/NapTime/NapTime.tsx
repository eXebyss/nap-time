import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Divider from '@/components/UI/Divider/Divider';
import useNapTime from './useNapTime';
import { NapTimeData } from './types';

const NapTime = () => {
    const { babyName, filteredNapTime, totalNapTime } = useNapTime();

    const todayNapTime = filteredNapTime?.length && (
        <>
            {' '}
            {filteredNapTime?.map((napTime: NapTimeData) => (
                <div key={uuidv4()}>
                    <p>Start: {moment(napTime.start).format('HH:mm')}</p>
                    <p>Finish: {moment(napTime.finish).format('HH:mm')}</p>
                    <Divider />
                </div>
            ))}
            <p>Total nap time: {totalNapTime.toFixed(2)} hours</p>
        </>
    );

    return (
        <>
            {' '}
            {todayNapTime ? (
                <>
                    <p>{babyName}'s, current nap time: </p>
                    <Divider />
                    {todayNapTime}
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
