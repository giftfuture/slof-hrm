package com.tic.hjsb;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.processors.DefaultValueProcessor;
import net.sf.json.util.JSONUtils;

public class JsonDoubleValueProcessor implements DefaultValueProcessor {

	public Object getDefaultValue(Class type) {
		if (JSONUtils.isArray(type)) {
			return new JSONArray();
		} else if (JSONUtils.isNumber(type)) {
			if (JSONUtils.isDouble(type)) {
				//return new Double(0);
				return "";
			} else {
				//return new Integer(0);
				return "";
			}
		} else if (JSONUtils.isBoolean(type)) {
			return Boolean.FALSE;
		} else if (JSONUtils.isString(type)) {
			return "";
		}
		return JSONNull.getInstance();
	}

}
