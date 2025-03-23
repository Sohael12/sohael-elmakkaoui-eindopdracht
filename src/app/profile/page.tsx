"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, User, Mail, Lock } from "lucide-react"
import Navbar from "@/components/navigation"
import Footer from "@/components/footer"

export default function ProfilePage() {
    const [user, setUser] = useState({ name: "", email: "", password: "" })
    const [message, setMessage] = useState("")

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/me")
            if (res.ok) {
                const data = await res.json()
                setUser({ name: data.name, email: data.email, password: "" })
            }
        }
        fetchUser()
    }, [])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const res = await fetch("/api/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })

        const data = await res.json()
        if (res.ok) {
            setMessage("Profile updated successfully!")
        } else {
            setMessage(data.error || "Error updating profile")
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#0A0A1B]">
            <Navbar />
            <main className="flex-1 py-16">
                <div className="container max-w-4xl px-4 md:px-6 mx-auto">
                    <div className="mb-10 text-center sm:text-left">
                        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Profile Settings</h1>
                        <p className="text-gray-400 text-lg">Manage your account information and preferences</p>
                    </div>

                    <Card className="overflow-hidden border-0 shadow-lg bg-[#141428] text-white">
                        <CardHeader className="bg-primary/10 border-b border-gray-800 px-6 py-5">
                            <CardTitle className="text-xl text-white">Personal Information</CardTitle>
                            <CardDescription className="text-gray-400">
                                Update your personal details and account information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8">
                            {message && (
                                <Alert className="mb-6 border-green-500 bg-green-500/10 text-green-400">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <AlertDescription>{message}</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="name" className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                                            <User className="h-4 w-4 text-primary" />
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={user.name}
                                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                                            className="max-w-md bg-[#1C1C3A] border-gray-700 focus:border-primary focus:ring-primary"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="email" className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                                            <Mail className="h-4 w-4 text-primary" />
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={user.email}
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                            className="max-w-md bg-[#1C1C3A] border-gray-700 focus:border-primary focus:ring-primary"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="password" className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                                            <Lock className="h-4 w-4 text-primary" />
                                            New Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={user.password}
                                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                                            className="max-w-md bg-[#1C1C3A] border-gray-700 focus:border-primary focus:ring-primary"
                                            placeholder="Leave blank to keep current password"
                                        />
                                    </div>
                                </div>

                                <CardFooter className="flex justify-end px-0 pb-0 pt-4">
                                    <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
                                        Save Changes
                                    </Button>
                                </CardFooter>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}

