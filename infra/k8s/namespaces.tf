resource "kubernetes_namespace" "istio_system" {
  metadata {
    name = "istio-system"
  }
}

resource "kubernetes_namespace" "nvolopi" {
  metadata {
    name = "nvolopi"
   
    labels = {
      istio-injection = "enabled"
    }
  }
}