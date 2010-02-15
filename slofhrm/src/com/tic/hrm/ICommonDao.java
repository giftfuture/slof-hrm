package com.tic.hrm;

import java.util.List;

public interface ICommonDao {
	
	public void insertObject(Object obj) throws Exception;

	public void updateObject(Object obj) throws Exception;
	
	public void updateObject(List list) throws Exception ;
	
	public <E> List<E> findObjectByPage(String query_hql, int pageStart, int pageLimit) throws Exception;
	
	public int getTotalNum(String query_hql) throws Exception;
	
	public <E> E getObjectById(Class<E> clasz, Integer strid) throws Exception;
	
	public void deleteAll(Class<?> clasz, String conditions, String[] paramNames, Object[] args) throws Exception;
	
	public void deleteAll(Class<?> clasz, String conditions, Object[] args) throws Exception;
	
	public <E> E find(Class<E> clasz, Object id) throws Exception;
	
	public <E> List<E> findAll(Class<E> clasz, String conditions, Object[] args) throws Exception;
	
	public <E> List<E> findAll(Class<E> clasz, String conditions, Object[] args, String string) throws Exception;
	
	public List findAll(String queryString) throws Exception;
	
	public Integer executeSql(String strSql) throws Exception;
	
	public List getHqlList(String hql) throws Exception;

}
