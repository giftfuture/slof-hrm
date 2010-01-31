<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>添加功能</title>
    </head>
<SCRIPT language="javascript" src="../script/listmenu.js"></SCRIPT>
<script language=javascript>
	function datacheck(){
		if(document.form1.gnname.value==""){
			alert("您必须输入菜单名称!");
			document.form1.gnname.focus();
			return;
		}
		if(document.all['gnlx'][1].checked==true&&document.form1.description.value==""){
			alert("文件路径不能为空!");
			document.form1.description.focus();
			return;
		}			
		if(document.all['gnlx'][2].checked==true&&document.form1.description.value==""){
			alert("您必须关联功能文件!");
			document.form1.select_filepath.focus();
			return;
		}else{
			document.form1.submit();
		}			
	}
	
	//目录菜单选项
	function mlcd_onclick(){
		document.all['tr_filepath'].style['display']='none';
		document.all['tr_glgn'].style['display']='none';
		document.all['description'].value='';
	}
	//功能菜单选项
	function gncd_onclick(){
		document.all['tr_filepath'].style['display']='inline';
		document.all['tr_glgn'].style['display']='none';
		document.all['description'].readOnly=false;
	}
	//分组菜单选项
	function fzcd_onclick(){
		document.all['tr_filepath'].style['display']='inline';
		document.all['tr_glgn'].style['display']='inline';
		document.all['description'].readOnly=true
	}
	//当选择主菜单时
	function zcd_onclick(){
		if(document.all['superiorid_lvl'].value==""){
			document.all['tr_gnlx'].style['display']='none';
			document.all['tr_txcd'].style['display']='inline';
		}else{
			document.all['tr_gnlx'].style['display']='inline';
			document.all['tr_txcd'].style['display']='none';
			document.all['gnlx'][0].checked=true;
			document.all['gnlx'][1].checked=false;
			document.all['gnlx'][2].checked=false;
			document.all['ckbtxcd'].checked=false;
		}
		mlcd_onclick();
	}
</script>
    <body>
        <form action="add_gn_tj.jsp" method="post" name="form1">
            <table height="138" cellSpacing="0" cellPadding="0" width="100%" border="0">
                <TR>
                    <TD class="heading" bgColor="#4e5960" height="20"><FONT color="#ffffff"><B>&nbsp;&nbsp;添加功能</B></FONT></TD>
                </TR>
                <TR>
                    <TD vAlign="top" >
                        <TABLE style="BORDER-COLLAPSE: collapse" height="101" cellSpacing="1" width="100%" bgColor="#666666" border="0">
                            <TR>
                                <TD bgColor="#efefef" align="center">菜单名称</TD>
                                <TD bgColor="#ffffff"><input name="gnname" type="text" size="50" maxlength="50" id="gnname"/><FONT face="宋体" color="#ff0000">*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#efefef" align="center">上级菜单名称</TD>
                                <TD bgColor="#ffffff">
                                    <select name="superiorid_lvl" onchange="zcd_onclick()">
                                        <option selected value="">主菜单</option>
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_gn.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
	String id,name,lvl,zhu_id,upid;
	int i=0,intlvl=0,HasSub=0;
	ResultSet zhu_rs = qxbean.getResultSet("select id from xtglt_gn where id=superior_id order by id");
	while(zhu_rs.next()){
		zhu_id=zhu_rs.getString("id");
		ResultSet rs = qxbean1.getResultSet("select * from GetSubgn(1,"+zhu_id+")");
		
		while(rs.next()){
			id=rs.getString("id");
			name=rs.getString("name");
			lvl=rs.getString("lvl");
			HasSub=Integer.parseInt(rs.getString("hassub"));
			intlvl=Integer.parseInt(lvl)-1;
		%>                                
			<option value="<%=id%>_<%=lvl%>"><%for(i=0;i<intlvl;i++){out.println("│");}%><%if (HasSub==0){out.println("├─-");}else{out.println("├-┼");}%><%=name%></option>
		<%}
	 }%>
                                    </select>
                                    <FONT face="宋体" color="#ff0000">*</FONT>
                                </TD>
                            </TR>
                            <TR id="tr_gnlx" style="display:none">
                                <TD align="center" bgColor="#efefef">功能类型</TD>
                                <TD bgColor="#ffffff">									
									<input type="radio" name="gnlx" id="gnlx" value="2" checked onclick="mlcd_onclick()">目录菜单&nbsp;&nbsp;
									<input type="radio" name="gnlx" id="gnlx" value="1" onclick="gncd_onclick()">功能菜单&nbsp;&nbsp;
									<input type="radio" name="gnlx" id="gnlx" value="3" onclick="fzcd_onclick()">分组菜单
								</TD>
                            </TR>
							<TR id="tr_txcd" style="display:inline">
								<TD align="center" bgColor="#efefef">报告体系菜单</TD>
								<TD bgColor="#ffffff"><input type="checkbox" id="ckbtxcd" name="ckbtxcd" value="4">&nbsp;属于报告体系菜单</TD>
							</TR>
                            <TR id="tr_glgn" style="display:none">
                                <TD align="center" bgColor="#efefef">关联功能文件</TD>
                                <TD bgColor="#ffffff">
                                   <select name="select_filepath" onchange="document.all['description'].value=document.all['select_filepath'].value.split(':')[1]">
<%
	zhu_rs = qxbean.getResultSet("select id from xtglt_gn where id=superior_id order by id");
	while(zhu_rs.next()){
		zhu_id=zhu_rs.getString("id");
		ResultSet rs = qxbean1.getResultSet("select * from GetSubgn(1,"+zhu_id+") where flag<>'3'");
		while(rs.next()){
			id=rs.getString("id");
			name=rs.getString("name");
			String filepath=rs.getString("description");
			lvl=rs.getString("lvl");
			HasSub=Integer.parseInt(rs.getString("hassub"));
			intlvl=Integer.parseInt(lvl)-1;
		%>                                
			<option value="<%=id%>:<%=filepath%>"><%for(i=0;i<intlvl;i++){out.println("│");}%><%if (HasSub==0){out.println("├─-");}else{out.println("├-┼");}%><%=name%></option>
		<%}
	 }%>
                                    </select>
								</TD>
                            </TR>
                            <TR id="tr_filepath" style="display:none">
                                <TD align="center" bgColor="#efefef">文件路径</TD>
                                <TD bgColor="#ffffff"><input type=text size="50" id="description" name="description"><FONT face="宋体" color="#ff0000"><B>参考:*.jsp, */*.jsp, */*.htm</B></FONT></TD>
                            </TR>
                            <TR>
                                <TD vAlign="top" align="left" width="75" bgColor="#efefef" height="18"></TD>
                                <TD bgColor="#ffffff" height="18">&nbsp;
                                    <input type="button" name="save" id="save" value="保存" onclick="datacheck()" />&nbsp;&nbsp;
                                    <input type="reset"  name="rewrite" id="rewrite" value="重写" />&nbsp;&nbsp;
                                    <input type="button" name="return" value="返回" onclick="window.location='admin_gn.jsp'" />
                                </TD>
                            </TR>
                            <TR>
                                <TD align="center" bgColor="#efefef">选择上级菜单</TD>
                                <TD bgColor="#ffffff"><input type=text size="20" id="upmenu" name="upmenu" readonly ondblclick="alert('asdfasdf')" style="cursor:text" title="双击选择上级菜单"></TD>
                            </TR>
                        </TABLE>
                    </TD>
                </TR>
            </table>
        </form>
<script language=javascript>
function lib_bwcheck(){
	this.ver=navigator.appVersion; this.agent=navigator.userAgent
	this.dom=document.getElementById?1:0
	this.ie5=(this.ver.indexOf("MSIE 5")>-1 && this.dom)?1:0;
	this.ie6=(this.ver.indexOf("MSIE 6")>-1 && this.dom)?1:0;
	this.ie4=(document.all && !this.dom)?1:0;
	this.ie=this.ie4||this.ie5||this.ie6
	this.mac=this.agent.indexOf("Mac")>-1
	this.opera5=this.agent.indexOf("Opera 5")>-1
	this.ns6=(this.dom && parseInt(this.ver) >= 5) ?1:0; 
	this.ns4=(document.layers && !this.dom)?1:0;
	this.bw=(this.ie6 || this.ie5 || this.ie4 || this.ns4 || this.ns6 || this.opera5 || this.dom)
	return this
}
var bw=new lib_bwcheck()
var mDebugging=0
oCMenu=new makeCoolMenu("oCMenu")
oCMenu.useframes=0
oCMenu.frame="main"
oCMenu.useclick=0
oCMenu.pagecheck=1
oCMenu.checkscroll=1
oCMenu.resizecheck=1
oCMenu.wait=100
//Placement properties
oCMenu.rows=1
oCMenu.fromleft=250
oCMenu.fromtop=138
oCMenu.pxbetween=30
oCMenu.menuplacement=""
oCMenu.level[0]=new Array()
oCMenu.level[0].width=60
oCMenu.level[0].height=16
oCMenu.level[0].bgcoloroff="white"
oCMenu.level[0].bgcoloron="white"
oCMenu.level[0].textcolor="red"
oCMenu.level[0].hovercolor="red"
oCMenu.level[0].style="padding:2px; font-size:12px"
oCMenu.level[0].border=0
oCMenu.level[0].bordercolor="red"
oCMenu.level[0].offsetX=0
oCMenu.level[0].offsetY=0
oCMenu.level[0].NS4font="tahoma,arial,helvetica"
oCMenu.level[0].NS4fontSize="2"
oCMenu.level[0].clip=1
oCMenu.level[0].clippx=15
oCMenu.level[0].cliptim=50
oCMenu.level[0].filter="progid:DXImageTransform.Microsoft.Fade(duration=0.5)"
oCMenu.level[0].align="bottom"


oCMenu.level[1]=new Array()
oCMenu.level[1].width=oCMenu.level[0].width
oCMenu.level[1].height=22
oCMenu.level[1].style="padding:2px; font-size:12px"
oCMenu.level[1].align="bottom"
oCMenu.level[1].bgcoloroff="lightyellow"
oCMenu.level[1].bgcoloron="lightyellow"
oCMenu.level[1].textcolor="blue"
oCMenu.level[1].hovercolor="red"
oCMenu.level[1].offsetX=0
oCMenu.level[1].offsetY=0
oCMenu.level[1].border=1 
oCMenu.level[1].bordercolor="#006699"

oCMenu.level[2]=new Array()
oCMenu.level[2].width=oCMenu.level[0].width
oCMenu.level[2].height=22
oCMenu.level[2].style="padding:2px; font-size:12px"
oCMenu.level[2].align="bottom"
oCMenu.level[2].bgcoloroff="lightyellow"
oCMenu.level[2].bgcoloron="lightyellow"
oCMenu.level[2].textcolor="blue"
oCMenu.level[2].hovercolor="red"
oCMenu.level[2].offsetX=0
oCMenu.level[2].offsetY=0
oCMenu.level[2].border=1 
oCMenu.level[2].bordercolor="#006699"

oCMenu.makeMenu('main','','<img src=\"img\/menuimg.gif\">','','',20,20)
<%
	zhu_rs = qxbean.getResultSet("select id from xtglt_gn where id=superior_id order by id");
	while(zhu_rs.next()){
		zhu_id=zhu_rs.getString("id");
		ResultSet rs = qxbean1.getResultSet("select * from GetSubgn(1,"+zhu_id+")");		
		while(rs.next()){
			id=rs.getString("id");
			name=rs.getString("name");
			upid=rs.getString("superior_id");
			String filepath=rs.getString("description");
			lvl=rs.getString("lvl");
			HasSub=Integer.parseInt(rs.getString("hassub"));
			intlvl=Integer.parseInt(lvl)-1;
%>
oCMenu.makeMenu('sub_<%=id%>','<%if(id.equals(upid)){%>main<%}else{%>sub_<%=upid%><%}%>','<span align=left style=\"width:110px\"><%=name%></span><span align=right><%if(HasSub==1){%><img src=\"img\/submenu.gif\"><%}%></span>','','',122,20,'','','','','','','document.all[\"upmenu\"].value=\"<%=name%>\"')
<%
		}
	}
%>
oCMenu.makeStyle(); oCMenu.construct()			
</script>
    </body>
</html>
<%
}catch(Exception e){
	System.out.println("页面"+request.getRequestURI()+"出错："+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
	qxbean1.close();
}
%>