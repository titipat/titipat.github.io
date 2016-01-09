---
layout: post
title: ใช้ Autoloader แทน Include กันเถอะ
---

```php
<?php

include __DIR__ . '/classes/FirstClass.php';
include __DIR__ . '/classes/SecondClass.php';
include __DIR__ . '/classes/ThirdClass.php';

// and so on ...

```

ผมเชื่อว่าทุกคนที่เคยเขียน php น่าจะเคยเจอโค้ดแบบนี้ ที่ต้องมา include ไฟล์ทุกรอบๆ ในจะใช้งาน นอกจากจะเสียเวลาแล้วยังทำให้จัดการยากด้วย จะดีกว่าไหมถ้าเราใช้ autoloader มาช่วย

ตัวอย่างแรก โหลดแบบทั้ง directory ด้วย classmap

```json
{
    "name": "titipat/example",
    "require": {},
    "autoload": {
        "classmap": ["classes/"]
    }
}
```

แต่ถ้าแนะนำนะ ใช้แบบ psr-4 จะดีกว่า

```json
{
    "name": "titipat/example",
    "require": {},
    "autoload": {
        "psr-4": {
            "Titipat\\": "classes/"
        }
    }
}
```

หลังจากแก้ไข autoload ทุกครั้งอย่าลืมสั่ง composer update แล้วจากนั้นก็เรียกใช้ autoloader ที่ bootstrap file ของเราเท่านั้นเอง หรือถ้าใครใช้ framework ก็ทำ dependency injection ก็ว่ากันไป

```php
<?php

require __DIR__ . /vendor/autoloader.php';

$hello = new Titipat\Hello();

```
