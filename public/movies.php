<?php

$grouped = json_decode(file_get_contents('../data/grouped.json'), true);
$validDecades = ['1910','1920','1930','1940','1950','1960','1970','1980','1990','2000','2010','2020'];

$decades = $_GET['decades'] ?? [];

if (is_string($decades)) {
    $decades = explode(',', $decades);
}

$decades = array_filter($decades, function($decade) use ($validDecades) {
    return in_array($decade, $validDecades);
});

$decade = empty($decades) ? $validDecades[array_rand($validDecades)] : $decades[array_rand($decades)];

$movies = $grouped['movies'][$decade] ?? [];

header("Content-Type: application/json");

echo json_encode([
    'movie' => $movies[array_rand($movies)]
]);