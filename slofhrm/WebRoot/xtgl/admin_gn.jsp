<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>功能菜单管理</title>
    </head>
	<body topmargin="1" leftmargin="0">
        <script language=javascript>
            
            function delitem(){
            if (confirm("确实要删除吗？")==true){
            document.form1.action="delete_gn_tj.jsp";
            document.form1.target="_self";
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
				<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;功能菜单管理</DIV></TD>
            </TR>
            <TR>
            <TD vAlign="top" height="120">
                <table id="tbMsg" style="BORDER-COLLAPSE: collapse" bordercolor="#111111" cellspacing="1" cellPadding="0" width="100%" border="0">
                <TR bgcolor="#FFEFD5" align="center" height="25px">
                    <TD width="5%" bgcolor="#FFEFD5"><STRONG>选择</STRONG></TD>
                    <TD width="50%" bgcolor="#FFEFD5"><STRONG>功能名称</STRONG></TD>
                    <TD width="45%" bgcolor="#FFEFD5"><STRONG>文件路径</STRONG></TD>
                </TR>
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_gn.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
	String zhu_id,id,name,superior_id,description,lvl,flag;
	int intlvl=0;
	int i=0;
	int HasSub=0;
	ResultSet zhu_rs = qxbean.getResultSet("select id from xtglt_gn where id=superior_id order by id");
	while(zhu_rs.next()){
		zhu_id=zhu_rs.getString("id");
		ResultSet rs2 = qxbean1.getResultSet("select * from GetSubgn(1,"+zhu_id+")");
		while(rs2.next()){
			id=rs2.getString("id");
			name=rs2.getString("name").trim();
			superior_id=rs2.getString("superior_id");
			if (rs2.getString("description")!=null){description=rs2.getString("description");}else{description="";}
			lvl=rs2.getString("lvl");
			HasSub=Integer.parseInt(rs2.getString("hassub"));
			flag=rs2.getString("flag");
			intlvl=Integer.parseInt(lvl)-1;
		%>
		<TR id="tr_<%= zhu_id %>_<%= superior_id %>_<%= lvl %>" bgcolor="#FFFAFA" <%if (lvl.equals("1")){%>style="display:inline"<%}else{%>style="display:none"<%}%>>
			<TD align="center"><input type="checkbox" name="chkbx" id="chkbx_<%= zhu_id %>_<%= superior_id %>_<%= lvl %>" value="<%=id%>" onclick="selectitem(this,<%= zhu_id %>,<%= id %>,<%= lvl %>)"><a id="a_<%= zhu_id %>_<%= id %>_<%= lvl %>"></a></TD>
			<TD><a id="a_<%= zhu_id %>_<%= id %>_<%= lvl %>" onclick="showitem(<%= zhu_id %>,<%= id %>,<%= lvl %>)" style="hover{COLOR: red; TEXT-DECORATION: none}; cursor:hand"><%for(i=0;i<intlvl;i++){out.println("<img src='img/space_line.gif' align='absmiddle'>");}%><%if (HasSub==0){out.println("<img src='img/open_line.gif' align='absmiddle'><img src='img/zi.gif' align='absmiddle'>");}else{out.println("<img id='img_"+zhu_id +"_"+id +"_"+lvl+"' src='img/close.gif' align='absmiddle'><img src='img/zhu.gif' align='absmiddle'>");}%></a><A Href = "edit_gn.jsp?id=<%=id%>"><%=name%></a></TD>
			<TD><%= description %></TD>
		</TR>
		<%
		}
	}
	%>
			</TABLE>
			<table style="BORDER-COLLAPSE: collapse" borderColor="#111111" cellSpacing="1" cellPadding="0" width="100%" border="0">
				<TR>
					<TD width="7%" vAlign="middle" bgColor="#FFEFD5" align="center"><img name='imgopenall' src='img/openall.gif' alt="全部展开" style="cursor:hand;display:inline" onclick="openallitem();"><img name='imgcloseall' src='img/closeall.gif' alt="全部折叠" style="cursor:hand;display:none" onclick="closeallitem();"></TD>
					<TD width="15%" align="center" bgColor="#FFEFD5" height="24">
						<input type="button" name="addgn" value="添加" onclick="window.location='add_gn.jsp'" />&nbsp;&nbsp;
						<input type="button" name="btndelitem" value="删除" onclick="delitem()"/>
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
}
%>