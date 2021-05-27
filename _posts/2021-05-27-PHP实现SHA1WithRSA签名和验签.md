layout: post
title: "PHP实现SHA1WithRSA签名和验签"
date: 2021-05-27
description: ""
tag: php
---
### PHP实现SHA1WithRSA签名和验签
>对接第三方服务时一般都会对数据签名和验签，sha1WithRSA是比较常用的一种签名算法,特别是和支付相关的的服务。
 以下是使用 php 实现 SHA1WithRSA 签名和验签的方法:

 ```php
 <?php

 //生成 sha1WithRSA 签名
 function genSign($toSign, $privateKey){
     $privateKey = "-----BEGIN RSA PRIVATE KEY-----\n" .
         wordwrap($privateKey, 64, "\n", true) .
         "\n-----END RSA PRIVATE KEY-----";

     $key = openssl_get_privatekey($privateKey);
     openssl_sign($toSign, $signature, $key);
     openssl_free_key($key);
     $sign = base64_encode($signature);
     return $sign;
 }

 //校验 sha1WithRSA 签名
 function verifySign($data, $sign, $pubKey){
     $sign = base64_decode($sign);

     $pubKey = "-----BEGIN PUBLIC KEY-----\n" .
                 wordwrap($pubKey, 64, "\n", true) .
                 "\n-----END PUBLIC KEY-----";

     $key = openssl_pkey_get_public($pubKey);
     $result = openssl_verify($data, $sign, $key, OPENSSL_ALGO_SHA1) === 1;
     return $result;
 }

 //测试
 $privateKey = "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAILFLdmFwfNHCGk3vpwj/FR9XpE9jjVreLlOaIEkSAOWOfzxCF7pMeSy0UDroRLgfLD4nQbUcK5AT7gg8PEM6H99SEHcpBkTKhfK1iI5iU9sN/WGL2Ft5T/uwo+KD7X3CsqMD0HsMQtv/YHJeAz/SPf5zyD5KttwohXXzO8a3P1pAgMBAAECgYAchxl2f6iNAu0Bzyhk9bDBWcw8kRop6zUd7836hkizh51E4ew6kFLTGnNt3zl3XcO187aF2+htCxiZCY6md3NstJod1zshoXf2slxxPWRUK92sS0XzlVT6ahVTdq2tAS3hOY3ldtnfOXMmMQPNn9OqlALQGOH/hJatBV6ZQxpp0QJBAMGKsxJkg3M6sZEO4zUgWgnGN+uS6nwAWpCfBY7eDvYSN78BxGGLgn+t40c0R8M/n85IM8OUmfHxTGWN3hYyGuUCQQCs+Kg1ypul9XLTWrVApyvZxY4ZxjAWG4yW4xqbUtHWUkGyle7Dy8xiYezl0kWN81lJNTz3qrJ4ZvM825+7tPw1AkBDPNxZV3ITZiCqNHHa0xJ0sthajv/HdJgCBjz4FU09T7buNL705HLByLdc1VzZCBGMqKjTGZ0h4KKZ5V9ydpXBAkABpZx0Zql0uxGM0aBILU9Nk4P22tw6WajNBvyJ3hABamcVvDe5xYb8qNIInifrYhXHjKo38XghjVljivPKZb7BAkAt4pCUYLI7LzLeSh/lnVxA7jOaRI3UsngCXn9VA4f+dkNcKAftRQqe7ytudqG07GKoInnDiyjrYe4kTLym8zoc";
 $pubKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCxS3ZhcHzRwhpN76cI/xUfV6RPY41a3i5TmiBJEgDljn88Qhe6THkstFA66ES4Hyw+J0G1HCuQE+4IPDxDOh/fUhB3KQZEyoXytYiOYlPbDf1hi9hbeU/7sKPig+19wrKjA9B7DELb/2ByXgM/0j3+c8g+SrbcKIV18zvGtz9aQIDAQAB";

 //生成签名
 $sign = genSign("test", $privateKey);
 //校验签名
 $rs = verifySign("test", $sign, $pubKey);
 var_dump($rs);

 ```