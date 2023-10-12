# Deploy infrastructure to GCR
cd /home/vagrant/infra
terraform init
terraform plan
terraform apply -auto-approve

# Pull Docker images from GCR and start the containers
ansible-playbook deploy-containers.yml