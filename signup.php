<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];
    $role     = $_POST['role'];

    // Validasi sederhana
    if (empty($username) || empty($password) || empty($role)) {
        echo json_encode(['success' => false, 'msg' => 'Semua field harus diisi!']);
        exit;
    }

    // Cek username sudah ada
    $cek = mysqli_query($conn, "SELECT id FROM users WHERE username='$username' AND role='$role'");
    if (mysqli_num_rows($cek) > 0) {
        echo json_encode(['success' => false, 'msg' => 'Username sudah terdaftar untuk role ini!']);
        exit;
    }

    // Untuk produksi, gunakan password_hash!
    $query = "INSERT INTO users (username, password, role) VALUES ('$username', '$password', '$role')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['success' => true, 'msg' => 'Registrasi berhasil!']);
    } else {
        echo json_encode(['success' => false, 'msg' => 'Registrasi gagal!']);
    }
} else {
    echo json_encode(['success' => false, 'msg' => 'Metode tidak valid!']);
}
?>
