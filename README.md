# WinEng_DB
Windows Engineering Dashboard <br>
This is the source code for building a Dashboard during my Summer Intership working at CDK Global in the Windows Engineering team. <br>
Technologies used include: <br>
1. HTML <br>
2. Javascript <br>
3. JQuery <br>
4. Sencha Ext JS <br>
5. PostGreSQL <br>

Functionality: <br>
Upon execution of the program, JQuery would query a growing 597,000 PostgreSQL database that contain customer data regarding Operating System, Internet Explorer, and Release Version usage on their last login. Upon acquisition of the data in JSON format, Sencha Ext JS would be utilized to output the data visualization on the web page. <br>

Front-end UI:
The left side of the web page uses tables to visualize the counts of client version usage on the previous day. <br>
The right side of the web page uses overlaying line graphs to visualize the daily usage for each client beginning at the conception of their machine. <br>

NOTE: The Dashboard's purpose is to be accessed only in the CDK Global local network. All live, updated data is hosted on CDK servers and cannot be accessed outside of it. The repository includes a "json" directory that contains sample data taken from the API endpoint in JSON format. 
