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
public class HysySswhAction extends BaseAction implements StrutsStatics {

	private IHysySswhService hysysswhService;
	private HysySsxx hysyssxx;
	private Integer flid;
	private Page page;
	private boolean success;
	private String errorMsg;
	
	public String saveHysySsxx() {
		// 添加录入时间
		hysyssxx.setLrrq(new Date());
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		hysyssxx.setLrdwId(Integer.parseInt(danwei_id));
		if(hysyssxx.getSsmc()!=null){
			hysyssxx.setSsid(hysysswhService.getSsid(hysyssxx.getSsmc()));
		}
		if(hysyssxx.getLbmc()!=null){
			hysyssxx.setLbid(hysysswhService.getLbid(hysyssxx.getLbmc()));
		}
		hysyssxx.setSsflag("未完成");
		if (hysysswhService.saveHysySsxx(hysyssxx)) {
			this.success = true;
		} else {
			this.success = false;
			this.errorMsg = "保存失败！";
		}
		return SUCCESS;
	}
	
	public String deleteHysySsxx() {
		String strAryHysySsxxId = getRequest().getParameter("p_id");
		JSONArray jsonArray = JSONArray.fromObject(strAryHysySsxxId);
		List ary_str = (List) JSONArray.toCollection(jsonArray);
		if (hysysswhService.deleteHysySsxx(ary_str)) {
			this.success = true;
		} else {
			this.success = false;
			this.errorMsg = "删除失败！";
		}
		return SUCCESS;
	}
	
	public String getHysySsxxById() {
		Integer int_id = Integer.parseInt(getRequest().getParameter("id"));
		HysySsxx hysySsxx = hysysswhService.getHysySsxxById(int_id);
		if (hysySsxx != null) {
			//JsonConfig jsonconf = new JsonConfig();
			//String[] excludes = { "HysySsxx", "class" };
			//jsonconf.setExcludes(excludes);
			//JSONArray jsonArray = JSONArray.fromObject(hysySsxx, jsonconf);
			//String json_ssxx=JsonUtil.getJSONString(hysySsxx, jsonconf);
			//Integer json_flid= hysysswhService.getFlidBylbId(hysySsxx.getLbid());
			//String json_flmc= hysysswhService.getFlmcById(json_flid);
			String json_jyqk= hysySsxx.getJyqk();
			//this.jsonString = "{success:true, flid:"+json_flid+", flmc:'"+json_flmc+"', jyqk:"+json_jyqk+"}";
			this.jsonString = "{success:true, jyqk:"+json_jyqk+"}";
			return SUCCESS;
		} else {
			return "ActionError";
		}
	}
	
	public String findAdminHysySsxx() {
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
		page = hysysswhService.findHysySsxxByPage(page,danwei_id,cx);
		return SUCCESS;
	}

    // 报告审核查询
    public String findShenHeHysySsxx() {
    	HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		String cx=getRequest().getParameter("cx");
    	getCommonPage();
		List<String> listflag = new ArrayList<String>();
		if (getRequest().getParameter("queryflag") != null && !getRequest().getParameter("queryflag").equals("0")) {
		    listflag.add(getRequest().getParameter("queryflag"));
		} else {
		    listflag.add("等待审核");
		    listflag.add("审核不通过");
		    listflag.add("已完成");
		}
		page.setListflag(listflag);
		page = hysysswhService.findHysySsxxByPage(page,danwei_id,cx);
		// page=getReplaceValue(page);
		return SUCCESS;
    }

	
	private void getCommonPage() {
		page = new Page();
		int start = 0;
		int limit = 20;

		String queryfields = "", queryvalue = "", querymonth = "0", queryyear = "0", queryssfl="0", querysslb="0", queryyxzt="0",queryflag="0", querylrdwid="0";

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
		
		if (getRequest().getParameter("queryssfl") != null && !getRequest().getParameter("queryssfl").equals("")) {
			queryssfl = getRequest().getParameter("queryssfl");
		}
		
		if (getRequest().getParameter("querysslb") != null && !getRequest().getParameter("querysslb").equals("")) {
			querysslb = getRequest().getParameter("querysslb");
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
//		User login_user = (User) httpSession.getAttribute(QoSysConstant.SESSION_LOGIN_USER);
//		Integer querylrdwid=login_user.getDepartment().getId();
//		Integer queryparentid=login_user.getDepartment().getParentId();		
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
		page.setQueryssfl(queryssfl);
		page.setQuerysslb(querysslb);
		page.setQueryyxzt(queryyxzt);
		page.setQueryflag(queryflag);
		page.setQuerylrdwid(new Integer(querylrdwid));
		page.setQuerydwid(new Integer(danwei_id));
	}

	public String tjshss() {
		String strAryHysySsxxId = getRequest().getParameter("p_id");
		JSONArray jsonArray = JSONArray.fromObject(strAryHysySsxxId);
		List ary_str = (List) JSONArray.toCollection(jsonArray);
		List sslist = new ArrayList();
		for (Object idInt : ary_str) {
			HysySsxx hysySsxx = hysysswhService.getHysySsxxById((Integer) idInt);
			hysySsxx.setSsflag("等待审核");
			sslist.add(hysySsxx);
		}
		if (hysysswhService.saveHysySsxx(sslist)) {
			this.success = true;
		} else {
			this.success = false;
			this.errorMsg = "提交审核失败！";
		}
		return SUCCESS;
	}
	
	public String shtgss() {
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		String username =(String)httpSession.getAttribute("username");
		hysyssxx.setSsshry(username);
		hysyssxx.setSsshsj(new Date());
		hysyssxx.setSsflag("已完成");
		if (hysysswhService.shsscl(hysyssxx)) {
			this.jsonString = "{success:true}";
		} else {
			this.jsonString = "{success:false, msg:'审核通过失败！'}";
		}
		return SUCCESS;
	}
	
	public String shbtgss() {
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		String username =(String)httpSession.getAttribute("username");
		hysyssxx.setSsshry(username);
		hysyssxx.setSsshsj(new Date());
		hysyssxx.setSsflag("审核不通过");
		if (hysysswhService.shsscl(hysyssxx)) {
			this.jsonString = "{success:true}";
		} else {
			this.jsonString = "{success:false, msg:'审核不通过失败！'}";
		}
		return SUCCESS;
	}
	
	public String findYearHysySsxx() {
		this.jsonString = hysysswhService.getQueryYearJson();
		return SUCCESS;
	}
	
	public String findXcjyYearHysySsxx() {
		this.jsonString = hysysswhService.getQueryXcjyYearJson();
		return SUCCESS;
	}
	
	public String getSsfl() {
		this.jsonString = hysysswhService.getSsfl();
		return SUCCESS;
	}
	
	public String getSslb() {
		if(flid!=null) {
			this.jsonString = hysysswhService.getSslb(flid);
		}
		return SUCCESS;
	}
	
	public String getSsflcx() {
		this.jsonString = hysysswhService.getSsflcx();
		return SUCCESS;
	}
	
	public String getDanwei() {
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		this.jsonString = hysysswhService.getDanwei(danwei_id);
		return SUCCESS;
	}
	
	public String getDanweiHasData() {
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(HTTP_REQUEST);
		HttpSession httpSession = request.getSession();
		String danwei_id =(String)httpSession.getAttribute("danweiid");
		this.jsonString = hysysswhService.getDanweiHasData(danwei_id);
		return SUCCESS;
	}
	
	public String getSslbcx() {
		if(flid!=null) {
			this.jsonString = hysysswhService.getSslbcx(flid);
		}
		return SUCCESS;
	}
	
	public String getSsmc() {
		if (getRequest().getParameter("lbid") != null && !getRequest().getParameter("lbid").equals("")) {
			Integer lbid =  new Integer(getRequest().getParameter("lbid").trim());
			this.jsonString = hysysswhService.getSsmc(lbid);
		}
		return SUCCESS;
	}
	
	public String getJzdw() {
		if (getRequest().getParameter("lbid") != null && !getRequest().getParameter("lbid").equals("")) {
			Integer lbid =  new Integer(getRequest().getParameter("lbid").trim());
			this.jsonString = hysysswhService.getJzdw(lbid);
		}
		return SUCCESS;
	}
	
	public String getGgxh() {
		if (getRequest().getParameter("lbid") != null && !getRequest().getParameter("lbid").equals("")) {
			Integer lbid =  new Integer(getRequest().getParameter("lbid").trim());
			this.jsonString = hysysswhService.getGgxh(lbid);
		}
		return SUCCESS;
	}
	
	public String getJybm() {
		this.jsonString = hysysswhService.getJybm();
		return SUCCESS;
	}
	
	public IHysySswhService getHysysswhService() {
		return hysysswhService;
	}

	public void setHysysswhService(IHysySswhService hysysswhService) {
		this.hysysswhService = hysysswhService;
	}

	public HysySsxx getHysyssxx() {
		return hysyssxx;
	}

	public void setHysyssxx(HysySsxx hysyssxx) {
		this.hysyssxx = hysyssxx;
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
