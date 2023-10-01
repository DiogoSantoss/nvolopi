# Terraform Openstack (VM Cloud) multi tier deployment

#Debugging
#OS_DEBUG=1
#TF_LOG=DEBUG

locals {
  credentials-file = file(var.credentials-file)
  credentials      = jsondecode(local.credentials-file)
}

provider "google" {
  credentials = local.credentials-file
  project     = local.credentials.project_id
  region      = var.region
  zone        = var.zone
}
