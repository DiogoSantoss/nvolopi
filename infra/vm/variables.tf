variable "credentials_file" {}

###-----------------------------------------------------------------------------
### GCP variables
###-----------------------------------------------------------------------------

variable "gcp_region" {
  type = string
  default = "europe-southwest1"
}

variable "gcp_zone" {
  type = string
  default = "europe-southwest1-a"
}

variable "machine_type" {
  type = string
  # Should be enough
  default = "e2-medium"
}

###-----------------------------------------------------------------------------
### Docker image variables
###-----------------------------------------------------------------------------

variable "frontend_version" {
  type = string
  default = "latest"
}

variable "upload_version" {
  type = string
  default = "latest"
}

variable "auth_version" {
  type = string
  default = "latest"
}