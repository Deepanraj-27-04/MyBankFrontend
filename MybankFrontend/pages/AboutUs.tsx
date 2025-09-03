import React from 'react';
import Card from '../components/ui/Card';
import { BanknotesIcon } from '../components/ui/Icons';

const AboutUs: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
        <Card>
            <div className="text-center py-8">
                <BanknotesIcon className="h-16 w-16 text-primary mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">About PQR Bank</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Your Partner in Financial Empowerment.
                </p>
            </div>
        </Card>
        
        <Card>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                At PQR Bank, we are more than just a financial institution; we are your dedicated partner in navigating the complexities of the modern financial world. Founded on the principles of trust, innovation, and unwavering customer-centricity, our mission is to empower individuals and businesses to achieve their financial aspirations with confidence and ease. We strive to deliver secure, intuitive, and accessible banking solutions that simplify financial management and foster growth.
            </p>
        </Card>

        <Card>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our vision is to redefine the digital banking experience by building a platform that is not only technologically advanced but also deeply human. We envision a future where banking is seamlessly integrated into everyday life, where financial tools are proactive and personalized, and where every customer feels understood and valued. We are committed to continuous innovation, aiming to be at the forefront of financial technology while maintaining the highest standards of security and reliability.
            </p>
        </Card>

        <Card>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Customer First:</strong> Your needs are at the core of everything we do. We listen, we adapt, and we deliver.</li>
                <li><strong>Integrity:</strong> We operate with complete transparency and uphold the highest ethical standards in all our dealings.</li>
                <li><strong>Innovation:</strong> We embrace change and leverage technology to create smarter, more efficient banking solutions.</li>
                <li><strong>Security:</strong> We are relentlessly committed to protecting your data and your assets with state-of-the-art security measures.</li>
                <li><strong>Excellence:</strong> We pursue the highest quality in our products, services, and support, ensuring a superior banking experience.</li>
            </ul>
        </Card>
    </div>
  );
};

export default AboutUs;