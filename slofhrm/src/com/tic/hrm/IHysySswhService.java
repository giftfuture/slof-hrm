package com.tic.hrm;

import java.util.List;

public interface IHysySswhService {

	public String getSsfl();

	public String getSslb(Integer flid);

	public String getSsmc(Integer lbid);
	
	public String getSsmcBySsxxSql();
	
	public String getSsmcBySsxxHql();
	
	public String getGgxh(Integer lbid);

	public String getJybm();

	public Page findHysySsxxByPage(Page page,String danwei_id,String cx);

	public boolean saveHysySsxx(HysySsxx hysyssxx);

	public boolean saveHysySsxx(List sslist);

	public boolean deleteHysySsxx(List aryStr);
	
	public Integer getSsid(String ssmc);

	public String getQueryYearJson();
	
	public HysySsxx getHysySsxxById(Integer id);

	public Integer getFlidBylbId(Integer lbid);

	public String getFlmcById(Integer flid);

	public Integer getLbid(String ssmc);

	public String getSslbcx(Integer flid);

	public String getSsflcx();

	public String getDanwei(String danwei);

	public String getJzdw(Integer lbid);

	public String getQueryXcjyYearJson();

	public String getDanweiHasData(String danwei);
	
	public boolean shsscl(HysySsxx hysyssxx);
	
}
