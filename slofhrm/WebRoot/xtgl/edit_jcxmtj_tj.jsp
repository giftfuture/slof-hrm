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
    String tempurl="xtgl/admin_jcxmtj.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String jcxmtj_id="",tjxm="",bglb="",jcxm_id="",strsql="";
		jcxmtj_id = qxbean.ISOtoGB(request.getParameter("jcxmtj_id"));
        tjxm = qxbean.ISOtoGB(request.getParameter("tjxm"));
        bglb = qxbean.ISOtoGB(request.getParameter("bglb"));
        
		String saved1="";
        String saved2="";
		
		//�鿴ͳ����Ŀģ�������Ƿ��Ѵ���
        int num=0;
		ResultSet rs =qxbean.getResultSet("select count(*) as num from xtglt_jcxmtj where id<>'"+jcxmtj_id+"' and tjxm='"+tjxm+"' and bgzl2_id='"+ bglb +"'");
        if (rs.next()){
            num=Integer.parseInt(rs.getString("num"));
        }
        if (num>0)
        {%>
        <script language=javascript>
            alert("ģ�������Ѵ��ڣ�����ġ�");
            window.history.go(-1);
        </script>
        <%}else{
        strsql = "update xtglt_jcxmtj set tjxm='"+tjxm+"', bgzl2_id='"+ bglb +"' where id='"+jcxmtj_id+"'";
        if (qxbean.execute(strsql)) {saved1="true";}else{saved1="false";}
		qxbean.execute("delete from xtglt_jcxmtj_jcxm where jcxmtj_id='"+jcxmtj_id+"'");
        if (request.getParameterValues("chkbx")!=null){
            String chkbx[] = request.getParameterValues("chkbx");
            int len = java.lang.reflect.Array.getLength(chkbx);
            for(int i = 0; i < len ; i++){
                jcxm_id = chkbx[i];
                strsql = "insert into xtglt_jcxmtj_jcxm (jcxmtj_id,jcxm_id) values ('"+ jcxmtj_id +"','"+jcxm_id+"')";
                if (qxbean.execute(strsql)){saved2="true";}else{saved2="false";}
            }
        }		
		if (saved1.equals("true")&&saved2.equals("true")){%>
        <script language=javascript>
            alert("�޸ĳɹ�!");
            window.location='admin_jcxmtj.jsp';
        </script>
        <%}else{%>
        <script language=javascript>
            alert("���ݿ����ʧ�ܣ�");
            window.history.go(-1);
        </script>
        <%}
        }
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