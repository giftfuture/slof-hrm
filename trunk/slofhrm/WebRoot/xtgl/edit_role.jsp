<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>修改用户组</title>
    </head>
    <script language=javascript>
        function datacheck()
        {
            if(document.form1.rolename.value==""){
                alert("你必须输入用户组名称!");
                document.form1.rolename.focus();
                return;
            }
            
            var chkbx = document.all.tags("input");
            var HasChecked=0;
            if (chkbx!=null){
                for (var i=0; i<chkbx.length; i++){
                    if (chkbx[i].checked==true){
                        HasChecked++;
                    }
                }
            }
            if(HasChecked==0){
                alert("你必须选择权限!");
                return;
            }else {
                document.form1.submit();
            }
        }
        
        function selectitem(obj,zhu_id,superior_id,strlvl){
            var lvl=parseFloat(strlvl)+1;
            if (document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl]!=null){var len=document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl].length;}else{var len=0;}
            if (len!=0){
                if (len>1){
                    if (obj.checked==true){
                        for (var i=0;i<len;i++){
                            document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl][i].checked=true;
                            var resuperior_id=document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl][i].parentElement.children[1].id.split("_")[2];
                            var relvl=lvl;
                            selectitem(document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl][i],zhu_id,resuperior_id,relvl)
                        }
                    }else{
                        for (var i=0;i<len;i++){
                            document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl][i].checked=false;
                            var resuperior_id=document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl][i].parentElement.children[1].id.split("_")[2];
                            var relvl=lvl;
                            selectitem(document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl][i],zhu_id,resuperior_id,relvl)
                        }
                    }
                }else{
                        if (obj.checked==true){
                                document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl].checked=true;
                                var resuperior_id=document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl].parentElement.children[1].id.split("_")[2];
                                var relvl=lvl;
                                selectitem(document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl],zhu_id,resuperior_id,relvl)
                        }else{
                                document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl].checked=false;
                                var resuperior_id=document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl].parentElement.children[1].id.split("_")[2];
                                var relvl=lvl;
                                selectitem(document.all["chkbx_"+zhu_id+"_"+superior_id+"_"+lvl],zhu_id,resuperior_id,relvl)
                        }
                }
            }else{
                return;
            }
        }
        
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
                                unshowitem(zhu_id,document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].children[1].children[0].id.split("_")[2],lvl);
                                document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].style["display"]="none"
                                document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="img/close.gif";
                            }
                        }
                    }else{
                        if (document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].style["display"]=="none"){
                            document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].style["display"]="inline";
                            document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="img/open.gif";
                        }else{
                            unshowitem(zhu_id,document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].children[1].children[0].id.split("_")[2],lvl);
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
                        var resuperior_id=document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].children[1].children[0].id.split("_")[2];
                        var relvl=lvl;
                        unshowitem(zhu_id,resuperior_id,relvl)
                    }
                }else{
                    document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].style["display"]="none"
                    document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="img/close.gif";
                    var resuperior_id=document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].children[1].children[0].id.split("_")[2];
                    var relvl=lvl;
                    unshowitem(zhu_id,resuperior_id,relvl)
                }
            }else{
                return;
            }
        }
        
        function selectallitem(){
            var chkbx = document.all.tags("input");
            if (chkbx!=null){
                for (var i=0; i<chkbx.length; i++){
                    chkbx[i].checked=true;
                }
            }
            document.all["div_selectall"].style["display"]="none";
            document.all["div_unselectall"].style["display"]="inline";
        }
        
        function unselectallitem(){
            var chkbx = document.all.tags("input");
            if (chkbx!=null)
            {
                for (var i=0; i<chkbx.length; i++){
                    chkbx[i].checked=false;
                }
            }
            document.all["div_selectall"].style["display"]="inline";
            document.all["div_unselectall"].style["display"]="none";
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
    <body topmargin="1" leftmargin="0">
    <form action="edit_role_tj.jsp" method="post" name="form1">
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_role.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
            String role_id = request.getParameter("id");
            int j=0,qx_count=0;
            String rolename="";
            String note="";
            ResultSet rsGetData = qxbean.getResultSet("SELECT * FROM xtglt_role where id='"+role_id+"'");
            if(rsGetData.next()){
                rolename=rsGetData.getString("rolename");
                note=rsGetData.getString("note");
            }
            
            ResultSet qx_count_rs = qxbean.getResultSet("select count(*) num from xtglt_role_qx where role_id='"+role_id+"'");
            if(qx_count_rs.next()){
                qx_count=Integer.parseInt(qx_count_rs.getString("num"));
            }
            String[] arygn_id=new String[qx_count];
            ResultSet qx_rs = qxbean.getResultSet("select gn_id from xtglt_role_qx where role_id='"+role_id+"' order by gn_id");
            while(qx_rs.next()){
                arygn_id[j]=qx_rs.getString("gn_id");
                j++;
            }
            %>
            <table height="138" cellSpacing="0" cellPadding="0" width="100%" border="0">
            <TR>
				<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;修改用户组</DIV></TD>
            </TR>
            <TR>
                <TD vAlign="top" >
                    <TABLE style="BORDER-COLLAPSE: collapse" cellSpacing="1" width="100%" bgColor="#666666" border="0">
                    <TR>
                        <TD bgColor="#FFFAFA" align="center">用户组名</TD>
                        <TD bgColor="#ffffff" ><input name="rolename" type="text" size="50" maxlength="50" value="<%=rolename%>" id="rolename"/><FONT face="宋体" color="#ff0000">*</FONT></TD>
                    </TR>
                    <TR>
                        <TD bgColor="#FFFAFA" align="center">所属单位</TD>
                        <TD bgColor="#ffffff">
                                <select name="superiorid">
                                    <%
                                    String danwei_id,id,name="",lvl,zhu_id="";
                                    int i=0,intlvl=0,HasSub=0;
                                    //取出总系统管理员的role_id，根据单位为空，总系统管理员不属于任何单位
                                        String admin_role_id="";
                                        ResultSet admin_rs = qxbean.getResultSet("select id from xtglt_role where danwei_id is null");
                                        if (admin_rs.next()){
                                            admin_role_id=admin_rs.getString("id");
                                        }
                                    if (roleid.equals(admin_role_id)){
                                        danwei_id = request.getParameter("dwid");
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
                                                <option <%if (id.equals(danwei_id)){out.println("selected");}%> value="<%=id%>"><%for(i=0;i<intlvl;i++){out.println("|");}%><%if (HasSub==0){out.println("-");}else{out.println("+");}%><%=name%></option>
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
                                        
                                        danwei_id = request.getParameter("dwid");
                                        ResultSet rs = qxbean.getResultSet("select * from GetSubdanwei(1,"+zhu_id+")");
                                        while(rs.next()){
                                            id=rs.getString("id");
                                            name=rs.getString("name");
                                            lvl=rs.getString("lvl");
											HasSub=Integer.parseInt(rs.getString("hassub"));
                                            intlvl=Integer.parseInt(lvl)-sub_admin_lvl;
										%>                                
                                            <option <%if (id.equals(danwei_id)){out.println("selected");}%> value="<%=id%>"><%for(i=0;i<intlvl;i++){out.println("|");}%><%if (HasSub==0){out.println("-");}else{out.println("+");}%><%=name%></option>
                                        <%}
                                    }%>
                                </select>
                                <FONT face="宋体" color="#ff0000">*</FONT>
                        </TD>
                    </TR>
                    <TR>
                        <TD align="center" bgColor="#FFFAFA">备注</TD>
                        <TD bgColor="#ffffff"><textarea name="note" rows="6" id="note" style="height:72px;width:456px;"><%=note%></textarea></TD>
                    </TR>
                    <TR>
                        <TD align="center" bgColor="#FFFAFA">权限</TD>
                        <TD bgColor="#ffffff">
                            <TABLE  width="100%"align="center"  cellpadding="1" cellspacing="1">
                            <tr width = "100%"> 
                                <td bgcolor="#FFFFFF"><font size="2"><strong><font color="#FF0000">请选择权限：</font></strong></font></td>
                            </tr>
                            <tr width = "100%"> 
                                <td>
            <table id="tbMsg" style="BORDER-COLLAPSE: collapse" bordercolor="#111111" cellspacing="1" cellPadding="0" width="100%" border="0">
                <TR bgcolor="#FFEFD5" align="center" height="25px">
                    <TD width="5%" bgcolor="#FFEFD5"><STRONG>选择</STRONG></TD>
                    <TD width="50%" bgcolor="#FFEFD5"><STRONG>功能名称</STRONG></TD>
                    <TD width="45%" bgcolor="#FFEFD5"><STRONG>功能文件路径</STRONG></TD>
                </TR>
        <%
        String superior_id,description,flag;
        intlvl=0;
        i=0;
        HasSub=0;
            ResultSet zhu_rs = qxbean.getResultSet("select gn_id from xtglt_role_qx where role_id='"+roleid+"' and gn_id in (select id from xtglt_gn where id=superior_id) order by gn_id");
            while(zhu_rs.next()){
                zhu_id=zhu_rs.getString("gn_id");
                ResultSet rs2 = qxbean1.getResultSet("select * from  GetSubgn_ByRoleID(1,"+zhu_id+","+roleid+")");
                while(rs2.next()){
                    id=rs2.getString("id");
                    name=rs2.getString("name").trim();
                    superior_id=rs2.getString("superior_id");
                    description=rs2.getString("description");
                    lvl=rs2.getString("lvl");
					HasSub=Integer.parseInt(rs2.getString("hassub"));
                    flag=rs2.getString("flag");
                    intlvl=Integer.parseInt(lvl)-1;

                    String Has_qx="no";
                    for(j=0;j<java.lang.reflect.Array.getLength(arygn_id);j++){
                        if (arygn_id[j].equals(id)){
                            Has_qx="yes";
                        }
                    }
                %>
                <TR id="tr_<%= zhu_id %>_<%= superior_id %>_<%= lvl %>" bgcolor="#FFFAFA" <%if (lvl.equals("1")){%>style="display:inline"<%}else{%>style="display:none"<%}%>>
                    <TD align="center"><input type="checkbox" name="chkbx" id="chkbx_<%= zhu_id %>_<%= superior_id %>_<%= lvl %>" <%if (Has_qx.equals("yes")){out.println("checked");}%> value="<%=id%>" onclick="selectitem(this,<%= zhu_id %>,<%= id %>,<%= lvl %>)"><a id="a_<%= zhu_id %>_<%= id %>_<%= lvl %>"></a></TD>
                    <TD><a id="a_<%= zhu_id %>_<%= id %>_<%= lvl %>" onclick="showitem(<%= zhu_id %>,<%= id %>,<%= lvl %>)" style="hover{COLOR: red; TEXT-DECORATION: none}; cursor:hand"><%for(i=0;i<intlvl;i++){out.println("<img src='img/space_line.gif' align='absmiddle'>");}%><%if (HasSub==0){out.println("<img src='img/open_line.gif' align='absmiddle'><img src='img/zi.gif' align='absmiddle'>");}else{out.println("<img id='img_"+zhu_id +"_"+id +"_"+lvl+"' src='img/close.gif' align='absmiddle'><img src='img/zhu.gif' align='absmiddle'>");}%></a><A Href = "edit_gn.jsp?id=<%=id%>"><%=name%></a></TD>
                    <TD><%= description %></TD>
                </TR>
                <%
                }
            }
		%>
                                </td>
                            </tr>
                            </table>
                        </TD>
                    </TR>
                    </TABLE>
                    <table style="BORDER-COLLAPSE: collapse" borderColor="#111111" cellSpacing="1" cellPadding="0" width="100%" border="0">
                    <TR>
                        <TD align="center" bgColor="#FFEFD5" height="26" width="35%">
                            <table cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td width="7%"vAlign="middle" bgColor="#FFEFD5" align="center"><img name='imgopenall' src='img/openall.gif' alt="全部展开" style="cursor:hand;display:inline" onclick="openallitem();"><img name='imgcloseall' src='img/closeall.gif' alt="全部折叠" style="cursor:hand;display:none" onclick="closeallitem();"></TD>
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" name="btnsave" id="save" value="保存" onclick="datacheck()" />&nbsp;&nbsp;</td>
                                    <td><div id="div_selectall"><input type="button"  name="selectall" id="selectall" value="全选" onclick="selectallitem()" />&nbsp;&nbsp;</div></td>
                                    <td><div id="div_unselectall" style="display:none" ><input type="button"  name="unselectall" id="unselectall" value="全不选" onclick="unselectallitem()" />&nbsp;&nbsp;</div></td>
                                    <td>
                                        <input type="reset"  name="rewrite" id="rewrite" value="重写" />&nbsp;&nbsp;
                                        <input type="button" name="return" value="返回" onclick="<%if (danwei_id.equals("")){out.println("window.location='admin_role.jsp'");}else{out.println("window.location='list_role.jsp?id="+danwei_id+"'");}%>" />
                                    </td>
                                </tr>
                            </table>
                        </TD>
                        <TD vAlign="middle" bgColor="#FFEFD5">&nbsp;</TD>
                    </TR>
                </table>
                <input type=hidden name="role_id" value="<%= role_id %>">
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