<?php

class Router{

	private $host = 'http://beta.api.wii.qq.com';
	private $path;
	private $cookie;
	private $context;
	private $referer;

	public function __construct(){
		$this->path = $_SERVER['REQUEST_URI'];
		$this->referer = $_SERVER['HTTP_REFERER'];

		foreach ($_COOKIE as $key => $value) {
		    $this->cookie.=$key.'='.$value.'; ';
		}
	}

	public function fetchData(){

		$this->context = array(
		    'http' => array(
		        'method' => 'GET',
		        'header' => "User-Agent:".$_SERVER['HTTP_USER_AGENT']."\r\nAccept:*/*\r\nReferer:".$referer."\r\nCookie:".$this->cookie
		    ),
		);

		return file_get_contents($this->host.$this->path,false,stream_context_create($this->context));
	}

	public function syncData($url){
		
		$this->context = array(
		    'http' => array(
		        'method' => 'GET',
		        'header' => "User-Agent:".$_SERVER['HTTP_USER_AGENT']."\r\nAccept:*/*\r\nReferer:".$referer."\r\nCookie:".$this->cookie.'FIS_DEBUG_LOCAL=1'
		    ),
		);

		return file_get_contents($this->host.$url,false,stream_context_create($this->context));
	}

	public function getToken(){
		$url = '/app/access_token?app_id=10000002&rand=1428461776&signature=fe4f63259dc73cc34b9028b599b7f3e6ae74decb';
		$this->context = array(
		    'http' => array(
		        'method' => 'GET',
		        'header' => "User-Agent:".$_SERVER['HTTP_USER_AGENT']."\r\nAccept:*/*\r\nReferer:".$referer."\r\nCookie:".$this->cookie
		    ),
		);

		return file_get_contents($this->host.$url,false,stream_context_create($this->context));
	}
}