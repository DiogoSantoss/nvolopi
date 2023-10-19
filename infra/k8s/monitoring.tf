# Prometheus deployment
data "kubectl_file_documents" "prometheus_docs" {
  content = file("${path.module}/monitoring/prometheus.yaml")
}

resource "kubectl_manifest" "prometheus" {
  for_each  = data.kubectl_file_documents.prometheus_docs.manifests
  yaml_body = each.value

  depends_on = [
    kubernetes_namespace.istio_system
  ]
}

# Grafana deployment
data "kubectl_file_documents" "grafana_docs" {
  content = file("${path.module}/monitoring/grafana.yaml")
}

resource "kubectl_manifest" "grafana" {
  for_each  = data.kubectl_file_documents.grafana_docs.manifests
  yaml_body = each.value

  depends_on = [
    kubernetes_namespace.istio_system
  ]
}
