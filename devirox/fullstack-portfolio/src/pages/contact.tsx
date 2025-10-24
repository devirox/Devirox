import React from 'react';
import Layout from '../components/Layout';
import useForm from '../hooks/useForm';

const Contact: React.FC = () => {
    // Provide initial values and a no-op validator so the hook's signature matches
    const { values, handleChange } = useForm({ name: '', email: '', message: '' }, () => ({}));

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!values.name || !values.email || !values.message) {
            // Basic client-side validation
            alert('Please fill out all fields.');
            return;
        }

        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            alert('Message sent successfully.');
        } catch (err) {
            console.error('Contact form submit error:', err);
            alert('Failed to send message.');
        }
    };

    return (
        <Layout>
            <h1>Contact Me</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Send Message</button>
            </form>
        </Layout>
    );
};

export default Contact;