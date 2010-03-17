TalentTankTypePanel = Ext.extend(EasyJF.Ext.CrudPanel, {
			id : "talentTankTypePanel",
			baseUrl : "talentTankType.ejf",
			createForm : function() {
				var a = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 80,
							labelAlign : "right",
							defaults : {
								width : 320,
								xtype : "textfield"
							},
							items : [{
										xtype : "hidden",
										name : "id"
									}, {
										fieldLabel : "名称",
										name : "title"
									}, {
										xtype : "textarea",
										fieldLabel : "简介",
										name : "info"
									}]
						});
				return a
			},
			createWin : function() {
				return this.initWin(438, 170, "人才类型设置")
			},
			storeMapping : ["id", "title", "info"],
			initComponent : function() {
				this.cm = new Ext.grid.ColumnModel([{
							header : "名称",
							sortable : true,
							width : 300,
							dataIndex : "title"
						}, {
							header : "简介",
							sortable : true,
							width : 300,
							dataIndex : "info"
						}]);
				TalentTankTypePanel.superclass.initComponent.call(this)
			}
		});