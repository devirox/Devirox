// Lightweight mailer stub used for builds where `nodemailer` isn't installed.
// Replace with a real implementation (e.g., nodemailer or an external API) in production.
export const sendEmail = async (to: string, subject: string, text: string) => {
    if (!process.env.SMTP_HOST) {
        // No SMTP configured — just log the message for local/dev environments.
        console.log('[mailer stub] sendEmail called:', { to, subject, text });
        return Promise.resolve();
    }

    // If you want to enable real emailing in this environment, install `nodemailer`
    // and implement the transport creation here. For now we throw to indicate missing setup.
    throw new Error('SMTP is not configured for this environment. Install and configure nodemailer to enable real email sending.');
};