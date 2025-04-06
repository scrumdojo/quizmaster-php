<?php

namespace App\Service;

use App\Entity\Answer;
use App\Entity\QuizQuestion;
use App\Model\QuizQuestionApiModel;

class QuizQuestionMapper
{
    // Maps Entity -> API Model
    public function mapEntityToApiModel(QuizQuestion $question): QuizQuestionApiModel
    {
        $model = new QuizQuestionApiModel();
        $model->id = $question->getId();
        $model->question = $question->getQuestion();
        $model->questionExplanation = $question->getQuestionExplanation();

        $answers = [];
        $explanations = [];
        $correctAnswers = [];

        $answerIndex = 0;
        // Use getAnswers() which returns a PersistentCollection
        foreach ($question->getAnswers() as $answer) {
            $answers[] = $answer->getText();
            $explanations[] = $answer->getExplanation() ?? ''; // Provide default if null
            if ($answer->isIsCorrect()) {
                $correctAnswers[] = $answerIndex;
            }
            $answerIndex++;
        }

        $model->answers = $answers;
        $model->explanations = $explanations;
        $model->correctAnswers = $correctAnswers;

        return $model;
    }

    // Maps API Model -> Entity (for create/update)
    public function mapApiModelToEntity(QuizQuestionApiModel $model, QuizQuestion $entity): QuizQuestion
    {
        $entity->setQuestion($model->question);
        $entity->setQuestionExplanation($model->questionExplanation);

        // Manage the Answer collection
        // Strategy: Clear existing answers, then add new ones based on the API model.
        $entity->getAnswers()->clear(); // Clear the collection directly

        $correctIndices = array_flip($model->correctAnswers); // Flip for easy 0-based index lookup

        foreach ($model->answers as $index => $text) {
            $answer = new Answer();
            $answer->setText($text);
            $answer->setExplanation($model->explanations[$index] ?? null);
            $answer->setIsCorrect(isset($correctIndices[$index]));
            $entity->addAnswer($answer);
        }

        return $entity;
    }
}
