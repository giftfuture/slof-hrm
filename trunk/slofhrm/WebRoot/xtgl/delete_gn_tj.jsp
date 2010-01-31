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
        String id,strsql,superior_id="";
        String deleted="";
        int len=0,HasSub=0;
        if (request.getParameterValues("chkbx")!=null){
            String chkbx[] = request.getParameterValues("chkbx");
            len = java.lang.reflect.Array.getLength(chkbx);
            for(int i = 0; i < len ; i++){
                id = chkbx[i];
				//得到要删除菜单的上级菜单superior_id。
				ResultSet rs = qxbean.getResultSet("select superior_id from xtglt_gn where id='"+id+"'");
				if(rs.next()){
					superior_id=rs.getString("superior_id");
				}
                strsql = "delete from xtglt_gn where id='"+id+"'";
                //删除菜单后需要更新上级菜单的hassub。
				if (qxbean.execute(strsql)){
				//先删除要删的菜单,再根据要删除菜单的上级菜单superior_id，判断上级菜单是否含有下级菜单。
					ResultSet HasSub_rs = qxbean.getResultSet("select count(*) as num from xtglt_gn where superior_id='"+superior_id+"' and id<>superior_id");
					if(HasSub_rs.next()){
						HasSub=Integer.parseInt(HasSub_rs.getString("num"));
					}
					//如果没有下级菜单，则需要更新hassub=0
					if (HasSub==0){
						boolean updated = qxbean.execute("update xtglt_gn set hassub='0' where id='"+ superior_id +"'");
					}
					deleted="true";
				}
            }
            if (deleted.equals("true")){%>
                    <script language=javascript>
                        alert("删除成功");
                        window.location="admin_gn.jsp";
                    </script>
            <%}else{%>
                    <script language=javascript>
                        alert("删除失败！\n请先删除其下级菜单后再删除。");
                        window.location="admin_gn.jsp";
                    </script>
            <%}%>
        <%}else{%>
        <script language=javascript>
            alert("请先选择要删除的项!");
            window.location="admin_gn.jsp";
        </script>
        <%}%>
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