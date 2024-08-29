import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.text}>Halaman tidak ditemukan</p>
      <Link to="/" style={styles.link}>Kembali ke Beranda</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  header: {
    fontSize: '6rem',
    margin: '0',
  },
  text: {
    fontSize: '1.5rem',
  },
  link: {
    marginTop: '20px',
    fontSize: '1.2rem',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default NotFoundPage;
