---
layout: post
title: Deploy Yii2 Framework บน Heroku
---

Heroku เป็น paas (platform as a service) ที่มี ecosystem ที่เรียบง่ายมาก รองรับการทำ ci (continuous integration) ได้หลายเจ้า ตอนนี้ผมเองก็หันมาใช้เป็นที่หลัก

**ข้อดี**

- ตัว deployer ค่อนข้่างฉลาด ถ้าเขียนโปรแกรมมาดีๆ จะ deploy ได้เองเลยโดยอ้างจากไฟล์ package manager ของภาษานั้นๆ
- สามารถ customize ได้เองด้วย procfile
- รองรับ docker
- ถูก ตัวสำหรับงานเริ่มต้น $7

**ข้อเสีย**

- ไม่มี southeast asia
- หน้า web control panel ยังแอบช้าเอาเรื่อง

### วิธีการ deploy yii2

เริ่มจากจัดการเปลี่ยน `web/index.php` ให้อยู่ใน production mode ก่อน

```
// defined('YII_DEBUG') or define('YII_DEBUG', true);
// defined('YII_ENV') or define('YII_ENV', 'dev');
```

สร้าง `Procfile` ก่อนเนื่องจาก framework นี้ใช้ `web/` เป็น access directory แล้ว heroku ยังรู้จักแค่ `/` กับ `public/`

```
web: vendor/bin/heroku-php-apache2 web/
```

แต่เนื่องจาก yii2 ไม่มีการเขียน log ลงไฟล์มาตั้งแต่ต้น ดังนั้นเอา stdout มาเขียนลง log ของ heroku ด้วย

```
web: vendor/bin/heroku-php-apache2 -l runtime/logs/app.log web/
```

เนื่องจาก yii framework มีการจัดการ asset จาก bower, npm เองดังนั้นจำเป็นต้องลงตัวนี้ด้วย

```
composer require fxp/composer-asset-plugin
```

สำหรับใครที่ต้องใช้หน้า contact me หรือ captcha ให้ลงตัวนี้ด้วย

```
composer require ext-gd:* --ignore-platform-reqs
```

เท่านั้น yii2 ก็น่าจะขึ้นไปวิ่งบน heroku platform ได้แล้ว


อ้างอิง [http://www.yiiframework.com/forum/index.php/topic/68191-creating-yii2-app-in-cloud9-→-pushing-to-github-→-deploying-to-heroku/](http://www.yiiframework.com/forum/index.php/topic/68191-creating-yii2-app-in-cloud9-→-pushing-to-github-→-deploying-to-heroku/)

