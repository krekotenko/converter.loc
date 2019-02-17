<?php
use FastRoute\RouteCollector;
use Middlewares\FastRoute;
use Middlewares\RequestHandler;
use Narrowspark\HttpEmitter\SapiEmitter;
use Relay\Relay;
use Zend\Diactoros\Response;
use Zend\Diactoros\ServerRequestFactory;
use function FastRoute\simpleDispatcher;
use App\Actions\IndexAction;
use App\Actions\GetCurrenciesAction;
use App\Actions\GetRateActions;

require_once dirname(__DIR__) . '/vendor/autoload.php';
require_once dirname(__DIR__) . '/src/container.php';


/** @noinspection PhpUnhandledExceptionInspection */
$routes = simpleDispatcher(function (RouteCollector $r) {
    $r->addRoute('GET', '/', IndexAction::class);
    $r->addRoute('GET', '/get-currencies', GetCurrenciesAction::class);
    $r->addRoute('GET', '/get-rate/{currencyBase}/{currencyTo}', GetRateActions::class);
});

$middlewareQueue[] = new FastRoute($routes);
$middlewareQueue[] = new RequestHandler($container);

/** @noinspection PhpUnhandledExceptionInspection */
$requestHandler = new Relay($middlewareQueue);

$response = $requestHandler->handle(ServerRequestFactory::fromGlobals());

$emitter = new SapiEmitter();

/** @noinspection PhpVoidFunctionResultUsedInspection */
return $emitter->emit($response);