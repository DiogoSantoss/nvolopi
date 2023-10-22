resource "helm_release" "istio_base" {
  name       = "istio-base"
  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "base"

  timeout         = 120
  cleanup_on_fail = true
  force_update    = true
  namespace       = "istio-system"


  depends_on = [var.cluster, kubernetes_namespace.istio_system]
}

resource "helm_release" "istiod" {
  name       = "istiod"
  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "istiod"

  timeout         = 120
  cleanup_on_fail = true
  force_update    = true
  namespace       = "istio-system"

  depends_on = [var.cluster, kubernetes_namespace.istio_system, helm_release.istio_base]
}