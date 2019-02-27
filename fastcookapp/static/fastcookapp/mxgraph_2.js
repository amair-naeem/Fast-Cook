// Cookie 
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function main(container, outline, toolbar, sidebar, status){

            // Connector image
            // mxConnectionHandler.prototype.connectImage = new mxImage("/images/connector.gif", 16, 16);
            mxConstants.MIN_HOTSPOT_SIZE = 16;
            mxConstants.DEFAULT_HOTSPOT = 1;
                
            // Enables guides
            mxGraphHandler.prototype.guidesEnabled = true;

            // Alt disables guides
            mxGuide.prototype.isEnabledForEvent = function(evt)
            {
                return !mxEvent.isAltDown(evt);
            };

            // Checks if browser is supported
            if (!mxClient.isBrowserSupported())
            {
                // Displays an error message if the browser is
                // not supported.
                mxUtils.error('Browser is not supported!', 200, false);
            }

            else
            {	
            	// Creates the div for the toolbar
				var tbContainer = document.createElement('div');
				tbContainer.style.position = 'absolute';
				tbContainer.style.overflow = 'hidden';
				tbContainer.style.padding = '2px';
				tbContainer.style.left = '0px';
				tbContainer.style.top = '26px';
				tbContainer.style.width = '24px';
				tbContainer.style.bottom = '0px';
				
				document.body.appendChild(tbContainer);
			
				// Creates new toolbar without event processing
				var toolbar = new mxToolbar(tbContainer);
				toolbar.enabled = false
                
                //Creates the div for the toolbar
                var tbContainer = document.getElementById('toolbar');
                var diagramContainerClass = document.getElementsByClassName("diagramContainer")
                var diagramContainer = diagramContainerClass[0]
                container = document.getElementById('container');
                document.body.appendChild(diagramContainer);
                diagramContainer.appendChild(container)
                
                // Workaround for Internet Explorer ignoring certain styles
                if (mxClient.IS_QUIRKS)
                {
                    document.body.style.overflow = 'hidden';
                    new mxDivResizer(tbContainer);
                    new mxDivResizer(container);
                    new mxDivResizer(outline);
                    new mxDivResizer(toolbar);
                    new mxDivResizer(sidebar);
                    new mxDivResizer(status);
                
                }
    
                // Creates a wrapper editor with a graph inside the given container.
                // The editor is used to create certain functionality for the
                // graph, such as the rubberband selection, but most parts
                // of the UI are custom in this example.
                var editor = new mxEditor();
                //var graph = editor.graph;
                //var model = graph.getModel();
				var model = new mxGraphModel();
                var graph = new mxGraph(container, model);


                // Disable highlight of cells when dragging from toolbar
                graph.setDropEnabled(false);

                // Uses the port icon while connections are previewed
                graph.connectionHandler.getConnectImage = function(state)
                {
                    return new mxImage(state.style[mxConstants.STYLE_IMAGE], 16, 16);
                };

                // Centers the port icon on the target port
                graph.connectionHandler.targetConnectImage = true;

                // Does not allow dangling edges
                graph.setAllowDanglingEdges(false);

                // Sets the graph container and configures the editor
                editor.setGraphContainer(container);

                mxGraphModel.prototype.createId = function(cell)
                {   var id = this.nextId;
            	    this.nextId++;
        	        return this.prefix + id + this.postfix;
        	    };


                // Renders the text in the addSidebarIcon as HTML
                graph.isHtmlLabel = function(cell)
                {
                    return !this.isSwimlane(cell);
                }

                // Disable mxGraph double click 
                graph.dblClick = function(evt, cell)
                {
                    
                    mxEvent.consume(evt);
                };

                model.createId = function(cell)
                {    
                	var id = this.nextId;
            	    this.nextId++;
            	    return this.prefix + id + this.postfix;
            	};

                // Enables new connections
                graph.setConnectable(true);

                /* Search bar icons
                addSidebarIcon(graph, sidebar, 
                    '<img src="/images/icons/flour.png" width="48" height="48">'+
                    '<br>',
                    '/images/icons/flour.png', 'test');

                addSidebarIcon2(graph, sidebar,
                    '<img src="/images/icons/whisk.png" width="48" height="48">'+
                    '<br>',
                    '/images/icons/whisk.png', 'test2'); */

                var addVertex = function(icon, w, h, style)
				{
					var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
					vertex.setVertex(true);
				
					addToolbarItem(graph, toolbar, vertex, icon);
				};

				var style = graph.getStylesheet().getDefaultVertexStyle();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_IMAGE] = 'test.png';
            style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
graph.getStylesheet().putCellStyle('rounded2', style);
				
				addVertex('editors/images/swimlane.gif', 120, 160, 'rounded2');


                $(document).ready(function(){
                    $('.openGraph').on('click',function(event){

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


                $(document).ready(function(){
                    $('.openFile').on('click',function(event){

                        var csrftoken = getCookie('csrftoken');
                        var encoder = new mxCodec();
                        var node = encoder.encode(graph.getModel());
                        //var xml = mxUtils.getPrettyXml(node); 
                        xml = "";
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
                            success: graph.removeCells(graph.getChildVertices(graph.getDefaultParent()))
                        });
      
                    })
                });

               

                $("#saveButton").click(function (event) 
                {

                    var encoder = new mxCodec();
                    var node = encoder.encode(graph.getModel());
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
                        success: function(){

                        }
                        
                    });

                });

                $("#saveName").click(function (event) 
                {
                    var csrftoken = getCookie('csrftoken');
                    var encoder = new mxCodec();
                    var node = encoder.encode(graph.getModel());
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
                    });

                });

                var undoManager = new mxUndoManager();
				
				var listener = function(sender, evt)
				{
					undoManager.undoableEditHappened(evt.getProperty('edit'));
				};

				graph.getModel().addListener(mxEvent.UNDO, listener);
				
				graph.getView().addListener(mxEvent.UNDO, listener);


                graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
				{

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

               
                var spacer = document.createElement('div');
                spacer.style.display = 'inline';
                spacer.style.padding = '8px';

                addToolbarButton(editor, toolbar, 'delete', 'Delete', '/images/delete2.png');
                
                toolbar.appendChild(spacer.cloneNode(true));
                
                addToolbarButton(editor, toolbar, 'cut', 'Cut', '/images/cut.png');
                addToolbarButton(editor, toolbar, 'copy', 'Copy', '/images/copy.png');
                addToolbarButton(editor, toolbar, 'paste', 'Paste', '/images/paste.png');

                toolbar.appendChild(spacer.cloneNode(true));
                
                addToolbarButton(editor, toolbar, 'undo', '', '/images/undo.png');
                addToolbarButton(editor, toolbar, 'redo', '', '/images/redo.png');
                
                toolbar.appendChild(spacer.cloneNode(true));
                
                addToolbarButton(editor, toolbar, 'show', 'Show', '/images/camera.png');
                addToolbarButton(editor, toolbar, 'print', 'Print', '/images/printer.png');
                
                toolbar.appendChild(spacer.cloneNode(true));

                var outln = new mxOutline(graph, outline);
                //outln.outline.labelsVisible = true;
                //outln.outline.setHtmlLabels(true);

            }

            // When user refreshes browser
            $.ajax({
                    type: "GET",
                    url: "/home/",
                    dataType: 'text',
                    success: function(data){
                        var style = graph.getStylesheet().getDefaultVertexStyle();
                        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        // Need to change this so that it occurs for each icon
                        style[mxConstants.STYLE_IMAGE] = '/images/icons/flour.png';
                        // Decode the XML
                        var xmlDoc = mxUtils.parseXml(xml22);
                        var node = xmlDoc.documentElement;
                        var dec = new mxCodec(node.ownerDocument);
                        dec.decode(node, graph.getModel());
                        console.log(style)
                        /*console.log(graph.getModel().getCell('test'))                        
                        console.log(graph.getModel().getCell('test2'))



                        //console.log(model.getCell(id='test'))*/
                        
                    }
                });



        }

        // Adds toolbar items on top
        function addToolbarButton(editor, toolbar, action, label, image, isTransparent)
        {
            var button = document.createElement('button');
            button.style.fontSize = '10';
            if (image != null)
            {
                var img = document.createElement('img');
                img.setAttribute('src', image);
                img.style.width = '16px';
                img.style.height = '16px';
                img.style.verticalAlign = 'middle';
                img.style.marginRight = '2px';
                button.appendChild(img);
            }
            if (isTransparent)
            {
                button.style.background = 'transparent';
                button.style.color = '#FFFFFF';
                button.style.border = 'none';
            }
            mxEvent.addListener(button, 'click', function(evt)
            {
                editor.execute(action);
            });
            mxUtils.write(button, label);
            toolbar.appendChild(button);
        };

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


        /*function addSidebarIcon(graph, sidebar, label, image, id)
        {
            // Function that is executed when the image is dropped on
            // the graph. The cell argument points to the cell under
            // the mousepointer if there is one.

            var funct = function(graph, evt, cell, x, y)
            {

                var parent = graph.getDefaultParent();
                var model = graph.getModel();
                
                var v1 = null;
                model.beginUpdate();
                try
                {
                    

                    v1 = graph.insertVertex(parent, id, null, x, y, 120, 120);

                    v1.setConnectable(false);

                    var port = graph.insertVertex(v1, null, 'Error', 1, 0.25, 16, 16,
                            'port;image=editors/images/overlays/error.png;spacingLeft=18', true);
                    port.geometry.offset = new mxPoint(-8, -8);

                    // Adds all required styles to the graph (see below)
                    configureStylesheet(graph,image);

                    
                }
                finally
                {
                    model.endUpdate();
                }
                
                graph.setSelectionCell(v1);
            }
            
            // Creates the image which is used as the sidebar icon (drag source)
            var img = document.createElement('img');
            img.setAttribute('src', image);
            img.style.width = '48px';
            img.style.height = '48px';
            img.title = 'Drag this to the diagram to create a new vertex';
            sidebar.appendChild(img);
            
            var dragElt = document.createElement('div');
            dragElt.style.border = 'dashed black 1px';
            dragElt.style.width = '120px';
            dragElt.style.height = '120px';
            


            // Creates the image which is used as the drag icon (preview)
            var ds = mxUtils.makeDraggable(img, graph, funct, dragElt, 0, 0, true, true);
            ds.setGuidesEnabled(true);
        };

        function addSidebarIcon2(graph, sidebar, label, image, id)
        {
            // Function that is executed when the image is dropped on
            // the graph. The cell argument points to the cell under
            // the mousepointer if there is one.

            var funct = function(graph, evt, cell, x, y)
            {

                var parent = graph.getDefaultParent();
                var model = graph.getModel();
                
                var v1 = null;
                model.beginUpdate();
                try
                {
                    

                    v1 = graph.insertVertex(parent, id, null, x, y, 120, 120);

                    v1.setConnectable(false);

                    var port = graph.insertVertex(v1, null, 'Error', 1, 0.25, 16, 16,
                            'port;image=editors/images/overlays/error.png;spacingLeft=18', true);
                    port.geometry.offset = new mxPoint(-8, -8);

                    // Adds all required styles to the graph (see below)
                    configureStylesheet(graph,image);

                    
                }
                finally
                {
                    model.endUpdate();
                }
                
                graph.setSelectionCell(v1);
            }
            
            // Creates the image which is used as the sidebar icon (drag source)
            var img = document.createElement('img');
            img.setAttribute('src', image);
            img.style.width = '48px';
            img.style.height = '48px';
            img.title = 'Drag this to the diagram to create a new vertex';
            sidebar.appendChild(img);
            
            var dragElt = document.createElement('div');
            dragElt.style.border = 'dashed black 1px';
            dragElt.style.width = '120px';
            dragElt.style.height = '120px';
            


            // Creates the image which is used as the drag icon (preview)
            var ds = mxUtils.makeDraggable(img, graph, funct, dragElt, 0, 0, true, true);
            ds.setGuidesEnabled(true);
        };


        /*function configureStylesheet(graph,image)
        {


            var style = graph.getStylesheet().getDefaultVertexStyle();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_IMAGE] = image;
            style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;


    		style.putCellStyle( "hi", style);

            console.log(style)

            style = new Object();
            style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
            style[mxConstants.STYLE_FONTCOLOR] = '#774400';
            style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            style[mxConstants.STYLE_PERIMETER_SPACING] = '6';
            style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
            style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
            style[mxConstants.STYLE_FONTSIZE] = '10';
            style[mxConstants.STYLE_FONTSTYLE] = 2;
            style[mxConstants.STYLE_IMAGE_WIDTH] = '16';
            style[mxConstants.STYLE_IMAGE_HEIGHT] = '16';
            graph.getStylesheet().putCellStyle('port', style);
        }*/
       

