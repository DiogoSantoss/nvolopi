resource "kubernetes_service" "auth" {
  metadata {
    name = "auth"

    labels = {
      app  = "nvolopi"
      tier = "auth"
    }
    namespace = kubernetes_namespace.nvolopi.id
  }

  spec {
    selector = {
      app  = "nvolopi"
      tier = "auth"
    }

    type = "ClusterIP"

    port {
      port = 3001
    }
  }
}

resource "kubernetes_service" "upload" {
  metadata {
    name = "upload"

    labels = {
      app  = "nvolopi"
      tier = "upload"
    }
    namespace = kubernetes_namespace.nvolopi.id
  }

  spec {
    selector = {
      app  = "nvolopi"
      tier = "upload"
    }

    type = "ClusterIP"

    port {
      port = 3002
    }
  }
}

resource "kubernetes_service" "db" {
  metadata {
    name = "db"

    labels = {
      app  = "nvolopi"
      tier = "db"
    }
    namespace = kubernetes_namespace.nvolopi.id
  }

  spec {
    selector = {
      app  = "nvolopi"
      tier = "db"
    }

    type = "ClusterIP"

    port {
      port = 27017
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name = "frontend"

    labels = {
      app  = "nvolopi"
      tier = "frontend"
    }
    namespace = kubernetes_namespace.nvolopi.id
  }

  spec {
    selector = {
      app  = "nvolopi"
      tier = "frontend"
    }

    type = "LoadBalancer"

    port {
      port = 80
    }
  }
}