variable "project_id" {
  type = string
}

variable "machine_type" {
  type = string
  default = "n1-standard-2"
}

variable "gcp_region" {
  type = string
  default = "europe-west1-c"
}

variable "workers_count" {
  type = number
  default = 5  
}
