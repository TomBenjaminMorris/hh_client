terraform {
  backend "s3" {
    bucket = "tbm-tf-state-bucket"
    key    = "hapihour_client"
    region = "eu-west-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.31.0"
    }
  }

  required_version = ">= 0.14.0"
}

provider "aws" {
  region = "eu-west-2"
}

locals {
  project_name      = "hapihour"
  domain_name       = "hapihour.io"
  root_domain_name  = "hapihour.io"
  allowed_locations = ["GB"]
  common_tags = {
    Project = "hapihour.io"
  }
}

module "static-website" {
  source = "git@github.com:TomBenjaminMorris/tf-modules.git//static-website?ref=static-website-v0.0.12"

  project_name      = local.project_name
  domain_name       = local.domain_name
  root_domain_zone  = local.root_domain_name
  allowed_locations = local.allowed_locations
  common_tags       = local.common_tags
}
