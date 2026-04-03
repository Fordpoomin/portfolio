<?php

declare(strict_types=1);

final class PortfolioRepository
{
    public function __construct(
        private readonly string $dataFile,
        private readonly array $config
    ) {
    }

    public function getPortfolio(): array
    {
        if (($this->config['driver'] ?? 'json') === 'mysql') {
            return $this->getFromMysql();
        }

        return $this->getFromJson();
    }

    public function savePortfolio(array $payload): void
    {
        $payload['updated_at'] = date(DATE_ATOM);

        if (($this->config['driver'] ?? 'json') === 'mysql') {
            $this->saveToMysql($payload);
        }

        $json = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents($this->dataFile, (string) $json);
    }

    private function getFromJson(): array
    {
        if (!is_file($this->dataFile)) {
            return [];
        }

        $content = file_get_contents($this->dataFile);
        $decoded = json_decode((string) $content, true);

        return is_array($decoded) ? $decoded : [];
    }

    private function pdo(): PDO
    {
        $dsn = sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=%s',
            $this->config['host'],
            $this->config['port'],
            $this->config['database'],
            $this->config['charset']
        );

        return new PDO($dsn, $this->config['username'], $this->config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }

    private function getFromMysql(): array
    {
        try {
            $pdo = $this->pdo();
            $stmt = $pdo->query('SELECT payload_json FROM portfolio_content ORDER BY id DESC LIMIT 1');
            $row = $stmt->fetch();
            if (!$row) {
                return $this->getFromJson();
            }

            $decoded = json_decode((string) $row['payload_json'], true);
            return is_array($decoded) ? $decoded : $this->getFromJson();
        } catch (Throwable) {
            return $this->getFromJson();
        }
    }

    private function saveToMysql(array $payload): void
    {
        try {
            $pdo = $this->pdo();
            $stmt = $pdo->prepare(
                'INSERT INTO portfolio_content (headline, subheadline, payload_json, updated_at) VALUES (:headline, :subheadline, :payload_json, NOW())'
            );
            $stmt->execute([
                'headline' => $payload['hero']['headline'] ?? '',
                'subheadline' => $payload['hero']['subheadline'] ?? '',
                'payload_json' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            ]);
        } catch (Throwable) {
            // JSON file is the fallback for local editing.
        }
    }
}
