import Footer from '@/components/UI/Footer/Footer';
import './global.css';
import { AuthContextProvider, FirestoreContextProvider } from '@/context';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="light">
            <head />
            <body>
                <AuthContextProvider>
                    <FirestoreContextProvider>
                        {children}
                    </FirestoreContextProvider>
                </AuthContextProvider>
                <Footer />
            </body>
        </html>
    );
}
