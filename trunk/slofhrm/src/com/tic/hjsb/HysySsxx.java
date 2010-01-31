package com.tic.hjsb;

import java.util.Date;

import org.apache.struts2.json.annotations.JSON;

/**
 * HysySsxx entity. @author MyEclipse Persistence Tools
 */

public class HysySsxx implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer lbid;
	private Integer ssid;
	private String ssmc;
	private String ssjj;
	private String ssbh;
	private String jzdw;
	private String ggxh;
	private String azdd;
	private String tcrq;
	private String yxzt;
	private String jyqk;
	private String jcbm;
	private String jcbh;
	private Date jcrq;
	private Integer jczq;
	private Date ndrq;
	private Date xcrq;
	private String jybz;
	private Date lrrq;
	private String ssshry;
	private Date ssshsj;
	private String ssshyj;
	private String ssflag;
	private Integer lrdwId;
	private String lbmc;
	private String lrdwMc;
	private Integer flid;
	private String flmc;

	// Constructors

	/** default constructor */
	public HysySsxx() {
	}

	/** full constructor */
	public HysySsxx(Integer lbid, Integer ssid, String ssmc, String ssjj, String ssbh, String jzdw, String ggxh, String azdd, String tcrq, String yxzt, String jyqk, Date ndrq, Date xcrq, Date lrrq, String ssshry, Date ssshsj, String ssshyj, Integer lrdwId,Integer flid, String flmc) {
		this.lbid = lbid;
		this.ssid = ssid;
		this.ssmc = ssmc;
		this.ssjj = ssjj;
		this.ssbh = ssbh;
		this.jzdw = jzdw;
		this.ggxh = ggxh;
		this.azdd = azdd;
		this.tcrq = tcrq;
		this.yxzt = yxzt;
		this.jyqk = jyqk;
		this.ndrq = ndrq;
		this.xcrq = xcrq;
		this.lrrq = lrrq;
		this.ssshry = ssshry;
		this.ssshsj = ssshsj;
		this.ssshyj = ssshyj;
		this.lrdwId = lrdwId;
		this.flid = flid;
		this.flmc = flmc;
	}

	// Property accessors

	public String getFlmc() {
		return flmc;
	}

	public void setFlmc(String flmc) {
		this.flmc = flmc;
	}
	public Integer getFlid() {
		return flid;
	}

	public void setFlid(Integer flid) {
		this.flid = flid;
	}
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

	public Integer getSsid() {
		return this.ssid;
	}

	public void setSsid(Integer ssid) {
		this.ssid = ssid;
	}

	public String getSsmc() {
		return this.ssmc;
	}

	public void setSsmc(String ssmc) {
		this.ssmc = ssmc;
	}

	public String getSsjj() {
		return this.ssjj;
	}

	public void setSsjj(String ssjj) {
		this.ssjj = ssjj;
	}

	public String getSsbh() {
		return this.ssbh;
	}

	public void setSsbh(String ssbh) {
		this.ssbh = ssbh;
	}

	public String getJzdw() {
		return this.jzdw;
	}

	public void setJzdw(String jzdw) {
		this.jzdw = jzdw;
	}

	public String getGgxh() {
		return this.ggxh;
	}

	public void setGgxh(String ggxh) {
		this.ggxh = ggxh;
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

	public Date getNdrq() {
		return this.ndrq;
	}

	public void setNdrq(Date ndrq) {
		this.ndrq = ndrq;
	}

	@JSON(format="yyyy-MM-dd")
	public Date getXcrq() {
		return this.xcrq;
	}

	public void setXcrq(Date xcrq) {
		this.xcrq = xcrq;
	}
	
	public String getJybz() {
		return jybz;
	}

	public void setJybz(String jybz) {
		this.jybz = jybz;
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

	public String getSsshry() {
		return this.ssshry;
	}

	public void setSsshry(String ssshry) {
		this.ssshry = ssshry;
	}
	@JSON(format="yyyy-MM-dd")
	public Date getSsshsj() {
		return this.ssshsj;
	}
	
	public void setSsshsj(Date ssshsj) {
		this.ssshsj = ssshsj;
	}

	public String getSsshyj() {
		return this.ssshyj;
	}

	public void setSsshyj(String ssshyj) {
		this.ssshyj = ssshyj;
	}

	public String getSsflag() {
		return this.ssflag;
	}

	public void setSsflag(String ssflag) {
		this.ssflag = ssflag;
	}
	
}