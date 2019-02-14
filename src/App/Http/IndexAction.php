<?php

namespace App\Http;


class AboutAction
{

    public function handle()
    {
        echo("<pre>");
        print_r("Hello world");
        echo("</pre>");
        exit;
    }
}