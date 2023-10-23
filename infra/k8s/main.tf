variable "credentials_file" {
  type = string
}

variable "gcp_region" {
  type    = string
  default = "northamerica-northeast1-a"
}

locals {
  credentials_file = file(var.credentials_file)
  credentials      = jsondecode(local.credentials_file)
}

data "google_client_config" "default" {
  depends_on = [module.gcp_gke]
}

module "gcp_gke" {
  source     = "./gcp_gke"
  project_id = local.credentials.project_id
  gcp_region = var.gcp_region
}

module "gcp_k8s" {
  source                 = "./gcp_k8s"
  host                   = module.gcp_gke.host
  cluster                = module.gcp_gke.cluster
  client_certificate     = module.gcp_gke.client_certificate
  client_key             = module.gcp_gke.client_key
  cluster_ca_certificate = module.gcp_gke.cluster_ca_certificate
  project_id             = local.credentials.project_id
  gcp_region             = var.gcp_region
}