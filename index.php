<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';

$portfolio = repo()->getPortfolio();
$site = $portfolio['site'] ?? [];
$hero = $portfolio['hero'] ?? [];
$about = $portfolio['about'] ?? [];
$skills = $portfolio['skills'] ?? [];
$experience = $portfolio['experience'] ?? [];
$projects = $portfolio['projects'] ?? [];
$education = $portfolio['education'] ?? [];
$certificates = $portfolio['certificates'] ?? [];
$languages = $portfolio['languages'] ?? [];
$extras = $portfolio['extras'] ?? [];
$socials = $portfolio['socials'] ?? [];
?>
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($site['title'] ?? APP_NAME) ?></title>
    <meta name="description" content="<?= e($hero['description'] ?? '') ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="site-shell">
        <header class="topbar">
            <div class="container topbar-inner">
                <a href="#home" class="brand-mark">
                    <span class="brand-dot"></span>
                    <span><?= e($site['title'] ?? APP_NAME) ?></span>
                </a>
                <nav class="d-none d-lg-flex nav-links">
                    <a href="#about">About</a>
                    <a href="#experience">Experience</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact">Contact</a>
                </nav>
                <div class="d-flex gap-2">
                    <a href="admin.php" class="btn btn-outline-light btn-sm rounded-pill px-3">Admin</a>
                    <a href="#contact" class="btn btn-warning btn-sm rounded-pill px-3">Hire Me</a>
                </div>
            </div>
        </header>

        <main>
            <section id="home" class="hero-section">
                <div class="hero-noise"></div>
                <div class="container">
                    <div class="row align-items-center g-5">
                        <div class="col-lg-7">
                            <div class="eyebrow">AVAILABLE FOR FRONT-END / FULL STACK ROLES</div>
                            <h1><?= e($hero['headline'] ?? '') ?></h1>
                            <p class="hero-subheadline"><?= e($hero['subheadline'] ?? '') ?></p>
                            <p class="hero-description"><?= e($hero['description'] ?? '') ?></p>
                            <div class="hero-actions">
                                <a href="#projects" class="btn btn-warning btn-lg rounded-pill px-4">View Projects</a>
                                <a href="#experience" class="btn btn-outline-light btn-lg rounded-pill px-4">Experience</a>
                            </div>
                            <div class="hero-metrics row g-3">
                                <div class="col-sm-4">
                                    <div class="metric-card">
                                        <span><?= e($hero['years_experience'] ?? '0') ?></span>
                                        <small>Years Experience</small>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="metric-card">
                                        <span><?= e($hero['projects_count'] ?? '0') ?></span>
                                        <small>Project Stories</small>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="metric-card">
                                        <span><?= e($hero['current_role'] ?? '-') ?></span>
                                        <small>Current Focus</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="hero-panel">
                                <?php if (!empty($hero['avatar'])): ?>
                                    <div class="avatar-frame">
                                        <img src="<?= e($hero['avatar']) ?>" alt="<?= e($hero['name'] ?? 'Profile photo') ?>" class="profile-image">
                                    </div>
                                <?php endif; ?>
                                <div class="profile-chip">Portfolio Profile</div>
                                <h2><?= e($hero['name'] ?? 'Developer') ?></h2>
                                <p><?= e($site['resume_focus'] ?? '') ?></p>
                                <ul class="hero-list">
                                    <?php foreach (($hero['highlight_metrics'] ?? []) as $item): ?>
                                        <li><?= e($item) ?></li>
                                    <?php endforeach; ?>
                                </ul>
                                <div class="contact-pills">
                                    <?php foreach ($socials as $social): ?>
                                        <a href="<?= e($social['url'] ?? '#') ?>"><?= e($social['label'] ?? '') ?>: <?= e($social['value'] ?? '') ?></a>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" class="content-section">
                <div class="container">
                    <div class="section-heading">
                        <span>About</span>
                        <h2><?= e($about['title'] ?? 'About Me') ?></h2>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-7">
                            <div class="glass-card h-100">
                                <p class="lead mb-4"><?= e($about['summary'] ?? '') ?></p>
                                <div class="detail-grid">
                                    <?php foreach (($about['personal_details'] ?? []) as $detail): ?>
                                        <div class="detail-item">
                                            <small><?= e($detail['label'] ?? '') ?></small>
                                            <strong><?= e($detail['value'] ?? '') ?></strong>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="glass-card h-100">
                                <h3 class="mini-title">Core Skills</h3>
                                <?php foreach ($skills as $skillGroup): ?>
                                    <div class="skill-group">
                                        <h4><?= e($skillGroup['group'] ?? '') ?></h4>
                                        <div class="skill-pills">
                                            <?php foreach (($skillGroup['items'] ?? []) as $item): ?>
                                                <span><?= e($item) ?></span>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="experience" class="content-section section-dark">
                <div class="container">
                    <div class="section-heading">
                        <span>Experience</span>
                        <h2>Career Timeline</h2>
                    </div>
                    <div class="timeline">
                        <?php foreach ($experience as $item): ?>
                            <article class="timeline-card">
                                <div class="timeline-meta"><?= e($item['period'] ?? '') ?></div>
                                <h3><?= e($item['position'] ?? '') ?></h3>
                                <p class="company"><?= e($item['company'] ?? '') ?> <span><?= e($item['location'] ?? '') ?></span></p>
                                <?php if (!empty($item['salary'])): ?>
                                    <p class="salary">เงินเดือน: <?= e($item['salary']) ?></p>
                                <?php endif; ?>
                                <ul>
                                    <?php foreach (($item['highlights'] ?? []) as $highlight): ?>
                                        <li><?= e($highlight) ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            </article>
                        <?php endforeach; ?>
                    </div>
                </div>
            </section>

            <section id="projects" class="content-section">
                <div class="container">
                    <div class="section-heading">
                        <span>Projects</span>
                        <h2>Selected Work Stories</h2>
                    </div>
                    <div class="row g-4">
                        <?php foreach ($projects as $project): ?>
                            <div class="col-lg-4 col-md-6">
                                <article class="project-card">
                                    <div class="project-top">
                                        <span><?= e($project['category'] ?? '') ?></span>
                                        <h3><?= e($project['name'] ?? '') ?></h3>
                                    </div>
                                    <p><?= e($project['summary'] ?? '') ?></p>
                                    <div class="stack-tag"><?= e($project['stack'] ?? '') ?></div>
                                    <strong>Impact</strong>
                                    <p class="mb-0"><?= e($project['impact'] ?? '') ?></p>
                                </article>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </section>

            <section class="content-section section-accent">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-lg-6">
                            <div class="glass-card h-100">
                                <h3 class="mini-title">Education</h3>
                                <?php foreach ($education as $item): ?>
                                    <div class="education-item">
                                        <strong><?= e($item['degree'] ?? '') ?></strong>
                                        <p class="mb-1"><?= e($item['school'] ?? '') ?></p>
                                        <small><?= e(trim(($item['major'] ?? '') . ' ' . ($item['faculty'] ?? ''))) ?></small>
                                        <div class="edu-meta"><?= e($item['period'] ?? '') ?><?php if (!empty($item['gpa'])): ?> | GPA <?= e($item['gpa']) ?><?php endif; ?></div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="glass-card h-100">
                                <h3 class="mini-title">Languages & Extras</h3>
                                <div class="language-list">
                                    <?php foreach ($languages as $language): ?>
                                        <div class="language-item">
                                            <strong><?= e($language['name'] ?? '') ?></strong>
                                            <span>พูด <?= e($language['speaking'] ?? '') ?> / อ่าน <?= e($language['reading'] ?? '') ?> / เขียน <?= e($language['writing'] ?? '') ?></span>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                                <div class="extra-block">
                                    <strong>Strengths</strong>
                                    <p><?= e(implode(' | ', $extras['strengths'] ?? [])) ?></p>
                                </div>
                                <div class="extra-block">
                                    <strong>Typing Speed</strong>
                                    <p><?= e($extras['typing_speed'] ?? '') ?></p>
                                </div>
                                <div class="extra-block">
                                    <strong>Transport</strong>
                                    <p><?= e($extras['transport'] ?? '') ?></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="certificate-strip">
                        <?php foreach ($certificates as $certificate): ?>
                            <div class="certificate-item">
                                <span><?= e($certificate['period'] ?? '') ?></span>
                                <strong><?= e($certificate['title'] ?? '') ?></strong>
                                <small><?= e($certificate['issuer'] ?? '') ?></small>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </section>

            <section id="contact" class="content-section">
                <div class="container">
                    <div class="cta-panel">
                        <div>
                            <span class="eyebrow text-warning">READY TO WORK</span>
                            <h2>กำลังมองหาทีมที่ต้องการคนลงมือทำเว็บได้จริง ตั้งแต่ UI ถึงระบบหลังบ้าน</h2>
                            <p><?= e($site['availability'] ?? '') ?> | <?= e($site['location'] ?? '') ?></p>
                        </div>
                        <div class="cta-links">
                            <?php foreach ($socials as $social): ?>
                                <a href="<?= e($social['url'] ?? '#') ?>"><?= e($social['value'] ?? '') ?></a>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
