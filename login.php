<?php
include 'db.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];
    $role     = $_POST['role'];

    $query = "SELECT * FROM users WHERE username='$username' AND role='$role' LIMIT 1";
    $result = mysqli_query($conn, $query);

    if ($row = mysqli_fetch_assoc($result)) {
        // Untuk demo, password plaintext. Untuk produksi, gunakan password_hash!
        if ($row['password'] === $password) {
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['role'] = $row['role'];
            echo json_encode(['success' => true, 'role' => $row['role']]);
        } else {
            echo json_encode(['success' => false, 'msg' => 'Password salah!']);
        }
    } else {
        echo json_encode(['success' => false, 'msg' => 'Username atau role tidak ditemukan!']);
    }
} else {
    echo json_encode(['success' => false, 'msg' => 'Metode tidak valid!']);
}
?>
