---
title: โน้ต Middleware ใน Laravel framework
---

พอดีได้ไปช่วย Debug แอปมาเลยขอจดบันทึกเอาไว้เผื่อจะเป็นประโยชน์ต่อไปครับ

## รู้จัก Middleware

อย่างที่ทราบกันว่า Web application framework ส่วนใหญ่จะทำงานแบบ Route-based อยู่แล้ว เมื่อก่อนจะเป็น Controller หรือตัว C จาก MVC หลังจากที่แอปของเรามี Route เป็น Entry point แล้วจึงง่ายกับการจัดการด้วย Middleware

Middleware จะทำหน้าที่ขั้นกลางตามชื่อของมัน จะเอาไปใส่ไว้ตรงไหนก็ได้ของ Route chain ของเราเพื่อดักการทำงาน หน้าที่ของมันคือ (1) ส่งการทำงานไปยัง Route หรือ Middleware ตัวต่อไปถัดจากมัน (2) หยุดการทำงานแล้วคืนค่า Response บางอย่าง

## ตัวอย่างการทำงาน

สมมุติผมมี 2 Route คือ

```
- [] ---> /login
- [ Authentication Middleware ] ---> /dashboard
```

ที่ `/login` ไม่ว่ายังไงก็จะเจอหน้าล๊อกอิน แต่สำหรับ `/dashboard` จะมี Middleware อยู่หนึ่งตัวเพื่อตรวจว่าผู้ใช้เข้าระบบแล้วหรือไหม ผลที่ได้ควรจะมี 2 อย่างคือ (1) ผู้ใช้ที่เข้าสู่ระบบแล้วควรจะเห็น Resource ภายใน `/dashboard` หรือ (2) ถ้ายังไม่ได้เข้าระบบควรจะโดน Redirect ไปที่ `/login`

## Middleware ใน Laravel

Middleware ของ Laravel ผมแบ่งออกเป็น 3 ระดับจากใหญ่สุดไปเล็กสุดคือ

### Global middleware

ทุก HTTP request จะถูก Middleware กลุ่มนี้ทำงานทั้งหมด ใช้งานโดยการ Register ที่ Property `$middleware` ของคลาส Kernal `app/Http/Kernel.php` (ไม่อยากใช้คำว่าตัวแปรเพราะเป็น Object)

### Group middleware

ใน Framework ยุคใหม่ๆ จะสามารถรวมหลาย Route เป็นกลุ่มได้เพื่อลดการเขียนโค้ดซ้ำ [สนใจอ่านต่อได้ที่ DRY: Don't repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) ใช้งานได้โดยการเพิ่ม Key ของกลุ่มที่ต้องการที่ Property `$middlewareGroups` ในคลาส Kernal

ตัวอย่าง

```
// Kernal.php
/**
 * The application's route middleware groups.
 *
 * @var array
 */
protected $middlewareGroups = [
    'web' => [
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],
    
    'myMiddleware' => [
      	\App\Http\Middleware\MyMiddleware::class
    ]

    'api' => [
        'throttle:60,1',
        'auth:api',
    ],
];
```

```
// web.php

Route::group(['middleware' => ['web', 'myMiddleware']], function () {
    // my routes
});
```

### Route middleware

ตัวสุดท้ายคือ Middleware ที่ทำงานราย Route วิธีการใช้คือให้ Register ไว้ที่ Property `$routeMiddleware` ภายในคลาส Kernal ก่อนเรียกใช้เป็นราย Route ไปตามต้องการ

ตัวอย่าง

```
// Kernal.php

protected $routeMiddleware = [
    'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
    'can' => \Illuminate\Auth\Middleware\Authorize::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
    'myFirstMiddleware' => \App\Http\Middleware\MyFirstMiddleware::class,
    'mySecondMiddleware' => \App\Http\Middleware\MySecondMiddleware::class,
];
```

```
// web.php

Route::get('admin/profile', function () {
    // do something
})->middleware('myFirstMiddleware', 'mySecondMiddleware');
```

### ทิ้งทาย

Middleware เป็นการออกแบบที่ช่วยอำนวยความสะดวกได้เยอะมากถ้าใช้เป็น แล้วคุณละลองใช้แล้วหรือยัง มาเล่าให้ผมฟังด้วยสิครับ สวัสดีครับ

References:

- https://laravel.com/docs/5.4/middleware