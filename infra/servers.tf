data "google_service_account" "default" {
  account_id = local.credentials.client_email
}

resource "google_compute_instance" "backend" {
  name         = "backend"
  machine_type = var.machine_type
  zone         = var.zone

  boot_disk {
    initialize_params {
      # TODO: Change to our own Docker image
      image = "debian-cloud/debian-11"
      labels = {
        my_label = "value"
      }
    }
  }

  tags = ["backend"]

  network_interface {
    network = "default"

    access_config {
      // Ephemeral public IP
    }
  }

  metadata = {
    foo = "bar"
  }

  metadata_startup_script = "echo 'hello from the backend microservice :D'"

  service_account {
    # Google recommends custom service accounts that have cloud-platform scope and permissions granted via IAM Roles.
    email  = data.google_service_account.default.email
    scopes = ["cloud-platform"]
  }

}