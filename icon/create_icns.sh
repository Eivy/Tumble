#!/bin/sh
mkdir Tumble.iconset
convert -resize 16x16 Tumble.png Tumble.iconset/icon_16x16.png
convert -resize 32x32 Tumble.png Tumble.iconset/icon_16x16@2x.png
convert -resize 32x32 Tumble.png Tumble.iconset/icon_32x32.png
convert -resize 64x64 Tumble.png Tumble.iconset/icon_32x32@2x.png
convert -resize 128x128 Tumble.png Tumble.iconset/icon_128x128.png
convert -resize 256x256 Tumble.png Tumble.iconset/icon_128x128@2x.png
convert -resize 256x256 Tumble.png Tumble.iconset/icon_256x256.png
convert -resize 512x512 Tumble.png Tumble.iconset/icon_512x512.png
convert -resize 1024x1024 Tumble.png Tumble.iconset/icon_512x512@2x.png
iconutil -c icns Tumble.iconset
