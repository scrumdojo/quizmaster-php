<?php

namespace App\Controller;

use App\Entity\Answer;
use App\Entity\QuizQuestion;
use App\Model\QuizQuestionApiModel;
use App\Repository\QuizQuestionRepository;
use App\Service\QuizQuestionMapper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Psr\Log\LoggerInterface;

#[Route('/api')]
class QuizQuestionController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly QuizQuestionRepository $quizQuestionRepository,
        private readonly SerializerInterface $serializer,
        private readonly LoggerInterface $logger,
        private readonly ValidatorInterface $validator,
        private readonly QuizQuestionMapper $quizQuestionMapper
    ) {}

    #[Route('/quiz-question/{id<\d+>}', methods: ['GET'])]
    public function getQuestion(int $id): Response
    {
        $question = $this->quizQuestionRepository->findById($id);
        return $this->response($question);
    }

    #[Route('/quiz-question/{hash}/edit', methods: ['GET'])]
    public function getQuestionByHash(string $hash): Response
    {
        $question = $this->quizQuestionRepository->findByHash($hash);
        return $this->response($question);
    }

    private function response(?QuizQuestion $question): Response
    {
        if (!$question) {
            return $this->json(['error' => 'Question not found'], Response::HTTP_NOT_FOUND);
        }

        $apiModel = $this->quizQuestionMapper->mapEntityToApiModel($question);
        return $this->json($apiModel);
    }

    #[Route('/quiz-question', methods: ['POST'])]
    public function createQuestion(Request $request): Response
    {
        try {
            $apiModel = $this->serializer->deserialize($request->getContent(), QuizQuestionApiModel::class, 'json');

            // Basic validation example (can be expanded)
            if (empty($apiModel->question) || !is_array($apiModel->answers) || empty($apiModel->answers)) {
                 return $this->json(['error' => 'Invalid data: question and answers are required.'], Response::HTTP_BAD_REQUEST);
            }

            $question = $this->quizQuestionMapper->mapApiModelToEntity($apiModel, new QuizQuestion());

            $this->entityManager->persist($question);
            $this->entityManager->flush(); // Flush once to potentially get ID if needed, and persist initial data

            // Generate and set the hash
            $hash = md5(uniqid(rand(), true));
            $question->setHash($hash);

            // Flush again to save the hash
            $this->entityManager->flush();

            // Return only the new database hash
            return $this->json([
                'id' => $question->getId(),
                'hash' => $hash,
            ], Response::HTTP_CREATED);

        } catch (\Symfony\Component\Serializer\Exception\ExceptionInterface $e) {
            $this->logger->error('Deserialization failed: ' . $e->getMessage());
            return $this->json(['error' => 'Invalid JSON data: ' . $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (\Doctrine\DBAL\Exception\UniqueConstraintViolationException $e) { // Catch potential hash collision
             $this->logger->error('Hash collision or other unique constraint violation: ' . $e->getMessage());
             return $this->json(['error' => 'Failed to generate a unique identifier.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            $this->logger->error('Error creating question: ' . $e->getMessage());
            return $this->json(['error' => 'An unexpected error occurred.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/quiz-question/{hash}', methods: ['PATCH'])]
    public function updateQuestion(string $hash, Request $request): Response
    {
        // Find by the database hash directly
        $question = $this->quizQuestionRepository->findByHash($hash);
        if (!$question) {
            return $this->json(['error' => 'Question not found'], Response::HTTP_NOT_FOUND);
        }

        try {
            $apiModel = $this->serializer->deserialize($request->getContent(), QuizQuestionApiModel::class, 'json');

            $this->quizQuestionMapper->mapApiModelToEntity($apiModel, $question);
            $this->entityManager->flush();

            return $this->json($question->getId());

        } catch (\Symfony\Component\Serializer\Exception\ExceptionInterface $e) {
            $this->logger->error('Deserialization failed during update: ' . $e->getMessage());
            return $this->json(['error' => 'Invalid JSON data: ' . $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            $this->logger->error('Error updating question: ' . $e->getMessage());
            return $this->json(['error' => 'An unexpected error occurred during update.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
