echo $CLIENT_SECRET | base64 --decode > ${HOME}/client-secret.json
sudo /opt/google-cloud-sdk/bin/gcloud  auth activate-service-account --key-file ${HOME}/client-secret.json

sudo /opt/google-cloud-sdk/bin/gcloud  config set container/cluster staging
sudo /opt/google-cloud-sdk/bin/gcloud  container clusters get-credentials staging

sudo /opt/google-cloud-sdk/bin/gcloud  config set compute/zone us-central1-a
sudo /opt/google-cloud-sdk/bin/gcloud  config set project $GCLOUD_PROJECT

sudo /opt/google-cloud-sdk/bin/gcloud --quiet components update kubectl
sudo /opt/google-cloud-sdk/bin/gcloud --quiet components update

docker build -t ledger-graph .
docker tag ledger-graph gcr.io/ledger-graph/ledger-graph
sudo /opt/google-cloud-sdk/bin/gcloud docker push gcr.io/ledger-graph/ledger-graph

sudo kubectl delete -f ledger-graph-rc.json
sudo kubectl create -f ledger-graph-rc.json
