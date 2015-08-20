  //Map for converting OS names
         var conversionMap = {
        "Microsoft Windows NT 5.1.2600 Service Pack 3":"Windows XP 5.1, SP 3",
        "Microsoft Windows NT 6.2.9200.0":"Windows 8",
        "Microsoft Windows NT 6.0.6002 Service Pack 2": "Windows Vista 6.0, SP 2",
        "Microsoft Windows NT 5.1.2600 Service Pack 2": " Windows XP 5.1, SP 2",
        "Microsoft Windows NT 6.0.6001 Service Pack 1": "Windows Vista 6.0, SP 1",
        "Microsoft Windows NT 5.2.3790 Service Pack 2": "Windows XP 5.2, SP 2",
       "Microsoft Windows NT 5.1.2600 Service Pack 3, v.3264" : "Windows XP 5.1, SP 3",
        "":"empty_field"
    };

//function name: drawData
//@params: none
//@description: Draws the data into the window
function drawData(){
 Ext.MessageBox.hide();
    //Define data models for tables
    Ext.define('OS', {
        extend: 'Ext.data.Model',
        fields: [{name:'name', type:'string', persist: false,
                convert: function(v, record){
                   return conversionMap[v];
                }
                       
            }, {name:'count', type: 'int', persist: false,
                convert: function(v, record){
                    var data = record.getData();
                    data.count 
                    
                }
            }]

    }
        );

    Ext.define('Release', {
        extend: 'Ext.data.Model',
        fields: ['name', 'count']
    });
    
    Ext.define('IE', {
        extend: 'Ext.data.Model',
        fields: ['name', 'count']

    }
    );
        
    
    Ext.define('IE', {
        extend: 'Ext.data.Model',
        fields: ['Version Name', 'Count']

    }
    );


    //Define data models for graphs
    Ext.define('OSGraph', {
        extend: 'Ext.data.Model',
        fields: OSfieldSet
        //OSfieldSet
    }
        );

    Ext.define('ReleaseGraph', {
        extend: 'Ext.data.Model',
        fields: ReleasefieldSet
    }
    );
    
    Ext.define('IEGraph', {
        extend: 'Ext.data.Model',
        fields: IEfieldSet

    }
    );

    //Define Data stores for tables
    var Releasestore = new Ext.data.Store({
        model: 'Release',
        data: RecentReleasearray,
        sorters:[{
            property: "count",
            direction: 'DESC'
        }]
    });

    var IEstore = new Ext.data.Store({
        model:'IE',
        data: RecentIEarray,
        sorters:[{
            property: "count",
            direction: 'DESC'
        }]
    
    });

    var OSstore = new Ext.data.Store({
        model: 'OS',
        data: RecentOSarray,
        sorters:[{
            property: "count",
            direction: 'DESC'
        }]
   
    });

//Define Data Stores for graphs
    var OSGraphStore = new Ext.data.Store({
        model: 'OSGraph',
        data: OSGraphData

    }
    );

    var IEGraphStore = new Ext.data.Store({
        model: 'IEGraph',
        data: IEGraphData

    }
    );

    var ReleaseGraphStore = new Ext.data.Store({
        model: 'ReleaseGraph',
        data: ReleaseGraphData
    });

    //Create tables
    var OStable = new Ext.grid.Panel({
        padding: 10,
   flex: 1,
        store: OSstore,
        title: 'OS usages on ' + yesterday,
        columns: [
            {
                text: 'Name',
                flex: 150,
                align: 'center',
                sortable: false,
                hideable: false,
                dataIndex: 'name'
            },
            {
                text: 'Count',
                flex: 130,
                align: 'center',
                dataIndex: 'count'
            }
        ]

    });

    var IEtable = new Ext.grid.Panel({
       padding: 10,
        store: IEstore,     
      flex: 1,
        title: 'IE usages on '+yesterday,
        columns: [
            {
                text: 'IE Version',
                flex:150,
                align: 'center',
                sortable: false,
                hideable: false,
                dataIndex: 'name'
            },
            {
                text: 'Count',
                flex:130,
                align: 'center',
                dataIndex: 'count'
            }
        ]

    });
    var Releasetable = new Ext.grid.Panel({
      padding: 10,
        store: Releasestore,
        flex:1,
        title: 'Release usages on ' + yesterday,
        columns: [
            {
                text: 'Release Name',
                flex: 150,
                align: 'center',
                sortable: false,
                hideable: false,
                dataIndex: 'name'
            },
            {
                text: 'Count',
                width: 130,
                align: 'center',
                dataIndex: 'count'
            }
        ]

    });

    var IEChart = new Ext.chart.CartesianChart({
        title: 'IE Version Usage Over Time',
        flex: 1,
        padding: 10,
        store: IEGraphStore,
        interactions: [{type:'panzoom', zoomOnPanGesture: true}],
        legend: {
            docked: 'right'
        },
        
        //define x and y axis.
        axes: [{
            type: 'numeric',
            position: 'left',
            maximum:3000
        }, {
            type: 'category',
            visibleRange: [0, 1],
            position: 'bottom'
        }],

        //define the actual series
        series: createSeries("IE")

    });

    var OSChart = new Ext.chart.CartesianChart({
       
        title: 'OS Version Usage Over Time',
     
        padding: 10,
     width:'50%',
        flex: 1,
        store: OSGraphStore,
        interactions: [{type:'panzoom', zoomOnPanGesture: true}
                        ],  
        legend: {
            docked: 'right'
        },

        //define x and y axis.
        axes: [{
            type: 'numeric',
            position: 'left',
            maximum:3000
        }, {
            type: 'category',
            visibleRange: [0, 1],
            position: 'bottom'
        }],

        //define the actual series
        series: createSeries("OS")

    });


    var ReleaseChart = new Ext.chart.CartesianChart({
        title: 'Release Version Usage Over Time',
        padding: 10,
       flex: 1, 
        store: ReleaseGraphStore,
        interactions: [{type:'panzoom', zoomOnPanGesture: true}],
        legend: {
            docked: 'right'
        },

        //define x and y axis.
        axes: [{
            type: 'numeric',
            position: 'left',
            maximum:3000
        }, {
            type: 'category',
            visibleRange: [0, 1],
            position: 'bottom'
        }],
        
        //define the actual series
        series: createSeries("Release")
    });


//Panel that holds graphs and tables
var panel = Ext.create('Ext.panel.Panel',{
    
    title:"Windows Engineering Dashboard",
    autoScroll: true,
    forceFit: true,
    layout:{
        type: 'vbox',
        align:'stretch'},
        items:[
        {xtype:'panel', flex: 1,layout: {type:'hbox', align: 'stretch'}, items:[OStable, OSChart]  },
        {xtype:'panel',  flex:1, layout: {type:'hbox', align: 'stretch'}, items:[IEtable, IEChart]},
        {xtype:'panel',  flex:1, layout: {type:'hbox', align: 'stretch'}, items:[Releasetable, ReleaseChart]}
        
        ]
    }
    
);


    Ext.create('Ext.container.Viewport', {
        renderTo: Ext.getBody(),
        title: 'Windows Engineering Dashboard',
        layout: 'fit',
        items: [panel]
    });
   
}


//functionName: createSeries
//@Params: Series - String
//@Description: Provides the series to be represented in the Graphs
function createSeries(Series){
    var series = [];
 
    if(Series ==="OS"){
      
    for (var i = 1; i<OSfieldSet.length; i++){
        var currentField = OSfieldSet[i];
series.push({
        type: 'line',
        xField: OSfieldSet[0],
        yField: OSfieldSet[i],
        title: conversionMap[OSfieldSet[i]],
         markerCfg: {
                type: 'cross',
                size: 4,
                radius: 4,
                'stroke-width': 0
            },
            tooltip:{
              trackMouse:true,
                renderer: function(storeItem, item){
                   var tooltipContent="";
                  for(var j=1; j<OSfieldSet.length; j++){
                      tooltipContent+= OSfieldSet[j] + "-" + storeItem.get(OSfieldSet[j]) + "<br>";
                      
                  }
                  this.setTitle(storeItem.get('date'));
                   this.setHtml(tooltipContent);
                    }
            },
            
        style: {
            smooth: false,
           
            fillOpacity: 0.6,
            miterLimit: 3,
            lineCap: 'miter',
            lineWidth: 2
        }
    });
}
    }
    
    if (Series === "IE"){
        for (var i = 1; i<IEfieldSet.length; i++){
            series.push({
            type: 'line',
            fill:false,
            showMarkers: true,
            showInLegend: true,
            xField: IEfieldSet[0],
            yField: IEfieldSet[i],
            title: "IE"+IEfieldSet[i],
             tooltip:{
              trackMouse:true,
                renderer: function(storeItem, item){
                   var tooltipContent="";
                  for(var j=1; j<IEfieldSet.length; j++){
                      tooltipContent+= "IE "+ IEfieldSet[j] + "-" + storeItem.get(IEfieldSet[j]) + "<br>";
                      
                  }
                  this.setTitle(storeItem.get('date'));
                   this.setHtml(tooltipContent);
                    }
            },
                style: {
                smooth: false,
               
                fillOpacity: 0.6,
                miterLimit: 3,
                lineCap: 'miter',
                lineWidth: 2
                }
                
            });
        }
        
        
    }

    if (Series === "Release") {
    
        for (var i = 1; i < ReleasefieldSet.length; i++) {
            series.push({
                type: 'line',
                xField: ReleasefieldSet[0],
                yField: ReleasefieldSet[i],
                title: ReleasefieldSet[i],
                 tooltip:{
              trackMouse:true,
                renderer: function(storeItem, item){
                   var tooltipContent="";
                  for(var j=1; j<ReleasefieldSet.length; j++){
                      tooltipContent+= ReleasefieldSet[j] + "-" + storeItem.get(ReleasefieldSet[j]) + "<br>";
                  }
                  this.setTitle(storeItem.get('date'));
                   this.setHtml(tooltipContent);
                    }
            },
                style: {
                    smooth: false,
                    fillOpacity: 0.6,
                    miterLimit: 3,
                    lineCap: 'miter',
                    lineWidth: 2
                },
                markerConfig:{
                    type:'circle',
                    radius: 100
                }
                
            });
        }


    }
   
return series;

}





          
          
      
      
      
