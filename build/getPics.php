<?php
header('Content-type:text/html; charset="utf-8"');

/*
API:
	getPics.php

		参数
		cpage : 获取数据的页数
*/
$cpage = isset($_GET['cpage']) ? $_GET['cpage'] : 1;

$url = 'http://www.wookmark.com/api/json/popular?page=' . $cpage;
// $url ='http://photo.weibo.com/welcome/get_hot_pictures?page=1&count=20';
$content = file_get_contents($url);
$content = iconv('gbk', 'utf-8', $content);

echo $content;

?>