//cookie
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


function main()
        {
            // Defines an icon for creating new connections in the connection handler.
            // This will automatically disable the highlighting of the source vertex.
            mxConnectionHandler.prototype.connectImage = new mxImage("/images/connector.gif", 16, 16);
            //var mxPopupMenuShowMenu = mxPopupMenu.prototype.showMenu;
            //mxDefaultPopupMenu.prototype.addItems = function(editor){editor = editor};

            //mxPopupMenu.prototype.addItem = function(</td><td class=PParameter nowrap>title,</td></tr><tr><td></td><td class=PParameter nowrap>image,</td></tr><tr><td></td><td class=PParameter nowrap>funct,</td></tr><tr><td></td><td class=PParameter nowrap>parent,</td></tr><tr><td></td><td class=PParameter nowrap>iconCls,</td></tr><tr><td></td><td class=PParameter nowrap>enabled</td><td class=PAfterParameters nowrap>)
            //console.log(mxPopupMenu.prototype.itemCount)



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
            
                // Creates new toolbar without event processing
                var toolbar = new mxToolbar(tbContainer);
                toolbar.enabled = false
                
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


                var xml;

                
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
                var graph = new mxGraph(container, model);
                graph.dropEnabled = true;

                //save xml upon click
                var model = new mxGraphModel();

                $(document).ready(function(){
                    $('.openGraph').on('click',function(event){

                        //var openUrl = $(this).attr('href');
                        $('#openModal').modal('hide');
                        var openUrl = $(this).attr('id');
                        var csrftoken = getCookie('csrftoken');



                        $.ajax({
                    
                        //type: "GET",
                        url: openUrl,
                        dataType: 'text',
                        headers:{
                            "X-CSRFToken": csrftoken
                        },
                        success: function(){
                            alert(openXML)
                            var xmlDoc = mxUtils.parseXml(openXML);
                            var node = xmlDoc.documentElement;
                            var dec = new mxCodec(node.ownerDocument);
                            dec.decode(node, graph.getModel());
                        }
                    });
      
                    })
                });

               
                //var button = mxUtils.button('Save', function()
                $("#saveButton").click(function (event) 
                {
                    //var url = "{%url'login'%}"
                    //var url = "{% url 'myapp:productdetail' %}";
                    //location.href = '/saveData/'
                    var encoder = new mxCodec();
                    var node = encoder.encode(graph.getModel());
                    //var xml = mxUtils.getPrettyXml(node); 
                    xml = mxUtils.getXml(node);
                    var csrftoken = getCookie('csrftoken');

                    $.ajax({
        
                        type: "POST",
                        url: "/saveData/",
                        data: { "xml": xml},
                        dataType: 'text',
                        headers:{
                            "X-CSRFToken": csrftoken
                        },
                        success: function(data){
                            //alert("hi")
                            //console.log(graph)
                            //var xmlDoc = data[0]

                            //graph.getModel().beginUpdate();
                            console.log("success" + xmlTest)
                            var xmlDoc = mxUtils.parseXml(xmlTest);
                            //var xmlDoc = mxUtils.load("/saveData/").getXml();
                            //console.log("xmlDoc " + xmlDoc)
                            var node = xmlDoc.documentElement;
                            //console.log("node " + node)
                            var dec = new mxCodec(node.ownerDocument);
                            //console.log("dec " + dec)
                            //console.log("graph model " + graph.getModel())
                            dec.decode(node, graph.getModel());
                            //graph.fit()
                            //graph.getModel().endUpdate();
                            //localStorage.setItem("mxGraph", "" + xml + "");



                            /*var doc = mxUtils.parseXml(xml);
                            var codec = new mxCodec(doc);
                            var elt = doc.documentElement.firstChild;
                            var cells = [];

                            while (elt != null)
                            {
                              cells.push(codec.decode(elt));
                              elt = elt.nextSibling;
                            }
                            var cells = graph.getSelectionCells();
                            //console.log(cells)
                            graph.addCells(cells);*/




                        }
                    });

                    //console.log(xml);
                    //mxUtils.popup(mxUtils.getPrettyXml(node), true);
                });

                $("#saveName").click(function (event) 
                {
                    var csrftoken = getCookie('csrftoken');
                    var encoder = new mxCodec();
                    var node = encoder.encode(graph.getModel());
                    //var xml = mxUtils.getPrettyXml(node); 
                    xml = mxUtils.getXml(node);
                    var csrftoken = getCookie('csrftoken');
                    var title = $('#title').val()
                    $.ajax({
                        type: "POST",
                        url: "/saveTitle/",
                        data: {
                            'title': title,
                            'xml': xml
                        },
                        dataType: 'text',
                        headers:{
                            "X-CSRFToken": csrftoken
                        },
                        success: function(data){

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


                // Stops editing on enter or escape keypress
                var keyHandler = new mxKeyHandler(graph);
                var rubberband = new mxRubberband(graph);
                
                var addVertex = function(icon, w, h, style)
                {
                    var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, toolbar, vertex, icon);
                };
                
                addVertex('/images/swimlane.gif', 120, 160, 'shape=swimlane;startSize=20;');
                addVertex('/images/rectangle.gif', 100, 40, '');
                addVertex('/images/rounded.gif', 100, 40, 'shape=rounded');
                addVertex('/images/ellipse.gif', 40, 40, 'shape=ellipse');
                addVertex('/images/rhombus.gif', 40, 40, 'shape=rhombus');
                addVertex('/images/triangle.gif', 40, 40, 'shape=triangle');
                addVertex('/images/cylinder.gif', 40, 40, 'shape=cylinder');
                addVertex('/images/actor.gif', 30, 40, 'shape=actor');
                toolbar.addLine();
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
                            alert(xml22)
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


