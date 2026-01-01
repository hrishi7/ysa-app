#!/bin/bash

# Ensure directory exists
mkdir -p builds

echo "🧹 Cleaning previous builds..."
rm -rf android
rm -rf ios

echo "🏗️  Generating Android Development Build..."
# Run local build using EAS logic but locally via expo run:android variant
# We use assembleDebug to get a debug APK
npx expo prebuild --platform android --clean
cd android && ./gradlew assembleDebug

echo "✅ Build completed!"

# Move APK to builds folder
echo "📦 Moving APK to builds/ directory..."
cp app/build/outputs/apk/debug/app-debug.apk ../builds/development-build.apk

echo "🚀 APK ready at: builds/development-build.apk"
echo "📲 Install with: adb install builds/development-build.apk"
