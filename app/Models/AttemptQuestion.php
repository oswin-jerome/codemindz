<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttemptQuestion extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function question()
    {

        return $this->hasOne(Question::class, "id", "question_id");
    }

    public function attempt()
    {

        return $this->hasOne(Attempt::class, "id", "attempt_id");
    }
}
