---
layout: default
title: File ACL บน Ubuntu
---

File permission เป็นวิธีที่ใช้ในการจัดการสิทธิของผู้ใช้ในระบบ unix ทั้งหลาย แต่บางครั้งแค่การตั้ง file permission แบบ user/group/other อาจไม่เพียงพอ งานนี้ผมจะใช้สิ่งที่เรียกว่า file permission access control lists เข้ามาช่วยครับ

สำหรับ distro ตระกูล centos ผมเข้าใจว่ามีติดเครื่องมาแล้ว แต่สำหรับ ubuntu อาจต้องลงเพิ่มด้วยคำสั่ง

```bash
$ sudo apt-get install acl
```

### การดู acl

เรียกดู acl ของ directory นั้นๆ ด้วยคำสั่ง

```bash
$ getfacl /var/www
getfacl: Removing leading '/' from absolute path names
# file: var/www
# owner: root
# group: root
user::rwx
group::r-x
group:green:rwx
mask::rwx
other::r-x
```

จากตัวอย่างด้านบนหมายความว่า

* ไฟล์เป็นของ user root
* กลุ่มเจ้าของไฟล์คือ group root
* เจ้าของไฟล์มีสิทธิ rwx
* คนในกลุ่ม root มีสิทธิ r-x
* คนในกลุ่ม green มีสิทธิ rwx
* mask จะเป็น rwx (หาอ่านต่อได้เรื่อง mask, umask, default permission)
* คนอื่นๆ มีสิทธิ r-x

### เพิ่มกลุ่มผู้ใช้ใน acl

ความเจ๋งของ acl คือเราสามารถระบุได้ว่าใครหรือกลุ่มไหนสามารถทำอะไรได้บ้าง เช่น ถ้าผมต้องการให้กลุ่ม blue อ่านได้อย่างเดียว

```bash
$ setfacl -m g:blue:r /var/www
```

### ลบออกจาก acl

```bash
$ setfacl -x g:blue /var/www
```

### ตั้งค่า default permission

อันนี้ก็เป็นขอดีอีกอย่าง ถ้าเราต้องการตั้ง permission ให้ไฟล์ที่จะถูกสร้างต่อๆ ไปของผู้ใช้แต่ละคนเมื่อก่อนเราต้องนั่งเขียน mask กันปวดตับมากมาย แต่ตอนนี้เราสามารถทำได้ง่ายๆ แค่เพิ่ม `-d` ที่หมายถึง default เข้าไป เช่น ให้ผู้ใช้ monitor อ่านไฟล์ที่จะถูกสร้างต่อๆ ไปได้อย่างเดียว

```bash
$ setfacl -dm u:monitor:r /var/www
```

สำหรับท่านที่สนใจอ่านต่อได้ที่ [https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Storage_Administration_Guide/ch-acls.html](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Storage_Administration_Guide/ch-acls.html) และ [https://help.ubuntu.com/community/FilePermissionsACLs](https://help.ubuntu.com/community/FilePermissionsACLs)
