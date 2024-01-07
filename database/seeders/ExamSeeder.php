<?php

namespace Database\Seeders;

use App\Models\Exam;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Exam::create([
            "title" => fake()->realText(15),
            "starts_at" => Carbon::now(),
            "instructions" => fake()->text(),
            "ends_at" => Carbon::now()
        ]);
    }
}
