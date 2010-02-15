package com.tic.hrm;

/**
 * HysyLb entity. @author MyEclipse Persistence Tools
 */

public class HysyLb implements java.io.Serializable {

	// Fields

	private Integer id;
	private String name;
	private Integer parentid;
	private Integer type;

	// Constructors

	/** default constructor */
	public HysyLb() {
	}

	/** full constructor */
	public HysyLb(String name, Integer parentid, Integer type) {
		this.name = name;
		this.parentid = parentid;
		this.type = type;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getParentid() {
		return this.parentid;
	}

	public void setParentid(Integer parentid) {
		this.parentid = parentid;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

}