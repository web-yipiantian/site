<?php

require realpath(dirname(__FILE__).'/../../../router').DIRECTORY_SEPARATOR.'router.php';

$router = new Router();

echo $router->getToken();