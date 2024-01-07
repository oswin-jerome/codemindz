<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginCandidateRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateAuthController extends Controller
{
    public function login_form()
    {

        return Inertia::render("Auth/CandidateLogin");
    }

    public function store(LoginCandidateRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        // FIXME: redirect to user page
        return redirect()->intended("/");
    }
}
