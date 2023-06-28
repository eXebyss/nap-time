import { useBabyContext } from '@/context';

const useNapTimeList = () => {
    const { babyNapTime } = useBabyContext();

    return {
        babyNapTime,
    };
};

export default useNapTimeList;
