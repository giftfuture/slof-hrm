<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<LINK href="root.css" type="text/css" rel="stylesheet">
<html>
<head>
<title>技术检测中心办公系统</title>
</head>
<script language=javascript>
        function showitem(zhu_id,superior_id,strlvl){
            var imglvl=parseFloat(strlvl);
            var lvl=parseFloat(strlvl)+1;

            if (document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl]!=null){var len=document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].length;}else{var len=0;}
                if (len!=0){
                    if (len>1){
                        for (var i=0;i<len;i++){
                            if (document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].style["display"]=="none"){
                                document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].style["display"]="block";
                                document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="root_img/open.gif";
                            }else{
                                unshowitem(zhu_id,document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].children[0].children[0].id.split("_")[2],lvl);
                                document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].style["display"]="none"
                                document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="root_img/close.gif";
                            }
                        }
                    }else{
                        if (document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].style["display"]=="none"){
                            document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].style["display"]="block";
                            document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="root_img/open.gif";
                        }else{
                            unshowitem(zhu_id,document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].children[0].children[0].id.split("_")[2],lvl);
                            document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].style["display"]="none";
                            document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="root_img/close.gif";
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
                        document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="root_img/close.gif";
                        var resuperior_id=document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl][i].children[0].children[0].id.split("_")[2];
                        var relvl=lvl;
                        unshowitem(zhu_id,resuperior_id,relvl)
                    }
                }else{
                    document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].style["display"]="none"
                    document.all["img_"+zhu_id+"_"+superior_id+"_"+imglvl].src="root_img/close.gif";
                    var resuperior_id=document.all["tr_"+zhu_id+"_"+superior_id+"_"+lvl].children[0].children[0].id.split("_")[2];
                    var relvl=lvl;
                    unshowitem(zhu_id,resuperior_id,relvl)
                }
            }else{
                return;
            }
        }
		
		function changefontcolor(id){
			var len=document.all.tags("span").length
			for (var i=0;i<len;i++){
				if (document.all.tags("span")[i].id.split("_")[0]=="span"){
					if (document.all.tags("span")[i].id==("span_"+id)){
						document.all.tags("span")[i].style.color="#FF1493";
					}else{
						document.all.tags("span")[i].style.color="#008080";
					}
				}
			}
		}
    </script>
<body background="root_img/bg_left.gif" leftmargin="5" topmargin="0" rightmargin="0">
<form>
    <table id="tbMsg" cellspacing="0" cellPadding="0" border="0" width="300">
	<TR align="left">
		<TD heigth="15">&nbsp;</TD>
	</TR>
	<%
try{
	String id,name,superior_id,description,lvl,flag;
	int i=0,intlvl=0,HasSub=0;
    //根据用户登录session中roleid判断权限，显示菜单
    //String userid=session.getAttribute("userid").toString();
    String roleid=(String)session.getAttribute("roleid");
    if (roleid==null){%>
        <script language=javascript>
            alert("您还没有登录,请登录后使用！");
            window.parent.location="scbg.jsp";
        </script>
    <%
    return;}
    //得到主菜单zhu_id,如果第一次进入,没有传入参数时得到用户权限中的第一个
    String zhu_id = "";
	
    if (request.getParameter("id")!=null){
        zhu_id=request.getParameter("id");
    }else{
        ResultSet Get_Zhu_id_rs = qxbean.getResultSet("select id from xtglt_gn where id=superior_id and id in (select gn_id from xtglt_role_qx where role_id='"+roleid+"') order by id");        
        if (Get_Zhu_id_rs.next()){
            zhu_id=Get_Zhu_id_rs.getString("id");
        }
    }

	int xuhao=0;
	ResultSet rs2 = qxbean.getResultSet("select * from GetAdminSubgn_ByRoleID(0,"+zhu_id+","+roleid+")");
	while(rs2.next()){
		xuhao++;
		id=rs2.getString("id");
		name=rs2.getString("name").trim();
		superior_id=rs2.getString("superior_id");
		description=rs2.getString("description");
		HasSub=Integer.parseInt(rs2.getString("hassub"));
		lvl=rs2.getString("lvl");
		flag=rs2.getString("flag");
		intlvl=Integer.parseInt(lvl)-2;
		
		String sup_gnid="";
		ResultSet rs3 = qxbean1.getResultSet("declare @gnid int select @gnid = gn_id_main from xtglt_gn_menu where gn_id_sub='"+ id +"' select * from GetSup_gnID(@gnid)");
		if(rs3.next()){
			sup_gnid=rs3.getString("id");
		}
%>
<TR id="tr_<%= zhu_id %>_<%= superior_id %>_<%= lvl %>" <%if (lvl.equals("1")){%>style="display:block"<%}else{%>style="display:block"<%}%>>
		<TD><a id="a_<%= zhu_id %>_<%= id %>_<%= lvl %>" onclick="showitem(<%= zhu_id %>,<%= id %>,<%= lvl %>)" style="cursor:hand"><%for(i=0;i<intlvl;i++){%><img src='root_img/space_line.gif' align='absmiddle'><%}%><%if (HasSub==0){%><img src='root_img/open_line.gif' align='absmiddle'><%}else{%><img id='img_<%=zhu_id%>_<%=id%>_<%=lvl%>' src='root_img/open.gif' align='absmiddle'><%}%></a><font color="#008080"><A <%if (description!=null&&!description.equals("")){%>Href = "<%=description%><%if(description.indexOf("?")>=0){%>&<%}else{%>?<%}%>gn_id=<%=id%>" target="main"<%}%>><span id="span_<%=id%>" <%if(xuhao==1){%>style="color:#FF1493"<%}%> <%if (description!=null&&!description.equals("")){%>onclick="changefontcolor('<%=id%>')"<%}%>><B><%=name%></B></span></a></font></TD>
</TR>
<%
	}
%>
    </table>
</form>
</body>
</html>
<%
}catch(Exception e){
	System.out.println("页面left.jsp出错："+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
	qxbean1.close();
}
%>