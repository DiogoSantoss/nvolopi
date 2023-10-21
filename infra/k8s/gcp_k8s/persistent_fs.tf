resource "kubernetes_persistent_volume_claim_v1" "db-fs" {
  metadata {
    name = "db-fs"

    labels = {
      app  = "nvolopi"
      tier = "db-fs"
    }
    namespace = kubernetes_namespace.nvolopi.id
  }

  spec {
    access_modes = ["ReadWriteMany"]
    resources {
      requests = {
        storage = "2560Gi"
      }
    }
    storage_class_name = "standard"
  }

  depends_on = [
    helm_release.istiod,
    kubernetes_namespace.nvolopi
  ]
}
