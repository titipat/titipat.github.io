---
layout: default
title: ทดลองใช้ Docker เลียนแบบ Web server, database server
---

ขอเป็นบันทึกสั้นๆ สำหรับการ deploy docker แบบแยก web server กับ database server นะครับ

#### Web server Dockerfile

```dockerfile
# Web server

FROM ubuntu
RUN apt-get update -y
RUN apt-get install -y apache2 libapache2-mod-auth-mysql php5 libapache2-mod-php5 php5-mcrypt php5-mysqlnd
RUN rm -rf /var/www/html/*
ADD app/ /var/www/html/
CMD /usr/sbin/apache2ctl -D FOREGROUND
EXPOSE 80
```

#### Database Dockerfile

สำหรับ container ตัวนี้มีจุดพิเศษนิดหนึ่งว่าไฟล์ .sh และ .sql ในอยู่ใน `/docker-entrypoint-initdb.d/` จะถูกรันเองให้แค่เราใส่ deployment shell หรือ sql script ไว้ที่นี่ และตัวแปร `MYSQL_ROOT_PASSWORD` มีไว้เพื่อกำหนด root password แต่ถ้าใช้งานจริงไม่แนะนำให้ใช้แบบนี้นะ เพิ่มเติมอ่านต่อได้ที่ https://hub.docker.com/_/mysql

```dockerfile
# Database

FROM mysql
ENV MYSQL_ROOT_PASSWORD MY_ROOT_PASSWORD
ADD database/* /docker-entrypoint-initdb.d/
EXPOSE 3306
```

#### Run database

โดยตรงชื่อว่า `db`

```
docker run -d -P --name db titipat/quota-database
```

#### Run web server

```
docker run -d -p 80:80 --link db --name web titipat/web
```

สำหรับส่วนนี้ตรงชื่อ link `db` นั้นมีความหมายนะเพราะ docker จะนำไปใช้ในการอ้างอิงแบบ `hosts` แบบเดียวกับที่เราแก้ใน `/etc/hosts` จากนั้นในการเรียกใช้จากโปรแกรมก็ใส่เป็นชื่อ link ได้เลย เช่น

```php
<?php
$pdo = new PDO('mysql:host=db;database=book_store', 'root', 'dadada');
```
