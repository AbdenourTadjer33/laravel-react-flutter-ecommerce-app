<?php

namespace App\Traits\Traits;

use Nette\Utils\Random;

trait RefGenerator
{
    protected static function generateRef(string $col = 'ref')
    {
        do {
            $ref = Random::generate(4, '0-9');
        } while (static::where($col, $ref)->first());

        return $ref;
    }
}
