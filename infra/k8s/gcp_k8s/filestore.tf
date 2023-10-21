resource "google_filestore_instance" "db-fs" {
  name     = "db-fs"
  location = var.gcp_region
  tier     = "BASIC_SSD"
  project  = var.project_id

  file_shares {
    capacity_gb = 1024
    name        = "share1"
  }

  networks {
    network = "default"
    modes   = ["MODE_IPV4"]
  }
}