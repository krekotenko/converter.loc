<?php
declare(strict_types=1);
namespace App;

class OpenRateConverter implements ConverterInterface
{
    public function __construct() {
    }

    public function getCurrencies()
    {
        $ch = curl_init('https://api.exchangeratesapi.io/latest');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        return $result;
    }

    public function getRate($currencyBase = '', $currencyTo = '')
    {
        $ch = curl_init("https://api.exchangeratesapi.io/latest/?base={$currencyBase}&symbols={$currencyTo}");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        return $result;
    }

}
