// ������ɫ��������
// ͨ��ʹ���������ɫ��ǳ��ɫ��...��
	if (typeof fcolor == 'undefined') { var fcolor = "ffffff";}
	
// Border����ɫ�ͱ���������ɫ��
// ͨ������ɫ���ɫ����ɫ�ȡ���
	//if (typeof backcolor == 'undefined') { var backcolor = "#CDCDCD";}
	if (typeof backcolor == 'undefined') { var backcolor = "#F7F7F7";}
	
// ���ֵ���ɫ
// ͨ���ǱȽ������ɫ��
//	if (typeof textcolor == 'undefined') { }
	//var textcolor = "#999900";
	var textcolor = "red";
	
// �������ɫ
// ͨ�����������ɫ��
//	if (typeof capcolor == 'undefined') { }
	var capcolor = "#FFFFFF";
	
// "Close"����ɫ
// ͨ�����������ɫ��
//	if (typeof closecolor == 'undefined') { }
	var closecolor = "#9999FF";
	
// �����Ĵ��ڵĿ�ȣ�
// 100-300 pixels ����
	//if (typeof width == 'undefined') {}
	var width = "120";
	
// ��Ե�Ŀ�ȣ����ء�
// 1-3 pixels ����
//	if (typeof border == 'undefined') { }
	var border = "1";
	
	
// ��������λ������������Ҳ�ľ��룬���ء�
// 3-12����
//	if (typeof offsetx == 'undefined') { }
	var offsetx = 420;
	
// ��������λ������·��ľ��룻
// 3-12 ����
//	if (typeof offsety == 'undefined') { }
	var offsety = 100;
	
////////////////////////////////////////////////////////////////////////////////////
// ���ý���
////////////////////////////////////////////////////////////////////////////////////

ns4 = (document.layers)? true:false
ie4 = (document.all)? true:false

// Microsoft Stupidity Check.
if (ie4) {
	if (navigator.userAgent.indexOf('MSIE 5')>0) {
		ie5 = true;
	} else {
		ie5 = false; }
} else {
	ie5 = false;
}

var x = 0;
var y = 0;
var tempx = 0;
var tempy = 0;
var show = 0;
var sw = 0;
var cnt = 0;
var dir = 1;
var tr=1;
if ( (ns4) || (ie4) ) {
	if (ns4) over = document.overDiv
	if (ie4) over = overDiv.style
	//document.onmousemove = mouseMove
	if (ns4) document.captureEvents(Event.MOUSEMOVE)
}

// ������ҳ����ʹ�õĹ���������

function SubOnFocus(inpt)
{
    inpt.select();
    inpt.style.backgroundColor='beige';
    //SetTextBoxColor(inpt);
    UnShowTip(inpt);
}

function SetTextBoxColor(inpt)
{
    //inpt.styles.color=#D9ECF0
    inpt.style.backgroundColor='beige';
}

function SubOnBlur(inpt)
{
    inpt.style.backgroundColor='white';
    inpt.style.borderWidth='0cm';
    inpt.style.borderStyle='groove';
    //SetTextBoxColor(inpt);
    //ShowTip(inpt);
    verifyDate(inpt)		
}

function SubOnBlurNoCal(inpt)
{
    inpt.style.backgroundColor='white';
    inpt.style.borderWidth='0cm';
    inpt.style.borderStyle='groove';
    //SetTextBoxColor(inpt);
    //ShowTip(inpt);    
}

function UnShowTip(inpt)
{
	tempx=inpt.offsetParent.offsetParent.offsetLeft+inpt.offsetParent.offsetLeft;
	tempy=inpt.offsetParent.offsetParent.offsetTop+inpt.offsetParent.offsetTop;
	if (tempx==x&&tempy==y)
	{
		nd();
	}
}

function ShowTip(inpt,tmpstring) 
{
	x=inpt.offsetParent.offsetParent.offsetLeft+inpt.offsetParent.offsetLeft;
	y=inpt.offsetParent.offsetParent.offsetTop+inpt.offsetParent.offsetTop;
//	if ( text!="") {
		dts(1,tmpstring);		
//	} else {
//		nd();
	//}
		
}

// Simple popup right
function drs(text) {
	dts(1,text);
}

// Clears popups if appropriate
function nd() {
	if ( cnt >= 1 ) { sw = 0 };
	if ( (ns4) || (ie4) ) {
		if ( sw == 0 ) {
			show = 0;
			hideObject(over);
		} else {
			cnt++;
		}
	}
}

// �ǹ����������������ĺ������ã�

// Simple popup
function dts(d,text) {
	//txt = "<TABLE WIDTH="+width+" BORDER=0 CELLPADDING="+border+" CELLSPACING=0 BGCOLOR=\""+backcolor+"\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 BGCOLOR=\""+fcolor+"\"><TR><TD CLASS=P1><FONT FACE=\"����\" COLOR=\""+textcolor+"\">"+text+"</FONT></TD></TR></TABLE></TD></TR></TABLE>"
	txt=text;
	//txt = "<TABLE WIDTH="+width+" BORDER=0 CELLPADDING="+border+" CELLSPACING=0 BGCOLOR=\""+backcolor+"\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 BGCOLOR=\""+fcolor+"\"><TR><TD CLASS=P1><FONT FACE=\"����\" COLOR=\""+textcolor+"\">"+text+"</FONT></TD></TR></TABLE></TD></TR></TABLE>"
	layerWrite(txt);
	dir = d;
	disp();
}


// Common calls
function disp() {
	if ( (ns4) || (ie4) ) {
		if (show == 0||show == 1) 	{
			if (dir == 2) { // Center
				moveTo(over,x+offsetx-(width/2),y+offsety);
			}
			if (dir == 1) { // Right
				moveTo(over,x+offsetx,y+offsety);
			}
			if (dir == 0) { // Left
				moveTo(over,x-offsetx-width,y+offsety);
			}
			showObject(over);
			show = 1;
		}
	}
// Here you can make the text goto the statusbar.
}

// Moves the layer
function mouseMove(e) {
	if (ns4) {x=e.pageX; y=e.pageY;}
	if (ie4) {x=event.x+document.body.scrollLeft; y=event.y+document.body.scrollTop;}
	if (ie5) {x=event.x+document.body.scrollLeft; y=event.y+document.body.scrollTop;}
	if (show) {
		if (dir == 2) { // Center
			moveTo(over,x+offsetx-(width/2),y+offsety);
		}
		if (dir == 1) { // Right
			moveTo(over,x+offsetx,y+offsety);
		}
		if (dir == 0) { // Left
			moveTo(over,x-offsetx-width,y+offsety);
		}
	}
}

// The Close onMouseOver function for Sticky
function cClick() {
	hideObject(over);
	sw=0;
}

// Writes to a layer
function layerWrite(txt) {
        if (ns4) {
                var lyr = document.overDiv.document
                lyr.write(txt)
                lyr.close()
        }
        else if (ie4) document.all["overDiv"].innerHTML = txt
		if (tr) {  }
}

// Make an object visible
function showObject(obj) {
        if (ns4) obj.visibility = "show"
        else if (ie4) obj.visibility = "visible"
}

// Hides an object
function hideObject(obj) {
        if (ns4) obj.visibility = "hide"
        else if (ie4) obj.visibility = "hidden"
}

// Move a layer
function moveTo(obj,xL,yL) {
		obj.left = xL
		obj.top = yL
}

