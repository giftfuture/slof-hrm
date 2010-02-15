package com.tic.hrm;

import java.util.List;
import java.util.Map;

public interface IQoSystemDao {

	// public void validate() throws ValidateException;
	//
	// public void validateOnCreate() throws ValidateException;
	//
	// public void validateOnUpdate() throws ValidateException;
	//

	// public <E> E getEntity(Class<E> clasz, Integer id) throws Exception;

	public <E> E find(Class<E> clasz, Object id) throws Exception;

	public <E> E findFirst(Class<E> clasz) throws Exception;

	public <E> E findFirst(Class<E> clasz, String conditions, Object[] args) throws Exception;

	public <E> E findFirst(Class<E> clasz, String conditions, Object[] args, String order) throws Exception;

	public <E> E findFirst(Class<E> clasz, String conditions, Object[] args, String order, int limit) throws Exception;

	public <E> E findFirst(Class<E> clasz, String conditions, Object[] args, String order, int limit, int offset) throws Exception;

	public <E> List<E> findAll(Class<E> clasz) throws Exception;

	public <E> List<E> findAll(Class<E> clasz, String conditions, Object[] args) throws Exception;

	public <E> List<E> findAll(Class<E> clasz, String conditions, Object[] args, String order) throws Exception;

	public <E> List<E> findAll(Class<E> clasz, String conditions, Object[] args, String order, int limit) throws Exception;

	public <E> List<E> findAll(Class<E> clasz, String conditions, Object[] args, String order, int limit, int offset) throws Exception;

	public <E> List<E> findAll(Class<E> clasz, String conditions, String[] paramNames, Object[] values, String order) throws Exception;
	
	public List findAll(String queryString) throws Exception;
	
	
	// public <E> List<E> findBySql(Class<E> clasz, String sql, Object[] args,
	// String order, int limit, int offset) throws Exception;

	// public List<Map<String, Object>> getResultMap(Class<?> connClass, String
	// sql, Object[] args, String order, int limit, int offset) throws
	// Exception;
	//
	// public int updateAll(Class<?> clasz, String updates, Object[]
	// update_args, String conditions, Object[] condition_args) throws
	// Exception;
	//
	// public int destroyAll(Class<?> clasz, String conditions, Object[] args)
	// throws Exception;
	public void delete(Object obj) throws Exception;
	
	//public void delete(Class<?> clasz, Object id) throws Exception;
	
	public void bulkUpdate(String queryString) throws Exception;
	
	public void bulkUpdate(String queryString, Object[] args) throws Exception;
	
	public void deleteAll(Class<?> clasz, String conditions, Object[] args) throws Exception;

	// public int execute(String sql, Object[] args) throws Exception;
	//
	// public int execute(Class<?> c, String sql, Object[] args) throws
	// Exception;
	//
	public long count(Class<?> c, String conditions, Object[] args) throws Exception;

	public Integer maximum(Class<?> c, String field, String conditions, Object[] args) throws Exception;

	public Integer minimum(Class<?> c, String field, String conditions, Object[] args) throws Exception;

	//
	// public Object executeScalar(String sql, Object[] args) throws Exception;
	//
	// public <E> List<E> executeScalar(Class<E> c, String hql, Object[] args)
	// throws Exception;
	//
	// public <E> E createModel(Class<E> c, String prefix, Map map) throws
	// Exception;
	//
	// public <E> E updateModel(E obj, String prefix, Map map) throws Exception;
	//
	// public <E> E createModel(Class<E> c, Map map) throws Exception;
	//
	// public <E> E updateModel(E obj, Map map) throws Exception;
	//
	// public boolean create() throws Exception;
	//
	// public boolean update() throws Exception;

	public Integer saveInsert(Object entity) throws Exception;

	public void saveUpdate(Object entity) throws Exception;

	// public int destroy() throws Exception;
	//
	// public void beforeCreate() throws Exception;
	//
	// public void afterCreate() throws Exception;
	//
	// public void beforeUpdate() throws Exception;
	//
	// public void afterUpdate() throws Exception;
	//
	// public void beforeSave() throws Exception;
	//
	// public void afterSave() throws Exception;
	//
	// public void beforeDestroy() throws Exception;
	//
	// public void afterDestroy() throws Exception;

}
