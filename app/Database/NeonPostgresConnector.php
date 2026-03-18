<?php

namespace App\Database;

use Illuminate\Database\Connectors\PostgresConnector;
use PDO;

class NeonPostgresConnector extends PostgresConnector
{
    protected function getDsn(array $config)
    {
        $dsn = parent::getDsn($config);
        
        // Add Neon endpoint parameter if host contains neon.tech
        if (isset($config['host']) && str_contains($config['host'], 'neon.tech')) {
            $endpoint = $this->extractEndpoint($config['host']);
            if ($endpoint) {
                $dsn .= ";options='endpoint={$endpoint}'";
            }
        }

        return $dsn;
    }

    protected function extractEndpoint($host)
    {
        // Extract endpoint from host like: ep-solitary-recipe-a1mhlozz-pooler.ap-southeast-1.aws.neon.tech
        // or ep-solitary-recipe-a1mhlozz.ap-southeast-1.aws.neon.tech
        $subdomain = explode('.', $host)[0]; // e.g. ep-solitary-recipe-a1mhlozz-pooler
        $endpoint = preg_replace('/-pooler$/', '', $subdomain); // strip -pooler suffix
        return $endpoint ?: null;
    }
}
