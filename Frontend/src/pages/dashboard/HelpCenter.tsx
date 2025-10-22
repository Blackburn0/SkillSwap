import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How do I list my skills?',
    answer:
      'Go to your profile, tap on "Add Skill," and fill in the skill name, description, and proficiency level. Save to make it visible to others.',
  },
  {
    question: 'How do I find a skill to trade?',
    answer:
      'Use the Browse tab to explore available skills from other users. Filter by category or location to find the perfect match.',
  },
  {
    question: 'How do I schedule a trade?',
    answer:
      'Once you’ve matched with a user, open Messages to agree on a schedule and confirm the trade directly from the chat.',
  },
  {
    question: 'Is my personal information safe?',
    answer:
      'Yes. Your personal data is protected and only shared when necessary for skill exchanges, according to our privacy policy.',
  },
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex items-center px-6 py-4 border-b border-gray-200 bg-white">
        <button
          onClick={() => window.history.back()}
          className="text-gray-700 font-medium text-base"
        >
          ←
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold">Help Center</h1>
        <div className="w-5" /> {/* spacing placeholder for alignment */}
      </header>

      {/* Main Section */}
      <section className="flex-1 px-6 py-8 max-w-xl mx-auto w-full">
        <h2 className="text-2xl font-semibold mb-6">Common Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between items-center w-full px-4 py-4 text-left"
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp size={18} className="text-gray-600" />
                ) : (
                  <ChevronDown size={18} className="text-gray-600" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HelpCenter;
