"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch("/api/me");
                if (!res.ok) throw new Error("Failed to fetch user data");

                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User not found or not authenticated.</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
}
