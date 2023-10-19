variable "credentials_file" {
  type = string
}

locals {
  credentials_file = file(var.credentials_file)
  credentials      = jsondecode(local.credentials_file)
}

# Configure Kubernetes provider with OAuth2 access token
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/client_config
# This fetches a new token, which will expire in 1 hour.
data "google_client_config" "default" {
  depends_on = [module.gcp_gke]
}


#####################################################################
# Modules for Provisioning and Deployment
#####################################################################

# The module in folder 'gcp_gke' defines the Kubernetes Cluster
module "gcp_gke" {
  source   = "./gcp_gke"
  project_id = local.credentials.project_id
}

# The module in folder 'gcp_k8s' defines the Pods and Services
module "gcp_k8s" {
  source   = "./gcp_k8s"
  host     = module.gcp_gke.host
  cluster  = module.gcp_gke.cluster
  client_certificate     = module.gcp_gke.client_certificate
  client_key             = module.gcp_gke.client_key
  cluster_ca_certificate = module.gcp_gke.cluster_ca_certificate
  project_id = local.credentials.project_id
}