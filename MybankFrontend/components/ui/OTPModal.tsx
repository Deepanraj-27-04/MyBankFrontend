
import React, { useState, useRef, KeyboardEvent } from 'react';
import Button from './Button';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ isOpen, onClose, onVerify }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  if (!isOpen) return null;

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
          inputsRef.current[index-1]?.focus();
      }
  }

  const handleSubmit = () => {
    const finalOtp = otp.join('');
    if (finalOtp.length === 6) {
      onVerify(finalOtp);
    } else {
      alert('Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Enter OTP</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          A 6-digit code has been sent to your registered mobile number.
        </p>
        <div className="flex justify-center gap-2 md:gap-4 my-8">
          {otp.map((data, index) => (
            <input
              key={index}
              ref={el => { inputsRef.current[index] = el; }}
              className="w-12 h-14 text-center text-2xl font-semibold border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              maxLength={1}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={handleSubmit} size="lg">Verify Transaction</Button>
          <Button onClick={onClose} variant="secondary">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;