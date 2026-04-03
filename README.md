# Portfolio Web App

Portfolio web app สำหรับนำไปใช้โชว์สัมภาษณ์งาน พัฒนาด้วย PHP, HTML, CSS, JavaScript, jQuery และโครงข้อมูลที่พร้อมต่อ MySQL

## จุดเด่น

- หน้า portfolio ดีไซน์ทันสมัยแบบ responsive
- ใช้ข้อมูลเริ่มต้นจาก resume แล้ว
- มีหน้า `admin.php` สำหรับจัดการเนื้อหา
- เก็บข้อมูลใน `data/portfolio.json` เพื่อแก้ง่ายในเครื่อง
- มี `database/schema.sql` สำหรับเริ่มใช้ MySQL ทันที
- Repository รองรับโหมด `json` และ `mysql`

## วิธีรัน

1. เปิด terminal ที่ `C:\Projects\portfolio`
2. รันคำสั่ง:

```powershell
php -S localhost:8000
```

3. เปิด [http://localhost:8000/index.php](http://localhost:8000/index.php)
4. เปิด [http://localhost:8000/admin.php](http://localhost:8000/admin.php)

## Login เริ่มต้น

- Username: `admin`
- Password: `admin123`

ควรเปลี่ยนค่าที่ `includes/bootstrap.php` ก่อนนำขึ้น production

## การเปิดใช้ MySQL

1. import ไฟล์ `database/schema.sql`
2. แก้ค่า `$dbConfig` ใน `includes/bootstrap.php`
3. เปลี่ยน `'driver' => 'json'` เป็น `'driver' => 'mysql'`

ระบบจะยังเขียนไฟล์ JSON ไว้เป็น fallback เสมอ เผื่อฐานข้อมูลยังไม่พร้อม
