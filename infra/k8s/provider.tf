terraform {
  required_providers {
    minikube = {
      // nao tenho a certeza disto v
      source = "kyma-incubator/minikube"
    }
  }

}
provider "minikube" {
  kubernetes_version = "v1.26.3"
}

provider "kubernetes" {
  host = minikube_cluster.docker.host

  client_certificate     = minikube_cluster.docker.client_certificate
  client_key             = minikube_cluster.docker.client_key
  cluster_ca_certificate = minikube_cluster.docker.cluster_ca_certificate
}