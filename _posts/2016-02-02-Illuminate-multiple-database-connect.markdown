---
layout: default
title: เชื่อมต่อหลายฐานข้อมูลบน illuminate database
---

Illuminate Database เป็น php component ที่ช่วยจัดการการเชื่อมกับฐานข้อมูลที่เจ๋งมากๆ ตัวหนึ่ง ตอนที่ใช้ผ่าน laravel framework การเชื่อมต่อหลาย database เราแค่ตั้งชื่อ connection ลงใน `config/database.php` แต่ถ้านำมันมาใช้งานแยกจะทำอย่างไรกันนะ?

หลังจากเปิด api documents ดูพบว่าเราต้องเพิ่มผ่าน method `addConnection(array $config)` เหมือนเดิมนั้นแหละ แต่เพิ่มชื่อ connection name เข้าไปด้วย `addConnection(array $config, string $name = 'default')`

ตัวอย่างการเพิ่ม connection

```php
<?php
require 'vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

$capsule->addConnection([
  'driver'    => 'mysql',
  'host'      => 'host1',
  'database'  => 'host1',
  'username'  => 'host1',
  'password'  => 'host1',
  'charset'   => 'utf8',
  'collation' => 'utf8_unicode_ci',
  'prefix'    => '',
], 'host1');

$capsule->addConnection([
  'driver'    => 'mysql',
  'host'      => 'host2',
  'database'  => 'host2',
  'username'  => 'host2',
  'password'  => 'host2',
  'charset'   => 'utf8',
  'collation' => 'utf8_unicode_ci',
  'prefix'    => '',
], 'host2');

$capsule->bootEloquent();
```

แล้วจากนั้นก็ใช้งานเหมือนการเรียก connection ปกติเลย เช่น ตอนสร้าง model

```php
<?php

class Product extends Illuminate\Database\Eloquent\Model
{
  protected $table = 'products';
  protected $connection = 'host1';
}
```

ref [https://laravel.com/api/5.2/Illuminate/Database/Capsule/Manager.html](https://laravel.com/api/5.2/Illuminate/Database/Capsule/Manager.html)
