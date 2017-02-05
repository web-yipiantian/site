<!DOCTYPE html>
<!--STATUS OK-->

<!--
 * Copyright (c) 2016 Tencent, All rights reseved.
 * @fileoverview ACE后台页面模板主框架
 * @author erikqin | erikqin@qq.com
 * @version 1.0 | 2016-07-07 | erikqin    // Initial version. 
 *
 * @description 
 *   1) 此文件定义ACE 后台页面模板的主框架，所有后台业务模块的所有页面模板，最终都应继承于此模板。
 *   2) 此框架内禁止(MUST NOT)包含任何业务模块独立相关的业务逻辑。
 *   3) "head_end" block 位于 <head> 标签尾部，用于自行添加 CSS 资源引用等。
 *      此 block 输出的内容将位于 FIS 向 <head> 自动输出的内容(CSS等资源引用)之前；
 *      如需确保插入的内容位于 FIS 输出内容之后，且位于 body 之前，则可考虑使用 "after_head" block.
 -->

<!--
 * framework: 基于 CMMONJS规范的模块化框架.
 * sampleRate: FIS自动打包参数，统计采样率，取值 [0,1]，建议覆盖50~100万 PV；此处取 PV 100W 计算。
 -->
{%html framework="static/loader/mod.js" fid="common" sampleRate="0.6"%}
  {%head%}
    <meta charset="{%block name='head_charset'%}UTF-8{%/block%}">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="keywords" content="{%block name='head_keyword'%}{%$result.page.keywords%}{%/block%}">
    <meta name="description" content="{%block name='head_desc'%}{%$result.page.description%}{%/block%}">
    <title>{%block name="head_title"%}{%$result.page.title%}{%/block%}</title>
    
    <!-- <head> 标签开始位置，title 之后，所有 CSS/JavaScript 引用之前 -->
    {%block name="head_start"%}
      {%require name="static/base/base.scss"%}
      {%require name="static/lib/context.js"%}
    {%/block%}
    <!-- 基础样式 -->

    <!-- 为 IE8 及更低版本 IE 浏览器添加 HTML5 新增元素支持 -->
    <link rel="import" href="/static/html/html5-hack.html?__inline">
    <!-- <head> 标签结束位置(FIS自动整合进头部的资源之前) -->
    {%block name="head_end"%}{%/block%}
  {%/head%}

  <!-- <head> 标签之后 -->
  {%block name="after_head"%}{%/block%}
  
  <!-- block "body_page_class" 用于向 <body> 标签中添加样式名 -->
  {%body class="{%block name='body_page_class'%}{%/block%}"%}
    <!-- <body> 标签开始位置，页面主体内容前 -->
    {%block name="body_start"%}{%/block%}

    <!-- 页面主体内容 -->
    {%block name="body"%}{%/block%}

    <!-- <body> 标签结束位置，页面主体内容后 -->
    {%block name="body_end"%}{%/block%}
  {%/body%}
  
  {%script%}
  {%/script%}

  <!-- <body> 标签之后，FIS 自动管理的静态资源之后 -->
  {%block name="after_body"%}{%/block%}
{%/html%}