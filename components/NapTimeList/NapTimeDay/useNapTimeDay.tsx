import moment from 'moment';
import { NapTimeData } from '@/context';
import { useNapTimeContext } from '../NapTimeContext';

const useNapTimeDay = (day: string) => {
    const { getDayRecords } = useNapTimeContext();

    const dayRecords = getDayRecords(day);

    const totalNapTime =
        dayRecords?.reduce((acc: number, curr: NapTimeData) => {
            const duration = moment.duration(
                moment(curr.finish).diff(moment(curr.start)),
            );
            return acc + duration.asHours();
        }, 0) || null;

    return { dayRecords, totalNapTime };
};

export default useNapTimeDay;
