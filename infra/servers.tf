data "google_service_account" "default" {
  account_id = local.credentials.client_email
}

resource "google_compute_instance" "backend" {
  name         = "backend"
  machine_type = var.machine_type
  zone         = var.zone
  tags = ["backend"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
      labels = {
        my_label = "value"
      }
    }
  }

  network_interface {
    network = "default"

    access_config {
      // Ephemeral public IP
    }
  }

  # Allow mgmt node to ssh into this instance
  metadata = {
    ssh-keys = "ubuntu:${file("/home/vagrant/.ssh/id_rsa.pub")}"
  }
}

resource "google_compute_instance" "frontend" {
  name         = "frontend"
  machine_type = var.machine_type
  zone         = var.zone
  tags = ["frontend"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"

    access_config {
      // Ephemeral public IP
    }
  }

  # Allow mgmt node to ssh into this instance
  metadata = {
    ssh-keys = "ubuntu:${file("/home/vagrant/.ssh/id_rsa.pub")}"
  }
}
