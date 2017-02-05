<!--
 * Copyright (c) 2016 Tencent, All rights reseved.
 * @fileoverview PC 端页面基模板
 * @author erikqin | erikqin@qq.com
 * @version 1.0 | 2016-06-01 | erikqin    // Initial version.
 *
 * @description
 *  1) 此文件定义适用于 PC 端大多数定宽页面的基础通用模板；Mobile 端定宽页面请使用 m-base.tpl.
 -->

{%extends file='./framework.tpl'%}

<!-- 指定页面默认宽度样式 -->
{%block name='body_page_class'%}auto-width {%/block%}

{%block name="body"%}
	<!-- 页面内容的 header 区域 -->
	{%block name="body_header"%}{%/block%}

	<!-- 页面内容主体 -->
	{%block name="body_main"%}{%/block%}

	<!-- 页面内容的 footer 区域 -->
	{%block name="body_footer"%}{%/block%}

{%/block%}