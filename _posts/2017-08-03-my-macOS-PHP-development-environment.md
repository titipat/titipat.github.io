---
title: macOS PHP development environment ของผม
---

ผมเขียน PHP ครั้งสุดท้ายเมื่อต้นปีแต่ก็ยังมีคนมาถามอยู่บ่อยๆ ว่าใน macOS Sierra ผมใช้อะไรบ้าง หลักๆ ผมไม่ได้ใช้ Bundle tool อย่าง MAMP, XAMPP แต่จะใช้ PHP built-in server คู่กับ MariaDB ที่ลงจาก homebrew และมี brew-php-switcher คู่กับ docker เป็นเครื่องมือเสริม ด้านการเทสผมใช้ codeception และมีเครื่องมีชื่อ PHP_CodeSniffer เป็นตัวเช็คมาตรระดับ PSR-2 เป็นอันสิ้นสุด

## Homebrew

Homebrew เป็นเครื่องมือประเภท Package manager เทียบได้กับ apt-get ของ Ubuntu/Debian, chocolatey ของ Windows หาลงได้จากที่ https://brew.sh/

จากนั้นจะทำการลง Taps (third-party repositories) ที่ชื่อ homebrew-php (มันคืออะไรข้างในอ่านต่อได้ที่ https://github.com/Homebrew/homebrew-php) เพราะว่าเครื่องมืออื่นๆ ของ PHP จะอยู่ที่นี้ด้วยคำสั่ง

```
$ brew tap homebrew/homebrew-php
```

## PHP

PHP ที่ติดมากับเครื่อง macOS ผมเข้าใจว่าเป็น 5.6.x ดังนั้นผมจะลง PHP 7.1 ซึ่งเป็น Current stable (ณ เวลาที่เขียน) โดยคำสั่ง

```
brew install php71
```

สำหรับใครที่ต้องการหาไลบรารี่อื่นๆ สามารถลองหาของเวอร์ชันนั้นได้

```
# $ brew search php71-<LIB_NAME>
$ brew search php71-mcrypt
```

พอเจอทีต้องการก็ลงเลย

```
$ brew install php71-mcrypt
```

เนื่องจากบางครั้งต้องทำงานกับ PHP 5.6 ด้วย การจะนั่งลงใหม่ก็เสียเวลาผมเลยจะใช้เครื่องมือที่ชื่อ brew-php-switcher เพื่อให้สลับได้อย่างรวดเร็ว

```
$ brew install brew-php-switcher
$ brew install php56
$ brew-php-switcher php71 # set active php version to 7.1
```

แล้วก็ผมไม่อยากยัด composer.phar เข้าไปใน Code repository ด้วยดังนั้นผมจะลง composer ไว้ที่เครื่องตัวเองเลย

```
brew install composer
```

## Docker

บางงานที่ไม่ได้ทำ Continuous integration (CI), Continuous Deployment (CD) pipeline เอาไว้ยังอาจจะต้องนั่ง build, push มืออยู่เลยต้องลงติดไว้กับเครื่องมือ Container แห่งยุค https://www.docker.com/

## MySQL server

ผมชอบใช้ MariaDB มากกว่า MySQL ทั้งในแง่ของเทคนิค(ซึ่งจะไม่อธิบายตรงนี้เพราะยาวแน่) และความชอบส่วนตัวดังนั้นลงๆ ไปเถอะ

```
brew install mysql
```

ตรงนี้เราเลือกได้ว่าจะให้มัน Auto start ทุกครั้งที่เปิดเครื่องไหมด้วยเครื่องมือ homebrew-services https://github.com/Homebrew/homebrew-services

```
# to enable auto start
$ brew services start

# to run without auto start
$ brew services run mysql
# or
$ mysql.server start

# to disable auto start
$ brew services stop mysql
```

## Codeception

ตัวนี้เป็น Testing framework ที่ผมว่าครบเลยตัวหนึ่ง ผมจะลงผ่าน homebrew ด้วย

```
$ brew install codeception
```

แต่เวลาเรียกใช้จะเป็น

```
$ codecept run
```

## PHP_CodeSniffer

เป็นเครื่องมือที่ช่วยตรวจหาการฝ่าฝืน Coding standard ที่ในทีมมีการตกลงกันไว้แล้ว จริงๆ มันมีเครื่องมืออีกตัวชื่อ phpcbf ที่ช่วยแก้ให้เราเองแต่ผมไม่ได้เพราะอยากจะฝึกแก้ด้วยตัวเองให้เป็นนิสัย ผมมักใช้คู่กับ PSR-2 (http://www.php-fig.org/psr/psr-2/)

```
# to install
$ brew install php-code-sniffer
# to use
$ phpcs --standard=PSR2 your_files/
```

ทั้งหมดนี้เขียนสดตามที่จำได้โดยไม่ลองทำตาม ตรงไหนติดขัดทักเข้ามาได้ครับ แล้วพบกันใหม่

