---
layout: post
title: บันทึกย่อการใช้ git flow
---

Git เป็นอีกหนึ่ง version control ที่ได้รับความนิยมมากในปัจจุบัน และมีแนวทางหรือ style guide เกิดขึ้นมากมาย หนึ่งในนั้นคือรูปแบบการใช้งานที่เรียกว่า git flow

การใช้งาน git ก่อนหน้านี้ผมจะใช้เพียงแค่ 2 branch ได้แก่ `master` ซึ่งจะต้องพร้อมสำหรับ deployment ตลอดเวลา และการพัฒนาใดๆ จะถูกทำเฉพาะที่ `develop` เท่านั้น

Git flow นั้นเป็นอีกหนึ่งวิธีในการทำงานกับ git โดยใช้ความสามารถของ branch ให้เป็นประโยชน์ ด้วยเพิ่มประเภทของ branch ได้แก่ `feature`, `release` และ `hotfix` branch

## Feature branch

**เงื่อนไข**

* สร้างจาก** `develop`
* ต้องรวมเข้ากับ `develop`

Feature branch จะถูกใช้เมื่อมีการเพิ่มอะไรใหม่ๆ ให้กับโปรแกรม ตัวอย่างการตั้งชื่อ เช่น `feature-facebook-sign-in` เป็นต้น และเมื่อเสร็จสิ้นการพัฒนาก็จะนำกลับไปรวมกับ `develop`

## Release branch

**เงื่อนไข**

* สร้างจาก `develop`
* ต้องรวมเข้ากับ `master` และ `develop`

Release branch จะถูกใช้เมื่อเราต้องการทำ version release การตั้งชื่อจะตั้งเป็น version ที่ต้องการ release เช่น `release-1.2.0` จะหมายความว่าเราจะ release version 1.2.0 เมื่อเราเสร็จสิ้นการทำงานกับ release branch แล้วชื่อจะถูกนำไปสร้างเป็น tag และทำการรวมกลับไปยัง `master` และ `develop`

## Hotfix branch

**เงื่อนไข**

* สร้างจาก `master`
* ต้องรวมเข้ากับ `master` และ `develop`

สำหรับ hotfix branch การใช้งานจะคล้ายๆ กับ release branch คือสร้างเป็นชื่อของ version ที่ต้องการ เช่น `hotfix-1.2.0.1` เมื่อทำงานเสร็จจะถูกนำกลับไปรวมกับ `master` และ `develop` พร้อมสร้าง tag เช่นเดียวกัน แต่จะต่างกันที่จะเริ่มสร้างจาก `master` เพื่อจุดประสงค์แก้ไขบางอย่างของโปรแกรมใน production version

# ความเห็นหลังจากได้ลองใช้

หลังจากที่ผมได้ทดลองใช้ git flow แล้วมีความเห็นคือ

* การใช้ feature branch ทำให้เราทำงานแบบมีเป้าหมาย ตัวอย่าง ถ้านี้คือ `feature-export-pdf` คุณคงไม่อย่างจะ commit ว่า fix login message เข้าไปหรอกนะ
* การใช้ release branch เมื่อใช้กับการทำงานเป็น sprint แล้วสามารถนำ backlog ที่ทำเสร็จมาออกเป็น changelog ได้เลย
* การ release, hotfix มีการบันทึกไว้เพราะเราต้องสร้าง branch เป็นชื่อ tag นั้นเอง
* เนื่องจากในการใช้ release, hotfix ซึ่งจะรวมกลับไปทั้ง master และ develop ทำให้ทั้ง master และ develop มี configurate file ที่เหมือนกันเลย ดังนั้นทีมเลยต้องปรับตัวกับการใช้ environment variable หรือแนวคิดด้าน resource ambassador มากขึ้น

