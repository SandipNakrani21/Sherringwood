import './globals.css';
import NavigationBehavior from '../components/NavigationBehavior';

export const metadata = {
  title: 'Sherringwood World School | Design Collection',
  description: 'Explore three homepage design directions for Sherringwood World School.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><NavigationBehavior />{children}</body></html>;
}
