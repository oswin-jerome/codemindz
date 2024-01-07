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
        Schema::create('attempt_questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("attempt_id");
            $table->unsignedBigInteger("question_id");
            $table->string("answer")->nullable();

            $table->string("result")->nullable();

            $table->foreign("attempt_id")->references("id")->on("attempts");
            $table->foreign("question_id")->references("id")->on("questions");


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attempt_questions');
    }
};
