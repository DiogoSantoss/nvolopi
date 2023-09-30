# Terraform Openstack (VM Cloud) multi tier deployment

#Debugging
#OS_DEBUG=1
#TF_LOG=DEBUG

provider "google" {
  credentials  = file(var.credentials)
  project      = var.project
  region       = var.region
  zone         = var.zone
}
