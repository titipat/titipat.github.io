---
layout: post
title: ดึงรูปจาก AWS S3 มาใช้บน PHP
---

ตอนนี้ทีมผมกำลังอยู่ในช่วงปรับตัวให้เข้ากับยุค cloud และบริการต่างๆ วันนี้ได้โจทย์ว่าให้ดึงรูปจากบริการ file storage ของ aws มาแสดง ก่อนนั้นขอแนะนำนิดนึงว่าใน s3 นั้นใช้การอ้างอิงไฟล์แบบ key, value ในแต่ละ bucket ดังนั้นถ้า

```
s3://bucket-name/folder/filename.extension
```
จะหมายความว่าส่วนที่เป็น key คือ

```
folder/filename.extension
```

ลงมือเขียนกันเถอะ ขั้นตอนแรกจัดตั้ง aws sdk กันก่อน

```
composer require ws/aws-sdk-php
```

สมมุติว่าเราต้องการให้ผู้ใช้สามารถเรียกใช้จาก key ได้เลยในลักษณะ `pic.php?key=members/101.jpg` ก็ให้เริ่มจากสร้างไฟล์ `pic.php` ตามนี้


ทำการ load sdk ด้วย composer autoload

```
<?php

// filename: pic.php

require 'vendor/autoload.php';
```

จากนั้นสร้าง s3 client เพื่อใช้เรียกใช้ service

```
$s3Client = new Aws\S3\S3Client([
    'version' => 'latest',
    'region'  => 'ap-southeast-1',
    'credentials' => [
        'key'    => 'your-key',
        'secret' => 'your-secret',
    ],
]);
```

แล้วทำการเรียก object จาก key ที่ผู้ใช้ส่งมา

```
$key = $_GET['key'];

$result = $s3Client->getObject([
    'Bucket' => 'bucket-name',
    'Key'    => $key
]);
```

เมื่อได้แล้วก็นำ stream ออกมาแสดงผลเป็นภาพ `jpeg`

```
$stream = $result->get('Body')->getContents();

$img = imagecreatefromstring($stream);

header('Content-Type: image/jpeg');

imagejpeg($img);
```

เท่านี้เราก็สามารถเรียกใช้รูปจาก aws s3 ได้แล้ว และไม่ใช่แค่รูปเท่านั้นนะไฟล์อื่นก็ทำได้เช่นกัน ใครที่สนใจลองเข้าไปอ่านต่อได้ที่ [aws-sdk-php](http://docs.aws.amazon.com/aws-sdk-php/v3/guide/index.html)
