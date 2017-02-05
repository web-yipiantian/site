{%extends file='../../layout/base.tpl'%}

{%block name="head_end"%}
	{%require name="static/logic/case/case.scss"%}
{%/block%}

{%block name='body_page_class'%}homepage {%/block%}

{%block name="body_main"%}
    {%widget name="widget/component/header/header.tpl"%}

    {%widget name="widget/component/contact/contact.tpl"%}
    
    {%widget name="widget/component/footer/footer.tpl"%}
{%/block%}

{%block name="after_body"%}
	{%require name="static/logic/case/case.es"%}
{%/block%}