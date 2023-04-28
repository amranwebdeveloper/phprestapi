<?php

require 'config.php';
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim(array(
    'debug' => true
));

$app->config('debug', true);

$app->post('/login', 'login'); /* User login */
$app->post('/signup', 'signup'); /* User Signup  */
$app->get('/getFeed', 'getFeed'); /* User Feeds  */
$app->post('/feed', 'feed'); /* User Feeds  */
$app->post('/feedUpdate', 'feedUpdate'); /* User Feeds  */
$app->post('/feedDelete', 'feedDelete'); /* User Feeds  */
$app->post('/getImages', 'getImages');


$app->run();

/************************* USER LOGIN *************************************/
/* ### User login ### */
function login()
{

    $request = \Slim\Slim::getInstance()->request();
    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Credentials: true ");
    // header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
    // header('Content-Type: application/json');
    $data = json_decode($request->getBody());

    try {

        $db = getDB();
        $userData = '';
        $sql = "SELECT user_id, firstname, internalemailaddress FROM users WHERE  internalemailaddress=:internalemailaddress and new_password=:new_password ";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("internalemailaddress", $data->internalemailaddress, PDO::PARAM_STR);
        $new_password = hash('sha256', $data->new_password);
        $stmt->bindParam("new_password", $new_password, PDO::PARAM_STR);
        $stmt->execute();
        $mainCount = $stmt->rowCount();
        $userData = $stmt->fetch(PDO::FETCH_OBJ);

        if (!empty($userData)) {
            $user_id = $userData->user_id;
            $userData->token = apiToken($user_id);
        }

        $db = null;
        if ($userData) {
            $userData = json_encode($userData);
            echo '{"userData": ' . $userData . '}';
        } else {
            echo '{"error":{"text":"Bad request wrong username and password"}}';
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}


/* ### User registration ### */
function signup()
{
    $request = \Slim\Slim::getInstance()->request();

    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Credentials: true ");
    // header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
    // header('Content-Type: application/json');
    $data = json_decode($request->getBody());
    $internalemailaddress = $data->internalemailaddress;
    $firstname = $data->firstname;
    $lastname = $data->lastname;
    $new_phonenumber = $data->new_phonenumber;
    $new_password = $data->new_password;

    try {

        $internalemailaddress_check = preg_match('~^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$~i', $internalemailaddress);
        $password_check = preg_match('~^[A-Za-z0-9!@#$%^&*()_]{6,20}$~i', $new_password);

        //echo $internalemailaddress_check . '<br/>' . $internalemailaddress;

        if (strlen(trim($new_phonenumber)) > 0 && strlen(trim($new_password)) > 0 && strlen(trim($internalemailaddress)) > 0 && $internalemailaddress_check > 0 && $password_check > 0) {
            //echo 'here';
            $db = getDB();
            $userData = '';
            $sql = "SELECT user_id FROM users WHERE internalemailaddress=:internalemailaddress";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("internalemailaddress", $internalemailaddress, PDO::PARAM_STR);
            $stmt->execute();
            $mainCount = $stmt->rowCount();
            $created = time();
            if ($mainCount == 0) {

                /*Inserting user values*/
                $sql1 = "INSERT INTO users(new_password,internalemailaddress, firstname, lastname, new_phonenumber)VALUES(:new_password,:internalemailaddress, :firstname, :lastname,:new_phonenumber)";
                $stmt1 = $db->prepare($sql1);
                $new_password = hash('sha256', $data->new_password);
                $stmt1->bindParam("new_password", $new_password, PDO::PARAM_STR);
                $stmt1->bindParam("internalemailaddress", $internalemailaddress, PDO::PARAM_STR);
                $stmt1->bindParam("firstname", $firstname, PDO::PARAM_STR);
                $stmt1->bindParam("lastname", $lastname, PDO::PARAM_STR);
                $stmt1->bindParam("new_phonenumber", $new_phonenumber, PDO::PARAM_STR);
                $stmt1->execute();

                $userData = internalUserDetails($internalemailaddress);
            }

            $db = null;


            if ($userData) {
                $userData = json_encode($userData);
                echo '{"userData": ' . $userData . '}';
            } else {
                echo '{"error":{"text":"Enter valid data"}}';
            }
        } else {
            echo '{"error":{"text":"Enter valid data"}}';
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

function internalemailaddress()
{
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $internalemailaddress = $data->internalemailaddress;

    try {

        $internalemailaddress_check = preg_match('~^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$~i', $internalemailaddress);

        if (strlen(trim($internalemailaddress)) > 0 && $internalemailaddress_check > 0) {
            $db = getDB();
            $userData = '';
            $sql = "SELECT user_id FROM emailUsers WHERE internalemailaddress=:internalemailaddress";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("internalemailaddress", $internalemailaddress, PDO::PARAM_STR);
            $stmt->execute();
            $mainCount = $stmt->rowCount();
            $created = time();
            if ($mainCount == 0) {

                /*Inserting user values*/
                $sql1 = "INSERT INTO emailUsers(internalemailaddress)VALUES(:internalemailaddress)";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("internalemailaddress", $internalemailaddress, PDO::PARAM_STR);
                $stmt1->execute();
            }
            $userData = internalEmailDetails($internalemailaddress);
            $db = null;
            if ($userData) {
                $userData = json_encode($userData);
                echo '{"userData": ' . $userData . '}';
            } else {
                echo '{"error":{"text":"Enter valid dataaaa"}}';
            }
        } else {
            echo '{"error":{"text":"Enter valid data"}}';
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}


/* ### internal Username Details ### */
function internalUserDetails($input)
{

    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Credentials: true ");
    // header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
    // header('Content-Type: application/json');
    try {
        $db = getDB();
        $sql = "SELECT user_id, firstname, lastname, internalemailaddress FROM users WHERE internalemailaddress=:input";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("input", $input, PDO::PARAM_STR);
        $stmt->execute();
        $usernameDetails = $stmt->fetch(PDO::FETCH_OBJ);
        $usernameDetails->token = apiToken($usernameDetails->user_id);
        $db = null;
        return $usernameDetails;
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

function getFeed()
{

    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Credentials: true ");
    // header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
    // header('Content-Type: application/json');

    try {

        if (1) {
            $feedData = '';
            $db = getDB();

            $sql = "SELECT * FROM feed  ORDER BY feed_id DESC LIMIT 15";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
            $stmt->bindParam("lastCreated", $lastCreated, PDO::PARAM_STR);

            $stmt->execute();
            $feedData = $stmt->fetchAll(PDO::FETCH_OBJ);

            $db = null;

            if ($feedData)
                echo '{"feedData": ' . json_encode($feedData) . '}';
            else
                echo '{"feedData": ""}';
        } else {
            echo '{"error":{"text":"No access"}}';
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

function feed()
{
    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Credentials: true ");
    // header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
    // header('Content-Type: application/json');
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id = $data->user_id;
    $token = $data->token;
    $lastCreated = $data->lastCreated;
    $systemToken = apiToken($user_id);

    try {

        if ($systemToken == $token) {
            $feedData = '';
            $db = getDB();
            if ($lastCreated) {
                $sql = "SELECT * FROM feed WHERE user_id_fk=:user_id AND created < :lastCreated ORDER BY feed_id DESC LIMIT 5";
                $stmt = $db->prepare($sql);
                $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
                $stmt->bindParam("lastCreated", $lastCreated, PDO::PARAM_STR);
            } else {
                $sql = "SELECT * FROM feed WHERE user_id_fk=:user_id ORDER BY feed_id DESC LIMIT 5";
                $stmt = $db->prepare($sql);
                $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
            }
            $stmt->execute();
            $feedData = $stmt->fetchAll(PDO::FETCH_OBJ);

            $db = null;

            if ($feedData)
                echo '{"feedData": ' . json_encode($feedData) . '}';
            else
                echo '{"feedData": ""}';
        } else {
            echo '{"error":{"text":"No access"}}';
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

function feedUpdate()
{
    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Credentials: true ");
    // header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
    // header('Content-Type: application/json');

    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    //$user_id = $data->user_id;
    $user_id = $_POST['user_id'];
    $token = $_POST['token'];
    $new_name = $_POST['new_name'];

    $systemToken = apiToken($user_id);

    //.........annotation data[start]
    $filename = $_FILES['filename']['name'];
    $notetext = $_POST['notetext'];
    $subject = $_POST['subject'];
    $body = $_POST['body'];
    $objectid = $_POST['objectid'];
    $ownerid = $user_id;
    //$modifiedby = $_POST['modifiedby'];
    $createdby = $user_id;
    $annotationid = $_POST['objectid']; //... may be its the id of main table
    $objectid = $_POST['objectid'];
    //.........annotation data[end]

    try {

        if ($systemToken == $token) {


            $feedData = '';
            $db = getDB();
            $sql = "INSERT INTO feed ( feed, created, user_id_fk) VALUES (:feed,:created,:user_id)";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("feed", $new_name, PDO::PARAM_STR);
            $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
            $created = time();
            $stmt->bindParam("created", $created, PDO::PARAM_INT);
            $stmt->execute();

            //.....insert data to "new_reactappdemo"  table [start]
            //.....insert data to "new_reactappdemo"  table [end]


            var_dump($db->lastInsertId());
            $annotationid = $db->lastInsertId(); // primary key of first table
            //....................annotation insert[start]
            for ($i=0;$i<count($_POST['subject']) ;$i++ )
            {
                $db_annotation = getDB();
                $sql_annotation = "INSERT INTO annotation ( filename, notetext, subject,body,objectid,ownerid,createdby,annotationid) 
                    VALUES (:filename,:notetext,:subject,:body,:objectid,:ownerid,:createdby,:annotationid)";
                $stmt_annotation = $db_annotation->prepare($sql_annotation);
                $stmt_annotation->bindParam("filename", $filename[$i], PDO::PARAM_STR);
                $stmt_annotation->bindParam("notetext", $notetext[$i], PDO::PARAM_STR);
                $stmt_annotation->bindParam("subject", $subject[$i], PDO::PARAM_STR);
                $stmt_annotation->bindParam("body", $body[$i], PDO::PARAM_STR);
                $stmt_annotation->bindParam("objectid", $objectid[$i], PDO::PARAM_STR);
                $stmt_annotation->bindParam("ownerid", $ownerid, PDO::PARAM_INT);
                $stmt_annotation->bindParam("createdby", $createdby, PDO::PARAM_INT);
                $stmt_annotation->bindParam("annotationid", $annotationid , PDO::PARAM_STR);

                $stmt_annotation->execute();
            }
            //....................annotation insert[end]



            $sql1 = "SELECT * FROM feed WHERE user_id_fk=:user_id ORDER BY feed_id DESC LIMIT 1";
            $stmt1 = $db->prepare($sql1);
            $stmt1->bindParam("user_id", $user_id, PDO::PARAM_INT);
            $stmt1->execute();
            $feedData = $stmt1->fetch(PDO::FETCH_OBJ);


            $db = null;
            echo '{"feedData": ' . json_encode($feedData) . '}';
        } else {
            echo '{"error":{"text":"No access"}}';
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}



function feedDelete()
{
    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Credentials: true ");
    // header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
    // header('Content-Type: application/json');
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id = $data->user_id;
    $token = $data->token;
    $feed_id = $data->feed_id;

    $systemToken = apiToken($user_id);

    try {

        if ($systemToken == $token) {
            $feedData = '';
            $db = getDB();
            $sql = "Delete FROM feed WHERE user_id_fk=:user_id AND feed_id=:feed_id";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
            $stmt->bindParam("feed_id", $feed_id, PDO::PARAM_INT);
            $stmt->execute();


            $db = null;
            echo '{"success":{"text":"Feed deleted"}}';
        } else {
            echo '{"error":{"text":"No access"}}';
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}
$app->post('/userImage', 'userImage'); /* User Details */
function userImage()
{
    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Credentials: true ");
    // header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
    // header('Content-Type: application/json');
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id = $data->user_id;
    $token = $data->token;
    $imageB64 = $data->imageB64;
    $systemToken = apiToken($user_id);
    try {
        if (1) {
            $db = getDB();
            $sql = "INSERT INTO imagesData(b64,user_id_fk) VALUES(:b64,:user_id)";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
            $stmt->bindParam("b64", $imageB64, PDO::PARAM_STR);
            $stmt->execute();
            $db = null;
            echo '{"success":{"status":"uploaded"}}';
        } else {
            echo '{"error":{"text":"No access"}}';
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

$app->post('/getImages', 'getImages');
function getImages()
{
    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Credentials: true ");
    // header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
    // header('Content-Type: application/json');
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id = $data->user_id;
    $token = $data->token;

    $systemToken = apiToken($user_id);
    try {
        if (1) {
            $db = getDB();
            $sql = "SELECT b64 FROM imagesData";
            $stmt = $db->prepare($sql);

            $stmt->execute();
            $imageData = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            echo '{"imageData": ' . json_encode($imageData) . '}';
        } else {
            echo '{"error":{"text":"No access"}}';
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}
