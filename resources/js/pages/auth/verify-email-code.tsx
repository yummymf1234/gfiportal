import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';

interface Props {
    email: string;
    status?: string;
}

export default function VerifyEmailCode({ email, status }: Props) {
    const [code, setCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) {
            // Handle paste
            const pastedCode = value.slice(0, 6);
            setCode(pastedCode);
            
            // Fill inputs
            for (let i = 0; i < 6; i++) {
                if (inputRefs.current[i]) {
                    inputRefs.current[i]!.value = pastedCode[i] || '';
                }
            }
            
            // Focus last filled input
            const lastIndex = Math.min(pastedCode.length - 1, 5);
            inputRefs.current[lastIndex]?.focus();
            return;
        }

        // Single character input
        if (value.match(/^\d*$/)) {
            const newCode = code.split('');
            newCode[index] = value;
            const updatedCode = newCode.join('');
            setCode(updatedCode);

            // Auto-focus next input
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <AuthLayout 
            title="Verify your email" 
            description={`We've sent a 6-digit verification code to ${email}`}
        >
            <Head title="Email verification" />

            {status === 'verification-code-sent' && (
                <div className="mb-6 text-center text-sm font-medium text-green-600">
                    A verification code has been sent to your email address.
                </div>
            )}

            {status === 'verification-code-resent' && (
                <div className="mb-6 text-center text-sm font-medium text-green-600">
                    A new verification code has been sent to your email address.
                </div>
            )}

            <Form
                method="post"
                action={route('verification.verify')}
                className="space-y-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-4">
                            <div className="grid grid-cols-6 gap-3 max-w-xs mx-auto">
                                {[...Array(6)].map((_, index) => (
                                    <Input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        maxLength={6}
                                        className="text-center text-lg font-semibold h-12 w-12"
                                        onChange={(e) => handleCodeChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        disabled={processing}
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>
                            
                            <input type="hidden" name="code" value={code} />
                            <InputError message={errors.code} className="text-center" />
                        </div>

                        <div className="text-center space-y-4">
                            <Button 
                                type="submit" 
                                disabled={processing || code.length !== 6}
                                className="w-full"
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                Verify Code
                            </Button>

                            {timeLeft > 0 ? (
                                <p className="text-sm text-neutral-600">
                                    Code expires in {formatTime(timeLeft)}
                                </p>
                            ) : (
                                <p className="text-sm text-red-600">
                                    Code has expired. Please request a new one.
                                </p>
                            )}
                        </div>
                    </>
                )}
            </Form>

            <div className="mt-6 space-y-4 text-center">
                <Form method="post" action={route('verification.resend')}>
                    {({ processing }) => (
                        <Button 
                            type="submit" 
                            variant="ghost" 
                            disabled={processing}
                            className="text-sm"
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Resend verification code
                        </Button>
                    )}
                </Form>

                <TextLink href={route('logout')} method="post" className="text-sm">
                    Use a different email address
                </TextLink>
            </div>
        </AuthLayout>
    );
}