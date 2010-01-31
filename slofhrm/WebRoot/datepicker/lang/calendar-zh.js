// ** I18N

// Calendar zh-utf8 language
// Author: Gary Fu, <gary@garyfu.idv.tw>
// Encoding: utf8
// Distributed under the same terms as the calendar itself.

// For translators: please use UTF-8 if possible.  We strongly believe that
// Unicode is the answer to a real internationalized world.  Also please
// include your contact information in the header, as can be seen above.
	
// full day names
Zapatec.Calendar._DN = new Array
("星期日",
 "星期一",
 "星期二",
 "星期三",
 "星期四",
 "星期五",
 "星期六",
 "星期日");

// Please note that the following array of short day names (and the same goes
// for short month names, _SMN) isn't absolutely necessary.  We give it here
// for exemplification on how one can customize the short day names, but if
// they are simply the first N letters of the full name you can simply say:
//
//   Zapatec.Calendar._SDN_len = N; // short day name length
//   Zapatec.Calendar._SMN_len = N; // short month name length
//
// If N = 3 then this is not needed either since we assume a value of 3 if not
// present, to be compatible with translation files that were written before
// this feature.

// short day names
Zapatec.Calendar._SDN = new Array
("星期日",
 "星期一",
 "星期二",
 "星期三",
 "星期四",
 "星期五",
 "星期六",
 "星期日");

// full month names
Zapatec.Calendar._MN = new Array
("一月",
 "二月",
 "三月",
 "四月",
 "五月",
 "六月",
 "七月",
 "八月",
 "九月",
 "十月",
 "十一月",
 "十二月");

// short month names
Zapatec.Calendar._SMN = new Array
("1月",
 "2月",
 "3月",
 "4月",
 "5月",
 "6月",
 "7月",
 "8月",
 "9月",
 "10月",
 "11月",
 "12月");

// tooltips
Zapatec.Calendar._TT_zh = Zapatec.Calendar._TT = {};
Zapatec.Calendar._TT["INFO"] = "关于";

Zapatec.Calendar._TT["ABOUT"] =
"日历选择工具\n" +
"(c) zapatec.com 2002-2004\n" + // don't translate this this ;-)
"For latest version visit: http://www.zapatec.com/\n" +
"\n\n" +
"日期选择方法:\n" +
"- 使用 \xab, \xbb 按钮可选择年份\n" +
"- 使用 " + String.fromCharCode(0x2039) + ", " + String.fromCharCode(0x203a) + " 按钮可选择月份\n" +
"- 按住上面的按钮可以加快选取";
Zapatec.Calendar._TT["ABOUT_TIME"] = "\n\n" +
"时间选择方法:\n" +
"- 点击任何时间部份可增加其值\n" +
"- 同时按Shift键再点击可减少其值\n" +
"- 点击并拖动可加快值的改变";

Zapatec.Calendar._TT["PREV_YEAR"] = "上一年 (按住选单)";
Zapatec.Calendar._TT["PREV_MONTH"] = "上个月 (按住选单)";
Zapatec.Calendar._TT["GO_TODAY"] = "获得当前日期";
Zapatec.Calendar._TT["NEXT_MONTH"] = "下个月 (按住选单)";
Zapatec.Calendar._TT["NEXT_YEAR"] = "下一年 (按住选单)";
Zapatec.Calendar._TT["SEL_DATE"] = "选择日期";
Zapatec.Calendar._TT["DRAG_TO_MOVE"] = "拖动";
Zapatec.Calendar._TT["PART_TODAY"] = "(今日)";

// the following is to inform that "%s" is to be the first day of week
// %s will be replaced with the day name.
Zapatec.Calendar._TT["DAY_FIRST"] = "将 %s 显示在前";

// This may be locale-dependent.  It specifies the week-end days, as an array
// of comma-separated numbers.  The numbers are from 0 to 6: 0 means Sunday, 1
// means Monday, etc.
Zapatec.Calendar._TT["WEEKEND"] = "0,6";

Zapatec.Calendar._TT["CLOSE"] = "关闭";
Zapatec.Calendar._TT["TODAY"] = "今天";
Zapatec.Calendar._TT["TIME_PART"] = "点击或左右拖动可增减时间,<br>按Shift为减";

// date formats
Zapatec.Calendar._TT["DEF_DATE_FORMAT"] = "%Y-%m-%d";
Zapatec.Calendar._TT["TT_DATE_FORMAT"] = "%a, %b %e";

Zapatec.Calendar._TT["WK"] = "周";
Zapatec.Calendar._TT["TIME"] = "时间:";

/* Preserve data */
	if(Zapatec.Calendar._DN) Zapatec.Calendar._TT._DN = Zapatec.Calendar._DN;
	if(Zapatec.Calendar._SDN) Zapatec.Calendar._TT._SDN = Zapatec.Calendar._SDN;
	if(Zapatec.Calendar._SDN_len) Zapatec.Calendar._TT._SDN_len = Zapatec.Calendar._SDN_len;
	if(Zapatec.Calendar._MN) Zapatec.Calendar._TT._MN = Zapatec.Calendar._MN;
	if(Zapatec.Calendar._SMN) Zapatec.Calendar._TT._SMN = Zapatec.Calendar._SMN;
	if(Zapatec.Calendar._SMN_len) Zapatec.Calendar._TT._SMN_len = Zapatec.Calendar._SMN_len;
	Zapatec.Calendar._DN = Zapatec.Calendar._SDN = Zapatec.Calendar._SDN_len = Zapatec.Calendar._MN = Zapatec.Calendar._SMN = Zapatec.Calendar._SMN_len = null

