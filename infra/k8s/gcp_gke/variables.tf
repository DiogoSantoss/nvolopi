variable "project_id" {
  type = string
}

variable "machine_type" {
  type    = string
  default = "e2-standard-2"
}

variable "gcp_region" {
  type = string
}

variable "workers_count" {
  type    = number
  default = 5
}
