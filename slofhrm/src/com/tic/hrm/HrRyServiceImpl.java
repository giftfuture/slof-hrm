package com.tic.hrm;

import org.dozer.Mapper;

public class HrRyServiceImpl implements IHrRyService {

	private ICommonDao commonDao;
	private Mapper dozermapper;
	
	
	
	
	public ICommonDao getCommonDao() {
		return commonDao;
	}
	public void setCommonDao(ICommonDao commonDao) {
		this.commonDao = commonDao;
	}
	public Mapper getDozermapper() {
		return dozermapper;
	}
	public void setDozermapper(Mapper dozermapper) {
		this.dozermapper = dozermapper;
	}
}
