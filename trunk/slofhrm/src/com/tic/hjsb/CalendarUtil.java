package com.tic.hjsb;

import java.util.Calendar;
import java.util.Date;

public class CalendarUtil {

	public static void main(String[] args) {
		Date xcrq = java.sql.Date.valueOf("2009-12-04");
//		DengJi dengji = getDengJi(xcrq);
//		if(dengji==DengJi.ChaoQi) {
//			
//			
//		}
//		switch (dengji) {
//		case ChaoQi:
//			System.out.println("超期");
//			break;
//		case DaoQi:
//			System.out.println("还有1个月期到期");
//			break;
//		case JinQi:
//			System.out.println("还有3个月期到期");
//			break;
//		default:
//			
//		}
		
		Calendar calendar = Calendar.getInstance();
		calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH), 0, 0, 0);
		
		Calendar calendar_xcrq = Calendar.getInstance();
		calendar_xcrq.setTime(xcrq);
		
		calendar.add(Calendar.MONTH, -1);
		System.out.println(calendar.getTime());
		System.out.println(calendar_xcrq.getTime());
		System.out.println(calendar.before(calendar_xcrq));
	}
	
	public static DengJi getDengJi(Date xcrq) {
		Calendar calendar_now = Calendar.getInstance();
		calendar_now.set(calendar_now.get(Calendar.YEAR), calendar_now.get(Calendar.MONTH), calendar_now.get(Calendar.DAY_OF_MONTH), 0, 0, 0);
		Calendar calendar_xcrq = Calendar.getInstance();
		calendar_xcrq.setTime(xcrq);
		
		if(calendar_xcrq.before(calendar_now)) {
			return DengJi.ChaoQi;
		}
		
		calendar_now.add(Calendar.MONTH, 1);
		if(calendar_xcrq.before(calendar_now)) {
			return DengJi.DaoQi;
		}
		
		calendar_now.add(Calendar.MONTH, 3);
		if(calendar_xcrq.before(calendar_now)) {
			return DengJi.JinQi;
		}
		return null;
	}
}
