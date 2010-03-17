TalentTankPanel = Ext.extend(EasyJF.Ext.CrudListPanel, {
			baseUrl : "talentTank.ejf",
			viewWin : {
				width : 700,
				height : 520,
				title : "详情查看"
			},
			searchWin : {
				width : 628,
				height : 260,
				title : "高级查询"
			},
			pageSize : 20,
			exportData : true,
			gridForceFit : false,
			sexInfo : [["男", "男"], ["女", "女"]],
			workTypesData : [["专职", "专职"], ["兼职", "兼职"]],
			marriageInfo : [["未婚", "未婚"], ["已婚", "已婚"], ["离异", "离异"], ["丧偶", "丧偶"]],
			politicsInfo : [["团员", "团员"], ["党员", "党员"]],
			statusData : [["待处理", 0], ["已经通知", 1], ["已笔试", 2], ["已面试", 3], ["已经录取", 11], ["已经淘汰", 10], ["作废", -1]],
			searchFormPanel : function() {
				var a = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 75,
							labelAlign : "right",
							layout : "fit",
							autoHeight : true,
							items : [{
										xtype : "fieldset",
										title : "查询条件",
										autoHeight : true,
										items : [EasyJF.Ext.Util.twoColumnPanelBuild({
													fieldLabel : "姓名",
													name : "userName"
												}, EasyJF.Ext.Util.buildCombox("sex", "性别", this.sexInfo, "", true), EasyJF.Ext.Util.buildCombox("status", "状态", this.statusData, null, true), Ext.apply({}, {
															fieldLabel : "已参加笔试",
															name : "haveExam",
															hiddenName : "haveExam",
															disableChoice : false,
															value : null
														}, ConfigConst.BASE.yesNo), ConfigConst.BASE.getCompanyDictionaryCombo("workStation", "应聘岗位", "TalentWorkStation", "title"), {
													name : "nextStep",
													fieldLabel : "下一步"
												}, {
													name : "school",
													fieldLabel : "毕业院校"
												}, {
													name : "email",
													fieldLabel : "电子邮件"
												}, {
													name : "contactPhone",
													fieldLabel : "联系电话"
												})]
									}]
						});
				return a
			},
			createForm : function() {
				var a = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 70,
							layout : "fit",
							labelAlign : "right",
							fileUpload : true,
							items : [new Ext.TabPanel({
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
																frame : true,
																autoHeight : true,
																defaults : {
																	xtype : "textfield"
																},
																items : [{
																			name : "id",
																			xtype : "hidden"
																		}, {
																			name : "cmd",
																			xtype : "hidden"
																		}, {
																			name : "companyId",
																			xtype : "hidden"
																		}, {
																			xtype : "panel",
																			layout : "column",
																			items : [{
																						columnWidth : 0.75,
																						items : [EasyJF.Ext.Util.twoColumnPanelBuild({
																									fieldLabel : "姓名",
																									name : "userName",
																									allowBlank : false
																								}, {
																									fieldLabel : "编号",
																									name : "sn"
																								}, {
																									xtype : "smartcombo",
																									fieldLabel : "人才类型",
																									name : "types",
																									hiddenName : "types",
																									editable : false,
																									displayField : "title",
																									valueField : "id",
																									lazyRender : true,
																									triggerAction : "all",
																									typeAhead : true,
																									store : new Ext.data.JsonStore({
																												id : "id",
																												url : "talentTankType.ejf?cmd=list",
																												root : "result",
																												totalProperty : "rowCount",
																												remoteSort : true,
																												baseParams : {
																													pageSize : "-1"
																												},
																												fields : ["id", "title"]
																											})
																								}, EasyJF.Ext.Util.buildCombox("sex", "性别", this.sexInfo, "", true), {
																									fieldLabel : "身份证号",
																									name : "identity"
																								}, {
																									fieldLabel : "出生日期",
																									name : "birthDay",
																									xtype : "datefield",
																									format : "Y-m-d"
																								}, {
																									fieldLabel : "联系电话",
																									name : "contactPhone",
																									allowBlank : false
																								}, {
																									fieldLabel : "联系地址",
																									name : "contactAddress"
																								}, {
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
																frame : true,
																autoHeight : true,
																defaults : {
																	xtype : "textfield"
																},
																items : [EasyJF.Ext.Util.oneColumnPanelBuild(ConfigConst.BASE.getCompanyDictionaryCombo("workStation", "应聘岗位", "TalentWorkStation", "title"), EasyJF.Ext.Util.buildCombox("workType", "工作方式", this.workTypesData, "", true), {
																					fieldLabel : "月薪要求",
																					name : "demandPay",
																					xtype : "numberfield"
																				}), EasyJF.Ext.Util.oneColumnPanelBuild({
																					fieldLabel : "工作地点",
																					name : "workPlace"
																				}, {
																					fieldLabel : "可到职时间",
																					name : "inWorktime",
																					xtype : "datefield",
																					format : "Y-m-d",
																					width : 159
																				}, {
																					fieldLabel : "住房要求",
																					name : "isHousing"
																				}), {
																			fieldLabel : "其他要求",
																			xtype : "textarea",
																			name : "otherDemande",
																			anchor : "-20",
																			height : 50
																		}]
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
																						editor : new Ext.form.TextArea()
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
												}]
									})]
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
													title : "基本信息",
													bodyStyle : "padding-top:10px;background:#F5F5F5",
													layout : "column",
													items : [{
																layout : "form",
																columnWidth : 0.58,
																bodyStyle : "padding-top:5px",
																items : [{
																			fieldLabel : "身份证号",
																			name : "identity",
																			anchor : "80%",
																			xtype : "textfield"
																		}, {
																			fieldLabel : "出生日期",
																			name : "birthDay",
																			xtype : "datefield",
																			anchor : "80%",
																			format : "Y年m月d日"
																		}, {
																			fieldLabel : "联系地址",
																			name : "contactAddress",
																			anchor : "80%",
																			xtype : "textfield"
																		}, {
																			fieldLabel : "电子邮件",
																			name : "email",
																			vtype : "email",
																			vtypeText : "不是一个有效的email",
																			emptyText : "请输入有效的email地址",
																			anchor : "80%",
																			xtype : "textfield"
																		}, {
																			layout : "column",
																			items : [{
																						columnWidth : 0.34,
																						layout : "form",
																						items : [{
																									fieldLabel : "性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别",
																									xtype : "radio",
																									name : "sex",
																									inputValue : "男",
																									boxLabel : "男"
																								}]
																					}, {
																						columnWidth : 0.15,
																						layout : "form",
																						items : [{
																									xtype : "radio",
																									name : "sex",
																									boxLabel : "女",
																									inputValue : "女",
																									hideLabel : true
																								}]
																					}, {
																						columnWidth : 0.51,
																						layout : "form",
																						labelWidth : 55,
																						items : [{
																									fieldLabel : "人才类型",
																									name : "blood",
																									anchor : "61%",
																									xtype : "textfield"
																								}]
																					}]
																		}, {
																			layout : "column",
																			items : [{
																						layout : "form",
																						columnWidth : 0.4,
																						items : [{
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
																									emptyText : "请选择...",
																									anchor : "100%"
																								}]
																					}, {
																						layout : "form",
																						columnWidth : 0.6,
																						items : [{
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
																									emptyText : "请选择...",
																									anchor : "67%"
																								}]
																					}]
																		}, {
																			layout : "column",
																			items : [{
																						layout : "form",
																						columnWidth : 0.4,
																						items : [{
																									fieldLabel : "视&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;力",
																									name : "eyesight",
																									xtype : "textfield",
																									anchor : "100%"
																								}]
																					}, {
																						layout : "form",
																						columnWidth : 0.6,
																						items : [{
																									fieldLabel : "身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高",
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
																									fieldLabel : "健康状况",
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
																			xtype : "smartcombo",
																			fieldLabel : "人才类型",
																			name : "types",
																			hiddenName : "types",
																			editable : false,
																			displayField : "title",
																			valueField : "id",
																			lazyRender : true,
																			triggerAction : "all",
																			typeAhead : true,
																			anchor : "80%",
																			store : new Ext.data.JsonStore({
																						id : "id",
																						url : "talentTankType.ejf?cmd=list",
																						root : "result",
																						totalProperty : "rowCount",
																						remoteSort : true,
																						baseParams : {
																							pageSize : "-1"
																						},
																						fields : ["id", "title"]
																					})
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
			view : function() {
				var c = TalentTankPanel.superclass.view.call(this);
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
			createWin : function() {
				return this.initWin(750, 520, "公司人才库管理")
			},
			create : function() {
				TalentTankPanel.superclass.create.call(this);
				this.fp.findSomeThing("achievement").store.loadData([{}]);
				this.fp.findSomeThing("prize").store.loadData([{}]);
				this.fp.findSomeThing("educationExperience").store.loadData([{}]);
				this.fp.findSomeThing("workExperience").store.loadData([{}]);
				this.fp.findSomeThing("photoBox").body.update("<img src='/images/wu.gif' width='150' height='150' />");
				this.fp.doLayout()
			},
			edit : function() {
				var b = TalentTankPanel.superclass.edit.call(this);
				if (b) {
					var a = this.grid.getSelectionModel().getSelected();
					this.fp.findSomeThing("photoBox").body.update("<img src='" + (a.get("pic") ? a.get("pic") : "/images/wu.gif") + "' width='150' height='150' />");
					this.fp.findSomeThing("achievement").store.loadData(a && a.get("achievements") ? a.get("achievements") : [{}]);
					this.fp.findSomeThing("prize").store.loadData(a && a.get("prize") ? a.get("prize") : [{}]);
					this.fp.findSomeThing("educationExperience").store.loadData(a && a.get("educationExperience") ? a.get("educationExperience") : [{}]);
					this.fp.findSomeThing("workExperience").store.loadData(a && a.get("workingExperience") ? a.get("workingExperience") : [{}])
				}
			},
			save : function() {
				var a = {};
				Ext.apply(a, EasyJF.Ext.Util.getEditGridData(this.fp.findSomeThing("achievement"), "achievement_", "content"));
				Ext.apply(a, EasyJF.Ext.Util.getEditGridData(this.fp.findSomeThing("prize"), "prize_", "name"));
				Ext.apply(a, EasyJF.Ext.Util.getEditGridData(this.fp.findSomeThing("educationExperience"), "educationExperience_", "school"));
				Ext.apply(a, EasyJF.Ext.Util.getEditGridData(this.fp.findSomeThing("workExperience"), "workExperience_", "unit"));
				this.fp.form.baseParams = a;
				TalentTankPanel.superclass.save.call(this)
			},
			storeMapping : ["id", "employee", "userName", "sn", "identity", "birthDay", "sex", "height", "weight", "blood", "eyesight", "isMarriage", "politics", "health", "family", "workingExperience", "prize", "achievements", "educationExperience", "maxDegree", "degree", "graduateTime", "school", "speciality", "workSpeciality", "workYear", "technique", "address", "household", "firstLanguage", "firstlevel", "secLanguage", "secLevel", "contactAddress", "station", "zip", "contactPhone", "email", "workSuit", "intro", "fillTime", "status", "types", "workStation", "workPlace", "workType", "inWorktime", "pic", "demandPay", "isHousing", "otherDemand", "isWorkerArchive", "otherDemande", "publish", "haveExam", "examScore", "scoreDetail", "hrComment", "managerComment", "nextStep"],
			initComponent : function() {
				this.cm = new Ext.grid.ColumnModel([{
							header : "姓名",
							sortable : true,
							width : 60,
							dataIndex : "userName"
						}, {
							header : "人才类型",
							sortable : true,
							width : 80,
							dataIndex : "types",
							renderer : this.objectRender("title")
						}, {
							header : "毕业院校",
							sortable : true,
							width : 80,
							dataIndex : "school"
						}, {
							header : "工作年限",
							sortable : true,
							width : 60,
							dataIndex : "workYear"
						}, {
							header : "应聘岗位",
							sortable : true,
							width : 100,
							dataIndex : "workStation"
						}, {
							header : "联系方式",
							sortable : true,
							width : 100,
							dataIndex : "contactPhone"
						}, {
							header : "Email",
							sortable : true,
							width : 100,
							dataIndex : "email"
						}, {
							header : "月薪要求",
							sortable : true,
							width : 60,
							dataIndex : "demandPay"
						}, {
							header : "是否公开",
							sortable : true,
							width : 60,
							dataIndex : "publish",
							renderer : this.booleanRender
						}, {
							header : "已参加笔试",
							sortable : true,
							width : 70,
							dataIndex : "haveExam",
							renderer : this.booleanRender
						}, {
							header : "考试得分",
							sortable : true,
							width : 60,
							dataIndex : "examScore",
							hidden : true
						}, {
							header : "状态",
							sortable : true,
							width : 70,
							dataIndex : "status",
							renderer : this.typesRender(this.statusData)
						}, {
							header : "下一步",
							sortable : true,
							width : 80,
							dataIndex : "nextStep"
						}]);
				TalentTankPanel.superclass.initComponent.call(this)
			},
			doComment : function() {
				this.doSomeWork(600, 370, "人才招聘情况备注", "commentPanel", "commentPanelForm", "comment")
			},
			commentPanelForm : function() {
				var a = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 80,
							layout : "form",
							labelAlign : "right",
							items : [{
										title : "",
										xtype : "fieldset",
										autoHeight : true,
										items : [{
													xtype : "hidden",
													name : "id"
												}, EasyJF.Ext.Util.twoColumnPanelBuild(EasyJF.Ext.Util.buildCombox("status", "状态", this.statusData, 0), {
															name : "nextStep",
															fieldLabel : "下一步"
														}, Ext.apply({}, {
																	fieldLabel : "对外公布",
																	name : "publish",
																	hiddenName : "publish"
																}, ConfigConst.BASE.yesNo), Ext.apply({}, {
																	fieldLabel : "已参加笔试",
																	name : "haveExam",
																	hiddenName : "haveExam"
																}, ConfigConst.BASE.yesNo), {
															name : "examScore",
															fieldLabel : "得分"
														}, {
															name : "scoreDetail",
															fieldLabel : "得分详细"
														}), {
													xtype : "textarea",
													name : "hrComment",
													fieldLabel : "人力资源部评",
													width : 450,
													height : 80
												}, {
													xtype : "textarea",
													name : "managerComment",
													fieldLabel : "总经理评语",
													width : 450,
													height : 100
												}]
									}]
						});
				return a
			},
			afterList : function() {
				this.menu.insert(5, new Ext.menu.Item({
									id : "btn_comment",
									text : "添加备注",
									handler : this.doComment,
									scope : this,
									iconCls : "upload-icon"
								}));
				this.grid.on("render", function() {
							this.grid.getTopToolbar().insert(10, [{
												id : "btn_comment",
												text : "添加备注",
												cls : "x-btn-text-icon",
												iconCls : "upload-icon",
												handler : this.doComment,
												scope : this
											}])
						}, this);
				TalentTankPanel.superclass.afterList.call(this)
			}
		});