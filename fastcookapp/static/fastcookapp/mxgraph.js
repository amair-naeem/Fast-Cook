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
                container.style.background = 'url("/images/grid.gif")';

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

                /*var button = mxUtils.button('Create toolbar entry from selection', function(evt)
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
                        var img = toolbar.addMode(null, '/images/outline.gif', funct);
                        mxUtils.makeDraggable(img, graph, funct);
                    }
                });

                button.style.position = 'absolute';
                button.style.left = '2px';
                button.style.top = '2px';
                
                document.body.appendChild(button);*/
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

