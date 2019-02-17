<?php
namespace App;

use DI\ContainerBuilder;
use Zend\Diactoros\Response;
use function DI\create;
use function DI\get;

$containerBuilder = new ContainerBuilder();
$containerBuilder->useAutowiring(false);
$containerBuilder->useAnnotations(false);
$containerBuilder->addDefinitions([
    Actions\GetCurrenciesAction::class => create(Actions\GetCurrenciesAction::class)->constructor(get(ConverterInterface::class), get('Response')),
    ConverterInterface::class => function() {
        return new OpenRateConverter();
    },
    'Response' => function() {
        return new Response();
    },
]);
$containerBuilder->addDefinitions([
    Actions\GetRateActions::class => create(Actions\GetRateActions::class)->constructor(get(ConverterInterface::class), get('Response')),
    ConverterInterface::class => function() {
        return new OpenRateConverter();
    },
    'Response' => function() {
        return new Response();
    },
]);
$containerBuilder->addDefinitions([
    Actions\IndexAction::class => create(Actions\IndexAction::class)->constructor(get('Response')),
    'Response' => function() {
        return new Response();
    },
]);

/** @noinspection PhpUnhandledExceptionInspection */
$container = $containerBuilder->build();
