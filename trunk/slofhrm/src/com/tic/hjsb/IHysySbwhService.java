package com.tic.hjsb;

import java.util.List;

public interface IHysySbwhService {

	public String getSbfl();

	public String getSblb(Integer flid);

	public String getSbmc(Integer lbid);
	
	public String getSbmcBySbxxSql();
	
	public String getSbmcBySbxxHql();

	public String getSccj(Integer lbid);
	
	public String getGgxh(Integer lbid);

	public String getJybm();

	public Page findHysySbxxByPage(Page page,String danwei_id,String cx);

	public boolean saveHysySbxx(HysySbxx hysysbxx);
	
	public boolean saveHysySbxx(List sblist);

	public boolean deleteHysySbxx(List aryStr);
	
	public Integer getSbid(String sbmc);

	public String getQueryYearJson();
	
	public HysySbxx getHysySbxxById(Integer id);

	public Integer getFlidBylbId(Integer lbid);

	public String getFlmcById(Integer flid);

	public Integer getLbid(String sbmc);

	public String getSblbcx(Integer flid);

	public String getSbflcx();

	public String getDanwei(String danwei);

	public String getDanweiHasData(String danwei);
	
	public String getQueryXcjyYearJson();

	public boolean shsbcl(HysySbxx hysysbxx);
	
}
