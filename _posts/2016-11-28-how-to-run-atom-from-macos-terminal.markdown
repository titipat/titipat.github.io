---
title: วิธีรัน atom editor จาก terminal บน macOS
layout: post
---

tl;dr

```
เปิด atom, Atom > Install Shell Commands
```

ปกติผมใช้ sublime เป็น text editor หลักครับ แล้วตอนนี้อยากเปลี่ยนบรรยายบ้างเลยสลับมาใช้ atom จากค่าย github ถ้าผมจำไม่ผิด sublime เขียนด้วย c++, python ส่วน atom นั้นเป็น nodejs แล้วมี electron ครอบอีกที

วิธีในการจะเปิด atom จาก terminal เริ่มจากเปิด atom ขึ้นมาแล้วไปดูที่ menubar ด้านบน จากนั้นเลือก Atom > Install Shell Commands เท่านี้ก็เรียบร้อย

เบื้องหลังของคำสั่งนี้คือการสร้าง symlink ครับ

```
laptop:~ titipat$ which atom
/usr/local/bin/atom
laptop:~ titipat$ ls -la /usr/local/bin/atom
lrwxr-xr-x  1 titipat  admin    53B Nov 28 09:54 /usr/local/bin/atom@ -> /Applications/Atom.app/Contents/Resources/app/atom.sh
```

ref: http://stackoverflow.com/questions/22390709/open-atom-editor-from-command-line
