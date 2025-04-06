<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Connection;

class TestController extends AbstractController
{
    #[Route('/api/test', name: 'app_test')]
    public function index(Connection $connection): Response
    {
        // Run a simple query to test database connection
        $version = $connection->fetchOne('SELECT version()');

        return new Response(
            '<html><body><h1>Symfony is working!</h1><p>PostgreSQL version: ' . $version . '</p></body></html>'
        );
    }
}
