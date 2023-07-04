import moment from 'moment';
import { useBabyContext } from '@/context';
import { NapTimeData } from './types';

const useNapTime = () => {
    const { babyName, babyNapTime } = useBabyContext();

    const today = moment().startOf('day');
    const currentDayNapTime = babyNapTime?.filter((napTime: NapTimeData) => {
        return moment(napTime.finish).isSame(today, 'day');
    });

    const filteredNapTime = currentDayNapTime?.sort(
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

    return {
        babyName,
        filteredNapTime,
        totalNapTime,
    };
};

export default useNapTime;
