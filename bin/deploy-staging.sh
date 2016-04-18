VERSION="$(git rev-parse HEAD)"

echo $CLIENT_SECRET | base64 --decode > ${HOME}/client-secret.json

sudo /opt/google-cloud-sdk/bin/gcloud config set compute/zone us-central1-a
sudo /opt/google-cloud-sdk/bin/gcloud config set project $GCLOUD_PROJECT

sudo /opt/google-cloud-sdk/bin/gcloud --quiet components install kubectl
sudo /opt/google-cloud-sdk/bin/gcloud --quiet components update

sudo /opt/google-cloud-sdk/bin/gcloud auth activate-service-account --key-file ${HOME}/client-secret.json

sudo /opt/google-cloud-sdk/bin/gcloud config set container/cluster staging
sudo /opt/google-cloud-sdk/bin/gcloud container clusters get-credentials staging

sudo docker build -q -t ledger-graph:${VERSION} .
sudo docker tag ledger-graph:${VERSION} gcr.io/ledger-graph/ledger-graph:${VERSION}
sudo /opt/google-cloud-sdk/bin/gcloud docker push gcr.io/ledger-graph/ledger-graph:${VERSION}

sudo /opt/google-cloud-sdk/bin/kubectl rolling-update ledger-graph ledger-graph:${VERSION} --image=gcr.io/ledger-graph/ledger-graph:${VERSION}
