package com.tic.hrm;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import com.opensymphony.xwork2.ActionContext;

public class HrRyAction {

	private IHrRyService hrryService;
	private HrRyjbxx hrryjbxx;
	private Integer ryid;
	private Page page;
	private boolean success;
	private String errorMsg;
	
	public String saveHysySbxx() {
		// 添加录入时间
		hrryjbxx.setLrrq(new Date());
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		hrryjbxx.setLrdwId(Integer.parseInt(danwei_id));
		if(hrryjbxx.getSbmc()!=null){
			hrryjbxx.setSbid(hrryService.getSbid(hrryjbxx.getSbmc()));
		}
		if(hrryjbxx.getLbmc()!=null){
			hrryjbxx.setLbid(hrryService.getLbid(hrryjbxx.getLbmc()));
		}
		hrryjbxx.setSbflag("未完成");
		if (hrryService.saveHysySbxx(hrryjbxx)) {
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
		if (hrryService.deleteHysySbxx(ary_str)) {
			this.success = true;
		} else {
			this.success = false;
			this.errorMsg = "删除失败！";
		}
		return SUCCESS;
	}
	
	public String getHysySbxxById() {
		Integer int_id = Integer.parseInt(getRequest().getParameter("id"));
		HysySbxx hysySbxx = hrryService.getHysySbxxById(int_id);
		if (hysySbxx != null) {
			//JsonConfig jsonconf = new JsonConfig();
			//String[] excludes = { "HysySbxx", "class" };
			//jsonconf.setExcludes(excludes);
			//JSONArray jsonArray = JSONArray.fromObject(hysySbxx, jsonconf);
			//String json_sbxx=JsonUtil.getJSONString(hysySbxx, jsonconf);
			//Integer json_flid= hrryService.getFlidBylbId(hysySbxx.getLbid());
			//String json_flmc= hrryService.getFlmcById(json_flid);
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
		page = hrryService.findHysySbxxByPage(page,danwei_id,cx);
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
	
	public IHrRyService getHrryService() {
		return hrryService;
	}
	public void setHrryService(IHrRyService hrryService) {
		this.hrryService = hrryService;
	}
	public HrRyjbxx getHrryjbxx() {
		return hrryjbxx;
	}
	public void setHrryjbxx(HrRyjbxx hrryjbxx) {
		this.hrryjbxx = hrryjbxx;
	}
	public Integer getRyid() {
		return ryid;
	}
	public void setRyid(Integer ryid) {
		this.ryid = ryid;
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
