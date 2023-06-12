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
    | { type: 'setSelectedYear'; payload: string }
    | { type: 'setSelectedMonth'; payload: string }
    | { type: 'setFilteredNapTimeYear'; payload: NapTimeData[] }
    | { type: 'setFilteredNapTimeMonth'; payload: NapTimeData[] | null }
    | { type: 'setTotalNapTimeYear'; payload: string | null }
    | { type: 'setTotalNapTimeMonth'; payload: string | null }
    | { type: 'setAverageNapTimeMonth'; payload: string | null };

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
