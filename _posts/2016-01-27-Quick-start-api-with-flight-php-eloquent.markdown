---
title: เรื่องงานเผาต้องยกให้เรา ทำ Rest API อย่างรวดเร็วด้วย Flight PHP และ Eloquent
layout: default
---

ที่มาของเอนทรี่เกิดจากผมสงสัยว่าถ้าเราจำเป็นต้องสร้าง Rest API เพื่ออย่างอะไรสักอย่างแบบเร่งรีบสุดจะใช้เวลาเท่าใด ผมเลยลองตั้งเวลาดูว่าภายใน 10 นาทีผมจะสร้างทันหรือไม่ แอบมีข้อกำหนดว่าขอยังไม่มีการ authentication, authorization เข้ามาเกี่ยวนะ

เริ่มจาก googling แล้วผมก็ไปเจอ php framework ตัวหนึ่งชื่อว่า Flight ลองดูจากการ install ที่ไม่ยากเพียงแค่ดึงจาก composer และทำ url rewrite ซึ่งตัวเว็บมีอธิบายไว้ชัดเจนแล้วก็จัดเลยครับ

เริ่มจาก composer ที่รัก

```sh
composer require mikecao/flight
```

แล้วก็จัดการเรื่อง url rewrite ซะ

```
# .htaccess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [QSA,L]
```

และเนื่องจากไม่ต้องการเสียเวลาเขียน mysql query เองให้ปวดตับก็ดึง eloquent มาใช้โล้ด

```sh
composer require illuminate/database
```

จัดการสร้าง bootstrap.php เป็นตัวที่รวมทุกอย่างที่ต้องใช้งานแบบคร่าวๆ อย่าลืมนะครับว่าเน้นเร็วไว้ก่อน

```php
<?php
// bootstrap.php
require 'vendor/autoload.php';

use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

$capsule->addConnection(array(
    'driver'    => 'mysql',
    'host'      => 'YOUR_DATABASE_HOST',
    'database'  => 'YOUR_DATABASE',
    'username'  => 'YOUR_USERNAME',
    'password'  => 'YOUR_PASSWORD',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => ''
));

$capsule->bootEloquent();

class Student extends Model
{
  protected $table = 'student';

  public function enrollments()
  {
    $this->hasMany('Enrollment');
  }
}

class Enrollment extends Model
{
  protected $table = 'enrollment';
}
```

เมื่อทุกอย่างพร้อมแล้วในเวลาเกือบๆ 5 นาทีใช้เวลาที่เหลือเขียน endpoint กัน

```php
<?php
// public/index.php
require '../bootstrap.php';

Flight::route('GET /students/@studentId', function($studentId){
  $student = Student::find($studentId);
  Flight::json(array('data' => $student));
});

Flight::route('GET /students/@studentId/enrollments', function($studentId){
  $student = Student::find($studentId);
  Flight::json(array('data' => $student->enrollments));
});

Flight::start();
```

เท่าที่ก็เรียบร้อยได้ภายในเวลาไม่ถึง 10 นาทีแล้ว
