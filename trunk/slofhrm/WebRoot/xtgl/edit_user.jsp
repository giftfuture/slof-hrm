<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
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
        if(document.all["superiorid"].options[document.all["superiorid"].selectedIndex].text=="")
        {alert("�����ѡ���û�������λ!");document.form1.superiorid.focus();return;}
        if(document.all["role_id"].length==0)
        {alert("�����ѡ���û��顣\n���û���û��飬���������û���");document.form1.role_id.focus();return;}
        else 
        {
            document.form1.action="edit_user_tj.jsp";
            document.form1.submit();}
        }
        
        function GetRole(id)
        {
        document.form1.action="edit_user.jsp?id="+id;
        document.form1.submit();
        }

    </script>
    <body topmargin="1" leftmargin="0">
        <jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
        <jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
        <jsp:useBean id="qxbean2" scope="page" class="jlcx.DBConn"/>
        <form  method="post" name="form1">
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_user.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
    String user_id = request.getParameter("id");
    String dwid ="",username="",pwd="",repwd="",user_name="",email="",phone="",note="",getrole_id="";
    
    ResultSet rsGetData = qxbean.getResultSet("SELECT * FROM xtglt_user where id='"+user_id+"'");
    if(rsGetData.next()){
        username=rsGetData.getString("username");
        pwd=rsGetData.getString("password");
        user_name=rsGetData.getString("name");
        if(rsGetData.getString("email")!=null){email=rsGetData.getString("email");}else{email="";}
        if(rsGetData.getString("phone")!=null){phone=rsGetData.getString("phone");}else{phone="";}
        note=rsGetData.getString("note");
        getrole_id=rsGetData.getString("role_id");
    }
    //�õ�Ҫ�޸��û���������λ danwei_id,�������ϵͳ����Ա��danwei_id=null��dwid
    ResultSet danwei_rs = qxbean.getResultSet("select danwei_id from xtglt_role where id='"+getrole_id+"'");
    if(danwei_rs.next()){
		if (danwei_rs.getString("danwei_id")!=null){dwid=danwei_rs.getString("danwei_id");}else{}
    }
    
    if (request.getParameter("superiorid")!=null){dwid = request.getParameter("superiorid");}
    if (request.getParameter("username")!=null){username = qxbean.ISOtoGB(request.getParameter("username"));}
    if (request.getParameter("pwd")!=null){pwd = request.getParameter("pwd");}
    if (request.getParameter("repwd")!=null){repwd = request.getParameter("repwd");}
    if (request.getParameter("user_name")!=null){user_name = qxbean.ISOtoGB(request.getParameter("user_name"));}
    if (request.getParameter("email")!=null){email = qxbean.ISOtoGB(request.getParameter("email"));}
    if (request.getParameter("phone")!=null){phone = qxbean.ISOtoGB(request.getParameter("phone"));}
    if (request.getParameter("note")!=null){note = qxbean.ISOtoGB(request.getParameter("note"));}

%>
            <table height="138" cellSpacing="0" cellPadding="0" width="100%" border="0">
                <TR>
					<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;�޸��û�</DIV></TD>
                </TR>
                <TR>
                    <TD vAlign="top" >
                        <TABLE style="BORDER-COLLAPSE: collapse" height="101" cellSpacing="1" width="100%" bgColor="#666666" border="0">
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">�û���</TD>
                                <TD bgColor="#ffffff" ><input name="username" type="text" size="50" maxlength="50" id="username" value="<%=username%>"/><FONT face="����" color="#ff0000">*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">����</TD>
                                <TD bgColor="#ffffff" ><input name="pwd" type="text" size="10" maxlength="10" id="pwd" value="<%=pwd%>"/><FONT face="����" color="#ff0000">*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">�ظ�����</TD>
                                <TD bgColor="#ffffff" ><input name="repwd" type="password" size="10" maxlength="10" id="repwd" value="<%=pwd%>"/><FONT face="����" color="#ff0000">*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">����</TD>
                                <TD bgColor="#ffffff" ><input name="user_name" type="text" size="50" maxlength="50" id="user_name" value="<%=user_name%>"/><FONT face="����" color="#ff0000">*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">E-Mail</TD>
                                <TD bgColor="#ffffff" ><input name="email" type="text" size="50" maxlength="50" id="email" value="<%=email%>"/></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">�绰</TD>
                                <TD bgColor="#ffffff" ><input name="phone" type="text" size="50" maxlength="50" id="phone" value="<%=phone%>"/></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">��ע</TD>
                                <TD bgColor="#ffffff" ><textarea name="note" rows="6" id="note" style="height:72px;width:456px;"><%=note%></textarea></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">ѡ��������λ</TD>
                                <TD bgColor="#ffffff">
                                    <select name="superiorid" onchange="GetRole(<%=user_id%>);">
                                    <%                                       
                                    String id,name,lvl,zhu_id="";
                                    int i=0,intlvl=0,HasSub=0;
                                    
                                    //�����û���¼��Ȩ�ޣ��ж����¼���λ
                                    //�������ϵͳ�Ĺ���Ա��ѭ���г����е�λ
                                    //ȡ����ϵͳ����Ա��role_id�����ݵ�λΪ�գ���ϵͳ����Ա�������κε�λ
                                    String admin_role_id="",admin_role_name="";
                                    ResultSet admin_rs = qxbean.getResultSet("select * from xtglt_role where danwei_id is null");
                                    if (admin_rs.next()){
                                        admin_role_id=admin_rs.getString("id");
										admin_role_name=admin_rs.getString("rolename");
                                    }

                                    if (roleid.equals(admin_role_id)){
										if (dwid.equals("")){
										%><option selected value="">�������κε�λ</option><%
										}else{
											ResultSet zhu_rs = qxbean1.getResultSet("select id from xtglt_danwei where id=superior_id order by id");
											while(zhu_rs.next()){
												zhu_id=zhu_rs.getString("id");
												ResultSet rs = qxbean.getResultSet("select * from GetSubdanwei(1,"+zhu_id+")");
												
												while(rs.next()){
													id=rs.getString("id");
													name=rs.getString("name");
													lvl=rs.getString("lvl");
													HasSub=Integer.parseInt(rs.getString("hassub"));
													intlvl=Integer.parseInt(lvl)-1;													
													%>
													<option <%if (id.equals(dwid)){%>selected<%}%> value="<%=id%>"><%for(i=0;i<intlvl;i++){out.println("|");}%><%if (HasSub==0){out.println("-");}else{out.println("+");}%><%=name%></option>
											  <%}
											}
										}
                                    }else{
                                        //����Ƿּ�����Ա�����������ڵ�λ�г������¼���λ
                                        //ȡ���ּ�����Ա��danwei_id
                                        String sub_admin_superior_id;
                                        int sub_admin_lvl=0;
                                        ResultSet sub_admin_rs = qxbean.getResultSet("select * from xtglt_danwei where id in(select danwei_id from xtglt_role where id='"+roleid+"')");
                                        if (sub_admin_rs.next()){
                                            zhu_id=sub_admin_rs.getString("id");
                                            sub_admin_superior_id=sub_admin_rs.getString("superior_id");
                                            //ȡ���ֹ���Ա���ڵ�λ�ļ���
                                            sub_admin_lvl=Integer.parseInt(sub_admin_rs.getString("lvl"));
                                        }
                                        
                                        ResultSet rs = qxbean.getResultSet("select * from GetSubdanwei(1,"+zhu_id+")");
                                        
                                        while(rs.next()){
                                            id=rs.getString("id");
                                            name=rs.getString("name");
                                            lvl=rs.getString("lvl");
											HasSub=Integer.parseInt(rs.getString("hassub"));
                                            intlvl=Integer.parseInt(lvl)-1;                                            
                                            %>
                                            <option <%if (id.equals(dwid)){%>selected<%}%> value="<%=id%>"><%for(i=0;i<intlvl;i++){out.println("|");}%><%if (HasSub==0){out.println("-");}else{out.println("+");}%><%=name%></option>
                                      <%}
                                    }%>
                                    </select>
                                    <FONT face="����" color="#ff0000">*</FONT>
                                </TD>
                            </TR>
                            <TR>

                                <TD bgColor="#FFFAFA" align="center">ѡ���û���</TD>
                                <TD bgColor="#ffffff">
                                    <select name="role_id">
                                        <%
                                        String GetRole_sql="",getroleid,rolename,rolenote;
                                        if (dwid.equals("")){GetRole_sql="select * from xtglt_role where danwei_id='"+ zhu_id +"'";}else{GetRole_sql="select * from xtglt_role where danwei_id='"+ dwid +"'";}
                                        int HasRole=0;
                                        ResultSet rs = qxbean.getResultSet(GetRole_sql);
                                        if (dwid.equals("")){
										%><option selected value="<%=admin_role_id%>"><%=admin_role_name%></option><%
										}else{
											while(rs.next()){
												HasRole++;
												getroleid=rs.getString("id");
												rolename=rs.getString("rolename");
											%>
											<option value="<%=getroleid%>" <%if (getroleid.equals(getrole_id)){%>selected<%}%>><%=rolename%></option>
											<%}
										}%>
                                    </select>
                                    <FONT face="����" color="#ff0000">*</FONT>
                                    <%if (!dwid.equals("")&&HasRole==0){%><input type=button value="�����û���" onclick="window.location='add_role.jsp?id=<%=dwid%>'"><%}%>
                                </TD>
                            </TR>  
                            <TR>
                                <TD vAlign="top" align="left" width="75" bgColor="#FFFAFA" height="18"></TD>
                                <TD bgColor="#ffffff" height="18">&nbsp;
                                    <input type="button" name="save" id="save" value="����" onclick="datacheck()" />&nbsp;&nbsp;
                                    <input type="reset"  name="rewrite" id="rewrite" value="��д" />&nbsp;&nbsp;
                                    <input type="button" name="return" value="����" onclick="window.location='admin_user.jsp'" />
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
	System.out.println("ҳ��"+request.getRequestURI()+"������"+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
	qxbean1.close();
}
%>