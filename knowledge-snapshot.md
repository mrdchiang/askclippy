# VM Knowledge Snapshot — 2026-07-10

## Overview
- 30 assets · 138 findings · 82 active
- 20 CVEs (6 KEV) · 20 remediations · 20 deployments
- Auto-remediation rate: 60%

**Asset summary:** 30 assets total. Top OS: Windows Server 2019 (8); Windows 11 Enterprise (7); Windows Server 2022 (5); RHEL 9.4 (4); macOS 15 Sequoia (3). Locations: US-East (nyc1) (9); EU-Central (fra1) (8); US-West (sfo1) (7); APAC-Singapore (6).

## Compliance
- Endpoint health: 270 endpoint checks: 72% pass rate, 0 critical failures
- GPO compliance: 480 GPO policies: 68% compliant

## Activity
20 remediations: 12 completed (60% auto-remediation rate). 20 deployments: In Progress: 4, Rolled Back: 2, Completed: 9, Failed: 5

## Critical KEV CVEs
- CVE-2026-10001: Log Library Remote Code Execution | Severity: Critical | CVSS: 10.0 | ⚠ KEV | 🔴 Ransomware | Affects 1 assets: K8S-PROD-03
- CVE-2026-10003: Mail Server Remote Code Execution | Severity: Critical | CVSS: 9.8 | ⚠ KEV | 🔴 Ransomware | Affects 2 assets: APP-PROD-02, SRV-STAG-03
- CVE-2026-10011: Virtualization Platform RCE | Severity: Critical | CVSS: 9.6 | ⚠ KEV |  | Affects 6 assets: K8S-PROD-03, SRV-DEV-12, APP-PROD-05, EXCH-PROD-02, CI-CD-02
- CVE-2026-10012: Network OS Auth Bypass | Severity: Critical | CVSS: 9.1 | ⚠ KEV |  | Affects 3 assets: APP-PROD-02, WEB-PROD-07, WEB-PROD-03
- CVE-2026-10017: Browser Engine RCE | Severity: Critical | CVSS: 9.1 | ⚠ KEV | 🔴 Ransomware | Affects 4 assets: MAC-EXEC-01, NPS-PROD-01, DC-PROD-02, APP-PROD-07

## All Active CVEs
- CVE-2026-10001: Log Library Remote Code Execution | Severity: Critical | CVSS: 10.0 | ⚠ KEV | 🔴 Ransomware | Affects 1 assets: K8S-PROD-03
- CVE-2026-10002: Print Service Elevation of Privilege | Severity: High | CVSS: 8.5 | ⚠ KEV |  | Affects 3 assets: DNS-PROD-01, SRV-DEV-12, K8S-PROD-07
- CVE-2026-10003: Mail Server Remote Code Execution | Severity: Critical | CVSS: 9.8 | ⚠ KEV | 🔴 Ransomware | Affects 2 assets: APP-PROD-02, SRV-STAG-03
- CVE-2026-10004: Certificate Parsing Denial of Service | Severity: Medium | CVSS: 5.9 | Not KEV |  | Affects 6 assets: K8S-PROD-03, DB-PROD-05, FRA-VM033, WEB-PROD-03, NYC-LT312
- CVE-2026-10005: Kernel Privilege Escalation | Severity: High | CVSS: 7.8 | Not KEV |  | Affects 3 assets: NPS-PROD-01, MAC-EXEC-05, SFO-LT228
- CVE-2026-10006: File Sharing Protocol Remote Code Execution | Severity: High | CVSS: 8.5 | Not KEV |  | Affects 1 assets: CORP-WS7421
- CVE-2026-10007: Authentication Protocol Elevation | Severity: High | CVSS: 7.5 | Not KEV |  | Affects 5 assets: DB-PROD-05, WEB-PROD-03, DNS-PROD-01, MAC-ENG-22, DC-PROD-02
- CVE-2026-10008: TLS Certificate Validation Bypass | Severity: Medium | CVSS: 6.5 | Not KEV |  | Affects 6 assets: SRV-DEV-12, FW-PROD-01, EXCH-PROD-02, CI-CD-01, NPS-PROD-01
- CVE-2026-10009: Kernel Use-After-Free | Severity: High | CVSS: 7.2 | Not KEV |  | Affects 3 assets: SRV-DEV-12, APP-PROD-02, DC-PROD-01
- CVE-2026-10010: Runtime Request Smuggling | Severity: High | CVSS: 7.3 | Not KEV |  | Affects 2 assets: MAC-EXEC-01, EXCH-PROD-01
- CVE-2026-10011: Virtualization Platform RCE | Severity: Critical | CVSS: 9.6 | ⚠ KEV |  | Affects 6 assets: K8S-PROD-03, SRV-DEV-12, APP-PROD-05, EXCH-PROD-02, CI-CD-02
- CVE-2026-10012: Network OS Auth Bypass | Severity: Critical | CVSS: 9.1 | ⚠ KEV |  | Affects 3 assets: APP-PROD-02, WEB-PROD-07, WEB-PROD-03
- CVE-2026-10013: Database Engine RCE | Severity: High | CVSS: 8.2 | Not KEV |  | Affects 4 assets: MAC-ENG-22, MAC-ENG-14, SRV-DEV-07, WEB-PROD-07
- CVE-2026-10014: Container Runtime Smuggling | Severity: High | CVSS: 7.5 | Not KEV |  | Affects 4 assets: MAC-ENG-14, CI-CD-01, K8S-PROD-07, EXCH-PROD-02
- CVE-2026-10015: Stream Protocol Cancellation DoS | Severity: Medium | CVSS: 6.8 | Not KEV |  | Affects 6 assets: LON-WS115, DB-PROD-05, NYC-LT312, CORP-WS7421, NPS-PROD-01
- CVE-2026-10016: OS Kernel Privilege Escalation | Severity: High | CVSS: 7.8 | Not KEV |  | Affects 6 assets: MAC-EXEC-01, EXCH-PROD-02, NYC-LT312, MAC-ENG-22, SRV-STAG-03
- CVE-2026-10017: Browser Engine RCE | Severity: Critical | CVSS: 9.1 | ⚠ KEV | 🔴 Ransomware | Affects 4 assets: MAC-EXEC-01, NPS-PROD-01, DC-PROD-02, APP-PROD-07
- CVE-2026-10018: Security Framework Bypass | Severity: Medium | CVSS: 6.2 | Not KEV |  | Affects 5 assets: K8S-PROD-03, SRV-DEV-12, K8S-PROD-07, SFO-LT228, DC-PROD-01
- CVE-2026-10019: MDM Privilege Escalation | Severity: High | CVSS: 7.5 | Not KEV |  | Affects 1 assets: SRV-STAG-03
- CVE-2026-10020: Collaboration Suite Sandbox Escape | Severity: High | CVSS: 7.3 | Not KEV |  | Affects 5 assets: FW-PROD-01, CI-CD-02, CORP-WS7421, MAC-ENG-22, EXCH-PROD-01

## Assets With Critical Findings
- APP-PROD-02 (Windows Server 2022, US-East (nyc1)) — 3 critical, 1 high findings | Health: 56% | GPO: 56% compliant
- K8S-PROD-03 (Windows 11 Enterprise, EU-Central (fra1)) — 3 critical, 0 high findings | Health: 67% | GPO: 56% compliant
- WEB-PROD-03 (macOS 15 Sequoia, EU-Central (fra1)) — 1 critical, 2 high findings | Health: 44% | GPO: 50% compliant
- WEB-PROD-07 (Windows Server 2019, US-East (nyc1)) — 1 critical, 1 high findings | Health: 100% | GPO: 69% compliant
- APP-PROD-05 (Windows Server 2019, US-East (nyc1)) — 1 critical, 0 high findings | Health: 78% | GPO: 75% compliant
- APP-PROD-07 (Windows Server 2019, APAC-Singapore) — 1 critical, 0 high findings | Health: 67% | GPO: 62% compliant
- DC-PROD-02 (Windows 11 Enterprise, US-West (sfo1)) — 1 critical, 1 high findings | Health: 78% | GPO: 75% compliant
- EXCH-PROD-02 (Windows 11 Enterprise, US-East (nyc1)) — 1 critical, 2 high findings | Health: 78% | GPO: 69% compliant
- NPS-PROD-01 (Windows 11 Enterprise, EU-Central (fra1)) — 1 critical, 1 high findings | Health: 67% | GPO: 81% compliant
- CI-CD-02 (Windows Server 2022, US-East (nyc1)) — 1 critical, 1 high findings | Health: 78% | GPO: 56% compliant

## All Assets
- WEB-PROD-03 (macOS 15 Sequoia, EU-Central (fra1)) — 1 critical, 2 high findings | Health: 44% | GPO: 50% compliant
- WEB-PROD-07 (Windows Server 2019, US-East (nyc1)) — 1 critical, 1 high findings | Health: 100% | GPO: 69% compliant
- APP-PROD-02 (Windows Server 2022, US-East (nyc1)) — 3 critical, 1 high findings | Health: 56% | GPO: 56% compliant
- APP-PROD-05 (Windows Server 2019, US-East (nyc1)) — 1 critical, 0 high findings | Health: 78% | GPO: 75% compliant
- APP-PROD-07 (Windows Server 2019, APAC-Singapore) — 1 critical, 0 high findings | Health: 67% | GPO: 62% compliant
- DC-PROD-01 (Windows 11 Enterprise, US-West (sfo1)) — 0 critical, 1 high findings | Health: 89% | GPO: 62% compliant
- DC-PROD-02 (Windows 11 Enterprise, US-West (sfo1)) — 1 critical, 1 high findings | Health: 78% | GPO: 75% compliant
- EXCH-PROD-01 (Windows Server 2022, US-East (nyc1)) — 0 critical, 2 high findings | Health: 78% | GPO: 69% compliant
- EXCH-PROD-02 (Windows 11 Enterprise, US-East (nyc1)) — 1 critical, 2 high findings | Health: 78% | GPO: 69% compliant
- DB-PROD-02 (Ubuntu 24.04 LTS, APAC-Singapore) — 0 critical, 1 high findings | Health: 78% | GPO: 62% compliant
- DB-PROD-05 (Ubuntu 24.04 LTS, EU-Central (fra1)) — 0 critical, 1 high findings | Health: 67% | GPO: 56% compliant
- DNS-PROD-01 (Windows Server 2019, US-West (sfo1)) — 0 critical, 2 high findings | Health: 89% | GPO: 69% compliant
- FW-PROD-01 (Windows Server 2022, US-East (nyc1)) — 0 critical, 1 high findings | Health: 89% | GPO: 69% compliant
- NPS-PROD-01 (Windows 11 Enterprise, EU-Central (fra1)) — 1 critical, 1 high findings | Health: 67% | GPO: 81% compliant
- K8S-PROD-03 (Windows 11 Enterprise, EU-Central (fra1)) — 3 critical, 0 high findings | Health: 67% | GPO: 56% compliant
- K8S-PROD-07 (Ubuntu 24.04 LTS, US-West (sfo1)) — 0 critical, 2 high findings | Health: 44% | GPO: 75% compliant
- CI-CD-01 (RHEL 9.4, US-West (sfo1)) — 0 critical, 1 high findings | Health: 78% | GPO: 62% compliant
- CI-CD-02 (Windows Server 2022, US-East (nyc1)) — 1 critical, 1 high findings | Health: 78% | GPO: 56% compliant
- MAC-ENG-14 (RHEL 9.4, US-West (sfo1)) — 0 critical, 3 high findings | Health: 78% | GPO: 69% compliant
- MAC-ENG-22 (macOS 15 Sequoia, APAC-Singapore) — 0 critical, 4 high findings | Health: 78% | GPO: 62% compliant
- MAC-EXEC-01 (macOS 15 Sequoia, EU-Central (fra1)) — 1 critical, 2 high findings | Health: 67% | GPO: 81% compliant
- MAC-EXEC-05 (Windows Server 2019, APAC-Singapore) — 0 critical, 1 high findings | Health: 56% | GPO: 69% compliant
- SRV-DEV-07 (RHEL 9.4, US-West (sfo1)) — 0 critical, 1 high findings | Health: 67% | GPO: 69% compliant
- SRV-DEV-12 (RHEL 9.4, US-East (nyc1)) — 1 critical, 2 high findings | Health: 89% | GPO: 88% compliant
- SRV-STAG-03 (Windows Server 2019, APAC-Singapore) — 1 critical, 2 high findings | Health: 56% | GPO: 75% compliant
- CORP-WS7421 (Windows Server 2022, APAC-Singapore) — 1 critical, 2 high findings | Health: 78% | GPO: 62% compliant
- NYC-LT312 (Windows 11 Enterprise, US-East (nyc1)) — 0 critical, 1 high findings | Health: 33% | GPO: 62% compliant
- SFO-LT228 (Windows 11 Enterprise, EU-Central (fra1)) — 0 critical, 1 high findings | Health: 78% | GPO: 81% compliant
- LON-WS115 (Windows Server 2019, EU-Central (fra1)) — 0 critical, 0 high findings | Health: 89% | GPO: 62% compliant
- FRA-VM033 (Windows Server 2019, EU-Central (fra1)) — 0 critical, 0 high findings | Health: 78% | GPO: 75% compliant
