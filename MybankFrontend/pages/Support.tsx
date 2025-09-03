import React, { useState } from 'react';
import Card from '../components/ui/Card';

const faqs = [
    {
      question: 'How do I open a new account?',
      answer: 'You can open a new account by navigating to the "Accounts" page and clicking the "Add New Account" button. You will be guided through the necessary steps and required documentation.',
    },
    {
      question: 'How can I reset my password?',
      answer: 'To reset your password, click on the "Forgot your password?" link on the login page. You will receive an email with instructions on how to set a new password for your account.',
    },
    {
      question: 'What are the transaction fees?',
      answer: 'Most standard transactions, such as transfers between your own accounts and bill payments, are free. For a detailed list of fees for services like wire transfers, please refer to our official fee schedule document available in the "Documents" section.',
    },
    {
      question: 'Is my money safe with PQR Bank?',
      answer: 'Absolutely. We use state-of-the-art encryption and security protocols to protect your data and funds. All deposits are also FDIC insured up to the legal limit.',
    },
];

const FAQItem = ({ faq, isOpen, onClick }: { faq: any, isOpen: boolean, onClick: () => void }) => (
    <div className="border-b border-gray-200 dark:border-slate-700 py-4">
      <button
        className="flex justify-between items-center w-full text-lg font-semibold text-left"
        onClick={onClick}
      >
        <span className="text-gray-800 dark:text-gray-200">{faq.question}</span>
        <svg className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600 dark:text-gray-400">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
);

const Support: React.FC = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <h1 className="text-3xl font-bold mb-2">Support Center</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Find answers to common questions below. If you still need help, please visit our Contact Us page.</p>

                <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                <div>
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        faq={faq}
                        isOpen={openFAQ === index}
                        onClick={() => toggleFAQ(index)}
                    />
                ))}
                </div>
            </Card>
        </div>
    );
};

export default Support;