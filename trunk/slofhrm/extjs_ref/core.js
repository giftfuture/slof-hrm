/*
 * * 用户信息列表
 */
Ext.BLANK_IMAGE_URL = '/plugins/extjs/ext-2.2/resources/images/default/s.gif';

Ext.namespace("EasyJF.Ext","EasyJF.Ext.Msg");
Ext.apply(Ext,{
       copyTo : function(dest, source, names){
            if(Ext.isString(names)){
                names = names.split(/[,;\s]/);
            }
            Ext.each(names, function(name){
                if(source.hasOwnProperty(name)){
                    dest[name] = source[name];
                }
            }, this);
            return dest;
        },
        copyToIf:function(o,s,notFields){
            notFields = notFields || [];
            for(var p in o){
               if(s.hasOwnProperty(p) && (notFields.indexOf(p)<0)){
                    o[p]=s[p];
               }
            }
        },
        del:function(o){
            var ps = Array.prototype.splice.call(arguments,1);
            Ext.each(ps,function(p){
                delete o[p];
            });
        },
        isString : function(v){
            return typeof v === 'string';
        },
        destroyMembers : function(o, arg1, arg2, etc){
            for(var i = 1, a = arguments, len = a.length; i < len; i++) {
                Ext.destroy(o[a[i]]);
                delete o[a[i]];
            }
        },
        clean : function(arr){
            var ret = [];
            Ext.each(arr, function(v){
                if(!!v){
                    ret.push(v);
                }
            });
            return ret;
        },
       unique : function(arr){
            var ret = [],
                collect = {};

            Ext.each(arr, function(v) {
                if(!collect[v]){
                    ret.push(v);
                }
                collect[v] = true;
            });
            return ret;
        },
        
        flatten : function(arr){
            var worker = [];
            function rFlatten(a) {
                Ext.each(a, function(v) {
                    if(Ext.isArray(v)){
                        rFlatten(v);
                    }else{
                        worker.push(v);
                    }
                });
                return worker;
            }
            return rFlatten(arr);
        },
        pluck : function(arr, prop){
            var ret = [];
            Ext.each(arr, function(v) {
                ret.push( v[prop] );
            });
            return ret;
        },
        pluckFn : function(arr, prop){
            var ret = [],val;
            Ext.each(arr, function(v) {
                if(v.get){
                    ret.push( v.get(prop));
                }else{
                    ret.push(window.undefined);
                }
            });
            return ret;
        },
        intercept : function(o, name, fn, scope){
            o[name] = o[name].createInterceptor(fn, scope);
        },
        sequence : function(o, name, fn, scope){
            o[name] = o[name].createSequence(fn, scope);
        },
        invoke : function(arr, methodName){
            var ret = [],
                args = Array.prototype.slice.call(arguments, 2);
            Ext.each(arr, function(v,i) {
                if (v && Ext.isFunction(v[methodName])) {
                    ret.push(v[methodName].apply(v, args));
                } else {
                    ret.push(undefined);
                }
            });
            return ret;
        },
        objPcount:function(o){
            var count = 0;
            if(typeof o == 'object'){
                for(var p in o){
                    if(o.hasOwnProperty(p)){
                        count++;
                    }
                }
            }
            return count;
        },
        /**
		 * @param {}
		 *            value
		 * @param {}
		 *            保留几位小数
		 * @return {Number}
		 */
        formatMoney:function(v,num){
            if(typeof v!== 'number'){
                var v = parseFloat(v);
                if(isNaN(v))return 0;
            }
            num = num || 0
            return parseFloat(Math.round(v*Math.pow(10,num))/Math.pow(10,num).toFixed(num));
        }
});
Ext.apply(EasyJF.Ext.Msg, {
	error: 'error',
	info: 'info',
	alert: function (msg, title, fn, scope, type) {
		var obj = {
			title: title || '操作提示',
			msg: msg,
			scope: scope || window,
			fn: fn,
			icon: EasyJF.Ext.Msg.getMsgIcon(type),
			buttons: Ext.Msg.OK,
			width: 240
		};
		Ext.Msg.show(obj)
	},
	getMsgIcon: function (type) {
		switch (type) {
		case EasyJF.Ext.Msg.error:
			return Ext.Msg.ERROR;
			break;
		case EasyJF.Ext.Msg.info:
			return Ext.Msg.INFO;
			break;
		default:
			return Ext.MessageBox.INFO;
			return
		}
	}
});
Ext.apply(Ext.form.VTypes, {
	daterange: function (val, field) {
		var date = field.parseDate(val);
		if (!date) {
			return
		}
		if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
			var start = Ext.getCmp(field.startDateField);
			start.setMaxValue(date);
			start.validate();
			this.dateRangeMax = date
		} else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
			var end = Ext.getCmp(field.endDateField);
			end.setMinValue(date);
			end.validate();
			this.dateRangeMin = date
		}
		return true
	}
});

/**
 * @author xiaoxinxin
 */
Ext.override(Ext.form.CheckboxGroup,{
    onRender : function(ct, position) {
        if (!this.el) {
            var panelCfg = {
                cls : this.groupCls,
                layout : 'column',
                border : false,
                renderTo : ct
            };
            var colCfg = {
                defaultType : this.defaultType,
                layout : 'form',
                border : false,
                defaults : {
                    hideLabel : true,
                    name:this.name,
                    anchor : '100%'
                }
            }
            if (this.items[0].items) {
                // The container has standard ColumnLayout configs, so pass them
                // in directly
                Ext.apply(panelCfg, {
                            layoutConfig : {
                                columns : this.items.length
                            },
                            defaults : this.defaults,
                            items : this.items
                        })
                for (var i = 0, len = this.items.length; i < len; i++) {
                    Ext.applyIf(this.items[i], colCfg);
                };

            } else {

                // The container has field item configs, so we have to generate
                // the column
                // panels first then move the items into the columns as needed.

                var numCols, cols = [];

                if (typeof this.columns == 'string') { // 'auto' so create a
                                                        // col per item
                    this.columns = this.items.length;
                }
                if (!Ext.isArray(this.columns)) {
                    var cs = [];
                    for (var i = 0; i < this.columns; i++) {
                        cs.push((100 / this.columns) * .01); // distribute by
                                                                // even %
                    }
                    this.columns = cs;
                }

                numCols = this.columns.length;

                // Generate the column configs with the correct width setting
                for (var i = 0; i < numCols; i++) {
                    var cc = Ext.apply({
                                items : []
                            }, colCfg);
                    cc[this.columns[i] <= 1 ? 'columnWidth' : 'width'] = this.columns[i];
                    if (this.defaults) {
                        cc.defaults = Ext.apply(cc.defaults || {},
                                this.defaults)
                    }
                    cols.push(cc);
                };

                // Distribute the original items into the columns
                if (this.vertical) {
                    var rows = Math.ceil(this.items.length / numCols), ri = 0;
                    for (var i = 0, len = this.items.length; i < len; i++) {
                        if (i > 0 && i % rows == 0) {
                            ri++;
                        }
                        if (this.items[i].fieldLabel) {
                            this.items[i].hideLabel = false;
                        }
                        cols[ri].items.push(this.items[i]);
                    };
                } else {
                    for (var i = 0, len = this.items.length; i < len; i++) {
                        var ci = i % numCols;
                        if (this.items[i].fieldLabel) {
                            this.items[i].hideLabel = false;
                        }
                        cols[ci].items.push(this.items[i]);
                    };
                }

                Ext.apply(panelCfg, {
                            layoutConfig : {
                                columns : numCols
                            },
                            items : cols
                        });
            }

            this.panel = new Ext.Panel(panelCfg);
            this.el = this.panel.getEl();

            if (this.forId && this.itemCls) {
                var l = this.el.up(this.itemCls).child('label', true);
                if (l) {
                    l.setAttribute('htmlFor', this.forId);
                }
            }

            var fields = this.panel.findBy(function(c) {
                        return c.isFormField;
                    }, this);

            this.items = new Ext.util.MixedCollection(false,function(o){
                return o.inputValue || o.value;
            });
            this.items.addAll(fields);
        }
        Ext.form.CheckboxGroup.superclass.onRender.call(this, ct, position);
    },
    getValue:function(){
        var val = [];
        this.items.filter('checked',true).each(function(item){
            val.push(item.inputValue||item.value);
        },this);
        return val;
    },
    getName:function(){
        return this.name || this.id;
    },
    setValue:function(v){
        var arr = [].concat(v);
        this.items.each(function(item){
            item.setValue((arr.indexOf(this.items.getKey(item))>=0));
        },this);
    }
});

Ext.apply(Ext.Container.prototype, {
	findSomeThing: function (id) {
		var m, ct = this;
		this.cascade(function (c) {
			if (ct != c && c.id === id || (c.isFormField && (c.dataIndex == id || c.id == id || c.getName() == id))) {
				m = c;
				return false
			}
		});
		return m || null
	}
});
Ext.apply(Ext.form.ComboBox.prototype, {
	onTriggerClick: function () {
		var disabled = false;
		if (this.ownerCt) this.ownerCt.bubble(function (c) {
			if (c.disabled) disabled = true
		});
		if (this.disabled || disabled) {
			return
		}
		if (this.isExpanded()) {
			this.collapse();
			this.el.focus()
		} else {
			this.onFocus({});
			if (this.triggerAction == 'all') {
				this.doQuery(this.allQuery, true)
			} else {
				this.doQuery(this.getRawValue())
			}
			this.el.focus()
		}
	}
});
Ext.apply(Ext.form.DateField.prototype, {
	onTriggerClick: function () {
		var disabled = false;
		if (this.ownerCt) this.ownerCt.bubble(function (c) {
			if (c.disabled) disabled = true
		});
		if (this.disabled || disabled) {
			return
		}
		if (this.menu == null) {
			this.menu = new Ext.menu.DateMenu()
		}
		Ext.apply(this.menu.picker, {
			minDate: this.minValue,
			maxDate: this.maxValue,
			disabledDatesRE: this.ddMatch,
			disabledDatesText: this.disabledDatesText,
			disabledDays: this.disabledDays,
			disabledDaysText: this.disabledDaysText,
			format: this.format,
			showToday: this.showToday,
			minText: String.format(this.minText, this.formatDate(this.minValue)),
			maxText: String.format(this.maxText, this.formatDate(this.maxValue))
		});
		this.menu.on(Ext.apply({},
		this.menuListeners, {
			scope: this
		}));
		this.menu.picker.setValue(this.getValue() || new Date());
		this.menu.show(this.el, "tl-bl?")
	}
});

Ext.apply(Ext.DatePicker.prototype, {
	handleDateClick: function (e, t) {
		e.stopEvent();
		if (t.dateValue && !Ext.fly(t.parentNode).hasClass("x-date-disabled")) {
			var now = new Date();
			var d = new Date(t.dateValue);
			d.setHours(now.getHours());
			d.setMinutes(now.getMinutes());
			d.setSeconds(now.getSeconds());
			this.setValue(d, true);
			this.fireEvent("select", this, this.value)
		}
	},
	selectToday: function () {
		if (this.todayBtn && !this.todayBtn.disabled) {
			this.setValue(new Date(), true);
			this.fireEvent("select", this, this.value)
		}
	},
	setValue: function (value, keepTime) {
		var old = this.value;
		this.value = keepTime ? value: value.clearTime(true);
		if (this.el) {
			this.update(this.value)
		}
	}
});
Ext.form.LabelField = Ext.extend(Ext.form.Field, {
	defaultAutoCreate: {
		tag: 'div'
	},
	fieldClass: "x-form-item-label",
	style: "padding-top:3px",
	onRender: function (ct, position) {
		Ext.form.LabelField.superclass.onRender.call(this, ct, position);
		this.el.dom.name = this.initialConfig.name;
		this.el.dom.value = ''
	},
	setValue: function (v) {
		Ext.form.LabelField.superclass.setValue.call(this, v);
		var t = v;
		if (this.renderer) t = this.renderer(v);
		if (typeof t == window.undefined) t = '';
		this.el.update(t)
	},
	markInvalid: Ext.emptyFn,
	clearInvalid: Ext.emptyFn
});
Ext.reg('labelfield', Ext.form.LabelField);
Ext.apply(Ext.form.ComboBox.prototype, {
	PleaseSelectedValue: "--PleaseSelectedValue--",
	PleaseSelectedText: "--请选择--",
	disableChoice: false,
	reload: function () {
		this.store.reload()
	},
	bindStore: function (store, initial) {
		if (this.store && !initial) {
			this.store.un('beforeload', this.onBeforeLoad, this);
			this.store.un('load', this.onLoad, this);
			this.store.un('loadexception', this.collapse, this);
			if (!store) {
				this.store = null;
				if (this.view) {
					this.view.setStore(null)
				}
			}
		}
		if (store) {
			this.store = Ext.StoreMgr.lookup(store);
			if (this.view) {
				this.view.setStore(store)
			}
			if (this.store.data.getCount() > 0 && (this.allowBlank || this.nullText) && !this.disableChoice) {
				var o = {};
				o[this.valueField] = this.PleaseSelectedValue;
				var nullText = this.nullText ? this.nullText: this.PleaseSelectedText;
				this.nullText = nullText;
				o[this.displayField] = nullText;
				this.store.insert(0, new Ext.data.Record(o))
			}
			if (!this.lastOptions) {
				this.store.on('beforeload', this.onBeforeLoad, this);
				this.store.on('loadexception', this.collapse, this);
				if ((this.allowBlank || this.nullText) && !this.disableChoice) {
					this.store.on("load", function (A, B) {
						var o = {};
						o[this.valueField] = this.PleaseSelectedValue;
						o[this.displayField] = this.nullText ? this.nullText: this.PleaseSelectedText;
						this.nullText = nullText;
						if (this.store && this.store.insert && this.store.find(this.valueField, o[this.valueField]) < 0) this.store.insert(0, new Ext.data.Record(o))
					},
					this)
				}
				this.store.on('load', this.onLoad, this)
			}
		}
	},
	setValue: function (v) {
		var text = v;
		if (this.valueField) {
			var r = this.findRecord(this.valueField, v);
			if (r) {
				text = r.data[this.displayField]
			} else if (this.valueNotFoundText !== undefined) {
				text = this.valueNotFoundText
			}
		}
		this.lastSelectionText = text;
		if (this.hiddenField) {
			this.hiddenField.value = (v == this.PleaseSelectedValue ? "": v)
		}
		Ext.form.ComboBox.superclass.setValue.call(this, text);
		this.value = v
	},
	getValue: function () {
		if (this.value == this.PleaseSelectedValue || this.value == this.nullText) {
			return ""
		} else if (this.valueField) {
			return typeof this.value != 'undefined' ? this.value: ''
		} else {
			return Ext.form.ComboBox.superclass.getValue.call(this)
		}
	}
});
Ext.apply(Ext.Toolbar.prototype, {
	getValues: function () {
		var c = this;
		var values = {};
		if (!c.items || !c.items.getCount()) return values;
		c.items.each(function (item) {
			if (item.isFormField) {
				var name = (item.name || item.id || item.itemId);
				var v = item.getValue();
				if (v instanceof Date) v = v.format('Y-m-d');
				values[name] = v
			}
		},
		this);
		return values
	},
	insert: function (index, item) {
		if (item instanceof Array) {
			var buttons = [];
			for (var i = 0, len = item.length; i < len; i++) {
				buttons.push(this.insert(index + i, item[i]))
			}
			return buttons
		}
		var td = document.createElement("td");
		if (this.tr.childNodes.length <= index) index = this.tr.childNodes.length - 1;
		this.tr.insertBefore(td, this.tr.childNodes[index]);
		this.initMenuTracking(item);
		if (item.isFormField) {
			item.render(td);
			var ti = new Ext.Toolbar.Item(td.firstChild);
			ti.render(td)
		} else if (item.render) {
			item.render(td)
		} else if (typeof item == "string") {
			if (item == "separator" || item == "-") {
				item = new Ext.Toolbar.Separator()
			} else if (item == " ") {
				item = new Ext.Toolbar.Spacer()
			} else if (item == "->") {
				item = new Ext.Toolbar.Fill()
			} else {
				item = new Ext.Toolbar.TextItem(item)
			}
			item.render(td)
		} else if (item.tagName) {
			item = new Ext.Toolbar.Item(item)
		} else if (typeof item == "object") {
			if (item.xtype) {
				item = (Ext.ComponentMgr.create(item, 'button'))
			} else {
				item = new Ext.Toolbar.Button(item)
			}
			item.render(td)
		}
		this.items.insert(index, item);
		return item
	}
});

SearchField = Ext.extend(Ext.form.TwinTriggerField, {
	initComponent: function () {
		if (!this.store.baseParams) {
			this.store.baseParams = {}
		}
		SearchField.superclass.initComponent.call(this);
		this.addEvents('beforeClick');
		this.on('specialkey', function (f, e) {
			if (e.getKey() == e.ENTER) {
				this.onTrigger2Click()
			}
		},
		this)
	},
	validationEvent: false,
	validateOnBlur: false,
	emptyText: '内容关键字......',
	trigger1Class: 'x-form-clear-trigger',
	trigger2Class: 'x-form-search-trigger',
	hideTrigger1: true,
	width: 180,
	hasSearch: false,
	paramName: 'searchKey',
	reset: function () {
		this.el.dom.value = '';
		this.triggers[0].hide();
		this.hasSearch = false;
		SearchField.superclass.reset.call(this)
	},
	onTrigger1Click: function () {
		if (this.fireEvent('beforeClick', this) !== false) {
			if (this.hasSearch) {
				this.store.baseParams = {};
				this.store.baseParams[this.paramName] = '';
				this.store.removeAll();
				this.store.reload();
				this.el.dom.value = '';
				this.triggers[0].hide();
				this.hasSearch = false;
				this.focus()
			}
		}
	},
	onTrigger2Click: function () {
		if (this.fireEvent('beforeClick', this) !== false) {
			var v = this.getRawValue();
			if (v.length < 1) return this.onTrigger1Click();
			this.store.removeAll();
			this.store.baseParams = {};
			this.store.baseParams[this.paramName] = v;
			var o = {
				start: 0,
				searchType: 'simple'
			};
			this.store.reload({
				params: o,
				callback: function (rs) {
					if (!rs || rs.length < 1) {
						Ext.Msg.alert("提示", "没有找到符合条件的记录！")
					}
				}
			});
			this.hasSearch = true;
			this.triggers[0].show();
			this.focus()
		}
	}
});
EasyJF.Ext.Util = {};
Ext.apply(EasyJF.Ext.Util, {
	NormalClass: {},
	theStatus: [["启用", 0], ["停用", -1]],
	readOnlyGridCellColor: "#F2F2F2",
	successTag: "<font color=green>&#8730;</font>",
	failureTag: "<font color=red>X</font>",
	objectToString: function () {
		return this.id ? this.id: this
	},
	recentYears: function () {
		var thisYear = new Date().getFullYear();
		var years = [];
		for (var i = thisYear - 5, j = 0; i < thisYear + 5; i++, j++) {
			years[j] = [i, i]
		}
		return years
	} (),
	isNumber: function (oNum) {
		if (!oNum) return false;
		var strP = /^(-)?\d+(\.\d+)?$/;
		if (!strP.test(oNum)) return false;
		try {
			if (parseFloat(oNum) != oNum) return false
		} catch(ex) {
			return false
		}
		return true
	},
	theMonth: function () {
		var m = [];
		for (var i = 1; i <= 12; i++) {
			m[i - 1] = [i, i]
		}
	} (),
	linkRenderer: function (v) {
		if (!v) return "";
		else return String.format("<a style=\"color:blue;font-weight:800;\" title=\"点击后将在新窗口中打开{0}\" href='{0}' target='_blank'>{0}</a>", v)
	},
	booleanRender: function (value, p, record) {
		return value ? "<span style=\"color:green;\">是</span>": "<span style=\"color:red;\">否</span>"
	},
	dateRender: function (format) {
		format = format || "Y-m-d G:i";
		return Ext.util.Format.dateRenderer(format)
	},
	imgRender: function (v) {
		if (!v) return "";
		else return String.format("<a style=\"color:green;font-weight:800\" title=\"点击后将在新窗口中打开{0}\" href='{0}' target='_blank'>查看</a>", v)
	},
	moneyRender: function (v) {
		if (v) {
			if (v.toFixed) {
				if (v < 0) return "<font color=red>" + v.toFixed(2) + "<font>";
				else return v.toFixed(2)
			} else return v
		}
	},
	userRender: function (user) {
		name = user.name || "guest";
		return name
	},
	objectRender: function (p, backgroundColor) {
		return function (v, meta) {
			if (backgroundColor) meta.attr = 'style="background-color:' + backgroundColor + ';"';
			var s = "";
			try {
				s = v ? eval("v." + p) : ""
			} catch(e) {}
			return s
		}
	},
	comboxRender: function (v) {
		if (v) {
			if (v.text) return v.text;
			else if (v.title) return v.title;
			else return v
		}
	},
	typesRender: function (types) {
		return function (v) {
			for (var i = 0; i < types.length; i++) {
				try {
					if (types[i][1] === v) return types[i][0]
				} catch(e) {
					alert(types)
				}
			}
			return ""
		}
	},
	readOnlyRender: function (innerRender) {
		return function (v, meta) {
			var d = v;
			if (innerRender) d = innerRender(d);
			meta.attr = 'style="background-color:' + EasyJF.Ext.Util.readOnlyGridCellColor + ';"';
			return d
		}
	},
	operaterTemplate: new Ext.Template("<a href='{2}' theid='{2}' op='{1}' onclick='return false'><font color='blue'>{0}</font></a>"),
	operaterRender: function (cmd, title) {
		return function (v, p, r) {
			if (r.get("id")) return EasyJF.Ext.Util.operaterTemplate.applyTemplate([title ? title: (v ? v: ""), cmd, r.get("id")])
		}
	},
	autoCloseMsg: function () {
		Ext.Msg.hide()
	},
	executeUrl: function (url, params, fn) {
		return function () {
			Ext.Ajax.request({
				waitMsg: "正在执行操作，请稍候...",
				url: url,
				method: 'POST',
				params: params,
				success: function (response) {
					var r = Ext.decode(response.responseText);
					if (!r.success) Ext.Msg.alert("提示", "操作失败，失败原因为：<br/>" + (r.errors.msg ? r.errors.msg: "未知"));
					else {
						Ext.Msg.alert("提示", "操作成功", fn ? fn: Ext.emptyFn, this)
					}
				},
				scope: this
			})
		}
	},
	submitForm: function (form, url, callback, scope, failure) {
		form.submit({
			url: url,
			waitTitle: "请稍候",
			waitMsg: "正在保存，请稍候",
			success: function (form, action) {
				if (callback) callback.call(scope || this, form, action)
			},
			failure: function (form, action) {
				if (failure) failure.call(scope || this);
				else {
					var msg = "";
					if (action.failureType == Ext.form.Action.SERVER_INVALID) {
						if (form.notAlert) return "";
						for (var p in action.result.errors) {
							msg += action.result.errors[p] + "  "
						}
					} else msg = "数据录入不合法或不完整！";
					Ext.MessageBox.alert("保存失败！", msg)
				}
			},
			scope: scope || this
		})
	}
});

    
Ext.apply(EasyJF.Ext.Util,{
    getEditGridData:function(editGrid,prefix,key,filter){
        function getV(v){
            if(v&&v.value!==undefined)v=v.value;// 根据value属性来得到
            else if(v&& v.id!==undefined)v=v.id;// 根据id属性来得到
            if(v && typeof v=="object" && v.clearTime)v=v.format("Y-m-d");
            return v;       
        }
        var o={};
        var mc=editGrid.getColumnModel().getColumnCount();
        for(var i=0;i<mc;i++){
            var n=editGrid.getColumnModel().getDataIndex(i);
            if(n)o[(prefix?prefix:"")+n]=[];
        }  
        var store=editGrid.store;
        var j=0;
        var numbererField=editGrid.getColumnModel().getColumnById("numberer")?editGrid.getColumnModel().getColumnById("numberer").dataIndex:"";
        for(var i=0;i<store.getCount();i++){
            if(key){// 如果指定了必填项，则要作必填项判断
                var v=store.getAt(i).get(key);
                v=getV(v);
                if(!v)continue;// 如果必填项没有值，则退出
                if(filter && !filter(store.getAt(i))) continue;
                if(typeof v=="object" && !String(v))continue;// 对Object类型进行处理
            }
            for(var n in o){                            
                var f=prefix?n.replace(prefix,""):n;
                if(f==numbererField)o[n][j]=j;// 处理自动排序字段
                else {
                    var v=store.getAt(i).get(f);                
                    v=getV(v);      
                    o[n][j]=(v!==null?v:"");
                }
            }
            j++;
        }       
        return j>0?o:{};
    },
    editGrid2form:function(editGrid,fp){// 把EditorGridPnael中的数据保存到表单隐藏域中
        var c=[];
        var mc=editGrid.getColumnModel().getColumnCount();
        for(var i=0;i<mc;i++){
            c[c.length]=editGrid.getColumnModel().getDataIndex(i);
        }   
        for(var j=0;j<c.length;j++){ 
            var n=c[j];
            // alert(n);
            if(fp.form.findField(n)){
            var s="";   
            for(var i=0;i<editGrid.store.getCount();i++){
                var v=editGrid.store.getAt(i).get(n);
                if(v&&v.value)v=v.value;// 根据value属性来得到
                else if(v&&v.id)v=v.id;// 根据id属性来得到
                s+=(v?v:" ")+";";
            }
            fp.form.findField(n).setValue(s);
            }           
        }
    },
    getGridDataAsString:function(grid){
        var s ="";
        for (var i = 0; i < grid.store.getCount(); i++) {
            var r = grid.store.getAt(i);
            s+= r.get("id")+",";
        }
        return s;
    },
   appendGridRows:function(grid,storeMapping,rs,dataHandler,keepLastEmptyRow){
        if(rs.length==undefined)rs=[rs];
        var selectRow=grid.getSelectionModel().getSelectedCell?grid.getSelectionModel().getSelectedCell():null;
        var lastSecondRow=grid.store.getCount()-(keepLastEmptyRow?2:1);
        var appendTo=lastSecondRow;
        if(selectRow)
        appendTo=selectRow[0];
        if(appendTo<-1)appendTo=-1;
        if(appendTo==lastSecondRow+1)appendTo=lastSecondRow;        
        for(var i=0;i<rs.length;i++){
        var r=rs[i];
        var obj=dataHandler(r)
        EasyJF.Ext.Util.addGridRow(grid,storeMapping,obj,appendTo+i);
        }
    },
    loadDataGrid:function(grid,data,append){
        grid.getView().scrollToTop();// 如果有滚动条,而且滚动条在底部,折可能出现页面闪烁
        var s = grid.getStore();
        s.removeAll();
        if(Ext.isArray(data)){
            var root = s.reader.meta.root;
            if(Ext.isEmpty(root)){
                s.loadData(data,append);
            }else{
                var totalProperty = s.reader.meta.totalProperty;
                var o = {};
                o[root] = data;
                o[totalProperty] = data.length;
                s.loadData(o,append);   
            }
        }else{
            s.loadData(data,append);
        }
    },
    addGridRow:function(grid,storeMapping,obj,appendTo){
        var row=appendTo;
        if(row==undefined){
        var selModel=grid.getSelectionModel();
        var record =selModel.getSelectedCell?selModel.getSelectedCell():null;   
        row=grid.store.getCount()-1;    
        if(record){
            row=record[0];
        }
        }
        var create=Ext.data.Record.create(storeMapping);
        var obj=new create(Ext.apply({},obj||{}));      
        if(grid.stopEditing)grid.stopEditing();
        grid.store.insert(row+1,obj);
        grid.getView().refresh();
    },
    removeGridRow:function(grid,callback){   
        var record = grid.getSelectionModel().getSelectedCell();    
        if(record){
        var store=grid.store;
        Ext.MessageBox.confirm("请确认","确定要删除吗？",function(ret){
            if(ret=="yes"){
                if(callback) callback(r);
                var r=store.getAt(record[0]);
                store.remove(r);
                if(store.getCount()>0)grid.getSelectionModel().select(record[0]-1<0?0:record[0]-1,record[1]);
            }});
        }
        else Ext.MessageBox.alert("提示","请选择要删除的记录!");
    },
    reloadGrid:function(grid){
        grid.getStore().removeAll();
        grid.getStore().reload();
    },
    removeGridRows:function(grid){  
        if(!grid.getSelectionModel().getSelections && grid.getSelectionModel().getSelectedCell ){//
            EasyJF.Ext.Util.removeGridRow(grid);
        }
        else{
        var rs = grid.getSelectionModel().getSelections();  
        if(rs&&rs.length>0){
        var store=grid.store;
        Ext.MessageBox.confirm("请确认","确定要删除吗？",function(ret){
            if(ret=="yes"){
                for(var i=0;i<rs.length;i++)store.remove(rs[i]);    
            }});
        }
        }
    }});
  
Ext.apply(EasyJF.Ext.Util, {
	columnPanelBuild: function () {
		var args = Array.prototype.slice.call(arguments, 0);
		var formConfig = {};
		if (args[0]) {
			if (args[0].FC || args[0].formConfig) {
				Ext.apply(formConfig, (args[0].FC || args[0].formConfig));
				args.shift()
			}
		}
		var obj = {
			layout: 'column',
			anchor: "100%",
			defaults: {
				border: false
			},
			items: [],
			xtype: "panel",
			border: false,
			bodyBorder: false
		};
		var defaultColumn = (1 / args.length).toFixed(2);
		for (var i = 0; i < args.length; i++) {
			var o = args[i];
			var c = {
				columnWidth: o.columnWidth || defaultColumn,
				layout: 'form',
				defaultType: o.defaultType || "textfield",
				defaults: o.defaults || {
					anchor: "-20"
				},
				items: o.items
			};
			obj.items[i] = Ext.apply(c, formConfig)
		}
		return obj
	},
	twoColumnPanelBuild: function () {
		var args = Array.prototype.slice.call(arguments, 0);
		var formConfig = {};
		var obj = {
			layout: 'column',
			anchor: "100%",
			defaults: {
				border: false
			},
			items: [],
			xtype: "panel",
			border: false,
			bodyBorder: false
		};
		var max = 2;
		if (typeof args[0] == "number") {
			max = args[0];
			args.shift()
		}
		if (args[0]) {
			if (args[0].FC || args[0].formConfig) {
				Ext.apply(formConfig, (args[0].FC || args[0].formConfig));
				args.shift()
			}
		}
		var cs = [];
		for (var i = 0; i < max; i++) cs[i] = Ext.apply({
			columnWidth: 1 / max,
			layout: 'form',
			defaultType: "textfield",
			defaults: {
				anchor: "-20"
			},
			items: []
		},
		formConfig);
		for (var i = 0; i < args.length;) {
			for (var j = 0; j < max; j++, i++) {
				if (i < args.length) cs[j].items[cs[j].items.length] = args[i]
			}
		}
		obj.items = cs;
		return obj
	},
	oneColumnPanelBuild: function () {
		var obj = {
			layout: 'column',
			anchor: "100%",
			defaults: {
				border: false
			},
			items: [],
			xtype: "panel",
			border: false,
			bodyBorder: false
		};
		var lx = arguments.length;
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i].hidden) lx--
		}
		var defaultColumn = (1 / lx).toFixed(2);
		var begin = 0,
		cws = null;
		if (typeof arguments[0] == "object" && arguments[0].constructor == Array) {
			cws = arguments[0];
			begin = 1
		}
		for (var i = begin; i < arguments.length; i++) {
			var field = arguments[i];
			if (field.xtype == "labelfield" && !field.anchor) field.anchor = "-5";
			var c = {
				columnWidth: cws ? cws[i - 1] : defaultColumn,
				layout: 'form',
				defaultType: "textfield",
				defaults: {
					anchor: field.xtype == "labelfield" ? "-10": "-20"
				},
				items: field
			};
			obj.items[i] = c
		}
		return obj
	}
});    
   
Ext.apply(EasyJF.Ext.Util,{  
    TRANS_ID : 0,
    loadScript:function(className,script,callback,scope){
        if(!window[className]){
            Ext.Ajax.request({url:script,success:function(req){
                eval(req.responseText);
                if(callback){
                    callback.call(scope||window,window[className]);                      
                }
           },scope:this});
       }
       else if(callback) callback.call(scope||window,window[className]);       
    },
    load : function(appName) {
        var transId = ++EasyJF.Ext.Util.TRANS_ID;
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.setAttribute("src", appName);
        script.setAttribute("type", "text/javascript");
        script.setAttribute("id","lanyoScript_"+EasyJF.Ext.Util.TRANS_ID);
        head.appendChild(script);
    },
    /**
	 * 从指定的url加载数组或PageResult类型的JSON对象，并自动存放到本地缓存中
	 * 
	 * @param {}
	 *            varName 缓存明称
	 * @param {}
	 *            url JSON数据url
	 * @param {}
	 *            callback 可选参数，回调函数
	 * @param {}
	 *            shareCache 可选参数，是否共享缓存
	 * @param {}
	 *            collectionType 可选参数，缓存类型，默认为MixedCollection
	 */
    loadJSON2Collection : function(varName,url, callback,shareCache,collectionType) {
         Ext.Ajax.request({
                url : url,
                success : function(req) {
                    try{
                        var ret = Ext.decode(req.responseText);
                        var collection =shareCache||eval("new "+(collectionType||"Ext.util.MixedCollection")+"()");
                        if(Ext.type(ret)=='array'){
                            collection.addAll(ret);
                            EasyJF.Ext.CachedRemoteObject.DATAS[varName]=collection;
                        }
                        else if(Ext.type(ret)=='object' && Ext.type(ret.result)=='array'){
                            collection.addAll(ret.result);
                            EasyJF.Ext.CachedRemoteObject.DATAS[varName]=collection;
                        }
                    }catch(e){}
                    if (callback)callback();    
                },
                scope : this
            });
    },
    loadJSONObject:function(varName,script,callback){     
        Ext.Ajax.request({url:script,success:function(req){
            var ret=Ext.decode(req.responseText);
            if(varName)eval("("+varName+"=ret)");
            if(callback)callback();                      
       },scope:this});         
    },
    asLoadScript : function(script) {
        Ext.Ajax.request({
                url : script,
                success : function(req) {
                    eval(req.responseText);
                },
                scope : this
            });
    },
     /**
		 * 在页面打开的时候动态加载脚本程序
		 * 
		 * @param {}
		 *            script 脚本名称
		 */
    loadJS:function(script){
        document.write("<script src='"+script+"'></script>");
    },
    // 拷贝一颗树节点及所有子节点
    cloneTreeNode : function(nodes) {
        var ns = [];
        for (var i = 0; i < nodes.length; i++) {
            var o = Ext.apply({}, nodes[i]);
            if (nodes[i].children && nodes[i].children.length) {
                o.children = this.cloneTreeNode(nodes[i].children);
            } else
                o.children = [];
            ns.push(o);
        }
        return ns;
    },
    addObject:function(crudClass,callback,script,otherScripts,winReadyAction){
        if(this.NormalClass[crudClass]){
            var clz=this.NormalClass[crudClass];
            var o=new clz();
            o.createObject(callback,winReadyAction);
        }
        else {// 从脚本中加载
            var loadSuccess=function(req){
                eval(req.responseText);                 
                eval("this.NormalClass."+crudClass+"="+crudClass);
                var clz=this.NormalClass[crudClass];
                var o=new clz();
                o.createObject(callback,winReadyAction);                
            };
            if(otherScripts){
                var s=otherScripts.split(";");
                var total=s.length,ld=0;
                for(var i=0;i<s.length;i++){
                    Ext.Ajax.request({url:s[i],success:function(req){
                        eval(req.responseText);
                        ld++;
                        if(ld>=total){
                            Ext.Ajax.request({url:"extApp.ejf?cmd=loadScript&script="+script,success:loadSuccess,scope:this});
                        }
                    },scope:this});
                    }
            }
            else {
            Ext.Ajax.request({url:"extApp.ejf?cmd=loadScript&script="+script,success:loadSuccess,scope:this});
            }
        }
    },
    listObject:function(crudClass,callback,script,otherScripts){
        if(this.NormalClass[crudClass]){
            var clz=this.NormalClass[crudClass];
            var o=new clz();
            if(o.list && (typeof o.list=="function"))o=o.list();
            if(callback)callback(o);
        }
        else {// 从脚本中加载
            if(otherScripts){
                var s=otherScripts.split(";");
                for(var i=0;i<s.length;i++){
                    Ext.Ajax.request({url:s[i],success:function(req){
                        eval(req.responseText);     
                    }});
                    }
            }   
            Ext.Ajax.request({url:"extApp.ejf?cmd=loadScript&script="+script,success:function(req){
                eval(req.responseText);                 
                eval("this.NormalClass."+crudClass+"="+crudClass);
                var clz=this.NormalClass[crudClass];
                var o=new clz();
                if(o.list && (typeof o.list=="function"))o=o.list();
                if(callback)callback(o);
            },scope:this});     
        }
    },
    editObject:function(crudClass,callback,script,otherScripts,id,winReadyAction){
        if(this.NormalClass[crudClass]){
            var clz=this.NormalClass[crudClass];
            var o=new clz();
            o.editObject(id,callback,winReadyAction);
        }
        else {// 从脚本中加载
            if(otherScripts){
                var s=otherScripts.split(";");
                for(var i=0;i<s.length;i++){
                    Ext.Ajax.request({url:s[i],success:function(req){
                        eval(req.responseText);     
                    }});
                    }
            }   
            Ext.Ajax.request({url:"extApp.ejf?cmd=loadScript&script="+script,success:function(req){
                eval(req.responseText);                 
                eval("this.NormalClass."+crudClass+"="+crudClass);
                var clz=this.NormalClass[crudClass];
                var o=new clz();
                o.editObject(id,callback,winReadyAction);
            },scope:this});     
        }
    },
    viewObject:function(crudClass,callback,script,otherScripts,id){
        if(this.NormalClass[crudClass]){
            var clz=this.NormalClass[crudClass];
            var o=new clz();
            o.viewObject(id,callback);
        }
        else {// 从脚本中加载
            if(otherScripts){
                var s=otherScripts.split(";");
                for(var i=0;i<s.length;i++){
                    Ext.Ajax.request({url:s[i],success:function(req){
                        eval(req.responseText);     
                    }});
                    }
            }   
            Ext.Ajax.request({url:"extApp.ejf?cmd=loadScript&script="+script,success:function(req){
                eval(req.responseText);                 
                eval("this.NormalClass."+crudClass+"="+crudClass);
                var clz=this.NormalClass[crudClass];
                var o=new clz();
                o.viewObject(id,callback);
            },scope:this});     
        }
    },
    removeObject:function(crudClass,callback,script,otherScripts,id){
        if(this.NormalClass[crudClass]){
            var clz=this.NormalClass[crudClass];
            var o=new clz();
            o.removeObject(id,callback);
        }
        else {// 从脚本中加载
            if(otherScripts){
                var s=otherScripts.split(";");
                for(var i=0;i<s.length;i++){
                    Ext.Ajax.request({url:s[i],success:function(req){
                        eval(req.responseText);     
                    }});
                    }
            }   
            Ext.Ajax.request({url:"extApp.ejf?cmd=loadScript&script="+script,success:function(req){
                eval(req.responseText);                 
                eval("this.NormalClass."+crudClass+"="+crudClass);
                var clz=this.NormalClass[crudClass];
                var o=new clz();
                o.removeObject(id,callback);
            },scope:this});     
        }
    },
    buildCombox:function(name,fieldLabel,data,defaultValue,allowBlank){
        return {
                                xtype : "combo",
                                name : name,
                                hiddenName : name,
                                fieldLabel : fieldLabel,
                                displayField : "title",
                                valueField : "value",
                                store : new Ext.data.SimpleStore({
                                    fields : ['title', 'value'],
                                    data :  data
                                }),
                                editable : false,
                                value:defaultValue,
                                allowBlank:allowBlank,
                                mode : 'local',
                                triggerAction : 'all',
                                emptyText : '请选择...'
                            };
    },
    buildRemoteCombox:function(name,fieldLabel,url,fields,displayField,valueField,allowBlank,localStoreVar){
        var config = {xtype:"smartcombo",
                 name:name,
                 hiddenName:name,
                 displayField:displayField?displayField:"title",
                 valueField:valueField?valueField:"id",
                 lazyRender:true,
                 triggerAction:"all",
                 typeAhead: true,
                 editable:false,
                 allowBlank:allowBlank,
                 fieldLabel:fieldLabel
                };
        var storeConfig = {
            id:"id",
            url:url,        
            root:"result",
            totalProperty:"rowCount",
            remoteSort:true,    
            baseParams:{pageSize:"-1"}, 
            pageSize:"-1",
            fields:fields
        }               
        if(!Ext.isString(localStoreVar)){
            config.store=new Ext.data.JsonStore(storeConfig);
        }else{
            config.store = new EasyJF.Ext.CachedRemoteStore(Ext.apply({varName:localStoreVar},storeConfig));
        }
        return config;
    },
    printGrid:function(grid){
        var win=window.open("");
        win.document.write("<link rel='stylesheet' type='text/css' href='/stylesheet/print.css' />");
        win.document.write(grid.el.dom.innerHTML);
        win.document.close();
    },
    getSelectWin:function(winName,title,width,height,gridClz,config){
            if(!EasyJF.Ext.SelectWin)EasyJF.Ext.SelectWin={};
            if(!EasyJF.Ext.SelectWin[winName]){
                config=config||{};
                var glist=config.grid;
                if(!glist&&gridClz)glist=eval("new "+gridClz+"(config)");
                config=Ext.apply({},{title:title,width:width,height:height,grid:glist},config);
                EasyJF.Ext.SelectWin[winName]=new EasyJF.Ext.GridSelectWin(config);
            }
            return EasyJF.Ext.SelectWin[winName];
    }
    });
    
// FCKeditorAPI
Ext.apply(EasyJF.Ext.Util,{
    setDelayEditorContent:function(name,html){
        if(typeof FCKeditorAPI=="object"){
            var editor=FCKeditorAPI.GetInstance(name)
            if(editor)editor.SetHTML(html||"");
        }
    },
    setFCKEditorContent:function(name,html){
        if(typeof FCKeditorAPI=="object"){
            var editor=FCKeditorAPI.GetInstance(name)
            if(editor)editor.SetHTML(html||"");
            else this.setDelayEditorContent.createCallback(name,html).defer(2000);
        }
        else this.setDelayEditorContent.createCallback(name,html).defer(2000);
    },
    getFCKEditorContent:function(name){
        if(typeof FCKeditorAPI=="object"){
            var editor=FCKeditorAPI.GetInstance(name)
            return editor.GetHTML();
        }
        else return "";
    },
    autoFocusFirstRow:function(grid){
        grid.store.on("load",function(){
            if(grid.rendered){
                var sel=grid.getSelectionModel();
                if(!sel.hasSelection() && grid.store.getCount()){
                // grid.getSelectionModel().selectFirstRow();
                grid.getView().focusRow(0);
                }else if(sel.hasSelection()) {
                    grid.getView().focusRow(grid.store.indexOf(grid.getSelectionModel().getSelected()));
                }
                else {
                    grid.focus();
                }
            }
            else {
                grid.on("render",function(g){
                EasyJF.Ext.Util.autoFocusFirstRow(g);
                })
            }
        })
    },
    getExportForm:function(){
            var exportForm=Ext.getCmp("global_export_form");
            if(!exportForm){
                exportForm=new Ext.form.FormPanel({fileUpload:true,hidden:true,items:{}});
                var fe=document.createElement("div");
                document.body.appendChild(fe);
                exportForm.render(fe);
            }
            return exportForm;
    },
    /**
	 * 执行Panel上的某一个按钮
	 * 
	 * @param {}
	 *            p
	 * @param {}
	 *            btn
	 */
    executePanleButtons:function(p,btn){
        if(p.buttons&&p.buttons.length){
        for(var i=0,bs=p.buttons;i<bs.length;i++){
            if(bs[i].id==btn){
                if(!(bs[i].disabled||bs[i].hidden) && bs[i].handler)bs[i].handler.call();
                break;
            }
        }
        }
    },  
    /**
	 * 执行本地命令
	 * 
	 * @param {}
	 *            cmd 命令名称
	 * @param {}
	 *            value 参数值
	 */
    executeLocalCommand:function(cmd,value,callback){
        LanyoBrowser.executeLocalCommand(cmd,value,callback);
    },
    ajaxRequest:function(url, params, scope, success, failure,
        successOp) {
    Ext.Ajax.request({
                url : url,
                params : params || {},
                scope : scope || this,
                success : success || function(response,options) {
                    var data = Ext.decode(response.responseText);
                    if (data.success) {
                        if (successOp)
                            successOp.call(this,data,options);
                        else if(data.msg){
                            EasyJF.Ext.Msg.alert(data.msg);
                        }
                    } else if(data.msg){
                        Ext.Msg.errorMsg(null, data.msg);
                    }
                },
            failure : failure || function(response) {
                var data = Ext.decode(response.responseText);
                Ext.Msg.errorMsg(null, data.msg? data.msg: (data.errors && data.errors.msg? data.errors.msg: "未知错误原因!"));
            }
        });
}
});

LanyoBrowser={client:{serverUrl:"",usbKey:"",loginKey:"",orgId:"",userName:""},user:{},usb:{},ids:[],cmds:[],getId:function(){var id=Math.random(1000).toString();while(this.cmds.indexOf(id)>=0){id=Math.random(1000).toString()}return id},executeLocalCommand:function(cmd,value,callback){var id=this.getId();this.ids.push(id);if(callback){var o={id:id,fn:callback};this.cmds.push(o)}window.status="LOCALCMD:"+id+":"+cmd+":"+(value||"");return id},sendLocalCommandResult:function(id,value){var cmd=null;for(var i=0;i<this.cmds.length;i++){if(this.cmds[i].id==id){cmd=this.cmds[i];break}}if(cmd){if(cmd.fn)cmd.fn(value);this.cmds.remove(cmd)}this.ids.remove(id);var sdom=document.getElementById(id);if(sdom){document.getElementsByTagName("head")[0].removeChild(sdom)}}}
EasyJF.Ext.FormWindow=Ext.extend(Ext.Window,{confirmSave:false,checkFormDirty:function(){var fp=this.getComponent(0);if(fp&&fp.form){return fp.form.isDirty()}else return false},hide:function(animateTarget,cb,scope){if(this.hidden||this.fireEvent("beforehide",this)===false){return}if(this.confirmSave&&this.checkFormDirty()){Ext.MessageBox.show({title:'是否要保存录入的数据?',msg:'您所编辑的表单中含有末保存的数据,是否要保存修改后的内容?',buttons:Ext.Msg.YESNOCANCEL,fn:function(btn){if(btn=="no"){EasyJF.Ext.FormWindow.superclass.hide.call(this,animateTarget,cb,scope)}else if(btn=="yes"){if(this.crudService){this.crudService.save(EasyJF.Ext.FormWindow.superclass.hide.createDelegate(this,[animateTarget,cb,scope]),this.autoClose)}}else if(btn=="cancel"){}},icon:Ext.MessageBox.QUESTION,scope:this})}else{EasyJF.Ext.FormWindow.superclass.hide.call(this,animateTarget,cb,scope)}}});

/**
 * 增删改查相关功能
 */
EasyJF.Ext.CrudFunction={
    layout : "fit",
    border : false,
    closable : true,
    autoScroll : true,
    exportData : false,// 是否显示导出excel按钮
    importData:false,// 是否显示导入exdel数据
    printData:false,
    clearData:false, // 是否清楚查询
    allowSearch : true,// 是否允许自定义查询
    showMenu : true,// 用来定义是否显示右键菜单
    showAdd:true,// 默认显示添加按钮
    showEdit:true,// 默认显示编辑按钮
    showRemove:true,// 默认显示删除按钮
    showView : true,// 用来定义是否显示查看面板
    showRefresh:true,// 用来控制CRUD中的refresh按钮显示
    showSearchField:true,// 用来控制searchField按钮显示
    gridForceFit : true,// 强制表格自动适应
    batchRemoveMode:false,// 是否是批量删除模式
    autoLoadGridData:true,// 自动加载表格数据
    columnLock:false,// 表格列锁定
    summaryGrid:false,// 统计表格
    dirtyFormCheck:true,// 是否自动检查编辑表单中的数据项已经修改
    operatorButtonStyle:1,// 1为图文混合,2为文字,3为图标
    customizeQueryObject:false,// 是否开始自定义查询支持
    queryObjectName:null,// 自定义查询对象的名称
    winWidth : 500,// 默认的窗口宽度
    winHeight : 400,// 默认的窗口高度
    winTitle : "数据管理",// 默认的窗口标题
    pageSize : 10,// 每页显示条数
        pagingToolbar : true,// 是否显示工具栏
        defaultCmd:true,// 默认用cmd=list
        viewSave : Ext.emptyFn,// 用来处理视图查看时，保存按钮的回调函数
        initComponent:Ext.emptyFn,
        linkRenderer : EasyJF.Ext.Util.linkRenderer,
        linkRender:EasyJF.Ext.Util.linkRenderer,
        imgRender :EasyJF.Ext.Util.imgRender,
        booleanRender :  EasyJF.Ext.Util.booleanRender,
        dateRender :EasyJF.Ext.Util.dateRender,
        userRender : EasyJF.Ext.Util.userRender,
        objectRender : EasyJF.Ext.Util.objectRender,
        typesRender : EasyJF.Ext.Util.typesRender,
        readOnlyRender:EasyJF.Ext.Util.readOnlyRender,
        operaterRender:EasyJF.Ext.Util.operaterRender,
        singleWindowMode:false,
        booleans:[["是",true],["否",false]],
        crud_operators:[{
            name:"btn_add",
            text : "添加(<u>A</u>)",
            cls : "x-btn-text-icon",
            icon : "images/icons/add.png",
            method : "create",
            cmd:"save",
            noneSelectRow:true,
            hidden:true
        },{
            name:"btn_edit",
            text : "编辑(<u>E</u>)",
            cls : "x-btn-text-icon",
            icon : "images/icon-png/edit.png",
            disabled:true,
            method : "edit",
            cmd:"update",
            hidden:true
        },{
            name:"btn_view",
            text : "查看(<u>V</u>)",
            cls : "x-btn-text-icon",
            icon : "images/icon-png/view.png",
            method : "view",
            disabled:true,
            hidden : true
        },{
            name:"btn_remove",
            text : "删除(<u>D</u>)",
            cls : "x-btn-text-icon",
            icon : "images/icon-png/delete.png",
            disabled:false,
            method : "removeData",
            cmd:"remove",
            hidden : true
        },{
            name:"btn_refresh",
            text : "刷新",
            cls : "x-btn-text-icon",
            icon : "images/icon-png/f5.png",
            method : "refresh",
            noneSelectRow:true
        },{
            name:"btn_advancedSearch",
            text : "高级查询(<u>S</u>)",
            cls : "x-btn-text-icon",
            icon : "images/icon-png/srsearch.gif",
            method : "advancedSearch",
            cmd:"list",
            hidden : true,
            noneSelectRow:true,
            clientOperator:true
        },{
            name:"btn_clearSearch",
            text : "显示全部",
            iconCls : 'search',
            noneSelectRow:true,
            method : "clearSearch",
            hidden : true
        },{
            name:"btn_print",
            text : "打印(<u>P</u>)",
            iconCls:"print-icon",
            disabled:true,
            method : "printRecord",
            hidden : true
        },{
            name:"btn_export",
            text : "导出Excel(<u>O</u>)",
            iconCls : 'export-icon',
            method : "exportExcel",
            noneSelectRow:true,
            hidden : true
        },{
            name:"btn_import",
            text : "导入数据(<u>I</u>)",
            iconCls : 'import-icon',
            method : "importExcel",
            noneSelectRow:true,
            hidden : true
        },'->',{
            type:"SearchField",
            name:"searchField",
            width : 100,
            noneSelectRow:true,
            paramName : 'searchKey',
            clientOperator:true
        }],
        objectAutoRender:function(v){
            if(v&&v.id){
                for(var d in v){
                    if(d!="id" && v[d])return v[d];
                }
                return v.id;
            }else return v;
        },
        search : function() {
            Ext.apply(this.store.baseParams, {
                        searchKey : this.searchField?this.searchField.getValue():""
                    });
            if(this.store.lastOptions&&this.store.lastOptions.params){
            this.store.lastOptions.params.start=0;
            this.store.lastOptions.params.pageSize=this.store.baseParams.pageSize||this.pageSize;
            }
            this.refresh();
        },
        importExcel:function(){
            if(!EasyJF.Ext.ImportPanel){
                EasyJF.Ext.ImportPanel=new Ext.form.FormPanel({
                        id:"crudExportPanel",
                        fileUpload:true,
                        items:[{xtype:"fieldset",title:"选择数据文件",autoHeight:true,items:{xtype:"textfield",hideLabel:true,inputType:"file",name:"file",anchor:"100%"}},
                        {xtype:"fieldset",title:"导入说明",html:"",height:60}
                    ]});
            }
            
            var win=this.createGlobalWin("CrudExportWindow",300,210,"导入数据",EasyJF.Ext.ImportPanel,function(){
                var form=EasyJF.Ext.ImportPanel.form;           
                if(form.findField("file").getValue().length<2){
                    Ext.Msg.alert("提示","你没有选择要导入的文件！");
                    return ;
                }
                EasyJF.Ext.ImportPanel.form.submit({
                    url:this.baseUrl,
                    params:{cmd:"import"},
                    waitMsg:"请稍候，正在导入数据",
                    success:function(){
                        Ext.Msg.alert("提示","数据导入成功!",function(){form.findField("file").reset();win.hide();this.store.reload();},this)
                    },
                    failure:function(){
                        this.alert("数据导入出错，请检测所选择的文件格式是否正确?","提示信息");
                    },
                    scope:this
                })
            });
        },
        getExportForm:EasyJF.Ext.Util.getExportForm,
        /**
		 * 导出数据为Excel格式
		 */
        exportExcel : function() {
            var params = this.store.baseParams;
            Ext.apply(params, {
                        searchKey : this.searchField.getValue()
                    });
            /*
			 * var s = Ext.urlEncode(params); window.open(this.baseUrl +
			 * '?cmd=export&' + s);
			 */
            var exportForm=this.getExportForm();
            exportForm.form.submit({
                    url:this.baseUrl,
                    params:Ext.apply({cmd:"export"},this.store.baseParams)
            });
        },  
        printList:function(cmd){
            return function(){
             var params=    Ext.apply(this.store.baseParams,{cmd:(cmd?cmd:"printList")});
             var s = Ext.urlEncode(params);
             window.open(this.baseUrl+"?" + s);
            }              
        },
        printRecord:function(){
            var record = this.grid.getSelectionModel().getSelected();
            if (!record) {
                this.alert("请先选择要操作的数据！","提示信息");
                return false;
            }
            window.open(this.baseUrl+"?cmd=print&id=" + record.get("id"));  
        },
        clearSearch:function(){
             this.store.baseParams = {};
             this.store.removeAll();
             this.store.load({params:{start:0,pageSize:this.pageSize}});
            // this.refresh();
        },  
        /**
		 * 重新加载数据
		 */
        refresh : function() {
            this.store.removeAll();
            this.store.reload({callback:function(rs){
                if(rs && rs.length<1){this.alert("没有符合条件的数据！","提示信息");
                EasyJF.Ext.Util.autoCloseMsg.defer(2000);}
                },scope:this});
            this.disableOperaterItem("btn_remove","btn_edit","btn_view","btn_print");
            this.focus();
        },  
        initWin : function(width, height, title,callback,autoClose,resizable,maximizable) {
            this.winWidth = width;
            this.winHeight = height;
            this.winTitle = title;
            var winName=autoClose?"CrudEditNewWindow":"CrudEditWindow";
            if(this.singleWindowMode)winName=winName+this.id;
            var win=this.createGlobalWin(winName,width,height,title,this.fp,null,"fp",[{
                                id : "btnSave",
                                text : "保存(<u>K</u>)",
                                handler : function() {
                                    EasyJF.Ext[winName].crudService.save(callback,autoClose);
                                },
                                iconCls : 'save',
                                scope : this
                            }, {
                                id : "btnReset",
                                text : "重置(<u>R</u>)",
                                iconCls : 'clean',
                                handler : function() {
                                    EasyJF.Ext[winName].crudService.reset()
                                },
                                scope : this
                            }, {
                                id : "btnClose",
                                text : "取消(<u>X</u>)",
                                iconCls : 'delete',
                                handler : function() {
                                    EasyJF.Ext[winName].crudService.closeWin(autoClose)
                                },
                                scope : this
                            }],autoClose,resizable?true:false,maximizable?true:false);
            win.confirmSave=this.dirtyFormCheck;
            return win;
        },
        getViewWin : function(autoClose) {
            var width = this.viewWin.width;
            var height = this.viewWin.height;
            var title = this.viewWin.title;
            return  this.createGlobalWin("CrudViewWindow",width,height,title,this.viewPanel,function() {
                                    var w = EasyJF.Ext.CrudViewWindow;
                                    if (w.crudService)
                                        w.crudService.viewSave(this.viewPanel);
                                    w.hide();
                                },"viewPanel",null,autoClose);
        },  
        doSomeWork : function(width,height,title,panel,createPanel,cmd,workWinName,url,autoClose){
            var record = this.grid.getSelectionModel().getSelected();
            if (!record) {
                this.alert("请先选择要操作的数据！","提示信息");
                return false;
            }
            if(!this[panel])this[panel]=this[createPanel]();
            var win=this.getWorkWin(width,height,title,this[panel],function(){
                if(!this[panel].form.isValid()) return false;
                this[panel].form.submit({
                    url:url?url:this.baseUrl,
                    waitMsg:"正在执行操作，请稍候",
                    params:{cmd:cmd},
                    success:function(){
                        win.hide();
                        this.refresh()
                    },          
                    failure : function(form, action) {
                        var msg = "";
                        if (action.failureType == Ext.form.Action.SERVER_INVALID) {
                            for (var p in action.result.errors) {
                                msg += action.result.errors[p] + "&nbsp;";
                            }
                        } else
                            msg = "数据录入不合法或不完整！";
                        this.alert(msg,"保存失败!");
                    },
                    scope:this          
                });
            },panel,workWinName,autoClose);     
            return win;
           
        },
        // 根据当前的数据创建一个工作窗口
        getWorkWin : function(width,height,title,workPanel,save,pname,winName,autoClose) {
            var record = this.grid.getSelectionModel().getSelected();
            if (!record) {
                this.alert("请先选择要操作的数据！","提示信息");
                return false;
            }
            var id = record.get("id");
            var win=this.createGlobalWin(winName?winName:"CrudWorkWindow",width,height,title,workPanel,save,pname,null,autoClose);      
            // 显示数据
            for (var n in record.data) {
                var c = win.getComponent(0).findSomeThing(n);
                // if(!c &&
                // win.getComponent(0).getXType()=="form")c=win.getComponent(0).form.findField(n);
                if (c) {
                    var v = record.get(n);
                    if (c.isFormField) {
                        c.setValue(v);
                        c.clearDirty();
                    } else{
                        if(c.renderer)v=c.renderer(v);
                         if (c.setText)
                        c.setText(v);
                        else if (c.getXType && c.getXType() == "panel")
                        c.body.update(v);
                    }
                }
            }
            return win;
        },
        alert:function(msg,title){
            Ext.Msg.alert(title||"提示",msg,function(){
                this.focus();
            },this);
        },
        confirm:function(title,msg,callback){
            Ext.Msg.confirm(title,msg,function(btn){
                if(btn=="yes"){
                    callback();
                }
                else {
                    this.focus();
                }
            },this);
        },
        focusFirstField:function(fp,win){
            fp=fp||this.fp;
            win=win||this.win;
            var fp=win.findByType("form");
                    win.currentFocus=false;
                    if(fp&&fp[0].form.items){
                        fp[0].form.items.each(function(o){
                            if(o.canFocus()){
                                o.focus("",10);
                                win.currentFocus=o;
                                return false;
                            }
                        });
                    }
                    if(!win.currentFocus){
                        if(win.buttons && win.buttons.length){
                            win.buttons[0].focus("",10);
                            win.currentFocus=win.buttons[0];
                        }
            }
        },
        // 得到一个全局的操作窗口，参数width表示窗口宽度，height表示窗口高度，title表示窗口标题，workPanel表示窗口名称，save表示回调函数，作用域为this,pname表示属性名称，比如viewPanel
        createGlobalWin : function(winName,width,height,title,workPanel,save,pname,buttons,autoClose,resizable,maximizable) {
            var win = EasyJF.Ext[winName];
            if (!win) {
                this[pname?pname:workPanel.id]=workPanel;
                var tools=[];
                tools.push({id:"help",handler:this.help});
                EasyJF.Ext[winName] = new EasyJF.Ext.FormWindow({
                    width : width,
                    layout : 'fit',
                    border : false,
                    resizable : resizable,
                    height : height,
                    buttonAlign : "center",
                    title : title,
                    modal : true,
                    defaultButton:0,
                    shadow : true,
                    maximized:false,
                    maximizable:maximizable,// this.enableMaxime,
                    // constrain:true,
                    tools:tools,
                    closeAction : autoClose||this.singleWindowMode?"close":"hide",
                    autoClose:autoClose||this.singleWindowMode,
                    listeners:{close:function(win){
                        if(win.crudService.store && win.crudService.closeSaveWin===false && winName!="CrudSearchWindow"){
                            win.crudService.store.reload();
                        }
                        win.crudService.focusCrudGrid();
                        delete EasyJF.Ext[winName];
                    },maximize:function(win){if(win.maximizable){win.doLayout();win.maximized=true}},// 如果需要实现可最大化和最小化，就要重写maximize和restore事件
                    restore:function(win){if(win.maximizable){win.doLayout();win.maximized=false}},
                    show:function(win){
                    if(win.maximizable)
                    win.tools[win.maximized?"maximize":"restore"].setVisible(win.crudService.maximizable===true);
                    win.tools.help.setVisible(win.crudService.showHelp!=undefined);                 
                    var fp=win.findByType("form");
                    win.crudService.focusFirstField(fp,win);
                    },
                    hide:function(win){
                        if(win.crudService.store && win.crudService.closeSaveWin===false && winName!="CrudSearchWindow"){
                            win.crudService.store.reload();
                        }
                        win.crudService.focus();
                    }
                    },
                    items : [workPanel],
                    buttons : buttons?buttons:[{
                                id : "btnSave",
                                text : "确定(<u>K</u>)",
                                handler : function() {
                                    var w = EasyJF.Ext[winName];
                                    var h=true;
                                    if (save)
                                        h=save.call(w.crudService,autoClose);
                                    if(h){
                                        if(autoClose)w.close();
                                        else w.hide();
                                        }
                                },
                                iconCls : 'save',
                                scope : this
                            }, {
                                id : "btnClose",
                                text : "退出(<u>X</u>)",
                                iconCls : 'delete',
                                handler : function() {
                                    if(autoClose||this.singleWindowMode)EasyJF.Ext[winName].close();
                                    else EasyJF.Ext[winName].hide();
                                },
                                scope : this
                            }],
                    keys:[{key:"k",alt:true,stopEvent:true,fn:function(){
                        EasyJF.Ext.Util.executePanleButtons(win,"btnSave");
                    }
                    },{
                    key:"x",stopEvent:true,alt:true,fn:function(){
                        EasyJF.Ext.Util.executePanleButtons(win,"btnClose");
                    }
                    },{
                    key:"r",stopEvent:true,alt:true,fn:function(){
                        EasyJF.Ext.Util.executePanleButtons(win,"btnReset");
                    }
                    }]      
                });
                win=EasyJF.Ext[winName];                
            } else if (workPanel) {// 更改窗口中的内容，包括全局的事件响应函数等
                if(win.crudService!=this){
                win.resizable = resizable;
                win.maximizable=maximizable;
// if(win.maximizable&&win.tools["restore"])win.tools["restore"].setVisible(false);
                }
                win.setTitle(title);
                win.setWidth(width);
                win.setHeight(height);
                if (win.getComponent(0) != workPanel) {
                    var p=win.remove(0);
                    delete win.crudService[pname?pname:p.id];// 删除上一个
                    win.add(workPanel);
                    this[pname?pname:workPanel.id]=workPanel;
                    win.doLayout();
                }
            }
            win.crudService = this; // crudService用来定义全局的添删改查服务
            this[winName]=win;
            win.show((typeof main!="undefined")&&main&&main.enableAnimate?Ext.getBody():false,function(){win.center();},this);
            return win;
        },
        showWin : function() {
            if (!this.fp) {
                if(!this.createViewPanel && this.viewPanel){
                    this.fp = this.viewPanel;
                }else{
                    this.fp = this.createForm();
                }
            }
            this.win = this.createWin();
            this.win.on("close", function() {
                            delete this.win;
                            delete this.fp;
                        }, this);
            this.win.show((typeof main!="undefined")&&main&&main.enableAnimate?Ext.getBody():false,function(){this.win.center();},this);
        },
        onCreate:function(){
            
        },
        create : function() {
            this.showWin();
            this.fp.form.clearData();
            this.reset();
            this.fp.form.isValid();
            this.onCreate();
            this.formFocus();
        },
        // 供外部调用创建一个新的对象
        createObject : function(callback,winReadyAction) {
            this.fp = this.createForm();
            this.win = this.createWin(callback,true);
            this.win.on("close", function() {
                            delete this.win;
                            delete this.fp;
            }, this);
            this.win.show((typeof main!="undefined")&&main&&main.enableAnimate?Ext.getBody():false,function(){this.win.center();},this);
            this.reset();
            if(winReadyAction){
                winReadyAction(this.win,this);
            }
            this.fp.form.isValid();
            this.onCreate();
            this.formFocus();
        },
        onEdit:function(ret,data){
            
        },
        editObject : function(id,callback,winReadyAction) {
            this.fp = this.createForm();
            this.win = this.createWin(callback,true);
            this.win.on("close", function() {
                            delete this.win;
                            delete this.fp;
            }, this);
            this.win.show((typeof main!="undefined")&&main&&main.enableAnimate?Ext.getBody():false,function(){this.win.center();},this);
            var viewCmd=this.viewCmd||"view";
            Ext.Ajax.request({url:this.baseUrl+"?cmd="+viewCmd,params:{id:id},waitMsg:"正在加载数据,请稍侯...",callback:function(options,success,response){
                var r = Ext.decode(response.responseText);
                this.fp.form.setValues(r);
                if(winReadyAction){
                    winReadyAction(this.win,r,this);
                }
                this.onEdit(true,r);
                this.fp.form.isValid();
                this.formFocus();
                this.fp.form.clearDirty();
            },scope:this});
        },
        edit : function() {
            if(this.btn_edit.disabled){this.view();return false;}
            var record = this.grid.getSelectionModel().getSelected();
            if (!record) {
                this.alert("请先选择要操作的数据！","提示信息");
                return false;
            }
            var id = record.get("id");
            this.showWin();
            this.fp.form.reset();
            this.fp.form.loadRecord(record);
            this.onEdit(true,record.data);
            this.fp.form.clearDirty();
            this.formFocus();
            return true;
        },
        removeObject : function(id,callback) {
            this.confirm("删除确认","确定要删除吗？", function(ret) {
                            Ext.Ajax.request({
                                url : this.baseUrl + '?cmd=remove',
                                params : {
                                    'id' : id
                                },
                                method : 'POST',
                                success : function(response) {
                                    var r = Ext.decode(response.responseText);
                                    if (!r.success){
                                        this.alert("操作失败，失败原因为：<br/>"+ (r.errors.msg? r.errors.msg: "未知"),"提示信息");
                                    }
                                    else {
                                        this.alert("删除成功","提示信息");
                                        if(callback)callback();
                                    }
                                },
                                scope : this
                            });
                    }.createDelegate(this), this);
        },
        formFocus:function(){
            var field=this.fp.form.items.get(1);// 默认从第一个元素开始
            if(!field || field.disabled)
             this.items.each(function(f){
                if(!f.disabled){
                field=f;
                return false;
                }
             });
             if(field && !field.disabled)
             field.focus("",100);
        },
        validateForm:function(form){
            if(!form.isValid()){
                this.alert("表单数据不合法,请注意必填项及录入的数据格式!","提示",function(){
                this.formFocus();
                },this);
                // Ext.Msg.hide.defer(3000,Ext.Msg);
                return false;
            }
            return true;
        },
        onSave:function(form,action){
            
        },
        beforeSave:function(){
            return true;
        },
        save : function(callback,autoClose,ignoreBeforeSave) {
            if(!this.validateForm(this.fp.form))return false;
            if(ignoreBeforeSave!==true){
                if(this.beforeSave && this.beforeSave()===false)return false;
            }
            var id = this.fp.form.findField("id").getValue();
            var url = this.baseUrl;
            if (this.fp.form.fileUpload) {
                var cmd = this.fp.form.findField("cmd");
                if (cmd == null) {
                    cmd = new Ext.form.Hidden({
                        name : "cmd"
                    });
                    this.fp.add(cmd);
                    this.fp.doLayout();
                }
                cmd.setValue((id ? "update" : "save"));
            } else {
                url += "?cmd=" + (id ? "update" : "save");
            }
            EasyJF.Ext.Util.submitForm(this.fp.form,url,function(form,action){
                this.fp.form.clearDirty();
                if(this.closeSaveWin!==false)this.closeWin(autoClose);
                if(this.store && this.closeSaveWin!==false){
                    this.store.reload();
                }
                if(callback)callback();
                this.fireEvent("saveobject",this,form,action);
                this.onSave(form,action);
                /*
				 * if(this.win && this.closeSaveWin===false){ this.formFocus(); }
				 */
            },this);
        },
        /**
		 * 打印预览
		 * 
		 * @param {}
		 *            callback
		 * @param {}
		 *            autoClose
		 * @return {Boolean}
		 */
        preview : function(callback,autoClose) {
            if(!this.validateForm(this.fp.form))return false;
            var id = this.fp.form.findField("id").getValue();
            var url = this.baseUrl;
            if (this.fp.form.fileUpload) {
                var cmd = this.fp.form.findField("cmd");
                if (cmd == null) {
                    cmd = new Ext.form.Hidden({
                        name : "cmd"
                    });
                    this.fp.add(cmd);
                    this.fp.doLayout();
                }
                cmd.setValue("preview");
            } else {
                url += "?cmd=preview";
            }
            var tempHiddens=[];
            var ps = this.fp.form.baseParams;
            if(ps&& typeof ps == 'string')ps=Ext.urlDecode(bp);
            var form=this.fp.form.el.dom;
            function addHiddenKey(key,value){
                var hd = document.createElement('input');
                    hd.type = 'hidden';
                    hd.name = key;
                    hd.value = value;
                    form.appendChild(hd);
                    tempHiddens.push(hd);
            }
            for(var k in ps){
                if(Ext.isArray(ps[k])){
                    for(var i=0;i<ps[k].length;i++){
                        addHiddenKey(k,ps[k][i]?ps[k][i]:"");
                        
                    }                   
                }else if(ps.hasOwnProperty(k)){                 
                    addHiddenKey(k,ps[k]?ps[k]:"");                   
                }
            }
            this.fp.form.el.dom.action=url;
            this.fp.form.el.dom.target="_blank";
            this.fp.form.el.dom.submit();
            if(tempHiddens){ // 删除动态的参数
            for(var i = 0, len = tempHiddens.length; i < len; i++){
                Ext.removeNode(tempHiddens[i]);
                }
            }
        },
        reset : function() {
            if (this.win && this.fp){
                this.fp.form.reset();
            }
        },
        closeWin : function(autoClose) {
            if(this.beforeClose){
                this.beforeClose(function(){
                    if (this.win){
                        if(autoClose)this.win.close();
                        else this.win.hide();
                    }
                    if(this.store && this.closeSaveWin===false){
                        // this.store.reload();
                    }
                });
            }else{
                if (this.win){
                    if(autoClose)this.win.close();
                    else this.win.hide();
                }
                if(this.store && this.closeSaveWin===false){
                    // this.store.reload();
                }
            }
        },      
        removeData : function() {
            if(this.btn_remove.disabled)return false;
            var record = this.grid.getSelectionModel().getSelected();
            if (!record) {
                this.alert("请先选择要操作的数据！","提示信息");
                return false;
            }
            var mulitId = "";
            if(this.batchRemoveMode){       
                var rs = this.grid.getSelectionModel().getSelections(); 
                for (var i = 0; i < rs.length; i++)
                    mulitId += rs[i].get("id") + ",";
            }
            var m =this.confirm("删除确认",
                    "确定要删除吗？", function(ret) {                      
                            Ext.Ajax.request({
                                url : this.baseUrl + '?cmd=remove',
                                params : {
                                    'id' : record.get("id"),
                                    'mulitId' : mulitId
                                },
                                method : 'POST',
                                success : function(response,options) {
                                    var r = Ext.decode(response.responseText);
                                    if (r && !r.success)
                                        this.alert("操作失败，失败原因为：<br/>"+ (r.errors.msg? r.errors.msg: "未知"));
                                    else {
                                        Ext.Msg.alert("提示","删除成功",
                                                function() {
                                                    this.store.removeAll();
                                                    this.store.reload();
                                                    this.focus();
                                                }, this);
                                    }
                                    this.fireEvent("removeobject",this,r,options);
                                },
                                scope : this
                            });
                        
                    }.createDelegate(this), this);
            return true;
        },
        executeUrl : function(url, params,fn) {
            return function() {
                Ext.Ajax.request({
                    waitMsg:"正在执行操作，请稍候...",
                    url : url,
                    method : 'POST',
                    params : params,
                    success : function(response) {
                        var r = Ext.decode(response.responseText);
                        if (!r.success)
                            this.alert("操作失败，失败原因为：<br/>"
                                            + (r.errors.msg
                                                    ? r.errors.msg
                                                    : "未知"));
                        else {
                            Ext.Msg.alert("提示","操作成功", fn?fn:Ext.emptyFn, this);
                        }
                    },
                    scope : this
                });
            }
        },
        executeCmd : function(cmd, allowBlank) {
            return function(c) {
                var sel=this.grid.getSelectionModel();
                var record = sel.getSelectedCell?(sel.getSelectedCell()?this.grid.store.getAt(sel.getSelectedCell()[0]):null):sel.getSelected();
                if(!c.noneSelectRow){
                if (!record && !allowBlank) {
                    this.alert("请先选择要操作的数据！");
                    return;
                }}
                var id = record ? record.get("id") : "";
                
                Ext.Ajax.request({
                    waitMsg:"正在执行操作，请稍候...",
                    url : this.baseUrl + '?cmd=' + cmd,
                    params : {
                        'id' : id
                    },
                    method : 'POST',
                    success : function(response) {
                        var r = Ext.decode(response.responseText);
                        if (!r.success)
                            this.alert(
                                    "操作失败，失败原因为：<br/>"
                                            + (r.errors.msg
                                                    ? r.errors.msg
                                                    : "未知"));
                        else {
                        Ext.Msg.alert("提示", r.data ? r.data : "操作成功",
                                function() {
                                    this.store.reload();
                                    this.focus();
                                }, this);
                    }
                    },
                    scope : this
                });
            }
        },
        executeMulitCmd : function(cmd) {
            return function() {
                var record = this.grid.getSelectionModel().getSelections();
                if (!record || record.length < 1) {
                    this.alert("请先选择要操作的数据！");
                    return;
                }
                var mulitId = "";
                for (var i = 0; i < record.length; i++){
                    if(record[i].get("id"))
                    mulitId += record[i].get("id") + ",";
                }
                Ext.Ajax.request({
                    waitMsg:"正在执行操作，请稍候...",
                    url : this.baseUrl + '?cmd=' + cmd,
                    params : {
                        'mulitId' : mulitId
                    },
                    method : 'POST',
                    success : function(response) {
                        var r = Ext.decode(response.responseText);
                        if (!r.success)
                            this.alert(
                                    "操作失败，失败原因为：<br/>"
                                            + (r.errors.msg
                                                    ? r.errors.msg
                                                    : "未知"));
                        else {
                        Ext.Msg.alert("提示", r.data ? r.data : "操作成功",
                                function() {
                                    this.store.reload();
                                    this.focus();
                                }, this);
                    }
                    },
                    scope : this
                });
            }
        },
        onView:function(){},
        view : function() {// 通用的查看数据窗口
            if (this.readInfo)
                return this.readInfo();
            var record = this.grid.getSelectionModel().getSelected();
            if (!record) {
                this.alert("请先选择要操作的数据！");
                return false;
            }
            var id = record.get("id");
            var win = this.showViewWin();
            for (var n in record.data) {
                var c = win.getComponent(0).findSomeThing(n);
                // if(!c &&
                // win.getComponent(0).getXType()=="form")c=win.getComponent(0).form.findField(n);
                if (c) {                
                    var v = record.get(n);  
                    // alert(n+":"+v);
                    if (c.isFormField) {
                        c.setValue(v);
                        c.clearDirty();
                    } else{
                        if(c.renderer)v=c.renderer(v);
                         if (c.setText)
                        c.setText(v);
                        else if (c.getXType && c.getXType() == "panel")
                        c.body.update(v);
                    }
                    // alert(c.ownerCt.el.dom.innerHTML);
                }
            }
            this.onView(win,record.data);
            // this.fp.form.loadRecord(record);
            return win;
        },
        viewObject:function(id,callback){
            var win = this.showViewWin(true);
            var viewCmd=this.viewCmd||"view";
            Ext.Ajax.request({url:this.baseUrl+"?cmd="+viewCmd,params:{id:id},waitMsg:"正在加载数据,请稍侯...",callback:function(options,success,response){
                var r = Ext.decode(response.responseText);
                for (var n in r) {
                var c = win.getComponent(0).findSomeThing(n);
                
                if (c) {                
                    var v = r[n];   
                    if (c.isFormField) {
                        c.setValue(v);
                        c.clearDirty();
                    } else{
                        if(c.renderer)v=c.renderer(v);
                         if (c.setText)
                        c.setText(v);
                        else if (c.getXType && c.getXType() == "panel")
                        c.body.update(v);
                    }
                }
            }
            if(callback)callback(win,r);
            this.onView(win,r);
            },scope:this});
        },
        showViewWin : function(autoClose) {
            if (!this.viewPanel) {
                if(this.createViewPanel){
                    this.viewPanel = this.createViewPanel();
                }else{
                    if(this.fp){
                        this.viewPanel = this.fp;
                    }else{
                        this.viewPanel = this.createForm();
                    }
                }
            }
            var win = this.getViewWin(autoClose);
            return win;
        },
        doSearch:function(){
            var win = EasyJF.Ext.CrudSearchWindow;
            var o = win.getComponent(0).form.getValues(false);          
            var service=win.crudService;
            service.store.baseParams = Ext.apply(o,{searchType:'advancedSearch',pageSize:service.store.baseParams.pageSize||service.pageSize});
            win.hide();
            if(service.searchField&&service.cleanQuickSearch){
                service.searchField.reset();
            }
            service.search();
        },
        advancedSearch : function() {
            return this.superSearchWin(this.searchWin.width, this.searchWin.height,
                    this.searchWin.title);
        },
        /**
		 * 高级查询
		 */
        superSearchWin : function(width, height, title) {
            var isNew = !EasyJF.Ext.CrudSearchWindow;           
            if (!this.searchPanel) {
                if (this.searchFP || this.searchFormPanel) {
                    this.searchPanel = this.searchFP ? this.searchFP() : this
                            .searchFormPanel();
                }
            }
            if (!this.searchPanel)
                return null;// 如果没有定义searchFP或searchFormPanel，则返回
            var win=this.createGlobalWin("CrudSearchWindow",width,height,title,this.searchPanel,null,"searchPanel",[{
                                id:"tb_search",
                                text : "查询",
                                handler : this.doSearch,
                                iconCls : 'search',
                                scope:this
                            }, {
                                text : "重置",
                                iconCls : 'clean',
                                handler : function() {
                                    EasyJF.Ext.CrudSearchWindow.getComponent(0).form
                                            .reset();
                                }
                            }, {
                                text : "关闭",
                                iconCls : 'delete',
                                handler : function() {
                                    EasyJF.Ext.CrudSearchWindow.hide()
                                }
                            }]);
            if(isNew){
                /*
				 * var map = new Ext.KeyMap(win.el,{ key: 13, fn: this.doSearch
				 * });
				 */
            }                                           
            return win;             
        },
        /**
		 * 改变grid视图的显示方式
		 */
        toggleDetails : function(obj) {
            var view = this.grid.getView();
            if (view.showPreview)
                view.showPreview = false;
            else
                view.showPreview = true;
            view.refresh();
        },
        swapSequence : function(down,inform) {
            return function() {
                var record = this.grid.getSelectionModel().getSelected();
                if (!record) {
                    this.alert("请先选择要操作的数据！","提示");
                    return;
                }
                var id = record.get("id");
                Ext.Ajax.request({
                    url : this.baseUrl + '?cmd=swapSequence',
                    params : {
                        'id' : record.get("id"),
                        down : down ? down : "",
                        parentId : this.parentId,
                        sq : this.grid.store.find("id", id) + 1
                    },
                    method : 'POST',
                    success : function(response) {
                        var r = Ext.decode(response.responseText);
                        if (!r.success)
                            this.alert("操作失败，失败原因：<br/>"
                                            + (r.errors.msg
                                                    ? r.errors.msg
                                                    : "未知"),"提示信息");
                        else {
                            if(inform){
                            Ext.Msg.alert("提示","操作成功", function() {
                                        this.store.reload();
                                        this.focus();
                                    }, this);
                            }
                            else {
                                this.store.reload();
                            }
                        }
                    },
                    scope : this
                });
            }
        },
        insertGridButton : function() {
            this.gridButtons.splice(10, 0, arguments);
        },
        showContextMenu : function(g, i, e) {
            if(this.menu){
            var evn = e ? e : g;
            evn.preventDefault();
            if (i>=0) {
                this.grid.getSelectionModel().selectRow(i, false);
            }
            this.menu.showAt(evn.getPoint());
            }
        },
        doOperate:function(grid,rowIndex,columnIndex,e){
                    var tag=e.getTarget("A",3);
                    if(tag){
                        var id=tag.getAttribute("theid");
                        var cmd=tag.getAttribute("op");
                        var cf=tag.getAttribute("cf");
                        if(id&&cmd)
                        this.operate(cmd,id,cf,grid,rowIndex,columnIndex,e);
                    }
        },
        operate:function(cmd,id,cf,grid,rowIndex,columnIndex,e){
            if(cmd=="edit")this.edit();
            else if(cmd=="view")this.view();
            else if(cmd=="remove")this.removeData();
            else {
            if(!cf)this.executeUrl(this.baseUrl,{cmd:cmd,id:id},this.refresh.createDelegate(this))();
            else Ext.Msg.confirm("提示","确认要执行该操作吗?",function(btn){
                if(btn=="yes")this.executeUrl(this.baseUrl,{cmd:cmd,id:id},this.refresh.createDelegate(this))();
                else this.focus();
            },this);
            }
        },
        findOperatorByProperty:function(name,value){
            return this.findOperatorBy(function(o){if(o[name]==value)return true;});
        },
        findOperatorBy:function(callback){
            var objs=[];
            this.operators.each(function(o){
                if(typeof o !="string"){
                    if(callback && callback(o))objs.push(o);
                }
            });
            return objs;
        },
        toggleSingleRowOperator:function(enable){
            var ids=this.findOperatorByProperty("singleRow",true);
            var args=[];
            if(ids && ids.length){
                for(var i=0;i<ids.length;i++)args.push(ids[i].name||ids[i].id);
            }
            if(enable)this.enableOperaterItem(args);
            else this.disableOperaterItem(args);
        },
        toggleAllOperator:function(enable){
            var args=[];
            this.operators.each(function(o){
                if(typeof o !="string"){
                    args.push(o.name||o.id);
                }
            });
            if(enable){
                this.enableOperaterItem(args);
            }
            else {this.disableOperaterItem(args);}
        },
        // 子类中可»¥éåè¯¥é©å­æ¹æ³å¯ç¨ç¶æ
        onRowSelection:function(record,index,sel){
            var sel=this.grid.getSelections();
            if(sel&&sel.length>1){
                this.toggleSingleRowOperator(false);
            }else this.toggleSingleRowOperator(true);
            var ids=this.findOperatorByProperty("batch",true);// æå¼æ¯ææ¹éæä½çæé®
            var args=[];
            if(ids && ids.length){
                for(var i=0;i<ids.length;i++)args.push(ids[i].name||ids[i].id);
            }
            this.enableOperaterItem(args);
        },
        changeOperaterItem:function(args,callback){
            if(args.length==1 && Ext.isArray(args[0]))args=args[0];
            if(this.grid.getTopToolbar()&&this.grid.getTopToolbar().items){// å·²ç»æ¸²æ
                for(var i=0;i<args.length;i++){
                    if(this.menu && this.menu.items){
                    var o=this.menu.items.find(function(c){
                        var n1=c.name||c.id;
                        if(n1==args[i])return true;
                    });
                    if(o)callback(o); 
                    }
                    o=this.grid.getTopToolbar().items.find(function(c){
                        var n1=c.name||c.id;
                        if(n1==args[i])return true;
                    });
                    if(o)callback(o);
                }
            }
            else {
                this.grid.on("render",function(){
                    for(var i=0;i<args.length;i++){
                        var o=this.grid.getTopToolbar().items.find(function(c){
                            var n1=c.name||c.id;
                            if(n1==args[i])return true;
                        });;
                        if(o)callback(o);
                    }
                },this);
            }
        },
        // è®©ä¸ç³»åçèåé¡¹åæå¯ç¨ç¶æ
        enableOperaterItem:function(){
            var args=arguments;
            this.changeOperaterItem(args,function(o){if(o.enable)o.enable();});
        },
        // ç¦ç¨ä¸ç³»åçèåé¡¹
        disableOperaterItem:function(){
            var args=arguments;
            this.changeOperaterItem(args,function(o){if(o.disable)o.disable();});
        },
        // æ¾ç¤ºä¸ç³»åçèååå·¥å·æ é¡¹
        showOperaterItem:function(){
            var args=arguments;
            this.changeOperaterItem(args,function(o){if(o.show)o.show();});
        },
        // 隐藏一系列的菜单及工具栏项
        hideOperaterItem:function(){
            var args=arguments;
            this.changeOperaterItem(args,function(o){if(o.hide){o.hide();}});
        },
        operatorConfig2Component:function(o,isMenu){
            var co=Ext.apply({},o);
            if(!co.handler){
                    if(co.method && this[co.method]){
                    co.handler=this[co.method];
                    }else
                    if(co.cmd)co.handler=co.batch?this.executeMulitCmd(co.cmd):this.executeCmd(co.cmd);
            }
            if(co.handler&&!co.scope)co.scope=this;
            if(!isMenu){// 对按钮的样式作处理
            if(this.operatorButtonStyle==2){
                if(co.icon){co.cls="x-btn-icon";co.text="";}
            }
            else if(this.operatorButtonStyle==3){
                co.icon="";
                co.cls="";
            }}
            var key=co.name||co.id;
            if(key=="searchField")co.store=this.store;
            else if(key=="btn_advancedSearch"){
            co.hidden=!((this.searchFormPanel || this.searchFP) && this.allowSearch);
            }
            return co;
        },
        buildCrudOperator:function(){
            if(!this.operators)this.initOperator();
            var bs=[];
            this.operators.each(function(c){
                if(typeof c =="string"){
                    bs.push(c);
                }
                else {
                if(!c.showInMenuOnly){  
                var co=this.operatorConfig2Component(c);
                var key=co.name||co.id;
                try{
                this[key]= eval("new "+(co.type||"Ext.Toolbar.Button")+"(co)");
                bs.push(this[key]);
                }
                catch(e){
                    alert(key+":"+e);
                }}
                }
            },this);
            this.loadOperatorsPermission();
            // 创建菜单
            if (!this.menu) {
                var ms=[];
                this.operators.each(function(c){
                    if(typeof c =="string" ){
                        if(c=="-")ms.push(c);
                    }   
                    else {
                        if(!c.showInToolbarOnly){
                        var co=this.operatorConfig2Component(c,true);
                        if(!co.type)ms.push(co);
                        }
                    }
                },this);
                ms.push({
                                name:"btn_help",
                                text : "帮助",
                                handler:this.help,
                                scope:this
                            })
                this.menu = new Ext.menu.Menu({
                    items : ms
                });
            }
            return bs;
        },
        initOperator:function(){
            this.initDisableOperators();
            this.operators=new Ext.util.MixedCollection();
            for(var i=0;i<this.crud_operators.length;i++){
                var co=this.crud_operators[i];
                if(typeof co =="object"){
                co=Ext.apply({},co);
                if(!co.batch && !co.noneSelectRow)co.singleRow=true;// noneSelectRow表示不需要进行行选择
                }
                var key=co.name||co.id;
                if(key && this.disable_operators.indexOf(key)>=0)continue;// 如果被禁用,则不用加入到operators中
                this.operators.add(co);
            }
            if(this.customizeQueryObject){
                this.operators.add({showInToolbarOnly:true,name:"btn_customizeQuery",cls : "x-btn-icon",icon : "images/icon-png/srsearch.gif", tooltip:"自定义查询",text:"", menu:["-",{text:"保存当前查询条件",handler:this.createQueryObject,scope:this},{text:"管理自定义查询",handler:this.manageQueryObject,scope:this}]}) 
            }
            if (this.gridButtons){
                var bi=(this.disable_operators.indexOf("searchField")>=0?this.operators.getCount()-1:this.operators.getCount()-2);
                this.insertOperator(bi,this.gridButtons);
            }
        },
        insertOperator:function(index,items){
            if(!this.operators){
                this.initOperator();
            }
            if(!Ext.isArray(items))items=[items];
            if(this.operators.getCount()<index)index=this.operators.getCount();
            var haveRender=this.grid&&this.grid.getTopToolbar&&this.grid.getTopToolbar()&&this.grid.getTopToolbar().items;
            for(var i=0;i<items.length;i++){
                var co=items[i];
                if(typeof co =="object"){
                co=Ext.apply({},co);
                if(!co.batch && !co.noneSelectRow)co.singleRow=true;// noneSelectRow表示不需要进行行选择
                }
                this.operators.insert(index+i,co);
                if(haveRender){
                    if(!co.showInMenuOnly){
                    var bo=this.operatorConfig2Component(Ext.apply({},co));
                    this.grid.getTopToolbar().insert(index+i,bo);
                    }
                    if(!co.showInToolbarOnly){
                    var mo=this.operatorConfig2Component(co,true);
                    if(this.menu)this.menu.insert(index+i, new Ext.menu.Item(mo));
                    }
                }
            }
        },
        initDisableOperators:function(){
            if(!this.disable_operators){this.disable_operators=[];}
            if(!this.exportData)this.disable_operators.push("btn_export");
            if(!this.importData)this.disable_operators.push("btn_import");
            if(!this.printData)this.disable_operators.push("btn_print");
            if(!this.clearData)this.disable_operators.push("btn_clearSearch");
            if(!this.allowSearch)this.disable_operators.push("btn_advancedSearch");
            if(!this.showAdd)this.disable_operators.push("btn_add");
            if(!this.showEdit)this.disable_operators.push("btn_edit");
            if(!this.showRemove)this.disable_operators.push("btn_remove");
            if(!this.showView)this.disable_operators.push("btn_view");
            if(!this.showRefresh)this.disable_operators.push("btn_refresh");
            if(!this.showSearchField)this.disable_operators.push("searchField");
        },
        manageQueryObject:function(){
            var win=new UserQueryObjectWin({crudService:this,objName:this.queryObjectName});
            win.show();
        },
        createQueryObject:function(){
            if (!this.searchQueryObjectPanel) {
                if (this.searchFP || this.searchFormPanel) {
                    this.searchQueryObjectPanel= this.searchFP ? this.searchFP() : this.searchFormPanel();
                    this.searchQueryObjectPanel.insert(0,{fieldLabel : '查询器名称',xtype:"textfield",name:"queryObjectName",anchor:"-20",allowBlank:false});
                    this.searchQueryObjectPanel.insert(1,{fieldLabel : '关键字',xtype:"textfield",name:"searchKey",anchor:"-20"});
                }
            }
            if (!this.searchQueryObjectPanel)
                return null;// 如果没有定义searchFP或searchFormPanel，则返回
            var win=this.createGlobalWin("CrudQueryObjectWindow",this.searchWin.width, this.searchWin.height+60,"保存查询条件",this.searchQueryObjectPanel,null,"searchQueryObjectPanel",[{
                                id:"tb_search",
                                text : "保存",
                                handler : this.saveQueryObject,
                                iconCls : 'search'
                            },{
                                text : "取消",
                                iconCls : 'delete',
                                handler : function() {
                                    EasyJF.Ext.CrudQueryObjectWindow.hide()
                                }
                            }]);
            win.getComponent(0).form.setValues(this.store.baseParams||{});
            win.getComponent(0).form.findField("queryObjectName").setValue("");
        },
        saveQueryObject:function(){
            var win = EasyJF.Ext.CrudQueryObjectWindow;
            if(!win.getComponent(0).form.isValid()){
                Ext.Msg.alert("提示","必填项必须填写!");
                return ;
            }
            var o = win.getComponent(0).form.getValues(false);
            var title=o.queryObjectName;
            delete o.queryObjectName;
            var service=win.crudService;
            
            var params={title:title,content:Ext.urlEncode(o),objName:service.queryObjectName};
            Ext.Ajax.request({url:"userQueryObject.ejf?cmd=save",params:params,success:function(response){
                var ret=Ext.decode(response.responseText);
                if(ret.success){
                this.addQueryObjectOperator([params]);
                Ext.Msg.alert("提示","操作成功!",this.focus,this);
                win.hide();
                }
                else {
                    Ext.Msg.alert("无法保存",ret.errors.msg,function(){win.getComponent(0).form.findField("searchKey").focus();});
                }
            },scope:service});
        },
        searchByQueryObject:function(c){
            if(c.content){
                var params=Ext.urlDecode(c.content);
                this.searchField.setValue(params.searchField||"");
                this.store.baseParams=params;
                if(this.store.lastOptions&&this.store.lastOptions.params)
                this.store.lastOptions.params.start=0;
            }
            this.refresh();
        },
        addQueryObjectOperator:function(objs){
            if(objs&&objs.length){
                var o=this.operators.find(function(c){
                    var n1=c.name||c.id;
                    if(n1=="btn_customizeQuery")return true;
                });
                if(!o)return;
                var haveRender=this.grid&&this.grid.getTopToolbar&&this.grid.getTopToolbar()&&this.grid.getTopToolbar().items;
                var btn_customizeQuery=this["btn_customizeQuery"];
                for(var i=0;i<objs.length;i++){
                    var co=objs[i];
                    co.scope=this;
                    co.text=co.title;
                    co.name="query_menu"+co.title;
                    co.handler=this.searchByQueryObject;
                    o.menu.splice(0,0,co);
                    if(btn_customizeQuery){
                        btn_customizeQuery.menu.insert(0,new Ext.menu.Item(co));
                    }
                }
                
            }
        },
        removeQueryObjectOperator:function(name){
            var btn_customizeQuery=this["btn_customizeQuery"];
            if(btn_customizeQuery){
                var item=btn_customizeQuery.menu.items.find(function(c){
                    var n1=c.name||c.id;
                    if(n1=="query_menu"+name)return true;
                });
                if(item)btn_customizeQuery.menu.remove(item);
            }
        },
        useOperatorsPermission:function(args){
            var ret=args||this.permissions;
            var args=[];
            for(var i=0;i<ret.length;i++){
                args.push(ret[i]);
                var o=this.operators.find(function(c){
                            var n1=c.name||c.id;
                            if(n1==args[i])return true;
                });
                if(o)o.hidden=false;
            }
            this.showOperaterItem(args);
            this.fireEvent("usepermission",this);
        },
        loadOperatorsPermission:function(){
            var args={},names=[],actions=[],cmds=[];
            var baseUrl=this.baseUrl;
            this.operators.each(function(o){
                if(typeof o !="string"){
                    if(!o.clientOperator && (o.cmd||o.method)){
                        actions.push(o.action||baseUrl);
                        cmds.push(o.cmd||o.method||"");
                        names.push(o.name||o.id||"");
                    }
                }
            });
            if(!this.permissions){
                var objs={names:names,actions:actions,cmds:cmds};
                if(this.customizeQueryObject&&this.queryObjectName){
                    objs.queryObjectName=this.queryObjectName;
                }
                Ext.Ajax.request({url:"permissionCheck.ejf",params:objs,callback:function(options,success,response){
                    var ret=Ext.decode(response.responseText);
                    if(ret&&ret.permissions&&ret.permissions.length){// 处理权限
                        this.permissions=ret.permissions;
                        this.useOperatorsPermission();
                    }
                    if(ret&&ret.queryObjects){
                        this.addQueryObjectOperator(ret.queryObjects);
                    }
                },scope:this});
            }
            else {
                this.useOperatorsPermission();
            }
        },      
        checkAdnLoadColumnField:function(){
            if(!this.storeMapping){
                var url=this.baseUrl+"?cmd=loadColumnField";
                if(this.entityClzName){
                    url="extApp.ejf?cmd=loadColumnField&entityClzName="+this.entityClzName;
                }
                var ajax=Ext.lib.Ajax.syncRequest("POST",url,"");
                var ret=Ext.decode(ajax.conn.responseText);
                if(ret&&ret.fields){
                this.storeMapping=ret.fields;
                if(ret.columnMap && !this.columns && !this.cm){
                    this.columns=[];
                    for(var index in ret.columnMap){
                        var c=ret.columnMap[index];
                        c.dataIndex=c.name;
                        if(!c.header)c.header=c.name;
                        var d=[];
                        if(this.autoDisplayFields && this.autoDisplayFields.indexOf(c.name)<0){
                            c.hidden=true;
                        }
                        if(this.autoHideFields&&this.autoHideFields.indexOf(c.name)>=0){
                            c.hidden=true;
                        }
                        if(this.disableHideableFields &&this.disableHideableFields.indexOf(c.name)>=0 ){
                            c.hideable=false;
                        }
                        if(c.sortable===undefined){
                            if(c.type!="object"){
                                c.sortable=true;
                            }
                        }
                        if(!c.renderer){// 自动处理Renderer
                        if(c.type=="date"){
                            c.renderer=this.dateRender("Y-m-d");
                        }
                        else if(c.type=="object" || c.type=="map"){
                            c.renderer=this.objectAutoRender;
                        }
                        }
                        else {// 把renderer转换成javascript对象
                        try{c.renderer=Ext.decode(c.renderer);}catch(e){}
                        }
                        this.columns.push(c);
                    }                   
                }
                }
            }
        },
        haveOperatorRights:function(btn){
            return this[btn]&& (!(this[btn].disabled ||this[btn].hidden));
        },
        handleCrudKey:function(e){
            if(!(e.isSpecialKey()||e.altKey||e.getKey()==e.DELETE))return;
            if(e.getKey()==Ext.EventObject.ENTER && !e.ctrlKey){
                e.stopEvent();
                this.edit();
            }
            else if(e.altKey && e.getKey()=='c'.charCodeAt(0) && this.haveOperatorRights("btn_edit") && this.copy){
                e.stopEvent();
                this.copy();
            }
            else if(e.altKey&&e.getKey()=='a'.charCodeAt(0) && this.haveOperatorRights("btn_add")){
                e.stopEvent();
                this.create();
            }
            else if(e.altKey&&e.getKey()=='e'.charCodeAt(0)&& this.haveOperatorRights("btn_edit")){
                e.stopEvent();
                this.edit();
            }
            else if(e.altKey&&e.getKey()=='v'.charCodeAt(0)&& this.haveOperatorRights("btn_view")){
                e.stopEvent();
                this.view();
            }
            else if((e.getKey()==e.DELETE ||(e.altKey&&e.getKey()=='d'.charCodeAt(0))) &&this.haveOperatorRights("btn_remove") ){
                e.stopEvent();
                this.removeData();
            }
            else if(e.altKey&&e.getKey()=='s'.charCodeAt(0)){
                e.stopEvent();
                this.advancedSearch();
                
            }
            else if((e.getKey()==e.PRINT_SCREEN ||(e.altKey&&e.getKey()=='p'.charCodeAt(0))) &&this.haveOperatorRights("btn_print") ){
                e.stopEvent();
                this.printRecord();
            }
            else if(e.altKey&&e.getKey()=='o'.charCodeAt(0)&& this.haveOperatorRights("btn_export")){
                e.stopEvent();
                this.exportExcel();
                
            }
            else if(e.altKey&&e.getKey()=='i'.charCodeAt(0)&& this.haveOperatorRights("btn_import")){
                e.stopEvent();
                this.importExcel();
                
            }
            
        },
        initCrudEventHandler:function(){
            // 双击表格行进入编辑状态
            this.grid.on("celldblclick", this.edit, this);
            this.grid.on("cellclick",this.doOperate,this);
            this.grid.on("keypress",this.handleCrudKey,this);
            this.grid.getSelectionModel().on("rowselect",function(g,index,r){
                    this.onRowSelection(r,index,g);
                },this);
            if (this.showMenu) {
                this.grid.on("rowcontextmenu", this.showContextMenu, this);         
            }
            EasyJF.Ext.Util.autoFocusFirstRow(this.grid);
        },
        focus:function(){
            this.focusCrudGrid();
        },
        focusCrudGrid:function(grid){
            var g=grid||this.grid;
            if(g&&g.rendered){
            var sel=g.getSelectionModel();
            if(sel && sel.hasSelection()) {
                g.getView().focusRow(g.store.indexOf(g.getSelectionModel().getSelected()));
            }else if(g.store.getCount()){
                g.getView().focusRow(0);
            }else {
                g.focus();
            }}
        },
        help:function(){
            // Ext.Msg.show({title:"系统帮助",buttons:Ext.Msg.OK,icon:Ext.Msg.INFO,msg:"欢迎使用本系统，本系统由成都蓝源信息技术有限公司开发!<br/>联系电话:028-86272612
            // <br/>网址：<a href='http://www.vifir.com'
            // target='_blank'>http://www.vifir.com</a>",maxWidth:100});
            Ext.Msg.show({title:"系统帮助",buttons:Ext.Msg.OK,icon:Ext.Msg.INFO,msg:"欢迎使用本系统!",maxWidth:100});
        }
    }   
/**
 * 增、删、改、查基类
 * 
 * @class EasyJF.Ext.CrudPanel
 * @extends Ext.Panel
 */
EasyJF.Ext.CrudPanel = Ext.extend(Ext.Panel, {
    viewWin : {
        width : 650,
        height : 410,
        title : "详情查看"
    },
    searchWin : {
        width : 630,
        height : 300,
        title : "高级查询"
    },// 查询窗口的高度、宽度及标题
    gridViewConfig : {},// 表格显示视图的自定义配置
    gridConfig : {},// 表格的自定义配置
    baseQueryParameter : {},// 查询初始化参数
    localStoreVar:window.undefined,// 客户端cache的名称
    initComponent : function() {
        this.checkAdnLoadColumnField();
        var storeConfig = {
            id : this.storeId?this.storeId:"id",
            url : this.defaultCmd?(this.baseUrl + '?cmd=list'):this.baseUrl,
            root : "result",
            totalProperty : "rowCount",
            remoteSort : true,
            fields : this.storeMapping
        };
        if(Ext.isEmpty(this.localStoreVar,false)){
            this.store = new Ext.data.JsonStore(storeConfig);
        }else{
            this.store = new EasyJF.Ext.CachedRemoteStore(Ext.apply({varName:this.localStoreVar,pageSize:Ext.num(this.pageSize,20)},storeConfig));
        }
        
        this.store.baseParams=Ext.apply({},{limit:this.pageSize||""});
        if(Ext.objPcount(this.baseQueryParameter)){
            this.store.on('beforeload',function(store,options){
                Ext.apply(store.baseParams,{},this.baseQueryParameter);
            },this);
        }
        this.store.paramNames.sort = "orderBy";
        this.store.paramNames.dir = "orderType";
        // this.cm.defaultSortable = true;
        EasyJF.Ext.CrudPanel.superclass.initComponent.call(this);
        this.addEvents("saveobject","removeobject");// 增加saveobject及removeobject事件
        
        var buttons=this.buildCrudOperator();
        
        var viewConfig = Ext.apply({
                        forceFit : this.gridForceFit
                    }, this.gridViewConfig);
        var gridConfig = Ext.apply(this.gridConfig, {
                        store : this.store,
                        stripeRows : true,
                        trackMouseOver : false,
                        loadMask : true,
                        viewConfig : viewConfig,
                        tbar:buttons,
                        border : false,
                        bbar : this.pagingToolbar ? new Ext.ux.PagingComBo({
                            rowComboSelect:true,
                            pageSize : this.pageSize,
                            store : this.store,
                            displayInfo : true
                        }) : null
                    });
            if(this.summaryGrid){
                if(gridConfig.plugins){
                    if(typeof gridConfig.plugins=="object")gridConfig.plugins=[gridConfig.plugins];
                }
                else gridConfig.plugins=[];
                gridConfig.plugins[gridConfig.plugins.length]=new Ext.ux.grid.GridSummary();
            }   
            if(this.columns)gridConfig.columns=this.columns;
            else if(this.cm)gridConfig.cm=this.cm;
            if(this.columnLock && Ext.grid.LockingGridPanel){
                if(!gridConfig.columns && gridConfig.cm){
                    gridConfig.columns=gridConfig.cm.config;
                    delete gridConfig.cm;
                }   
            this.grid = new Ext.grid.LockingGridPanel(gridConfig);
            }
            else this.grid=new Ext.grid.GridPanel(gridConfig);
            
        this.grid.colModel.defaultSortable = true;