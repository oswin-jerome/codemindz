<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Models\Attempt;
use App\Models\AttemptQuestion;
use App\Models\Exam;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function index(Exam $exam)
    {
        $attempt = $exam->attempts()->where("candidate_id", "=", auth("candidate")->id())->where("exam_id", "=", $exam->id)->first();
        // dd($attempt);
        return Inertia::render("Cand/ExamIntro", [
            "exam" => $exam,
            "already_attempted" => $exam->attempts()->where("candidate_id", "=", auth("candidate")->id())->where("exam_id", "=", $exam->id)->count() == 1,
            "attempt_completed" => $attempt != null && $attempt->finished_at != null,
        ]);
    }

    public function start_attempt(Exam $exam)
    {
        $attempt = $exam->attempts()->where("candidate_id", "=", auth("candidate")->id())->where("exam_id", "=", $exam->id)->first();

        if ($attempt) {
            return  redirect()->route("candidate.exam.exam", [$exam, $attempt]);
        }

        $attempt = $exam->attempts()->create([
            "candidate_id" => auth("candidate")->id(),
            "started_at" => Carbon::now()
        ]);

        foreach ($exam->questions as $key => $question) {
            $attempt->attemptQuestions()->create([
                "question_id" => $question->id
            ]);
        }

        return  redirect()->route("candidate.exam.exam", [$exam, $attempt]);
    }

    public function show_attempt(Exam $exam, Attempt $attempt)
    {
        if ($exam->id != $attempt->exam_id) {
            dd("Invalid attempt");
            return redirect()->back();
        }

        // return response()->json($attempt);

        return Inertia::render("Cand/Exam", [
            "questions" => $attempt->attemptQuestions()->with("question:id,question,options")->get(),
            "exam" => $exam,
            "attempt" => $attempt
        ]);
    }

    public function attempt_question(Exam $exam, Attempt $attempt, AttemptQuestion $attemptQuestion, Request $request)
    {
        $data = $request->validate([
            "answer" => "required|string"
        ]);

        $attemptQuestion->answer = $data['answer'];
        $attemptQuestion->save();

        return redirect()->back();
    }

    public function submit_attempt(Exam $exam, Attempt $attempt)
    {
        if ($attempt->finished_at != null) {
            throw ValidationException::withMessages([
                'message' => "Already Submitted",
            ]);
        }

        $attempt->finished_at = Carbon::now();
        $questions =  $attempt->attemptQuestions()->with("question")->get();

        $score = 0;
        foreach ($questions as $key => $ques) {
            if ($ques->answer == $ques->question->answer) {
                $score++;
            }
        }

        $attempt->score = $score;
        $attempt->save();


        return redirect()->route("candidate.exam.attempt", $exam);
    }
}
