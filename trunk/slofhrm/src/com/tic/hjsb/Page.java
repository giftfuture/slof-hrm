package com.tic.hjsb;

// Download by http://www.codefans.net
import java.util.List;

public class Page {
    /** 总记录数 */
    private int totalProperty;

    /** 分页结果 */
    private List root;

    /** 开始页码 */
    private int start;

    /** 每页多少 */
    private int limit;

    /** 成功与否 */
    private boolean success;

    /** 排序字段 */
    private String sortfiled;

    /** 排序方向 */
    private String sortdirection;

    private Object objCondition;

    /** 查询字段 */
    private List queryfields;

    /** 查询内容 */
    private String queryvalue;

    /** 查询年份 */
    private String queryyear;

    /** 查询采油厂 */
    private String querycycmc;

    /** 查询沿线名称 */
    private String querylhz;

    /** 查询月份 */
    private String querymonth;
    
    /** 查询录入单位名称 */
    private String querylrdw;
    
    /** 单位权限控制 */
    private Integer querydwid;
    
    /** 查询录入单位id */
    private Integer querylrdwid;
    
    /** 查询上级单位id */
    private Integer queryparentid;

	/** 内容类别 */
    private String queryzynrlb;
    
	/** 流程图节点名称 */
    private String querylctjdmc;
    
    private List<String> listflag;
    
    private String querysbfl;
    private String querysblb;
    private String queryyxzt;
    private String queryssfl;
    private String querysslb;
    private String queryssyxzt;
    private String queryflag;
    
   

    public String getQuerysbfl() {
		return querysbfl;
	}

	public void setQuerysbfl(String querysbfl) {
		this.querysbfl = querysbfl;
	}

	

    public Integer getQuerydwid() {
		return querydwid;
	}

	public void setQuerydwid(Integer integer) {
		this.querydwid = integer;
	}

	public String getQueryssyxzt() {
		return queryssyxzt;
	}

	public String getQuerysblb() {
		return querysblb;
	}

	public void setQuerysblb(String querysblb) {
		this.querysblb = querysblb;
	}
	  public String getQueryssfl() {
			return queryssfl;
		}

		public void setQueryssfl(String queryssfl) {
			this.queryssfl = queryssfl;
		}

		

	    public String getQuerysslb() {
			return querysslb;
		}

		public void setQuerysslb(String querysslb) {
			this.querysslb = querysslb;
		}

	public int getLimit() {
	return limit;
    }

    public void setLimit(int limit) {
	this.limit = limit;
    }

    public List getRoot() {
	return root;
    }

    public void setRoot(List root) {
	this.root = root;
    }

    public int getStart() {
	return start;
    }

    public void setStart(int start) {
	this.start = start;
    }

    public boolean isSuccess() {
	return success;
    }

    public void setSuccess(boolean success) {
	this.success = success;
    }

    public int getTotalProperty() {
	return totalProperty;
    }

    public void setTotalProperty(int totalProperty) {
	this.totalProperty = totalProperty;
    }

    public String getSortfiled() {
	return sortfiled;
    }

    public void setSortfiled(String sortfiled) {
	this.sortfiled = sortfiled;
    }

    public String getSortdirection() {
	return sortdirection;
    }

    public void setSortdirection(String sortdirection) {
	this.sortdirection = sortdirection;
    }

    public Object getObjCondition() {
	return objCondition;
    }

    public void setObjCondition(Object objCondition) {
	this.objCondition = objCondition;
    }

    public List getQueryfields() {
	return queryfields;
    }

    public void setQueryfields(List queryfields) {
	this.queryfields = queryfields;
    }

    public String getQueryvalue() {
	return queryvalue;
    }

    public void setQueryvalue(String queryvalue) {
	this.queryvalue = queryvalue;
    }

    public String getQueryyear() {
	return queryyear;
    }

    public void setQueryyear(String queryyear) {
	this.queryyear = queryyear;
    }

    public String getQuerymonth() {
	return querymonth;
    }

    public void setQuerymonth(String querymonth) {
	this.querymonth = querymonth;
    }

    public List<String> getListflag() {
        return listflag;
    }

    public void setListflag(List<String> listflag) {
        this.listflag = listflag;
    }

	public String getQuerycycmc() {
		return querycycmc;
	}

	public void setQuerycycmc(String querycycmc) {
		this.querycycmc = querycycmc;
	}

	public String getQuerylhz() {
		return querylhz;
	}

	public void setQuerylhz(String querylhz) {
		this.querylhz = querylhz;
	}

	public String getQuerylrdw() {
		return querylrdw;
	}

	public void setQuerylrdw(String querylrdw) {
		this.querylrdw = querylrdw;
	}

	public Integer getQuerylrdwid() {
		return querylrdwid;
	}

	public void setQuerylrdwid(Integer querylrdwid) {
		this.querylrdwid = querylrdwid;
	}

	public Integer getQueryparentid() {
		return queryparentid;
	}

	public void setQueryparentid(Integer queryparentid) {
		this.queryparentid = queryparentid;
	}

	public String getQueryzynrlb() {
		return queryzynrlb;
	}

	public void setQueryzynrlb(String queryzynrlb) {
		this.queryzynrlb = queryzynrlb;
	}

	public String getQuerylctjdmc() {
		return querylctjdmc;
	}

	public void setQuerylctjdmc(String querylctjdmc) {
		this.querylctjdmc = querylctjdmc;
	}

	public void setQueryyxzt(String queryyxzt) {
		this.queryyxzt = queryyxzt;
	}

	public String getQueryyxzt() {
		return queryyxzt;
	}
		
	public void setQueryssyxzt(String queryssyxzt) {
		this.queryssyxzt = queryssyxzt;
	}

	public String getQueryssyyxzt() {
		return queryssyxzt;
	}
	public void setQueryflag(String queryflag) {
		this.queryflag = queryflag;
	}

	public String getQueryflag() {
		return queryflag;
	}
}