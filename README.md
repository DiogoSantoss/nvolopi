# Nvolopi

## Deployment

The [Vagrantfile](/infra/Vagrantfile) describes the configuration for the management node which is responsible for deploying the entire infrastructure to the Google Cloud.

Steps:
```bash
# Launch management node
cd infra
vagrant up
vagrant ssh
# Deploy infrastructure
cd infra
terraform init
terraform plan -out="terraform-plan"
terraform apply "terraform-plan"

# Destroy infrastructure
terraform destroy
# Destroy management node
vagrant destroy
```
