---
layout: post
title: Deploy ไปที่ digital ocean ด้วย git
---

## Code deployment

การ deployment นั้นจะพูดให้มันไม่มีอะไรก็แค่เอา code ขึ้นไปวางที่ production server หรือจะพูดให้ยากว่าต้องไป run test, build ก็จะมีอะไรขึ้น ในปัจจุบันที่การ deployment นั้นแทบจะไม่ต้องทำมือแล้วเนื่องจากปัจจุบันมี continuous integration (ci) และ continuous deployment (cd) ที่ทั้งหมดเป็น automated task running ผู้พัฒนาแค่สนใน dev ให้ดีและ test ให้ครอบคลุมก็เพียงพอ

วันนี้มีเพื่อนคนหนึ่งซึ่งเค้าเป็น dev และไม่ถนัดด้านนี้ส่งบทความ [How To Set Up Automatic Deployment with Git with a VPS](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps) มาถามก็เลยลองทำให้ดูแล้วเกิดเป็นเอนทรี่นี้ขึ้นมา

## ความต้องการ

* Digitalocean ซัก 1 droplet หรือที่อื่นก็ได้แล้วแต่สะดวก
* ทำการผูก ssh-key ให้เรียบร้อยก่อน
* ลง apache web server ไว้ที่ `/var/www/html`

## Hooks

Hooks ก็เหมือน script ตัวหนึ่งที่จะทำต่อเมื่อมี event สักอย่าง และวันนี้เราจะใช้ hooks ที่เรียกว่า `post-receive` ที่จะทำต่อเมื่อมีการ push มาเสร็จแล้วมาใช้ในการ deployment

เริ่มจากสร้าง repo ของเราที่ production server

```bash
mkdir -p /var/repo/myapp.git
cd /var/repo/myapp.git
git init --bare
```

สำหรับคำสั่ง `git init --bare` จะเป็นการสร้าง version control เปล่าๆ ที่ไม่มี source ใดๆ

สร้าง hooks script ของเราด้วยคำสั่ง

```bash
vi hooks/post-receive
```

แล้วใส่ script ว่า

```bash
#!/bin/sh
git --work-tree=/var/www/html --git-dir=/var/repo/myapp.git checkout -f
```

โดย script ข้างบนจะทำการ checkout code ของเราไปที่ directory ของ apache web server และอย่าลืมตั้ง permission ให้ execute ได้ด้วย

```bash
chmod u+x hooks/post-receive
```

จากนั้นย้อนกลับมาที่เครื่องของเรา ถ้ามี git repo อยู่แล้วก็ข้างไปอีกขั้นตอนได้เลย แต่ถ้าใครมีมีก็สร้าง repo กันก่อน

```bash
mkdir -p /my/project
cd /my/project
git init
echo "Hello" > index.html
git add .
git commit -m "Add index.html"
```

ให้ทำการเพิ่ม remote branch ชื่อ `live` ด้วยคำสั่ง

```bash
git remote add live ssh://your-user@your-server/var/repo/myapp.git
```

จากนั้นถ้าต้องการ deploy เมื่อไหร่ก็แค่สั่ง

```bash
git push live master
```

แล้วลองเข้า web server ของเราดูว่าเป็นอย่างไร

เท่าที่ hooks script ที่เราตั้งไว้ก็จะ checkout code ของเราไปที่ directory ของ web server ให้เอง ถ้าต้องมีขั้นตอนอื่นก็สามารถปรับแต่งได้เองเลย ส่วนถ้าใครสนใจเรื่อง ci, cd ก็ติดตามอ่านกันต่อไป ผมเองก็เพิ่งจะเริ่มเหมือนกัน แล้วจะมาเล่าให้ฟังอีกครับ

**ที่มา** [How To Set Up Automatic Deployment with Git with a VPS](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps)
