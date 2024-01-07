<?php

namespace Database\Seeders;

use App\Models\Exam;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $e = Exam::first();
        $e->questions()->create([
            "question" => "How are you?",
            "options" => json_encode(["Fine", "OK", "BAD"]),
            "answer" => "OK"
        ]);
    }
}
