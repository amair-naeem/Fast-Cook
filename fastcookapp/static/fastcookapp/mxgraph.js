/*
		// Program starts here. Creates a sample graph in the
		// DOM node with the specified ID. This function is invoked
		// from the onLoad event handler of the document (see below).
		function main(container)
		{
			// Checks if the browser is supported
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				// Disables the built-in context menu
				mxEvent.disableContextMenu(container);
				
				// Creates the graph inside the given container
				var graph = new mxGraph(container);

				// Enables rubberband selection
				new mxRubberband(graph);
				
				//mxEvent.addListener(container, 'drop', function(evt)){}

				// Gets the default parent for inserting new cells. This
				// is normally the first child of the root (ie. layer 0).
				var parent = graph.getDefaultParent();
								
				// Adds cells to the model in a single step
				//graph.getModel().beginUpdate();
				try
				{
					//var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
					//var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
					//var e1 = graph.insertEdge(parent, null, '', v1, v2);
					//var toolbar = new mxToolbar(tbContainer);
                	//toolbar.enabled = false;
                	var v3 = graph.addVertex('circle.png', 120, 160, 'shape=circle;startSize=20;');

			

				}
				finally
				{
					// Updates the display
					graph.getModel().endUpdate();
				}
			}
		};

*/

function main()
        {
            // Defines an icon for creating new connections in the connection handler.
            // This will automatically disable the highlighting of the source vertex.
            mxConnectionHandler.prototype.connectImage = new mxImage("/images/connector.gif", 16, 16);

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
                
                // Creates the div for the graph
                container = document.createElement('div');
                container.style.position = 'absolute';
                container.style.overflow = 'hidden';
                container.style.left = '24px';
                container.style.top = '26px';
                container.style.right = '0px';
                container.style.bottom = '0px';
                container.style.background = 'url("editors/images/grid.gif")';

                document.body.appendChild(container);
                
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

                // Stops editing on enter or escape keypress
                var keyHandler = new mxKeyHandler(graph);
                var rubberband = new mxRubberband(graph);
                
                var addVertex = function(icon, w, h, style)
                {
                    var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, toolbar, vertex, icon);
                };
                
                addVertex('editors/images/swimlane.gif', 120, 160, 'shape=swimlane;startSize=20;');
                addVertex('editors/images/rectangle.gif', 100, 40, '');
                addVertex('editors/images/rounded.gif', 100, 40, 'shape=rounded');
                addVertex('editors/images/ellipse.gif', 40, 40, 'shape=ellipse');
                addVertex('editors/images/rhombus.gif', 40, 40, 'shape=rhombus');
                addVertex('editors/images/triangle.gif', 40, 40, 'shape=triangle');
                addVertex('editors/images/cylinder.gif', 40, 40, 'shape=cylinder');
                addVertex('editors/images/actor.gif', 30, 40, 'shape=actor');
                toolbar.addLine();
                
                var button = mxUtils.button('Create toolbar entry from selection', function(evt)
                {
                    if (!graph.isSelectionEmpty())
                    {
                        // Creates a copy of the selection array to preserve its state
                        var cells = graph.getSelectionCells();
                        var bounds = graph.getView().getBounds(cells);
                        
                        // Function that is executed when the image is dropped on
                        // the graph. The cell argument points to the cell under
                        // the mousepointer if there is one.
                        var funct = function(graph, evt, cell)
                        {
                            graph.stopEditing(false);
            
                            var pt = graph.getPointForEvent(evt);
                            var dx = pt.x - bounds.x;
                            var dy = pt.y - bounds.y;
                            
                            graph.setSelectionCells(graph.importCells(cells, dx, dy, cell));
                        }
            
                        // Creates the image which is used as the drag icon (preview)
                        var img = toolbar.addMode(null, 'editors/images/outline.gif', funct);
                        mxUtils.makeDraggable(img, graph, funct);
                    }
                });

                button.style.position = 'absolute';
                button.style.left = '2px';
                button.style.top = '2px';
                
                document.body.appendChild(button);
            }
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
