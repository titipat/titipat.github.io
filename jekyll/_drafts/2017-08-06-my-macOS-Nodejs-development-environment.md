---
title: macOS Node.js development environment ของผม
---

หลังจากที่ผมได้เล่าของ PHP ไปแล้วจะขอต่อด้วย Node.js ซึ่งเป็นภาษาหลักที่ผมเขียนอยู่ในตอนนี้ ผมใช้ [nvm](https://github.com/creationix/nvm) ตัว Package manager ถ้าในเครื่องเองจะยังใช้ [npm](https://github.com/npm/npm) อยู่ยกเว้นถ้าขึ้น Production แล้วจะเปลี่ยนเป็น [yarn](https://github.com/yarnpkg/yarn) ผมใช้ [jest](https://facebook.github.io/jest/) เป็น testing framework คู่กับ [sinon](http://sinonjs.org/) ในการทำ spy, stub, mock ด้าน Coding standard ผมใช้ที่ชื่อว่า [standard](https://standardjs.com/) คู่กับ [prettier](https://github.com/prettier/prettier) ในการจัดฟอร์แมต

## NVM

เนื่องจาก Node.js เป็นภาษาที่เปลี่ยนเวอร์ชันค่อนข้างรวดเร็ว ทำให้ผมไม่ได้ลงจาก [Installer จากหน้าเว็บหลัก](https://nodejs.org/en/download/) แต่จะใช้  [nvm](https://github.com/creationix/nvm) แทนที่ช่วยให้สลับเวอร์ชันได้อย่างรวดเร็ว นอกจากการอัพเดตเวอร์ชันแล้วเกิดจากผมเปลี่ยนมาเขียน [Serverless](https://github.com/serverless/serverless) แทน [expressjs](https://expressjs.com/) เรื่องเวอร์ชันจึงสำคัญมากเพราะผู้ให้บริการอย่าง AWS Lambda หรือ Google Cloud Functions ก็ระบุเวอร์ชันเจาะจงเอาไว้

ผมลงผ่าน [homebrew](https://brew.sh/) ครับ

```
$ brew install nvm
$ nvm install node # get the latest version
$ nvm install --lts # get the latest lts

# set default version to the latest
$ nvm alias default node

# choose version
$ nvm use <--lts|node>
```

## NPM, Yarn

ผมยอมรับเรื่องความเร็วของ yarn มาก แต่ว่ามันชอบมีปัญหากับเครื่องมือพัฒนาที่อยู่ใน "devDependencies" บ่อยครั้ง ผมจึงใช้เฉพาะบน Production เท่านั้น

## Jest

[jest](https://facebook.github.io/jest/) เป็นเครื่องมือ Testing framework ที่พัฒนาโดยเฟสบุ๊คครับ ก่อนหน้าที่ผมใช้ [mochajs](https://mochajs.org/) แต่พบปัญหากับ [Arrow function](https://mochajs.org/#arrow-functions) และปัญหาความเร็วในการรัน jest สามารถตอบโจทย์ส่วนนี้ผมได้หมด แล้วก็มันมี coverage ในตัวด้วยนะ ปกติผมจะเขียนไว้ใน [npm-scripts](https://docs.npmjs.com/misc/scripts)

```
{
  "scripts": {
    "test": "jest --silent --coverage"
  }
}
```

## Sinon

เป็นเครื่องมือ [Test double](https://martinfowler.com/bliki/TestDouble.html) ที่จำเป็นมากในการเขียน Backend แนว Data-intensive ในแง่ว่าข้อมูลไม่จบแค่ที่เดียว มันมีหลายระบบ หลาย Dependency ภายนอกเข้ามาเกี่ยวข้อง sinon จะช่วยทำหน้าที่ตรงนี้ได้เมื่อเขียนเทส

## Coding standard

ผมใช้ [standard](https://standardjs.com/) มาได้เกือบจะสองปีแล้วด้วยความชอบแนวคิดมีเท่าที่จำเป็น (Single quote, no unused variables, no semicolons) และเพิ่ม [prettier](https://github.com/prettier/prettier) มาเพื่อช่วยจัดโค้ดให้อ่านง่ายขึ้น และผมเขียนลง [npm-scripts](https://docs.npmjs.com/misc/scripts) เช่นกัน

```
{
  "scripts": {
    "standard": "standard --fix YOUR_SOURCE/**/*.js",
    "prettier": "prettier --write --single-quote --no-semi YOUR_SOURCE/**/*.js",
  }
}
```

## Miscellaneous

* [lodash](https://lodash.com/) เป็น Utility library หลัก
* [chai](http://chaijs.com/) เป็น Assertion library เวลาเขียนเทส
* [supertest](https://github.com/visionmedia/supertest) เป็น HTTP assertion library เวลาเขียนเทส
* [bluebird](http://bluebirdjs.com/docs/getting-started.html) ในการจัดการ Promise ทั้งหลาย แต่ใช้น้อยลงถ้าเขียนเวอร์ชัน 8.x เพราะย้ายมา async/await แล้ว
* [pug](https://pugjs.org/api/getting-started.html) ในการทำ Server-side rendering
* [dotenv](https://github.com/motdotla/dotenv) ในการสร้าง Configuration file

ทั้งหมดนี้ก็เป็นเครื่องมือที่ผมใช้เขียน Node.js ครับ แล้วทุกคนใช้อะไรกันบ้าง? วันหลังเล่าให้ผมฟังบ้างสิ สำหรับวันนี้สวัสดีครับ