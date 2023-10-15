data "google_service_account" "default" {
  account_id = local.credentials.client_email
}

resource "google_compute_instance" "auth" {
  name         = "auth"
  machine_type = var.machine_type
  zone         = var.gcp_zone
  tags = ["auth"]

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

resource "google_compute_instance" "upload" {
  name         = "upload"
  machine_type = var.machine_type
  zone         = var.gcp_zone
  tags = ["upload"]

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
  zone         = var.gcp_zone
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

resource "google_compute_instance" "database" {
  name         = "database"
  machine_type = var.machine_type
  zone         = var.gcp_zone
  tags = ["database"]

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