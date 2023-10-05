variable "credentials-file" {}

variable "region" {
  default = "europe-southwest1"
}

variable "zone" {
  default = "europe-southwest1-a"
}

variable "machine_type" {
  # Should be enough
  default = "e2-medium"
}

variable "image-name" {
  default = "nvolopi"
}