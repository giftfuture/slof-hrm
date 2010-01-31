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
        String id,name,description,last_superior_id,superior_id="",superior_id_lvl,strlvl,flag="",strsql,id_filepath="";
        int lvl,HasSub=0;
        id = request.getParameter("id");
        name = qxbean.ISOtoGB(request.getParameter("gnname"));
		flag = qxbean.ISOtoGB(request.getParameter("gnlx"));
        description = qxbean.ISOtoGB(request.getParameter("description"));
        superior_id_lvl = request.getParameter("superiorid_lvl");
		last_superior_id = request.getParameter("last_superior_id");
		if(request.getParameter("ckbtxcd")!=null){flag = request.getParameter("ckbtxcd");}
		id_filepath = request.getParameter("select_filepath");
		
        if (superior_id_lvl.equals("")){
            superior_id=id;
            lvl=1;
        }else{
            String aryTemp[] =superior_id_lvl.split("_");
            superior_id=aryTemp[0];
            strlvl=aryTemp[1];
            lvl=Integer.parseInt(strlvl)+1;
        }
        strsql = "EXEC edit_gn '"+id+"', '"+name+"', '"+superior_id+"', '"+description+"','"+lvl+"','"+flag+"'";
        //out.println(strsql);
        if (qxbean.execute(strsql)) {
			//更新菜单的同时，更新上级菜单的hassub，
			//根据要更新的上级菜单superior_id和未更新的上级菜单last_superior_id判断更新 新旧上级菜单的hassub.
			//如果相等,没有更改上级菜单,不修改hassub.如果不相等
			//如果last_superior_id为空，
			
			if (!superior_id.equals(last_superior_id)){
				//更新新上级菜单的hassub
				if (!superior_id_lvl.equals("")){
					boolean updated = qxbean.execute("update xtglt_gn set hassub='1' where id='"+ superior_id +"'");
				}
				//更新旧上级菜单,判断上级菜单是否含有下级菜单,如果有不处理hassub，如果没有更新
				ResultSet HasSub_rs = qxbean.getResultSet("select count(*) as num from xtglt_gn where superior_id='"+last_superior_id+"' and id<>superior_id");
				if(HasSub_rs.next()){
					HasSub=Integer.parseInt(HasSub_rs.getString("num"));
				}
				if (HasSub==0){
					boolean updated = qxbean.execute("update xtglt_gn set hassub='0' where id='"+ last_superior_id +"'");
				}
			}
			//如果flag=3说明添加的分组菜单,需要关联主功能菜单
			String aryTemp[] =id_filepath.split(":");
			String gn_id_main=aryTemp[0];
			if (flag.equals("3")){
				qxbean.execute("delete from xtglt_gn_menu where gn_id_sub='"+ id +"'");
				qxbean.execute("insert into xtglt_gn_menu (gn_id_main,gn_id_sub) values ('"+ gn_id_main +"','"+ id +"')");
			}else{
				qxbean.execute("delete from xtglt_gn_menu where gn_id_sub='"+ id +"'");
			}
		%>
        <script language=javascript>
            alert("修改成功!");
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