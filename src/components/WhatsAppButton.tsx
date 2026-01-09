import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
    const phoneNumber = "0401700033";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Chat on WhatsApp"
        >
            <div className="relative">
                {/* Pulsing animation ring */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>

                {/* Main button */}
                <div className="relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                    <MessageCircle className="w-7 h-7 text-white" />
                </div>

                {/* Tooltip */}
                <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap shadow-lg">
                        <span className="text-sm font-medium">Chat with us on WhatsApp</span>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default WhatsAppButton;
