<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>修改统计项目</title>
    </head>
    <script language=javascript>
        function datacheck(){
        if(document.all["tjxm"].value=="")
        {alert("你必须输入模版名称!");document.all["tjxm"].focus();return;}
        if(document.all["bglb"].options[document.all["bglb"].selectedIndex].value=="")
        {alert("你必须选择报告类别!");document.form1.bglb.focus();return;}
        else {
            document.form1.action="edit_jcxmtj_tj.jsp";
            document.form1.submit();}
        }

		function query(){
			document.form1.action="edit_jcxmtj.jsp";
			document.form1.submit();
		}
		
		function selectall(){
		var len=document.all["chkbx"].length;
		if (len>1){
		for (var i=0;i<len;i++){
		document.all["chkbx"][i].checked=true;
		}
		}else{
		document.all["chkbx"].checked=true;
		}
		document.all["btnunselectall"].style["display"]="inline";
		document.all["btnselectall"].style["display"]="none";
		}
		
		function unselectall(){
		var len=document.all["chkbx"].length;
		if (len>1){

		for (var i=0;i<len;i++){
		document.all["chkbx"][i].checked=false;
		}
		}else{
		document.all["chkbx"].checked=false;
		}
		document.all["btnunselectall"].style["display"]="none";
		document.all["btnselectall"].style["display"]="inline";
		}
    </script>
<body topmargin="1" leftmargin="0">
<form  method="post" name="form1">
<%
try{
	String roleid=(String)session.getAttribute("roleid");
	String danwei_id=(String)session.getAttribute("danweiid");
    String tempurl="xtgl/admin_jcxmtj.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
String jcxmtj_id="",tjxm="",bglb="";
int j=0,count=0;
if (request.getParameter("id")!=null){
	jcxmtj_id = qxbean.ISOtoGB(request.getParameter("id"));
	ResultSet jcxmtj_rs = qxbean.getResultSet("select * from xtglt_jcxmtj where id='"+ jcxmtj_id +"'");
	if(jcxmtj_rs.next()){
		tjxm=jcxmtj_rs.getString("tjxm");
		bglb=jcxmtj_rs.getString("bgzl2_id");
	}
}else{
	if (request.getParameter("bglb")!=null){bglb = qxbean.ISOtoGB(request.getParameter("bglb"));}else{bglb ="";}
	if (request.getParameter("tjxm")!=null){tjxm = qxbean.ISOtoGB(request.getParameter("tjxm"));}else{tjxm ="";}
}

ResultSet count_rs = qxbean.getResultSet("select count(*) num from xtglt_jcxmtj_jcxm where jcxmtj_id='"+jcxmtj_id+"'");
if(count_rs.next()){
	count=Integer.parseInt(count_rs.getString("num"));
}
String[] aryjcxm_id=new String[count];
ResultSet jcxmtj_jcxm_rs = qxbean.getResultSet("select jcxm_id from xtglt_jcxmtj_jcxm where jcxmtj_id='"+jcxmtj_id+"'");
while(jcxmtj_jcxm_rs.next()){
	aryjcxm_id[j]=jcxmtj_jcxm_rs.getString("jcxm_id");
	j++;
}
%>
<table height="138" cellSpacing="0" cellPadding="0" width="100%" border="0">
	<TR>
		<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;修改统计项目</DIV></TD>
	</TR>
	<TR>
		<TD vAlign="top">
			<TABLE style="BORDER-COLLAPSE: collapse" cellSpacing="1" width="100%" bgColor="#666666" border="0">
				<TR>
					<TD bgColor="#FFFAFA" align="center">模版名称</TD>
					<TD bgColor="#ffffff">
						<table border="0" align="left" cellpadding="0" cellspacing="0">
							<TR>
								<TD>
									<input type="text" name="tjxm" id="tjxm" size="20" value="<%=tjxm%>" maxlength="50"/>&nbsp;<FONT face="宋体" color="#ff0000" size=1>*</FONT>
								</TD>
							</TR>
						</TABLE>
					</TD>
				</TR>
				<TR>
					<TD bgColor="#FFFAFA" align="center">报告类别</TD>
					<TD bgColor="#ffffff">
						<select name="bglb" id="bglb" onchange="query()">
							<option value="">--选择--</option>
							<%
							String bglb_id, bglb_name;
							ResultSet bglb_rs = qxbean.getResultSet("select distinct bgzl2_id, name from all_bg inner join xtglt_bgzl2 on xtglt_bgzl2.id=bgzl2_id where xtglt_bgzl2.name like '%水%' and danwei_id in (select id from getsubdanwei(1,"+ danwei_id +"))");
							while(bglb_rs.next()){
								bglb_id=bglb_rs.getString("bgzl2_id");
								bglb_name=bglb_rs.getString("name");
							%>
							<option <%if(bglb.equals(bglb_id)){%>selected<%}%> value="<%=bglb_id%>"><%=bglb_name%></option>
							<%
							}%>
						</select>
						<FONT face="宋体" color="#ff0000" size=1>*</FONT>
					</TD>
				</TR>
				<TR>
					<TD bgColor="#FFFAFA" align="center">统计项目</TD>
					<TD bgColor="#ffffff">
						<table border="0" width="100%" align="left" cellpadding="0" cellspacing="0">
						<%
						String HasXm="NO";
						if(!bglb.equals("")){
							int i=0;
							String jcxm_id, jcxm_name;
							ResultSet jcxm_rs = qxbean.getResultSet("select jcxmid, jcxm from bg_shuizhi_1 where bg_shuizhi_id in (select id from bg_shuizhi where all_bg_id in (select id from all_bg where bgzl2_id='"+ bglb +"' and c_flag='已打印' and danwei_id in (select id from GetSubDanwei(1,"+ danwei_id +")))) group by jcxmid, jcxm order by count(jcxmid) desc");
							while(jcxm_rs.next()){
								i++;
								jcxm_id=jcxm_rs.getString("jcxmid");
								jcxm_name=jcxm_rs.getString("jcxm");
								HasXm="YES";
								String Has_jcxm="NO";
								for(j=0;j<java.lang.reflect.Array.getLength(aryjcxm_id);j++){
									if (aryjcxm_id[j].equals(jcxm_id)){
										Has_jcxm="YES";
									}
								}
							%>
							<TR>
								<TD align="center" width="20px"><%=i%></TD>
								<TD align="left">&nbsp;<input type=checkbox name="chkbx" id="chkbx" <%if (Has_jcxm.equals("YES")){%>checked<%}%> value="<%=jcxm_id%>"><%=jcxm_name%></TD>
							</TR>
							<%
							}
						}
						%>
						</TABLE>
					</TD>
				</TR>
				<TR>
					<TD vAlign="top" align="left" width="75" bgColor="#FFFAFA" height="18"></TD>
					<TD bgColor="#ffffff" height="18">
						<input type="button" name="btnselectall" value="全选" onclick="selectall()" <% if (HasXm.equals("NO")){%>style="display:none"<%}%>/>
						<input type="button" name="btnunselectall" value="全不选" onclick="unselectall()" style="display:none" />
						<input type="button" name="save" id="save" value="保存" onclick="datacheck()" />&nbsp;&nbsp;
						<input type="reset"  name="rewrite" id="rewrite" value="重写" />&nbsp;&nbsp;
						<input type="button" name="return" value="返回" onclick="window.location='admin_jcxmtj.jsp'" />
					</TD>
				</TR>
			</TABLE>
		</TD>
	</TR>
</table>
<input type="hidden" value="<%=jcxmtj_id%>" id="jcxmtj_id" name="jcxmtj_id">
</form>
</body>
</html>
<%
}catch(Exception e){
	System.out.println("页面"+request.getRequestURI()+"出错："+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
}
%>