<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<html>
    <head>
        <title></title>
    </head>
    <body>
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_gn.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String name,description,superior_id,strlvl,superior_id_lvl,strsql,strsql2="",gnlx="",id_filepath="",isbgtx="";
        String gn_id="",role_id="",HasSaved="";
        name = qxbean.ISOtoGB(request.getParameter("gnname"));
		gnlx = qxbean.ISOtoGB(request.getParameter("gnlx"));
        description = qxbean.ISOtoGB(request.getParameter("description"));
        superior_id_lvl = request.getParameter("superiorid_lvl");
		if(request.getParameter("ckbtxcd")!=null){gnlx = request.getParameter("ckbtxcd");}
		id_filepath = request.getParameter("select_filepath");
		
        if (superior_id_lvl.equals("")){
            strsql = "insert into xtglt_gn(name,description,superior_id,lvl,flag) Values ('"+name+"','"+ description +"',IDENT_CURRENT('xtglt_gn')+1,'1','"+ gnlx +"')";
        }else{
            String aryTemp[] =superior_id_lvl.split("_");
            superior_id=aryTemp[0];
            strlvl=aryTemp[1];
            int lvl=Integer.parseInt(strlvl)+1;
            strsql = "insert into xtglt_gn(name,description,superior_id,lvl,flag) Values ('"+name+"','"+ description +"','"+ superior_id +"','"+lvl+"','"+ gnlx +"')";
			strsql2 = "update xtglt_gn set hassub='1' where id='"+ superior_id +"'";
        }

        //如果添加功能成功，则授权给系统管理员。
        if (qxbean.execute(strsql)){
            //得到刚插入的功能gn_id
            ResultSet gn_rs = qxbean.getResultSet("select @@IDENTITY as currentid");
            if (gn_rs.next()){gn_id=gn_rs.getString("currentid");}
            
            //得到系统管理员的用户组 role_id
            ResultSet admin_rs = qxbean.getResultSet("select id from xtglt_role where danwei_id is null");
            if (admin_rs.next()){role_id=admin_rs.getString("id");}
            
            if (qxbean.execute("insert into xtglt_role_qx(role_id,gn_id) Values ('"+role_id+"','"+gn_id+"')")){
                HasSaved="yes";
            }
			
			//如果gnlx=3说明添加的分组菜单,需要关联主功能菜单
			String aryTemp[] =id_filepath.split(":");
			String gn_id_main=aryTemp[0];   
			if (gnlx.equals("3")){
				qxbean.execute("insert into xtglt_gn_menu (gn_id_main,gn_id_sub) values ('"+ gn_id_main +"','"+ gn_id +"')");
			}
		}
        if (HasSaved.equals("yes")) {
			//如果保存成功，根据所选得上级菜单superior_id，更新上级菜单的hassub，表示含有下级菜单
			boolean updated = qxbean.execute(strsql2);
		%>
        <script language=javascript>
            alert("保存成功!");
            window.location="admin_gn.jsp";
        </script>
        <%}else{%>
        <script language=javascript>
            alert("数据库操作失败!");
            window.history.go(-1);
        </script>
        <%}
        %>
    </body>
</html>
<%
}catch(Exception e){
	System.out.println("页面"+request.getRequestURI()+"出错："+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
}
%>