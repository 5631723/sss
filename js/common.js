function formatMoney(s) {
	if (/[^0-9\.]/.test(s))
		return "0";
	if (s == null || s == "")
		return "0";
	s = s.toString().replace(/^(\d*)$/, "$1.");
	s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
	s = s.replace(".", ",");
	var re = /(\d)(\d{3},)/;
	while (re.test(s))
		s = s.replace(re, "$1,$2");
	s = s.replace(/,(\d\d)$/, ".$1");
	return s;
}
function formatdata(data, fmt) {
	var o = {
		"M+": data.getMonth() + 1, //月份         
		"d+": data.getDate(), //日         
		"h+": data.getHours() % 12 == 0 ? 12 : data.getHours() % 12, //小时         
		"H+": data.getHours(), //小时         
		"m+": data.getMinutes(), //分         
		"s+": data.getSeconds(), //秒         
		"q+": Math.floor((data.getMonth() + 3) / 3), //季度         
		"S": data.getMilliseconds() //毫秒         
	};
	var week = {
		"0": "/u65e5",
		"1": "/u4e00",
		"2": "/u4e8c",
		"3": "/u4e09",
		"4": "/u56db",
		"5": "/u4e94",
		"6": "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[data.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}
function showLoading(msg, delay) {
	/// <param name="msg" type="String">待显示的文本,非必填</param>
	/// <param name="delay" type="Int">延时显示的毫秒数，默认100毫秒显示,非必填</param>
	if (!delay)
		delay = 100;
	var loading = $('<div class="ajax-loading" style="display:none"><table height="100%" width="100%"><tr><td align="center"><p>' + (msg ? msg : '') + '</p></td></tr></table></div>');
	loading.appendTo('body');
	var s = setTimeout(function () {
		if ($(".ajax-loading").length > 0) {
			loading.show();
			$('.container,.login-box').addClass('blur');
		}
	}, delay);
	return {
		close: function () {
			clearTimeout(s);
			loading.remove();
			$('.container,.login-box').removeClass('blur');
		}
	}

}
function QueryString(name) {
	/// 获取QueryString
	if (name == null || name == "" || name == undefined) {
		var AllVars = window.location.search.substring(1);
		return AllVars.split("&");
	}
	else {
		var AllVars = window.location.search.substring(1);
		var Vars = AllVars.split("&");
		for (i = 0; i < Vars.length; i++) {
			var Var = Vars[i].split("=");
			if (Var[0].toLowerCase() == name.toLowerCase()) return Var[1];
		}
		return "";
	}
};