user=$(echo $1 | base64)
password=$(echo $2 | base64)

sed "s/{{user}}/${user}/g;s/{{password}}/${password}/g" db-credentials.yml > db-credentials.set.yml
kubectl apply -f db-credentials.set.yml
