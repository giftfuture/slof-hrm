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
		
//ȡ����ϵͳ����Ա��role_id�����ݵ�λΪ�գ���ϵͳ����Ա�������κε�λ
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
			
			//���µ�λ��ͬʱ�������ϼ���λ��hassub��
			//����Ҫ���µ��ϼ���λsuperior_id��δ���µ��ϼ���λlast_superior_id�жϸ��� �¾��ϼ���λ��hassub.
			//������,û�и����ϼ���λ,���޸�hassub.��������
			//���last_superior_idΪ�գ�
						
			if (!superior_id.equals(last_superior_id)){
				//�������ϼ���λ��hassub
				if (!superior_id_lvl.equals("")){
					boolean updated = qxbean.execute("update xtglt_danwei set hassub='1' where id='"+ superior_id +"'");
				}
				//���¾��ϼ���λ,�ж��ϼ���λ�Ƿ����¼���λ,����в�����hassub�����û�и���
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
            alert("�޸ĳɹ�!");
            window.location="admin_danwei.jsp";
        </script>
        <%}else{%>
        <script language=javascript>
            alert("���ݿ����ʧ��!");
            window.history.go(-1);
        </script>
        <%}
}else{
        //����Ƿּ�����Ա�����������ڵ�λ�г������¼���λ
        //ȡ���ּ�����Ա��danwei_id
        ResultSet sub_admin_rs = qxbean.getResultSet("select * from xtglt_danwei where id in (select danwei_id from xtglt_role where id='"+roleid+"')");
        if (sub_admin_rs.next()){
            zhu_id=sub_admin_rs.getString("id");
            superior_id=sub_admin_rs.getString("superior_id");
            lvl=Integer.parseInt(sub_admin_rs.getString("lvl"));
        }
        //idΪ�ϸ�ҳ�洫������Ҫ�޸ĵĵ�λid�������½�û��޸��Լ����ڵ�λ,���ܸ����ϼ���λ superior_id ������ lvl
        //zhu_id��½�û��ĵ�λid
        if (zhu_id.equals(id)){
            
        }else{
            String aryTemp[] =superior_id_lvl.split("_");
            superior_id=aryTemp[0];
            strlvl=aryTemp[1];
            lvl=Integer.parseInt(strlvl)+1;
        }
        strsql = "EXEC edit_danwei '"+id+"', '"+name+"', '"+superior_id+"', '"+description+"','"+lvl+"','"+flag+"'";
        
        if (qxbean.execute(strsql)) {
			//���µ�λ��ͬʱ�������ϼ���λ��hassub��
			//����Ҫ���µ��ϼ���λsuperior_id��δ���µ��ϼ���λlast_superior_id�жϸ��� �¾��ϼ���λ��hassub.
			//������,û�и����ϼ���λ,���޸�hassub.��������
			if (!superior_id.equals(last_superior_id)){
				//�������ϼ���λ��hassub
				boolean updated = qxbean.execute("update xtglt_danwei set hassub='1' where id='"+ superior_id +"'");
				//���¾��ϼ���λ,�ж��ϼ���λ�Ƿ����¼���λ,����в�����hassub�����û�и���
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
            alert("�޸ĳɹ�!");
            window.location="admin_danwei.jsp";
        </script>
        <%}else{%>
        <script language=javascript>
            alert("���ݿ����ʧ��!");
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