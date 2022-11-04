<?php

include 'config.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
        $contact = json_decode( file_get_contents('php://input') );
        if(isset($_FILES['file'])) {
            $file = $_FILES['file'];
            $userId = $_POST['userId'];
            $uniqueFileName = $_POST['uniqueFileName'];
            $file_name = $_FILES['file']['name'];
            $file_tmpName = $_FILES['file']['tmp_name'];
            $splitedFileName = explode('.',$file_name);
            $fileExtension=strtolower(end($splitedFileName));
            $newFile = $uniqueFileName.'.'.$fileExtension;
            $imagePath = '../backend/images/'.$newFile;
            $select = "SELECT image_name FROM contactlist WHERE c_id = :id";
            $result = $conn->prepare($select);
            $result->bindParam(':id', $userId);
            if($result->execute()) {
                $row = $result->fetch();
                $oldImage = $row["image_name"];
                $oldImagePath = './images/'.$oldImage;
                if ($imagePath !== $oldImage) {
                    move_uploaded_file($file_tmpName,'images/'.$newFile);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }
            }
        }

        $sql = "UPDATE contactlist SET image_name = :imagename, image_path = :imagepath WHERE c_id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $userId);
        $stmt->bindParam(':imagename', $newFile);
        $stmt->bindParam(':imagepath', $imagePath);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Contact Photo updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update Contact Photo.'];
        }
        echo json_encode($response);
}

?>