<?php

use App\Http\Controllers\Candidate\DashboardController;
use App\Http\Controllers\Candidate\ExamController as CandidateExamController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::prefix("admin")->middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::resource("exams", ExamController::class);
    Route::put("{exam}/add_question", [ExamController::class, 'add_question'])->name("exams.add_question");

    Route::resource("candidates", CandidateController::class);
});



Route::prefix("candidate")->middleware("auth:candidate")->group(
    function () {
        Route::get("/", [DashboardController::class, "index"])->name("candidate.dashboard");
        Route::get("{exam}", [CandidateExamController::class, "index"])->name("candidate.exam");
        Route::post("{exam}", [CandidateExamController::class, "start_attempt"])->name("candidate.exam.attempt");
        Route::get("{exam}/{attempt}", [CandidateExamController::class, "show_attempt"])->name("candidate.exam.exam");
        Route::put("{exam}/{attempt}", [CandidateExamController::class, "submit_attempt"])->name("candidate.attempt.submit");
        Route::put("{exam}/{attempt}/{attemptQuestion}", [CandidateExamController::class, "attempt_question"])->name("candidate.exam.attempt_question");
    }
);
require __DIR__ . '/auth.php';
