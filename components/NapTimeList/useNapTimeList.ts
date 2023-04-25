import { useFirestoreContext } from '@/context';

const useNapTimeList = () => {
    const { babyNapTime } = useFirestoreContext();

    return {
        babyNapTime,
    };
};

export default useNapTimeList;
