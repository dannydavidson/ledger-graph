MOUNT_PATH=$(echo '/ledger-graph' | base64)
DEBUG=$(echo 'express:router' | base64)

sed "s/{{MOUNT_PATH}}/${MOUNT_PATH}/g;s/{{DEBUG}}/${DEBUG}/g" ledger-graph-config.yml > ledger-graph-config.set.yml

kubectl apply -f ledger-graph-config.set.yml
