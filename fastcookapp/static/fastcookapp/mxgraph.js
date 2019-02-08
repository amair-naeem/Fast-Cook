//get the cookie
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

//set the cookie
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}


function main()
        {
            
            // Defines an icon for creating new connections in the connection handler.
            // This will automatically disable the highlighting of the source vertex.
            //mxConnectionHandler.prototype.connectImage = new mxImage("/images/connector.gif", 16, 16);
            //var mxPopupMenuShowMenu = mxPopupMenu.prototype.showMenu;
            //mxDefaultPopupMenu.prototype.addItems = function(editor){editor = editor};

            //mxPopupMenu.prototype.addItem = function(</td><td class=PParameter nowrap>title,</td></tr><tr><td></td><td class=PParameter nowrap>image,</td></tr><tr><td></td><td class=PParameter nowrap>funct,</td></tr><tr><td></td><td class=PParameter nowrap>parent,</td></tr><tr><td></td><td class=PParameter nowrap>iconCls,</td></tr><tr><td></td><td class=PParameter nowrap>enabled</td><td class=PAfterParameters nowrap>)
            //console.log(mxPopupMenu.prototype.itemCount)

            $('#share').on('click',function(event){
                var encoder = new mxCodec();
                var node = encoder.encode(graph.getModel());
                xml = mxUtils.getXml(node)
                var url = "/home/";
                post(url, {sharedXMLData:xml});

                //alert("hey")
            });

            // Checks if browser is supported
            if (!mxClient.isBrowserSupported())
            {
                // Displays an error message if the browser is
                // not supported.
                mxUtils.error('Browser is not supported!', 200, false);
            }
            else
            {
                //Creates the div for the toolbar
                var tbContainer = document.getElementById('toolbar');
                document.body.appendChild(tbContainer);

                var content = document.getElementById('content')
                var generalContent = document.getElementById('generalContent')
            
                // Creates new toolbar without event processing
                var toolbar = new mxToolbar(content);
                toolbar.enabled = false

                var generalToolbar = new mxToolbar(generalContent)
                generalToolbar.enabled = false

                var coll = document.getElementsByClassName("collapsible");

                var i;

                for (i = 0; i < coll.length; i++) {
                  coll[i].addEventListener("click", function() {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.display === "block") {
                      content.style.display = "none";
                    } else {
                      content.style.display = "block";
                    }
                  });
                }
                
                // Creates the div for the graph
                /*container = document.createElement('div');
                container.style.position = 'absolute';
                container.style.overflow = 'hidden';
                container.style.left = '24px';
                container.style.top = '26px';
                container.style.right = '0px';
                container.style.bottom = '0px';
                container.style.background = 'url("/images/grid.gif")';*/
                
                var diagramContainerClass = document.getElementsByClassName("diagramContainer")
                var diagramContainer = diagramContainerClass[0]


                container = document.getElementById('container');
                document.body.appendChild(diagramContainer);
                diagramContainer.appendChild(container)

                menuBar = document.getElementById('menuBar')
                document.body.appendChild(menuBar)


                if (!$("#currentTitle").val())
                {
                    $("#currentTitle").val("Untitled graph")
                }

                
                // Workaround for Internet Explorer ignoring certain styles
                if (mxClient.IS_QUIRKS)
                {
                    document.body.style.overflow = 'hidden';
                    new mxDivResizer(tbContainer);
                    new mxDivResizer(container);
                }
    
                // Creates the model and the graph inside the container
                // using the fastest rendering available on the browser
                var model = new mxGraphModel();
                var editor = new mxEditor();
                var graph = new mxGraph(container, model);
                graph.dropEnabled = true;

                //graph.setEnabled(false);

                //connectors around the object
                graph.getAllConnectionConstraints = function(terminal)
                {
                    if (terminal != null && this.model.isVertex(terminal.cell))
                    {
                        return [new mxConnectionConstraint(new mxPoint(0, 0), true),
                            new mxConnectionConstraint(new mxPoint(0.5, 0), true),
                            new mxConnectionConstraint(new mxPoint(1, 0), true),
                            new mxConnectionConstraint(new mxPoint(0, 0.5), true),
                            new mxConnectionConstraint(new mxPoint(1, 0.5), true),
                            new mxConnectionConstraint(new mxPoint(0, 1), true),
                            new mxConnectionConstraint(new mxPoint(0.5, 1), true),
                            new mxConnectionConstraint(new mxPoint(1, 1), true)];
                    }

                    return null;
                };
                

                //save xml upon click
                var model = new mxGraphModel();

                $(document).ready(function(){
                    $('#loadAllTitles').on('click','.openGraph' ,function(event){
                        //alert("test")
                        //var openUrl = $(this).attr('href');
                        $('#openModal').modal('hide');
                        var openUrl = $(this).attr('id');
                        var csrftoken = getCookie('csrftoken');



                        $.ajax({
                    
                        type: "GET",
                        url: openUrl,
                        dataType: 'text',
                        headers:{
                            "X-CSRFToken": csrftoken
                        },
                        success: function(data){
                            var json = JSON.parse(data)

                            xmlGraph = json[0]['fields']['XMLGraph']
                            title = json[0]['fields']['title']

                            var xmlDoc = mxUtils.parseXml(xmlGraph);
                            var node = xmlDoc.documentElement;
                            var dec = new mxCodec(node.ownerDocument);
                            dec.decode(node, graph.getModel());

                            //$("#test").append(title)
                            $("#currentTitle").val(title)

                            var id = parseInt(openUrl.match(/\d+/),10)
                            $("#idOfGraph").val(id)
                            
                        }
                    });



      
                    })
                });
                    

                $(document).ready(function(){
                    $('#saveNewTitle').on('click',function(event){
                        var csrftoken = getCookie('csrftoken');
                        title = $('#newTitle').val()
                        var encoder = new mxCodec();
                        var node = encoder.encode(graph.getModel());
                        xml = mxUtils.getXml(node)
                        currentTitle = $('#currentTitle').val()
                        graphId = $("#idOfGraph").val()
                        //console.log(xml)
                        $.ajax({
                            type: "POST",
                            url: "/saveNewTitle/",
                            dataType: 'text',
                            data: {
                            'newTitle': title,
                            'currentTitle': currentTitle,
                            'xml': xml, 
                            'graphId': graphId
                            },
                            headers:{
                                "X-CSRFToken": csrftoken
                                },
                            success: function(data){
                                
                                //console.log($(".openGraph").val())

                                parseData = JSON.parse(data)

                                if(parseData["overwrite"]){

                                    alert(title + " already exists")
                                    
                                }

                                else{

                                    $('#currentTitle').val(title)
                                    $('#saveTitleModal').modal('hide');


                                    $('.currentGraph').each(function(i, obj){
                                        
                                            
                                        $('.openGraph').each(function(i,obj){
                                            if($(this).val() == currentTitle){
                                                $(this).val(title);
                                            }

                                        })

                                        
                                    })

                                }

                            },

                        });
      
                    })
                });

                //Delete
                $('#loadAllTitles').on('click','.deleteGraph' ,function(event){
                    var csrftoken = getCookie('csrftoken');
                    event.preventDefault();
                    var id = $(this).attr('id');
                    var $tr = $(this).closest('tr');
                    $.ajax({
                        type: "DELETE",
                        url: id, 
                        headers:{
                                "X-CSRFToken": csrftoken
                                },
                        success: $($(this)).closest("tr").remove()

                    })
                    
                }); 


               
                //open xml buttons
                $(document).ready(function(){
                    $('#openXML').on('click',function(event){

                        var csrftoken = getCookie('csrftoken');

                        $.ajax({
                            type: "GET",
                            url: "/loadTitles/",
                            dataType: 'text',
                            headers:{
                                "X-CSRFToken": csrftoken
                                },
                            success: function(data){

                                window.confirm = function() { return false; };

                                var json = JSON.parse(data)
                                var length = Object.keys(json).length


                                /*for (var i = length - 1; i >= 0; i--) {
                                    /*var pk = "/openGraph/" + json[i]['pk']
                                    var title = json[i]['fields']['title']                           
                                    myButton="<input type=\"button\" class = \"openGraph\" value=\""+title+"\" id="+pk+"/\>";

                                }*/


                                var pkTitle = "/openGraph/" + json[length-1]['pk']


                                var title = json[length-1]['fields']['title']

                                var pkDelete = "/deleteGraph/" + json[length-1]['pk']

                                var titleButton="<input type=\"button\" class = \"openGraph\" value=\""+title+"\" id="+pkTitle+"/\>";
                                var deleteButton= "<input type=\"button\" class = \"deleteGraph\" value=\"Delete\" id="+pkDelete+"/\>";

                                
                                 if ($("#loadAllTitles").find('#' + $.escapeSelector(pkTitle + '/')).length == 0)
                                    $("#loadAllTitles").append("<table> <tr> <td>" + titleButton + "</td> <td>" + deleteButton + "</td> </tr> </table>")

                            }
                        });
      
                    })
                });


                $('#share').on('click',function(event){
                    var encoder = new mxCodec();
                    var node = encoder.encode(graph.getModel());
                    //var xml = mxUtils.getPrettyXml(node); 
                    xml = mxUtils.getXml(node);

      
                    })


                $(document).ready(function(){
                    $('.openFile').on('click',function(event){

                        var csrftoken = getCookie('csrftoken');
                        var encoder = new mxCodec();
                        var node = encoder.encode(graph.getModel());
                        //var xml = mxUtils.getPrettyXml(node); 
                        xml = "";
                        var csrftoken = getCookie('csrftoken');
                        var title = $('#openTitle').val()
                        $.ajax({
                            type: "POST",
                            url: "/saveTitle/",
                            data: {
                                'saveAsTitle': title,
                                'xml': xml
                            },
                            dataType: 'text',
                            headers:{
                                "X-CSRFToken": csrftoken
                            },
                            success: function(data){
                                    
                                    parseData = JSON.parse(data)
                                    if(parseData["overwrite"]){
                                        alert(title+ " is already in use")
                                        
                                    }
                                    else{
                                        $("#idOfGraph").val(parseData["id"])
                                        graph.removeCells(graph.getChildVertices(graph.getDefaultParent()))
                                        $("#currentTitle").val(title)
                                    }
                                },
                        });
      
                    })
                });


               
                //var button = mxUtils.button('Save', function()
                $('.dropdown-menu').on('click','#saveButton' ,function(event){
                
                    //var url = "{%url'login'%}"
                    //var url = "{% url 'myapp:productdetail' %}";
                    //location.href = '/saveData/'
                    var encoder = new mxCodec();
                    var node = encoder.encode(graph.getModel());
                    //var xml = mxUtils.getPrettyXml(node); 
                    var xml = mxUtils.getXml(node);
                    var csrftoken = getCookie('csrftoken');

                    $.ajax({
        
                        type: "POST",
                        url: "/overwrite/",
                        data: { 
                            "xml": xml,
                            "title": $('#currentTitle').val(),
                            "graphId": $("#idOfGraph").val()

                        },
                        dataType: 'text',
                        headers:{
                            "X-CSRFToken": csrftoken
                        },
                        success: function(data){
                            //alert("hi")
                            //console.log(graph)
                            //var xmlDoc = data[0]

                            //graph.getModel().beginUpdate();

                            var title = $('#currentTitle').val();

                            var overwrite = JSON.parse(data);


                            if(overwrite["overwrite"])
                            {

                                    if(confirm(title + " already exists. Are you sure you want to overwrite changes to this file?")){

                                        $.ajax({
                                        type: "POST",
                                        url: "/saveData/",
                                        data: { 
                                            "xml": xml,
                                            "title": $('#currentTitle').val()
                                            },
                                        headers:{
                                            "X-CSRFToken": csrftoken
                                        },
                                        success: function (data) {

                                            var xmlDoc = mxUtils.parseXml(xml);
                                            var node = xmlDoc.documentElement;
                                            var dec = new mxCodec(node.ownerDocument);
                                            dec.decode(node, graph.getModel());

                                            }

                                        })

                                    }
                            }

                            //console.log(xml);
                            var xmlDoc = mxUtils.parseXml(xml);
                            //var xmlDoc = mxUtils.load("/saveData/").getXml();
                            //console.log("xmlDoc " + xmlDoc)
                            var node = xmlDoc.documentElement;
                            //console.log("node " + node)
                            var dec = new mxCodec(node.ownerDocument);
                            //console.log("dec " + dec)
                            //console.log("graph model " + graph.getModel())
                            dec.decode(node, graph.getModel());

                            
                        }
                    });

                });

                $("#saveName").click(function (event) 
                {
                    var csrftoken = getCookie('csrftoken');
                    var encoder = new mxCodec();
                    var node = encoder.encode(graph.getModel());
                    //var xml = mxUtils.getPrettyXml(node); 
                    xml = mxUtils.getXml(node);
                    var csrftoken = getCookie('csrftoken');
                    var title = $('#saveAsTitle').val()
                    $.ajax({
                        type: "POST",
                        url: "/saveTitle/",
                        data: {
                            'saveAsTitle': title,
                            'xml': xml
                        },
                        dataType: 'text',
                        headers:{
                            "X-CSRFToken": csrftoken
                        },
                        success: function(data){
                            var parseData = JSON.parse(data)
                            if(parseData["overwrite"])
                            {
                                alert(title + " already exists")
                            }

                            else
                            {
                                $("#currentTitle").val(title)
                                $("#idOfGraph").val(parseData["id"])
                            }
                        }
                    });

                });

                //tbContainer.appendChild(button);
                //document.body.appendChild(button);
                //toolbar.addMode(button)

                //creates an undoManager object that allows users to be able to undo and redo

                var undoManager = new mxUndoManager();
				
				var listener = function(sender, evt)
				{
					undoManager.undoableEditHappened(evt.getProperty('edit'));
				};

				graph.getModel().addListener(mxEvent.UNDO, listener);
				
				graph.getView().addListener(mxEvent.UNDO, listener);


                graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
				{
					window.oncontextmenu = function(event) {
					    event.preventDefault();
					    //event.stopPropagation();
					    //return false;
					};


					menu.addItem('Undo', null, function()
				    {
						undoManager.undo();
				
				    });
					
					menu.addItem('Redo', null, function()
				    {
						undoManager.redo();
				    });


					menu.addSeparator();
										
					menu.addItem('Select vertices', null, function()
				    {
				    	graph.selectVertices();
				    });

					menu.addItem('Select all', null, function()
				    {
						graph.selectAll();
				    });
				
				};





                //remove vertex when delete key is pressed
                var keyHandler = new mxKeyHandler(graph);
				keyHandler.bindKey(46, function(evt)
				{
				  if (graph.isEnabled())
				  {
				    graph.removeCells();
				  }		

				});

				//remove vertex when backspace is pressed
				keyHandler.bindKey(8, function(evt)
				{
					if (graph.isEnabled())
					{
						graph.removeCells();
					}
				});
                
                // Matches DnD inside the graph
                mxDragSource.prototype.getDropTarget = function(graph, x, y)
                {
                    var cell = graph.getCellAt(x, y);
                    
                    if (!graph.isValidDropTarget(cell))
                    {
                        cell = null;
                    }
                    
                    return cell;
                };

                // Enables new connections in the graph
                graph.setConnectable(true);
                graph.setMultigraph(false);
                mxVertexHandler.prototype.rotationEnabled = true;


                // Disables floating connections (only use with no connect image)
                if (graph.connectionHandler.connectImage == null)
                {
                    graph.connectionHandler.isConnectableCell = function(cell)
                    {
                       return false;
                    };
                    mxEdgeHandler.prototype.isConnectableCell = function(cell)
                    {
                        return graph.connectionHandler.isConnectableCell(cell);
                    };
                }

                // Stops editing on enter or escape keypress
                var keyHandler = new mxKeyHandler(graph);
                var rubberband = new mxRubberband(graph);
                
                var addVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, toolbar, vertex, icon);
                };

                var style = new Object();

                style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                style[mxConstants.STYLE_IMAGE] = '/images/icons/flour.png';
                style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                

                graph.getStylesheet().putCellStyle('rounded2', style);

                
                addVertex("300g",'/images/icons/flour.png', 120, 160, 'rounded2');

                var style2 = new Object();;

                style2[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                style2[mxConstants.STYLE_IMAGE] = '/images/icons/whisk.png';
                style2[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                
                graph.getStylesheet().putCellStyle('rounded3', style2);
                
                addVertex(null,'/images/icons/whisk.png', 100, 40, 'rounded3');
                

                addVertex(null,'/images/rounded.gif', 100, 40, 'shape=rounded');
                addVertex(null,'/images/ellipse.gif', 40, 40, 'shape=ellipse');
                addVertex(null,'/images/rhombus.gif', 40, 40, 'shape=rhombus');
                addVertex(null,'/images/triangle.gif', 40, 40, 'shape=triangle');
                addVertex(null,'/images/cylinder.gif', 40, 40, 'shape=cylinder');
                addVertex(null,'/images/actor.gif', 30, 40, 'shape=actor');
                toolbar.addLine();

                var addGeneralVertex = function(icon,w,h,style, value, arrow)
                {
                    
                    if(arrow == true)
                    {
                        
                       
                        var edge2 = new mxCell(null, new mxGeometry(0, 0, w, h), 'curved=1;endArrow=classic;html=1;');
                        var sourceX = edge2.getGeometry();
                        console.log(sourceX)
                        //var sourceY = edge2.geometry.y;

                        edge2.geometry.setTerminalPoint(new mxPoint(50, 150), true);
                        edge2.geometry.setTerminalPoint(new mxPoint(150, 50), false);

                        edge2.geometry.relative = true;
                        edge2.edge = true;

                        graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [edge2]));
                        addToolbarItem(graph, generalToolbar, edge2, icon);


                    }

                    else
                    {
                        var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);

                        vertex.value = value
                        vertex.setVertex(true);

                        addToolbarItem(graph, generalToolbar, vertex, icon);

                    }

                }

                var style3 = new Object();

                style3[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                style3[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;

                graph.getStylesheet().putCellStyle('text', style3);

                var style4 = new Object();

                style4[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                style4[mxConstants.STYLE_IMAGE] = '/images/block_end.gif';

                style4[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;

                graph.getStylesheet().putCellStyle('connector', style4);


                addGeneralVertex('/images/rounded.gif', 100, 40, 'text', "Text", false);
                addGeneralVertex('/images/block_end.gif', 100, 40, 'connector', null, true);

                generalToolbar.addLine();



                

            }

            //localGraph = localStorage.getItem("mxGraph");
            //if(localGraph) { 
                /*console.log("xml from db " + xml)
                var doc = mxUtils.parseXml(xml);
                var codec = new mxCodec(doc);
                codec.decode(doc.documentElement, graph.getModel());
            //}*/

            $.ajax({
                    
                        type: "GET",
                        url: "/home/",
                        dataType: 'text',
                        success: function(data){
                            console.log(xml22)
                            //alert(xml22)
                            //alert("hi")
                            //console.log(graph)
                            //var xmlDoc = data[0]

                            //graph.getModel().beginUpdate();
                            var xmlDoc = mxUtils.parseXml(xml22);
                            //var xmlDoc = mxUtils.load("/saveData/").getXml();
                            //console.log("xmlDoc " + xmlDoc)
                            var node = xmlDoc.documentElement;
                            //console.log("node " + node)
                            var dec = new mxCodec(node.ownerDocument);
                            //console.log("dec " + dec)
                            //console.log("graph model " + graph.getModel())
                            dec.decode(node, graph.getModel());
                            //graph.fit()
                        }
                    });

        }

        function addToolbarItem(graph, toolbar, prototype, image)
        {
            // Function that is executed when the image is dropped on
            // the graph. The cell argument points to the cell under
            // the mousepointer if there is one.
            var funct = function(graph, evt, cell)
            {
                graph.stopEditing(false);

                var pt = graph.getPointForEvent(evt);
                var vertex = graph.getModel().cloneCell(prototype);
                vertex.geometry.x = pt.x;
                vertex.geometry.y = pt.y;
                
                graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));

            }

            // Creates the image which is used as the drag icon (preview)
            var img = toolbar.addMode(null, image, funct);
            mxUtils.makeDraggable(img, graph, funct);

        }

        function post(path, params, method) {
            
            method = method || "post"; // Set method to post by default if not specified.

            // The rest of this code assumes you are not using a library.
            // It can be made less wordy if you use one.
            var form = document.createElement("form");
            form.setAttribute("method", method);
            form.setAttribute("action", path);

            var inputElem = document.createElement('input');
            inputElem.type = 'hidden';
            inputElem.name = 'csrfmiddlewaretoken';
            inputElem.value = getCookie("csrftoken");
            form.appendChild(inputElem);

            var hiddenId = document.createElement("input");
            hiddenId.setAttribute("type", "hidden");
            hiddenId.setAttribute("name", "currentGraphId");
            hiddenId.setAttribute("value", $("#idOfGraph").val());
            form.appendChild(hiddenId)

            for(var key in params) {
                if(params.hasOwnProperty(key)) {
                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", key);
                    console.log(key)
                    hiddenField.setAttribute("value", params[key]);

                    form.appendChild(hiddenField);
                }
            }

            document.body.appendChild(form);
            form.submit();
    }




