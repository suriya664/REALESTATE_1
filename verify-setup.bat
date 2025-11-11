@echo off
echo 🔍 Verifying GitHub Pages Setup...
echo ==================================

echo 📁 Checking file structure...
if exist "index.html" (
    echo ✅ index.html found in root
) else (
    echo ❌ index.html NOT found in root
)

if exist "about.html" (
    echo ✅ about.html found in root
) else (
    echo ❌ about.html NOT found in root
)

if exist "assets" (
    echo ✅ assets folder found
) else (
    echo ❌ assets folder NOT found
)

if exist "pages" (
    echo ⚠️  pages folder still exists (should be empty or removed)
) else (
    echo ✅ pages folder removed (good!)
)

echo.
echo 🔗 Checking for correct asset paths...
findstr /C:"href=\"assets/" index.html >nul
if %errorlevel%==0 (
    echo ✅ Asset paths look correct
) else (
    echo ❌ Asset paths may need fixing
)

echo.
echo 📋 Summary:
echo - All HTML files should be in root directory
echo - Asset paths should be "assets/" not "../assets/"
echo - No pages/ folder should exist
echo.
echo 🚀 Ready to commit and push to GitHub!
pause
