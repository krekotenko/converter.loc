<?php
namespace App\Actions;

use Psr\Http\Message\ResponseInterface;
use App\ConverterInterface;

class GetCurrenciesAction
{
    private $converter;

    private $response;

    public function __construct(ConverterInterface $converter, ResponseInterface $response )
    {
        $this->converter = $converter;
        $this->response = $response;
    }

    public function __invoke($request)
    {
        $currencies = $this->converter->getCurrencies();
        $response = $this->response->withHeader('Content-Type', 'application/javascript');
        $response->getBody()
            ->write($currencies);
        return $response;
    }


}