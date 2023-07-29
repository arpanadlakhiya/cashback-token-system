cd adpater
npm run build
docker build -f ./adpater/Dockerfile --no-cache -t cashback-token-system:latest .
sleep 5
cd ..
./deployment/cashbackplatform/start-components.sh