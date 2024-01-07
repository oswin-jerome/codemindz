<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attempts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("candidate_id");
            $table->unsignedBigInteger("exam_id");
            $table->integer("score")->default(0);

            $table->dateTime("started_at");
            $table->dateTime("finished_at")->nullable();
            $table->boolean("malpracticed")->default(false);
            $table->string("malpracticed_reason")->nullable();


            $table->foreign("candidate_id")->references("id")->on("candidates");
            $table->foreign("exam_id")->references("id")->on("exams");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attempts');
    }
};
