package com.tic.hjsb;

import static org.junit.Assert.*;

import org.junit.Test;

public class HysySbwhServiceImplTest extends SpringHibernateBaseTest {

	@Test
	public void testGetSbfl() {
		System.out.println(hysysbwhService.getSbfl());
	}

	@Test
	public void testGetSblb() {
		System.out.println(hysysbwhService.getSblb(new Integer(3)));
	}
	
	@Test
	public void testGetSbmc() {
		System.out.println(hysysbwhService.getSbmc(new Integer(18)));
	}
	
	@Test
	public void testGetSccj() {
		System.out.println(hysysbwhService.getSccj(new Integer(18)));
	}

	@Test
	public void getSbmcBySbxxSql() {
		System.out.println(hysysbwhService.getSbmcBySbxxSql());
	}
	
	@Test
	public void getSbmcBySbxxHql() {
		System.out.println(hysysbwhService.getSbmcBySbxxHql());
	}

}
