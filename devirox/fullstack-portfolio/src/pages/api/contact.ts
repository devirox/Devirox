import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../utils/mailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        try {
            // mailer expects (to, subject, text)
            await sendEmail(email, `Contact from ${name}`, message);
            return res.status(200).json({ success: 'Message sent successfully.' });
        } catch (error) {
            console.error('Contact API sendEmail error:', error);
            return res.status(500).json({ error: 'Failed to send message.' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}