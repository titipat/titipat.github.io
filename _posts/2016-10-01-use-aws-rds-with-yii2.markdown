---
layout: post
title: วิธีการต่อ AWS RDS แบบ SSL บน Yii2
---

ในตอนนี้ถ้าทีมไหนยังไม่ได้ลอง aws (amazon web service) บอกเลยว่าเอ้าท์มากเลยนะ วันนี้ผมเอา aws rds (relational database service) มาใช้กับ yii2 แต่เนื่องจากเป็น public accessible ดังนั้นผมจะบังคับใช้ ssl ในการเข้ารหัสการเชื่อมต่อระหว่าง web กับ database ที่อยู่คนละที่

เริ่มจากสร้าง rds instance แล้วก็จัดการเอามาใส่ที่ `config/db.php` ตามนี้เลย

```
<?php

// config/db.php

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=YOUR_INSTANCE_NAME.xxxxxxxxxxx.REGION_ZONE.rds.amazonaws.com;dbname=YOUR_DATABASE_NAME',
    'username' => 'YOUR_USERNAME',
    'password' => 'YOUR_PASSWORD',
    'charset' => 'utf8',
    'attributes' => [
    	1009 => __DIR__ . '/rds-combined-ca-bundle.pem'
    ]
];
```

แต่เดี๋ยวช้าก่อน เราต้องโหลด ca ของ aws rds ssl จาก [http://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem](http://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem) ก่อนในตัวอย่างผมใส่ไว้ใน `config/` นั้นแหละ

ส่วนค่า `1009` นั้นจริงๆ มาจาก `PDO::MYSQL_ATTR_SSL_CA` แต่ไม่ทราบด้วยเหตุผลอะไรผมไม่สามารถเรียกได้ก็ใส่เป็นค่าคงที่ไปเลย