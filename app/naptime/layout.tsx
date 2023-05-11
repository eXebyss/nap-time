import { NapTimeContextProvider } from '@/components/NapTimeList';

export default function NapTimeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <NapTimeContextProvider>{children}</NapTimeContextProvider>;
}
