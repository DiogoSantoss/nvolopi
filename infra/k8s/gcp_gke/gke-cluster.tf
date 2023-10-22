resource "google_container_cluster" "nvolopi" {
  name                = "nvolopi"
  project             = var.project_id
  location            = var.gcp_region
  initial_node_count  = var.workers_count
  deletion_protection = false

  cluster_autoscaling {
    enabled = true
    resource_limits {
      resource_type = "cpu"
      minimum       = 10
      maximum       = 16
    }
    resource_limits {
      resource_type = "memory"
      minimum       = 24
      maximum       = 64
    }
  }

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

resource "google_compute_disk" "persistentfs" {
  name                      = "persistentfs"
  type                      = "pd-ssd"
  zone                      = var.gcp_region
  project                   = var.project_id
  size                      = 20
  physical_block_size_bytes = 4096
}

output "client_certificate" {
  value     = google_container_cluster.nvolopi.master_auth.0.client_certificate
  sensitive = true
}

output "client_key" {
  value     = google_container_cluster.nvolopi.master_auth.0.client_key
  sensitive = true
}

output "cluster_ca_certificate" {
  value     = google_container_cluster.nvolopi.master_auth.0.cluster_ca_certificate
  sensitive = true
}

output "host" {
  value     = google_container_cluster.nvolopi.endpoint
  sensitive = true
}

output "cluster" {
  value     = google_container_cluster.nvolopi
  sensitive = true
}
