<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
            'company' => 'GFI Portal',
            'job_title' => 'System Administrator',
            'email_verified_at' => now(),
        ]);

        // Create active member user
        User::create([
            'name' => 'John Doe',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
            'role' => 'member',
            'is_active' => true,
            'company' => 'Tech Corp',
            'job_title' => 'Software Developer',
            'email_verified_at' => now(),
        ]);

        // Create inactive member user (for testing login restriction)
        User::create([
            'name' => 'Jane Smith',
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'password' => Hash::make('password'),
            'role' => 'member',
            'is_active' => false,
            'company' => 'Design Studio',
            'job_title' => 'UI/UX Designer',
            'email_verified_at' => now(),
        ]);

        // Create another active member
        User::create([
            'name' => 'Bob Wilson',
            'first_name' => 'Bob',
            'last_name' => 'Wilson',
            'email' => 'bob@example.com',
            'password' => Hash::make('password'),
            'role' => 'member',
            'is_active' => true,
            'company' => 'Marketing Inc',
            'job_title' => 'Marketing Manager',
            'email_verified_at' => now(),
        ]);
    }
}
