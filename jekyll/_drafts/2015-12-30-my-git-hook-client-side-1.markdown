---
layout: post
title: ลองใช้ Git Hooks ฝั่ง Client
---

*คำเตือน การกระทำต่อไปนี้อาจไม่ใช่สิ่งที่ดี แค่อยากลองทำให้รู้ว่าได้อย่างที่คิดหรือไม่เท่านั้น*

git hooks เป็นอีกความสามารถหนึ่งของ git version control ทำให้เราสามารถรันคำสั่ง shell ได้ตาม workflow ของ git เช่น post-commit ที่จะทำงานหลังจากเราได้สั่ง commit ทางฝั่ง client (ผู้ใช้) ไปแล้ว

ในงานของผมไม่ได้มี ci รองรับเนื่องจากระบบค่อนข้าง legacy มากและการทำงานมีแค่ unit test เท่านั้น ผมเลยใช้ post-commit ในการรัน unit test ก่อนถ้าผ่านจึงจะอัพโหลดขึ้นไปที่ production server

## มาทดลองใช้กันเถอะ

ตัวอย่างคำสั่งของ git hooks จะอยู่ใน directory .git/hooks ภายในโปรเจคเป็นสกุล .sample การใช้งานแค่คุณสร้าง shell เป็นชื่อตาม workflow ที่ต้องการและตั้ง execute permission ให้มันก็พร้อมจะเป็นตัวช่วงในการทำงานให้คุณแล้ว

ตัวอย่างที่ผมใช้บ่อยก็ตามที่ได้เล่าไปว่าทำ unit test ก่อนแบบดิบๆ นี้แหละ ถ้าเกิดว่าทดสอบผ่านมีคำว่า OK ขึ้นมาให้ scp ไปที่ production server แต่ถ้ามันไม่ผ่านก็หาสักช่องทางหนึ่งเพื่อแจ้งอีกที

```bash
#!/bin/bash
test_result=$(phpunit YourTestFileOrDir.php)

if [[ $test_result == *"OK"* ]]
then
    # do deployment to production server
    echo "IT OK"
else
    # do some alert
    echo "Booo"
fi
```
