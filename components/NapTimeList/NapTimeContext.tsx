'use client';

import {
    createContext,
    useContext,
    useCallback,
    useMemo,
    useReducer,
    useEffect,
} from 'react';
import moment from 'moment';
import { NapTimeData, useBabyContext } from '@/context';
import { useBrowserCheck } from '@/hooks';
import {
    NapTimeListData,
    INapTimeContext,
    NapTimeAction,
    NapTimeProviderProps,
    NapTimeState,
} from './types';

const NapTimeContext = createContext<INapTimeContext>({
    state: {
        selectedYear: null,
        selectedMonth: null,
        filteredNapTimeYear: null,
        filteredNapTimeMonth: null,
        totalNapTimeYear: null,
        totalNapTimeMonth: null,
        averageNapTimeMonth: null,
    },
    setSelectedYear: () => {},
    setSelectedMonth: () => {},
    uniqueYears: [],
    uniqueMonths: [],
    uniqueDays: [],
    getDayRecords: () => [],
});

export const useNapTimeContext = (): INapTimeContext =>
    useContext(NapTimeContext);

export const NapTimeContextProvider = ({
    children,
}: NapTimeProviderProps): JSX.Element => {
    const { babyNapTime } = useBabyContext();
    const isBrowser = useBrowserCheck();

    const initialState: NapTimeState = {
        selectedYear: null,
        selectedMonth: null,
        filteredNapTimeYear: null,
        filteredNapTimeMonth: null,
        totalNapTimeYear: null,
        totalNapTimeMonth: null,
        averageNapTimeMonth: null,
    };

    const reducer: React.Reducer<NapTimeState, NapTimeAction> = (
        state: NapTimeState,
        action: NapTimeAction,
    ) => {
        switch (action.type) {
            case 'setSelectedYear':
                return {
                    ...state,
                    selectedYear: action.payload,
                };
            case 'setSelectedMonth':
                return {
                    ...state,
                    selectedMonth: action.payload,
                };
            case 'setFilteredNapTimeYear':
                return {
                    ...state,
                    filteredNapTimeYear: action.payload,
                };
            case 'setFilteredNapTimeMonth':
                return {
                    ...state,
                    filteredNapTimeMonth: action.payload,
                };
            case 'setTotalNapTimeYear':
                return {
                    ...state,
                    totalNapTimeYear: action.payload,
                };
            case 'setTotalNapTimeMonth':
                return {
                    ...state,
                    totalNapTimeMonth: action.payload,
                };
            case 'setAverageNapTimeMonth':
                return {
                    ...state,
                    averageNapTimeMonth: action.payload,
                };
            default: {
                throw new Error('Unhandled action type');
            }
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const setSelectedYear = useCallback(
        (selectedYear: string) => {
            dispatch({
                type: 'setSelectedYear',
                payload: selectedYear,
            });

            if (isBrowser) {
                localStorage.setItem('selectedYear', selectedYear);
            }
        },
        [isBrowser],
    );

    useEffect(() => {
        if (isBrowser) {
            const selectedYear = localStorage.getItem('selectedYear');

            if (selectedYear) {
                setSelectedYear(selectedYear);
            }
        }
    }, [isBrowser, setSelectedYear]);

    const existingYears = babyNapTime?.map((napTime: NapTimeListData) => {
        return napTime.start.split('-')[0];
    });

    const uniqueYears = useMemo(() => {
        return [...new Set(existingYears)];
    }, [existingYears]);

    useEffect(() => {
        dispatch({
            type: 'setFilteredNapTimeYear',
            payload: babyNapTime.filter((napTime) => {
                return napTime.start.split('-')[0] === state?.selectedYear;
            }),
        });
    }, [babyNapTime, state?.selectedYear]);

    const setSelectedMonth = useCallback(
        (selectedMonth: string) => {
            dispatch({
                type: 'setSelectedMonth',
                payload: selectedMonth,
            });

            if (isBrowser) {
                localStorage.setItem('selectedMonth', selectedMonth);
            }
        },
        [isBrowser],
    );

    const existingMonths = state?.filteredNapTimeYear?.map(
        (napTime: NapTimeListData) => {
            return napTime.start.split('-')[1];
        },
    );

    const uniqueMonths = useMemo(() => {
        return [...new Set(existingMonths)];
    }, [existingMonths]);

    useEffect(() => {
        if (isBrowser) {
            const selectedYear = localStorage.getItem('selectedYear');
            const selectedMonth = localStorage.getItem('selectedMonth');

            if (selectedYear) {
                setSelectedYear(selectedYear);
            }

            if (selectedMonth) {
                setSelectedMonth(selectedMonth);
            }
        }
    }, [isBrowser, setSelectedYear, setSelectedMonth]);

    useEffect(() => {
        dispatch({
            type: 'setFilteredNapTimeMonth',
            payload: state?.filteredNapTimeYear?.length
                ? state.filteredNapTimeYear?.filter((napTime) => {
                      return (
                          napTime.start.split('-')[1] === state?.selectedMonth
                      );
                  })
                : null,
        });
    }, [state?.filteredNapTimeYear, state?.selectedMonth]);

    const existingDays = state?.filteredNapTimeMonth?.map(
        (napTime: NapTimeListData) => {
            return napTime.start.split('-')[2].split(' ')[0];
        },
    );

    const uniqueDays = useMemo(() => {
        return [...new Set(existingDays)].sort((a, b) => Number(a) - Number(b));
    }, [existingDays]);

    const getDayRecords = useCallback(
        (day: string) => {
            const filteredDayRecords = state?.filteredNapTimeMonth?.length
                ? state.filteredNapTimeMonth.filter(
                      (napTime: NapTimeListData) => {
                          if (napTime.type === '🌞') {
                              return (
                                  napTime.start.split('-')[2].split(' ')[0] ===
                                  day
                              );
                          }

                          if (napTime.type === '🌚') {
                              return (
                                  napTime.start.split('-')[2].split(' ')[0] ===
                                      day ||
                                  napTime.finish.split('-')[2].split(' ')[0] ===
                                      day
                              );
                          }

                          return false;
                      },
                  )
                : null;

            return filteredDayRecords;
        },
        [state?.filteredNapTimeMonth],
    );

    useEffect(() => {
        const totalNapTimeYear =
            state?.filteredNapTimeYear
                ?.reduce((acc: number, curr: NapTimeData) => {
                    const duration = moment.duration(
                        moment(curr.finish).diff(moment(curr.start)),
                    );
                    return acc + duration.asHours();
                }, 0)
                .toFixed(2) || null;

        dispatch({
            type: 'setTotalNapTimeYear',
            payload: totalNapTimeYear,
        });
    }, [state?.filteredNapTimeYear]);

    const averageNapTimeMonth =
        state?.totalNapTimeYear &&
        uniqueDays?.length &&
        (parseInt(state.totalNapTimeYear, 10) / uniqueDays.length).toFixed(2);

    useEffect(() => {
        averageNapTimeMonth &&
            dispatch({
                type: 'setAverageNapTimeMonth',
                payload: averageNapTimeMonth,
            });
    }, [averageNapTimeMonth]);

    useEffect(() => {
        const totalNapTimeMonth =
            state?.filteredNapTimeMonth
                ?.reduce((acc: number, curr: NapTimeData) => {
                    const duration = moment.duration(
                        moment(curr.finish).diff(moment(curr.start)),
                    );
                    return acc + duration.asHours();
                }, 0)
                .toFixed(2) || null;

        dispatch({
            type: 'setTotalNapTimeMonth',
            payload: totalNapTimeMonth,
        });
    }, [state?.filteredNapTimeMonth]);

    const contextValue = useMemo(() => {
        return {
            state,
            setSelectedYear,
            setSelectedMonth,
            uniqueYears,
            uniqueMonths,
            uniqueDays,
            getDayRecords,
        };
    }, [
        state,
        setSelectedYear,
        setSelectedMonth,
        uniqueYears,
        uniqueMonths,
        uniqueDays,
        getDayRecords,
    ]);

    return (
        <NapTimeContext.Provider value={contextValue}>
            {children}
        </NapTimeContext.Provider>
    );
};
