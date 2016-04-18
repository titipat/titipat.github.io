---
layout: post
title: ทดลองใช้ Git commit message แบบ Udacity
---

เพื่อนในทีมชวนให้ผมลองใช้ [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/) ผมถูกใจมากเลยเอามาเล่าต่อ โดยในการใช้งานจะมีรูปแบบดังนี้

```
type: subject

body

footer
```

## Type

จุดเด่นเลยคือการเพิ่ม type เข้าไปข้างหน้า commit message เพื่อระบุว่าใน commit นั้นเกี่ยวกับอะไรและแบ่งได้ดังนี้

* feat: เมื่อมีการเพิ่ม feature
* fix: เมื่อแก้บัค
* docs: เมื่อมีการเพิ่ม inline-document เข้ามา ที่สำคัญและต้องไม่มีการเปลี่ยนแปลง production code ใดๆ
* style: เมื่อมีการจัด styling ต่างๆ เช่น เพิ่ม semi colon ใน javascript เช่นกันว่าต้องไม่มีการเปลี่ยน production code นะ
* refactor: ตรงตามตัว เมื่อทำการ refactor production code
* test: ทุกอย่างที่เกี่ยวกับเทส เพิ่มเทส, refactor test แต่ห้ามแก้ production code
* chore: งานบ้านที่ไม่เกี่ยวกับ production code เช่น แก้ build script, แก้ task runner script เป็นต้น

## Subject

สารภาพเลยว่าผมเองก็ยังไม่สามารถเขียน subject message ที่ดีได้ แต่เอาเป็นว่าไม่ควรยาวเกิน 50 ตัวอักษร พยายามใช้ verb ธรรมดาที่แหละ เช่น ใช้ change ก็พอไม่ต้อง changed, changes แล้วก็ไม่ต้องลงท้ายด้วยจุด

## Body

อาจจะไม่ต้องใส่ก็ได้ถ้า subject นั้นสามารถอธิบายได้ในตัวมันเองแล้ว ถ้าจำเป็นจริงๆ พยายามให้มันอธิบาย **what** และ **why** มากกว่า **how** เพราะมันดูได้จาก code change อยู่แล้วนิ แล้วก็พยายามอย่าให้เกินบรรทัดละ 72 ตัวล่ะ

## Footer

เสริมเฉยๆ เอาไว้ใส่ issue id ไว้เผื่ออ้างอิงทีหลัง

ทั้งนี้ผมเองก็ยังทำงานระบบทีมจริงๆ ได้ไม่ถึงปีเลย ประสบการณ์การใช้ git แบบจริงจังเลยยังน้อยนิด ดังนั้นอาจจะมีหลายส่วนตกหล่นไป ผู้ที่สนใจสามารถตามไปเก็บตกได้ที่ [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/) ครับ
