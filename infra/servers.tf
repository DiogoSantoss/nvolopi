data "google_service_account" "default" {
  account_id = local.credentials.client_email
}

resource "google_compute_instance" "backend" {
  name         = "backend"
  machine_type = var.machine_type
  zone         = var.zone

  boot_disk {
    initialize_params {
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
    ssh-keys = "ubuntu:${file("/home/vagrant/.ssh/id_rsa.pub")}"
  }

  service_account {
    # Google recommends custom service accounts that have cloud-platform scope and permissions granted via IAM Roles.
    email  = data.google_service_account.default.email
    scopes = ["cloud-platform"]
  }
}

resource "google_compute_instance" "frontend" {
  name         = "frontend"
  machine_type = var.machine_type
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  tags = ["frontend"]

  network_interface {
    network = "default"

    access_config {
      // Ephemeral public IP
    }
  }

  metadata = {
    ssh-keys = "ubuntu:${file("/home/vagrant/.ssh/id_rsa.pub")}"
  }

  service_account {
    # Google recommends custom service accounts that have cloud-platform scope and permissions granted via IAM Roles.
    email  = data.google_service_account.default.email
    scopes = ["cloud-platform"]
  }

  # TODO
  provisioner "file" {
    source = var.credentials-file
    destination = "/tmp/test_file" # TODO

    #connection {
    #  type = "ssh"
    #  user = "jon"
    #  private_key = "${file("./creds/gcloud_instance")}"
    #  agent = "false"
    #}
  }
}
