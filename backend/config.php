<?php
	// Headers:

	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	header("Content-Type: application/json");
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header("Access-Control-Allow-Headers: *");
	header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
	
	/* Database Connection */
	
	class DbConnect {
		private $server = 'localhost';
		private $dbname = 'contactlistdb';
		private $user = 'root';
		private $pass = '';

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
        
	}
?>