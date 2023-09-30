# Terraform Openstack (VM Cloud) multi tier deployment

#Debugging
#OS_DEBUG=1
#TF_LOG=DEBUG

provider "google" {
  auth_url            = var.auth_url
  user_domain_name    = var.user_domain_name
  region              = var.region
  tenant_name         = var.tenant_name
  tenant_id           = var.tenant_id
  user_name           = var.user_name
  password            = var.password
}

output "terraform-provider" {
    value = "Connected with VM Cloud at var.auth_url"
}
