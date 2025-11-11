@echo off
echo 🚀 Committing GitHub Pages Fix...
echo ================================

echo 📁 Adding all files to git...
git add .

echo 💾 Committing changes...
git commit -m "Fix GitHub Pages: Move files to root directory and update paths"

echo 📤 Pushing to GitHub...
git push origin main

echo ✅ Done! Your changes have been pushed to GitHub.
echo.
echo 🔧 Next steps:
echo 1. Go to your GitHub repository
echo 2. Click Settings → Pages
echo 3. Set Source to: Deploy from a branch → main → / (root)
echo 4. Wait 5-10 minutes for deployment
echo 5. Visit: https://yourusername.github.io/your-repository-name
echo.
echo 🎉 Your REAL ESTATE template should now work on GitHub Pages!
pause
