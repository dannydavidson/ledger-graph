VERSION="$(git rev-parse --short HEAD)"
echo ${VERSION} > VERSION
echo $CLIENT_SECRET | base64 --decode > ${HOME}/client-secret.json

sudo /opt/google-cloud-sdk/bin/gcloud config set compute/zone us-central1-a
sudo /opt/google-cloud-sdk/bin/gcloud config set project $GCLOUD_PROJECT

sudo /opt/google-cloud-sdk/bin/gcloud --quiet components install kubectl
sudo /opt/google-cloud-sdk/bin/gcloud --quiet components update

sudo /opt/google-cloud-sdk/bin/gcloud auth activate-service-account --key-file ${HOME}/client-secret.json

sudo /opt/google-cloud-sdk/bin/gcloud config set container/cluster api-dannydavidson-com
sudo /opt/google-cloud-sdk/bin/gcloud container clusters get-credentials api-dannydavidson-com

sudo /opt/google-cloud-sdk/bin/gcloud docker build -q .
sudo /opt/google-cloud-sdk/bin/gcloud docker tag ledger-graph:${VERSION} gcr.io/api-dannydavidson-com/ledger-graph:${VERSION}
sudo /opt/google-cloud-sdk/bin/gcloud docker push gcr.io/api-dannydavidson-com/ledger-graph:${VERSION}

sed "s/{{LEDGER_GRAPH_VERSION}}/${VERSION}/g" ledger-graph.yml > ledger-graph.versioned.yml
sudo /opt/google-cloud-sdk/bin/kubectl apply -f ledger-graph.versioned.yml
