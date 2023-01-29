<?php

include 'config.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $sql = "SELECT * FROM contactlist";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE c_id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $contacts = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($contacts);
        break;
    case "POST":
        $contact = json_decode(file_get_contents('php://input'));
        // if(isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $uniqueFileName = $_POST['uniqueFileName'];
        $file_name = $_FILES['file']['name'];
        // $file_type = $_FILES['file']['type'];
        $file_tmpName = $_FILES['file']['tmp_name'];
        // $file_size = $_FILES['file']['size'];
        // $encodedFile = uniqid().'.'.$file_type;
        $splitedFileName = explode('.', $file_name);
        $fileExtension = strtolower(end($splitedFileName));
        $newFile = $uniqueFileName . '.' . $fileExtension;
        $imagePath = '../backend/images/' . $newFile;
        move_uploaded_file($file_tmpName, 'images/' . $newFile);
        $cId = $_POST['c_id'];
        $firstName = $_POST['first_name'];
        $lastName = $_POST['last_name'];
        $phoneNo = $_POST['phone_no'];
        $emailAddress = $_POST['email_address'];
        $address = $_POST['contact_address'];
        // }
        $sql = "INSERT INTO contactlist(c_id, first_name, last_name, phone_no, email_address, image_path, image_name, contact_address) VALUES (:id, :fname, :lname, :mobile, :email, :imagepath, :imagename, :address)";
        $stmt = $conn->prepare($sql);
        // $created_at = date('Y-m-d');
        $stmt->bindParam(':id', $cId);
        $stmt->bindParam(':fname', $firstName);
        $stmt->bindParam(':lname', $lastName);
        $stmt->bindParam(':mobile', $phoneNo);
        $stmt->bindParam(':email', $emailAddress);
        $stmt->bindParam(':imagepath', $imagePath);
        $stmt->bindParam(':imagename', $newFile);
        $stmt->bindParam(':address', $address);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record inserted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to insert record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $contact = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE contactlist SET first_name= :fname, last_name= :lname, phone_no= :mobile, email_address= :email, contact_address= :address WHERE c_id = :id";
        $stmt = $conn->prepare($sql);
        // $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $contact->c_id);
        $stmt->bindParam(':fname', $contact->first_name);
        $stmt->bindParam(':lname', $contact->last_name);
        $stmt->bindParam(':mobile', $contact->phone_no);
        $stmt->bindParam(':email', $contact->email_address);
        // $stmt->bindParam(':img', $contact->image_path);
        $stmt->bindParam(':address', $contact->contact_address);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $select = "SELECT image_name, image_path FROM contactlist WHERE c_id = :id";

        $result = $conn->prepare($select);
        $result->bindParam(':id', $path[4]);

        if ($result->execute()) {
            $row = $result->fetch();
            $oldImage = $row["image_name"];
            $oldImagePath = './images/'.$oldImage;
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }
        }

        $sql = "DELETE FROM contactlist WHERE c_id = :id";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[4]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}
