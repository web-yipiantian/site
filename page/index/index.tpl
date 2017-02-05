{%extends file='../../layout/base.tpl'%}

{%block name="head_end"%}
	{%require name="static/logic/index/index.scss"%}
{%/block%}

{%block name='body_page_class'%}homepage {%/block%}

{%block name="body_main"%}
    {%widget name="widget/component/header/header.tpl"%}
    {%widget name="widget/component/slider/slider.tpl"%}
    {%widget name="widget/component/feature/feature.tpl"%}
    {%widget name="widget/component/case/case.tpl"%}
    {%widget name="widget/component/team/team.tpl"%}
    {%widget name="widget/component/customer/customer.tpl"%}
    {%widget name="widget/component/footer/footer.tpl"%}
{%/block%}

{%block name="after_body"%}
	{%require name="static/logic/index/index.es"%}
{%/block%}