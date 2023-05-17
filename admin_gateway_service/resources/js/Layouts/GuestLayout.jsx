import StrangeDomainLogo from '@/Components/StrangeDomainLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="w-full sm:max-w-md mt-6 px-6 py-10 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <Link href="/">
                    <StrangeDomainLogo className="w-20 h-20 fill-current text-gray-500" />
                    <h2 className="text-center text-gray-600 text-sm mb-6"><span className="font-bold">STRANGE</span>DOMAIN</h2>
                </Link>
                
                {children}
            </div>
        </div>
    );
}
