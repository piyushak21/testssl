import https from 'https';
import { AWS } from 'aws-sdk';

// Create an AWS ACM instance
const acm = new AWS.ACM();

// Specify the ARN of your SSL certificate
const certificateArn = 'arn:aws:acm:ap-south-1:542367258819:certificate/5776488c-31c0-45ce-a548-8029c4d2a75c';

// Retrieve the SSL certificate from ACM
const getCertificate = async () => {
  const params = {
    CertificateArn: certificateArn
  };

  try {
    const { Certificate } = await acm.describeCertificate(params).promise();
    return Certificate.CertificateBody;
  } catch (error) {
    console.error('Failed to retrieve the SSL certificate:', error);
    process.exit(1);
  }
};

// Create the HTTPS server using the retrieved SSL certificate
const createServer = async () => {
  try {
    const certificate = await getCertificate();
    const options = {
      key: certificate.PrivateKey,
      cert: certificate.Certificate
    };

    const server = https.createServer(options, (req, res) => {
      // Handle your HTTPS requests here
    });

    const port = 443; // Default HTTPS port
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to create the HTTPS server:', error);
    process.exit(1);
  }
};

createServer();
