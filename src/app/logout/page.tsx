// app/logout/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include',
            });
            router.push('/');
        };

        logout();
    }, [router]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl">Je wordt uitgelogd...</p>
        </div>
    );
}
