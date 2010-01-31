function KeyNavigation() {}
KeyNavigation.Up = 0;
KeyNavigation.Right = 1;
KeyNavigation.Down = 2;
KeyNavigation.Left = 3;

KeyNavigation.BeSelected=false;
KeyNavigation.PreviousCursorPosition = null;

KeyNavigation.CreateTableMapping = function(tbl)
{
    if ( !tbl.rowCount )
    {
        var tableMap = [];
        var colCount = 0;
        for ( var i=0 ; i < tbl.rows(0).cells.length ; ++i )
        {
            colCount += tbl.rows(0).cells(i).colSpan;
        }
        tbl.columnCount = colCount;
        tbl.rowCount = tbl.rows.length;
        for ( var i=0 ; i < tbl.rows.length ; ++i )
        {
            var ary = new Array(colCount);
            for ( var j=0 ; j < colCount ; ++j )
            {
                ary[j] = true;
            }
            tableMap.push(ary);
        }
        for ( var i=0 ; i < tbl.rowCount ; ++i )
        {
            var cellIndex = 0;
            for ( var j=0 ; j < colCount ; j += currentCell.colSpan )
            {
                if ( tableMap[i][j] )
                {
                    var currentCell = tbl.rows(i).cells(cellIndex++);
                    for ( var m=i ; m < i+currentCell.rowSpan ; ++m )
                    {
                        for ( var n=j ; n < j+currentCell.colSpan ; ++n )
                        {
                            tableMap[m][n] = false;
                        }
                    }
                    tableMap[i][j] = currentCell;
                 }
            }
        }
        tbl.tableMap = tableMap;
    }
};

KeyNavigation.GetSiblingCell = function(tbl, cell, dir)
{
    KeyNavigation.CreateTableMapping(tbl);
    var colIndex = -1;
    var row = cell.parentElement;
    var rowIndex = row.rowIndex; 
    for ( var i=0 ; i < tbl.columnCount ; ++i )
    {
         if ( tbl.tableMap[rowIndex][i] == cell )
         {
             colIndex = i;
             break;
         } 
    }
    if ( colIndex == -1 )
    {
         throw "can't find the cell in table.";
    }
    var siblingCell = null; 
    var incV, incH;
    incV = 1, incH = 1;
    switch(dir)
    {
        case KeyNavigation.Up :
        {
            incV = -1;
        }
        case KeyNavigation.Down :
        {
            for ( var i=1 ; i < tbl.rowCount ; ++i )
            {
                 var tmpRowIdnex = (tbl.rowCount+rowIndex+i*incV)%tbl.rowCount;
                 siblingCell = tbl.tableMap[tmpRowIdnex][colIndex];
                 if ( KeyNavigation.IsAvailableCell(siblingCell) )
                 {
                     break;   
                 }
            }
            break;
        }
        case KeyNavigation.Left :
        {
            incH = -1;
        }
        case KeyNavigation.Right :
        {
            for ( var i=1 ; i < tbl.columnCount ; ++i )
            {
                 var tmpColumnIdnex = (tbl.columnCount+colIndex+i*incH)%tbl.columnCount;
                 siblingCell = tbl.tableMap[rowIndex][tmpColumnIdnex];
                 if ( KeyNavigation.IsAvailableCell(siblingCell) )
                 {
                     break;   
                 }
            }
            break;
        }
    }
    return siblingCell;
};

KeyNavigation.IsAvailableCell = function(cell)
{
    return cell && (cell.all.tags('INPUT').length + cell.all.tags('TEXTAREA').length > 0);
};

KeyNavigation.DoKeyDown = function(elmt)
{

    var tbl = elmt;
    var input = event.srcElement;
    var keyCode = event.keyCode;
    var iPsn = KeyNavigation.GetCaretPosition(input);
    var cell = input.parentElement;
    var siblingCell = null;
    var directionV = KeyNavigation.Down;
    switch(keyCode)
    {

        case 8 : /* Backspace */
        {
            KeyNavigation.DeleteSelection(input);
            break;
        }
        case 13 : /* Enter */
        {
            var isTab = false;
            if ( input.tagName == 'TEXTAREA' )
            {
                if ( iPsn == KeyNavigation.PreviousCursorPosition ||
                    ( ( iPsn == 0 && directionV == KeyNavigation.Up ) ||
                    ( iPsn == input.value.length && directionV == KeyNavigation.Down ) ) )
                {
                    isTab = true;
                }
                else
                {
                    KeyNavigation.PreviousCursorPosition = iPsn;
                }
            }
            if ( input.tagName == 'INPUT' || isTab )
            {
                siblingCell = KeyNavigation.GetSiblingCell(tbl, cell, directionV);
            }
            break;
        }
        case 46 : /* Delete */
        {
            KeyNavigation.DeleteSelection(input);
            break;
        }
        case 27 : /* Escape */
        {
            KeyNavigation.GetCaretPosition(input);
            break;
        }
        case 38 : /* Move Up */
        {
            directionV = KeyNavigation.Up;
        }
        case 40 : /* Move Down */
        {
            var isTab = false;
            if ( input.tagName == 'TEXTAREA' )
            {
                if ( iPsn == KeyNavigation.PreviousCursorPosition || 
                    ( ( iPsn == 0 && directionV == KeyNavigation.Up ) || 
                    ( iPsn == input.value.length && directionV == KeyNavigation.Down ) ) )
                {
                    isTab = true;
                }
                else
                {
                    KeyNavigation.PreviousCursorPosition = iPsn;
                }
            }
            if ( input.tagName == 'INPUT' || isTab )
            {
                siblingCell = KeyNavigation.GetSiblingCell(tbl, cell, directionV);
            }
            break;
        }

        case 37 : /* Move Left */
        {
            if ( iPsn == 0 )
            { 
                 siblingCell = KeyNavigation.GetSiblingCell(tbl, cell, KeyNavigation.Left);
            }
            break;
        }
        case 39 : /* Move Right */
        {
            if ( iPsn == input.value.length )
            { 
                 siblingCell = KeyNavigation.GetSiblingCell(tbl, cell, KeyNavigation.Right);
            } 
            break;
        }
        default : /* Other Key, description: first delete the selection when to input something*/
        {
            if (KeyNavigation.BeSelected)
              {
                 input.value="";
              }
        }
    }
    if ( siblingCell && siblingCell != cell )
    {
        var siblingInput = null;
        var inputs = siblingCell.all.tags('INPUT');
        if ( inputs.length > 0 )
        {
            siblingInput = inputs[0];
            siblingInput.focus();
        }
        else
        {
            inputs = siblingCell.all.tags('TEXTAREA');
            if ( inputs.length > 0 )
            {  
                siblingInput = inputs[0];
                siblingInput.focus();
            }
        }
    }
};

function KeyNavigation.GetCaretPosition(txb)
{ 
    var slct = document.selection; 
    var rng = slct.createRange();
    if (rng.text!="")
      {
        KeyNavigation.BeSelected=true;
      }
    else
      {
        KeyNavigation.BeSelected=false;
      }
    txb.select();
    rng.setEndPoint("StartToStart", slct.createRange()); 
    var psn = rng.text.length; 
    rng.collapse(false); 
    rng.select();
    return psn; 
};

function KeyNavigation.DeleteSelection(txb)
{
   if (KeyNavigation.BeSelected)
     {
       txb.value="";
     }
};