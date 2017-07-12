:: Frontend build process
echo "Starting frontend build..."
pushd %DEPLOYMENT_SOURCE%\frontend
echo " - Installing npm packages..."
npm install
echo " - Building..."
npm run build
echo " - Deploying frontend files..."
mkdir %DEPLOYMENT_TARGET%\static
xcopy %DEPLOYMENT_SOURCE%\frontend\build %DEPLOYMENT_TARGET%\static /Y
popd
echo "Frontend build done."
echo ""

:: Backend build process
echo "Starting backend build..."
pushd .\backend
echo " - Installing npm packages..."
npm install
echo " - Building..."
npm run build
echo " - Deploying node_modules..."
xcopy %DEPLOYMENT_SOURCE%\backend\node_modules %DEPLOYMENT_TARGET% /Y
echo " - Deploying server.js..."
xcopy %DEPLOYMENT_SOURCE%\backend\build %DEPLOYMENT_TARGET% /Y
popd
echo "Backend build done."
