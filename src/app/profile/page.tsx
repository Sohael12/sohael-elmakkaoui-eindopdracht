"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, User, Mail, Lock } from "lucide-react"
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";
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
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-muted/40 py-12 pt-24">
                <div className="container max-w-4xl px-4 md:px-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
                        <p className="text-muted-foreground">Manage your account information and preferences</p>
                    </div>

                    <Card className="overflow-hidden">
                        <CardHeader className="bg-primary/5">
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details and account information</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {message && (
                                <Alert className="mb-6 border-green-500 bg-green-50 text-green-700">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <AlertDescription>{message}</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={user.name}
                                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                                            className="max-w-md"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={user.email}
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                            className="max-w-md"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="flex items-center gap-2">
                                            <Lock className="h-4 w-4 text-muted-foreground" />
                                            New Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={user.password}
                                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                                            className="max-w-md"
                                            placeholder="Leave blank to keep current password"
                                        />
                                    </div>
                                </div>

                                <CardFooter className="flex justify-end px-0 pb-0">
                                    <Button type="submit" className="w-full sm:w-auto">
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

