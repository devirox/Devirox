import React from 'react';
import Layout from '../components/Layout';

const Home: React.FC = () => {
    return (
        <Layout>
            <div className="home">
                <h1>Welcome to My Portfolio</h1>
                <p>
                    I am a full-stack web developer with a passion for creating dynamic and responsive web applications.
                </p>
                <p>
                    Explore my projects, learn more about me, or get in touch!
                </p>
            </div>
        </Layout>
    );
};

export default Home;