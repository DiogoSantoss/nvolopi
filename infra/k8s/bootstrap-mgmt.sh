#!/usr/bin/env bash
# For Ubuntu Docker
export DEBIAN_FRONTEND=noninteractive
export TZ=Europe/Lisbon

sudo apt-get update
sudo apt-get -y upgrade

# install tools for managing ppa repositories
sudo apt-get -y install software-properties-common
sudo apt-get -y install unzip
sudo apt-get -y install build-essential
# 
sudo apt-get -y install libssl-dev 
sudo apt-get -y install libffi-dev 
# install GNU Privacy Guard
sudo apt-get install -y gnupg
# required for SDKs
sudo apt-get -y install python3-dev 
sudo apt-get -y install python3-pip

# Add graph builder tool for Terraform
sudo apt-get -y install graphviz

# Install Terraform
sudo apt-get update
# add HashiCorp GPG key
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
PROC=$(lscpu 2> /dev/null | awk '/Architecture/ {if($2 == "x86_64") {print "amd64"; exit} else if($2 ~ /arm/) {print "arm"; exit} else if($2 ~ /aarch64/) {print "arm64"; exit} else {print "386"; exit}}')
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
TER_VER=`curl -s https://api.github.com/repos/hashicorp/terraform/releases/latest | grep tag_name | cut -d: -f2 | tr -d \"\,\v | awk '{$1=$1};1'`
FILENAME="terraform_${TER_VER}_${OS}_${PROC}.zip"
LINK="https://releases.hashicorp.com/terraform/${TER_VER}/${FILENAME}"
curl -s -o "$FILENAME" "$LINK"
unzip -qq "$FILENAME"
sudo mv terraform /usr/local/bin
rm "$FILENAME"

# Install Google Cloud SDK
# snap install google-cloud-sdk --classic
sudo apt-get -y install apt-transport-https
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
sudo apt-get update 
sudo apt-get -y install google-cloud-sdk

# Install Kubernetes Controller
sudo apt-get -y install kubectl google-cloud-sdk-gke-gcloud-auth-plugin

# Clean up cached packages
sudo apt-get clean all