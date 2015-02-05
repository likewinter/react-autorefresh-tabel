<?php
require __DIR__ . './../vendor/autoload.php';

$faker = Faker\Factory::create();

$people = [];

foreach (range(1, rand(5, 25)) as $i) {
    $person = [
        'id'      => uniqid(),
        'name'    => $faker->name,
        'email'   => $faker->email,
        'address' => $faker->address,
        'cc' => [
            'type'       => $faker->creditCardType,
            'number'     => $faker->creditCardNumber,
            'expiration' => $faker->creditCardExpirationDateString
        ]
    ];
    array_push($people, $person);
}

header('Access-Control-Allow-Origin: *');
echo json_encode($people);
