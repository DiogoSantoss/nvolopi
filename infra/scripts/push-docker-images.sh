cd ../../services/upload
docker build -t gcr.io/studied-reason-400621/service/upload:latest .
docker push gcr.io/studied-reason-400621/service/upload:latest
cd ../auth
docker build -t gcr.io/studied-reason-400621/service/auth:latest .
docker push gcr.io/studied-reason-400621/service/auth:latest
cd ../../frontend
docker build -t gcr.io/studied-reason-400621/frontend:latest .
docker push gcr.io/studied-reason-400621/frontend:latest
