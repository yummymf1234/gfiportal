<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $users = User::all();
        
        return Inertia::render('admin-dashboard', [
            'users' => $users
        ]);
    }

    public function toggleUserStatus(Request $request, User $user)
    {
        $user->update([
            'is_active' => $request->boolean('is_active')
        ]);

        return back()->with('success', 'User status updated successfully.');
    }

    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,member',
            'company' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
        ]);

        $user->update($validated);

        return back()->with('success', 'User updated successfully.');
    }

    public function deleteUser(User $user)
    {
        // Prevent admin from deleting themselves
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }
}
