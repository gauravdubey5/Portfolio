/* ==========================================================================
   INTERACTIVE AZURE ARCHITECTURE MAP // DEVOPS VISUALIZER
   Interactive Node Topology, IaC Specs & Code Inspection
   ========================================================================== */

(function () {
  'use strict';

  const architectureData = {
    'ingress': {
      title: 'Azure Edge & Ingress Gateway',
      tag: 'EDGE // CDN & SECURITY',
      desc: 'Global traffic routing, SSL termination, and DDoS mitigation. Incoming traffic is filtered through Cloudflare edge & Azure Front Door before routing to private VNet ingress endpoints.',
      specs: [
        { label: 'Protocols', value: 'HTTPS / TLS 1.3' },
        { label: 'Security Layer', value: 'WAF & DDoS Protection' },
        { label: 'Ingress Target', value: 'Public Subnet (App Gateway)' },
        { label: 'Uptime SLA', value: '99.99% Global High Availability' }
      ],
      code: `# Azure Front Door / Application Gateway Ingress
resource "azurerm_public_ip" "app_gateway_pip" {
  name                = "pip-cloudverse-ingress"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  allocation_method   = "Static"
  sku                 = "Standard"
}`,
      projectLink: 'https://github.com/gauravdubey5/terraform-enterprise-infrastructure',
      projectText: 'View in Terraform Infrastructure Repo'
    },
    'vnet': {
      title: 'Azure Virtual Network (Hub VNet)',
      tag: 'NETWORKING // HUB & SPOKE',
      desc: 'Central network foundation provisioned via Terraform modules. Isolates cloud workloads into segregated subnets with explicit Network Security Group (NSG) ingress and egress boundaries.',
      specs: [
        { label: 'Address Space', value: '10.0.0.0/16' },
        { label: 'Subnet Count', value: '3 Isolated Segments' },
        { label: 'Region', value: 'Central India / East US' },
        { label: 'IaC Provisioner', value: 'Terraform azurerm_virtual_network' }
      ],
      code: `resource "azurerm_virtual_network" "vnet" {
  name                = "vnet-cloudverse-prod"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}`,
      projectLink: 'https://github.com/gauravdubey5/terraform-enterprise-infrastructure',
      projectText: 'Inspect Terraform Network Module'
    },
    'subnet-public': {
      title: 'Public Gateway Subnet (DMZ)',
      tag: 'SUBNET // 10.0.1.0/24',
      desc: 'Demilitarized zone handling external requests. Governed by a dedicated Network Security Group that only permits inbound ports 80 and 443, dropping unauthorized scanning.',
      specs: [
        { label: 'Subnet CIDR', value: '10.0.1.0/24' },
        { label: 'Inbound NSG', value: 'Port 80/443 (HTTP/S) Allowed' },
        { label: 'Outbound Rule', value: 'Internal Subnet Peering Only' },
        { label: 'Gateway SKU', value: 'Standard_v2' }
      ],
      code: `resource "azurerm_subnet" "public" {
  name                 = "snet-public-gateway"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}`,
      projectLink: 'https://github.com/gauravdubey5/terraform-enterprise-infrastructure',
      projectText: 'View Subnet & NSG Code'
    },
    'subnet-app': {
      title: 'Compute & Application Subnet',
      tag: 'SUBNET // 10.0.2.0/24',
      desc: 'Private compute layer hosting Azure Linux Virtual Machines and containerized microservices (Docker). No direct public IP; all ingress routes strictly via public subnet proxy.',
      specs: [
        { label: 'Subnet CIDR', value: '10.0.2.0/24' },
        { label: 'Workload OS', value: 'Ubuntu Server 22.04 LTS' },
        { label: 'Container Engine', value: 'Docker Engine & Compose' },
        { label: 'SSH Access', value: 'Azure Bastion / Internal Key Only' }
      ],
      code: `resource "azurerm_linux_virtual_machine" "app_vm" {
  name                = "vm-cloudverse-compute"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  size                = "Standard_B2s"
  admin_username      = "azureuser"
  network_interface_ids = [azurerm_network_interface.app_nic.id]

  admin_ssh_key {
    username   = "azureuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }
}`,
      projectLink: 'https://github.com/gauravdubey5/terraform-enterprise-infrastructure',
      projectText: 'View VM Terraform Provisioning'
    },
    'subnet-data': {
      title: 'Storage & Terraform State Backend',
      tag: 'SUBNET // 10.0.3.0/24',
      desc: 'Secure Azure Blob Storage layer with Private Endpoints. Stores state files with Azure Blob Lease locking to prevent concurrent deployment collisions in automated pipelines.',
      specs: [
        { label: 'Subnet CIDR', value: '10.0.3.0/24' },
        { label: 'Storage Tier', value: 'Standard_LRS / Private' },
        { label: 'Concurrency Lock', value: 'Blob Lease State Locking' },
        { label: 'Encryption', value: 'AES-256 Microsoft Managed Key' }
      ],
      code: `terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "stcloudversestate"
    container_name       = "tfstate"
    key                  = "production.terraform.tfstate"
  }
}`,
      projectLink: 'https://github.com/gauravdubey5/terraform-enterprise-infrastructure',
      projectText: 'Inspect Remote State Configuration'
    },
    'cicd': {
      title: 'GitHub Actions Automated CI/CD',
      tag: 'PIPELINE // YAML AUTOMATION',
      desc: 'End-to-end continuous deployment. Triggered on push and pull requests, validating Terraform syntax, running security scans, computing execution plans, and applying changes.',
      specs: [
        { label: 'Workflow Engine', value: 'GitHub-hosted Ubuntu Runner' },
        { label: 'Authentication', value: 'Azure Service Principal & Secrets' },
        { label: 'Stages', value: 'Fmt -> Init -> Validate -> Plan -> Apply' },
        { label: 'Branch Protection', value: 'PR Review + Required Plan Check' }
      ],
      code: `name: 'Terraform Azure CI/CD'
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: hashicorp/setup-terraform@v2
    - run: terraform fmt -check
    - run: terraform init
    - run: terraform plan -no-color
    - run: terraform apply -auto-approve
      if: github.ref == 'refs/heads/main'`,
      projectLink: 'https://github.com/gauravdubey5/GitHub-Actions-CI-CD-Pipeline-Automation-',
      projectText: 'View GitHub Actions Workflow File'
    },
    'monitor': {
      title: 'Azure Monitor & Telemetry',
      tag: 'OBSERVABILITY // LOG ANALYTICS',
      desc: 'Centralized diagnostic logs, CPU/memory metric alerts, and infrastructure health probes. Enables continuous observability and proactive incident resolution.',
      specs: [
        { label: 'Metric Frequency', value: '1-Minute Ingestion' },
        { label: 'Retention', value: '30 Days Standard Workspace' },
        { label: 'Alerting', value: 'Action Groups & Email Dispatch' },
        { label: 'Health Probes', value: 'HTTP 200 Keep-Alive Checks' }
      ],
      code: `resource "azurerm_log_analytics_workspace" "logs" {
  name                = "law-cloudverse-metrics"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}`,
      projectLink: 'https://github.com/gauravdubey5/terraform-enterprise-infrastructure',
      projectText: 'View Monitoring Architecture'
    },
    'security': {
      title: 'DevSecOps & RBAC Governance',
      tag: 'GOVERNANCE // LEAST PRIVILEGE',
      desc: 'Zero-trust role-based access control. Scoped Service Principal permissions, automated secrets rotation, and strict parameterization of infrastructure credentials.',
      specs: [
        { label: 'Access Model', value: 'Least Privilege RBAC' },
        { label: 'Secret Storage', value: 'GitHub Secrets & Azure Key Vault' },
        { label: 'Code Analysis', value: 'Checkov / tfsec Security Scan' },
        { label: 'Audit Logging', value: 'Azure Activity Log Enabled' }
      ],
      code: `# Azure RBAC Definition for CI/CD Service Principal
resource "azurerm_role_assignment" "cicd_contributor" {
  scope                = azurerm_resource_group.rg.id
  role_definition_name = "Contributor"
  principal_id         = var.service_principal_object_id
}`,
      projectLink: 'https://github.com/gauravdubey5/GitHub-Actions-CI-CD-Pipeline-Automation-',
      projectText: 'View Security Hardening Setup'
    }
  };

  function updateInspector(nodeKey) {
    const data = architectureData[nodeKey];
    if (!data) return;

    const titleEl = document.getElementById('inspector-title');
    const tagEl = document.getElementById('inspector-tag');
    const descEl = document.getElementById('inspector-desc');
    const specsEl = document.getElementById('inspector-specs');
    const codeEl = document.getElementById('inspector-code');
    const linkEl = document.getElementById('inspector-link');

    if (titleEl) titleEl.textContent = data.title;
    if (tagEl) tagEl.textContent = data.tag;
    if (descEl) descEl.textContent = data.desc;

    if (specsEl) {
      specsEl.innerHTML = data.specs
        .map(
          (s) => `
        <div class="spec-item">
          <span>${s.label}</span>
          <span>${s.value}</span>
        </div>`
        )
        .join('');
    }

    if (codeEl) {
      codeEl.textContent = data.code;
    }

    if (linkEl) {
      linkEl.href = data.projectLink;
      linkEl.innerHTML = `<i class="fab fa-github"></i> ${data.projectText}`;
    }

    // Highlight active node
    document.querySelectorAll('.arch-node').forEach((node) => {
      if (node.getAttribute('data-node') === nodeKey) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
  }

  // Initialize event listeners
  document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.arch-node');
    nodes.forEach((node) => {
      node.addEventListener('click', () => {
        const key = node.getAttribute('data-node');
        updateInspector(key);
      });
    });

    // Default select Ingress node
    updateInspector('ingress');
  });

  window.selectArchitectureNode = updateInspector;
})();
