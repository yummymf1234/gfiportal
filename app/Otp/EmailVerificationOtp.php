<?php

namespace App\Otp;

use App\Models\User;
use SadiqSalau\LaravelOtp\Contracts\OtpInterface as Otp;

class EmailVerificationOtp implements Otp
{
    /**
     * Constructs Otp class
     */
    public function __construct(
        public string $email
    ) {
        //
    }

    /**
     * Processes the Otp
     *
     * @return User|null
     */
    public function process()
    {
        $user = User::where('email', $this->email)->first();
        
        if ($user) {
            $user->email_verified_at = now();
            $user->save();
            
            return $user;
        }
        
        return null;
    }
}
