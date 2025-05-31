import SibApiV3Sdk from 'sib-api-v3-sdk';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

export async function sendWelcomeEmail(to: string, name: string) {
  await apiInstance.sendTransacEmail({
    sender: { name: 'Dripnex', email: 'hello@dripnex.app' },
    to: [{ email: to, name }],
    subject: 'Welcome to Dripnex 🚀',
    htmlContent: `<p>Hey ${name}, thanks for joining Dripnex! Let's build the future of Web3 together.</p>`,
  });
}