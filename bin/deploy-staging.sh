echo $CLIENT_SECRET | base64 --decode > ${HOME}/client-secret.json
gcloud auth activate-service-account --key-file ${HOME}/client-secret.json

gcloud config set compute/zone us-central1-a
gcloud config set project $GCLOUD_PROJECT

gcloud container clusters get-credentials staging

gcloud --quiet components update
gcloud --quiet components install kubectl

gcloud docker build -t ledger-graph .
gcloud docker tag ledger-graph gcr.io/ledger-graph/ledger-graph
gcloud docker push gcr.io/ledger-graph/ledger-graph

gcloud kubectl delete -f ledger-graph-rc.json
gcloud kubectl create -f ledger-graph-rc.json
