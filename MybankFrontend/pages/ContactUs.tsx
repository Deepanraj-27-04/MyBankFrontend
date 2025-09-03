import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ContactUs: React.FC = () => {
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! Our team will get back to you shortly.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">We're here to help you with any questions or concerns. Reach out to us through any of the methods below.</p>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">Customer Support</h3>
                        <p className="text-primary">support@pqrbank.com</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">Phone</h3>
                        <p className="text-primary">+1 (800) 123-4567</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">Head Office</h3>
                        <p className="text-gray-600 dark:text-gray-400">123 Finance Avenue, Metropolis, 10101</p>
                    </div>
                </div>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                 <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input type="text" id="name" required className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" id="email" required className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                        <textarea id="message" rows={5} required className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <Button type="submit" className="w-full" size="lg">Send Message</Button>
                    </div>
                </form>
            </Card>
        </div>
    </div>
  );
};

export default ContactUs;