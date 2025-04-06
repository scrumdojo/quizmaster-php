<?php

namespace App\Tests\Service;

use App\Entity\Answer;
use App\Entity\QuizQuestion;
use App\Model\QuizQuestionApiModel;
use App\Service\QuizQuestionMapper;
use Doctrine\Common\Collections\ArrayCollection;
use PHPUnit\Framework\TestCase;
use ReflectionProperty;

class QuizQuestionMapperTest extends TestCase
{
    private QuizQuestionMapper $mapper;

    protected function setUp(): void
    {
        parent::setUp();
        $this->mapper = new QuizQuestionMapper();
    }

    public function testMapEntityToApiModel(): void
    {
        // Arrange
        $questionEntity = new QuizQuestion();
        $questionEntity->setQuestion('Test Question Text');
        $questionEntity->setQuestionExplanation('Test Explanation Text');

        $questionEntity->addAnswer($this->createAnswer('Answer 1', 'Expl 1', false));
        $questionEntity->addAnswer($this->createAnswer('Answer 2', null,     true));
        $questionEntity->addAnswer($this->createAnswer('Answer 3', 'Expl 3', true));

        // Act
        $apiModel = $this->mapper->mapEntityToApiModel($questionEntity);

        // Assert
        $this->assertInstanceOf(QuizQuestionApiModel::class, $apiModel);
        $this->assertEquals('Test Question Text', $apiModel->question);
        $this->assertEquals('Test Explanation Text', $apiModel->questionExplanation);
        $this->assertEquals(['Answer 1', 'Answer 2', 'Answer 3'], $apiModel->answers);
        $this->assertEquals(['Expl 1', '', 'Expl 3'], $apiModel->explanations);
        $this->assertEquals([1, 2], $apiModel->correctAnswers); // 0-based index
    }

    private function createAnswer(string $text, ?string $explanation, bool $isCorrect): Answer
    {
        $answer = new Answer();
        $answer->setText($text);
        $answer->setExplanation($explanation);
        $answer->setIsCorrect($isCorrect);

        return $answer;
    }

    public function testMapApiModelToEntityForCreate(): void
    {
        // Arrange
        $apiModel = new QuizQuestionApiModel();
        $apiModel->question = 'New Question from API';
        $apiModel->questionExplanation = 'New Explanation';
        $apiModel->answers = ['API Ans 1', 'API Ans 2 Correct', 'API Ans 3'];
        $apiModel->explanations = ['API Expl 1', 'API Expl 2', null];
        $apiModel->correctAnswers = [1]; // 0-based index

        $newEntity = new QuizQuestion(); // Simulating creation

        // Act
        $mappedEntity = $this->mapper->mapApiModelToEntity($apiModel, $newEntity);

        // Assert
        $this->assertSame($newEntity, $mappedEntity); // Ensure the same object is returned
        $this->assertEquals('New Question from API', $mappedEntity->getQuestion());
        $this->assertEquals('New Explanation', $mappedEntity->getQuestionExplanation());

        $answers = $mappedEntity->getAnswers();
        $this->assertCount(3, $answers);

        // Check Answer 1 (index 0)
        $this->assertEquals('API Ans 1', $answers[0]->getText());
        $this->assertEquals('API Expl 1', $answers[0]->getExplanation());
        $this->assertFalse($answers[0]->isIsCorrect());
        $this->assertSame($mappedEntity, $answers[0]->getQuestion()); // Check association

        // Check Answer 2 (index 1)
        $this->assertEquals('API Ans 2 Correct', $answers[1]->getText());
        $this->assertEquals('API Expl 2', $answers[1]->getExplanation());
        $this->assertTrue($answers[1]->isIsCorrect());
        $this->assertSame($mappedEntity, $answers[1]->getQuestion());

        // Check Answer 3 (index 2)
        $this->assertEquals('API Ans 3', $answers[2]->getText());
        $this->assertNull($answers[2]->getExplanation());
        $this->assertFalse($answers[2]->isIsCorrect());
        $this->assertSame($mappedEntity, $answers[2]->getQuestion());
    }

    public function testMapApiModelToEntityForUpdate(): void
    {
        // Arrange: Start with an existing entity
        $existingEntity = new QuizQuestion();
        $existingEntity->setQuestion('Old Question');

        $oldAnswer1 = $this->createAnswer('Old Answer 1', null, true);
        $oldAnswer2 = $this->createAnswer('Old Answer 2', null, false);

        $existingEntity->addAnswer($oldAnswer1);
        $existingEntity->addAnswer($oldAnswer2);

        // API model with updated data
        $apiModel = new QuizQuestionApiModel();
        $apiModel->question = 'Updated Question Text';
        $apiModel->questionExplanation = 'Updated Explanation';
        $apiModel->answers = ['New Ans 1', 'New Ans 2 Correct'];
        $apiModel->explanations = ['New Expl 1', null];
        $apiModel->correctAnswers = [1]; // 0-based index

        // Act: Map the API model onto the existing entity
        $updatedEntity = $this->mapper->mapApiModelToEntity($apiModel, $existingEntity);

        // Assert
        $this->assertSame($existingEntity, $updatedEntity); // Ensure the same object is modified
        $this->assertEquals('Updated Question Text', $updatedEntity->getQuestion());
        $this->assertEquals('Updated Explanation', $updatedEntity->getQuestionExplanation());

        $answers = $updatedEntity->getAnswers();
        $this->assertCount(2, $answers);

        // Check Answer 1 (index 0) - This is a *new* Answer object
        $this->assertEquals('New Ans 1', $answers[0]->getText());
        $this->assertEquals('New Expl 1', $answers[0]->getExplanation());
        $this->assertFalse($answers[0]->isIsCorrect());
        $this->assertSame($updatedEntity, $answers[0]->getQuestion());

        // Check Answer 2 (index 1) - This is a *new* Answer object
        $this->assertEquals('New Ans 2 Correct', $answers[1]->getText());
        $this->assertNull($answers[1]->getExplanation());
        $this->assertTrue($answers[1]->isIsCorrect());
        $this->assertSame($updatedEntity, $answers[1]->getQuestion());

        // Check that the old answers are not in the new collection
        $this->assertNotContains($oldAnswer1, $answers);
        $this->assertNotContains($oldAnswer2, $answers);
    }
}
