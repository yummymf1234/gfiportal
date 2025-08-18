<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Otp\EmailVerificationOtp;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Inertia\Response;
use SadiqSalau\LaravelOtp\Facades\Otp;

class EmailVerificationController extends Controller
{
    /**
     * Show the email verification code input page.
     */
    public function show(Request $request): Response
    {
        return Inertia::render('auth/verify-email-code', [
            'email' => $request->user()->email ?? $request->session()->get('verification_email'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Send verification code to user's email.
     */
    public function send(Request $request): RedirectResponse
    {
        $email = $request->user() ? $request->user()->email : $request->session()->get('verification_email');
        
        if (!$email) {
            return redirect()->route('register');
        }

        $result = Otp::identifier($email)->send(
            new EmailVerificationOtp($email),
            Notification::route('mail', $email)
        );

        if ($result['status'] === Otp::OTP_SENT) {
            return back()->with('status', 'verification-code-sent');
        }

        return back()->withErrors(['email' => 'Failed to send verification code.']);
    }

    /**
     * Verify the email using the provided code.
     */
    public function verify(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'string', 'size:6'],
        ]);

        $email = $request->user() ? $request->user()->email : $request->session()->get('verification_email');
        
        if (!$email) {
            return redirect()->route('register');
        }

        $result = Otp::identifier($email)->attempt($request->code);

        if ($result['status'] === Otp::OTP_PROCESSED) {
            // Clear the verification email from session
            $request->session()->forget('verification_email');
            
            // If user is not logged in, log them in
            if (!$request->user() && $result['result']) {
                Auth::login($result['result']);
            }

            return redirect()->intended(route('dashboard', absolute: false));
        }

        // Handle different error types
        $errorMessage = match ($result['status']) {
            Otp::OTP_EMPTY => 'No verification code found. Please request a new code.',
            Otp::OTP_MISMATCHED => 'Invalid verification code. Please try again.',
            default => 'Verification failed. Please try again.',
        };

        return back()->withErrors(['code' => $errorMessage]);
    }

    /**
     * Resend verification code.
     */
    public function resend(Request $request): RedirectResponse
    {
        $email = $request->user() ? $request->user()->email : $request->session()->get('verification_email');
        
        if (!$email) {
            return redirect()->route('register');
        }

        $result = Otp::identifier($email)->update();

        if ($result['status'] === Otp::OTP_SENT) {
            return back()->with('status', 'verification-code-resent');
        }

        return back()->withErrors(['email' => 'Failed to resend verification code.']);
    }
}
