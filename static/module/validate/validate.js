var $ = require('jquery');

$.validator = function(options, form) {
    this.settings = $.extend(true, {}, $.validator.defaults, options);
    this.currentForm = form;
    this.init();
};

function identityCodeValid(code) {
    if (code.indexOf('*') > -1) {
        return true;
    }
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var tip = "";
    var pass = true;

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
    } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
    } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                tip = "校验位错误";
                pass = false;
            }
        }
    }
    return pass;
}

$.extend($.validator, {
    defaults: {
        messages: {},
        groups: {},
        rules: {},
        errorClass: "error",
        validClass: "valid",
        errorElement: "label",
        focusCleanup: false,
        focusInvalid: true,
        errorContainer: $([]),
        errorLabelContainer: $([]),
        onsubmit: true,
        ignore: ":hidden",
        ignoreTitle: false
    },
    prototype: {
        init: function() {
            
        },
        checked: function(ele){
            var that = this;

            //针对select判断
            if (ele.type.indexOf('select') != -1) {
                $(ele).parent().find(".help-block").remove();
                var selectCount = 0,
                    selectLen = $(ele).parents(".form-group").find('select').length;
                $.each($(ele).parents(".form-group").find('select'), function(index, ele) {
                    $(ele).parent().find(".help-block").remove();
                    if($(ele).val() != '' && $(ele).val() != null){
                        selectCount ++;
                    }else{
                        if($(ele).attr('required')!='required'){
                            selectCount ++;
                        }else{
                            $(ele).parent().append('<div class="help-block">' + ($(ele).data("placeholder")) + '</div>');
                        }
                    }
                });
                if(selectCount == selectLen){
                    $(ele).parents(".form-group").removeClass('has-error');
                }
            } else {
                $(ele).parents(".form-group").find(".help-block").remove();
                $(ele).parents(".form-group").removeClass('has-error');
            }
            
            //针对其他判断
            if (that.getElementVal(ele) != '' && that.getElementVal(ele) != null) {
                if (that.checkRules(ele)) {
                } else {
                    $(ele).parents(".form-group").addClass('has-error');
                }
            } else {
                $(ele).parents(".form-group").addClass('has-error');
                if (ele.type.indexOf('select') != -1) {
                   
                } else if (ele.type === "radio" || ele.type === "checkbox") {
                    if (!$(ele).parents(".form-group").find(".help-block").attr("class")) {
                        $(ele).parent().parent().parent().after('<div class="help-block">' + ("请选择" + $(ele).parents(".form-group").find(".label-name").html()) + '</div>');
                    }
                } else {
                    if(ele.type != "file"){
                        $(ele).parent().after('<div class="help-block">' + ($(ele).attr("placeholder")) + '</div>');
                    }else{
                        $(ele).parents(".form-group").removeClass('has-error');
                    }
                }
            }
        },
        submit: function() {
            $('.has-error').removeClass('has-error');
            $(".help-block").remove();
            var that = this,
                len = $(this.currentForm).find('[required="required"]').length + $(this.currentForm).find('[validated="validated"]').length,
                validateCount = 0;
            $.each($(this.currentForm).find('[required="required"]'), function(index, ele) {
                // console.log($(ele).parents('.form-group').attr('class').indexOf('hide'))
                if($(ele).parents('.form-group').attr('class').indexOf('hide')==-1){
                    if (that.getElementVal(ele) != '' && that.getElementVal(ele) != null) {
                        if (that.checkRules(ele)) {
                            validateCount++;
                        } else {
                            $(ele).parents(".form-group").addClass('has-error');
                        }
                    } else {
                        $(ele).parents(".form-group").addClass('has-error');
                        if (ele.type.indexOf('select') != -1) {
                            $(ele).parent().append('<div class="help-block">' + ($(ele).data("placeholder")) + '</div>');
                        } else if (ele.type === "radio" || ele.type === "checkbox") {
                            if (!$(ele).parents(".form-group").find(".help-block").attr("class")) {
                                $(ele).parent().parent().parent().after('<div class="help-block">' + ("请选择" + $(ele).parents(".form-group").find(".label-name").html()) + '</div>');
                            }
                        } else {
                            $(ele).parent().after('<div class="help-block">' + ($(ele).attr("placeholder")) + '</div>');
                        }
                    }
                }else{
                    validateCount++;
                }
            });

            $.each($(this.currentForm).find('[validated="validated"]'), function(index, ele) {
                if($(ele).parents('.form-group').attr('class').indexOf('hide')==-1){
                    if (that.getElementVal(ele) != '' && that.getElementVal(ele) != null) {
                        if (that.checkRules(ele)) {
                            validateCount++;
                        } else {
                            $(ele).parents(".form-group").addClass('has-error');
                        }
                    } else {
                        validateCount++;
                    }
                }else{
                    validateCount++;
                }
            });
            return validateCount == len ? true : false;
        },
        getElementVal: function(element) {
            var val,
                $element = $(element),
                type = element.type;

            if (type === "radio" || type === "checkbox") {
                try {
                    if(element.name.indexOf('entry') == -1){
                        return $('[name="' + element.name + '"]:checked').val();
                    }else{
                        return true;
                    }
                    
                } catch (ex) {
                    //console.log(ex);
                }
            } else if (type.indexOf('select') != -1) {
                try {
                    return $element.val().length != 0;
                } catch (ex) {
                    //console.log(ex);
                }
            } else if (type === "number" && typeof element.validity !== "undefined") {
                return element.validity.badInput ? false : $element.val();
            } else if(type =="file"){
                return $element.parent().next().find("li").length;
            }

            val = $.trim($element.val());
            if (typeof val === "string") {
                return val.replace(/\r/g, "");
            }
            return val;
        },
        checkRules: function(element) {
            var checkVal = true;
            if($(element).attr('validate')){
                // console.log($(element).attr('validate'))
                var validateArr = $(element).attr('validate').split(',');
                // console.log(validateArr)
                for(var i = 0 ; i < validateArr.length; i++){
                    if (validateArr[i] == 'mobile') {
                        checkVal = /^(1[3-9])+\d{9}$/.test($(element).val());
                    } else if (validateArr[i] == 'telphone') {
                        checkVal = /^((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5}))$/.test($(element).val());
                    } else if (validateArr[i] == 'QQ') {
                        checkVal = /^\d{5,10}$/.test($(element).val());
                    } else if (validateArr[i] == 'url') {
                        checkVal = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test($(element).val());
                    } else if (validateArr[i] == 'idCard') {
                        checkVal = identityCodeValid($(element).val());
                    } else if (validateArr[i] == 'minlength') {
                        checkVal = $.trim($(element).val()).length >= $(element).attr('minlength');
                    } else if (validateArr[i] == 'maxlength') {
                        checkVal = $.trim($(element).val()).length <= $(element).attr('maxlength');
                    } else if (validateArr[i] == 'number') {
                        checkVal = !isNaN($(element).val());
                    } else if (validateArr[i] == 'regex') {
                        if ($(element).attr('validRegex')) {
                            checkVal = eval($(element).attr('validRegex')).test($(element).val());
                        } else {
                            console.log($(element).attr("name") + "未定义正则表达式");
                        }
                    }

                    if(!checkVal){
                        break;
                    }
                }
            }
            
            if (!checkVal && $(element).attr('validError')) {
                $(element).parent().after('<div class="help-block">' + ($(element).attr("validError")) + '</div>');
            }
            return checkVal;
        }
    }
});

module.exports = {
    init: function(options, form) {
        return new $.validator(options, form);
    }
}