<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<LINK href="root.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>�޸��û�</title>
    </head>
    <script language=javascript>
        function datacheck()
        {
        if(document.form1.username.value=="")
        {alert("����������û���!");document.form1.username.focus();return;}
        if(document.form1.pwd.value=="")
        {alert("�������������!");document.form1.pwd.focus();return;}
        if(document.form1.repwd.value=="")
        {alert("����һ����������!");document.form1.repwd.focus();return;}
        if(document.form1.repwd.value!=document.form1.pwd.value)
        {alert("�����������벻��ȷ������������!");document.form1.repwd.focus();return;}
        if(document.form1.user_name.value=="")
        {alert("����������û�����!");document.form1.user_name.focus();return;}
        else 
        {
            document.form1.action="modify_user_tj.jsp";
            document.form1.submit();}
        }
    </script>
    <body>
        <form  method="post" name="form1">
<%
try{
String roleid=(String)session.getAttribute("roleid");
%>
    <%@ include file="logined.jsp"%>
<%
    String user_id = (String)session.getAttribute("userid");
    String dwid ="",username="",pwd="",repwd="",user_name="",email="",phone="",note="",getrole_id="";
    String danwei_id="",danwei_name="�������κε�λ",role_name="";
    ResultSet rsGetData = qxbean.getResultSet("SELECT * FROM xtglt_user where id='"+user_id+"'");
    if(rsGetData.next()){
        username=rsGetData.getString("username");
        pwd=rsGetData.getString("password");
        user_name=rsGetData.getString("name");
        if(rsGetData.getString("email")!=null){email=rsGetData.getString("email");}else{email="";}
        if(rsGetData.getString("phone")!=null){phone=rsGetData.getString("phone");}else{phone="";}
        note=rsGetData.getString("note");
    }

//�õ�Ҫ�޸��û���������λ����, �û������ƣ��������ϵͳ����Ա�������κε�λ,
ResultSet danwei_rs=qxbean.getResultSet("select * from xtglt_danwei where id in(select danwei_id from xtglt_role where id ='"+roleid+"')");
if(danwei_rs.next()) {
	danwei_id=danwei_rs.getString("id");
	danwei_name=danwei_rs.getString("name");
	session.setAttribute("danweiid",danwei_id);
	session.setAttribute("danweiname",danwei_name);
}
ResultSet role_rs=qxbean.getResultSet("select rolename from xtglt_role where id ='"+roleid+"'");
if(role_rs.next()) {
	role_name=role_rs.getString("rolename");
	session.setAttribute("rolename",role_name);
}
%>
            <table height="138" cellSpacing="0" cellPadding="0" width="100%" border="0">
                <TR>
                    <TD class="heading" bgColor="#4e5960" height="20" ><FONT color="#ffffff"><B>&nbsp;&nbsp;�޸��û�</B></FONT></TD>
                </TR>
                <TR>
                    <TD vAlign="top" >
                        <TABLE style="BORDER-COLLAPSE: collapse" height="101" cellSpacing="1" width="100%" bgColor="#666666" border="0">
                            <TR height="25">
                                <TD bgColor="#efefef" align="center" width="100">�û���</TD>
                                <TD bgColor="#ffffff" ><input name="username" type="text" size="20" maxlength="20" title="���20����" id="username" value="<%=username%>" style="border-style:Groove;height:21px;width:120px;"/><FONT face="����" color="#ff0000">*</FONT></TD>
                            </TR>
                            <TR height="25">
                                <TD bgColor="#efefef" align="center">����</TD>
                                <TD bgColor="#ffffff" ><input name="pwd" type="text" size="20" maxlength="20" title="���20����" id="pwd" value="<%=pwd%>" style="border-style:Groove;height:21px;width:120px;"/><FONT face="����" color="#ff0000">*</FONT></TD>
                            </TR>
                            <TR height="25">
                                <TD bgColor="#efefef" align="center">�ظ�����</TD>
                                <TD bgColor="#ffffff" ><input name="repwd" type="password" size="20" maxlength="20" title="���20����" id="repwd" value="" style="border-style:Groove;height:21px;width:120px;"/><FONT face="����" color="#ff0000">*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#efefef" align="center">����</TD>
                                <TD bgColor="#ffffff" ><input name="user_name" type="text" size="10" maxlength="10" title="���10����" id="user_name" value="<%=user_name%>" style="border-style:Groove;height:21px;width:120px;"/><FONT face="����" color="#ff0000">*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#efefef" align="center">E-Mail</TD>
                                <TD bgColor="#ffffff" ><input name="email" type="text" size="30" maxlength="50" title="���50����" id="email" value="<%=email%>" style="border-style:Groove;height:21px;width:200px;"/></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#efefef" align="center">�绰</TD>
                                <TD bgColor="#ffffff" ><input name="phone" type="text" size="30" maxlength="50" title="���50����" id="phone" value="<%=phone%>" style="border-style:Groove;height:21px;width:200px;"/></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#efefef" align="center">��ע</TD>
                                <TD bgColor="#ffffff" ><textarea name="note" rows="6" id="note" title="��ע���ݲ��ܳ���100���֣�" onkeydown="if(this.value.length>300) this.value=this.value.substring(0,100)" style="height:72px;width:456px;"><%=note%></textarea></TD>
                            </TR>
                            <TR height="25">
                                <TD bgColor="#efefef" align="center">ѡ��������λ</TD>
                                <TD bgColor="#ffffff">&nbsp;&nbsp;<%=danwei_name%></TD>
                            </TR>
                            <TR height="25">
                                <TD bgColor="#efefef" align="center">ѡ���û���</TD>
								<TD bgColor="#ffffff">&nbsp;&nbsp;<%=role_name%></TD>
                            </TR>  
                            <TR>
                                <TD vAlign="top" align="left" width="75" bgColor="#efefef" height="18"></TD>
                                <TD bgColor="#ffffff" height="18">&nbsp;
                                    <input type="button" name="save" id="save" value="�޸�" onclick="datacheck()" />&nbsp;&nbsp;
                                    <input type="reset"  name="rewrite" id="rewrite" value="��д" />&nbsp;&nbsp;                                    
                                </TD>
                            </TR>
                        </TABLE>
                    </TD>
                </TR>
            </table>
            <input type="hidden" name="id" value="<%=user_id%>">
        </form>
    </body>
</html>
<%
}catch(Exception e){
	System.out.println("ҳ��"+request.getRequestURI()+"����"+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
}
%>