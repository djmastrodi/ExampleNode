/* eslint-disable max-lines */
export const returnCerts = (): string => {
  // Trick to avoid filesystem read of https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem
  // This is needed for TLS/encryption: https://docs.aws.amazon.com/documentdb/latest/developerguide/security.encryption.ssl.html
  return `-----BEGIN CERTIFICATE-----
    
    -----END CERTIFICATE-----`;
};
