
// 简单的定义拖动Panel的一些效果
Ext.ux.Portlet = Ext.extend(Ext.Panel, {
			anchor : '100%',
			collapsible : true,// 可以折叠
			draggable : true,// 可以移动
			style : "margin-bottom:10px;"
		});
Ext.reg('portlet', Ext.ux.Portlet);
// 定义布局
Ext.ux.PortalColumn = Ext.extend(Ext.Container, {
			layout : 'anchor',
			autoEl : 'div',
			defaultType : 'portlet',
			cls : 'x-portal-column'
		});
Ext.reg('portalcolumn', Ext.ux.PortalColumn);

Ext.ux.Portal = Ext.extend(Ext.Panel, {
			layout : 'column',
			autoScroll : true,
			style : "margin-bottom:10px;",
			defaultType : 'portalcolumn',

			initComponent : function() {
				Ext.ux.Portal.superclass.initComponent.call(this);
				this.addEvents({
							validatedrop : true,
							beforedragover : true,
							dragover : true,
							beforedrop : true,
							drop : true
						});
			},

			initEvents : function() {
				Ext.ux.Portal.superclass.initEvents.call(this);
				this.dd = new Ext.ux.Portal.DropZone(this, this.dropConfig);
			}
		});
Ext.reg('portal', Ext.ux.Portal);

// 定义一个拖放目标
Ext.ux.Portal.DropZone = function(portal, cfg) {
	this.portal = portal;
	Ext.dd.ScrollManager.register(portal.body);
	Ext.ux.Portal.DropZone.superclass.constructor.call(this, portal.bwrap.dom, cfg);
	portal.body.ddScrollConfig = this.ddScrollConfig;
};

Ext.extend(Ext.ux.Portal.DropZone, Ext.dd.DropTarget, {
			ddScrollConfig : {
				vthresh : 50,
				hthresh : -1,
				increment : 200
			},// 一些属性

			createEvent : function(dd, e, data, col, c, pos) {
				return {
					portal : this.portal,
					panel : data.panel,
					columnIndex : col,
					column : c,
					position : pos,
					data : data,
					source : dd,
					rawEvent : e,
					status : this.dropAllowed
				};
			},
			// 当拖放源位于目标源上时
			notifyOver : function(dd, e, data) {
				var xy = e.getXY(), portal = this.portal, px = dd.proxy;
				// case column widths
				if (!this.grid) {
					this.grid = this.getGrid();
				}

				// handle case scroll where scrollbars appear during drag
				var cw = portal.body.dom.clientWidth;
				if (!this.lastCW) {
					this.lastCW = cw;
				} else if (this.lastCW != cw) {
					this.lastCW = cw;
					portal.doLayout();
					this.grid = this.getGrid();
				}

				// determine column
				var col = 0, xs = this.grid.columnX, cmatch = false;
				for (var len = xs.length; col < len; col++) {
					if (xy[0] < (xs[col].x + xs[col].w)) {
						cmatch = true;
						break;
					}
				}
				// no match, fix last index
				if (!cmatch) {
					col--;
				}

				// find insert position
				var p, match = false, pos = 0, c = portal.items.itemAt(col), items = c.items.items;

				for (var len = items.length; pos < len; pos++) {
					p = items[pos];
					var h = p.el.getHeight();
					if (h !== 0 && (p.el.getY() + (h / 2)) > xy[1]) {
						match = true;
						break;
					}
				}

				var overEvent = this.createEvent(dd, e, data, col, c, match && p ? pos : c.items.getCount());

				if (portal.fireEvent('validatedrop', overEvent) !== false && portal.fireEvent('beforedragover', overEvent) !== false) {

					// make sure proxy width is fluid
					px.getProxy().setWidth('auto');

					if (p) {
						px.moveProxy(p.el.dom.parentNode, match ? p.el.dom : null);
					} else {
						px.moveProxy(c.el.dom, null);
					}

					this.lastPos = {
						c : c,
						col : col,
						p : match && p ? pos : false
					};
					this.scrollPos = portal.body.getScroll();

					portal.fireEvent('dragover', overEvent);

					return overEvent.status;;
				} else {
					return overEvent.status;
				}

			},
			// 当一个拖放源从目标源离开但没有放下时调用.
			notifyOut : function() {
				delete this.grid;
			},
			// 拖放的目标已经被放下时执行的方法
			notifyDrop : function(dd, e, data) {
				delete this.grid;
				if (!this.lastPos) {
					return;
				}
				var c = this.lastPos.c, col = this.lastPos.col, pos = this.lastPos.p;

				var dropEvent = this.createEvent(dd, e, data, col, c, pos !== false ? pos : c.items.getCount());

				if (this.portal.fireEvent('validatedrop', dropEvent) !== false && this.portal.fireEvent('beforedrop', dropEvent) !== false) {

					dd.proxy.getProxy().remove();
					dd.panel.el.dom.parentNode.removeChild(dd.panel.el.dom);
					if (pos !== false) {
						c.insert(pos, dd.panel);
					} else {
						c.add(dd.panel);
					}
					c.doLayout();
					this.portal.fireEvent('drop', dropEvent);

					// scroll position is lost on drop, fix it
					var st = this.scrollPos.top;
					if (st) {
						var d = this.portal.body.dom;
						setTimeout(function() {
									d.scrollTop = st;
								}, 10);
					}

				}
				delete this.lastPos;
			},

			// internal cache of body and column coords
			getGrid : function() {
				var box = this.portal.bwrap.getBox();
				box.columnX = [];
				this.portal.items.each(function(c) {
							box.columnX.push({
										x : c.el.getX(),
										w : c.el.getWidth()
									});
						});
				return box;
			}
		});

var portlets = {};
var tools = [{
			id : "refresh",
			handler : function(event, tb, panel) {
				var update = panel.body.getUpdater();
				if (update)
					update.refresh();
			}
		}, {
			id : 'close',
			handler : function(e, target, panel) {
				panel.ownerCt.remove(panel, true);
			}
		}];
portlets["currentUser"] = {
	id : "currentUser",
	title : '当前用户',
	tools : tools,
	html : "用户名:ccc"
}
portlets["announce"] = {
	id : "announce",
	title : '通知公告',
	tools : tools
}

portlets["announce"].autoLoad = "announce.ejf?cmd=portalList";

portlets["msg"] = {
	id : "msg",
	title : '短消息',
	tools : tools,
	html : ""
}
portlets["workItem"] = {
	id : "workItem",
	title : '待办事项',
	tools : tools
}

portlets["workItem"].autoLoad = "waitWorkItem.ejf?cmd=portalList";

portlets["news"] = {
	id : "news",
	title : '公司新闻',
	tools : tools
}

portlets["news"].autoLoad = "news.ejf?cmd=portalList";

portlets["plan"] = {
	id : "plan",
	title : '工作计划',
	tools : tools,
	html : ""
};
portlets["links"] = {
	id : "links",
	title : '快捷方式',
	tools : tools,
	html : "<p><a href='#'>考勤登记</a></p>" + "<p><a href='#'>写工作日志</a></p>" + "<p><a href='#'>添加公告</a></p>"
}
PortletWin = Ext.extend(Ext.Window, {
			title : "添加模块",
			width : 400,
			height : 140,
			modal : true,
			closeAction : "hide",
			show : function(t) {
				PortletWin.superclass.show.call(this, t);
				this.fp.form.reset();
				this.changeType(this.fp.form.findField("types"));
			},
			types : [["系统模块", "system"], ["自定义模块", "other"]],
			cols : [["1", 0], ["2", 1], ["3", 2]],
			systemPortlets : [["通知公告", "announce"], ["短消息", "msg"], ["待办事项", "workItem"], ["公司新闻", "news"], ["工作计划", "plan"], ["快捷方式", "links"], ["用·ä¿¡æ¯", "currentUser"]],
			defaults : {
				border : false
			},
			buttonAlign : 'center',
			handler : function(col, row, id, config) {
			},
			save : function() {
				var row = this.fp.form.findField("row").getValue();
				var col = this.fp.form.findField("col").getValue();
				var id, config;
				if (this.fp.form.findField("types").getValue() == "system") {
					id = this.fp.form.findField("portlet").getValue();
					if (!id) {
						Ext.Msg.alert("æç¤º", "å¿é¡»éæ©ä¸ä¸ªæ¨¡å", function() {
									this.fp.form.findField("portlet").focus();
								}, this);
						return;
					}
				} else {
					id = id = this.fp.form.findField("id").getValue();
					var title = this.fp.form.findField("title").getValue();
					var url = this.fp.form.findField("url").getValue();
					var html = this.fp.form.findField("intro").getValue();
					config = {
						id : id,
						title : title,
						url : url,
						html : html
					};
					// æ§è¡éªè¯
					if (!id) {
						Ext.Msg.alert("æç¤º", "è¯·è¾åºæ¨¡åIDå·", function() {
									this.fp.form.findField("id").focus();
								}, this);
						return;
					}
					if (!title) {
						Ext.Msg.alert("æç¤º", "è¯·è¾åºæ¨¡ååç§°", function() {
									this.fp.form.findField("title").focus();
								}, this);
						return;
					}
					if (!url && !html) {
						Ext.Msg.alert("æç¤º", "æ¨¡åè¿æ¥å°åæHTMLå¿é¡»å¡«åä¸é¡¹!", function() {
									this.fp.form.findField("url").focus();
								}, this);
						return;
					}
				}

				this.handler.call(this.scope ? this.scope : this, col, row, id, config);
			},
			setHandler : function(handler) {
				this.handler = handler;
			},
			setScope : function(scope) {
				this.scope = scope;
			},
			changeType : function(c) {
				var v = c.getValue();
				if (v == "system") {
					this.fp.findSomeThing("customize").hide();
					this.fp.findSomeThing("urlSpan").hide();
					this.fp.findSomeThing("introSpan").hide();
					this.fp.findSomeThing("portletSpan").show();
					this.setHeight(140);
				} else {
					this.fp.findSomeThing("customize").show();
					this.fp.findSomeThing("urlSpan").show();
					this.fp.findSomeThing("introSpan").show();
					this.fp.findSomeThing("portletSpan").hide();
					this.setHeight(250);
				}
			},
			createFormPanel : function() {
				return new Ext.form.FormPanel({
							bodyStyle : 'padding-top:6px',
							defaultType : 'textfield',
							labelAlign : 'right',
							labelWidth : 60,
							border : false,
							labelPad : 0,
							frame : true,
							defaults : {
								selectOnFocus : true
							},
							items : [{
										xtype : "panel",
										layout : 'column',
										defaults : {
											border : false,
											labelWidth : 60
										},
										items : [{
													layout : "form",
													width : 180,
													items : {
														xtype : "combo",
														name : "types",
														width : 110,
														hiddenName : "types",
														fieldLabel : "æ¨¡åç±»å",
														displayField : "title",
														valueField : "value",
														value : "system",
														store : new Ext.data.SimpleStore({
																	fields : ['title', 'value'],
																	data : this.types
																}),
														editable : false,
														mode : 'local',
														triggerAction : 'all',
														emptyText : 'è¯·éæ©...',
														listeners : {
															select : this.changeType,
															scope : this
														}
													}
												}, {
													id : "portletSpan",
													layout : "form",
													width : 180,
													items : {
														xtype : "combo",
														name : "portlet",
														width : 110,
														hiddenName : "portlet",
														fieldLabel : "æ¨¡å",
														displayField : "title",
														valueField : "value",
														store : new Ext.data.SimpleStore({
																	fields : ['title', 'value'],
																	data : this.systemPortlets
																}),
														editable : false,
														mode : 'local',
														triggerAction : 'all',
														emptyText : 'è¯·éæ©...'
													}
												}]
									},

									{
										id : "customize",
										xtype : "panel",
										hidden : true,
										layout : 'column',
										defaults : {
											border : false,
											labelWidth : 60
										},
										items : [{
													layout : "form",
													width : 180,
													items : {
														width : 110,
														xtype : "textfield",
														name : 'id',
														fieldLabel : 'ID'
													}
												}, {
													layout : "form",
													width : 180,
													items : {
														width : 110,
														xtype : "textfield",
														name : 'title',
														fieldLabel : '模块名称'
													}
												}]
									}, {
										xtype : "panel",
										layout : 'column',
										defaults : {
											border : false,
											labelWidth : 60
										},
										items : [{
													layout : "form",
													width : 180,
													items : {
														xtype : "combo",
														name : "col",
														width : 110,
														hiddenName : "col",
														fieldLabel : "列位置",
														displayField : "title",
														valueField : "value",
														value : 0,
														store : new Ext.data.SimpleStore({
																	fields : ['title', 'value'],
																	data : this.cols
																}),
														mode : 'local',
														triggerAction : 'all',
														emptyText : '请选择...'
													}
												}, {
													layout : "form",
													width : 180,
													items : {
														xtype : "combo",
														name : "row",
														width : 110,
														value : 0,
														hiddenName : "row",
														fieldLabel : "行位置",
														displayField : "title",
														valueField : "value",
														store : new Ext.data.SimpleStore({
																	fields : ['title', 'value'],
																	data : this.cols
																}),
														mode : 'local',
														triggerAction : 'all',
														emptyText : '请选择...'
													}
												}]
									}, {
										xtype : "panel",
										id : "urlSpan",
										hidden : true,
										layout : "form",
										items : {
											xtype : "textfield",
											width : 300,
											name : 'url',
											fieldLabel : '内容连接'
										}
									}, {
										xtype : "panel",
										id : "introSpan",
										hidden : true,
										layout : "form",
										items : {
											xtype : "textarea",
											width : 300,
											name : 'intro',
											fieldLabel : '自定义HTML'
										}
									}

							]
						});
			},
			initComponent : function() {
				this.keys = {
					key : Ext.EventObject.ENTER,
					fn : this.save,
					scope : this
				};
				PortletWin.superclass.initComponent.call(this);
				this.fp = this.createFormPanel();
				this.add(this.fp);
				this.addButton('确定', this.save, this);
				this.addButton('取消', function() {
							this.hide();
						}, this);
			}
		});