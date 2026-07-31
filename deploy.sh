#!/bin/bash

# Pastikan script berhenti jika ada perintah yang gagal
set -e

echo "================================================="
echo "Memulai proses deployment..."
echo "================================================="

# Masuk ke mode maintenance (opsional, agar user melihat halaman maintenance saat deploy)
echo "1. Memasukkan aplikasi ke mode maintenance..."
php artisan down || true

# Menarik kode terbaru dari branch utama (sesuaikan 'main' jika menggunakan 'master')
echo "2. Menarik update terbaru dari GitHub..."
git pull origin main

# Menginstall/mengupdate dependensi PHP
echo "3. Menginstall dependensi Composer..."
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Menjalankan migrasi database jika ada (aman dijalankan meski tidak ada tabel baru)
echo "4. Menjalankan migrasi database..."
php artisan migrate --force

# Menginstall dependensi Node.js & mem-build aset frontend
echo "5. Mem-build aset frontend (React/Vite)..."
npm install
npm run build

# Menghapus cache lama dan membuat cache baru untuk performa
echo "6. Mengoptimasi cache (Config, Routes, Views)..."
php artisan optimize:clear
php artisan optimize
php artisan view:cache

# Membuka kembali aplikasi dari mode maintenance
echo "7. Membuka aplikasi dari mode maintenance..."
php artisan up

echo "================================================="
echo "Deployment berhasil diselesaikan!"
echo "================================================="
