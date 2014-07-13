---
layout: post
title: PAYPAL 接口编程
description: 上次写 PAYPAL 付款接口时比较匆忙，没有留下多少资料，趁现在网页没设计好，整理了一下相关知识......
category: note
---

PAYPAL为了满足广大开发人员的不同需求，提供了不止一种的接口方案，可谓是各种各样的都有啊。我没有那么多精力去研究它的各个方案的用法，也没那个必要。在这篇文章里，我主要讨论的是它的**Express Checkout**(快速结帐）这种方案，并且只讨论其在 PHP 语言中的实现。如想了解其它更多的信息，可到[PAYPAL 开发者中心][1],那里有会有你想要的信息的。

##	步骤

###	申请 PAYPAL 开发测试帐号

PAYPAL 专门为开发者提供了一个与真实环境完全一样的测试环境，开发者可以在测试环境里完成开发时对产品的各种测试，这就避免了在真实环境下测试产品的诸多麻烦。

测试帐号由一个主帐号和 n 个虚拟帐号组成，但至少需要两个虚拟帐号：一个是商家帐号；另一个是买家帐号。

可以到[这里][1]来申请注册测试帐号。

###	整个付款过程

使用 PAYPAL 的接口完成付款的整个过程只需要三步，即分三次调用其 API ,如下：

*	SetExpressCheckout<br />该方法请求 PayPa 使用“快速支付快速结账”从您的客户处获取付款。
*	GetExpressCheckoutDetails<br />该方法返回客户的信息,包括在 PayPal 上存储的姓名和地址。
*	DoExpressCheckoutDetails<br />该方法请求获取付款。

至于其它更详细的知识，在这就不罗嗦了，恐怕我也讲不清出，还是看文档吧。我是参考[这个][2]文档的。

##	所需信息

这需要从收款帐号中获取一下信息：

*	PayPal API 用户名
*	PayPal API 密码
*	PayPal API 签名字符串

##	注意事项

*	NVP 字符串中每个字段的值已经过 URL 编码


[1]:	https://developer.paypal.com/		"PAYPAL 开发者中心"
[2]:	http://wenku.baidu.com/view/519e7c36b90d6c85ec3ac692.html		"PayPal 快速结账 NVP API 开发指南"

##	附：参考代码

####	首页 index.html

	<html>
		<head>
			<title>PayPal NVP SDK - ExpressCheckout</title>
			<meta content="text/html;charset=utf-8" http-equiv="content-type"/>
		</head>
		<body>
			<center>
				<form action="expressCheckout.php" method="POST">
					<input type=hidden name=paymentType value='Sale' />
					<table class="api">
						<tr>
							<td colspan="2" class="header">
								一个简单的栗子
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<center>
									</br>
									你可以到 <a href="https://developer.paypal.com" id="PayPalDeveloperCentralLink"  target="_blank">开发者中心</a>了解更多信息 </br>
								</center>
							</td>
						</tr>
					</table>
					<table>
						<th>商品信息:</th>
						<tr>
							<td class="field">
								名称:
							</td>
							<td>
								<input type="text" size="30" maxlength="32" name="L_NAME0" value="Know Thyself" /> 
							</td>


							<td class="field">
								价格:<br /> 
							</td>
							<td>
								<input type="text" name="L_AMT0" size="5" maxlength="32" value="9.00"  /> 
							</td>

							<td class="field">
								数量:
							</td>
							<td>  
								<input type="text" size="3" maxlength="32" name="L_QTY0" value="2"  /> 
							</td>

						</tr>
						<tr>
							<td class="field">
								货币: <br /> 
							</td>
							<td>
								<select name="currencyCodeType">
									<option value="USD">USD</option>
									<option value="GBP">GBP</option>
									<option value="EUR">EUR</option>
									<option value="JPY">JPY</option>
									<option value="CAD">CAD</option>
									<option value="AUD">AUD</option>
									<option value="THB">THB</option>
								</select>     
							</td>
						</tr>

						<tr>
							<td>
								<input type="image" name="submit" src="https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif" />
							</td>
							<td colspan=6>
								<br />
								<br />
								用PAYPAL、节省时间、安全
							</td>

						</tr>
					</table>
					<br />
					<br />
					<br />
					<a class="home" id="CallsLink" href="index.html">首页</a>
				</form>
			</center>
		</body>
	</html>

####	参数配置	paypal.conf.php

	<?php
	/*
	 * PAYPAL的一些必要的请求参数配置
	 * 如下：
	 */

	/*
	 * 收款帐号信息：
	 * API 用户名
	 * API 密码
	 * API 签名
	 */
	define('API_USERNAME','worgold_me_api1.yy.com');
	define('API_PASSWORD','1392353846');
	define('API_SIGNATURE','AFcWxV21C7fd0v3bYYYRCpSSRl31AMXKLqLG.8zCTE5Mddda0eN2iasJ');

	/*
	 * API终端
	 * 真实环境与测试环境不同，注意切换
	 * 真实环境使用：
	 * 测试环境使用：https://api-3t.sanbox.paypal.com/nvp
	 */
	define('API_ENDPOINT','https://api-3t.sandbox.paypal.com/nvp');

	/*
	 * PAYPAL 请求URL
	 * 真实环境使用：https://www.paypal.com/webscr&cmd=_express-checkout&token=
	 * 测试环境使用：https://www.sandbox.paypal.com/webscr&cmd=_express-checkout&token=
	 */
	define('PAYPAL_URL','https://www.sandbox.paypal.com/webscr&cmd=_express-checkout&token=');

	/*
	 * API 版本号
	 */
	define('VERSION', '65.1');

	/*
	 * 返回参数值
	 */
	define('ACK_SUCCESS', 'SUCCESS');
	define('ACK_SUCCESS_WITH_WARNING', 'SUCCESSWITHWARNING');

####	系统调用	paypal.call.php

	<?php
	/*
	 * paypal.call.php
	 *
	 * 封装与PAYPAL服务器通信的函数
	 */
	require_once 'paypal.conf.php';

	function nvpHeader(){
		if(defined('API_USERNAME'))
			$API_UserName	= API_USERNAME;

		if(defined('API_PASSWORD'))
			$API_Password	= API_PASSWORD;

		if(defined('API_SIGNATURE'))
			$API_Signature	= API_SIGNATURE;

		return $nvpHeaderStr = "&PWD=".urlencode($API_Password)."&USER=".urlencode($API_UserName)."&SIGNATURE=".urlencode($API_Signature);
	}

	function hash_call($methodName,$nvpStr){

		if(defined('API_ENDPOINT'))
			$API_Endpoint =API_ENDPOINT;
		
		$version	= VERSION;



		$nvpheader=nvpHeader();
		//setting the curl parameters.
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$API_Endpoint);
		curl_setopt($ch, CURLOPT_VERBOSE, 1);

		//turning off the server and peer verification(TrustManager Concept).
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_POST, 1);


		$nvpStr=$nvpheader.$nvpStr;
	 

		//check if version is included in $nvpStr else include the version.
		if(strlen(str_replace('VERSION=', '', strtoupper($nvpStr))) == strlen($nvpStr)) {
			$nvpStr = "&VERSION=" . urlencode($version) . $nvpStr;	
		}

		$nvpreq="METHOD=".urlencode($methodName).$nvpStr;

		//setting the nvpreq as POST FIELD to curl
		curl_setopt($ch,CURLOPT_POSTFIELDS,$nvpreq);

		//getting response from server
		$response = curl_exec($ch);

		//convrting NVPResponse to an Associative Array
		$nvpResArray=deformatNVP($response);
		$nvpReqArray=deformatNVP($nvpreq);
		$_SESSION['nvpReqArray']=$nvpReqArray;

		if (curl_errno($ch)) {
			// moving to display page to display curl errors
			$_SESSION['curl_error_no']=curl_errno($ch) ;
			$_SESSION['curl_error_msg']=curl_error($ch);
			$location = "APIError.php";
			header("Location: $location");
		} else {
			//closing the curl
			curl_close($ch);
		}

		return $nvpResArray;

	}


	function deformatNVP($nvpstr)
	{

		$intial=0;
		$nvpArray = array();


		while(strlen($nvpstr)){
			//postion of Key
			$keypos= strpos($nvpstr,'=');
			//position of value
			$valuepos = strpos($nvpstr,'&') ? strpos($nvpstr,'&'): strlen($nvpstr);

			/*getting the Key and Value values and storing in a Associative Array*/
			$keyval=substr($nvpstr,$intial,$keypos);
			$valval=substr($nvpstr,$keypos+1,$valuepos-$keypos-1);
			//decoding the respose
			$nvpArray[urldecode($keyval)] =urldecode( $valval);
			$nvpstr=substr($nvpstr,$valuepos+1,strlen($nvpstr));
		 }
		return $nvpArray;
	}

####	主要逻辑	expressCheckout.php

	<?php
	/*
	 * 本页代码将会被执行两次
	 * 第一次是执行 if 里面的代码
	 * 第二次是执行 else 里面的代码
	 */
	require_once 'paypal.call.php';

	session_start();

	$token = $_REQUEST['token'];

	if(! isset($token)){

		/*
		 * 准备本页面的 URL 地址
		 */
		$serverName = $_SERVER['SERVER_NAME'];
		$serverPort = $_SERVER['SERVER_PORT'];
		$url=dirname('http://'.$serverName.':'.$serverPort.$_SERVER['REQUEST_URI']);

		/*
		 * 准备 NVP 的值，需进行 URL 编码
		 */
		$currencyCodeType	= $_REQUEST['currencyCodeType'];
		$paymentType		= $_REQUEST['paymentType'];

		$L_NAME0           	= $_REQUEST['L_NAME0'];
		$L_AMT0            	= $_REQUEST['L_AMT0'];
		$L_QTY0            	= $_REQUEST['L_QTY0'];

		$returnURL =$url.'/expressCheckout.php?currencyCodeType='.$currencyCodeType.'&paymentType='.$paymentType;
		$cancelURL =$url."/index.html";

		/*
		 * 物品价格计算
		 */
		$itemamt = 0.00;
		$itemamt = $L_QTY0*$L_AMT0;
		$amt = $itemamt;
		$maxamt= $amt+25.00;
		$nvpstr="";

		/*
		 * 准备NVP请求参数
		 */
		$nvpstr=""
			."&L_NAME0=".urlencode($L_NAME0)
			."&L_AMT0=".urlencode($L_AMT0)
			."&L_QTY0=".urlencode($L_QTY0)
			."&MAXAMT=".urlencode((string)$maxamt)
			."&AMT=".urlencode((string)$amt)
			."&ITEMAMT=".urlencode((string)$itemamt)
			."&CALLBACKTIMEOUT=4"
			."&ReturnUrl=".urlencode($returnURL)
			."&CANCELURL=".urlencode($cancelURL )
			."&CURRENCYCODE=".urlencode($currencyCodeType)
			."&PAYMENTACTION=".urlencode($paymentType);

		$nvpstr = $nvpHeader.$nvpstr;

		/*
		 * 请求获取PAYPAL服务
		 */
		$resArray=hash_call("SetExpressCheckout",$nvpstr);

		$ack = strtoupper($resArray["ACK"]);

		if($ack=="SUCCESS"){
			/*
			 * 重定向到PAYPAL，获取信息
			 */
			$token = urldecode($resArray["TOKEN"]);
			$payPalURL = PAYPAL_URL.$token;
			header("Location: ".$payPalURL);
		}else{
			//显示返回信息
			var_dump($resArray);
		}
	}else{
		$token =urlencode( $_REQUEST['token']);

		$nvpstr="&TOKEN=".$token;

		$nvpstr = $nvpHeader.$nvpstr;

		$resArray=hash_call("GetExpressCheckoutDetails",$nvpstr);
		$ack = strtoupper($resArray["ACK"]);

		if($ack == 'SUCCESS' || $ack == 'SUCCESSWITHWARNING'){

			ini_set('session.bug_compat_42',0);
			ini_set('session.bug_compat_warn',0);

			/*
			 * 注意：需要进行 URL 编码
			 */
			$token 			= urlencode( $resArray['TOKEN']);
			$paymentAmount 	= urlencode($resArray['AMT']);
			$paymentType 	= urlencode("Sale");
			$currCodeType 	= urlencode($resArray['CURRENCYCODE']);
			$payerID 		= urlencode($resArray['PAYERID']);
			$serverName 	= urlencode($_SERVER['SERVER_NAME']);

			$nvpstr='&TOKEN='.$token.'&PAYERID='.$payerID.'&PAYMENTACTION='.$paymentType.'&AMT='.$paymentAmount.'&CURRENCYCODE='.$currCodeType.'&IPADDRESS='.$serverName ;

			$resArray=hash_call("DoExpressCheckoutPayment",$nvpstr);

			$ack = strtoupper($resArray["ACK"]);

			if($ack != 'SUCCESS' && $ack != 'SUCCESSWITHWARNING'){
				echo "<pre>";
				var_dump($resArray);
				echo "</pre>";
			}else{
				echo "<pre>";
				echo "Complate<br />";
				var_dump($resArray);
				echo "</pre>";
			}
		}else{
			var_dump($resArray);
		}
	}
