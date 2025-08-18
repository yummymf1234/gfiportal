<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('member-dashboard');
    }
}
