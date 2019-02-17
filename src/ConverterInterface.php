<?php
/**
 * Created by PhpStorm.
 * User: anatoliy
 * Date: 17.02.2019
 * Time: 11:11
 */
namespace App;

interface ConverterInterface
{
    public function getCurrencies();

    public function getRate($currencyBase, $currencyTo);

}