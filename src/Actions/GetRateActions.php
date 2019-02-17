<?php

namespace App\Actions;

use Psr\Http\Message\ResponseInterface;
use App\ConverterInterface;

class GetRateActions
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
        $currencyBase = $request->getAttribute('currencyBase');
        $currencyTo = $request->getAttribute('currencyTo');
        $rate = $this->converter->getRate($currencyBase, $currencyTo);
        $response = $this->response->withHeader('Content-Type', 'application/javascript');
        $response->getBody()
            ->write($rate);
        return $response;
    }
}