export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  domain: 'cloud-devops' | 'security' | 'development';
  category: string;
  role: string;
  cloudPlatforms: string[];
  technologies: string[];
  architectureFlow: {
    nodes: string[];
    description: string;
  };
  summary: string;
  problem: string;
  architecture: string;
  implementation: string[];
  securityControls: string[];
  cicdFlow: string;
  monitoring: string;
  compliance: string;
  challenges: string;
  outcome: string;
  costConsiderations: string;
  color: string;
  flagship?: boolean;
}

export interface TroubleshootingIncident {
  id: string;
  title: string;
  category: 'CI/CD' | 'Infrastructure' | 'Database' | 'Security';
  symptom: string;
  investigation: string[];
  rootCause: string;
  resolution: string[];
  prevention: string[];
  tags: string[];
}

export interface DevSecOpsPhase {
  id: string;
  title: string;
  description: string;
  tools: string[];
  securityControls: string[];
}

export interface ArchitectureDoc {
  id: string;
  title: string;
  description: string;
  diagram: string[];
  techChoices: string[];
  security: string[];
  operational: string[];
  cost: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Cloud' | 'DevOps' | 'DevSecOps' | 'Security' | 'Architecture' | 'Troubleshooting';
  summary: string;
  readTime: string;
  date: string;
  tags: string[];
  content: string;
}

export interface CareerRole {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export const PORTFOLIO_DATA = {
  engineer: {
    name: 'Saran M',
    title: 'Senior Cloud & DevSecOps Engineer',
    location: 'Chennai, Tamil Nadu, India',
    phone: '+91 7395936936',
    email: 'shreecharan1305@gmail.com',
    linkedin: 'https://linkedin.com/in/saran1305',
    github: 'https://github.com/saran1305',
    site: 'https://saran1305.github.io/saran',
    noticePeriod: 'Fully Negotiable',
    interviewPreference: 'Open for Remote Interviews',
    summary:
      'Senior Cloud and DevSecOps Engineer with 5+ years of hands-on experience in cloud infrastructure, CI/CD automation, and production operations across AWS, GCP, and Azure. Specialized in designing secure, scalable cloud environments, observability pipelines, and infrastructure audit readiness for SOC 2 and ISO/IEC 27001.',
  },

  principles: [
    {
      title: 'Automation First',
      description: 'Eliminate manual operations through declarative Infrastructure-as-Code (Terraform) and fully automated CI/CD deployment pipelines.',
    },
    {
      title: 'Security by Design',
      description: 'Embed automated SAST/DAST, container vulnerability scanning, and strict IAM boundaries at every phase of the SDLC.',
    },
    {
      title: 'Least Privilege',
      description: 'Scope cloud IAM roles, service accounts, network security groups, and database credentials to minimal required access.',
    },
    {
      title: 'Observable Infrastructure',
      description: 'Establish end-to-end metrics, structured centralized logging, and threshold alerting before pushing workloads to production.',
    },
    {
      title: 'Reliable Deployments',
      description: 'Enforce zero-downtime releases, blue/green or symlink atomic deployments, and automated health-check rollback loops.',
    },
    {
      title: 'Cost-Conscious Architecture',
      description: 'Right-size cloud compute instances, leverage serverless scale-to-zero, prune unattached storage, and monitor resource lifecycle costs.',
    },
  ],

  capabilityMap: {
    cloud: {
      title: 'Cloud Platforms',
      items: ['AWS', 'GCP', 'Azure'],
      description: 'Multi-cloud architecture, IAM policies, VPC networking, cloud storage, compute & serverless management.',
    },
    infrastructure: {
      title: 'Infrastructure & IaC',
      items: ['Terraform', 'Docker', 'Kubernetes', 'Linux', 'Windows', 'Ansible'],
      description: 'Declarative IaC provisioning, container orchestration, base OS hardening, configuration management.',
    },
    cicd: {
      title: 'CI/CD Automation',
      items: ['GitHub Actions', 'Jenkins', 'Google Cloud Build'],
      description: 'Pipeline design, build caching, release tagging, automated deployment scripts, artifact storage.',
    },
    security: {
      title: 'Security & DevSecOps',
      items: ['DevSecOps', 'Secret Management', 'IAM', 'SIEM / CNAPP', 'Security Scanning'],
      description: 'Secret injection via GCP Secret Manager / Vault, Trivy container scanning, SonarQube SAST, least-privilege RBAC.',
    },
    observability: {
      title: 'Observability & Monitoring',
      items: ['Cloud Monitoring', 'Splunk', 'CloudWatch', 'Logging', 'Alerting'],
      description: 'Log aggregation, infrastructure dashboards, uptime probes, threshold alerts, incident diagnosis.',
    },
    application: {
      title: 'Application Stack',
      items: ['React', 'JavaScript', 'Node.js', 'REST APIs', 'Nginx'],
      description: 'Frontend dashboard engineering, state management (Redux), microservices proxying, REST API integration.',
    },
    compliance: {
      title: 'Compliance & Audit',
      items: ['SOC 2', 'ISO/IEC 27001', 'SDLC Controls', 'Audit Readiness'],
      description: 'Audit log retention policies, backup verification, access review matrices, change management tracking.',
    },
  },

  caseStudies: [
    {
      id: 'glido',
      title: 'Glido',
      subtitle: 'Production GCP Cloud Infrastructure',
      domain: 'cloud-devops',
      category: 'GCP Cloud Architecture',
      role: 'Senior Cloud & DevSecOps Engineer',
      cloudPlatforms: ['GCP'],
      technologies: ['GCP Cloud Run', 'Cloud SQL (PostgreSQL)', 'Google Cloud Build', 'Artifact Registry', 'Secret Manager', 'Cloud Storage', 'Cloud Monitoring'],
      flagship: true,
      color: '#3b82f6',
      architectureFlow: {
        nodes: ['GitHub Repository', 'Google Cloud Build', 'Artifact Registry', 'Cloud Run (Serverless App)', 'Cloud SQL (PostgreSQL)'],
        description: 'GitHub → Cloud Build → Artifact Registry → Cloud Run → Cloud SQL, managed with Secret Manager, Cloud Storage, Cloud Monitoring & HTTPS Load Balancing.',
      },
      summary:
        'Architected and implemented a fully automated, production-ready GCP cloud environment for Glido. Designed containerized microservices deployment using Cloud Run, managed relational database tier on Cloud SQL, centralized secret storage with Secret Manager, and automated CI/CD via Google Cloud Build.',
      problem:
        'The application required high availability, automated scaling for unpredictable web traffic, strict security compliance for client data, and zero manual deployment overhead without maintaining raw VM fleets.',
      architecture:
        'Utilized GCP Cloud Run for containerized serverless compute with auto-scaling (0 to N instances based on concurrent traffic). Paired with Cloud SQL (PostgreSQL) configured in high-availability mode with private IP VPC peering. Injected runtime secrets via GCP Secret Manager at container launch.',
      implementation: [
        'Designed modular Google Cloud Build triggers executing on Git commit tags.',
        'Configured Docker image builds with multi-stage caching pushed to Artifact Registry.',
        'Provisioned GCP Secret Manager to securely pass database credentials and JWT tokens directly into Cloud Run container environments without hardcoding.',
        'Set up Cloud SQL automated daily snapshots with point-in-time recovery and cross-region backups.',
        'Configured Cloud Monitoring metrics, log sinks, and uptime check alerts notifying on latency spikes or HTTP 5xx errors.',
      ],
      securityControls: [
        'VPC Service Controls enforcing private IP database traffic.',
        'GCP IAM least-privilege roles for Cloud Build and Cloud Run service accounts.',
        'Secret Manager strict RBAC preventing unauthorized access to prod credentials.',
        'HTTPS load balancing with TLS 1.3 encryption and automated Google-managed certificates.',
      ],
      cicdFlow: 'Git push to main branch → Cloud Build triggers Docker multi-stage build → Image pushed to Artifact Registry → Cloud Run revision deployed with revision traffic splitting → Automated health checks executed.',
      monitoring: 'Cloud Monitoring dashboards tracking container CPU/Memory utilization, request counts, response latency (p95/p99), and SQL connection pools.',
      compliance: 'Designed environment with SOC 2 Trust Services Criteria and ISO/IEC 27001 readiness in mind: audit log retention enabled, encrypted at rest (CMEK), and automated backups verified.',
      challenges: 'Managing cold start latency for serverless containers and ensuring secure VPC connector throughput to Cloud SQL under sudden traffic spikes. Resolved by tuning min-instances for core APIs and setting up connection pooling via Cloud SQL Proxy.',
      outcome: 'Zero-downtime automated deployments, reduced infrastructure idle cost by leveraging serverless scale-to-zero during off-peak hours, and achieved 99.9% application availability.',
      costConsiderations: 'Saved ~35% compute costs compared to static VM hosting by leveraging Cloud Run auto-scaling and right-sizing Cloud SQL instances based on actual memory profiles.',
    },
    {
      id: 'srd',
      title: 'SRD',
      subtitle: 'AWS Cloud Infrastructure & Jenkins Automation',
      domain: 'cloud-devops',
      category: 'AWS Cloud & CI/CD',
      role: 'DevOps Engineer',
      cloudPlatforms: ['AWS'],
      technologies: ['AWS EC2', 'Jenkins', 'Nginx', 'PostgreSQL', 'Bash Scripting', 'CloudWatch', 'Git'],
      color: '#8b5cf6',
      architectureFlow: {
        nodes: ['GitHub Source', 'Jenkins Automation Server', 'Build & Test Task', 'Deployment Execution', 'AWS EC2 Cluster', 'Nginx Reverse Proxy', 'Application Instance', 'PostgreSQL DB'],
        description: 'GitHub → Jenkins → Build → Deployment → AWS EC2 → Nginx → Application → PostgreSQL.',
      },
      summary:
        'Engineered an automated AWS EC2 environment with customized Jenkins pipelines for SRD. Implemented automated build and release workflows, database backup automation, Nginx reverse proxying, and proactive CloudWatch alerting.',
      problem:
        'Manual application deployments led to frequent release downtime, configuration drift on EC2 servers, and lack of automated database snapshot management.',
      architecture:
        'AWS EC2 instances running Linux, fronted by Nginx reverse proxy for SSL termination and static asset caching. PostgreSQL database configured with automated cron snapshot tasks. Jenkins master/agent setup for automated build execution.',
      implementation: [
        'Created multi-branch Jenkins pipelines automating code checkout, linting, building, and deployment.',
        'Implemented zero-downtime deployment scripts using atomic symlinks for release versions.',
        'Automated daily PostgreSQL database backups pushed securely to S3 with retention policies.',
        'Configured CloudWatch agent on EC2 to push system metrics (CPU, Memory, Disk Space) and Nginx access/error logs.',
        'Created automated email alerts triggered when server memory utilization exceeds 85% or disk space falls below 15%.',
      ],
      securityControls: [
        'AWS Security Groups restricting EC2 port 22 access to internal VPN IPs.',
        'Nginx SSL/TLS security hardening with modern cipher suites.',
        'IAM role-based access for Jenkins runner accessing S3 backup buckets.',
      ],
      cicdFlow: 'Developer git push → Webhook triggers Jenkins build → Automated test suite execution → Symlink swap release on target EC2 instance → Health probe validation.',
      monitoring: 'AWS CloudWatch alarms for disk usage, CPU spikes, and Nginx status checks.',
      compliance: 'Automated backup validation logs and versioned deployment tags ensuring auditable change history.',
      challenges: 'Avoiding deployment downtime on single-host deployments during high traffic windows. Solved using atomic directory switching and graceful Nginx reloads.',
      outcome: 'Deployment time reduced from 45 minutes of manual labor to under 3 minutes, with automated rollbacks and continuous backup verification.',
      costConsiderations: 'Optimized EC2 instance size and scheduled automated dev-environment stop/start routines to save operational cost.',
    },
    {
      id: 'assure-bharath',
      title: 'Assure Bharath',
      subtitle: 'Containerization & Automated Deployment Pipeline',
      domain: 'cloud-devops',
      category: 'VPS Containerization',
      role: 'DevOps Engineer',
      cloudPlatforms: ['VPS / Cloud Host'],
      technologies: ['Docker', 'Docker Compose', 'GitHub Actions', 'Nginx', 'SSL / Let\'s Encrypt', 'Linux'],
      color: '#f59e0b',
      architectureFlow: {
        nodes: ['GitHub Repo', 'GitHub Actions CI', 'Docker Image Build', 'Image Push', 'VPS Host Server', 'Nginx Reverse Proxy', 'Docker Container Fleet'],
        description: 'GitHub → GitHub Actions → Docker Build → Container Registry → VPS Host → Nginx → Containerized App.',
      },
      summary:
        'Containerized multi-service frontend and backend application environments using Docker and Docker Compose. Built automated CI/CD workflows using GitHub Actions for seamless continuous deployment to Linux VPS infrastructure with SSL/HTTPS configuration.',
      problem:
        'Inconsistent dependency environments between local development and production servers caused "works on my machine" deployment failures and complex update procedures.',
      architecture:
        'Dockerized application architecture isolating frontend React client and Node.js backend services into separate lightweight containers orchestrated via Docker Compose behind an Nginx reverse proxy with automated SSL certificate renewal.',
      implementation: [
        'Wrote multi-stage Dockerfiles optimizing image size from >1GB down to <150MB.',
        'Configured GitHub Actions workflow triggered on repository releases.',
        'Implemented SSH-based deployment step executing atomic container replacements with zero downtime.',
        'Automated Nginx configuration and Certbot SSL certificate renewal.',
      ],
      securityControls: [
        'Non-root user execution inside Docker containers.',
        'Isolated internal Docker bridge network preventing public DB exposure.',
        'GitHub Actions Secrets storing production SSH keys and environment variables.',
      ],
      cicdFlow: 'Git push tag → GitHub Actions builds Docker images → Runs container security scan → Deploys updated Compose service on VPS.',
      monitoring: 'Docker container health checks and system resource monitoring.',
      compliance: 'SDLC security controls applied: immutable container artifacts and branch protection rules.',
      challenges: 'Pruning old unreferenced Docker images on host to prevent disk exhaustion. Resolved by adding automated docker system prune jobs after each deployment.',
      outcome: 'Standardized build and runtime environment across development and production, eliminating dependency mismatches and establishing sub-2-minute automated releases.',
      costConsiderations: 'Maximized hardware efficiency by running isolated container workloads on lightweight VPS compute.',
    },
    {
      id: 'ackumen',
      title: 'Ackumen',
      subtitle: 'Enterprise React Application & Interactive Dashboard',
      domain: 'development',
      category: 'Enterprise Frontend Engineering',
      role: 'Senior Software / Digital Transformation Engineer',
      cloudPlatforms: ['AWS / Cloud Host'],
      technologies: ['React.js', 'Redux', 'Redux-Saga', 'JavaScript (ES6+)', 'REST APIs', 'Tailwind CSS / CSS Modules'],
      color: '#10b981',
      architectureFlow: {
        nodes: ['React Client UI', 'Redux Store / State', 'Redux-Saga Middleware', 'REST API Gateway', 'Backend Microservices'],
        description: 'Enterprise React UI → Redux / Redux-Saga → REST API → Backend Services.',
      },
      summary:
        'Engineered enterprise-grade React application frontend for Ackumen featuring connected planning modules, real-time data forecasting visualization, and gamified badging systems. Integrated complex state management using Redux and Redux-Saga.',
      problem:
        'Large-scale enterprise datasets required high-performance frontend rendering, complex async data orchestration, and predictable UI state handling without performance lag.',
      architecture:
        'Modular component-driven React application using Redux for centralized client state and Redux-Saga for handling side effects, asynchronous API requests, and data caching.',
      implementation: [
        'Developed interactive, responsive UI dashboards and analytics visualization components.',
        'Optimized bundle size through code splitting, lazy loading, and memoization techniques.',
        'Implemented robust form handling and REST API integration with comprehensive error handling.',
        'Collaborated closely with product managers and backend teams to deliver intuitive UX workflows.',
      ],
      securityControls: [
        'XSS prevention via strict input sanitization and Content Security Policy headers.',
        'Secure JWT authentication token handling with automatic silent refresh.',
      ],
      cicdFlow: 'Automated frontend testing and build verification via CI pipeline pushing static web assets to CDN.',
      monitoring: 'Client-side error tracking and performance metric logging.',
      compliance: 'Role-based UI access control (RBAC) hiding sensitive module actions based on user permissions.',
      challenges: 'Managing high-frequency data updates across connected dashboard panels. Solved by decoupling state selectors and memoizing expensive computations.',
      outcome: 'Delivered an intuitive, responsive enterprise platform supporting smooth user interactions across thousands of daily data transactions.',
      costConsiderations: 'Leveraged client-side caching and state optimization to minimize unnecessary backend API calls.',
    },
  ] as ProjectCaseStudy[],

  incidents: [
    {
      id: 'incident-1',
      title: 'CI/CD Deployment Failure & Disk I/O Saturation',
      category: 'CI/CD',
      symptom: 'Multiple build runner pipelines froze during peak deployment hours. Build jobs timed out with disk write error codes.',
      investigation: [
        'Inspected build agent system logs and noticed disk I/O wait times spiking above 95%.',
        'Checked active process tree on build node and identified multiple parallel Docker layer extractions running simultaneously.',
        'Found that 4 teams launched releases simultaneously, bypassing build queue concurrency limits.',
      ],
      rootCause: 'Lack of pipeline concurrency throttling allowed concurrent un-cached Docker image builds to exhaust runner disk I/O bandwith and storage limits.',
      resolution: [
        'Implemented build pipeline queue concurrency limits (max 2 parallel Docker builds per node).',
        'Enabled persistent Docker layer caching and volume mounts to eliminate redundant layer downloads.',
        'Added automated post-build disk cleanup script pruning dangling Docker images and containers.',
      ],
      prevention: [
        'Configured CloudWatch disk I/O and disk space utilization alarms on runner nodes.',
        'Documented release queue etiquette and added automated staging pipeline locks.',
      ],
      tags: ['Jenkins', 'Docker', 'Disk I/O', 'Concurrency', 'CI/CD'],
    },
    {
      id: 'incident-2',
      title: 'Intermittent 504 Gateway Timeouts & Database Pool Exhaustion',
      category: 'Infrastructure',
      symptom: 'Production web application experienced brief periods of 504 Gateway Timeouts during morning traffic surges.',
      investigation: [
        'Analyzed Nginx access logs to correlate HTTP 504 status codes with specific API endpoints.',
        'Examined application APM traces and database connection metrics during failure windows.',
        'Discovered database connection pool count reaching hard maximum limit (100 connections) while database CPU remained low.',
      ],
      rootCause: 'An un-indexed SQL query on a growing audit trail table caused slow execution (4+ seconds), holding open DB pool connections and blocking incoming requests.',
      resolution: [
        'Added composite index on audit log table (tenant_id, created_at).',
        'Implemented database connection proxy pooling (Cloud SQL Proxy / PgBouncer) with dynamic idle timeout controls.',
        'Adjusted API client request timeouts and introduced circuit breaker retries.',
      ],
      prevention: [
        'Set up automated slow-query log alerts triggered when any query duration exceeds 500ms.',
        'Added query execution plan checks into pre-production staging tests.',
      ],
      tags: ['GCP Cloud SQL', 'Nginx', 'PostgreSQL', 'Connection Pool', 'Performance'],
    },
  ] as TroubleshootingIncident[],

  devSecOpsPhases: [
    {
      id: 'plan',
      title: '1. PLAN',
      description: 'Security requirements definition, threat modeling, compliance planning (SOC 2 / ISO 27001).',
      tools: ['Jira / GitHub Issues', 'Confluence', 'Threat Modeling Tools'],
      securityControls: ['Security architecture review', 'Compliance scope mapping', 'Least-privilege role matrix planning'],
    },
    {
      id: 'code',
      title: '2. CODE',
      description: 'Pre-commit security checks, secret scanning, and static application security testing (SAST).',
      tools: ['Git Hooks', 'GitGuardian', 'SonarQube SAST', 'ESLint Security'],
      securityControls: ['Hardcoded secret detection', 'Static code analysis', 'Branch protection rules'],
    },
    {
      id: 'build',
      title: '3. BUILD',
      description: 'Container base image vulnerability scanning and open-source dependency analysis.',
      tools: ['Trivy', 'Docker Scout', 'Snyk', 'Google Cloud Build'],
      securityControls: ['CVE vulnerability thresholds', 'Minimal base images (Alpine/Distroless)', 'Software Bill of Materials (SBOM)'],
    },
    {
      id: 'security-scan',
      title: '4. SECURITY SCAN',
      description: 'Infrastructure-as-Code (IaC) security linting and policy-as-code enforcement.',
      tools: ['Checkov', 'tfsec', 'Trivy IaC', 'OPA / Rego'],
      securityControls: ['IaC configuration validation', 'Unencrypted storage detection', 'Over-permissive IAM check'],
    },
    {
      id: 'artifact',
      title: '5. ARTIFACT',
      description: 'Container image signing, private registry access control, and hash verification.',
      tools: ['GCP Artifact Registry', 'AWS ECR', 'Cosign / Docker Notary'],
      securityControls: ['Image digest immutability', 'Registry RBAC access policies', 'Signed container validation'],
    },
    {
      id: 'deploy',
      title: '6. DEPLOY',
      description: 'Runtime secret injection, cloud IAM least privilege roles, and TLS termination.',
      tools: ['Terraform', 'GCP Secret Manager', 'AWS Secrets Manager', 'Cloud Run / EC2'],
      securityControls: ['Zero secrets in code', 'VPC Private IP peering', 'Automated TLS 1.3 certificates'],
    },
    {
      id: 'monitor',
      title: '7. MONITOR',
      description: 'Centralized log aggregation, SIEM log analysis, and continuous runtime observability.',
      tools: ['GCP Cloud Monitoring', 'AWS CloudWatch', 'Splunk', 'Prometheus'],
      securityControls: ['Audit log retention', 'Unauthorized access alerts', 'System metric anomaly detection'],
    },
    {
      id: 'respond',
      title: '8. RESPOND',
      description: 'Automated rollback, incident response runbooks, and post-mortem review.',
      tools: ['PagerDuty / Slack Alerts', 'Automated Rollback Scripts', 'Incident Runbooks'],
      securityControls: ['Automated zero-downtime rollback', 'Sanitized incident root cause analysis', 'Audit trail documentation'],
    },
  ] as DevSecOpsPhase[],

  architectures: [
    {
      id: 'gcp-cloudrun',
      title: 'Production GCP Cloud Run Infrastructure (Glido)',
      description: 'High-availability serverless microservices architecture with managed relational database, centralized secret management, and automated CI/CD.',
      diagram: [
        'Developer Commit → GitHub Repository',
        'Google Cloud Build (Triggered by Release Tag)',
        'Artifact Registry (Docker Container Storage)',
        'Cloud Run (Serverless Microservices Compute)',
        'VPC Serverless Access Connector (Private IP Routing)',
        'Cloud SQL PostgreSQL (High Availability Mode)',
        'GCP Secret Manager (Runtime Secret Injection)',
        'Cloud Monitoring & Cloud Logging (Observability)',
      ],
      techChoices: [
        'GCP Cloud Run chosen for zero-idle cost scaling and low operational maintenance.',
        'Cloud SQL PostgreSQL for ACID-compliant transactional persistence with automated backups.',
        'GCP Secret Manager to decouple sensitive credentials from container image layers.',
      ],
      security: [
        'VPC Service Controls enforcing private IP database traffic.',
        'IAM least-privilege service accounts for build and runtime environments.',
        'Automated TLS certificates managed by GCP load balancer.',
      ],
      operational: [
        'Uptime check alerts configured for instant Slack/Email notification.',
        'Automated daily backups with 30-day retention and point-in-time recovery.',
      ],
      cost: [
        'Serverless auto-scaling (scale to zero during idle hours) saved ~35% compute costs.',
        'Right-sized Cloud SQL database tier with automated storage auto-expansion.',
      ],
    },
    {
      id: 'aws-jenkins',
      title: 'AWS EC2 & Jenkins Automated CI/CD (SRD)',
      description: 'Resilient AWS Cloud architecture featuring automated Jenkins deployment pipelines, Nginx proxying, and automated database backup routines.',
      diagram: [
        'GitHub Source Repository',
        'Jenkins Master/Agent Build Automation Server',
        'Build & Unit Test Runner',
        'Atomic Deployment Script (Symlink Release Swap)',
        'AWS EC2 Application Instance Cluster',
        'Nginx Reverse Proxy & SSL Termination',
        'PostgreSQL Database Tier',
        'AWS S3 (Encrypted Automated Database Backups)',
        'AWS CloudWatch (Server Health & Log Alarms)',
      ],
      techChoices: [
        'AWS EC2 for flexible, predictable compute performance for legacy stateful services.',
        'Jenkins for customizable multi-stage deployment pipeline execution.',
        'Nginx for low-latency reverse proxying, static caching, and SSL termination.',
      ],
      security: [
        'AWS Security Groups restricting SSH access to restricted IP range.',
        'IAM instance profiles providing restricted S3 access for backups without hardcoded keys.',
      ],
      operational: [
        'Atomic symlink swapping for instant zero-downtime releases.',
        'Automated daily DB dump scripts with lifecycle rules in AWS S3.',
      ],
      cost: [
        'Optimized EC2 instance size and enabled CloudWatch monitoring to identify idle resources.',
      ],
    },
    {
      id: 'devsecops-pipeline',
      title: 'Zero-Trust DevSecOps Pipeline Architecture',
      description: 'End-to-end continuous integration and delivery pipeline with embedded security controls, static analysis, container scanning, and secret management.',
      diagram: [
        'Developer Code Commit',
        'Pre-commit Secret Scan (GitGuardian / Git Hooks)',
        'SAST Code Analysis (SonarQube)',
        'Container Build & Image Scan (Trivy CVE Scan)',
        'Infrastructure-as-Code Linting (Checkov / tfsec)',
        'Artifact Signing & Private Registry Storage',
        'Secret Injection via Secret Manager',
        'Deployment to Staging / Production with Health Probe',
        'SIEM & Cloud Monitoring Runtime Guardrails',
      ],
      techChoices: [
        'Trivy for fast, comprehensive container image vulnerability scanning.',
        'Checkov for automated Infrastructure-as-Code misconfiguration detection.',
        'GCP Secret Manager / AWS Secrets Manager for zero-trust credential access.',
      ],
      security: [
        'Strict build gates failing releases on Critical/High CVE findings.',
        'Zero secrets stored in Git or environment configuration files.',
      ],
      operational: [
        'Clear feedback loops delivered to developers directly in PR status checks.',
      ],
      cost: [
        'Catches security vulnerabilities early in SDLC (shift-left), preventing costly production security incidents.',
      ],
    },
  ] as ArchitectureDoc[],

  blogPosts: [
    {
      id: 'post-1',
      slug: 'building-production-cicd-gcp-cloud-run',
      title: 'How I Built a Production CI/CD Pipeline on GCP Cloud Run',
      category: 'Cloud',
      summary: 'A step-by-step technical guide to designing zero-downtime, fully automated deployments using Google Cloud Build, Artifact Registry, and GCP Cloud Run.',
      readTime: '6 min read',
      date: 'Aug 2025',
      tags: ['GCP', 'Cloud Run', 'Cloud Build', 'DevOps', 'CI/CD'],
      content: `
### Introduction

Deploying production web applications requires high availability, automated security, and zero downtime. When designing the cloud infrastructure for **Glido**, I chose **GCP Cloud Run** paired with **Google Cloud Build** to establish a modern serverless pipeline.

Here is how the pipeline operates from commit to production release:

---

### Architecture Overview

1. **Source Code**: Developers push code to GitHub.
2. **Cloud Build Trigger**: Pushing a git tag (e.g., \`v1.2.0\`) automatically triggers a Cloud Build execution.
3. **Multi-Stage Container Build**: Docker builds the image using cached layers to optimize speed.
4. **Artifact Registry**: The built image is tagged with the git SHA and pushed to GCP Artifact Registry.
5. **Secret Manager Injection**: Runtime secrets (DB passwords, API keys) are bound to the Cloud Run service revision.
6. **Cloud Run Deployment**: Cloud Run deploys the new revision with automated traffic splitting and health probe checks.

---

### Cloud Build Configuration (\`cloudbuild.yaml\`)

\`\`\`yaml
steps:
  # Step 1: Build Docker Image with Layer Caching
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'asia-south1-docker.pkg.dev/$PROJECT_ID/glido-repo/glido-api:$SHORT_SHA'
      - '.'

  # Step 2: Push to Artifact Registry
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'asia-south1-docker.pkg.dev/$PROJECT_ID/glido-repo/glido-api:$SHORT_SHA'

  # Step 3: Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'glido-api'
      - '--image=asia-south1-docker.pkg.dev/$PROJECT_ID/glido-repo/glido-api:$SHORT_SHA'
      - '--region=asia-south1'
      - '--platform=managed'
      - '--allow-unauthenticated'
      - '--update-secrets=DB_PASSWORD=glido-db-pass:latest'

images:
  - 'asia-south1-docker.pkg.dev/$PROJECT_ID/glido-repo/glido-api:$SHORT_SHA'
\`\`\`

---

### Key Technical Takeaways

* **Zero Idle Cost**: Cloud Run scales to zero during off-peak hours, dramatically saving infrastructure budget.
* **Secret Security**: Injecting secrets from GCP Secret Manager ensures credentials are never baked into Docker images.
* **Instant Rollbacks**: If a new revision fails health probes, Cloud Run automatically routes 100% of traffic back to the previous healthy revision.
      `,
    },
    {
      id: 'post-2',
      slug: 'devsecops-controls-for-cicd-pipelines',
      title: 'DevSecOps Controls for CI/CD Pipelines: From Code to Cloud',
      category: 'DevSecOps',
      summary: 'Practical security guardrails for embedding SAST, container scanning, secret detection, and IaC verification into your delivery workflow.',
      readTime: '8 min read',
      date: 'May 2025',
      tags: ['DevSecOps', 'Security', 'Trivy', 'SonarQube', 'Compliance'],
      content: `
### Why Shift-Left Security Matters

Traditional security audits happen right before a production release — often delaying launches by weeks. **DevSecOps** integrates security controls directly into the CI/CD pipeline so issues are caught minutes after code is written.

---

### Core Pipeline Security Stages

#### 1. Pre-Commit & Secret Scanning
Hardcoded secrets (AWS keys, database passwords, JWT secrets) are the #1 source of cloud breaches. Using tools like **GitGuardian** or **pre-commit hooks**, secret scans prevent sensitive data from ever reaching GitHub.

#### 2. Static Application Security Testing (SAST)
Tools like **SonarQube** scan source code for OWASP Top 10 vulnerabilities (SQL injection, XSS, insecure deserialization) during the CI build stage.

#### 3. Container Image Scanning (Trivy)
Before pushing an image to ECR or Artifact Registry, **Trivy** checks base OS packages and application dependencies for known CVEs:

\`\`\`bash
trivy image --severity HIGH,CRITICAL asia-south1-docker.pkg.dev/my-project/app:latest
\`\`\`

#### 4. Infrastructure-as-Code (IaC) Linting
Tools like **Checkov** verify that Terraform files follow cloud security best practices (e.g., ensuring S3 buckets are private and Cloud SQL has SSL enabled).

---

### Summary Table

| Stage | Security Focus | Recommended Tool |
|---|---|---|
| Code | Secret Detection | GitGuardian / TruffleHog |
| Build | SAST | SonarQube |
| Image | CVE Scanning | Trivy |
| IaC | Policy Enforcement | Checkov / tfsec |
      `,
    },
    {
      id: 'post-3',
      slug: 'making-cloud-infrastructure-audit-ready',
      title: 'Preparing Cloud Infrastructure for SOC 2 & ISO 27001 Audit Readiness',
      category: 'Architecture',
      summary: 'How to structure cloud environments, logging pipelines, and IAM controls to pass security compliance audits with confidence.',
      readTime: '7 min read',
      date: 'Jan 2025',
      tags: ['Compliance', 'SOC 2', 'ISO 27001', 'Cloud', 'Audit'],
      content: `
### Preparing for SOC 2 & ISO/IEC 27001

Compliance is not just documentation — it requires verifiable proof built directly into your cloud architecture.

---

### Key Infrastructure Pillars for Audit Readiness

1. **Least-Privilege IAM**:
   * No shared credentials or admin-for-all accounts.
   * Enforce MFA on all IAM users.
   * Use temporary, role-based access tokens for CI/CD pipelines.

2. **Centralized Audit Logging**:
   * Enable AWS CloudTrail or GCP Cloud Audit Logs.
   * Lock log buckets with immutability policies (WORM / Object Lock) so audit logs cannot be modified or deleted even by root users.

3. **Automated Database Backups & Point-in-Time Recovery**:
   * Schedule automated daily snapshots.
   * Conduct periodic restore drills and keep logs proving data integrity.

4. **Change Management Traceability**:
   * Every infrastructure modification must stem from a Git commit (Infrastructure as Code) linked to a peer-reviewed PR.
      `,
    },
  ] as BlogPost[],

  careerHistory: [
    {
      id: 'exp-1',
      title: 'Senior Cloud and DevSecOps Engineer',
      company: 'Ideassion Technology Solutions',
      location: 'Chennai, Tamil Nadu, India',
      period: 'April 2026 – Present',
      summary: 'Leading cloud infrastructure security, multi-cloud management, CI/CD automation, and audit readiness across AWS, GCP, and Azure.',
      responsibilities: [
        'Architect secure, scalable, and automated cloud infrastructure across AWS, GCP, and Azure.',
        'Design automated CI/CD build pipelines using GitHub Actions, Jenkins, and Google Cloud Build.',
        'Implement continuous observability, logging, and incident response runbooks.',
        'Ensure infrastructure audit readiness for SOC 2 and ISO/IEC 27001 compliance standards.',
        'Manage containerized workloads with Docker and Kubernetes fleets.',
      ],
      achievements: [
        'Architected production GCP Cloud Run setup for Glido with automated deployment triggers and high availability Cloud SQL.',
        'Reduced release deployment times by 80% through declarative Dockerization and CI/CD automation.',
        'Established DevSecOps security scanning guardrails catching CVE vulnerabilities prior to release.',
      ],
      technologies: ['AWS', 'GCP', 'Azure', 'Terraform', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Splunk', 'SOC 2'],
    },
    {
      id: 'exp-2',
      title: 'Digital Transformation Specialist',
      company: 'Ideassion Technology Solutions',
      location: 'Chennai, Tamil Nadu, India',
      period: 'Aug 2025 – April 2026',
      summary: 'Drove R&D initiatives, leadership development, and cross-functional collaborations while architecting cloud and DevOps solutions.',
      responsibilities: [
        'Spearheaded Research and Development (R&D) initiatives for cloud and automation tooling.',
        'Architected multi-cloud solutions on AWS, Azure, GCP, and DigitalOcean.',
        'Mentored engineering team members on DevOps best practices, containerization, and modern architecture.',
      ],
      achievements: [
        'Engineered automated deployment pipelines and database backup routines for production applications.',
        'Standardized microservice Docker configurations across internal development teams.',
      ],
      technologies: ['AWS', 'Azure', 'GCP', 'DigitalOcean', 'DevOps', 'Docker', 'React.js'],
    },
    {
      id: 'exp-3',
      title: 'Senior Digital Transformation Engineer',
      company: 'Ideassion Technology Solutions',
      location: 'Chennai, Tamil Nadu, India',
      period: 'Dec 2023 – Aug 2025',
      summary: 'Managed multi-cloud environments and advanced front-end engineering for enterprise solutions.',
      responsibilities: [
        'Managed complex cloud server environments across AWS, Azure, and GCP.',
        'Optimized DevOps workflows for improved deployment efficiency and uptime.',
        'Developed scalable enterprise web applications using React.js, Redux, and Node.js.',
      ],
      achievements: [
        'Built enterprise React dashboard components for connected planning and forecasting for Ackumen.',
        'Improved frontend performance and bundle loading speeds through state optimization.',
      ],
      technologies: ['AWS', 'Azure', 'GCP', 'React.js', 'Redux', 'Node.js', 'JavaScript'],
    },
    {
      id: 'exp-4',
      title: 'Software Engineer',
      company: 'Ideassion Technology Solutions',
      location: 'Chennai, Tamil Nadu, India',
      period: 'Aug 2021 – Dec 2023',
      summary: 'Core contributor to full-stack development and cloud migrations.',
      responsibilities: [
        'Built responsive web interfaces with React.js and CSS.',
        'Implemented backend APIs and microservices using Node.js and REST.',
        'Managed cloud server resources on AWS EC2 and Microsoft Azure.',
      ],
      achievements: [
        'Delivered responsive client web interfaces and backend REST services on schedule.',
      ],
      technologies: ['React.js', 'Node.js', 'AWS', 'Azure', 'JavaScript', 'REST APIs'],
    },
  ] as CareerRole[],
};
