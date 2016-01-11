---
layout: post
title: ตั้งค่า User group ให้ nginx
---

ปกติการ serve web นั้นมักจะให้ web server ทำการอ่าน เขียน หรือรันไฟล์ใดๆ ด้วย user และ group หนึ่ง ทั้งในแง่ของความปลอดภัยและการจัดการ permission

แล้วเรื่องมันมีอยู่ว่าถ้าใครเคยใช้ apache จะมีการตั้งค่า user, group ในรูปแบบ

```
# apache config file
User ${APACHE_RUN_USER}
Group ${APACHE_RUN_GROUP}
```

ด้วยความชินผมก็เปิด /etc/nginx/nginx.conf มาแก้คล้ายๆ กันเลยเป็น

```
# nginx config file
user www-data;
group www-data;
```

แต่พอสั่ง config test ด้วย `nginx -t` เท่านั้นล่ะ แหกเลย

```
[emerg] 15146#0: unknown directive "group" in /etc/nginx/nginx.conf:3
nginx: configuration file /etc/nginx/nginx.conf test failed
```

เมื่อเกิดปัญหานี้อย่าเพิ่งตกใจไปครับ ถึงจะเป็น emergency alert แต่ก็ไม่ได้เกิดขึ้นจริงหรอก เพราะเราแค่ stimulate config test เท่านั้น และหลังจากลองเปิด [docs](http://nginx.org/en/docs/ngx_core_module.html#user) ดูก็พบว่า syntax มันไม่เหมือนกันนิหว่า

```
Syntax: 	user user [group];
Default: 	user nobody nobody;
Context: 	main
```

Ref http://nginx.org/en/docs/ngx_core_module.html#user
