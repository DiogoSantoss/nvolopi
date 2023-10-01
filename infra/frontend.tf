resource "google_storage_bucket" "static_website" {
  name                        = "nvolopi-static-website-bucket"
  location                    = "EU"
  storage_class               = "STANDARD"

  website {
    main_page_suffix = "index.html"
  }
}

resource "google_storage_bucket_object" "static_website_src" {
  for_each = fileset("../frontend/build/", "**")
  name   = each.value
  source = "../frontend/build/${each.value}"
  bucket = google_storage_bucket.static_website.name
}

# Make new objects public
resource "google_storage_object_access_control" "public_rule" {
  for_each = google_storage_bucket_object.static_website_src
  object = each.value.output_name
  bucket = google_storage_bucket.static_website.name
  role   = "READER"
  entity = "allUsers"
}

# CDN / Load balancer(?)
resource "google_compute_backend_bucket" "default" {
  name        = "nvolopi"
  description = "Hello"
  bucket_name = google_storage_bucket.static_website.name
  enable_cdn  = true
}

resource "google_compute_url_map" "default" {
  name            = "http-lb"
  default_service = google_compute_backend_bucket.default.id
}

# Load balancer
resource "google_compute_target_http_proxy" "default" {
  name    = "http-lb-proxy"
  url_map = google_compute_url_map.default.id
}

# [START cloudloadbalancing_global_ext_bucket_ip]
# Reserve IP address
resource "google_compute_global_address" "default" {
  name = "nvolopi-ip"
}

resource "google_compute_global_forwarding_rule" "http" {
  name                  = "http-lb-forwarding-rule"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "80"
  target                = google_compute_target_http_proxy.default.id
  ip_address            = google_compute_global_address.default.id
}