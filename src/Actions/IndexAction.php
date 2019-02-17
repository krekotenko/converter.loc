<?php
namespace App\Actions;

use Psr\Http\Message\ResponseInterface;
use App\ConverterInterface;

class IndexAction
{
    private $response;

    public function __construct(ResponseInterface $response )
    {
        $this->response = $response;
    }

    public function __invoke()
    {
        $content = file_get_contents("view/index.html");
        $response = $this->response->withHeader('Content-Type', 'text/html');
        $response->getBody()
            ->write($content);
        return $response;

    }


}