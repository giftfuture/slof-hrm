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
    String tempurl="xtgl/admin_danwei.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String id,name,description,last_superior_id,superior_id="",superior_id_lvl,strlvl,flag="1",zhu_id="",strsql,strsql2="";
        String danwei_id="";
        int lvl=0,HasSub=0;
        id = request.getParameter("id");
        name = qxbean.ISOtoGB(request.getParameter("danweiname"));
        description = qxbean.ISOtoGB(request.getParameter("description"));
        superior_id_lvl = request.getParameter("superiorid_lvl");
        last_superior_id = request.getParameter("last_superior_id");
		//out.println(last_superior_id);
		//out.println("<BR>");
		
//取出总系统管理员的role_id，根据单位为空，总系统管理员不属于任何单位
    String admin_role_id="";
    ResultSet admin_rs = qxbean.getResultSet("select id from xtglt_role where danwei_id is null");
    if (admin_rs.next()){
        admin_role_id=admin_rs.getString("id");
    }
    if (roleid.equals(admin_role_id)){
        if (superior_id_lvl.equals("")){
            superior_id=id;
            lvl=1;
        }else{
            String aryTemp[] =superior_id_lvl.split("_");
            superior_id=aryTemp[0];
            strlvl=aryTemp[1];
            lvl=Integer.parseInt(strlvl)+1;
        }
        strsql = "EXEC edit_danwei '"+id+"', '"+name+"', '"+superior_id+"', '"+description+"','"+lvl+"','"+flag+"'";

		if (qxbean.execute(strsql)) {
			
			//更新单位的同时，更新上级单位的hassub，
			//根据要更新的上级单位superior_id和未更新的上级单位last_superior_id判断更新 新旧上级单位的hassub.
			//如果相等,没有更改上级单位,不修改hassub.如果不相等
			//如果last_superior_id为空，
						
			if (!superior_id.equals(last_superior_id)){
				//更新新上级单位的hassub
				if (!superior_id_lvl.equals("")){
					boolean updated = qxbean.execute("update xtglt_danwei set hassub='1' where id='"+ superior_id +"'");
				}
				//更新旧上级单位,判断上级单位是否含有下级单位,如果有不处理hassub，如果没有更新
				ResultSet HasSub_rs = qxbean.getResultSet("select count(*) as num from xtglt_danwei where superior_id='"+last_superior_id+"' and id<>superior_id");
				if(HasSub_rs.next()){
					HasSub=Integer.parseInt(HasSub_rs.getString("num"));
				}
				if (HasSub==0){
					boolean updated = qxbean.execute("update xtglt_danwei set hassub='0' where id='"+ last_superior_id +"'");
				}
			}
		%>
        <script language=javascript>
            alert("修改成功!");
            window.location="admin_danwei.jsp";
        </script>
        <%}else{%>
        <script language=javascript>
            alert("数据库操作失败!");
            window.history.go(-1);
        </script>
        <%}
}else{
        //如果是分级管理员，根据其所在单位列出所有下级单位
        //取出分级管理员的danwei_id
        ResultSet sub_admin_rs = qxbean.getResultSet("select * from xtglt_danwei where id in (select danwei_id from xtglt_role where id='"+roleid+"')");
        if (sub_admin_rs.next()){
            zhu_id=sub_admin_rs.getString("id");
            superior_id=sub_admin_rs.getString("superior_id");
            lvl=Integer.parseInt(sub_admin_rs.getString("lvl"));
        }
        //id为上个页面传过来的要修改的单位id，允许登陆用户修改自己所在单位,不能更改上级单位 superior_id 及级别 lvl
        //zhu_id登陆用户的单位id
        if (zhu_id.equals(id)){
            
        }else{
            String aryTemp[] =superior_id_lvl.split("_");
            superior_id=aryTemp[0];
            strlvl=aryTemp[1];
            lvl=Integer.parseInt(strlvl)+1;
        }
        strsql = "EXEC edit_danwei '"+id+"', '"+name+"', '"+superior_id+"', '"+description+"','"+lvl+"','"+flag+"'";
        
        if (qxbean.execute(strsql)) {
			//更新单位的同时，更新上级单位的hassub，
			//根据要更新的上级单位superior_id和未更新的上级单位last_superior_id判断更新 新旧上级单位的hassub.
			//如果相等,没有更改上级单位,不修改hassub.如果不相等
			if (!superior_id.equals(last_superior_id)){
				//更新新上级单位的hassub
				boolean updated = qxbean.execute("update xtglt_danwei set hassub='1' where id='"+ superior_id +"'");
				//更新旧上级单位,判断上级单位是否含有下级单位,如果有不处理hassub，如果没有更新
				ResultSet HasSub_rs = qxbean.getResultSet("select count(*) as num from xtglt_danwei where superior_id='"+last_superior_id+"' and id<>superior_id");
				if(HasSub_rs.next()){
					HasSub=Integer.parseInt(HasSub_rs.getString("num"));
				}
				if (HasSub==0){
					updated = qxbean.execute("update xtglt_danwei set hassub='0' where id='"+ last_superior_id +"'");
				}
			}
		%>
        <script language=javascript>
            alert("修改成功!");
            window.location="admin_danwei.jsp";
        </script>
        <%}else{%>
        <script language=javascript>
            alert("数据库操作失败!");
            window.history.go(-1);
        </script>
        <%}
    }
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