<?php
header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitizar datos
    $nombre_empresa = filter_var($_POST['nombre_empresa'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $mensaje = filter_var($_POST['mensaje'], FILTER_SANITIZE_STRING);
    
    // Validar datos
    if (empty($nombre_empresa) || empty($email) || empty($mensaje)) {
        echo "error: Todos los campos son obligatorios";
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "error: Email inválido";
        exit;
    }
    
    // Configuración de la base de datos (AJUSTA ESTOS DATOS)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "la_nube_computacion";
    
    try {
        // Conexión a la base de datos
        $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Insertar en la base de datos
        $sql = "INSERT INTO contactos (nombre_empresa, email, mensaje, fecha_contacto) VALUES (?, ?, ?, NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nombre_empresa, $email, $mensaje]);
        
        // Enviar email de notificación (OPCIONAL)
        $to = "hola@lanubecomputacion.com";
        $subject = "Nuevo contacto desde La Nube Computación";
        $email_message = "Nuevo mensaje de contacto:\n\n";
        $email_message .= "Empresa: " . $nombre_empresa . "\n";
        $email_message .= "Email: " . $email . "\n";
        $email_message .= "Mensaje:\n" . $mensaje . "\n\n";
        $email_message .= "Fecha: " . date('d/m/Y H:i:s');
        
        $headers = "From: no-reply@lanubecomputacion.com\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        
        mail($to, $subject, $email_message, $headers);
        
        echo "success";
        
    } catch(PDOException $e) {
        echo "error: " . $e->getMessage();
    }
    
    $conn = null;
} else {
    echo "error: Método no permitido";
}
?>