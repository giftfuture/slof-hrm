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

        //�����ӹ��ܳɹ�������Ȩ��ϵͳ����Ա��
        if (qxbean.execute(strsql)){
            //�õ��ղ���Ĺ���gn_id
            ResultSet gn_rs = qxbean.getResultSet("select @@IDENTITY as currentid");
            if (gn_rs.next()){gn_id=gn_rs.getString("currentid");}
            
            //�õ�ϵͳ����Ա���û��� role_id
            ResultSet admin_rs = qxbean.getResultSet("select id from xtglt_role where danwei_id is null");
            if (admin_rs.next()){role_id=admin_rs.getString("id");}
            
            if (qxbean.execute("insert into xtglt_role_qx(role_id,gn_id) Values ('"+role_id+"','"+gn_id+"')")){
                HasSaved="yes";
            }
			
			//���gnlx=3˵����ӵķ���˵�,��Ҫ���������ܲ˵�
			String aryTemp[] =id_filepath.split(":");
			String gn_id_main=aryTemp[0];   
			if (gnlx.equals("3")){
				qxbean.execute("insert into xtglt_gn_menu (gn_id_main,gn_id_sub) values ('"+ gn_id_main +"','"+ gn_id +"')");
			}
		}
        if (HasSaved.equals("yes")) {
			//�������ɹ���������ѡ���ϼ��˵�superior_id�������ϼ��˵���hassub����ʾ�����¼��˵�
			boolean updated = qxbean.execute(strsql2);
		%>
        <script language=javascript>
            alert("����ɹ�!");
            window.location="admin_gn.jsp";
        </script>
        <%}else{%>
        <script language=javascript>
            alert("���ݿ����ʧ��!");
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