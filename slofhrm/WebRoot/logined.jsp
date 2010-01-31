<%@ page contentType="text/html; charset=GB2312"%>
<%if (roleid==null){%>
            <script language=javascript>
                alert("您还没有登录系统,请登录后使用！");
                window.parent.location="http://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/index.htm";
            </script>
<%return;}%>