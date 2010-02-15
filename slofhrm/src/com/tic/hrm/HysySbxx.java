package com.tic.hrm;

import java.util.Date;

import org.apache.struts2.json.annotations.JSON;

/**
 * HysySbxx entity. @author MyEclipse Persistence Tools
 */

public class HysySbxx implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer lbid;
	private Integer sbid;
	private String sbmc;
	private String sccj;
	private String ggxh;
	private String sbbh;
	private String zcbh;
	private String azdd;
	private String tcrq;
	private String sbyz;
	private String yxzt;
	private String jyqk;
	private String jcbm;
	private String jcbh;
	private Date jcrq;
	private Integer jczq;
	private Date xcrq;
	private Date lrrq;
	private String sbshry;
	private Date sbshsj;
	private String sbshyj;
	private String sbflag;
	private Integer lrdwId;
	
	private Integer flid;
	private String flmc;
	private String lbmc;
	private String lrdwMc;

	// Constructors

	/** default constructor */
	public HysySbxx() {
	}

	/** full constructor */
	public HysySbxx(Integer lbid, Integer sbid, String sbmc, String sccj, String ggxh, String sbbh, String zcbh, String azdd, String tcrq, String sbyz, String yxzt, String jyqk, Date xcrq, Date lrrq,String sbshry, Date sbshsj,String sbshyj,  Integer lrdwId) {
		this.lbid = lbid;
		this.sbid = sbid;
		this.sbmc = sbmc;
		this.sccj = sccj;
		this.ggxh = ggxh;
		this.sbbh = sbbh;
		this.zcbh = zcbh;
		this.azdd = azdd;
		this.tcrq = tcrq;
		this.sbyz = sbyz;
		this.yxzt = yxzt;
		this.jyqk = jyqk;
		this.xcrq = xcrq;
		this.lrrq = lrrq;
		this.sbshry = sbshry;
		this.sbshsj = sbshsj;
		this.sbshyj = sbshyj;
		
		this.lrdwId = lrdwId;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getLbid() {
		return this.lbid;
	}

	public void setLbid(Integer lbid) {
		this.lbid = lbid;
	}

	public Integer getSbid() {
		return this.sbid;
	}

	public void setSbid(Integer sbid) {
		this.sbid = sbid;
	}

	public String getSbmc() {
		return this.sbmc;
	}

	public void setSbmc(String sbmc) {
		this.sbmc = sbmc;
	}

	public String getSccj() {
		return this.sccj;
	}

	public void setSccj(String sccj) {
		this.sccj = sccj;
	}

	public String getGgxh() {
		return this.ggxh;
	}

	public void setGgxh(String ggxh) {
		this.ggxh = ggxh;
	}

	public String getSbbh() {
		return this.sbbh;
	}

	public void setSbbh(String sbbh) {
		this.sbbh = sbbh;
	}

	public String getZcbh() {
		return this.zcbh;
	}

	public void setZcbh(String zcbh) {
		this.zcbh = zcbh;
	}

	public String getAzdd() {
		return this.azdd;
	}

	public void setAzdd(String azdd) {
		this.azdd = azdd;
	}

	public String getTcrq() {
		return this.tcrq;
	}

	public void setTcrq(String tcrq) {
		this.tcrq = tcrq;
	}

	public String getSbyz() {
		return this.sbyz;
	}

	public void setSbyz(String sbyz) {
		this.sbyz = sbyz;
	}

	public String getYxzt() {
		return this.yxzt;
	}

	public void setYxzt(String yxzt) {
		this.yxzt = yxzt;
	}

	public String getJyqk() {
		return this.jyqk;
	}

	public void setJyqk(String jyqk) {
		this.jyqk = jyqk;
	}
	
	@JSON(format="yyyy-MM-dd")
	public Date getXcrq() {
		return this.xcrq;
	}

	public void setXcrq(Date xcrq) {
		this.xcrq = xcrq;
	}
	
	@JSON(format="yyyy-MM-dd")
	public Date getLrrq() {
		return this.lrrq;
	}

	public void setLrrq(Date lrrq) {
		this.lrrq = lrrq;
	}

	public Integer getLrdwId() {
		return this.lrdwId;
	}

	public void setLrdwId(Integer lrdwId) {
		this.lrdwId = lrdwId;
	}

	public String getLbmc() {
		return lbmc;
	}

	public void setLbmc(String lbmc) {
		this.lbmc = lbmc;
	}

	public String getLrdwMc() {
		return lrdwMc;
	}

	public void setLrdwMc(String lrdwMc) {
		this.lrdwMc = lrdwMc;
	}

	public Integer getFlid() {
		return flid;
	}

	public void setFlid(Integer flid) {
		this.flid = flid;
	}

	public String getFlmc() {
		return flmc;
	}

	public void setFlmc(String flmc) {
		this.flmc = flmc;
	}

	public String getJcbm() {
		return jcbm;
	}

	public void setJcbm(String jcbm) {
		this.jcbm = jcbm;
	}

	public String getJcbh() {
		return jcbh;
	}

	public void setJcbh(String jcbh) {
		this.jcbh = jcbh;
	}
	
	@JSON(format="yyyy-MM-dd")
	public Date getJcrq() {
		return jcrq;
	}

	public void setJcrq(Date jcrq) {
		this.jcrq = jcrq;
	}

	public Integer getJczq() {
		return jczq;
	}

	public void setJczq(Integer jczq) {
		this.jczq = jczq;
	}
	public String getSbshry() {
		return this.sbshry;
	}

	public void setSbshry(String sbshry) {
		this.sbshry = sbshry;
	}
	@JSON(format="yyyy-MM-dd")
	public Date getSbshsj() {
		return this.sbshsj;
	}

	public void setSbshsj(Date sbshsj) {
		this.sbshsj = sbshsj;
	}

	public String getSbshyj() {
		return this.sbshyj;
	}

	public void setSbshyj(String sbshyj) {
		this.sbshyj = sbshyj;
	}

	public String getSbflag() {
		return this.sbflag;
	}

	public void setSbflag(String sbflag) {
		this.sbflag = sbflag;
	}
}