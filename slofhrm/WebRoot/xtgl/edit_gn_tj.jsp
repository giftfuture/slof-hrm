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
			//���²˵���ͬʱ�������ϼ��˵���hassub��
			//����Ҫ���µ��ϼ��˵�superior_id��δ���µ��ϼ��˵�last_superior_id�жϸ��� �¾��ϼ��˵���hassub.
			//������,û�и����ϼ��˵�,���޸�hassub.��������
			//���last_superior_idΪ�գ�
			
			if (!superior_id.equals(last_superior_id)){
				//�������ϼ��˵���hassub
				if (!superior_id_lvl.equals("")){
					boolean updated = qxbean.execute("update xtglt_gn set hassub='1' where id='"+ superior_id +"'");
				}
				//���¾��ϼ��˵�,�ж��ϼ��˵��Ƿ����¼��˵�,����в�����hassub�����û�и���
				ResultSet HasSub_rs = qxbean.getResultSet("select count(*) as num from xtglt_gn where superior_id='"+last_superior_id+"' and id<>superior_id");
				if(HasSub_rs.next()){
					HasSub=Integer.parseInt(HasSub_rs.getString("num"));
				}
				if (HasSub==0){
					boolean updated = qxbean.execute("update xtglt_gn set hassub='0' where id='"+ last_superior_id +"'");
				}
			}
			//���flag=3˵����ӵķ���˵�,��Ҫ���������ܲ˵�
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
            alert("�޸ĳɹ�!");
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