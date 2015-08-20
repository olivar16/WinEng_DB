//Main entrypoint of dashboard project

//Empty array that stores OSes that were seen yesterday
var RecentOSarray = [];
var RecentIEarray = [];
var RecentReleasearray = [];

//Maps that store Key:TypeName and Value:Count
var ReleaseMap = {};
var OSMap = {};
var IEMap = {};

//Empty arrays that store respective Data Objects
var Releasearray=[];
var OSarray = [];
var IEarray = [];

//Stores data for each table row
var OSdata = [];
var IEdata = [];
var ReleaseData= [];

//Stores data for each graph
var OSGraphData = [];
var IEGraphData = [];
var ReleaseGraphData = [];

//determine the columns for each table column
var OSfieldSet = ["date"];
var IEfieldSet = ["date"];
var ReleasefieldSet = ["date"];

//Store JSON response into global variable
var respondObject;



//Get today's date
 var today = new Date();
     
 //Set to yesterday
 today.setDate(today.getDate()-1);
     
 //Get yesterday's date in the ideal format
 yesterday = formatDate(today.getFullYear(), today.getMonth()+1, today.getDate());

//When libraries are loaded, show loading screen
Ext.onReady(function(){
     Ext.MessageBox.wait('Acquiring data');
});



//functionName: populateFieldSet
//@Params
// fieldSetArray - Array
// itemName - string
//@Description: Checks to see if given itemName is in the array. If not, push in.
function populateFieldSet(fieldSetArray, itemName){

      if (fieldSetArray.indexOf(itemName) < 0){
            
            fieldSetArray.push(itemName);
      }
      
}
     
      
      //functionName:readObjects
     //@Params: 
     //records - array of Objects
     //Map - Object that contains key:name value:count
     //@Description: Adds/increments objects found in records
       function readObjects(records,Map){
            
            for(var i=0;i<records.length;i++){
                   
                   var key = records[i].name;
                   
                   if(Map[key]===undefined){
                           
                           //initiate new key in Map with value 1
                           Map[key]=1;
                   }
                   else{
                           Map[key]++;      
                   } 
            }   
      }
      
   
    
      //functionName:itemObj
     //@Params: 
     //name - type:string
     //lastseen - type:string
     //date: string
     //@Description: Object that holds name, lastseen, and date
      function itemObj(name, lastseen, date){
              this.name=name;
              this.lastseen=lastseen;
              this.date = date;
      }
    
      
      //functionName:graphRow
     //@Params: 
     //date - type:string
     //@Description: Base for a graph row. Initially contains date and more OS names are added.
      function graphRow(date){
            this.date = date;      
      }
      

      //functionName:formatDate
     //@Params: 
     //year - type:string
     //month - type:string
     //day - type:string
     //@Description: Turn the date into the same format as the dates in the Data Service
    function formatDate(year, month, day){
          
          if(month <= 9){   
             month = '0'+month;}

          if(day <= 9){    
            day = '0'+day;}
       
             var formattedDate = year+"-"+month+"-"+day;
      
             return formattedDate;   
          
    }
    
  
 //functionName:initializeGraphRow
//@Params: 
//fulldate - type:string
//dataType - type: string
//graphData - type: Array of graphRow objects
//Description: Creates a new row and pushes it into graphData array
  function initializeGraphRow (fulldate, dataType, count, graphData){
        var row = new graphRow(fulldate);
        row[dataType] = count;
        graphData.push(row);
  }
  
     
      
 //functionName:dateSortFunct
//@Params: 
//a - Date Object
//b - Date Object
//Description: Checks if dates are before or after each other
function dateSortFunct(a, b){
      
      //if a.date is before b.date, put a at a lower index than b
      if (a.date < b.date){
            
            return -1;
            
      }
      if (a.date > b.date){
            
            return 1;
            
      }
      return 0;
      
}



function queryJSON(dataType){
     
  
      if(dataType==="OS"){
            
            $.getJSON("http://heisenburg.florence.ds.adp.com/dcjjsonquery.php?view_name=pcos_by_day_v",
                  function(data){
                        console.log("OS Data acquired!");
                        for(var key in data){
                             if(data[key][0].last_seen === yesterday){
                                   RecentOSarray.push({
                                         name: data[key][0].pc_os,
                                         count: parseInt(data[key][0].count)   
                                   }   
                                   );
                                   
                             }
                    var temp = new dataObject(data[key][0].pc_os,parseInt(data[key][0].count),data[key][0].last_seen);
                    populateFieldSet(OSfieldSet, temp.name);
                    OSdata.push(temp);
                    
                              
                        }
                       
                       groupData(OSdata, OSGraphData);
                       OSGraphData.sort(dateSortFunct);
                  }
                  
                  );
            
            
      }
      else if (dataType === "IE"){

               $.getJSON("http://heisenburg.florence.ds.adp.com/dcjjsonquery.php?view_name=pcie_by_day_v",
                  function(data){
                        console.log("IE Data acquired!");
                        for(var key in data){
                            
                             if(data[key][0].last_seen === yesterday){
                                   RecentIEarray.push({
                                         name: data[key][0].ie,
                                         count: parseInt(data[key][0].count)   
                                   }   
                                   );
                                   
                             }
                            
                    var temp = new dataObject(data[key][0].ie,parseInt(data[key][0].count),data[key][0].last_seen);
                    populateFieldSet(IEfieldSet, temp.name);
                    IEdata.push(temp);
                    
                              
                        }
                       
                       groupData(IEdata, IEGraphData);
                       IEGraphData.sort(dateSortFunct);
                  }
                  
                  );
            
            
      }
      else if (dataType === "Release"){
            
              $.getJSON("http://heisenburg.florence.ds.adp.com/dcjjsonquery.php?view_name=os_by_day_v",
                  function(data){
                        console.log("Release Data acquired!");
                        for(var key in data){
                             if(data[key][0].last_seen === yesterday){
                                   RecentReleasearray.push({
                                         name: data[key][0].os,
                                         count: parseInt(data[key][0].count)   
                                   }   
                                   );
                                   
                             }
                    var temp = new dataObject(data[key][0].os,parseInt(data[key][0].count),data[key][0].last_seen);
                    populateFieldSet(ReleasefieldSet, temp.name);
                    ReleaseData.push(temp);
                    
                        }
                       
                       groupData(ReleaseData, ReleaseGraphData);
                       ReleaseGraphData.sort(dateSortFunct);
                       drawData();
                  }
                  
                  );
      }
      
}


 //functionName:dataObject
//@Params: 
//name - string
//count - string
//last_seen - string
//Description: Checks if dates are before or after each other
function dataObject(name,count,last_seen){
      this.name = name;
      this.count = count;
      this.last_seen = last_seen;
}

function groupData(itemArray, itemGraphData){
      
    
      
      for(var i = 0; i<itemArray.length; i++){
            
            var currItem = itemArray[i];
             //Initialize itemGraphData array if it's empty
                  if (itemGraphData.length === 0){
                         initializeGraphRow(currItem.last_seen, currItem.name, currItem.count, itemGraphData); 
                         continue;
                  }
                  
                  //iterate through itemGraphData and add counts for respective dates
                      for(var j=0;j<itemGraphData.length;j++){
  
                      if (itemGraphData[j].date === currItem.last_seen){
                    
                    itemGraphData[j][currItem.name] = currItem.count;
                       break;     
                      }  
                      else if (itemGraphData[j+1] === undefined){
                        initializeGraphRow(currItem.last_seen,currItem.name, currItem.count, itemGraphData);
                        break;
                        }
                      
                  }
            
      }
       
       
}

 queryJSON("OS");
queryJSON("IE");
queryJSON("Release");

