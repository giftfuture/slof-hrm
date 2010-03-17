WorkerArchivePanel = Ext.extend(EasyJF.Ext.CrudPanel, {
			viewWin : {
				width : 700,
				height : 520,
				title : "详情查看"
			},
			searchWin : {
				width : 600,
				height : 275,
				title : "高级查询"
			},
			id : "workerArchivePanel",
			baseUrl : "workerArchive.ejf",
			sexInfo : [["男", "男"], ["女", "女"]],
			workTypesData : [["专职", "专职"], ["兼职", "兼职"]],
			marriageInfo : [["未婚", "未婚"], ["已婚", "已婚"], ["离异", "离异"], ["丧偶", "丧偶"]],
			politicsInfo : [["团员", "团员"], ["党员", "党员"]],
			statusInfo : [["在职员工", "1"], ["离职员工", "0"]],
			createForm : function() {
				var a = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 70,
							layout : "fit",
							labelAlign : "right",
							fileUpload : true,
							items : [{
										xtype : "tabpanel",
										activeTab : 0,
										deferredRender : false,
										listeners : {
											tabchange : function(c, b) {
												b.doLayout()
											}
										},
										items : [{
													title : "基本信息",
													frame : true,
													items : [{
																xtype : "fieldset",
																autoHeight : true,
																items : [EasyJF.Ext.Util.oneColumnPanelBuild(Ext.apply({}, {
																							listeners : {
																								select : function(e, d, b) {
																									this.fp.findSomeThing("name").setValue(d.get("name"));
																									this.fp.findSomeThing("tel").setValue(d.get("tel"));
																									if (d.get("duty")) {
																										this.fp.findSomeThing("duty").setValue(d.get("duty").title)
																									}
																									if (d.get("dept")) {
																										this.fp.findSomeThing("dept").setValue(d.get("dept").title)
																									}
																								},
																								scope : this
																							},
																							name : "employee",
																							hiddenName : "employee",
																							fieldLabel : "对应用户"
																						}, ConfigConst.CRM.user), Ext.apply({}, {
																							listeners : {
																								select : function(b) {
																									if (b.getValue()) {
																										Ext.Ajax.request({
																													url : "talentTank.ejf?cmd=view",
																													params : {
																														id : b.getValue()
																													},
																													waitMsg : "正在加载数据,请稍侯...",
																													callback : function(d, f, c) {
																														var e = Ext.decode(c.responseText);
																														e.birthdayType = 0;
																														delete e.id;
																														this.fp.form.setValues(e);
																														this.fp.findSomeThing("photoBox").body.update("<img src='" + (e.pic ? e.pic : "/images/wu.gif") + "' width='150' height='150' />");
																														this.fp.findSomeThing("achievement").store.loadData(e.achievements ? e.achievements : [{}]);
																														this.fp.findSomeThing("prize").store.loadData(e.prize ? e.prize : [{}]);
																														this.fp.findSomeThing("educationExperience").store.loadData(e.educationExperience ? e.educationExperience : [{}]);
																														this.fp.findSomeThing("workExperience").store.loadData(e.workingExperience ? e.workingExperience : [{}])
																													},
																													scope : this
																												})
																									}
																								},
																								scope : this
																							}
																						}, EasyJF.Ext.Util.buildRemoteCombox("talentTank", "人才库导入", "talentTank.ejf?cmd=autocompleteList", ["id", "userName", "sn"], "userName", "id", true)), {
																					fieldLabel : "入职时间",
																					name : "joinTime",
																					xtype : "datefield",
																					format : "Y-m-d",
																					width : 159
																				}), EasyJF.Ext.Util.oneColumnPanelBuild({
																					fieldLabel : "工作岗位",
																					name : "workStation"
																				}, EasyJF.Ext.Util.buildCombox("workType", "工作方式", this.workTypesData, "", true), {
																					fieldLabel : "工作地点",
																					name : "workPlace"
																				})]
															}, {
																xtype : "fieldset",
																frame : true,
																autoHeight : true,
																defaults : {
																	xtype : "textfield"
																},
																items : [{
																			name : "id",
																			xtype : "hidden"
																		}, {
																			name : "pic",
																			xtype : "hidden"
																		}, {
																			xtype : "panel",
																			layout : "column",
																			items : [{
																						xtype : "fieldset",
																						autoHeight : true,
																						border : false,
																						columnWidth : 0.75,
																						items : [EasyJF.Ext.Util.twoColumnPanelBuild({
																									fieldLabel : "姓名",
																									name : "userName",
																									allowBlank : false
																								}, {
																									fieldLabel : "档案编号",
																									name : "sn"
																								}, EasyJF.Ext.Util.buildCombox("sex", "性别", this.sexInfo, "", true), {
																									fieldLabel : "身份证号",
																									name : "identity"
																								}, {
																									fieldLabel : "联系电话",
																									name : "contactPhone",
																									allowBlank : false
																								}, {
																									fieldLabel : "联系地址",
																									name : "contactAddress"
																								}, {
																									fieldLabel : "出生日期",
																									name : "birthDay",
																									xtype : "datefield",
																									format : "Y-m-d"
																								}, EasyJF.Ext.Util.buildCombox("birthdayType", "生日类型", [["阳历", 0], ["阴历", 1], 0]), {
																									fieldLabel : "电子邮件",
																									name : "email",
																									vtype : "email",
																									vtypeText : "不是一个有效的email",
																									emptyText : "请输入有效的email地址",
																									xtype : "textfield"
																								}, {
																									xtype : "textfield",
																									fieldLabel : "视力",
																									name : "eyesight"
																								}, {
																									xtype : "textfield",
																									fieldLabel : "身高",
																									name : "height"
																								}, {
																									xtype : "textfield",
																									fieldLabel : "体重",
																									name : "weight"
																								}, {
																									fieldLabel : "现居住地",
																									name : "address",
																									xtype : "textfield"
																								}, {
																									xtype : "textfield",
																									fieldLabel : "血型",
																									name : "blood"
																								}, {
																									xtype : "textfield",
																									fieldLabel : "健康状况",
																									name : "health"
																								}, {
																									fieldLabel : "婚姻状况",
																									name : "isMarriage",
																									xtype : "combo",
																									hiddenName : "isMarriage",
																									displayField : "title",
																									valueField : "value",
																									store : new Ext.data.SimpleStore({
																												fields : ["title", "value"],
																												data : this.marriageInfo
																											}),
																									editable : false,
																									mode : "local",
																									triggerAction : "all",
																									emptyText : "请选择..."
																								}, {
																									fieldLabel : "政治面貌",
																									name : "politics",
																									xtype : "combo",
																									hiddenName : "politics",
																									displayField : "title",
																									valueField : "value",
																									store : new Ext.data.SimpleStore({
																												fields : ["title", "value"],
																												data : this.politicsInfo
																											}),
																									editable : false,
																									mode : "local",
																									triggerAction : "all",
																									emptyText : "请选择..."
																								})]
																					}, {
																						border : false,
																						xtype : "fieldset",
																						labelWidth : 60,
																						autoHeight : true,
																						columnWidth : 0.25,
																						items : [{
																									xtype : "fieldset",
																									title : "个人照片",
																									labelWidth : 60,
																									autoHeight : true,
																									items : [{
																												height : 160,
																												id : "photoBox",
																												autoScroll : true,
																												html : '<img id="photo" src="" width="150" height="160" />'
																											}]
																								}, {
																									layout : "form",
																									items : {
																										anchor : "100%",
																										xtype : "fileuploadfield",
																										emptyText : "单击右侧上传按钮选择文件......",
																										fieldLabel : "上传照片",
																										name : "pic",
																										buttonCfg : {
																											text : "",
																											iconCls : "upload-icon"
																										}
																									}
																								}]
																					}]
																		}]
															}, {
																xtype : "fieldset",
																autoHeight : true,
																items : [EasyJF.Ext.Util.oneColumnPanelBuild({
																			xtype : "labelfield",
																			fieldLabel : "用户名",
																			name : "name"
																		}, {
																			xtype : "labelfield",
																			fieldLabel : "所在部门",
																			name : "dept"
																		}, {
																			xtype : "labelfield",
																			fieldLabel : "职务",
																			name : "duty"
																		}, {
																			xtype : "labelfield",
																			fieldLabel : "电话",
																			name : "tel"
																		})]
															}]
												}, {
													title : "详细信息",
													frame : true,
													items : [{
																xtype : "fieldset",
																frame : true,
																autoHeight : true,
																labelWidth : 80,
																defaults : {
																	xtype : "textfield"
																},
																items : [EasyJF.Ext.Util.oneColumnPanelBuild({
																					fieldLabel : "毕业学校",
																					name : "school"
																				}, {
																					fieldLabel : "毕业时间",
																					name : "graduateTime",
																					xtype : "datefield",
																					format : "Y-m-d"
																				}, {
																					fieldLabel : "所学专业",
																					name : "speciality"
																				}), EasyJF.Ext.Util.oneColumnPanelBuild({
																					fieldLabel : "最高学历",
																					name : "maxDegree"
																				}, {
																					fieldLabel : "学位",
																					name : "degree"
																				}, {
																					fieldLabel : "技术职称",
																					name : "technique"
																				}), EasyJF.Ext.Util.oneColumnPanelBuild({
																					fieldLabel : "现从事岗位",
																					name : "station"
																				}, {
																					fieldLabel : "从事专业",
																					name : "workSpeciality"
																				}, {
																					fieldLabel : "专业年限",
																					name : "workYear"
																				}), EasyJF.Ext.Util.oneColumnPanelBuild({
																					fieldLabel : "户口所在地",
																					name : "household"
																				}, {
																					fieldLabel : "第一外语",
																					name : "firstLanguage"
																				}, {
																					fieldLabel : "第一外语水平",
																					name : "firstlevel"
																				}), EasyJF.Ext.Util.oneColumnPanelBuild({
																					fieldLabel : "第二外语水平",
																					name : "secLevel"
																				}, {
																					fieldLabel : "第二外语",
																					name : "secLanguage"
																				}, {
																					xtype : "labelfield",
																					hideLabel : true
																				})]
															}, {
																xtype : "fieldset",
																frame : true,
																autoHeight : true,
																labelWidth : 80,
																items : [{
																			xtype : "textarea",
																			name : "intro",
																			labelWidth : 20,
																			height : 100,
																			anchor : "-20",
																			labelSeparator : "",
																			fieldLabel : "个人简介"
																		}, {
																			fieldLabel : "业绩或特长",
																			xtype : "textarea",
																			name : "workSuit",
																			anchor : "-20",
																			height : 100,
																			labelSeparator : ""
																		}]
															}]
												}, {
													title : "个人履历",
													layout : "anchor",
													items : [{
																anchor : "100% 50%",
																layout : "fit",
																items : new Ext.grid.EditorGridPanel({
																			title : "工作经历",
																			id : "workExperience",
																			loadMask : true,
																			autoExpandColumn : 2,
																			clicksToEdit : 1,
																			border : false,
																			viewConfig : {
																				forceFit : true
																			},
																			store : new Ext.data.JsonStore({
																						data : [{}],
																						fields : ["id", "edate", "sdate", "station", "unit", "witness", "witnessTel"]
																					}),
																			cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
																								header : "序号",
																								width : 40
																							}), {
																						header : "id",
																						dataIndex : "id",
																						hidden : true
																					}, {
																						header : "开始时间",
																						dataIndex : "edate",
																						width : 100,
																						editor : new Ext.form.DateField({
																									format : "Y-m-d"
																								}),
																						renderer : this.dateRender("Y-m-d")
																					}, {
																						header : "结束时间",
																						dataIndex : "sdate",
																						width : 100,
																						editor : new Ext.form.DateField({
																									format : "Y-m-d"
																								}),
																						renderer : this.dateRender("Y-m-d")
																					}, {
																						header : "工作单位",
																						width : 120,
																						dataIndex : "unit",
																						editor : new Ext.form.TextField()
																					}, {
																						header : "从事工作",
																						width : 200,
																						dataIndex : "station",
																						editor : new Ext.form.TextField()
																					}, {
																						header : "证明人",
																						width : 80,
																						dataIndex : "witness",
																						editor : new Ext.form.TextField()
																					}, {
																						header : "证明人联系电话",
																						width : 150,
																						dataIndex : "witnessTel",
																						editor : new Ext.form.TextField()
																					}]),
																			bbar : [{
																						text : "增加",
																						handler : function() {
																							var b = this.fp.findSomeThing("workExperience");
																							EasyJF.Ext.Util.addGridRow(b, ["id", "edate", "sdate", "station", "unit", "witness", "witnessTel"], {
																										id : "",
																										edate : "",
																										sdate : "",
																										station : "",
																										unit : "",
																										witness : "",
																										witnessTel : ""
																									})
																						},
																						scope : this
																					}, {
																						text : "删除",
																						handler : function() {
																							var b = this.fp.findSomeThing("workExperience");
																							if (b) {
																								EasyJF.Ext.Util.removeGridRow(b)
																							}
																						},
																						scope : this
																					}]
																		})
															}, {
																anchor : "100% 50%",
																layout : "fit",
																items : new Ext.grid.EditorGridPanel({
																			title : "教育经历",
																			id : "educationExperience",
																			clicksToEdit : 1,
																			viewConfig : {
																				forceFit : true
																			},
																			store : new Ext.data.JsonStore({
																						data : [{}],
																						fields : ["id", "beginnTime", "school", "endTime", "speciality", "degree"]
																					}),
																			cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
																								header : "序号",
																								width : 40
																							}), {
																						header : "id",
																						dataIndex : "id",
																						hidden : true
																					}, {
																						header : "开始时间",
																						dataIndex : "beginnTime",
																						width : 100,
																						editor : new Ext.form.DateField({
																									format : "Y-m-d"
																								}),
																						renderer : this.dateRender("Y-m-d")
																					}, {
																						header : "结束时间",
																						dataIndex : "endTime",
																						width : 100,
																						editor : new Ext.form.DateField({
																									format : "Y-m-d"
																								}),
																						renderer : this.dateRender("Y-m-d")
																					}, {
																						header : "院校",
																						width : 150,
																						dataIndex : "school",
																						editor : new Ext.form.TextField()
																					}, {
																						header : "专业",
																						width : 150,
																						dataIndex : "speciality",
																						editor : new Ext.form.TextField()
																					}, {
																						header : "学位",
																						width : 150,
																						dataIndex : "degree",
																						editor : new Ext.form.TextField()
																					}]),
																			loadMask : true,
																			border : false,
																			bbar : [{
																						text : "增加",
																						handler : function() {
																							var b = this.fp.findSomeThing("educationExperience");
																							EasyJF.Ext.Util.addGridRow(b, ["id", "beginnTime", "endTime", "school", "speciality", "degree"], {
																										id : "",
																										school : "",
																										beginnTime : "",
																										endTime : "",
																										speciality : "",
																										degree : ""
																									})
																						},
																						scope : this
																					}, {
																						text : "删除",
																						handler : function() {
																							var b = this.fp.findSomeThing("educationExperience");
																							if (b) {
																								EasyJF.Ext.Util.removeGridRow(b)
																							}
																						},
																						scope : this
																					}]
																		})
															}]
												}, {
													title : "业绩.项目/奖项.证书",
													layout : "anchor",
													items : [{
																anchor : "100% 50%",
																layout : "fit",
																items : [new Ext.grid.EditorGridPanel({
																			title : "资质奖项证书荣誉",
																			id : "prize",
																			loadMask : true,
																			clicksToEdit : 1,
																			border : false,
																			viewConfig : {
																				forceFit : true
																			},
																			store : new Ext.data.JsonStore({
																						data : [{}],
																						fields : ["id", "name", "unit", "vdate"]
																					}),
																			cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
																								header : "序号",
																								width : 40
																							}), {
																						header : "id",
																						dataIndex : "id",
																						hidden : true
																					}, {
																						header : "证书/奖项名称",
																						dataIndex : "name",
																						width : 200,
																						editor : new Ext.form.TextField()
																					}, {
																						header : "发证单位",
																						dataIndex : "unit",
																						width : 150,
																						editor : new Ext.form.TextField()
																					}, {
																						header : "荣获时间",
																						width : 100,
																						dataIndex : "vdate",
																						editor : new Ext.form.DateField({
																									format : "Y-m-d"
																								}),
																						renderer : this.dateRender("Y-m-d")
																					}]),
																			bbar : [{
																						text : "增加",
																						handler : function() {
																							var b = this.fp.findSomeThing("prize");
																							EasyJF.Ext.Util.addGridRow(b, ["id", "name", "unit", "vdate"], {
																										id : "",
																										name : "",
																										vdate : "",
																										unit : ""
																									})
																						},
																						scope : this
																					}, {
																						text : "删除",
																						handler : function() {
																							var b = this.fp.findSomeThing("prize");
																							if (b) {
																								EasyJF.Ext.Util.removeGridRow(b)
																							}
																						},
																						scope : this
																					}]
																		})]
															}, {
																anchor : "100% 50%",
																layout : "fit",
																items : [new Ext.grid.EditorGridPanel({
																			title : "项目及业绩",
																			id : "achievement",
																			loadMask : true,
																			clicksToEdit : 1,
																			border : false,
																			viewConfig : {
																				forceFit : true
																			},
																			store : new Ext.data.JsonStore({
																						data : [{}],
																						fields : ["id", "beginTime", "endTime", "content", "role", "remark"]
																					}),
																			cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
																								header : "序号",
																								width : 40
																							}), {
																						header : "id",
																						dataIndex : "id",
																						hidden : true
																					}, {
																						header : "开始时间",
																						dataIndex : "beginTime",
																						width : 100,
																						editor : new Ext.form.DateField({
																									format : "Y-m-d"
																								}),
																						renderer : this.dateRender("Y-m-d")
																					}, {
																						header : "结束时间",
																						dataIndex : "endTime",
																						width : 100,
																						editor : new Ext.form.DateField({
																									format : "Y-m-d"
																								}),
																						renderer : this.dateRender("Y-m-d")
																					}, {
																						header : "项目名称及内容等",
																						width : 120,
																						dataIndex : "content",
																						editor : new Ext.form.TextField()
																					}, {
																						header : "本人担任角色",
																						width : 120,
																						dataIndex : "role",
																						editor : new Ext.form.TextField()
																					}, {
																						header : "备注说明",
																						width : 120,
																						dataIndex : "remark",
																						editor : new Ext.form.TextField()
																					}]),
																			bbar : [{
																						text : "增加",
																						handler : function() {
																							var b = this.fp.findSomeThing("achievement");
																							EasyJF.Ext.Util.addGridRow(b, ["id", "beginTime", "endTime", "content", "role", "remark"], {
																										id : "",
																										beginTime : "",
																										endTime : "",
																										content : "",
																										role : "",
																										remark : ""
																									})
																						},
																						scope : this
																					}, {
																						text : "删除",
																						handler : function() {
																							var b = this.fp.findSomeThing("achievement");
																							if (b) {
																								EasyJF.Ext.Util.removeGridRow(b)
																							}
																						},
																						scope : this
																					}]
																		})]
															}]
												}, {
													title : "家庭关系",
													layout : "fit",
													items : [new Ext.grid.EditorGridPanel({
																id : "familyGrid",
																clicksToEdit : 1,
																store : new Ext.data.JsonStore({
																			data : [{}],
																			fields : ["id", "appellation", "pname", "career", "familyAddress", "familyPhone", "isEmergency"]
																		}),
																cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
																					header : "序号",
																					width : 40
																				}), {
																			header : "id",
																			dataIndex : "id",
																			hidden : true
																		}, {
																			header : "称谓",
																			dataIndex : "appellation",
																			width : 80,
																			editor : new Ext.form.TextField()
																		}, {
																			header : "姓名",
																			dataIndex : "pname",
																			width : 120,
																			editor : new Ext.form.TextField()
																		}, {
																			header : "职业",
																			dataIndex : "career",
																			width : 120,
																			editor : new Ext.form.TextField()
																		}, {
																			header : "联系地址",
																			dataIndex : "familyAddress",
																			width : 100,
																			editor : new Ext.form.TextField()
																		}, {
																			header : "联系电话",
																			dataIndex : "familyPhone",
																			width : 100,
																			editor : new Ext.form.TextField()
																		}, {
																			header : "紧急联系人",
																			dataIndex : "isEmergency",
																			width : 50,
																			editor : new Ext.form.TextField()
																		}]),
																loadMask : true,
																autoExpandColumn : 2,
																border : false,
																bbar : [{
																			text : "增加",
																			handler : function() {
																				var b = this.fp.findSomeThing("familyGrid");
																				EasyJF.Ext.Util.addGridRow(b, ["id", "appellation", "pname", "career", "familyAddress", "familyPhone", "isEmergency"], {
																							id : "",
																							appellation : "",
																							pname : "",
																							career : "",
																							familyAddress : "",
																							familyPhone : "",
																							isEmergency : ""
																						})
																			},
																			scope : this
																		}, {
																			text : "删除",
																			handler : function() {
																				var b = this.fp.findSomeThing("familyGrid");
																				if (b) {
																					EasyJF.Ext.Util.removeGridRow(b)
																				}
																			},
																			scope : this
																		}]
															})]
												}, {
													title : "人事变动",
													layout : "fit",
													items : [new Ext.grid.EditorGridPanel({
																id : "turnover",
																clicksToEdit : 1,
																viewConfig : {
																	forceFit : true
																},
																store : new Ext.data.JsonStore({
																			data : [{}],
																			fields : ["stationChangeTime", "id", "stationChangeStation", "stationChangeDepartment", "stationChangeRemark"]
																		}),
																cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
																					header : "序号",
																					width : 40
																				}), {
																			header : "id",
																			dataIndex : "id",
																			hidden : true
																		}, {
																			header : "调动日期",
																			dataIndex : "stationChangeTime",
																			width : 100,
																			editor : new Ext.form.DateField({
																						format : "Y-m-d"
																					}),
																			renderer : this.dateRender("Y-m-d")
																		}, {
																			header : "前往职位",
																			dataIndex : "stationChangeStation",
																			width : 120,
																			editor : new Ext.form.TextField()
																		}, {
																			header : "前往部门",
																			dataIndex : "stationChangeDepartment",
																			width : 120,
																			editor : new Ext.form.TextField()
																		}, {
																			header : "调动说明",
																			dataIndex : "stationChangeRemark",
																			width : 300,
																			editor : new Ext.form.TextField()
																		}]),
																loadMask : true,
																autoExpandColumn : 4,
																border : false,
																bbar : [{
																			text : "增加",
																			handler : function() {
																				var b = this.fp.findSomeThing("turnover");
																				EasyJF.Ext.Util.addGridRow(b, ["stationChangeTime", "id", "stationChangeStation", "stationChangeDepartment", "stationChangeRemark"], {
																							stationChangeTime : "",
																							id : "",
																							stationChangeStation : "",
																							stationChangeDepartment : "",
																							stationChangeRemark : ""
																						})
																			},
																			scope : this
																		}, {
																			text : "删除",
																			handler : function() {
																				var b = this.fp.findSomeThing("turnover");
																				if (b) {
																					EasyJF.Ext.Util.removeGridRow(b)
																				}
																			},
																			scope : this
																		}]
															})]
												}, {
													title : "个人合同列表",
													layout : "fit",
													items : [new Ext.grid.EditorGridPanel({
																id : "employeeContract",
																clicksToEdit : 1,
																viewConfig : {
																	forceFit : true
																},
																store : new Ext.data.JsonStore({
																			data : [{}],
																			fields : ["serialNumber", "id", "sdate", "edate", "salary", "confer", "remark"]
																		}),
																cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
																					header : "序号",
																					width : 40
																				}), {
																			header : "id",
																			dataIndex : "id",
																			hidden : true
																		}, {
																			header : "编号",
																			dataIndex : "serialNumber",
																			width : 100,
																			editor : new Ext.form.TextField()
																		}, {
																			header : "签订时间",
																			dataIndex : "sdate",
																			width : 120,
																			editor : new Ext.form.DateField({
																						format : "Y-m-d"
																					}),
																			renderer : this.dateRender("Y-m-d")
																		}, {
																			header : "有效期",
																			dataIndex : "edate",
																			width : 120,
																			editor : new Ext.form.DateField({
																						format : "Y-m-d"
																					}),
																			renderer : this.dateRender("Y-m-d")
																		}, {
																			header : "薪水",
																			dataIndex : "salary",
																			width : 100,
																			editor : new Ext.form.NumberField()
																		}, {
																			header : "保密协议",
																			dataIndex : "confer",
																			width : 80,
																			editor : new Ext.form.NumberField()
																		}, {
																			header : "备注",
																			dataIndex : "remark",
																			width : 300,
																			editor : new Ext.form.TextField()
																		}]),
																loadMask : true,
																border : false,
																bbar : [{
																			text : "增加",
																			handler : function() {
																				var b = this.fp.findSomeThing("employeeContract");
																				EasyJF.Ext.Util.addGridRow(b, ["serialNumber", "id", "sdate", "edate", "salary", "confer", "remark"], {
																							serialNumber : "",
																							id : "",
																							sdate : "",
																							edate : "",
																							salary : "",
																							confer : "",
																							remark : ""
																						})
																			},
																			scope : this
																		}, {
																			text : "删除",
																			handler : function() {
																				var b = this.fp.findSomeThing("employeeContract");
																				if (b) {
																					EasyJF.Ext.Util.removeGridRow(b)
																				}
																			},
																			scope : this
																		}]
															})]
												}]
									}]
						});
				return a
			},
			searchFormPanel : function() {
				var a = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 80,
							labelAlign : "right",
							items : [{
										xtype : "fieldset",
										title : "查询条件",
										height : 190,
										layout : "column",
										items : [{
													columnWidth : 0.5,
													layout : "form",
													defaultType : "textfield",
													items : [{
																fieldLabel : "员工姓名",
																name : "userName",
																anchor : "90%"
															}, {
																fieldLabel : "身份证号",
																name : "identity",
																anchor : "90%"
															}, {
																fieldLabel : "联系电话",
																name : "contactPhone",
																anchor : "90%"
															}, {
																fieldLabel : "电é®ä»¶",
																name : "email",
																anchor : "90%"
															}, {
																fieldLabel : "è¾å¥æ¥æ(å§)",
																name : "fillStartTime",
																anchor : "90%",
																xtype : "datefield",
																format : "Y-m-d"
															}, {
																fieldLabel : "åºçå¹´æ(å§)",
																name : "birthDay_start",
																anchor : "90%",
																xtype : "datefield",
																format : "Y-m-d"
															}]
												}, {
													columnWidth : 0.5,
													layout : "form",
													defaultType : "textfield",
													defaults : {
														width : 130
													},
													items : [{
																anchor : "90%",
																name : "isMarriage",
																xtype : "combo",
																hiddenName : "isMarriage",
																fieldLabel : "å©å§»ç¶åµ",
																displayField : "title",
																valueField : "value",
																store : new Ext.data.SimpleStore({
																			fields : ["title", "value"],
																			data : this.marriageInfo
																		}),
																editable : false,
																mode : "local",
																triggerAction : "all",
																emptyText : "è¯·éæ©..."
															}, {
																anchor : "90%",
																name : "politics",
																xtype : "combo",
																hiddenName : "politics",
																fieldLabel : "æ¿æ²»é¢è²",
																displayField : "title",
																valueField : "value",
																store : new Ext.data.SimpleStore({
																			fields : ["title", "value"],
																			data : this.politicsInfo
																		}),
																editable : false,
																mode : "local",
																triggerAction : "all",
																emptyText : "è¯·éæ©..."
															}, {
																anchor : "90%",
																name : "sex",
																xtype : "combo",
																hiddenName : "sex",
																fieldLabel : "æ§&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;å«",
																displayField : "title",
																valueField : "value",
																store : new Ext.data.SimpleStore({
																			fields : ["title", "value"],
																			data : this.sexInfo
																		}),
																editable : false,
																mode : "local",
																triggerAction : "all",
																emptyText : "è¯·éæ©..."
															}, {
																anchor : "90%",
																name : "status",
																xtype : "combo",
																hiddenName : "status",
																fieldLabel : "å½åç¶æ",
																displayField : "title",
																valueField : "value",
																store : new Ext.data.SimpleStore({
																			fields : ["title", "value"],
																			data : this.statusInfo
																		}),
																editable : false,
																mode : "local",
																triggerAction : "all",
																emptyText : "è¯·éæ©..."
															}, {
																fieldLabel : "è¾å¥æ¥æ(æ«)",
																name : "fillEndTime",
																anchor : "90%",
																xtype : "datefield",
																format : "Y-m-d"
															}, {
																fieldLabel : "åºçå¹´æ(æ«)",
																name : "birthDay_End",
																anchor : "90%",
																xtype : "datefield",
																format : "Y-m-d"
															}]
												}]
									}]
						});
				return a
			},
			createViewPanel : function() {
				var a = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 90,
							layout : "fit",
							labelAlign : "right",
							items : [{
										xtype : "tabpanel",
										activeTab : 0,
										deferredRender : false,
										listeners : {
											tabchange : function(c, b) {
												b.doLayout()
											}
										},
										items : [{
													title : "åºæ¬ä¿¡æ¯",
													bodyStyle : "padding-top:10px;background:#F5F5F5",
													layout : "column",
													items : [{
																layout : "form",
																columnWidth : 0.58,
																bodyStyle : "padding-top:5px",
																items : [{
																			fieldLabel : "èº«ä»½è¯å·",
																			name : "identity",
																			anchor : "80%",
																			xtype : "textfield"
																		}, {
																			fieldLabel : "åºçæ¥æ",
																			name : "birthDay",
																			xtype : "datefield",
																			anchor : "80%",
																			format : "Yå¹´mædæ¥"
																		}, {
																			fieldLabel : "èç³»å°å",
																			name : "contactAddress",
																			anchor : "80%",
																			xtype : "textfield"
																		}, {
																			fieldLabel : "çµå­é®ä»¶",
																			name : "email",
																			vtype : "email",
																			vtypeText : "ä¸æ¯ä¸ä¸ªææçemail",
																			emptyText : "è¯·è¾å¥ææçemailå°å",
																			anchor : "80%",
																			xtype : "textfield"
																		}, {
																			layout : "column",
																			items : [{
																						columnWidth : 0.34,
																						layout : "form",
																						items : [{
																									fieldLabel : "æ§&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;å«",
																									xtype : "radio",
																									name : "sex",
																									boxLabel : "ç·"
																								}]
																					}, {
																						columnWidth : 0.15,
																						layout : "form",
																						items : [{
																									xtype : "radio",
																									name : "sex",
																									boxLabel : "å¥³",
																									hideLabel : true
																								}]
																					}, {
																						columnWidth : 0.51,
																						layout : "form",
																						labelWidth : 55,
																						items : [{
																									fieldLabel : "é®&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ç¼",
																									name : "zip",
																									anchor : "61%",
																									xtype : "numberfield"
																								}]
																					}]
																		}, {
																			layout : "column",
																			items : [{
																						layout : "form",
																						columnWidth : 0.4,
																						items : [{
																									fieldLabel : "å©å§»ç¶åµ",
																									name : "isMarriage",
																									xtype : "combo",
																									hiddenName : "isMarriage",
																									displayField : "title",
																									valueField : "value",
																									store : new Ext.data.SimpleStore({
																												fields : ["title", "value"],
																												data : this.marriageInfo
																											}),
																									editable : false,
																									mode : "local",
																									triggerAction : "all",
																									emptyText : "è¯·éæ©...",
																									anchor : "100%"
																								}]
																					}, {
																						layout : "form",
																						columnWidth : 0.6,
																						items : [{
																									fieldLabel : "æ¿æ²»é¢è²",
																									name : "politics",
																									xtype : "combo",
																									hiddenName : "politics",
																									displayField : "title",
																									valueField : "value",
																									store : new Ext.data.SimpleStore({
																												fields : ["title", "value"],
																												data : this.politicsInfo
																											}),
																									editable : false,
																									mode : "local",
																									triggerAction : "all",
																									emptyText : "è¯·éæ©...",
																									anchor : "67%"
																								}]
																					}]
																		}, {
																			layout : "column",
																			items : [{
																						layout : "form",
																						columnWidth : 0.4,
																						items : [{
																									fieldLabel : "è§&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;å",
																									name : "eyesight",
																									xtype : "textfield",
																									anchor : "100%"
																								}]
																					}, {
																						layout : "form",
																						columnWidth : 0.6,
																						items : [{
																									fieldLabel : "èº«&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;é«",
																									name : "height",
																									xtype : "textfield",
																									anchor : "67%"
																								}]
																					}]
																		}, {
																			layout : "column",
																			items : [{
																						layout : "form",
																						columnWidth : 0.4,
																						items : [{
																									fieldLabel : "å¥åº·ç¶åµ",
																									name : "health",
																									xtype : "textfield",
																									anchor : "100%"
																								}]
																					}, {
																						layout : "form",
																						columnWidth : 0.6,
																						items : [{
																									fieldLabel : "体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重",
																									name : "weight",
																									xtype : "textfield",
																									anchor : "67%"
																								}]
																					}]
																		}, {
																			fieldLabel : "血&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型",
																			name : "blood",
																			anchor : "80%",
																			xtype : "textfield"
																		}]
															}, {
																columnWidth : 0.37,
																layout : "form",
																labelWidth : 70,
																items : [{
																			title : "个人照片",
																			xtype : "fieldset",
																			height : 190,
																			width : 220,
																			items : [{
																						html : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img id="photo" style="border:1px solid green" src="" width="150" height="160" />'
																					}]
																		}, {
																			fieldLabel : "姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名",
																			name : "userName",
																			xtype : "textfield"
																		}, {
																			fieldLabel : "联系电话",
																			name : "contactPhone",
																			xtype : "textfield"
																		}]
															}, {
																columnWidth : 0.5
															}, {
																columnWidth : 1,
																layout : "form",
																labelWidth : 20,
																items : [{
																			xtype : "textarea",
																			name : "intro",
																			anchor : "98%",
																			labelWidth : 20,
																			height : 100,
																			labelSeparator : "",
																			fieldLabel : "个人简介"
																		}]
															}]
												}, {
													title : "详细信息",
													bodyStyle : "margin-top:10px",
													items : [{
																layout : "column",
																items : [{
																			layout : "form",
																			defaults : {
																				xtype : "textfield",
																				anchor : "85%"
																			},
																			columnWidth : 0.5,
																			items : [{
																						fieldLabel : "毕业学校",
																						name : "school"
																					}, {
																						fieldLabel : "毕业时间",
																						name : "graduateTime",
																						xtype : "datefield",
																						format : "Y-m-d"
																					}, {
																						fieldLabel : "所学专业",
																						name : "speciality"
																					}, {
																						fieldLabel : "最高学历",
																						name : "maxDegree"
																					}, {
																						fieldLabel : "学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位",
																						name : "degree"
																					}, {
																						fieldLabel : "第一外语",
																						name : "firstLanguage"
																					}, {
																						fieldLabel : "第二外语",
																						name : "secLanguage"
																					}]
																		}, {
																			layout : "form",
																			defaults : {
																				xtype : "textfield",
																				anchor : "85%"
																			},
																			columnWidth : 0.5,
																			items : [{
																						fieldLabel : "专业年限",
																						name : "workYear"
																					}, {
																						fieldLabel : "从事专业",
																						name : "workSpeciality"
																					}, {
																						fieldLabel : "技术职称",
																						name : "technique"
																					}, {
																						fieldLabel : "户口所在地",
																						name : "household"
																					}, {
																						fieldLabel : "现从事岗位",
																						name : "station"
																					}, {
																						fieldLabel : "第一外语水平",
																						name : "firstlevel"
																					}, {
																						fieldLabel : "第二外语水平",
																						name : "secLevel"
																					}]
																		}]
															}, {
																xtype : "panel",
																layout : "form",
																labelWidth : 20,
																items : [{
																			fieldLabel : "业绩或特长",
																			xtype : "textarea",
																			name : "workSuit",
																			anchor : "98%",
																			height : 140,
																			labelSeparator : ""
																		}]
															}]
												}, {
													title : "家庭关系",
													layout : "fit",
													items : [new Ext.grid.EditorGridPanel({
																id : "family",
																store : this.store,
																cm : this.cm,
																loadMask : true,
																autoExpandColumn : 2,
																border : false,
																tbar : [{
																			text : "增加",
																			handler : this.addST,
																			scope : this
																		}, {
																			text : "删除",
																			handler : this.delST,
																			scope : this
																		}, {
																			text : "刷新",
																			handler : this.F5,
																			scope : this
																		}]
															})]
												}, {
													title : "教育经历",
													layout : "fit",
													items : [new Ext.grid.EditorGridPanel({
																id : "educationExperience",
																store : this.store,
																cm : this.cm,
																loadMask : true,
																autoExpandColumn : 2,
																border : false,
																tbar : [{
																			text : "增加",
																			handler : this.addST,
																			scope : this
																		}, {
																			text : "删除",
																			handler : this.delST,
																			scope : this
																		}, {
																			text : "刷新",
																			handler : this.F5,
																			scope : this
																		}]
															})]
												}, {
													title : "工作经历",
													layout : "fit",
													items : [new Ext.grid.EditorGridPanel({
																id : "workingExperience",
																store : this.store,
																cm : this.cm,
																loadMask : true,
																autoExpandColumn : 2,
																border : false,
																tbar : [{
																			text : "增加",
																			handler : this.addST,
																			scope : this
																		}, {
																			text : "删除",
																			handler : this.delST,
																			scope : this
																		}, {
																			text : "刷新",
																			handler : this.F5,
																			scope : this
																		}]
															})]
												}, {
													title : "奖项荣誉",
													layout : "fit",
													items : [new Ext.grid.EditorGridPanel({
																id : "prize",
																store : this.store,
																cm : this.cm,
																loadMask : true,
																autoExpandColumn : 2,
																border : false,
																tbar : [{
																			text : "增加",
																			handler : this.addST,
																			scope : this
																		}, {
																			text : "删除",
																			handler : this.delST,
																			scope : this
																		}, {
																			text : "刷新",
																			handler : this.F5,
																			scope : this
																		}]
															})]
												}, {
													title : "人事变动",
													layout : "fit",
													items : [new Ext.grid.EditorGridPanel({
																id : "turnover",
																store : this.store,
																cm : this.cm,
																loadMask : true,
																autoExpandColumn : 2,
																border : false,
																tbar : [{
																			text : "增加",
																			handler : this.addST,
																			scope : this
																		}, {
																			text : "删除",
																			handler : this.delST,
																			scope : this
																		}, {
																			text : "刷新",
																			handler : this.F5,
																			scope : this
																		}]
															})]
												}, {
													title : "个人合同列表",
													layout : "fit",
													items : [new Ext.grid.EditorGridPanel({
																id : "employeeContract",
																store : this.store,
																cm : this.cm,
																loadMask : true,
																autoExpandColumn : 2,
																border : false,
																tbar : [{
																			text : "增加",
																			handler : this.addST,
																			scope : this
																		}, {
																			text : "删除",
																			handler : this.delST,
																			scope : this
																		}, {
																			text : "刷新",
																			handler : this.F5,
																			scope : this
																		}]
															})]
												}]
									}]
						});
				return a
			},
			createWin : function() {
				return this.initWin(750, 520, "员工详细档案管理")
			},
			create : function() {
				WorkerArchivePanel.superclass.create.call(this);
				this.fp.findSomeThing("achievement").store.loadData([{}]);
				this.fp.findSomeThing("prize").store.loadData([{}]);
				this.fp.findSomeThing("educationExperience").store.loadData([{}]);
				this.fp.findSomeThing("workExperience").store.loadData([{}]);
				this.fp.findSomeThing("familyGrid").store.loadData([{}]);
				this.fp.findSomeThing("turnover").store.loadData([{}]);
				this.fp.findSomeThing("employeeContract").store.loadData([{}]);
				this.fp.findSomeThing("photoBox").body.update("<img src='/images/wu.gif' width='150' height='150' />");
				this.fp.doLayout()
			},
			edit : function() {
				var b = WorkerArchivePanel.superclass.edit.call(this);
				if (b) {
					var a = this.grid.getSelectionModel().getSelected();
					this.fp.findSomeThing("photoBox").body.update("<img src='" + (a.get("pic") ? a.get("pic") : "/images/wu.gif") + "' width='150' height='150' />");
					this.fp.findSomeThing("achievement").store.loadData(a && a.get("achievements") ? a.get("achievements") : [{}]);
					this.fp.findSomeThing("prize").store.loadData(a && a.get("prize") ? a.get("prize") : [{}]);
					this.fp.findSomeThing("educationExperience").store.loadData(a && a.get("educationExperience") ? a.get("educationExperience") : [{}]);
					this.fp.findSomeThing("workExperience").store.loadData(a && a.get("workingExperience") ? a.get("workingExperience") : [{}]);
					this.fp.findSomeThing("familyGrid").store.loadData(a && a.get("family") ? a.get("family") : [{}]);
					this.fp.findSomeThing("turnover").store.loadData(a && a.get("turnover") ? a.get("turnover") : [{}]);
					this.fp.findSomeThing("employeeContract").store.loadData(a && a.get("employeeContract") ? a.get("employeeContract") : [{}])
				}
			},
			view : function() {
				var c = WorkerArchivePanel.superclass.view.call(this);
				if (c) {
					var a = this.grid.getSelectionModel().getSelected();
					var b = a.get("pic");
					var d = "/images/wu.gif";
					if (b) {
						Ext.getDom("photo").src = b
					} else {
						Ext.getDom("photo").src = d
					}
				}
			},
			save : function() {
				var a = {};
				Ext.apply(a, EasyJF.Ext.Util.getEditGridData(this.fp.findSomeThing("achievement"), "achievement_", "content"));
				Ext.apply(a, EasyJF.Ext.Util.getEditGridData(this.fp.findSomeThing("prize"), "prize_", "name"));
				Ext.apply(a, EasyJF.Ext.Util.getEditGridData(this.fp.findSomeThing("educationExperience"), "educationExperience_", "school"));
				Ext.apply(a, EasyJF.Ext.Util.getEditGridData(this.fp.findSomeThing("workExperience"), "workExperience_", "unit"));
				Ext.apply(a, EasyJF.Ext.Util.getEditGridData(this.fp.findSomeThing("familyGrid"), "family_", "pname"));
				Ext.apply(a, EasyJF.Ext.Util.getEditGridData(this.fp.findSomeThing("turnover"), "turnover_", "stationChangeStation"));
				Ext.apply(a, EasyJF.Ext.Util.getEditGridData(this.fp.findSomeThing("employeeContract"), "employeeContract_", "serialNumber"));
				this.fp.form.baseParams = a;
				WorkerArchivePanel.superclass.save.call(this)
			},
			sexType : function(a) {
				if (a == "男") {
					return "男"
				} else {
					if (a == "女") {
						return "女"
					} else {
						return "未知"
					}
				}
			},
			statusType : function(a) {
				if (a) {
					return '<span style="color:green">在职员工</span>'
				} else {
					return '<span style="color:blue">离职员工</span>'
				}
			},
			storeMapping : ["id", "employee", "sn", "userName", "identity", "birthDay", "sex", "height", "weight", "blood", "eyesight", "isMarriage", "politics", "health", "family", "workingExperience", "prize", "achievements", "educationExperience", "turnover", "employeeContract", "maxDegree", "degree", "pic", "graduateTime", "school", "speciality", "station", "workSpeciality", "workYear", "technique", "address", "household", "firstLanguage", "firstlevel", "secLanguage", "secLevel", "contactAddress", "zip", "contactPhone", "email", "workSuit", "intro", "fillTime", "status", "joinTime", "outTime", "workStation", "workPlace", "workType", "birthdayType", "talentTank"],
			initComponent : function() {
				this.cm = new Ext.grid.ColumnModel([{
							header : "姓名",
							sortable : true,
							width : 50,
							dataIndex : "userName"
						}, {
							header : "性别",
							sortable : true,
							width : 40,
							dataIndex : "sex",
							renderer : this.sexType
						}, {
							header : "出生年月",
							sortable : true,
							width : 80,
							dataIndex : "birthDay",
							renderer : this.dateRender("Y-m-d")
						}, {
							header : "身份证",
							sortable : true,
							width : 100,
							dataIndex : "identity"
						}, {
							header : "电话",
							sortable : true,
							width : 80,
							dataIndex : "contactPhone"
						}, {
							header : "email",
							sortable : true,
							width : 100,
							dataIndex : "email"
						}, {
							header : "登记时间",
							sortable : true,
							width : 100,
							dataIndex : "fillTime",
							renderer : this.dateRender("Y-m-d")
						}, {
							header : "状态",
							sortable : true,
							width : 60,
							dataIndex : "status",
							renderer : this.statusType
						}, {
							header : "简介",
							sortable : true,
							width : 300,
							dataIndex : "intro"
						}]);
				WorkerArchivePanel.superclass.initComponent.call(this)
			}
		});