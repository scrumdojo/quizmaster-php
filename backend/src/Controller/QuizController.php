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
class QuizController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly QuizQuestionRepository $quizQuestionRepository,
        private readonly SerializerInterface $serializer,
        private readonly LoggerInterface $logger,
        private readonly ValidatorInterface $validator,
        private readonly QuizQuestionMapper $quizQuestionMapper
    ) {}

    #[Route('/quiz/{id}', methods: ['GET'])]
    public function getQuiz(string $id): Response
    {
        $questionSky = $this->quizQuestionRepository->findById(524);
        $questionCapitalFrance = $this->quizQuestionRepository->findById(19);
        $questionCitiesFrance = $this->quizQuestionRepository->findById(673);

        $questions = [
            'X' => [$questionSky, $questionCapitalFrance, $questionCitiesFrance],
            'Y' => [$questionCapitalFrance, $questionSky],
        ];

        return $this->response($questions[$id] ?? $questions['X']);
    }

    /**
     * @param QuizQuestion[] $questions
     */
    private function response(array $questions): Response
    {
        $apiModels = $this->quizQuestionMapper->mapEntitiesToApiModels($questions);

        return $this->json($apiModels);
    }
}
