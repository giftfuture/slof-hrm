<%@ page contentType="text/html; charset=GB2312"%>
<%if (roleid==null){%>
            <script language=javascript>
                alert("����û�е�¼ϵͳ,���¼��ʹ�ã�");
                window.parent.location="http://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/index.htm";
            </script>
<%return;}%>