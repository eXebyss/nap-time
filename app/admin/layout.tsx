import { AuthContextProvider } from '@/context/AuthContext';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <body>
            <AuthContextProvider>{children}</AuthContextProvider>
        </body>
    );
}
