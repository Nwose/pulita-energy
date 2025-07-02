import '../src/index.css';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

export const metadata = {
    title: 'Pulita Energy',
    description: 'Pulita Energy website',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
} 