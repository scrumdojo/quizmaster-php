<?php

namespace App\Repository;

use App\Entity\QuizQuestion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<QuizQuestion>
 */
class QuizQuestionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, QuizQuestion::class);
    }

    public function findByHash(string $hash): ?QuizQuestion
    {
        return $this->createQueryBuilder('q')
            ->addSelect('a') // Select related answers
            ->leftJoin('q.answers', 'a') // Join answers
            ->where('q.hash = :hash') // Query by hash
            ->setParameter('hash', $hash)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findById(int $id): ?QuizQuestion
    {
        // Use QueryBuilder to fetch the question and join/select its answers in one query
        return $this->createQueryBuilder('q')
            ->addSelect('a') // Select related answers
            ->leftJoin('q.answers', 'a') // Join answers
            ->where('q.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

}
