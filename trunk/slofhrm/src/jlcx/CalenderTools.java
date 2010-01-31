package jlcx;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class CalenderTools {

	public static String getYearMonth(Date d) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		return sdf.format(d);
	}

	public static int getWeekNumOfYear(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.setFirstDayOfWeek(Calendar.MONDAY);
		return cal.get(Calendar.WEEK_OF_YEAR);
	}

	/**
	 * 根据月份中周数，得到此周是否跨两个月份
	 * 
	 * @param month
	 *            月份: 一月, Calendar.JANUARY, 0 二月, Calendar.FEBRUARY, 1
	 * 
	 * @param week_of_month
	 *            每个月份的第几周，第一周：1
	 * @return
	 */
	public static boolean WeekNotInTwoMonth(int month, int week_of_month) {
		boolean rtnV;
		if (FirstDayInWeek(month, week_of_month).getMonth() < month || LastDayInWeek(month, week_of_month).getMonth() > month) {
			rtnV = false;
		} else {
			rtnV = true;
		}
		return rtnV;
	}

	/**
	 * 根据月份中周数，得到此周的第一天
	 * 
	 * @param month
	 *            月份: 一月, Calendar.JANUARY, 0 二月, Calendar.FEBRUARY, 1
	 * 
	 * @param week_of_month
	 *            每个月份的第几周，第一周：1
	 * @return
	 */
	public static Date FirstDayInWeek(int year, int month, int week_of_month) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		// 第一天为星期一
		cal.setFirstDayOfWeek(Calendar.MONDAY);
		cal.set(Calendar.MONTH, month);
		cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		cal.set(Calendar.WEEK_OF_MONTH, week_of_month);
		return cal.getTime();
	}

	/**
	 * 根据月份中周数，得到此周的最后一天
	 * 
	 * @param month
	 *            月份: 一月, Calendar.JANUARY, 0 二月, Calendar.FEBRUARY, 1
	 * 
	 * @param week_of_month
	 *            每个月份的第几周，第一周：1
	 * @return
	 */
	public static Date LastDayInWeek(int year, int month, int week_of_month) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		// 第一天为星期一
		cal.setFirstDayOfWeek(Calendar.MONDAY);
		cal.set(Calendar.MONTH, month);
		cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		cal.set(Calendar.WEEK_OF_MONTH, week_of_month);
		return cal.getTime();
	}

	/**
	 * 根据年份中周数，得到此周的第一天
	 * 
	 * @param week_of_year
	 *            年份中周数: 第一周：1
	 * @return
	 */
	public static Date FirstDayInWeek(int year, int week_of_year) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		// 第一天为星期一
		cal.setFirstDayOfWeek(Calendar.MONDAY);
		cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		cal.set(Calendar.WEEK_OF_YEAR, week_of_year);
		return cal.getTime();
	}

	/**
	 * 根据年份中周数，得到此周的最后一天
	 * 
	 * @param week_of_year
	 *            年份中周数: 第一周：1
	 * @return
	 */
	public static Date LastDayInWeek(int year, int week_of_year) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		// 第一天为星期一
		cal.setFirstDayOfWeek(Calendar.MONDAY);
		cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		cal.set(Calendar.WEEK_OF_YEAR, week_of_year);
		return cal.getTime();
	}

	public static void PrintDate(Date d) {
		System.out.println(DateFormat.getInstance().format(d));
	}
}
