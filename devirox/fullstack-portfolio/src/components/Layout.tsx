import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/layout.module.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;