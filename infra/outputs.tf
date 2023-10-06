output "backend" {
  value = google_compute_instance.backend.network_interface.0.access_config.0.nat_ip
}

output "frontend" {
  value = google_compute_instance.frontend.network_interface.0.access_config.0.nat_ip
}

resource "local_file" "ansible_inventory" {
  filename = "inventory.cfg"
  content = <<EOF
  
[targets]
backend		ansible_host=${google_compute_instance.backend.network_interface.0.access_config.0.nat_ip} 	ansible_user=nvolopi   ansible_python_interpreter=/usr/bin/python3   ansible_connection=ssh container_name="gcr.io/${local.credentials.project_id}/backend"
frontend		ansible_host=${google_compute_instance.frontend.network_interface.0.access_config.0.nat_ip} 	ansible_user=nvolopi   ansible_python_interpreter=/usr/bin/python3   ansible_connection=ssh container_name="gcr.io/${local.credentials.project_id}/frontend"

EOF
}
