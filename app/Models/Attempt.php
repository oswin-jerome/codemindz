<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attempt extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function attemptQuestions()
    {

        return $this->hasMany(AttemptQuestion::class, "attempt_id", "id");
    }
}
