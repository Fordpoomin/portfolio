<?php

declare(strict_types=1);

$sessionPath = __DIR__ . '/../data/sessions';
if (!is_dir($sessionPath)) {
    mkdir($sessionPath, 0777, true);
}

session_save_path($sessionPath);
session_start();

const APP_NAME = 'Poom Portfolio';
const ADMIN_USERNAME = '';
const ADMIN_PASSWORD = '';
const DATA_FILE = __DIR__ . '/../data/portfolio.json';

$dbConfig = [
    'driver' => 'json',
    'host' => '127.0.0.1',
    'port' => 3306,
    'database' => 'portfolio_app',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8mb4',
];

require_once __DIR__ . '/PortfolioRepository.php';

function is_admin_logged_in(): bool
{
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

function require_admin(): void
{
    if (!is_admin_logged_in()) {
        header('Location: admin.php');
        exit;
    }
}

function flash(?string $message = null, string $type = 'success'): ?array
{
    if ($message !== null) {
        $_SESSION['flash'] = ['message' => $message, 'type' => $type];
        return null;
    }

    if (!isset($_SESSION['flash'])) {
        return null;
    }

    $flash = $_SESSION['flash'];
    unset($_SESSION['flash']);

    return $flash;
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function decode_json_field(string $value): array
{
    $decoded = json_decode($value, true);
    return is_array($decoded) ? $decoded : [];
}

function normalize_lines(string $value): array
{
    $lines = preg_split('/\r\n|\r|\n/', trim($value)) ?: [];
    return array_values(array_filter(array_map('trim', $lines), static fn($line) => $line !== ''));
}

function repo(): PortfolioRepository
{
    static $repository;

    if ($repository instanceof PortfolioRepository) {
        return $repository;
    }

    global $dbConfig;
    $repository = new PortfolioRepository(DATA_FILE, $dbConfig);

    return $repository;
}
