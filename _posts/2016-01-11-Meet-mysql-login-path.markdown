---
layout: post
title: รู้จัก MySQL Login-path
---

ผมเชื่อว่าหลายคนเคยใช้คำสั่ง mysql แบบนี้ ใน bash, shell เพื่อความง่าย รวดเร็ว

```
mysql -uUSERNAME -pPASSWORD -e 'DO SOMETHING'
```

แต่ถ้าวันหนึ่งเราพลาดขึ้นมาล่ะ วันหนึ่งมีคนมารัน `ps aux` บนเครื่องเซิร์ฟเวอร์เค้าจะเห็นรหัสผ่านที่เราเขียนไปกับ command นั้นเลยนะ

การใช้ login-path จะคล้ายๆ กันการสร้าง .ssh/config นั้นแหละ โดยมีลักษณะการทำงานแบบ profile ให้เราเรียกใช้แถมปลอดภัยกว่าด้วยเพราะว่ามันจะถูก encrypt ไว้ที่ .mylogin.cnf

## การสร้าง Login-path

```
mysql_config_editor set --login-path=client --host=localhost --user=localuser --password
```

## การเรียกดู Login-path

```
mysql_config_editor show --all
```
สมมุติว่าเราได้สร้าง login-path: client ไว้แล้วจะแสดงผลประมาณนี้

```
[client]
user = localuser
password = *****
host = localhost
```

## การใช้งาน

ไม่เฉพาะ `mysql` นะแต่เครื่องมืออื่นๆ ก็สามารถใช้งานได้ด้วย เช่น
```
mysqldump -h example.com --login-path=example example_db > example_db.sql
```

ยังไงก็ลองประยุกต์ใช้กันดูนะครับ ส่วนตัวผมทำงานกับ database หลายตัวมากให้จำ credential ทั้งหมดไม่ไหวแน่นอน ถึงจำได้ถ้าต้องมานั่งเขียน mysql command เยอะๆ ก็ไม่ไหวเช่นกันเลยเลือกใช้ login-path นี้แหละเป็นตัวช่วยในการเขียน shell script


Ref http://dev.mysql.com/doc/refman/5.7/en/mysql-config-editor.html
