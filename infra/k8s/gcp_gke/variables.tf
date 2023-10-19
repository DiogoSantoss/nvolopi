variable "project_id" {
  type = string
}

variable "machine_type" {
  type = string
  # Should be enough
  default = "e2-medium"
}

variable "gcp_region" {
  type = string
  default = "europe-southwest1"
}

variable "workers_count" {
  type = number
  default = 1  
}
