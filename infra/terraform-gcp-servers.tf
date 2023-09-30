resource "google_compute_instance" "backend-upload" {
  name         = "backend-upload"
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

  // Local SSD disk
  scratch_disk {
    interface = "SCSI"
  }

  network_interface {
    network = "default"

    access_config {
      // Ephemeral public IP
    }
  }

  metadata = {
    foo = "bar"
  }

  metadata_startup_script = "echo hello from the upload microservice :D"

  service_account {
    # Google recommends custom service accounts that have cloud-platform scope and permissions granted via IAM Roles.
    email  = google_service_account.default.email
    scopes = ["cloud-platform"]
  }

  tags = ["upload"]
}

resource "google_compute_instance" "backend-download" {
  name         = "backend-download"
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

  // Local SSD disk
  scratch_disk {
    interface = "SCSI"
  }

  network_interface {
    network = "default"

    access_config {
      // Ephemeral public IP
    }
  }

  metadata = {
    foo = "bar"
  }

  metadata_startup_script = "echo hello from the download microservice :3"

  service_account {
    # Google recommends custom service accounts that have cloud-platform scope and permissions granted via IAM Roles.
    email  = google_service_account.default.email
    scopes = ["cloud-platform"]
  }

  tags = ["download"]
}