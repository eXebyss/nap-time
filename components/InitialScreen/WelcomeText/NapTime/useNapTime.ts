import moment from 'moment';
import { useFirestoreContext } from '@/context/FirestoreContext';
import { NapTimeData } from './types';

const useNapTime = () => {
    const { babyData, babyNapTime } = useFirestoreContext();

    const babyName = babyData?.result
        ? babyData.result?.docs[0]?.data()?.name
        : null;

    const today = moment().startOf('day');
    const filteredNapTime = babyNapTime?.filter((napTime: NapTimeData) => {
        return moment(napTime.start).isSame(today, 'day');
    });

    const totalNapTime = filteredNapTime?.reduce(
        (acc: number, curr: NapTimeData) => {
            const duration = moment.duration(
                moment(curr.finish).diff(moment(curr.start)),
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
