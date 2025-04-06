<?php

$url  = parse_url($_SERVER["REQUEST_URI"]);
$file = __DIR__ . $url["path"];

if (is_file($file))
    return false;
else if (strpos($url["path"], '/api') === 0)
    // Otherwise, forward the request to Symfony's front controller.
    require_once __DIR__ . '/index.php';
else
    require_once __DIR__ . '/index.html';
