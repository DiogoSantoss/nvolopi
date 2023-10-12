#Debugging
#OS_DEBUG=1
#TF_LOG=DEBUG

locals {
  credentials_file = file(var.credentials_file)
  credentials      = jsondecode(local.credentials_file)
}

provider "google" {
  credentials = local.credentials_file
  project     = local.credentials.project_id
  region      = var.gcp_region
  zone        = var.gcp_zone
}
