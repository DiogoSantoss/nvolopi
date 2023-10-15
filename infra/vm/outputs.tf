output "auth" {
  value = google_compute_instance.auth.network_interface.0.access_config.0.nat_ip
}

output "upload" {
  value = google_compute_instance.upload.network_interface.0.access_config.0.nat_ip
}

output "frontend" {
  value = google_compute_instance.frontend.network_interface.0.access_config.0.nat_ip
}

output "database" {
  value = google_compute_instance.database.network_interface.0.access_config.0.nat_ip
}

resource "local_file" "ansible_inventory" {
  filename = "inventory.cfg"
  content = <<EOF
  
frontend  ansible_host=${google_compute_instance.frontend.network_interface.0.access_config.0.nat_ip} ansible_user=ubuntu   ansible_python_interpreter=/usr/bin/python3   ansible_connection=ssh container_name="gcr.io/${local.credentials.project_id}/frontend:${var.frontend_version}"
auth   ansible_host=${google_compute_instance.auth.network_interface.0.access_config.0.nat_ip} 	ansible_user=ubuntu   ansible_python_interpreter=/usr/bin/python3   ansible_connection=ssh container_name="gcr.io/${local.credentials.project_id}/service/auth:${var.auth_version}"
upload   ansible_host=${google_compute_instance.upload.network_interface.0.access_config.0.nat_ip} 	ansible_user=ubuntu   ansible_python_interpreter=/usr/bin/python3   ansible_connection=ssh container_name="gcr.io/${local.credentials.project_id}/service/upload:${var.upload_version}"
database   ansible_host=${google_compute_instance.database.network_interface.0.access_config.0.nat_ip} 	ansible_user=ubuntu   ansible_python_interpreter=/usr/bin/python3   ansible_connection=ssh

[targets]
frontend
auth
upload
database

[backend]
auth
upload


EOF
}

resource "local_file" "nginx_conf" {
  filename = "nginx.conf"
  content = <<EOF

server {

  listen 80;

  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }

  error_page 500 502 503 504 /50x.html;

  location = /50x.html {
      root /usr/share/nginx/html;
  }

  location /api/auth {
      proxy_pass http://${google_compute_instance.auth.network_interface.0.access_config.0.nat_ip};
  }

  location /api/upload {
      proxy_pass http://${google_compute_instance.upload.network_interface.0.access_config.0.nat_ip};
  }

}

EOF
}

resource "local_file" "backend_dotenv" {
  filename = ".env"
  content = <<EOF

PORT=3001
MONGO_URI="mongodb://${google_compute_instance.database.network_interface.0.access_config.0.nat_ip}/nvolopi"

EOF
}