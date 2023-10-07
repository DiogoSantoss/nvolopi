# Deploy infrastructure to GCR
cd /home/vagrant/infra
terraform init

# Pull Docker images from GCR and start the containers
ansible-playbook deploy-containers.yml