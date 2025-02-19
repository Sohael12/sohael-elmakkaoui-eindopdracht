"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

export default function ContactForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the form data to your backend
        console.log("Form submitted:", { name, email, message })
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-green-800 text-white p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-4">Thank you for your message!</h2>
                <p>We'll get back to you as soon as possible.</p>
            </motion.div>
        )
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 p-6 rounded-lg shadow-lg"
        >
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                ></textarea>
            </div>
            <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#FFD700] text-black font-bold py-2 px-4 rounded-md hover:bg-[#FFC700] transition duration-300 flex items-center justify-center"
            >
                <Send className="mr-2" size={18} />
                Send Message
            </motion.button>
        </motion.form>
    )
}

