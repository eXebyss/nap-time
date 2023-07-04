import { NapTimeData } from '@/context';

export type NapTimeListData = NapTimeData;

export type NapTimeState = {
    selectedYear: string | null;
    selectedMonth: string | null;
    filteredNapTimeYear: NapTimeData[] | null;
    filteredNapTimeMonth: NapTimeData[] | null;
    totalNapTimeYear: string | null;
    totalNapTimeMonth: string | null;
    averageNapTimeMonth: string | null;
};

export type NapTimeAction =
    | { type: 'SET_SELECTED_YEAR'; payload: string }
    | { type: 'SET_SELECTED_MONTH'; payload: string }
    | { type: 'SET_FILTERED_NAP_TIME_YEAR'; payload: NapTimeData[] }
    | { type: 'SET_FILTERED_NAP_TIME_MONTH'; payload: NapTimeData[] | null }
    | { type: 'SET_TOTAL_NAP_TIME_YEAR'; payload: string | null }
    | { type: 'SET_TOTAL_NAP_TIME_MONTH'; payload: string | null }
    | { type: 'SET_AVERAGE_NAP_TIME_MONTH'; payload: string | null };

export interface NapTimeProviderProps {
    children: React.ReactNode;
}

export interface INapTimeContext {
    state: {
        selectedYear: string | null;
        selectedMonth: string | null;
        filteredNapTimeYear: NapTimeData[] | null;
        filteredNapTimeMonth: NapTimeData[] | null;
        totalNapTimeYear: string | null;
        totalNapTimeMonth: string | null;
        averageNapTimeMonth: string | null;
    };
    setSelectedYear: (selectedYear: string) => void;
    setSelectedMonth: (selectedMonth: string) => void;
    uniqueYears: string[];
    uniqueMonths: string[];
    uniqueDays: string[];
    getDayRecords: (day: string) => NapTimeData[] | null;
}
