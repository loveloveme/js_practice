window.onload=function() {
	var oTable=document.getElementsByTagName('table')[0];
	var oBtnSelectAll=oTable.getElementsByTagName('input')[0];
	var oInputs=oTable.getElementsByTagName('input');
	var aRows=oTable.tBodies[0].rows;
	var oBtnPrice=oTable.tHead.getElementsByTagName('a')[0];
	var oBtnArea=oTable.tHead.getElementsByTagName('a')[1];
	var i=0;
	
	interlaceColor();
	
	
	for(i=0;i<oInputs.length;i++)
	{
		if(oInputs[i].type=='button'&& oInputs[i].value=='删除')
		{
			oInputs[i].onclick=doDelete();
		}
		if(oInputs[i].type=='checkbox'&& oInputs[i]!=oBtnSelectAll)
		{
			oInputs[i].onclick=calcTotalPrice;
		}
	}
	
	oBtnSelectAll.onclick=function()
	{
		selectAll();
		calcTotalPrice();
	}
	
	oBtnPrice.order='none';
	oBtnPrice.onclick=sortByPrice;

	oBtnArea.order='none';
	oBtnArea.onclick=sortByArea;
};

function interlaceColor()
{
	var oTable=document.getElementsByTagName('table')[0];
	var aRows=oTable.tBodies[0].rows;
	var i=0;
	
	for(i=0;i<aRows.length;i++)
	{
		if(i%2)
		{
			aRows[i].style.background='#fafafa';
		}
		else
		{
			aRows[i].style.background='';
		}
	}
}
//失败
function doDelete()
{
	this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
}

function calcTotalPrice()
{
	var oTable=document.getElementsByTagName('table')[0];
	var aRows=oTable.tBodies[0].rows;
	var fResult=0.0;
	var oSpanTotalPrice=oTable.tFoot.getElementsByTagName('span')[0];
	var i=0;
	
	for(i=0;i<aRows.length;i++)
	{
		if(aRows[i].getElementsByTagName('input')[0].checked)
		{
			fResult+=parseFloat(aRows[i].getElementsByTagName('span')[0].innerHTML.substring(1));
		}
	}
	oSpanTotalPrice.innerHTML='&yen;'+fResult.toFixed(2)+'元';
}

function selectAll()
{
	var oTable=document.getElementsByTagName('table')[0];
	var oBtnSelectAll=oTable.getElementsByTagName('input')[0];
	var oInputs=oTable.tBodies[0].getElementsByTagName('input');
	
	var i=0;
	
	for(i=0;i<oInputs.length;i++)
	{
		if(oInputs[i].type=='checkbox')
		{
			oInputs[i].checked=oBtnSelectAll.checked;
		}
	}
}

function sortTable(fncmp)
{
	var oTable=document.getElementsByTagName('table')[0];
	var aRows=oTable.tBodies[0].rows;
	var aRowsForSort=[];
	var oFragment=document.createDocumentFragment();
	var i=0;
	
	for(i=0;i<aRows.length;i++)
	{
		aRowsForSort.push(aRows[i]);
	}
	
	aRowsForSort.sort(fncmp);
	
	for(i=0;i<aRowsForSort.length;i++)
	{
		oFragment.appendChild(aRowsForSort[i]);
	}
	
	oTable.tBodies[0].appendChild(oFragment);
	interlaceColor();
}

function sortByPrice()
{
	var oTable=document.getElementsByTagName('table')[0];
	var oBtnPrice=oTable.tHead.getElementsByTagName('a')[0];
	var oBtnArea=oTable.tHead.getElementsByTagName('a')[1];
	var result=1;
	
	switch(oBtnPrice.order)
	{
		case 'none':
		case 'asc':
			oBtnPrice.className='btn_active';
			oBtnPrice.order='desc';
			result=-1;
			break;
		case 'desc':
			oBtnPrice.className='btn_down';
			oBtnPrice.order='asc';
			result=-1;
			break;
	}
	oBtnArea.order='none';
	oBtnArea.className='btn';
	
	sortTable
	{
		function (vRow1, vRow2)
		{
			var sPrice1=vRow1.cells[2].getElementsByTagName('span')[0].innerHTML;
			var sPrice2=vRow2.cells[2].getElementsByTagName('span')[0].innerHTML;
			
			var fPrice1=parseFloat(sPrice1.substring(1));
			var fPrice2=parseFloat(sPrice2.substring(1));
			
			if(fPrice1>fPrice2)
			{
				return result;
			}
			else if(fPrice1<fPrice2)
			{
				return -result;
			}
			else
			{
				return 0;
			}
		}
	};
}

function sortByArea()
{
	var oTable=document.getElementsByTagName('table')[0];
	var oBtnPrice=oTable.tHead.getElementsByTagName('a')[0];
	var oBtnArea=oTable.tHead.getElementsByTagName('a')[1];
	var result=1;
	
	switch(oBtnArea.order)
	{
		case 'none':
		case 'asc':
			oBtnArea.className='btn_active';
			oBtnArea.color='desc';
			result=1;
			break;
		case 'desc':
			oBtnArea.className='btn_down';
			oBtnArea.order='asc';
			result=-1;
			break;
	}
	
	oBtnPrice.order='none';
	oBtnPrice.className='btn';
	
	sortTable
	{
		function(vRow1,vRow2)
		{
			var sArea1=vRow1.cells[3].innerHTML;
			var sArea2=vRow2.cells[3].innerHTML;
			
			return result*sArea1.localeCompare(sArea2);
		}
	};
}