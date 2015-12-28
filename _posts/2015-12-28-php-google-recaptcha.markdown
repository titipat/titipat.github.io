---
layout: post
title: มาใช้ Google reCaptcha บน PHP กันเถอะ
---

*คำเตือน พฤติกรรมการเขียน html, php แบบนี้ hardcore มาก โปรดใช้จักรยานในการอ่าน*

การต่อสู้ระหว่างผู้พัฒนาที่จะแยกแยะระหว่างผู้ใช้ที่เป็นคนกับบอทที่เนียนมาใช้ดำเนินมาเนิ่นนานแล้ว ตั้งแต่สมัย Captcha มาถึงปัจจุบันได้อัพเกรดเป็น reCaptcha ซึ่งมีความเป็นมิตรกับคนมากขึ้น วันนี้ผมจะเอามาลองใช้กับหน้า Login ของภาษา PHP กัน

เริ่มจากใส่ javascript และ client key ลงบนหน้า login ของผู้ใช้

```html
<!DOCTYPE html>
<html>
    <body>
        <form action="login.php" method="post">
            <input type="text" name="username">
            <input type="text" name="password">
            <input type="submit">
            <div class="g-recaptcha" data-sitekey="YOUR_CLIENT_KEY"></div>
        </form>
        <script src='https://www.google.com/recaptcha/api.js'></script>
    </body>
</html>
```

จากนั้นเขียนฝั่ง server กันบ้าง โดยการทำงานของฝั่งนี้คือรับค่า g-recaptcha-response ที่ได้จากการที่ผู้ใช้กด reCaptcha แล้วส่งมาผ่าน form จากนั้นนำมาประกอบกับ server key แล้วส่ง post request ไปหา google recaptcha api เพื่อตรวจสอบว่าเจ้า g-recaptcha-response มันถูกต้องไหม

```php
<?php

function isValidCaptcha($captchaResponse)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "secret=YOUR_SERVER_KEY&response={$captchaResponse}");
    $result = json_decode(curl_exec($ch));
    return $result->success;
}

$response = filter_input(INPUT_POST, 'g-recaptcha-response');

if (isValidCaptcha($response)) {
    // Do something ...
} else {
    // Deny bot behavior
}

// ...
```
