<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExamRequest;
use App\Http\Requests\StoreQuestionRequest;
use App\Models\Exam;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Exam/ExamList", [
            "exams" => Exam::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Exam/CreateExam");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExamRequest $request)
    {
        $data =  $request->validated();
        $exam = Exam::create($data);

        return redirect()->route("exams.show", $exam);
    }

    public function add_question(StoreQuestionRequest $request, Exam $exam)
    {

        $data = $request->validated();

        $exam->questions()->create($data);


        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        // return response()->json(Exam::with("questions")->find($exam->id));
        return Inertia::render("Exam/ShowExam", [
            "exam" => Exam::with("questions")->find($exam->id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        //
    }
}
