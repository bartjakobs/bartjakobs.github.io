---
layout: page
categories: portfolio
title: ✨Gameboy Advance as game controller 
thing: GBA as a game controller
subtitle: I used a
date: 2019-04-18
info:
  When: Last year
  What I used: Raspberry Pi, Gameboy Advance
  Programmed in: Python, C++
  Multiboot Project: <a href="https://github.com/bartjakobs/GBA-Multiboot-Python">On Github!</a>
  The rest of the code: Maybe someday on Github?

pictures:
  - /assets/gba/movie.gif
---

I was playing emulator games on my computer, but did not like playing it on a keyboard. 
I had some experience in writing GBA games using [DevKitPro], so my plan was to try and use a Gameboy Advance as game controller.

First, I had to find a way to play homebrew games on an actual gameboy advance while developing, without having to place them on an SD card every time. 
The Gameboy Advance can be booted via the link cable using Multiboot. On Github I found a tool written in C that could upload a multiboot rom from a Raspberry Pi. I've ported that project to Python: [Multiboot]. 

Using DevkitPro I made a C++ program that continuously read the GBA memory register that stored the key input, and would write it to the link port using SPI.

On the Raspberry Pi, I wrote a program to read the values from the SPI pins. The next step was to send the input to the computer. For that, I used the Raspberry Pi Zero as a [USB Keyboard] gadget.


[DevKitPro]:https://devkitpro.org
[Multiboot]:https://github.com/bartjakobs/GBA-Multiboot-Python
[USB Keyboard]:https://randomnerdtutorials.com/raspberry-pi-zero-usb-keyboard-hid/
