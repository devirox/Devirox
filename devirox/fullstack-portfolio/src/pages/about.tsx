import React from 'react';
import Layout from '../components/Layout';

const About: React.FC = () => {
    return (
        <Layout>
            <h1>About Me</h1>
            <p>
                Hello! I'm a full-stack web developer with a passion for creating dynamic and responsive web applications.
                I have experience in various technologies including JavaScript, TypeScript, React, Node.js, and more.
            </p>
            <h2>Skills</h2>
            <ul>
                <li>JavaScript / TypeScript</li>
                <li>React / Next.js</li>
                <li>Node.js / Express</li>
                <li>HTML / CSS</li>
                <li>Database Management (SQL, NoSQL)</li>
                <li>Version Control (Git)</li>
            </ul>
            <h2>Background</h2>
            <p>
                I have a background in computer science and have worked on various projects that have honed my skills
                in both front-end and back-end development. I enjoy collaborating with teams and continuously learning
                new technologies to improve my craft.
            </p>
        </Layout>
    );
};

export default About;