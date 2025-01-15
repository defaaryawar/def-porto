"use client";

import { useState } from "react";
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ChatWithMe = () => {
    const [showChat, setShowChat] = useState(false);
    const [message, setMessage] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    const closeChat = () => setShowChat(false);

    const phoneNumber = "6281219147116";

    const sendMessageToWhatsApp = () => {
        if (!message.trim()) return;
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, '_blank');
    };

    // Animation variants
    const buttonVariants = {
        hover: {
            scale: 1.1,
            rotate: [0, -10, 10, -10, 0],
            transition: {
                duration: 0.3,
                rotate: {
                    repeat: 0,
                    duration: 0.5
                }
            }
        },
        tap: {
            scale: 0.95
        }
    };

    const chatVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 20,
            x: 20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            transition: {
                type: "spring",
                duration: 0.5
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 20,
            x: 20,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <>
            <motion.div
                className="fixed bottom-5 right-5 z-50"
                initial={false}
                animate={isHovered ? "hover" : "initial"}
                variants={buttonVariants}
                whileTap="tap"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <button
                    onClick={toggleChat}
                    className="relative group flex items-center justify-center w-14 h-14 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full shadow-lg hover:shadow-indigo-500/25 hover:shadow-xl transition-all duration-300"
                    aria-label="Chat with me"
                >
                    <FaWhatsapp className="text-3xl text-white" />
                    {!showChat && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full"
                        />
                    )}
                </button>
            </motion.div>

            <AnimatePresence>
                {showChat && (
                    <motion.div
                        variants={chatVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed bottom-24 right-5 w-80 md:w-96 bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl shadow-black/50 z-40 overflow-hidden border border-gray-800"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-violet-500 to-indigo-600 p-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <FaWhatsapp className="text-2xl text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">Chat with Me</h2>
                                        <p className="text-xs text-white/80">Usually replies instantly</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeChat}
                                    className="text-white/80 hover:text-white transition-colors p-2"
                                    aria-label="Close chat"
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>
                        </div>

                        {/* Chat Content */}
                        <div className="p-4 bg-gradient-to-b from-gray-900 to-black">
                            <div className="mb-4">
                                <div className="inline-block bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50">
                                    <p className="text-gray-200">Hi there! 👋</p>
                                    <p className="text-gray-200">How can I help you today?</p>
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="space-y-3">
                                <textarea
                                    className="w-full p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 text-gray-200 placeholder-gray-400 focus:border-violet-500 focus:ring focus:ring-violet-500/20 transition-all resize-none"
                                    placeholder="Type your message here..."
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={sendMessageToWhatsApp}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-violet-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <span>Send Message</span>
                                    <FaPaperPlane className="text-sm" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWithMe;