<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<LINK href="../xtgl/xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>修改分子式</title>
    </head>
    <script language=javascript>
        function datacheck(){
        if(document.all["div_cnfzs"].innerHTML=="")
			{alert("你必须输入分子式名称!");document.all["div_cnfzs"].focus();return;}
			if(document.all["div_fzs"].innerHTML=="")
			{alert("你必须输入分子式!");document.all["div_fzs"].focus();return;}
        else {
			document.all["fzs"].value = document.all["div_fzs"].innerHTML;
			document.all["cnfzs"].value = document.all["div_cnfzs"].innerHTML;
            document.form1.action="edit_fzs_tj.jsp";
            document.form1.submit();}
        }

		function addcontent(){
			if (document.all["objectname"].value!=""&&document.all["objectnamehidden"].value!=""){
				newwin=window.open("","","resizable=yes, scrollbars=yes")
				if (document.all){
				   newwin.moveTo((screen.width-400)/2,(screen.height-310)/2)
				   newwin.resizeTo(400,310)
				}		
				newwin.location="../FCKeditor/editor_page/edit_fzs.html?n1="+ document.all["objectname"].value +"&n2=" + document.all["objectnamehidden"].value + "&v=" + document.all[document.all["objectname"].value].innerHTML;
			}else{
				alert("请先选择要编辑的位置！");
			}		
		}
		
		function GetObjectName(namehidden){
			var name = "div_"+namehidden;
			document.all["objectname"].value=name;
			document.all["objectnamehidden"].value=namehidden;
		}
    </script>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<body topmargin="1" leftmargin="0">
	<form  method="post" name="form1">
<%
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="common/admin_fzs.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
	String fzs_id = request.getParameter("id");
	String fzs="", cnfzs="";
	ResultSet rsGetData = qxbean.getResultSet("SELECT * FROM xtglt_insert_char where id='"+fzs_id+"'");
    if(rsGetData.next()){
        fzs=rsGetData.getString("chem_name");
        cnfzs=rsGetData.getString("cn_name");
    }
%>
	<table height="138" cellSpacing="0" cellPadding="0" width="100%" border="0">
		<TR>
			<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;修改分子式</DIV></TD>
		</TR>
		<TR>
			<TD vAlign="top" >
				<TABLE style="BORDER-COLLAPSE: collapse" height="101" cellSpacing="1" width="100%" bgColor="#666666" border="0">
					<TR>
						<TD bgColor="#FFFAFA" align="center">分子式名称</TD>
							<TD bgColor="#ffffff">
								<table border="0" align="left" cellpadding="0" cellspacing="0">
									<TR>
										<TD>
											<font size=2><div id="div_cnfzs" style="width:150px" name="div_cnfzs" contenteditable onfocus="GetObjectName('cnfzs')"><%=cnfzs%></div></font>
											<input type="text" name="cnfzs" id="cnfzs" size="20" maxlength="50" value="<%=cnfzs%>" style="display:none"/>
										</TD>
										<TD><a href="javascript:addcontent();"><img valign="middle" alt='编辑器' onclick="GetObjectName('cnfzs')" src='../root_img/edit.gif' border="0" style="cursor:hand"></a></td>
										<TD>
											&nbsp;&nbsp;<FONT face="宋体" color="#ff0000" size=1>*</FONT>
										</TD>
									</TR>
								</TABLE>
							</TD>
					</TR>
					<TR>
						<TD bgColor="#FFFAFA" align="center">分子式</TD>
						<TD bgColor="#ffffff">
							<table border="0" align="left" cellpadding="0" cellspacing="0">
								<TR>
									<TD>
										<font size=2><div id="div_fzs" style="width:150px" name="div_fzs" contenteditable onfocus="GetObjectName('fzs')"><%=fzs%></div></font>
										<input type="text" name="fzs" id="fzs" size="20" maxlength="50" value="<%=fzs%>" style="display:none"/>
									</TD>
									<TD><a href="javascript:addcontent();"><img valign="middle" alt='编辑器' onclick="GetObjectName('fzs')" src='../root_img/edit.gif' border="0" style="cursor:hand"></a></td>
									<TD>
										&nbsp;&nbsp;<FONT face="宋体" color="#ff0000" size=1>*</FONT>
									</TD>
								</TR>
							</TABLE>
						</TD>
					</TR>
					<TR>
						<TD vAlign="top" align="left" width="75" bgColor="#FFFAFA" height="18"></TD>
						<TD bgColor="#ffffff" height="18">&nbsp;
							<input type="button" name="save" id="save" value="保存" onclick="datacheck()" />&nbsp;&nbsp;
							<input type="reset"  name="rewrite" id="rewrite" value="重写" />&nbsp;&nbsp;
							<input type="button" name="return" value="返回" onclick="window.location='admin_fzs.jsp'" />
						</TD>
					</TR>
				</TABLE>
			</TD>
		</TR>
	</table>
<input type=hidden name="objectname" id="objectname">
<input type=hidden name="objectnamehidden" id="objectnamehidden">
<input type="hidden" name="fzsid" value="<%=fzs_id%>">
	</form>
</body>
</html>