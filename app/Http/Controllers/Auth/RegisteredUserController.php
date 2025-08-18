<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Otp\EmailVerificationOtp;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use SadiqSalau\LaravelOtp\Facades\Otp;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'country' => $request->country,
            'company' => $request->company,
            'job_title' => $request->job_title,
            'password' => Hash::make($request->password),
            // Don't verify email immediately - let OTP handle it
        ]);

        event(new Registered($user));

        // Store email in session for verification process
        $request->session()->put('verification_email', $request->email);

        // Send OTP verification code
        $result = Otp::identifier($request->email)->send(
            new EmailVerificationOtp($request->email),
            Notification::route('mail', $request->email)
        );

        if ($result['status'] === Otp::OTP_SENT) {
            return redirect()->route('verification.code.show')
                ->with('status', 'verification-code-sent');
        }

        // If OTP sending fails, log the user in and redirect to dashboard
        Auth::login($user);
        return redirect()->intended(route('dashboard', absolute: false))
            ->withErrors(['email' => 'Registration successful, but verification email could not be sent.']);
    }
}
