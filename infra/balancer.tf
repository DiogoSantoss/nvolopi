# resource "google_compute_region_network_endpoint_group" "serverless_neg" {
#   name                  = "serverless-neg"
#   network_endpoint_type = "SERVERLESS"
#   
#   cloud_run {
#     service = google_cloud_run_service.default.name
#   }
# }
# 
# resource "google_cloud_run_service" "default" {
#   name     = "example"
# 
#   template {
#     spec {
#       containers {
#         image = "gcr.io/cloudrun/hello"
#       }
#     }
#   }
#   metadata {
#     annotations = {
#       # For valid annotation values and descriptions, see
#       # https://cloud.google.com/sdk/gcloud/reference/run/deploy#--ingress
#       "run.googleapis.com/ingress" = "all"
#     }
#   }
# }
# 
# resource "google_cloud_run_service_iam_member" "public-access" {
#   location = google_cloud_run_service.default.location
#   project  = google_cloud_run_service.default.project
#   service  = google_cloud_run_service.default.name
#   role     = "roles/run.invoker"
#   member   = "allUsers"
# }