package com.tic.hjsb;

import java.util.List;

public class JsonStrUtil {

	public static String getJsonYearsByList(List<Integer> list_year) {
		String rtn_value = "{years:[{id:0,queryyear:'全部'}";
		if (list_year != null) {
			for (Integer int_year : list_year) {
				rtn_value = rtn_value + ",{id:" + int_year + ",queryyear:'" + int_year + "'}";
			}
		}
		rtn_value = rtn_value + "]}";
		return rtn_value;
	}
	
	public static String getJsonYears(List<Integer> list_year) {
		String rtn_value = "{years:[";
		if (list_year != null) {
			for (Integer int_year : list_year) {
				rtn_value = rtn_value + "{id:" + int_year + ",queryyear:'" + int_year + "'},";
			}
		}
		rtn_value=rtn_value.substring(0, rtn_value.length()-1);
		rtn_value = rtn_value + "]}";
		return rtn_value;
	}
	public static String getListStr(List<String> listvalue) {
		String rtnstr = "(";
		for (String string : listvalue) {
			rtnstr = rtnstr + "'" + string + "',";
		}
		rtnstr = rtnstr.substring(0, rtnstr.length() - 1);
		rtnstr = rtnstr + ")";
		return rtnstr;
	}
}