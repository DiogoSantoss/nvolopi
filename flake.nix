{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          nixpkgs.config.allowUnfree = true;
        };
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            nodePackages.pnpm
            nodePackages.prettier
            nodePackages.eslint
            mongosh
            openssl
            vscode-fhs
            minikube
            kubectl
            graphviz
            ansible
            terraform
            (google-cloud-sdk.withExtraComponents (with pkgs.google-cloud-sdk.components; [
              gke-gcloud-auth-plugin
            ]))
            awscli2
            (python3.withPackages (ps: with ps; [
              requests
            ]))
          ];
        };
      }
    );
}
