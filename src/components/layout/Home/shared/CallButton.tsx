// components/WhatsAppButton.tsx

'use client';

import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '8801342106348'; // Your WhatsApp number without +
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[20px] left-auto right-4 sm:right-[170px] z-40 bg-[#25D366] hover:bg-[#1da851] text-white p-3.5 shadow-md transition-colors duration-300 rounded-full flex items-center justify-center"
      aria-label="WhatsApp Support"
    >
      <FaWhatsapp className="h-5 w-5" />
    </a>
  );
}; 

export default WhatsAppButton;
