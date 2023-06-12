import moment from 'moment';
import { NapTimeData } from '@/context';
import { useNapTimeContext } from '../NapTimeContext';

const useNapTimeDay = (day: string) => {
    const { getDayRecords } = useNapTimeContext();

    const dayRecords = getDayRecords(day);

    const filteredNapTime = dayRecords?.sort(
        (a: NapTimeData, b: NapTimeData) => {
            return moment(a.finish).diff(moment(b.finish));
        },
    );

    const totalNapTime = filteredNapTime?.reduce(
        (acc: number, curr: NapTimeData) => {
            const today = moment().format('YYYY-MM-DD');

            const midnightDateTime = moment(`${today} 00:00:00`);

            if (moment(curr.start).isSame(curr.finish, 'day')) {
                const duration = moment.duration(
                    moment(curr.finish).diff(moment(curr.start)),
                );

                return acc + duration.asHours();
            }

            const duration = moment.duration(
                moment(curr.finish).diff(midnightDateTime),
            );

            return acc + duration.asHours();
        },
        0,
    );

    return { filteredNapTime, totalNapTime };
};

export default useNapTimeDay;
