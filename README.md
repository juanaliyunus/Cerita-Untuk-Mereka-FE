# Cerita Untuk Mereka

Proyek ini adalah aplikasi web yang dibangun menggunakan React, Vite, Redux, dan NextUI. Aplikasi ini bertujuan untuk menyediakan platform bagi pengguna untuk berbagi cerita dan pengalaman.

## Struktur Proyek

- `src/App.jsx`: Komponen utama aplikasi yang mengatur routing.
- `src/main.jsx`: Entry point aplikasi yang mengatur provider dan tema.
- `src/pages/LandingPage.jsx`: Halaman landing dengan komponen Navbar.
- `src/pages/auth/AuthPage.jsx`: Halaman otentikasi dengan form login dan register.

## Teknologi yang Digunakan

- [React](https://reactjs.org/): Library untuk membangun antarmuka pengguna.
- [Vite](https://vitejs.dev/): Build tool untuk pengembangan front-end yang cepat.
- [Redux](https://redux.js.org/): Library untuk manajemen state.
- [NextUI](https://nextui.org/): Library komponen UI.
- [React Router](https://reactrouter.com/): Library untuk routing di React.
- [Next Themes](https://github.com/pacocoursey/next-themes): Library untuk manajemen tema.

## Cara Menjalankan Proyek

1. Clone repository ini.
2. Jalankan `npm install` untuk menginstal dependensi.
3. Jalankan `npm run dev` untuk memulai server pengembangan.

## Fitur

- Halaman landing dengan navbar.
- Halaman otentikasi dengan form login dan register.
- Manajemen state dengan Redux.
- Tema yang dapat diubah dengan Next Themes.

## Plugin Resmi yang Tersedia

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) menggunakan [Babel](https://babeljs.io/) untuk Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) menggunakan [SWC](https://swc.rs/) untuk Fast Refresh.

## Struktur Direktori

- `public/`: Berisi aset publik seperti ikon dan gambar.
- `src/`: Berisi kode sumber aplikasi.
  - `assets/`: Berisi aset seperti gambar dan ikon.
  - `component/`: Berisi komponen-komponen React yang digunakan dalam aplikasi.
  - `pages/`: Berisi halaman-halaman utama aplikasi.
  - `store/`: Berisi konfigurasi store Redux.
  - `lib/`: Berisi utilitas dan konfigurasi seperti instance axios.