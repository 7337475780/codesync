export type DomainStatus = 'pending' | 'verified' | 'failed' | 'active';
export type SSLStatus = 'pending' | 'issued' | 'failed' | 'unsupported';

export interface CustomDomain {
  id: string;
  projectId: string;
  domain: string;
  status: DomainStatus;
  sslStatus: SSLStatus;
  createdAt: string;
  verifiedAt: string | null;
  errorMessage: string | null;
  targetEnvironment: 'production' | 'preview';
  branch: string | null; // For branch-specific preview domains
  dnsRecords: DNSRecord[];
}

export interface DNSRecord {
  type: 'A' | 'CNAME' | 'TXT';
  name: string;
  value: string;
  ttl?: number;
  status?: 'pending' | 'verified' | 'failed';
}
