<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>�޸ļ����Ŀ</title>
    </head>
    <script language=javascript>
        function datacheck(){
        if(document.all["div_jcxm"].innerHTML=="")
        {alert("�������������Ŀ����!");document.all["div_jcxm"].focus();return;}
        if(document.all["jcxmlb"].options[document.all["jcxmlb"].selectedIndex].value=="")
        {alert("�����ѡ������Ŀ���!");document.form1.jcxmlb.focus();return;}
        else {
			document.all["jcxm"].value = document.all["div_jcxm"].innerHTML;
            document.form1.action="edit_jcxm_tj.jsp";
            document.form1.submit();}
        }

		function addcontent(){
			if (document.all["objectname"].value!=""&&document.all["objectnamehidden"].value!=""){
				newwin=window.open("","","resizable=yes, scrollbars=yes")
				if (document.all){
				   newwin.moveTo((screen.width-400)/2,(screen.height-310)/2)
				   newwin.resizeTo(400,310)
				}		
				newwin.location="../FCKeditor/editor_page/edit_jcxm.html?n1="+ document.all["objectname"].value +"&n2=" + document.all["objectnamehidden"].value + "&v=" + document.all[document.all["objectname"].value].innerHTML;
			}else{
				alert("����ѡ��Ҫ�༭��λ�ã�");
			}		
		}
		
		function GetObjectName(namehidden){
			var name = "div_"+namehidden;
			document.all["objectname"].value=name;
			document.all["objectnamehidden"].value=namehidden;
		}
    </script>
<body topmargin="1" leftmargin="0">
	<form  method="post" name="form1">
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_jcxm.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
	String jcxm_id = request.getParameter("id");
	String jcxm="",jcxmlb="";
	ResultSet rsGetData = qxbean.getResultSet("SELECT * FROM xtglt_jcxm where id='"+jcxm_id+"'");
    if(rsGetData.next()){
        jcxm=rsGetData.getString("jcxm");
        jcxmlb=rsGetData.getString("jcxmlb");
    }
%>
	<table height="138" cellSpacing="0" cellPadding="0" width="100%" border="0">
		<TR>
			<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;�޸ļ����Ŀ</DIV></TD>
		</TR>
		<TR>
			<TD vAlign="top" >
				<TABLE style="BORDER-COLLAPSE: collapse" height="101" cellSpacing="1" width="100%" bgColor="#666666" border="0">
					<TR>
						<TD bgColor="#efefef" align="center">��Ŀ����</TD>
						<TD bgColor="#ffffff">
							<table border="0" align="left" cellpadding="0" cellspacing="0">
								<TR>
									<TD>
										<font size=2><div id="div_jcxm" style="width:150px" name="div_jcxm" contenteditable onfocus="GetObjectName('jcxm')"><%=jcxm%></div></font>
										<input type="text" name="jcxm" id="jcxm" size="20" maxlength="50" value="<%=jcxm%>" style="display:none"/>
									</TD>
									<TD><a href="javascript:addcontent();"><img valign="middle" alt='�༭��' onclick="GetObjectName('jcxm')" src='../root_img/edit.gif' border="0" style="cursor:hand"></a></td>
									<TD>
										&nbsp;&nbsp;<FONT face="����" color="#ff0000" size=1>*</FONT>
									</TD>
								</TR>
							</TABLE>
						</TD>
					</TR>
					<TD bgColor="#FFFAFA" align="center">ѡ�������</TD>
						<TD bgColor="#ffffff">
							<select name="jcxmlb">
								<option <%if(jcxmlb.equals("ˮ��")){%>selected<%}%> value="ˮ��">ˮ��</option>
								<option <%if(jcxmlb.equals("����")){%>selected<%}%> value="����">����</option>
								<option <%if(jcxmlb.equals("����")){%>selected<%}%> value="����">����</option>
							</select>
							<FONT face="����" color="#ff0000" size=1>*</FONT>
						</TD>
					</TR>
					<TR>
						<TD vAlign="top" align="left" width="75" bgColor="#FFFAFA" height="18"></TD>
						<TD bgColor="#ffffff" height="18">&nbsp;
							<input type="button" name="save" id="save" value="����" onclick="datacheck()" />&nbsp;&nbsp;
							<input type="reset"  name="rewrite" id="rewrite" value="��д" />&nbsp;&nbsp;
							<input type="button" name="return" value="����" onclick="window.location='admin_jcxm.jsp'" />
						</TD>
					</TR>
				</TABLE>
			</TD>
		</TR>
	</table>
<input type=hidden name="objectname" id="objectname">
<input type=hidden name="objectnamehidden" id="objectnamehidden">
<input type="hidden" name="jcxmid" value="<%=jcxm_id%>">
	</form>
</body>
</html><%
}catch(Exception e){
	System.out.println("ҳ��"+request.getRequestURI()+"����"+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
}
%>