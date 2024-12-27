"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const ChatWithMe = () => {
    const [showChat, setShowChat] = useState(false);
    const [message, setMessage] = useState("");  // State untuk pesan

    const toggleChat = () => {
        setShowChat(!showChat); // Menampilkan atau menyembunyikan chat
    };

    const closeChat = () => setShowChat(false);

    // Ganti dengan nomor WhatsApp Anda
    const phoneNumber = "6281219147116";

    // URL WhatsApp dengan pesan
    const sendMessageToWhatsApp = () => {
        const encodedMessage = encodeURIComponent(message);  // Encode pesan untuk URL
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.location.href = url;
    };

    return (
        <>
            {/* Tombol Chat dengan ikon pesan */}
            <div
                className="fixed bottom-5 right-5 bg-transparent p-3 rounded-full shadow-lg cursor-pointer hover:bg-color-secondary hover:text-gray-50 text-color-secondary transition-all border-2 border-color-secondary"
                onClick={toggleChat}
                title="Chat with me"
                aria-label="Toggle chat"
            >
            <FaWhatsapp className="text-2xl"/>
            </div>

            {/* Popup Chat jika tombol ditekan */}
            {showChat && (
                <div className="fixed bottom-20 right-5 w-80 h-80 md:w-96 md:h-96 bg-white shadow-lg rounded-lg z-50 p-4 transition-transform transform ease-in-out duration-300">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Chat with Me</h2>
                        <button
                            className="text-xl text-gray-500 hover:text-gray-700 font-semibold hover:scale-125 duration-300 transition-all"
                            onClick={closeChat}
                            aria-label="Close chat"
                        >
                            X
                        </button>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">Feel free to ask me anything!</p>
                        {/* Implementasikan chat form atau API */}
                        <textarea
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color-secondary"
                            placeholder="Type your message..."
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}  // Mengupdate state message
                        />
                        <button
                            className="mt-2 w-full bg-color-secondary text-white p-2 rounded-md hover:bg-yellow-500"
                            onClick={sendMessageToWhatsApp}  // Mengirim pesan ke WhatsApp
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWithMe;
