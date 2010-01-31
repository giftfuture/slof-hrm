<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>添加用户</title>
    </head>
    <script language=javascript>
        function datacheck()
        {
        if(document.form1.username.value=="")
        {alert("你必须输入用户名!");document.form1.username.focus();return;}
        if(document.form1.pwd.value=="")
        {alert("你必须输入密码!");document.form1.pwd.focus();return;}
        if(document.form1.repwd.value=="")
        {alert("请再一次输入密码!");document.form1.repwd.focus();return;}
        if(document.form1.repwd.value!=document.form1.pwd.value)
        {alert("密码两次输入不正确，请重新输入!");document.form1.repwd.focus();return;}
        if(document.form1.user_name.value=="")
        {alert("你必须输入用户姓名!");document.form1.user_name.focus();return;}
        if(document.all["superiorid"].options[document.all["superiorid"].selectedIndex].value=="")
        {alert("你必须选择用户所属单位!");document.form1.superiorid.focus();return;}
        if(document.all["role_id"].length==0)
        {alert("你必须选择用户组。\n如果没有用户组，请先添加用户组");document.form1.role_id.focus();return;}
        else 
        {
            document.form1.action="add_user_tj.jsp";
            document.form1.submit();}
        }
        
        function GetRole()
        {
        document.form1.action="add_user.jsp";
        document.form1.submit();
        //window.location="add_user.jsp?dwid="+document.all["superiorid"].options[document.all["superiorid"].selectedIndex].value;
        }

    </script>
	<body topmargin="1" leftmargin="0">
    <form  method="post" name="form1">
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_user.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
    String dwid ="",username="",pwd="",repwd="",user_name="",email="",phone="",note="";
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
					<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;添加用户</DIV></TD>
                </TR>
                <TR>
                    <TD vAlign="top" >
                        <TABLE style="BORDER-COLLAPSE: collapse" height="101" cellSpacing="1" width="100%" bgColor="#666666" border="0">
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">用户名</TD>
                                <TD bgColor="#ffffff" ><input name="username" type="text" size="50" maxlength="50" id="username" value="<%=username%>"/><FONT face="宋体" color="#ff0000" >*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">密码</TD>
                                <TD bgColor="#ffffff" ><input name="pwd" type="password" size="10" maxlength="10" id="pwd" value="<%=pwd%>"/><FONT face="宋体" color="#ff0000" size=1>*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">重复密码</TD>
                                <TD bgColor="#ffffff" ><input name="repwd" type="password" size="10" maxlength="10" id="repwd" value="<%=repwd%>"/><FONT face="宋体" color="#ff0000" size=1>*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">姓名</TD>
                                <TD bgColor="#ffffff" ><input name="user_name" type="text" size="50" maxlength="50" id="user_name" value="<%=user_name%>"/><FONT face="宋体" color="#ff0000" size=1>*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">E-Mail</TD>
                                <TD bgColor="#ffffff" ><input name="email" type="text" size="50" maxlength="50" id="email" value="<%=email%>"/></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">电话</TD>
                                <TD bgColor="#ffffff" ><input name="phone" type="text" size="50" maxlength="50" id="phone" value="<%=phone%>"/></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">备注</TD>
                                <TD bgColor="#ffffff" ><textarea name="note" rows="6" id="note" style="height:72px;width:456px;"><%=note%></textarea></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">选择所属单位</TD>
                                <TD bgColor="#ffffff">
                                    <select name="superiorid" onchange="GetRole();">
                                    <%                                       
                                    String id,name,lvl,zhu_id="";
                                    int i=0,intlvl=0,HasSub=0;
                                    String firstZhu_id="";
                                    //根据用户登录的权限，判断其下级单位
                                    //如果整个系统的管理员，循环列出所有单位
                                    //取出总系统管理员的role_id，根据单位为空，总系统管理员不属于任何单位
                                    String admin_role_id="";
                                    ResultSet admin_rs = qxbean.getResultSet("select id from xtglt_role where danwei_id is null");
                                    if (admin_rs.next()){
                                        admin_role_id=admin_rs.getString("id");
                                    }

                                    if (roleid.equals(admin_role_id)){
                                        ResultSet zhu_rs = qxbean.getResultSet("select id from xtglt_danwei where id=superior_id order by id");
                                        while(zhu_rs.next()){
                                            i++;
                                            zhu_id=zhu_rs.getString("id");
                                            if (i==1){firstZhu_id=zhu_id;}
                                            ResultSet rs = qxbean1.getResultSet("select * from GetSubdanwei(1,"+zhu_id+")");
                                            
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
                                    }else{
                                        //如果是分级管理员，根据其所在单位列出所有下级单位
                                        //取出分级管理员的danwei_id
                                        String sub_admin_superior_id;
                                        int sub_admin_lvl=0;
                                        ResultSet sub_admin_rs = qxbean.getResultSet("select * from xtglt_danwei where id in(select danwei_id from xtglt_role where id='"+roleid+"')");
                                        if (sub_admin_rs.next()){
                                            zhu_id=sub_admin_rs.getString("id");
                                            firstZhu_id=zhu_id;
                                            sub_admin_superior_id=sub_admin_rs.getString("superior_id");
                                            //取出分管理员所在单位的级别
                                            sub_admin_lvl=Integer.parseInt(sub_admin_rs.getString("lvl"));
                                        }
                                        
                                        ResultSet rs = qxbean.getResultSet("select * from GetSubdanwei(1,"+zhu_id+")");
                                        while(rs.next()){
                                            id=rs.getString("id");
                                            name=rs.getString("name");
                                            lvl=rs.getString("lvl");
											HasSub=Integer.parseInt(rs.getString("hassub"));
                                            intlvl=Integer.parseInt(lvl)-sub_admin_lvl;                                            
                                            %>
                                            <option <%if (id.equals(dwid)){%>selected<%}%> value="<%=id%>"><%for(i=0;i<intlvl;i++){out.println("|");}%><%if (HasSub==0){out.println("-");}else{out.println("+");}%><%=name%></option>
                                      <%}
                                    }%>
                                    </select>
                                    <FONT face="宋体" color="#ff0000" size=1>*</FONT>
                                </TD>
                            </TR>
                            <TR>

                                <TD bgColor="#FFFAFA" align="center">选择用户组</TD>
                                <TD bgColor="#ffffff">
                                    <select name="role_id">
                                        <%
                                        String GetRole_sql="",getroleid,rolename,rolenote;
                                        int HasRole=0;
                                        //if (roleid.equals(admin_role_id)){
                                            if (dwid.equals("")){GetRole_sql="select * from xtglt_role where danwei_id='"+firstZhu_id+"'";}else{GetRole_sql="select * from xtglt_role where danwei_id='"+ dwid +"'";}
                                            ResultSet rs = qxbean.getResultSet(GetRole_sql);
                                            while(rs.next()){
                                                HasRole++;
                                                getroleid=rs.getString("id");
                                                rolename=rs.getString("rolename");
                                            %>
                                            <option value="<%=getroleid%>"><%=rolename%></option>
                                            <%}
                                        //}else{
                                        
                                        
                                        //}%>
                                    </select>
                                    <FONT face="宋体" color="#ff0000" size=1>*</FONT>
                                    <%if (HasRole==0){%><input type=button value="添加用户组" onclick="window.location='add_role.jsp?id=<%=dwid%>'"><%}%>
                                </TD>
                            </TR>  
                            <TR>
                                <TD vAlign="top" align="left" width="75" bgColor="#FFFAFA" height="18"></TD>
                                <TD bgColor="#ffffff" height="18">&nbsp;
                                    <input type="button" name="save" id="save" value="保存" onclick="datacheck()" />&nbsp;&nbsp;
                                    <input type="reset"  name="rewrite" id="rewrite" value="重写" />&nbsp;&nbsp;
                                    <input type="button" name="return" value="返回" onclick="window.location='admin_user.jsp'" />
                                </TD>
                            </TR>
                        </TABLE>
                    </TD>
                </TR>
            </table>
        </form>
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