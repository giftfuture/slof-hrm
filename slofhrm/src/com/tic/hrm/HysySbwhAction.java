package com.tic.hrm;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;

import com.opensymphony.xwork2.ActionContext;

@SuppressWarnings({ "unused", "serial" })
public class HysySbwhAction extends BaseAction implements StrutsStatics {

	private IHysySbwhService hysysbwhService;
	private HysySbxx hysysbxx;
	private Integer flid;
	private Page page;
	private boolean success;
	private String errorMsg;
	
	public String saveHysySbxx() {
		// 添加录入时间
		hysysbxx.setLrrq(new Date());
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		hysysbxx.setLrdwId(Integer.parseInt(danwei_id));
		if(hysysbxx.getSbmc()!=null){
			hysysbxx.setSbid(hysysbwhService.getSbid(hysysbxx.getSbmc()));
		}
		if(hysysbxx.getLbmc()!=null){
			hysysbxx.setLbid(hysysbwhService.getLbid(hysysbxx.getLbmc()));
		}
		hysysbxx.setSbflag("未完成");
		if (hysysbwhService.saveHysySbxx(hysysbxx)) {
			this.success = true;
		} else {
			this.success = false;
			this.errorMsg = "保存失败！";
		}
		return SUCCESS;
	}
	
	public String deleteHysySbxx() {
		String strAryHysySbxxId = getRequest().getParameter("p_id");
		JSONArray jsonArray = JSONArray.fromObject(strAryHysySbxxId);
		List ary_str = (List) JSONArray.toCollection(jsonArray);
		if (hysysbwhService.deleteHysySbxx(ary_str)) {
			this.success = true;
		} else {
			this.success = false;
			this.errorMsg = "删除失败！";
		}
		return SUCCESS;
	}
	
	public String getHysySbxxById() {
		Integer int_id = Integer.parseInt(getRequest().getParameter("id"));
		HysySbxx hysySbxx = hysysbwhService.getHysySbxxById(int_id);
		if (hysySbxx != null) {
			//JsonConfig jsonconf = new JsonConfig();
			//String[] excludes = { "HysySbxx", "class" };
			//jsonconf.setExcludes(excludes);
			//JSONArray jsonArray = JSONArray.fromObject(hysySbxx, jsonconf);
			//String json_sbxx=JsonUtil.getJSONString(hysySbxx, jsonconf);
			//Integer json_flid= hysysbwhService.getFlidBylbId(hysySbxx.getLbid());
			//String json_flmc= hysysbwhService.getFlmcById(json_flid);
			String json_jyqk= hysySbxx.getJyqk();
			//this.jsonString = "{success:true, flid:"+json_flid+", flmc:'"+json_flmc+"', jyqk:"+json_jyqk+"}";
			this.jsonString = "{success:true, jyqk:"+json_jyqk+"}";
			return SUCCESS;
		} else {
			return "ActionError";
		}
	}
	
	public String findAdminHysySbxx() {
		
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		String cx=getRequest().getParameter("cx");
		getCommonPage();
		List<String> listflag = new ArrayList<String>();
		if (getRequest().getParameter("queryflag") != null && !getRequest().getParameter("queryflag").equals("0")) {
		    listflag.add(getRequest().getParameter("queryflag"));
		} else {
		    listflag.add("未完成");
		    listflag.add("等待审核");
		    listflag.add("审核不通过");
		    listflag.add("已完成");
		}
		page.setListflag(listflag);
		page = hysysbwhService.findHysySbxxByPage(page,danwei_id,cx);
		return SUCCESS;
	}
	

	    // 报告审核查询
	    public String findShenHeHysySbxx() {
	    	HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
			HttpSession httpSession = request.getSession();
			String danwei_id =(String)httpSession.getAttribute("danweiid");
	    	getCommonPage();
	    	String cx=getRequest().getParameter("cx");
		List<String> listflag = new ArrayList<String>();
		if (getRequest().getParameter("queryflag") != null && !getRequest().getParameter("queryflag").equals("0")) {
		    listflag.add(getRequest().getParameter("queryflag"));
		} else {
		    listflag.add("等待审核");
		    listflag.add("审核不通过");
		    listflag.add("已完成");
		}
		page.setListflag(listflag);
		page = hysysbwhService.findHysySbxxByPage(page,danwei_id,cx);
		// page=getReplaceValue(page);
		return SUCCESS;
	    }

	private void getCommonPage() {
		page = new Page();
		int start = 0;
		int limit = 20;

		String queryfields = "", queryvalue = "", querymonth = "0", queryyear = "0", querysbfl="0", querysblb="0", queryyxzt="0", queryflag="0",querylrdwid="0";

		if (getRequest().getParameter("start") != null && !getRequest().getParameter("start").equals("")) {
			start = Integer.valueOf(getRequest().getParameter("start"));
		}

		if (getRequest().getParameter("limit") != null && !getRequest().getParameter("limit").equals("")) {
			limit = Integer.valueOf(getRequest().getParameter("limit"));
		}

		if (getRequest().getParameter("fields") != null && !getRequest().getParameter("fields").equals("")) {
			queryfields = getRequest().getParameter("fields");
		} else {
			queryfields = "[]";
		}

		if (getRequest().getParameter("query") != null && !getRequest().getParameter("query").equals("")) {
			queryvalue = getRequest().getParameter("query").trim();
		}

		if (getRequest().getParameter("queryyear") != null && !getRequest().getParameter("queryyear").equals("")) {
			queryyear = getRequest().getParameter("queryyear");
		}

		if (getRequest().getParameter("querymonth") != null && !getRequest().getParameter("querymonth").equals("")) {
			querymonth = getRequest().getParameter("querymonth");
		}  
		
		if (getRequest().getParameter("querysbfl") != null && !getRequest().getParameter("querysbfl").equals("")) {
			querysbfl = getRequest().getParameter("querysbfl");
		}
		
		if (getRequest().getParameter("querysblb") != null && !getRequest().getParameter("querysblb").equals("")) {
			querysblb = getRequest().getParameter("querysblb");
		}
		
		if (getRequest().getParameter("queryyxzt") != null && !getRequest().getParameter("queryyxzt").equals("")) {
			queryyxzt = getRequest().getParameter("queryyxzt");
		}
		if (getRequest().getParameter("queryflag") != null && !getRequest().getParameter("queryflag").equals("")) {
			queryflag = getRequest().getParameter("queryflag");
		}
		if (getRequest().getParameter("querydw") != null && !getRequest().getParameter("querydw").equals("")) {
			querylrdwid = getRequest().getParameter("querydw");
		}
		

		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");	
		JSONArray jsonArray = JSONArray.fromObject(queryfields);
		ArrayList<String> ary_query_fields = (ArrayList<String>) JSONArray.toCollection(jsonArray);

		String str_sortfield = getRequest().getParameter("sort");
		String str_sortdir = getRequest().getParameter("dir");
		page.setStart(start);
		// page.setLimit(limit = limit == 0 ? 20 : limit);
		page.setLimit(limit);
		page.setSortfiled(str_sortfield);
		page.setSortdirection(str_sortdir);
		page.setQueryfields(ary_query_fields);
		page.setQueryvalue(queryvalue);
		page.setQueryyear(queryyear);
		page.setQuerymonth(querymonth);
		page.setQuerysbfl(querysbfl);
		page.setQuerysblb(querysblb);
		page.setQueryyxzt(queryyxzt);
		page.setQueryflag(queryflag);
		page.setQuerylrdwid(new Integer(querylrdwid));
		page.setQuerydwid(new Integer(danwei_id));
	}
  
	public String tjshsb() {

		String strAryHysySbxxId = getRequest().getParameter("p_id");
		JSONArray jsonArray = JSONArray.fromObject(strAryHysySbxxId);
		List ary_str = (List) JSONArray.toCollection(jsonArray);
		List sblist = new ArrayList();
		for (Object idInt : ary_str) {
			HysySbxx hysySbxx = hysysbwhService.getHysySbxxById((Integer) idInt);
			hysySbxx.setSbflag("等待审核");
			sblist.add(hysySbxx);
		}
		if (hysysbwhService.saveHysySbxx(sblist)) {
			this.success = true;
		} else {
			this.success = false;
			this.errorMsg = "提交审核失败！";
		}
		return SUCCESS;
	}
	
	public String shtgsb() {
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		String username =(String)httpSession.getAttribute("username");
		hysysbxx.setSbshry(username);
		hysysbxx.setSbshsj(new Date());
		hysysbxx.setSbflag("已完成");
		if (hysysbwhService.shsbcl(hysysbxx)) {
			this.jsonString = "{success:true}";
		} else {
			this.jsonString = "{success:false, msg:'审核通过失败！'}";
		}
		return SUCCESS;
	}
	
	public String shbtgsb() {
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		String username =(String)httpSession.getAttribute("username");
		hysysbxx.setSbshry(username);
		hysysbxx.setSbshsj(new Date());
		hysysbxx.setSbflag("审核不通过");
		if (hysysbwhService.shsbcl(hysysbxx)) {
			this.jsonString = "{success:true}";
		} else {
			this.jsonString = "{success:false, msg:'审核不通过失败！'}";
		}
		return SUCCESS;
	}
	
	public String findYearHysySbxx() {
		this.jsonString = hysysbwhService.getQueryYearJson();
		return SUCCESS;
	}
	
	public String findXcjyYearHysySbxx() {
		this.jsonString = hysysbwhService.getQueryXcjyYearJson();
		return SUCCESS;
	}
	
	public String getSbfl() {
		this.jsonString = hysysbwhService.getSbfl();
		return SUCCESS;
	}
	
	public String getSblb() {
		if(flid!=null) {
			this.jsonString = hysysbwhService.getSblb(flid);
		}
		return SUCCESS;
	}
	
	public String getSbflcx() {
		this.jsonString = hysysbwhService.getSbflcx();
		return SUCCESS;
	}
	
	public String getDanwei() {
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		this.jsonString = hysysbwhService.getDanwei(danwei_id);
		return SUCCESS;
	}
	
	public String getDanweiHasData() {
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		this.jsonString = hysysbwhService.getDanweiHasData(danwei_id);
		return SUCCESS;
	}
	
	public String getSblbcx() {
		if(flid!=null) {
			this.jsonString = hysysbwhService.getSblbcx(flid);
		}
		return SUCCESS;
	}
	
	public String getSbmc() {
		if (getRequest().getParameter("lbid") != null && !getRequest().getParameter("lbid").equals("")) {
			Integer lbid =  new Integer(getRequest().getParameter("lbid").trim());
			this.jsonString = hysysbwhService.getSbmc(lbid);
		}
		return SUCCESS;
	}
	
	public String getSccj() {
		if (getRequest().getParameter("lbid") != null && !getRequest().getParameter("lbid").equals("")) {
			Integer lbid =  new Integer(getRequest().getParameter("lbid").trim());
			this.jsonString = hysysbwhService.getSccj(lbid);
		}
		return SUCCESS;
	}
	
	public String getGgxh() {
		if (getRequest().getParameter("lbid") != null && !getRequest().getParameter("lbid").equals("")) {
			Integer lbid =  new Integer(getRequest().getParameter("lbid").trim());
			this.jsonString = hysysbwhService.getGgxh(lbid);
		}
		return SUCCESS;
	}
	
	public String getJybm() {
		this.jsonString = hysysbwhService.getJybm();
		return SUCCESS;
	}
	
	public IHysySbwhService getHysysbwhService() {
		return hysysbwhService;
	}

	public void setHysysbwhService(IHysySbwhService hysysbwhService) {
		this.hysysbwhService = hysysbwhService;
	}

	public HysySbxx getHysysbxx() {
		return hysysbxx;
	}

	public void setHysysbxx(HysySbxx hysysbxx) {
		this.hysysbxx = hysysbxx;
	}

	public Integer getFlid() {
		return flid;
	}

	public void setFlid(Integer flid) {
		this.flid = flid;
	}

	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
	
}
