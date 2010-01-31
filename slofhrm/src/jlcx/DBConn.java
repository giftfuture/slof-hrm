package jlcx;

import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class DBConn {

	private Connection conn = null;
	private Statement stmt = null;
	private ResultSet rs = null;

	public DBConn() {
		try {
			Context initCtx = new InitialContext();
			Context envCtx = (Context) initCtx.lookup("java:comp/env");
			DataSource ds = (DataSource) envCtx.lookup("jdbc/C3P0MSSQLHJSB");
			conn = ds.getConnection();
		} catch (Exception e) {
			System.out.print(e);
		}
	}

	public ResultSet getResultSet(String sqlStatement) {
		try {
			if (stmt == null) {
				stmt = conn.createStatement();
			}
			rs = stmt.executeQuery(sqlStatement);
		} catch (Exception e) {
			System.out.print(e);
		}
		return rs;
	}

	public boolean execute(String sql) {
		try {
			if (stmt == null) {
				stmt = conn.createStatement();
			}
			if (stmt.executeUpdate(sql) == 0) {
				return false;
			} else {
				return true;
			}
		} catch (Exception e) {
			System.out.print(e);
			return false;
		}
	}

	public void close() {
		if (stmt != null) {
			try {
				stmt.close();
				stmt = null;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (conn != null) {
			try {
				conn.close();
				conn = null;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
    /**
     *ISOtoGB(String str)方法用于字符的转换，将iso字符转化成为gb2312字符。改变在输出汉语时为乱码的现象。
     **/
    public static String ISOtoGB(String str){
        if(str==null)
            return "";
        try{
//            return new String(str.getBytes("ISO8859_1"),"GB2312");
            return new String(str.getBytes("ISO-8859-1"),"GB2312");
        }catch(UnsupportedEncodingException e){
            return "";
        }
    }
}
