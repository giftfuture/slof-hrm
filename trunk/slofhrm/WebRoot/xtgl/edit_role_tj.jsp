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
    String tempurl="xtgl/admin_role.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String role_id=request.getParameter("role_id");
        String rolename,note,danwei_id,gn_id,return_flag,strsql;
        String saved1="";
        String saved2="";
        rolename = qxbean.ISOtoGB(request.getParameter("rolename"));
        note = qxbean.ISOtoGB(request.getParameter("note"));
        danwei_id = request.getParameter("superiorid");
        
        strsql = "update xtglt_role set rolename='"+rolename+"',note='"+ note +"',danwei_id='"+ danwei_id +"' where id='"+role_id+"'";
        if (qxbean.execute(strsql)) {saved1="true";}else{saved1="false";}
        
        //�����Ȩ�޷��䣬��ɾ������ǰ��Ȩ����Ŀ��Ȼ�������Ȩ��
        int HasQx=0;
        ResultSet HasQx_rs = qxbean.getResultSet("select count(*) as num from xtglt_role_qx where role_id='"+role_id+"'");
        if(HasQx_rs.next()){
            HasQx=Integer.parseInt(HasQx_rs.getString("num"));
        }
        if (HasQx>0){qxbean.execute("delete from xtglt_role_qx where role_id='"+role_id+"'");}
            if (request.getParameterValues("chkbx")!=null){
                String chkbx[] = request.getParameterValues("chkbx");
                int len = java.lang.reflect.Array.getLength(chkbx);
                for(int i = 0; i < len ; i++){
                    gn_id = chkbx[i];
                    strsql = "insert into xtglt_role_qx (role_id,gn_id) values ('"+ role_id +"','"+gn_id+"')";
                    if (qxbean.execute(strsql)){saved2="true";}else{saved2="false";}
                }
            }
        if (saved1.equals("true")&&saved2.equals("true")){%>
        <script language=javascript>
            alert("����ɹ�!");
            window.location="list_role.jsp?id=<%=danwei_id%>";
        </script>
        <%}
        if (saved1.equals("true")&&saved2.equals("false"))
        {%>
        <script language=javascript>
            alert("�û����ѽ���,��Ȩ�����ó���\n���޸���Ȩ�ޣ���ɾ�����û���������ӡ�");
            window.location="list_role.jsp?id=<%=danwei_id%>";
        </script>
        <%}
        if (saved1.equals("false")&&saved2.equals("false"))
        {%>
        <script language=javascript>
            alert("���ݿ����ʧ�ܣ�");
            window.history.go(-1);
        </script>
        <%}
        %>
    </body>
</html>
<%
}catch(Exception e){
	System.out.println("ҳ��"+request.getRequestURI()+"����"+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
}
%>