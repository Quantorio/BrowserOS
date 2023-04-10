<?php
$directory="filesystem";
function dirToArray($dir) {
  
   $result = array();

   $cdir = scandir($dir);
   foreach ($cdir as $key => $value)
   {
      if (!in_array($value,array(".","..")))
      {
         if (is_dir($dir . DIRECTORY_SEPARATOR . $value))
         {
            $result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value);
         }
         else
         {
            $result[$value] = null;
         }
      }
   }
  
   return $result;
}

$a=dirToArray($directory);
$b=Array();
header('Content-Type: application/json'); 
//$a=array_fill_keys($a,null);
echo json_encode($a);

?>