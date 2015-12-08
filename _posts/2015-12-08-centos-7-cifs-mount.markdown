---
layout: post
title: CIFS Mount on CentOS 7
date: 2015-12-08 08:45:00 +07:00
---

การ mount network file system นับว่าเป็นเรื่องปกติที่ทำกันอยู่บ่อยๆ แต่แล้วเมื่อผมสั่ง mount samba ลงใน /etc/fstab แบบที่ได้ทุกทีบน centos 7 กลับได้รับข้อความว่า mount: wrong fs type ตีความตรงๆ ว่าไม่รู้จัก file system ชนิด cifs และหลังจากที่ไปขุดดูก็พบว่า centos 7 ไม่มี cifs-utils มาให้ ดังนั้นก็จัดการลงซะ

```
sudo yum install cifs-utils -y
```

ต่อด้วยจัดการ mount บนไฟล์ /etc/fstab กรณีผมเป็นการใช้ user และ password

```
//HOST/SHARE_PATH /YOUR/MOUNT_PATH cifs rw,user=USERNAME,passwd=PASSWORD 1 1
```

แล้วก็ลองสั่ง mount ทุก path บน /etc/fstab ด้วย

```
sudo mount -a
```

แล้วยืนยันอีกทีว่าการ mount สำเร็จหรือไม่ด้วย

```
sudo mount -s
```
