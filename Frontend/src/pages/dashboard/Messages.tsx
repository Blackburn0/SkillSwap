import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnterKey } from '@/hooks/useEnterKey';
import { ChevronLeft, Image, Phone, SendHorizonal } from 'lucide-react';

const initialMessages = [
  {
    text: 'Hey Liam! I wanted to give you an update on the trade. Everything is on schedule, and the documents have been reviewed thoroughly. Let me know if you have any questions before we proceed.',
    time: '10:30 AM',
    isPOV: true, // POV message
    sender: 'You',
    avatar: 'https://img.icons8.com/office/40/person-female.png',
  },
  {
    text: 'Thanks! I appreciate the update. I’ve gone through the details and everything seems to be in order. I’m particularly happy with how the timelines are structured and the contingencies you’ve included.',
    time: '10:31 AM',
    isPOV: false, // received
    sender: 'Liam',
    avatar: 'https://img.icons8.com/office/40/person-male.png',
  },
  {
    text: 'Great to hear! We should also schedule a follow-up call next week to finalize any pending items and make sure both sides are aligned before signing off.',
    time: '10:32 AM',
    isPOV: true,
    sender: 'You',
    avatar: 'https://img.icons8.com/office/40/person-female.png',
  },
  {
    text: 'Absolutely, that works for me. I’ll check my calendar and send over some proposed times so we can lock it in quickly without any conflicts.',
    time: '10:32 AM',
    isPOV: false,
    sender: 'Liam',
    avatar: 'https://img.icons8.com/office/40/person-male.png',
  },
  {
    text: 'Perfect! Once we finalize the timing, I’ll prepare a summary document for both parties to review and ensure nothing is missed.',
    time: '10:32 AM',
    isPOV: true,
    sender: 'You',
    avatar: 'https://img.icons8.com/office/40/person-female.png',
  },
  {
    text: 'Sounds excellent! I’ll wait for your proposed times and then we can confirm the follow-up. Thanks again for keeping everything so organized.',
    time: '10:32 AM',
    isPOV: false,
    sender: 'Liam',
    avatar: 'https://img.icons8.com/office/40/person-male.png',
  },
];

const Messages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [messageText, setMessageText] = useState('');

  // Ref to the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!messageText.trim()) return;

    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const timestamp = `${hours}:${minutes} ${ampm}`;

    const newMessage = {
      text: messageText,
      time: timestamp,
      isPOV: true,
      sender: 'You',
      avatar: 'https://img.icons8.com/office/40/person-female.png',
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText('');
  };

  useEnterKey(handleSend);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="mx-auto mb-2 flex h-[calc(100vh-70px)] max-w-xl flex-col justify-between">
      {/* Header */}
      <div className="relative flex items-center justify-center border-b-2 border-gray-200 pt-2 pb-4">
        <ChevronLeft
          size={28}
          className="absolute left-2 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="text-center">
          <h1 className="text-xl font-bold">Liam Harper</h1>
          <p className="text-sm font-semibold text-green-400">Online</p>
        </div>
        <Phone
          size={20}
          className="absolute right-3 cursor-pointer"
          onClick={() => navigate('')}
        />
      </div>

      {/* Body */}
      <div className="hide-scrollbar-vertical flex flex-col space-y-2 overflow-y-auto px-2 py-3">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col space-y-1">
            <div
              className={`flex items-end ${
                msg.isPOV ? 'justify-end' : 'justify-start'
              } space-x-2`}
            >
              {!msg.isPOV && (
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  className="h-8 w-8 rounded-full"
                />
              )}

              <div
                className={`max-w-[70%] p-3 text-sm ${
                  msg.isPOV
                    ? 'rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-lg bg-red-500 text-white'
                    : 'rounded-lg rounded-br-lg rounded-bl-none bg-gray-200 text-gray-900'
                } `}
              >
                {msg.text}
              </div>

              {msg.isPOV && (
                <img
                  src={msg.avatar}
                  alt="You"
                  className="h-8 w-8 rounded-full"
                />
              )}
            </div>

            <div
              className={`text-xs text-gray-400 ${
                msg.isPOV ? 'mr-10 text-right' : 'ml-10 text-left'
              }`}
            >
              {msg.time}
            </div>
          </div>
        ))}

        {/* Dummy div to scroll into view */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Message input */}
      <div className="flex items-center space-x-2 px-2 pt-2">
        <div className="flex flex-1 items-center rounded-full bg-gray-200 px-3 py-2">
          <input
            type="text"
            placeholder="Message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1 bg-transparent py-1 pl-2 outline-none"
          />
          <div className="flex w-10 items-center justify-center text-gray-500">
            <Image size={18} />
          </div>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white"
          onClick={handleSend}
        >
          <SendHorizonal size={18} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
