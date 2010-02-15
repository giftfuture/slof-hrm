package com.tic.hrm;

import java.util.HashSet;
import java.util.Set;

/**
 * XtgltDanwei entity. @author MyEclipse Persistence Tools
 */

public class XtgltDanwei implements java.io.Serializable {

	// Fields

	private Integer id;
	private String name;
	private Integer superior_id;
	private String description;
	private Integer lvl;
	private String hassub;
	private String flag;
	
	// Constructors

	/** default constructor */
	public XtgltDanwei() {
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

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getLvl() {
		return this.lvl;
	}

	public void setLvl(Integer lvl) {
		this.lvl = lvl;
	}

	public String getHassub() {
		return this.hassub;
	}

	public void setHassub(String hassub) {
		this.hassub = hassub;
	}

	public String getFlag() {
		return this.flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public void setSuperior_id(Integer superior_id) {
		this.superior_id = superior_id;
	}

	public Integer getSuperior_id() {
		return superior_id;
	}

}