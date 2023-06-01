const https = require('https');
const { ACM } = require('aws-sdk');

const acm = new ACM({
  region: 'ap-south-1',
  accessKeyId: 'AKIAX4R43TDB5WL2SXOT',
  secretAccessKey: '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'
});

const certificateArn = 'arn:aws:acm:ap-south-1:542367258819:certificate/5776488c-31c0-45ce-a548-8029c4d2a75c';

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

const createServer = async () => {
  try {
    const certificate = await getCertificate();
    const options = {
      key: certificate.PrivateKey,
      cert: certificate.Certificate
    };

    const server = https.createServer(options, (req, res) => {
      if (req.url === '/check-https') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'HTTPS is working!' }));
      } else {
        // Handle your other API endpoints here
        // ...
      }
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
