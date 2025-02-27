"use client"

import type React from "react"

import {useState} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {Send, User, Mail, MessageSquare, Loader2, CheckCircle, AlertCircle} from "lucide-react"

const SUBJECTS = ["General Inquiry", "Technical Support", "Content Request", "Bug Report", "Business Proposal", "Other"]

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState("")

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!formData.subject) {
            newErrors.subject = "Please select a subject"
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required"
        } else if (formData.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters long"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitError("")

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setSubmitted(true)
        } catch (error) {
            setSubmitError("Failed to send message. Please try again later.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <motion.div
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl border border-yellow-500/20"
            >
                <div className="flex flex-col items-center text-center space-y-4">
                    <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{delay: 0.2, type: "spring", stiffness: 200}}
                    >
                        <CheckCircle className="w-16 h-16 text-yellow-400"/>
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white">Message Sent Successfully!</h2>
                    <p className="text-gray-300 max-w-md">
                        Thank you for reaching out! We'll review your message and get back to you as soon as possible.
                    </p>
                    <button
                        onClick={() => {
                            setSubmitted(false)
                            setFormData({name: "", email: "", subject: "", message: ""})
                        }}
                        className="mt-6 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition duration-300"
                    >
                        Send Another Message
                    </button>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="max-w-2xl mx-auto"
        >
            <div
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl border border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <User className="w-4 h-4 mr-2 text-yellow-500"/>
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className={`w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 ${
                                errors.name ? "border-red-500 border" : "border border-gray-600"
                            }`}
                            placeholder="John Doe"
                        />
                        <AnimatePresence>
                            {errors.name && (
                                <motion.p
                                    initial={{opacity: 0, height: 0}}
                                    animate={{opacity: 1, height: "auto"}}
                                    exit={{opacity: 0, height: 0}}
                                    className="text-red-400 text-sm mt-1 flex items-center"
                                >
                                    <AlertCircle className="w-4 h-4 mr-1"/>
                                    {errors.name}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <Mail className="w-4 h-4 mr-2 text-yellow-500"/>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={`w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 ${
                                errors.email ? "border-red-500 border" : "border border-gray-600"
                            }`}
                            placeholder="john@example.com"
                        />
                        <AnimatePresence>
                            {errors.email && (
                                <motion.p
                                    initial={{opacity: 0, height: 0}}
                                    animate={{opacity: 1, height: "auto"}}
                                    exit={{opacity: 0, height: 0}}
                                    className="text-red-400 text-sm mt-1 flex items-center"
                                >
                                    <AlertCircle className="w-4 h-4 mr-1"/>
                                    {errors.email}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Subject Field */}
                    <div>
                        <label htmlFor="subject" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <MessageSquare className="w-4 h-4 mr-2 text-yellow-500"/>
                            Subject
                        </label>
                        <select
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            className={`w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 ${
                                errors.subject ? "border-red-500 border" : "border border-gray-600"
                            }`}
                        >
                            <option value="">Select a subject</option>
                            {SUBJECTS.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                        <AnimatePresence>
                            {errors.subject && (
                                <motion.p
                                    initial={{opacity: 0, height: 0}}
                                    animate={{opacity: 1, height: "auto"}}
                                    exit={{opacity: 0, height: 0}}
                                    className="text-red-400 text-sm mt-1 flex items-center"
                                >
                                    <AlertCircle className="w-4 h-4 mr-1"/>
                                    {errors.subject}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Message Field */}
                    <div>
                        <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <MessageSquare className="w-4 h-4 mr-2 text-yellow-500"/>
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            rows={6}
                            className={`w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 ${
                                errors.message ? "border-red-500 border" : "border border-gray-600"
                            }`}
                            placeholder="Write your message here..."
                        />
                        <div className="flex justify-between items-center mt-1">
                            <AnimatePresence>
                                {errors.message && (
                                    <motion.p
                                        initial={{opacity: 0, height: 0}}
                                        animate={{opacity: 1, height: "auto"}}
                                        exit={{opacity: 0, height: 0}}
                                        className="text-red-400 text-sm flex items-center"
                                    >
                                        <AlertCircle className="w-4 h-4 mr-1"/>
                                        {errors.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            <span className="text-sm text-gray-400">{formData.message.length} / 1000 characters</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 px-6 rounded-lg 
              hover:from-yellow-400 hover:to-yellow-500 transition duration-300 flex items-center justify-center
              disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin"/>
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-2"/>
                                Send Message
                            </>
                        )}
                    </motion.button>

                    {/* Submit Error */}
                    <AnimatePresence>
                        {submitError && (
                            <motion.div
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                className="text-red-400 text-sm text-center"
                            >
                                {submitError}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </motion.div>
    )
}

