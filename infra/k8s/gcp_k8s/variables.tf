variable "cluster" {
} 

variable "client_certificate" {
  type = string
}

variable "client_key" {
  type = string
}

variable "cluster_ca_certificate" {
  type = string
}

variable "project_id" {
  type = string
}

variable "host" {
  type = string
}

variable "frontend_version" {
  type = string
  default = "0.1"
}

variable "upload_version" {
  type = string
  default = "0.1"
}

variable "auth_version" {
  type = string
  default = "0.1"
}