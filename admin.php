<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';

$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: admin.php');
    exit;
}

if ($requestMethod === 'POST' && isset($_POST['login'])) {
    $username = trim((string) ($_POST['username'] ?? ''));
    $password = trim((string) ($_POST['password'] ?? ''));

    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
        $_SESSION['admin_logged_in'] = true;
        flash('เข้าสู่ระบบสำเร็จแล้ว');
        header('Location: admin.php');
        exit;
    }

    flash('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'danger');
    header('Location: admin.php');
    exit;
}

if ($requestMethod === 'POST' && isset($_POST['save_portfolio'])) {
    require_admin();
    $existing = repo()->getPortfolio();
    $payload = $existing;
    try {
        $payload['site'] = [
            'title' => trim((string) ($_POST['site_title'] ?? '')),
            'tagline' => trim((string) ($_POST['site_tagline'] ?? '')),
            'email' => trim((string) ($_POST['site_email'] ?? '')),
            'phone' => trim((string) ($_POST['site_phone'] ?? '')),
            'location' => trim((string) ($_POST['site_location'] ?? '')),
            'availability' => trim((string) ($_POST['site_availability'] ?? '')),
            'resume_focus' => trim((string) ($_POST['site_resume_focus'] ?? '')),
        ];

        $payload['hero'] = [
            'name' => trim((string) ($_POST['hero_name'] ?? '')),
            'headline' => trim((string) ($_POST['hero_headline'] ?? '')),
            'subheadline' => trim((string) ($_POST['hero_subheadline'] ?? '')),
            'description' => trim((string) ($_POST['hero_description'] ?? '')),
            'avatar' => trim((string) ($_POST['hero_avatar'] ?? '')),
            'years_experience' => trim((string) ($_POST['hero_years_experience'] ?? '')),
            'projects_count' => trim((string) ($_POST['hero_projects_count'] ?? '')),
            'current_role' => trim((string) ($_POST['hero_current_role'] ?? '')),
            'highlight_metrics' => normalize_lines((string) ($_POST['hero_highlights'] ?? '')),
        ];
        // ... (rest of payload building)
        repo()->savePortfolio($payload);
    } catch (Throwable $e) {
        error_log('Error in save_portfolio POST: ' . $e->getMessage());
        flash('เกิดข้อผิดพลาดขณะบันทึก: ' . $e->getMessage(), 'danger');
        header('Location: admin.php');
        exit;
    }
    ];

    $payload['about'] = [
        'title' => trim((string) ($_POST['about_title'] ?? '')),
        'summary' => trim((string) ($_POST['about_summary'] ?? '')),
        'personal_details' => decode_json_field((string) ($_POST['about_personal_details'] ?? '[]')),
    ];

    $payload['skills'] = decode_json_field((string) ($_POST['skills_json'] ?? '[]'));
    $payload['experience'] = decode_json_field((string) ($_POST['experience_json'] ?? '[]'));
    $payload['projects'] = decode_json_field((string) ($_POST['projects_json'] ?? '[]'));
    $payload['education'] = decode_json_field((string) ($_POST['education_json'] ?? '[]'));
    $payload['certificates'] = decode_json_field((string) ($_POST['certificates_json'] ?? '[]'));
    $payload['languages'] = decode_json_field((string) ($_POST['languages_json'] ?? '[]'));
    $payload['socials'] = decode_json_field((string) ($_POST['socials_json'] ?? '[]'));
    $payload['extras'] = [
        'strengths' => normalize_lines((string) ($_POST['extras_strengths'] ?? '')),
        'typing_speed' => trim((string) ($_POST['extras_typing_speed'] ?? '')),
        'transport' => trim((string) ($_POST['extras_transport'] ?? '')),
    ];

    repo()->savePortfolio($payload);
    flash('บันทึกข้อมูล portfolio เรียบร้อยแล้ว');
    header('Location: admin.php');
    exit;
}

$flash = flash();
$portfolio = repo()->getPortfolio();

if (!is_admin_logged_in()):
?>
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Sarabun:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/admin.css">
</head>
<body class="admin-login-body">
    <div class="admin-login-card">
        <span class="admin-badge">CMS Login</span>
        <h1>Portfolio Admin</h1>
        <p>เข้าสู่ระบบเพื่อแก้ไขข้อความโปรไฟล์, ประสบการณ์, โปรเจกต์ และข้อมูลติดต่อได้ทันที</p>
        <?php if ($flash): ?>
            <div class="alert alert-<?= e($flash['type']) ?>"><?= e($flash['message']) ?></div>
        <?php endif; ?>
        <form method="post" class="row g-3">
            <div class="col-12">
                <label class="form-label">Username</label>
                <input type="text" name="username" class="form-control form-control-lg" value="admin" required>
            </div>
            <div class="col-12">
                <label class="form-label">Password</label>
                <input type="password" name="password" class="form-control form-control-lg" value="admin123" required>
            </div>
            <div class="col-12">
                <button type="submit" name="login" value="1" class="btn btn-warning btn-lg w-100">Login to Admin</button>
            </div>
        </form>
        <div class="login-note">ค่าเริ่มต้นสำหรับเดโม: <strong>admin / admin123</strong> และควรเปลี่ยนก่อนนำขึ้นใช้งานจริง</div>
        <a href="index.php" class="back-link">Back to Portfolio</a>
    </div>
</body>
</html>
<?php
exit;
endif;
?>
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/admin.css">
</head>
<body class="admin-body">
    <div class="admin-shell">
        <aside class="admin-sidebar">
            <div>
                <span class="admin-badge">Portfolio CMS</span>
                <h1>Manage Content</h1>
                <p>แก้ข้อมูลหลักทั้งหมดจากหน้าเดียว แล้วกด save เพื่ออัปเดตหน้า portfolio ทันที</p>
            </div>
            <div class="sidebar-links">
                <a href="index.php" target="_blank">Open Portfolio</a>
                <a href="admin.php?logout=1">Logout</a>
            </div>
        </aside>

        <main class="admin-main">
            <?php if ($flash): ?>
                <div class="alert alert-<?= e($flash['type']) ?>"><?= e($flash['message']) ?></div>
            <?php endif; ?>

            <form method="post" class="admin-form">
                <div class="row g-4">
                    <div class="col-12">
                        <section class="admin-card">
                            <div class="section-title">
                                <h2>Site Settings</h2>
                                <span>Basic contact and hiring info</span>
                            </div>
                            <div class="row g-3">
                                <div class="col-md-6"><label class="form-label">Site Title</label><input type="text" name="site_title" class="form-control" value="<?= e($portfolio['site']['title'] ?? '') ?>"></div>
                                <div class="col-md-6"><label class="form-label">Tagline</label><input type="text" name="site_tagline" class="form-control" value="<?= e($portfolio['site']['tagline'] ?? '') ?>"></div>
                                <div class="col-md-4"><label class="form-label">Email</label><input type="text" name="site_email" class="form-control" value="<?= e($portfolio['site']['email'] ?? '') ?>"></div>
                                <div class="col-md-4"><label class="form-label">Phone</label><input type="text" name="site_phone" class="form-control" value="<?= e($portfolio['site']['phone'] ?? '') ?>"></div>
                                <div class="col-md-4"><label class="form-label">Location</label><input type="text" name="site_location" class="form-control" value="<?= e($portfolio['site']['location'] ?? '') ?>"></div>
                                <div class="col-md-6"><label class="form-label">Availability</label><input type="text" name="site_availability" class="form-control" value="<?= e($portfolio['site']['availability'] ?? '') ?>"></div>
                                <div class="col-md-6"><label class="form-label">Resume Focus</label><input type="text" name="site_resume_focus" class="form-control" value="<?= e($portfolio['site']['resume_focus'] ?? '') ?>"></div>
                            </div>
                        </section>
                    </div>

                    <div class="col-12">
                        <section class="admin-card">
                            <div class="section-title">
                                <h2>Hero Section</h2>
                                <span>Main landing copy</span>
                            </div>
                            <div class="row g-3">
                                <div class="col-md-6"><label class="form-label">Display Name</label><input type="text" name="hero_name" class="form-control" value="<?= e($portfolio['hero']['name'] ?? '') ?>"></div>
                                <div class="col-md-6"><label class="form-label">Current Role</label><input type="text" name="hero_current_role" class="form-control" value="<?= e($portfolio['hero']['current_role'] ?? '') ?>"></div>
                                <div class="col-md-6"><label class="form-label">Headline</label><input type="text" name="hero_headline" class="form-control" value="<?= e($portfolio['hero']['headline'] ?? '') ?>"></div>
                                <div class="col-md-3"><label class="form-label">Years Experience</label><input type="text" name="hero_years_experience" class="form-control" value="<?= e($portfolio['hero']['years_experience'] ?? '') ?>"></div>
                                <div class="col-md-3"><label class="form-label">Projects Count</label><input type="text" name="hero_projects_count" class="form-control" value="<?= e($portfolio['hero']['projects_count'] ?? '') ?>"></div>
                                <div class="col-12"><label class="form-label">Subheadline</label><textarea name="hero_subheadline" class="form-control" rows="3"><?= e($portfolio['hero']['subheadline'] ?? '') ?></textarea></div>
                                <div class="col-12"><label class="form-label">Description</label><textarea name="hero_description" class="form-control" rows="3"><?= e($portfolio['hero']['description'] ?? '') ?></textarea></div>
                                <div class="col-12"><label class="form-label">Highlights (1 line = 1 item)</label><textarea name="hero_highlights" class="form-control code-box" rows="5"><?= e(implode(PHP_EOL, $portfolio['hero']['highlight_metrics'] ?? [])) ?></textarea></div>
                            </div>
                        </section>
                    </div>

                    <div class="col-lg-6">
                        <section class="admin-card h-100">
                            <div class="section-title">
                                <h2>About</h2>
                                <span>Profile intro and personal details</span>
                            </div>
                            <div class="row g-3">
                                <div class="col-12"><label class="form-label">Section Title</label><input type="text" name="about_title" class="form-control" value="<?= e($portfolio['about']['title'] ?? '') ?>"></div>
                                <div class="col-12"><label class="form-label">Summary</label><textarea name="about_summary" class="form-control" rows="6"><?= e($portfolio['about']['summary'] ?? '') ?></textarea></div>
                                <div class="col-12"><label class="form-label">Personal Details JSON</label><textarea name="about_personal_details" class="form-control code-box" rows="10"><?= e(json_encode($portfolio['about']['personal_details'] ?? [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) ?></textarea></div>
                            </div>
                        </section>
                    </div>

                    <div class="col-lg-6">
                        <section class="admin-card h-100">
                            <div class="section-title">
                                <h2>Extras</h2>
                                <span>Strengths and useful details</span>
                            </div>
                            <div class="row g-3">
                                <div class="col-12"><label class="form-label">Strengths (1 line = 1 item)</label><textarea name="extras_strengths" class="form-control" rows="6"><?= e(implode(PHP_EOL, $portfolio['extras']['strengths'] ?? [])) ?></textarea></div>
                                <div class="col-12"><label class="form-label">Typing Speed</label><input type="text" name="extras_typing_speed" class="form-control" value="<?= e($portfolio['extras']['typing_speed'] ?? '') ?>"></div>
                                <div class="col-12"><label class="form-label">Transport</label><input type="text" name="extras_transport" class="form-control" value="<?= e($portfolio['extras']['transport'] ?? '') ?>"></div>
                            </div>
                        </section>
                    </div>

                    <div class="col-12">
                        <section class="admin-card">
                            <div class="section-title">
                                <h2>Structured Data Blocks</h2>
                                <span>แก้ข้อมูลชุดใหญ่ด้วย JSON โดยตรง</span>
                            </div>
                            <div class="row g-4">
                                <div class="col-lg-6"><label class="form-label">Skills JSON</label><textarea name="skills_json" class="form-control code-box" rows="12"><?= e(json_encode($portfolio['skills'] ?? [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) ?></textarea></div>
                                <div class="col-lg-6"><label class="form-label">Experience JSON</label><textarea name="experience_json" class="form-control code-box" rows="12"><?= e(json_encode($portfolio['experience'] ?? [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) ?></textarea></div>
                                <div class="col-lg-6"><label class="form-label">Projects JSON</label><textarea name="projects_json" class="form-control code-box" rows="12"><?= e(json_encode($portfolio['projects'] ?? [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) ?></textarea></div>
                                <div class="col-lg-6"><label class="form-label">Education JSON</label><textarea name="education_json" class="form-control code-box" rows="12"><?= e(json_encode($portfolio['education'] ?? [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) ?></textarea></div>
                                <div class="col-lg-6"><label class="form-label">Certificates JSON</label><textarea name="certificates_json" class="form-control code-box" rows="10"><?= e(json_encode($portfolio['certificates'] ?? [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) ?></textarea></div>
                                <div class="col-lg-6"><label class="form-label">Languages JSON</label><textarea name="languages_json" class="form-control code-box" rows="10"><?= e(json_encode($portfolio['languages'] ?? [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) ?></textarea></div>
                                <div class="col-12"><label class="form-label">Social Links JSON</label><textarea name="socials_json" class="form-control code-box" rows="8"><?= e(json_encode($portfolio['socials'] ?? [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) ?></textarea></div>
                            </div>
                        </section>
                    </div>

                    <div class="col-12">
                        <button type="submit" name="save_portfolio" value="1" class="btn btn-warning btn-lg px-5">Save Portfolio Content</button>
                    </div>
                </div>
            </form>
        </main>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="assets/js/admin.js"></script>
</body>
</html>
