MOUNT_PATH=$(echo '/ledger-graph' | base64)

sed "s/{{MOUNT_PATH}}/${MOUNT_PATH}/g" ledger-graph-config.yml > ledger-graph-config.set.yml

kubectl apply -f ledger-graph-config.set.yml
