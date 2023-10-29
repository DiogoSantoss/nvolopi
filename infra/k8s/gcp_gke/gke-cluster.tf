resource "google_container_cluster" "nvolopi" {
  name                = "nvolopi"
  project             = var.project_id
  location            = var.gcp_region
  initial_node_count  = var.workers_count
  deletion_protection = false

  # Remove default node pool and use our own with autoscaling
  remove_default_node_pool = true
  #initial_node_count = 1

  addons_config {
    network_policy_config {
      disabled = true
    }
  }

  node_config {
    machine_type = var.machine_type
    disk_size_gb = 10
    oauth_scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append",
      "https://www.googleapis.com/auth/compute",
    ]
  }
}

resource "google_container_node_pool" "nvolopi" {
  name       = "nvolopi"
  project    = var.project_id
  location   = var.gcp_region
  cluster    = google_container_cluster.nvolopi.name
  node_count = 1

  autoscaling {
    min_node_count = 1
    max_node_count = 10
  }

  node_config {
    machine_type = var.machine_type
    oauth_scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append",
      "https://www.googleapis.com/auth/compute",
    ]
  }
}

resource "google_compute_disk" "persistentfs" {
  name                      = "persistentfs"
  type                      = "pd-ssd"
  zone                      = var.gcp_region
  project                   = var.project_id
  size                      = 20
  physical_block_size_bytes = 4096
}