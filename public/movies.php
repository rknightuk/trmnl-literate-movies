<?php

$grouped = json_decode(file_get_contents('../data/grouped.json'), true);

$decades = ['1910','1920','1930','1940','1950','1960','1970','1980','1990','2000','2010','2020'];

$decade = $_GET['decade'] ?? $decades[array_rand($decades)];

if (!in_array($decade, $decades)) {
    $decade = $decades[array_rand($decades)];
}

$movies = $grouped['movies'][$decade] ?? [];

header("Content-Type: application/json");

echo json_encode([
    'movie' => $movies[array_rand($movies)]
]);