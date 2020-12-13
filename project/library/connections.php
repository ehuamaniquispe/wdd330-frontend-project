<?php

function doitConnect()
{
   $server = 'mysql';//nombre del contenedor docker que tiene mysql si usas un compose file o el ip si instalas contenedores separados
   $dbname = 'doit';
   $username = 'root';
   $password = 'BYU_UTAH13';
   $port = '3306';
   

   $dsn = 'mysql:host=' . $server . ';port=' . $port . ';dbname=' . $dbname . ';charset=utf8';
   $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);

   // Create the actual connection object and assign it to a variable
   try {
      $link = new PDO($dsn, $username, $password, $options);
      //echo "it works";
      return $link;
   } catch (PDOException $e) {
      echo $e->getMessage();
      //header('Location: /doit/view/500.php');
      exit;
   }
}