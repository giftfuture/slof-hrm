<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>用户管理</title>
    </head>
	<body topmargin="1" leftmargin="0">
        <script language=javascript>
            function gopage()
            {
                document.form1.action="admin_user.jsp?page="+document.all["selctpageno"].options[document.all["selctpageno"].selectedIndex].value;
                document.form1.submit();
            }
            
            function redirectpage(pagenum)
            {
                document.form1.action="admin_user.jsp?page="+pagenum;
                document.form1.submit();
            }
            
            function delitem(){
            if (confirm("确实要删除吗？")==true){
            document.form1.action="delete_user_tj.jsp";
            document.form1.target="_self";
            document.form1.submit();
            }
            }
            
            function query(){
            document.form1.action="admin_user.jsp";
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
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_user.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String strcurrentpage = request.getParameter("page");
        String user_id,username,password,user_name,email,phone,user_note,role_id="",user_flag;
        //判断查询条件,生成SQL语句
        String condition,queryvalue,query_danwei_id,query_role_id;
        if (request.getParameter("condition")!=null){condition = qxbean.ISOtoGB(request.getParameter("condition"));}else{condition ="0";}
        if (request.getParameter("queryvalue")!=null){queryvalue = qxbean.ISOtoGB(request.getParameter("queryvalue"));}else{queryvalue ="";}
        if (request.getParameter("query_danwei_id")!=null){query_danwei_id = qxbean.ISOtoGB(request.getParameter("query_danwei_id"));}else{query_danwei_id ="";}
        if (request.getParameter("query_role_id")!=null){query_role_id = qxbean.ISOtoGB(request.getParameter("query_role_id"));}else{query_role_id ="";}
        String strsql="",strsql2="";

        %>
        <form name="form1" method="post">
            <table cellSpacing="0" cellPadding="0" width="100%" border="0">
            <TR>
				<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;用户信息查询</DIV></TD>
            </TR>
            <TR>
            <TD vAlign="top" height="120">
                <table style="BORDER-COLLAPSE: collapse" borderColor="#111111" cellSpacing="1" width="100%" border="0">
                    <TR>
                        <TD vAlign="middle" bgColor="#FFEFD5">
                            <select name="condition" onchange="query()" id="condition">
                                <option <%if (condition.equals("1")){%>selected<%}%> value="1">按帐号查询</option>
                                <option <%if (condition.equals("2")){%>selected<%}%> value="2">按姓名查询</option>
                                <option <%if (condition.equals("3")){%>selected<%}%> value="3">按单位查询</option>
                            </select>
                            <input name="queryvalue" type="text" id="queryvalue" value="<%=queryvalue%>" <%if (condition.equals("0")||condition.equals("1")||condition.equals("2")){%>style="display:inline"<%}else{%>style="display:none"<%}%> />
                            <select name="query_danwei_id" id="query_danwei_id" onchange="query()" <%if (condition.equals("3")){%>style="display:inline"<%}else{%>style="display:none"<%}%>>
                            <%
                            String id,name,lvl,zhu_id="";
                            int i=0,intlvl=0,HasSub=0;
                                
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
                                    zhu_id=zhu_rs.getString("id");
                                    ResultSet rs = qxbean1.getResultSet("select * from GetSubdanwei(1,"+zhu_id+")");
                                    while(rs.next()){
                                        id=rs.getString("id");
                                        name=rs.getString("name");
                                        lvl=rs.getString("lvl");
										HasSub=Integer.parseInt(rs.getString("hassub"));
                                        intlvl=Integer.parseInt(lvl)-1;
									%>
                                <option <%if (id.equals(query_danwei_id)){%>selected<%}%> value="<%=id%>"><%for(i=0;i<intlvl;i++){out.println("|");}%><%if (HasSub==0){out.println("-");}else{out.println("+");}%><%=name%></option>
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
                                    <option <%if (id.equals(query_danwei_id)){%>selected<%}%> value="<%=id%>"><%for(i=0;i<intlvl;i++){out.println("|");}%><%if (HasSub==0){out.println("-");}else{out.println("+");}%><%=name%></option>
                                <%}
                            }%>
                            </select>
                            <%
                            int count_num=0;
                            ResultSet count_rs = qxbean.getResultSet("select count(*) as num from xtglt_role where danwei_id='"+ query_danwei_id +"'");
                            if (count_rs.next()){
                                count_num=Integer.parseInt(count_rs.getString("num"));
                            }
                            %>
                            <select name="query_role_id" id="query_role_id" onchange="query()" <%if (condition.equals("3")){%>style="display:inline "<%}else{%>style="display:none"<%}%>>
                                <%if (count_num!=0){%><option value="0">全部用户组</option><%}%>
                                <%
                                String GetRole_sql="",getroleid,rolename="",rolenote;
                                GetRole_sql="select * from xtglt_role where danwei_id='"+ query_danwei_id +"'";
                                ResultSet rs = qxbean.getResultSet(GetRole_sql);
                                while(rs.next()){
                                    getroleid=rs.getString("id");
                                    rolename=rs.getString("rolename");
                                %>
                                <option <%if (getroleid.equals(query_role_id)){%>selected<%}%> value="<%=getroleid%>"><%=rolename%></option>
                                <%}
                                if (count_num==0){%><option value="">没有可选的用户组</option><%}
                                %>
                            </select>
                            <input type="button" name="btnquery" value="查看" onclick="query();" />
                            <input type="button" name="adduser" value="添加" onclick="window.location='add_user.jsp'" />
                        </TD>
                        <TD vAlign="middle" bgColor="#FFEFD5"></TD>
                    </TR>
                </table>
                <table id="tbMsg" style="BORDER-COLLAPSE: collapse" bordercolor="#111111" cellspacing="1" width="100%" border="0">
                <TR bgcolor="#FFEFD5" align="center" height="25px">
                    <TD width="4%" bgcolor="#FFEFD5"><STRONG>选择</STRONG></TD>
                    <TD width="7%" bgcolor="#FFEFD5"><STRONG>用户名</STRONG></TD>
                    <TD width="7%" bgcolor="#FFEFD5"><STRONG>用户密码</STRONG></TD>
                    <TD width="7%" bgcolor="#FFEFD5"><STRONG>姓名</STRONG></TD>
                    <TD width="13%" bgcolor="#FFEFD5"><STRONG>E-Mail</STRONG></TD>
                    <TD width="10%" bgcolor="#FFEFD5"><STRONG>电话</STRONG></TD>
                    <TD width="12%" bgcolor="#FFEFD5"><STRONG>备注</STRONG></TD>
                    <TD width="20%" bgcolor="#FFEFD5"><STRONG>单位</STRONG></TD>
                    <TD width="20%" bgcolor="#FFEFD5"><STRONG>用户组</STRONG></TD>
                </TR>
            <%
            //如果是整个系统的管理员
            if (roleid.equals(admin_role_id)){
                //condition=0 没有查询条件,默认查询
                if (condition.equals("0")){
                    strsql="SELECT count(*) as num FROM xtglt_user";
                    strsql2="SELECT * FROM xtglt_user order by id desc";
                }
                //condition=1 按照用户查询
                if (condition.equals("1")){
                    strsql="SELECT count(*) as num FROM xtglt_user where username like '%"+queryvalue+"%'";
                    strsql2="SELECT * FROM xtglt_user where username like '%"+queryvalue+"%' order by id desc";
                }
                //condition=2 按照姓名查询
                if (condition.equals("2")){
                    strsql="SELECT count(*) as num FROM xtglt_user where name like '%"+queryvalue+"%'";
                    strsql2="SELECT * FROM xtglt_user where name like '%"+queryvalue+"%' order by id desc";
                }
                //condition=3 按照单位查询
                if (condition.equals("3")){
                    //out.println("count_num:");out.println(count_num);
                    if (count_num!=0){
                        if (query_role_id.equals("")||query_role_id.equals("0")){
                            strsql="SELECT count(*) as num FROM xtglt_user where role_id in (select id from xtglt_role where danwei_id = '"+query_danwei_id+"')";
                            strsql2="SELECT * FROM xtglt_user where role_id in (select id from xtglt_role where danwei_id = '"+query_danwei_id+"') order by id desc";
                        }else{
                            /*由于更改单位select后,用户组列表框的值发生改变，
                            页面刷新后得到的query_role_id可能不存在于用户组列表框中，
                            所以需要验证query_role_id是存在于用户组列表框中*/
                            String Tmp_danweiid="";
                            ResultSet Has_query_role_id_rs = qxbean.getResultSet("select danwei_id from xtglt_role where id='"+ query_role_id +"'");
                            if (Has_query_role_id_rs.next()){
                                Tmp_danweiid=Has_query_role_id_rs.getString("danwei_id");
                            }
                            if (Tmp_danweiid!=null){
                                if (Tmp_danweiid.equals(query_danwei_id)){
                                    strsql="SELECT count(*) as num FROM xtglt_user where role_id = '"+query_role_id+"'";
                                    strsql2="SELECT * FROM xtglt_user where role_id = '"+query_role_id+"' order by id desc";
                                }else{
                                    strsql="SELECT count(*) as num FROM xtglt_user where role_id in (select id from xtglt_role where danwei_id = '"+query_danwei_id+"')";
                                    strsql2="SELECT * FROM xtglt_user where role_id in (select id from xtglt_role where danwei_id = '"+query_danwei_id+"') order by id desc";
                                }
                            }else{
                                strsql="SELECT count(*) as num FROM xtglt_user where role_id in (select id from xtglt_role where danwei_id = '"+query_danwei_id+"')";
                                strsql2="SELECT * FROM xtglt_user where role_id in (select id from xtglt_role where danwei_id = '"+query_danwei_id+"') order by id desc";
                            }
                        }
                    }
                }
            }else{
                //如果是分级管理员
                //condition=0 没有查询条件,默认查询
                if (condition.equals("0")){
                    strsql="select count(*) as num from xtglt_user where role_id in (select id from xtglt_role where danwei_id in (select id from dbo.GetSubDanwei(1,"+zhu_id+")))";
                    strsql2="select * from xtglt_user where role_id in (select id from xtglt_role where danwei_id in (select id from dbo.GetSubDanwei(1,"+zhu_id+"))) order by id desc";
                }
                //condition=1 按照用户查询
                if (condition.equals("1")){
                    strsql="SELECT count(*) as num FROM xtglt_user where username like '%"+queryvalue+"%' and role_id in (select id from xtglt_role where danwei_id in (select id from dbo.GetSubDanwei(1,"+zhu_id+")))";
                    strsql2="SELECT * FROM xtglt_user where username like '%"+queryvalue+"%' and role_id in (select id from xtglt_role where danwei_id in (select id from dbo.GetSubDanwei(1,"+zhu_id+"))) order by id desc";
                }
                //condition=2 按照姓名查询
                if (condition.equals("2")){
                    strsql="SELECT count(*) as num FROM xtglt_user where name like '%"+queryvalue+"%' and role_id in (select id from xtglt_role where danwei_id in (select id from dbo.GetSubDanwei(1,"+zhu_id+")))";
                    strsql2="SELECT * FROM xtglt_user where name like '%"+queryvalue+"%' and role_id in (select id from xtglt_role where danwei_id in (select id from dbo.GetSubDanwei(1,"+zhu_id+"))) order by id desc";
                }
                //condition=3 按照单位查询
                if (condition.equals("3")){
                    //out.println("count_num:");out.println(count_num);
                    if (count_num!=0){
                        if (query_role_id.equals("")||query_role_id.equals("0")){
                            strsql="SELECT count(*) as num FROM xtglt_user where role_id in (select id from xtglt_role where danwei_id = '"+query_danwei_id+"')";
                            strsql2="SELECT * FROM xtglt_user where role_id in (select id from xtglt_role where danwei_id = '"+query_danwei_id+"') order by id desc";
                        }else{
                            /*由于更改单位select后,用户组列表框的值发生改变，
                            页面刷新后得到的query_role_id可能不存在于用户组列表框中，
                            所以需要验证query_role_id是存在于用户组列表框中*/
                            String Tmp_danweiid="";
                            ResultSet Has_query_role_id_rs = qxbean.getResultSet("select danwei_id from xtglt_role where id='"+ query_role_id +"'");
                            if (Has_query_role_id_rs.next()){
                                Tmp_danweiid=Has_query_role_id_rs.getString("danwei_id");
                            }
                            if (Tmp_danweiid!=null){
                                if (Tmp_danweiid.equals(query_danwei_id)){
                                    strsql="SELECT count(*) as num FROM xtglt_user where role_id = '"+query_role_id+"'";
                                    strsql2="SELECT * FROM xtglt_user where role_id = '"+query_role_id+"' order by id desc";
                                }else{
                                    strsql="SELECT count(*) as num FROM xtglt_user where role_id in (select id from xtglt_role where danwei_id = '"+query_danwei_id+"')";
                                    strsql2="SELECT * FROM xtglt_user where role_id in (select id from xtglt_role where danwei_id = '"+query_danwei_id+"') order by id desc";
                                }
                            }else{
                                strsql="SELECT count(*) as num FROM xtglt_user where role_id in (select id from xtglt_role where danwei_id = '"+query_danwei_id+"')";
                                strsql2="SELECT * FROM xtglt_user where role_id in (select id from xtglt_role where danwei_id = '"+query_danwei_id+"') order by id desc";
                            }
                        }
                    }
                }
            }              
                String strallrownum="";
                int allrownum=0;
                int curpage=0;
                //得到总行数 allrownum
                ResultSet rs1 = qxbean.getResultSet(strsql);
                if(rs1.next()){allrownum=Integer.parseInt(qxbean.ISOtoGB(rs1.getString("num"))); }
                
                
                //计算总分页数
                int onepagenum=15;
                int pagenum=(allrownum%onepagenum)==0?(allrownum/onepagenum):(allrownum/onepagenum+1);
                
                //根据传过来的 strcurrentpage 得到相应页面，如果没有传值，显示第一页。
                if (strcurrentpage==null){curpage=1;}else{
                    curpage=Integer.parseInt(strcurrentpage);
                    if (curpage<0){curpage=1;}
                    if (curpage>pagenum){curpage=pagenum;}
                }
                
                //根据页数显示数据
                
                i=0;
                ResultSet rs2 = qxbean.getResultSet(strsql2);
                while(rs2.next()){
                    i++;
                    user_id=rs2.getString("id");
                    username=rs2.getString("username");
                    password=rs2.getString("password");
                    user_name=rs2.getString("name");
                    if (rs2.getString("email")!=null){email=rs2.getString("email");}else{email="";}
                    if (rs2.getString("phone")!=null){phone=rs2.getString("phone");}else{phone="";}    
                    user_note=rs2.getString("note");
                    role_id=rs2.getString("role_id");
                    user_flag=rs2.getString("id");
                    
                    if (i>(curpage-1)*onepagenum&&i<=curpage*onepagenum){
                %>
                <TR bgcolor="#FFFAFA" align="center">
                    <TD><input type="checkbox" name="chkbx" id="chkbx" value="<%=user_id%>"> </TD>
                    <TD><A Href = "edit_user.jsp?id=<%=user_id%>"><font color="#0000FF"><%= username %></font></A></TD>
                    <TD><%= password %></TD>
                    <TD><%= user_name %></TD>
                    <TD><%= email %></TD>
                    <TD><%= phone %></TD>
                    <TD><%= user_note %></TD>
                    <%
                    String danwei_id="",danweiname="";
                    ResultSet GetRole_rs = qxbean1.getResultSet("select rolename,danwei_id from xtglt_role where id='"+role_id+"'");
                    if(GetRole_rs.next()){
                        rolename=GetRole_rs.getString("rolename");
                        danwei_id=GetRole_rs.getString("danwei_id");
                    }
                    if (danwei_id==null){
                        danweiname="";
                    }else{
                        ResultSet GetDanWei_rs = qxbean1.getResultSet("select name from xtglt_danwei where id='"+danwei_id+"'");
                        if(GetDanWei_rs.next()){
                            danweiname=GetDanWei_rs.getString("name");
                        }
                    }%>
                    <TD><%= danweiname %></TD>
                    <TD><%= rolename %></TD>
                </TR>
                <%
                    }
                }
                %>
                </TABLE>
                <table style="BORDER-COLLAPSE: collapse" borderColor="#111111" cellSpacing="1" width="100%" border="0">
                    <TR>
                        <TD width="30%" align="center" bgColor="#FFEFD5" height="24">
                            <input type="button" name="btnselectall" value="全选" onclick="selectall()" <% if (pagenum==0){%>style="display:none"<%}%>/>
                            <input type="button" name="btnunselectall" value="全不选" onclick="unselectall()" style="display:none" />
                            <input type="button" name="btndelitem" value="删除" onclick="delitem()" <% if (pagenum==0){%>style="display:none"<%}%>/>
                        </TD>
                        <TD valign="middle" align="center" width="55%" bgcolor="#FFEFD5" >
                            <span id="lPageInfo">[<STRONG><%=curpage%></STRONG>/<%=pagenum%>页] </span>
                            <span id="lCount">[共<%=allrownum%>个]</span>
                            <a id="first" <% if (curpage==1){%>disabled="disabled"<%}else{%> href="javascript:redirectpage(1);"<%}%>>[首页]</a>
                            <a id="pageup" <% if (curpage==1){%>disabled="disabled"<%}else{%> href="javascript:redirectpage(<%=curpage-1%>);"<%}%>>[上一页]</a>
                            <a id="pagedown" <% if (curpage==pagenum){%>disabled="disabled"<%}else{%> href="javascript:redirectpage(<%=curpage+1%>);"<%}%>>[下一页]</a>
                            <a id="last" <% if (curpage==pagenum){%>disabled="disabled"<%}else{%> href="javascript:redirectpage(<%=pagenum%>);"<%}%>>[尾页]</a>
                        </TD>

                        <TD valign="middle" align="center" width="15%" bgColor="#FFEFD5" colSpan="3">
                            <select name="selctpageno" id="selctpageno">
                                <% for (int k=1;k<=pagenum;k++){%><option <%if (k==curpage){%>selected<%}%> value="<%=k%>"><%=k%></option><%}%>
                            </select>
                            <input type="button" name="btngoto" value="转到" onclick="gopage()"/>
                        </TD>
                    </TR>
                </table>
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