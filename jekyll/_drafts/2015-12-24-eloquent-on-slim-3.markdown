---
layout: post
title: ทดลองใช้ Eloquent บน Slim 3
---
Slim เป็นอีกหนึ่ง framework ในภาษา php ที่เน้นความเรียบงานและรวดเร็วในการพัฒนาและเพิ่งออกเวอร์ชัน 3 มาเมื่อต้นเดือนธันวาที่ผ่านมานี้เอง วันนี้ผมจะลองเอามาใช้คู่กับ Eloquent กัน โดยโครงสร้างของโปรเจคตัวอย่างดังนี้

```
app/
    models/Student.php
    models/Instructor.php
public/
    .htaccess
    index.php
composer.json
```

เริ่มที่ composer.json กันก่อน ที่แปลกหน่อยคือผมจะใช้ composer เพื่อความสะดวกในการโหลด models

```
// composer.json
{
    "require": {
        "slim/slim": "^3.0",
        "illuminate/database": "^5.2"
    },
    "autoload": {
        "classmap" : [
            "app/models"
        ]
    }
}

```

พระเอกของเรา public/index.php ที่เรียก autoload ของ composer และทำการบูต Eloquent

```
<?php
// public/index.php
require '../vendor/autoload.php';

$database = array(
    'driver' => 'mysql',
    'database' => 'school',
    'host' => 'localhost',
    'username' => 'username',
    'password' => 'password',
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
);

use Illuminate\Database\Capsule\Manager as Capsule;
$capsule = new Capsule;
$capsule->addConnection($database);
$capsule->setAsGlobal();
$capsule->bootEloquent();

$app = new \Slim\App;

$app->get('/students/{studentId}', function($request, $response) {
    $studentId = $request->getAttribute('studentId');
    $student = Student::find($studentId);
    // ...
});

$app->run();
```

แล้วสุดท้ายก็สร้าง models ตามตารางที่เราต้องการ

```
<?php
// models/Student.php
class Student extends Illuminate\Database\Eloquent\Model
{
    protected $table = 'student';

    public function adviser()
    {
        return $this->belongsTo('Instructor');
    }
}
```

```
<?php
// models/Instructor.php
class Instructor extends Illuminate\Database\Eloquent\Model
{
    protected $table = 'instructor';

    public function advisees()
    {
        return $this->hasMany('Student');
    }
}

```
