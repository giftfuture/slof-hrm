<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean2" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>用户组管理</title>
    </head>
	<body topmargin="1" leftmargin="0">
        <script language=javascript>

            function showitem(zhu_id,superior_id,strlvl){
                var imglvl=parseFloat(strlvl);
                var lvl=parseFloat(strlvl)+1;
                if (document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl]!=null){var len=document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].length;}else{var len=0;}
                    if (len!=0){
                        if (len>1){
                            for (var i=0;i<len;i++){
                                if (document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].style["display"]=="none"){
                                    document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].style["display"]="inline";
                                    document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="img/open.gif";
                                }else{
                                    unshowitem(zhu_id,document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].children[0].children[0].id.split("_")[2],lvl);
                                    document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].style["display"]="none"
                                    document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="img/close.gif";
                                }
                            }
                        }else{
                            if (document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].style["display"]=="none"){
                                document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].style["display"]="inline";
                                document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="img/open.gif";
                            }else{
                                unshowitem(zhu_id,document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].children[0].children[0].id.split("_")[2],lvl);
                                document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].style["display"]="none";
                                document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="img/close.gif";
                            }
                        }
                    }else{
                        return;
                    }
            }
            
            function unshowitem(zhu_id,superior_id,strlvl){
                var imglvl=parseFloat(strlvl);
                var lvl=parseFloat(strlvl)+1;
                if (document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl]!=null){var len=document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].length;}else{var len=0;}
                if (len!=0){
                    if (len>1){
                        for (var i=0;i<len;i++){
                            document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].style["display"]="none"
                            document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="img/close.gif";
                            var resuperior_id=document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].children[0].children[0].id.split("_")[2];
                            var relvl=lvl;
                            unshowitem(zhu_id,resuperior_id,relvl)
                        }
                    }else{
                        document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].style["display"]="none"
                        document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="img/close.gif";
                        var resuperior_id=document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].children[0].children[0].id.split("_")[2];
                        var relvl=lvl;
                        unshowitem(zhu_id,resuperior_id,relvl)
                    }
                }else{
                    return;
                }
            }
            
            function openallitem(){
                var len=document.all.tags("tr").length
                if (len>1){
                    for (var i=0;i<len;i++){
                        if (document.all.tags("tr")[i].style["display"]=="none"){
                            document.all.tags("tr")[i].style["display"]="inline";
                        }  
                    }
                }else{
                        if (document.all.tags("tr").style["display"]=="none"){
                            document.all.tags("tr").style["display"]="inline";
                        } 
                }
                openallimg();
                document.all["imgopenall"].style["display"]="none";
                document.all["imgcloseall"].style["display"]="inline";
            }
            
            function closeallitem(){
                var len=document.all.tags("tr").length
                if (len>1){
                    for (var i=0;i<len;i++){
                        if (document.all.tags("tr")[i].id!=""){
                            if (document.all.tags("tr")[i].id.split("_")[3]=="1"){
                                document.all.tags("tr")[i].style["display"]="inline";
                            }else{
                                document.all.tags("tr")[i].style["display"]="none";
                            }
                        }
                    }
                }else{
                        if (document.all.tags("tr").id.split("_")[3]=="1"){
                            document.all.tags("tr").style["display"]="inline";
                        }else{
                            document.all.tags("tr").style["display"]="none";
                        }
                }
                closeallimg();
                document.all["imgopenall"].style["display"]="inline";
                document.all["imgcloseall"].style["display"]="none";
            }
            
            function openallimg(){
                var len=document.all.tags("img").length
                if (len>1){
                    for (var i=0;i<len;i++){
                        if (document.all.tags("img")[i].id!=""){
                            if (document.all.tags("img")[i].id.split("_").length==4){
                                document.all.tags("img")[i].src="img/open.gif";
                            }
                        }
                    }
                }else{
                        if (document.all.tags("img").id!=""){
                            if (document.all.tags("img").id.split("_").length==4){
                                document.all.tags("img").src="img/open.gif";
                            }
                        }
                }
            }
            
            function closeallimg(){
                var len=document.all.tags("img").length
                if (len>1){
                    for (var i=0;i<len;i++){
                        if (document.all.tags("img")[i].id!=""){
                            if (document.all.tags("img")[i].id.split("_").length==4){
                                document.all.tags("img")[i].src="img/close.gif";
                            }
                        }
                    }
                }else{
                        if (document.all.tags("img").id!=""){
                            if (document.all.tags("img").id.split("_").length==4){
                                document.all.tags("img").src="img/close.gif";
                            }
                        }
                }
            }
        </script>
        <form name="form1" method="post">
            <table cellSpacing="0" cellPadding="0" width="100%" border="0">
            <TR>
				<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;用户组管理</DIV></TD>
            </TR>
            <TR>
            <TD vAlign="top" height="120">
                <table id="tbMsg" style="BORDER-COLLAPSE: collapse" bordercolor="#111111" cellspacing="1" cellPadding="0" width="100%" border="0">
                <TR bgcolor="#FFEFD5" align="center" height="25px">
                    <TD width="40%" bgcolor="#FFEFD5"><STRONG>单位名称</STRONG></TD>
                    <TD width="60%" bgcolor="#FFEFD5" colspan="2"><STRONG>用户组</STRONG></TD>
                </TR>
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_role.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String zhu_id="",id,name,superior_id,description,lvl,flag;
        int intlvl=0;
        int i=0;
        int HasSub=0;
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
                    ResultSet rs2 = qxbean1.getResultSet("select * from GetSubdanwei(1,"+zhu_id+")");
                    while(rs2.next()){
                        id=rs2.getString("id");
                        name=rs2.getString("name").trim();
                        superior_id=rs2.getString("superior_id");
                        description=rs2.getString("description");
                        lvl=rs2.getString("lvl");
						HasSub=Integer.parseInt(rs2.getString("hassub"));
                        flag=rs2.getString("flag");
                        intlvl=Integer.parseInt(lvl)-1;
                    %>
                    <TR id="tr_<%= zhu_id %>_<%= superior_id %>_<%= lvl %>" bgcolor="#FFFAFA" <%if (lvl.equals("1")){%>style="display:inline"<%}else{%>style="display:none"<%}%>>
                        <TD><a id="a_<%= zhu_id %>_<%= id %>_<%= lvl %>" onclick="showitem(<%= zhu_id %>,<%= id %>,<%= lvl %>)" style="hover{COLOR: red; TEXT-DECORATION: none}; cursor:hand"><%for(i=0;i<intlvl;i++){out.println("<img src='img/space_line.gif' align='absmiddle'>");}%><%if (HasSub==0){out.println("<img src='img/open_line.gif' align='absmiddle'><img src='img/zi.gif' align='absmiddle'>");}else{out.println("<img id='img_"+zhu_id +"_"+id +"_"+lvl+"' src='img/close.gif' align='absmiddle'><img src='img/zhu.gif' align='absmiddle'>");}%></a><A Href = "list_role.jsp?id=<%=id%>"><%=name%></a></TD>
                        <TD>
                        <%
                        i=0;
                        ResultSet role_rs = qxbean2.getResultSet("select * from xtglt_role where danwei_id ='"+id+"' order by id");
                        String role_id="";
                        String role_name="";
                        while(role_rs.next()){
							role_id=role_rs.getString("id");
							role_name=role_rs.getString("rolename");
							i++;
							if (i<6){
							%>
							<a href="edit_role.jsp?id=<%= role_id %>&dwid=<%= id %>"><%= role_name %></a>&nbsp;
							<%}
                        }%>
                        </TD>
                        <TD width="5%" align="center"><%if (i>=6){%><a href="list_role.jsp?id=<%=id%>">更多</a><%}%></TD>
                    </TR>
                    <%
                    }
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

                ResultSet rs2 = qxbean.getResultSet("select * from GetSubdanwei(1,"+zhu_id+")");
                while(rs2.next()){
                    id=rs2.getString("id");
                    name=rs2.getString("name").trim();
                    superior_id=rs2.getString("superior_id");
                    description=rs2.getString("description");
                    lvl=rs2.getString("lvl");
					HasSub=Integer.parseInt(rs2.getString("hassub"));
                    flag=rs2.getString("flag");
                    intlvl=Integer.parseInt(lvl)-sub_admin_lvl;
                %>
                <TR id="tr_<%= zhu_id %>_<%= superior_id %>_<%= lvl %>" bgcolor="#FFFAFA" <%if (Integer.parseInt(lvl)==sub_admin_lvl){%>style="display:inline"<%}else{%>style="display:none"<%}%>>
                    <TD><a id="a_<%= zhu_id %>_<%= id %>_<%= lvl %>" onclick="showitem(<%= zhu_id %>,<%= id %>,<%= lvl %>)" style="hover{COLOR: red; TEXT-DECORATION: none}; cursor:hand"><%for(i=0;i<intlvl;i++){out.println("<img src='img/space_line.gif' align='absmiddle'>");}%><%if (HasSub==0){out.println("<img src='img/open_line.gif' align='absmiddle'><img src='img/zi.gif' align='absmiddle'>");}else{out.println("<img id='img_"+zhu_id +"_"+id +"_"+lvl+"' src='img/close.gif' align='absmiddle'><img src='img/zhu.gif' align='absmiddle'>");}%></a><A Href = "list_role.jsp?id=<%=id%>"><%=name%></a></TD>
                    <TD>
                    <%
                    i=0;
                    ResultSet role_rs = qxbean1.getResultSet("select * from xtglt_role where danwei_id ='"+id+"' order by id");
                    String role_id="";
                    String role_name="";
                    while(role_rs.next()){
                    role_id=role_rs.getString("id");
                    role_name=role_rs.getString("rolename");
                    i++;
						if (i<6){
							if(!role_id.equals(roleid)){
							%>
							<a href="edit_role.jsp?id=<%= role_id %>&dwid=<%= id %>"><%= role_name %></a>&nbsp;
							<%}
						}
                    }%>
                    </TD>
                    <TD width="5%" align="center"><%if (i>=6){%><a href="list_role.jsp?id=<%=id%>">更多</a><%}%></TD>
                </TR>
                <%
                }
            }
%>
                </TABLE>
                <table style="BORDER-COLLAPSE: collapse" borderColor="#111111" cellSpacing="1" cellPadding="0" width="100%" border="0">
                    <TR>
                        <TD width="7%"vAlign="middle" bgColor="#FFEFD5" align="center"><img name='imgopenall' src='img/openall.gif' alt="全部展开" style="cursor:hand;display:inline" onclick="openallitem();"><img name='imgcloseall' src='img/closeall.gif' alt="全部折叠" style="cursor:hand;display:none" onclick="closeallitem();"></TD>
                        <TD width="15%" align="center" bgColor="#FFEFD5" height="24">
                            <input type="button" name="addrole" value="添加" onclick="window.location='add_role.jsp'" />                            
                        </TD>
                        <TD vAlign="middle" bgColor="#FFEFD5">&nbsp;</TD>
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
	qxbean2.close();
}
%>