import React from 'react';
import { Link } from 'react-router-dom';
import notFound from "../assets/404Logo.svg"

const NotFoundPage = () => {
  return (
    
    <div style={styles.container}>
    <img src={notFound} alt="404" className="w-1/2 h-1/2" />
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
