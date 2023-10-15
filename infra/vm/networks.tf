resource "google_compute_firewall" "frontend_rules" {
  name    = "firewall"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags = ["frontend"]
}
