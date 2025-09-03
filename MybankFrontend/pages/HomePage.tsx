
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { BuildingLibraryIcon, LockClosedIcon, PaperAirplaneIcon, ChartPieIcon, PhoneIcon } from '../components/ui/Icons';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
);


const HomePage: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <div className="bg-violet-50 dark:bg-slate-900 min-h-screen">
            <header className="fixed top-0 left-0 right-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link to="/" className="flex items-center">
                             <BuildingLibraryIcon className="h-8 w-8 text-primary-text" />
                             <span className="ml-2 text-2xl font-bold text-gray-800 dark:text-white">PQR Bank</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            {!user && (
                                <>
                                    <Link to="/login">
                                        <Button variant="secondary">Login</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button>Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
                     <div className="absolute inset-0 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1579621970795-87f54f12c5b0?q=80&w=2940" alt="Abstract background" className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-70"></div>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                            The Future of Banking is Here
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl opacity-90">
                            Experience seamless, secure, and smart banking with PQR Bank. Your financial goals, our priority.
                        </p>
                        <div className="mt-10">
                            <Link to="/register">
                                <Button size="lg" className="px-10 py-4">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white dark:bg-slate-800/50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose PQR Bank?</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                                We provide the tools you need to manage your money effectively.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <FeatureCard 
                                icon={<LockClosedIcon className="w-6 h-6" />}
                                title="Bank-Grade Security"
                                description="Your data and funds are protected with state-of-the-art encryption and security protocols."
                            />
                             <FeatureCard 
                                icon={<PaperAirplaneIcon className="w-6 h-6" />}
                                title="Easy Transfers"
                                description="Send and receive money instantly, pay bills, and manage your payments all in one place."
                            />
                             <FeatureCard 
                                icon={<ChartPieIcon className="w-6 h-6" />}
                                title="Financial Insights"
                                description="Track your spending, set budgets, and gain valuable insights with our smart analytics tools."
                            />
                             <FeatureCard 
                                icon={<PhoneIcon className="w-6 h-6" />}
                                title="24/7 Support"
                                description="Our dedicated support team is available around the clock to assist you with any questions."
                            />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-100 dark:bg-slate-800 py-8">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} PQR Bank. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;