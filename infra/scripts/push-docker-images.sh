cd ../../services/upload
docker build -t gcr.io/studied-reason-400621/service/upload:0.1 .
docker push gcr.io/studied-reason-400621/service/upload:0.1
cd ../auth
docker build -t gcr.io/studied-reason-400621/service/auth:0.1 .
docker push gcr.io/studied-reason-400621/service/auth:0.1
cd ../../frontend
docker build -t gcr.io/studied-reason-400621/frontend/auth:0.1 .
docker push gcr.io/studied-reason-400621/frontend/auth:0.1
