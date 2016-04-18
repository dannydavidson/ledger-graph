echo $CLIENT_SECRET | base64 --decode > ${HOME}/client-secret.json
gcloud auth activate-service-account --key-file ${HOME}/client-secret.json

gcloud config set container/cluster staging
gcloud container clusters get-credentials staging

gcloud config set compute/zone us-central1-a
gcloud config set project $GCLOUD_PROJECT
gcloud config set

gcloud --quiet components update
gcloud --quiet components update kubectl

docker build -t ledger-graph .
docker tag ledger-graph gcr.io/ledger-graph/ledger-graph
gcloud docker push gcr.io/ledger-graph/ledger-graph

kubectl delete -f ledger-graph-rc.json
kubectl create -f ledger-graph-rc.json
