user=$(echo 'neo4j' | base64)
password=$(echo $1 | base64)
auth=$(echo "${user}/${password}" | base64)

sed "s/{{user}}/${user}/g;s/{{password}}/${password}/g" db-credentials.yml > db-credentials.set.yml
sed "s/{{auth}}/${auth}/g" neo4j-admin-credentials.yml > neo4j-admin-credentials.set.yml

kubectl apply -f neo4j-admin-credentials.set.yml
kubectl apply -f db-credentials.set.yml
