#################################################################
# Definition of the Pods
#################################################################

#################################################################

resource "kubernetes_deployment" "auth" {
  metadata {
    name = "auth"

    labels = {
      app  = "nvolopi"
      tier = "auth"
    }
    namespace = kubernetes_namespace.nvolopi.id
  }

  spec {
    replicas = 3
    selector {
      match_labels = {
        app  = "nvolopi"
        tier = "auth"
      }
    }

    template {
      metadata {
        labels = {
          app  = "nvolopi"
          tier = "auth"
        }
      }
      spec {
        container {
          image = "gcr.io/${var.project_id}/service/auth:${var.auth_version}"
          name  = "container"

          port {
            container_port = 3001
          }

          env {
            name  = "GET_HOSTS_FROM"
            value = "dns"
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "100Mi"
            }
          }
        }
      }
    }
  }
  depends_on = [
    helm_release.istiod,
    kubernetes_namespace.nvolopi
  ]
}

resource "kubernetes_deployment" "upload" {
  metadata {
    name = "upload"

    labels = {
      app  = "nvolopi"
      tier = "upload"
    }
    namespace = kubernetes_namespace.nvolopi.id
  }

  spec {
    replicas = 3
    selector {
      match_labels = {
        app  = "nvolopi"
        tier = "upload"
      }
    }

    template {
      metadata {
        labels = {
          app  = "nvolopi"
          tier = "upload"
        }
      }
      spec {
        container {
          image = "gcr.io/${var.project_id}/service/upload:${var.upload_version}"
          name  = "container"

          port {
            container_port = 3002
          }

          env {
            name  = "GET_HOSTS_FROM"
            value = "dns"
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "100Mi"
            }
          }
        }
      }
    }
  }
  depends_on = [
    helm_release.istiod,
    kubernetes_namespace.nvolopi
  ]
}

resource "kubernetes_deployment" "db" {
  metadata {
    name = "db"

    labels = {
      app  = "nvolopi"
      tier = "db"
    }
    namespace = kubernetes_namespace.nvolopi.id
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app  = "nvolopi"
        tier = "db"
      }
    }

    template {
      metadata {
        labels = {
          app  = "nvolopi"
          tier = "db"
        }
      }
      spec {
        container {
          image = "mongo:latest"
          name  = "container"

          port {
            container_port = 27017
          }

          env {
            name  = "GET_HOSTS_FROM"
            value = "dns"
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "100Mi"
            }
          }
        }
      }
    }
  }
  depends_on = [
    helm_release.istiod,
    kubernetes_namespace.nvolopi
  ]
}

resource "kubernetes_deployment" "frontend" {
  metadata {
    name = "frontend"

    labels = {
      app  = "nvolopi"
      tier = "frontend"
    }
    namespace = kubernetes_namespace.nvolopi.id
  }

  spec {
    replicas = 3
    selector {
      match_labels = {
        app  = "nvolopi"
        tier = "frontend"
      }
    }

    template {
      metadata {
        labels = {
          app  = "nvolopi"
          tier = "frontend"
        }
      }
      spec {
        container {
          image = "gcr.io/${var.project_id}/frontend:${var.frontend_version}"
          name  = "container"

          port {
            container_port = 80
          }

          env {
            name  = "GET_HOSTS_FROM"
            value = "dns"
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "100Mi"
            }
          }
        }
      }
    }
  }
  depends_on = [
    helm_release.istiod,
    kubernetes_namespace.nvolopi
  ]
}
