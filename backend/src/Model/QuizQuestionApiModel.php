<?php

namespace App\Model;

/**
 * Represents the QuizQuestion structure expected by the API/frontend.
 */
class QuizQuestionApiModel
{
    public ?int $id = null;
    public ?string $question = null;
    public array $answers = []; // Array of strings
    public array $explanations = []; // Array of strings
    public ?string $questionExplanation = null;
    public array $correctAnswers = []; // Array of integers (indices)
}
