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

    var csrftoken = getCookie('csrftoken');





function hideOnClk(id){
        var cat = document.getElementById("byCategory");
        var searchEngine = document.getElementById("search");

         if(id == "searchImage"){
           document.getElementById("categoryImage").style.display="block";
           document.getElementById(id).style.display="none";
           cat.style.display = "none";
           searchEngine.style.display = "block";

         }else{
           document.getElementById("searchImage").style.display="block";
           document.getElementById(id).style.display="none";
           cat.style.display = "block";
           searchEngine.style.display = "none"
         }
      }

      var onStar = 0;

      $(document).ready(function(){
  
          /* 1. Visualizing things on Hover - See next part for action on click */
          $('#stars li').on('mouseover', function(){
            var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
           
            // Now highlight all the stars that's not after the current hovered star
            $(this).parent().children('li.star').each(function(e){
              if (e < onStar) {
                $(this).addClass('hover');
              }
              else {
                $(this).removeClass('hover');
              }
            });
            
          }).on('mouseout', function(){
            $(this).parent().children('li.star').each(function(e){
              $(this).removeClass('hover');
            });
          });
          
          
          /* 2. Action to perform on click */
          $('#stars li').on('click', function(){
            onStar = parseInt($(this).data('value'), 10); // The star currently selected

            // pass onstar to value of share.
            var stars = $(this).parent().children('li.star');
            
            for (i = 0; i < stars.length; i++) {
              $(stars[i]).removeClass('selected');
            }
            
            for (i = 0; i < onStar; i++) {
              $(stars[i]).addClass('selected');
            }
            
            
          });
  
  
    });



        function mxIconSet(state)
        {
            this.images = [];
            var graph = state.view.graph;
            
            // Icon1
            var img = mxUtils.createImage('/images/copy.png');
            img.setAttribute('title', 'Duplicate');
            img.style.position = 'absolute';
            img.style.cursor = 'pointer';
            img.style.width = '16px';
            img.style.height = '16px';
            img.style.left = (state.x + state.width) + 'px';
            img.style.top = (state.y + state.height) + 'px';
            
            mxEvent.addGestureListeners(img,
                mxUtils.bind(this, function(evt)
                {
                    var s = graph.gridSize;
                    graph.setSelectionCells(graph.moveCells([state.cell], s, s, true));
                    mxEvent.consume(evt);
                    this.destroy();
                })
            );
            
            state.view.graph.container.appendChild(img);
            this.images.push(img);
            
            // Delete
            var img = mxUtils.createImage('/images/delete2.png');
            img.setAttribute('title', 'Delete');
            img.style.position = 'absolute';
            img.style.cursor = 'pointer';
            img.style.width = '16px';
            img.style.height = '16px';
            img.style.left = (state.x + state.width) + 'px';
            img.style.top = (state.y - 16) + 'px';
            
            mxEvent.addGestureListeners(img,
                mxUtils.bind(this, function(evt)
                {
                    // Disables dragging the image
                    mxEvent.consume(evt);
                })
            );
            
            mxEvent.addListener(img, 'click',
                mxUtils.bind(this, function(evt)
                {
                    graph.removeCells([state.cell]);
                    mxEvent.consume(evt);
                    this.destroy();
                })
            );
            
            state.view.graph.container.appendChild(img);
            this.images.push(img);
        };

        mxIconSet.prototype.destroy = function()
        {
            if (this.images != null)
            {
                for (var i = 0; i < this.images.length; i++)
                {
                    var img = this.images[i];
                    img.parentNode.removeChild(img);
                }
            }
            
            this.images = null;
        };


    var myEvent = window.attachEvent || window.addEventListener;
    var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload';

    myEvent(chkevent, function(e) { 
        var confirmationMessage = 'Changes that you made may not be saved.';
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    });

    if (window.performance) {
      if (performance.navigation.type == 1) {
        window.location.href = "/profile/"
      } 
    }

function main()
        {
            mxGraph.prototype.setAllowDanglingEdges(false)
            mxConnectionHandler.prototype.connectImage = new mxImage('/images/connector.gif', 16, 16);

            // Enables guides
            mxGraphHandler.prototype.guidesEnabled = true;

            // Alt disables guides
            mxGuide.prototype.isEnabledForEvent = function(evt)
            {
                return !mxEvent.isAltDown(evt);
            };


            // Creates the model and the graph inside the container
                // using the fastest rendering available on the browser
            var editor = new mxEditor();
                var graph = editor.graph;
                var model = graph.getModel();


            graph.dropEnabled = true;

            var iconTolerance = 20;

            graph.addMouseListener(
                {
                    currentState: null,
                    currentIconSet: null,
                    mouseDown: function(sender, me)
                    {
                        // Hides icons on mouse down
                        if (this.currentState != null)
                        {
                            this.dragLeave(me.getEvent(), this.currentState);
                            this.currentState = null;
                        }
                    },
                    mouseMove: function(sender, me)
                    {
                        if (this.currentState != null && (me.getState() == this.currentState ||
                            me.getState() == null))
                        {
                            var tol = iconTolerance;
                            var tmp = new mxRectangle(me.getGraphX() - tol,
                                me.getGraphY() - tol, 2 * tol, 2 * tol);

                            if (mxUtils.intersects(tmp, this.currentState))
                            {
                                return;
                            }
                        }
                        
                        var tmp = graph.view.getState(me.getCell());
                        
                        // Ignores everything but vertices
                        if (graph.isMouseDown || (tmp != null && !graph.getModel().isVertex(tmp.cell)))
                        {
                            tmp = null;
                        }

                        if (tmp != this.currentState)
                        {
                            if (this.currentState != null)
                            {
                                this.dragLeave(me.getEvent(), this.currentState);
                            }
                        
                            this.currentState = tmp;
                        
                            if (this.currentState != null)
                            {
                                this.dragEnter(me.getEvent(), this.currentState);
                            }
                        }
                    },
                    mouseUp: function(sender, me) { },
                    dragEnter: function(evt, state)
                    {
                        if (this.currentIconSet == null)
                        {
                            this.currentIconSet = new mxIconSet(state);
                        }
                    },
                    dragLeave: function(evt, state)
                    {
                        if (this.currentIconSet != null)
                        {
                            this.currentIconSet.destroy();
                            this.currentIconSet = null;
                        }
                    }
                });
            // Defines an icon for creating new connections in the connection handler.
            // This will automatically disable the highlighting of the source vertex.
            //mxConnectionHandler.prototype.connectImage = new mxImage("/images/connector.gif", 16, 16);
            //var mxPopupMenuShowMenu = mxPopupMenu.prototype.showMenu;
            //mxDefaultPopupMenu.prototype.addItems = function(editor){editor = editor};

            //mxPopupMenu.prototype.addItem = function(</td><td class=PParameter nowrap>title,</td></tr><tr><td></td><td class=PParameter nowrap>image,</td></tr><tr><td></td><td class=PParameter nowrap>funct,</td></tr><tr><td></td><td class=PParameter nowrap>parent,</td></tr><tr><td></td><td class=PParameter nowrap>iconCls,</td></tr><tr><td></td><td class=PParameter nowrap>enabled</td><td class=PAfterParameters nowrap>)
            //console.log(mxPopupMenu.prototype.itemCount)

            $('.shareElements').on('input blur paste', function(){
                $(this).val($(this).val().replace(/\D/g, ''))
            })

           

            $('#share').on('click',function(event){
                var encoder = new mxCodec();
                var node = encoder.encode(graph.getModel());
                sharedXMLData = mxUtils.getXml(node)
                $('input[name="currentGraphId"]').val($("#idOfGraph").val())
                $('input[name="rating"]').val(onStar)
                $('input[name="sharedXMLData"]').val(sharedXMLData)
                
                if(onStar == 0)
                {
                    event.preventDefault();
                    $(".error").css("display", "block");

                }
                /*var hiddenId = document.createElement("input");
                hiddenId.setAttribute("type", "hidden");
                hiddenId.setAttribute("name", "currentGraphId");
                hiddenId.setAttribute("value", $("#idOfGraph").val());
                form.appendChild(hiddenId)

                var rating = document.createElement("input")
                rating.setAttribute("type", "hidden")
                rating.setAttribute("name", "rating")
                rating.setAttribute("value", onStar)
                form.appendChild(rating)*/

                //var url = "/home/";
                //post(url, {sharedXMLData:xml});

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


                var searchToolbar = document.getElementById("searchToolbar");
                var toolbarsearchEngine = new mxToolbar(searchToolbar);
                toolbarsearchEngine.enabled = false


                var topToolbar = document.getElementById('toptoolbar')

                /*var toolbarContainer = document.getElementById('toolbarContainer')
                var toolbarContainer = new mxToolbar(content);
                toolbarContainer.enabled = false*/

                var content = document.getElementById('content')
                var equipment = document.getElementById('generalContent')
                var measurement = document.getElementById('measurement')
                var berries = document.getElementById('berries')
                var dairies = document.getElementById('dairies')
                var dessert = document.getElementById('desserts')
                var dishes = document.getElementById('dishes')
                var fruits = document.getElementById('fruits')
                var meat = document.getElementById('meat')
                var nut = document.getElementById('nut')
                var vegetables = document.getElementById('vegetables')
                var seafood = document.getElementById('seafood')
                var fastfood = document.getElementById('fastfood')
                var other = document.getElementById('other')
            
                // Creates new toolbar without event processing
                var toolbar = new mxToolbar(content);
                toolbar.enabled = false

                var generalToolbar = new mxToolbar(generalContent)
                generalToolbar.enabled = false

                var measurementToolbar = new mxToolbar(measurement);
                measurementToolbar.enabled = false

                var berriesToolbar = new mxToolbar(berries)
                berriesToolbar.enabled = false

                var dairiesToolbar = new mxToolbar(dairies);
                dairiesToolbar.enabled = false

                var dessertToolbar = new mxToolbar(dessert)
                dessertToolbar.enabled = false

                var fruitsToolbar = new mxToolbar(fruits)
                fruitsToolbar.enabled = false

                var meatToolbar = new mxToolbar(meat)
                meatToolbar.enabled = false

                var nutToolbar = new mxToolbar(nut)
                nutToolbar.enabled = false

                var vegetablesToolbar = new mxToolbar(vegetables)
                vegetablesToolbar.enabled = false

                var seafoodToolbar = new mxToolbar(seafood)
                seafoodToolbar.enabled = false

                var fastfoodToolbar = new mxToolbar(fastfood)
                fastfoodToolbar.enabled = false

                var otherToolbar = new mxToolbar(other)
                otherToolbar.enabled = false

                var dishesToolbar = new mxToolbar(dishes)
                dishesToolbar.enabled = false

                var equipmentToolbar = new mxToolbar(equipment)
                equipmentToolbar.enabled = false

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


                var container = document.getElementById('container');
                //document.body.appendChild(diagramContainer);
                //diagramContainer.appendChild(container)

               //menuBar = document.getElementById('menuBar')
                //document.body.appendChild(menuBar)


                /*mxEdgeStyle.MyStyle = function(state, source, target, points, result)
                {
                  if (source != null && target != null)
                  {
                    var pt = new mxPoint(target.getCenterX(), source.getCenterY());

                    if (mxUtils.contains(source, pt.x, pt.y))
                    {
                      pt.y = source.y + source.height;
                    }

                    result.push(pt);
                  }
                };*/


                
                // Workaround for Internet Explorer ignoring certain styles
                if (mxClient.IS_QUIRKS)
                {
                    document.body.style.overflow = 'hidden';
                    new mxDivResizer(tbContainer);
                    new mxDivResizer(container);
                }

                //graph.setDropEnabled(false);

    
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

                /*var spacer = document.createElement('div');
                spacer.style.display = 'inline';
                spacer.style.padding = '8px';

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
                var rubberband = new mxRubberband(graph);*/

                // Disable highlight of cells when dragging from toolbar


                // Centers the port icon on the target port
                //graph.connectionHandler.targetConnectImage = true;

                // Disable highlight of cells when dragging from toolbar
                graph.setDropEnabled(false);


                // Does not allow dangling edges
                graph.setAllowDanglingEdges(false);

                // Sets the graph container and configures the editor
                editor.setGraphContainer(container);
                
                // Defines the default group to be used for grouping. The
                // default group is a field in the mxEditor instance that
                // is supposed to be a cell which is cloned for new cells.
                // The groupBorderSize is used to define the spacing between
                // the children of a group and the group bounds.
                var group = new mxCell('Group', new mxGeometry(), 'group');
                group.setVertex(true);
                group.setConnectable(false);
                editor.defaultGroup = group;
                editor.groupBorderSize = 20;

                // Disables drag-and-drop into non-swimlanes.
                /*graph.isValidDropTarget = function(cell, cells, evt)
                {
                    return this.isSwimlane(cell);
                };
                
                // Disables drilling into non-swimlanes.
                graph.isValidRoot = function(cell)
                {
                    return this.isValidDropTarget(cell);
                }

                // Does not allow selection of locked cells
                graph.isCellSelectable = function(cell)
                {
                    return !this.isCellLocked(cell);
                };

                // Returns a shorter label if the cell is collapsed and no
                // label for expanded groups
                graph.getLabel = function(cell)
                {
                    var tmp = mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
                    
                    if (this.isCellLocked(cell))
                    {
                        // Returns an empty label but makes sure an HTML
                        // element is created for the label (for event
                        // processing wrt the parent label)
                        return '';
                    }
                    else if (this.isCellCollapsed(cell))
                    {
                        var index = tmp.indexOf('</h1>');
                        
                        if (index > 0)
                        {
                            tmp = tmp.substring(0, index+5);
                        }
                    }
                    
                    return tmp;
                }*/

        
                // To disable the folding icon, use the following code:
                /*graph.isCellFoldable = function(cell)
                {
                    return false;
                }*/

                // Shows a "modal" window when double clicking a vertex.
                /*graph.dblClick = function(evt, cell)
                {
                    // Do not fire a DOUBLE_CLICK event here as mxEditor will
                    // consume the event and start the in-place editor.
                    if (this.isEnabled() &&
                        !mxEvent.isConsumed(evt) &&
                        cell != null &&
                        this.isCellEditable(cell))
                    {
                        if (this.model.isEdge(cell) ||
                            !this.isHtmlLabel(cell))
                        {
                            this.startEditingAtCell(cell);
                        }
                        else
                        {
                            var content = document.createElement('div');
                            content.innerHTML = this.convertValueToString(cell);
                            showModalWindow(this, 'Properties', content, 400, 300);
                        }
                    }

                    // Disables any default behaviour for the double click
                    mxEvent.consume(evt);
                };*/

                // Enables new connections
                graph.setConnectable(true);

                loadStyleSheet(graph, $("#openedGraphxml").val());

                // Creates a new DIV that is used as a toolbar and adds
                // toolbar buttons.
                var spacer = document.createElement('div');
                spacer.style.display = 'inline';
                spacer.style.paddingRight = '117px';
                spacer.style.borderRight = '2px solid #e0e0e0';
                spacer.style.borderLeft = '2px solid #e0e0e0';
                spacer.setAttribute('class', 'verticalDivider');



                
                topToolbar.appendChild(spacer.cloneNode(true));




                addToolbarButton(editor, topToolbar, 'groupOrUngroup', '(Un)group', '/images/group.png');
                
                // Defines a new action for deleting or ungrouping
                editor.addAction('groupOrUngroup', function(editor, cell)
                {
                    cell = cell || editor.graph.getSelectionCell();
                    if (cell != null && editor.graph.isSwimlane(cell))
                    {
                        editor.execute('ungroup', cell);
                    }
                    else
                    {
                        editor.execute('group');
                    }
                });

                addToolbarButton(editor, topToolbar, 'delete', 'Delete', '/images/delete2.png');
                
                spacer.style.paddingRight = '40px';
                topToolbar.appendChild(spacer.cloneNode(true));

                
                addToolbarButton(editor, topToolbar, 'cut', 'Cut', '/images/cut.png');
                addToolbarButton(editor, topToolbar, 'copy', 'Copy', '/images/copy.png');
                addToolbarButton(editor, topToolbar, 'paste', 'Paste', '/images/paste.png');

                topToolbar.appendChild(spacer.cloneNode(true));
                
                addToolbarButton(editor, topToolbar, 'undo', '', '/images/undo.png');
                addToolbarButton(editor, topToolbar, 'redo', '', '/images/redo.png');
                
                topToolbar.appendChild(spacer.cloneNode(true));

                addToolbarButton(editor, topToolbar, 'zoomIn','', '/images/zoomin.gif')
                addToolbarButton(editor, topToolbar, 'zoomOut','', '/images/zoomout.gif')

                var addVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, toolbar, vertex, icon);
                };

                var addMeasurementVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, measurementToolbar, vertex, icon);
                };

                

                var addBerriesVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, berriesToolbar, vertex, icon);
                };


                var addDairiesVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, dairiesToolbar, vertex, icon);
                };

                var addDessertsVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, dessertToolbar, vertex, icon);
                };

                var addDishesVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, dishesToolbar, vertex, icon);
                };

                var addFastFoodVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, fastfoodToolbar, vertex, icon);
                };

                var addFruitsVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, fruitsToolbar, vertex, icon);
                };

                var addMeatVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, meatToolbar, vertex, icon);
                };


                var addNutVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, nutToolbar, vertex, icon);
                };

                var addOtherVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, otherToolbar, vertex, icon);
                };

                var addSeafoodVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, seafoodToolbar, vertex, icon);
                };

                var addVegetablesVertex = function(label, icon, w, h, style)
                {
                    var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                    vertex.setVertex(true);
                
                    addToolbarItem(graph, vegetablesToolbar, vertex, icon);
                };


                berriesToolbar.addLine();
                measurementToolbar.addLine();
                toolbar.addLine();

                var addGeneralVertex = function(icon,w,h,style, value)
                {
                    
                    
                        var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);

                        //graph.setConnectable(false)
                        //vertex.setConnectable(false)
                        vertex.value = value
                        vertex.setVertex(true);

                        addToolbarItem(graph, generalToolbar, vertex, icon);

                    

                }

                addGeneralVertex('/images/text.png', 100, 40, 'text', "Text");
                generalToolbar.addLine();
                // To show the images in the outline, uncomment the following code
                //outln.outline.labelsVisible = true;
                //outln.outline.setHtmlLabels(true);


                
            }


                //graph.setEnabled(false);

                //connectors around the object
                /*graph.getAllConnectionConstraints = function(terminal)
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
                };*/
                

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
                            $("#currentTitle").attr('value',title)

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

               
                                        //$('#confirmDelete').click(function () {

                    $('#loadAllTitles').on('click','.deleteGraph' ,function(event){

                            
                                var csrftoken = getCookie('csrftoken');
                                event.preventDefault();
                                var id = $(this).attr('id');
                                var tr = $(this).closest('tr');

                                console.log(id)
                                console.log(tr)
                                $.ajax({
                                    type: "DELETE",
                                    url: id, 
                                    headers:{
                                            "X-CSRFToken": csrftoken
                                            },
                                    success: 

                                    function(data){

                                        tr.remove()
                                        var table = document.getElementById("graphList")
                                        if(table.rows.length==0)
                                        {
                                            $(window).off('beforeunload');
                                            window.location.href="/profile/"
                                            
                                        }

                                    }


                                })
                            
                        
                    //});

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

                                var titleButton="<input type=\"button\" data-dismiss=\"modal\" class = \"openGraph btn btn-success\" value=\""+title+"\" id="+pkTitle+"/\>";
                                //var deleteButton= "<input type=\"button\" data-toggle=\"modal\" data-target=\"#myModal\" class = \"deleteGraph btn btn-danger\" value=\"Delete\" id="+pkDelete+"/\>";



                                
                                 if ($("#loadAllTitles").find('#' + $.escapeSelector(pkTitle + '/')).length == 0)
                                    $("#graphList").append("<tr> <td>" + titleButton + "</td> </tr>") //<td>" + "</td> <td>" + deleteButton + "</td> </tr>")

                                    //$("#graphList").append("<tr> <td>" + titleButton + "</td> <td>" + deleteButton + "</td> </tr>")

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
                        var xml = mxUtils.getXml(node);
                        console.log(xml)
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
                                        graph.selectChildCell();
                                        graph.removeCells();
                                        $("#currentTitle").attr('value',title)
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
                    console.log("test" + $("#idOfGraph").val())

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
                                $("#currentTitle").attr('value', title)
                                $("#idOfGraph").val(parseData["id"])
                            }
                        }
                    });

                });

                //tbContainer.appendChild(button);
                //document.body.appendChild(button);
                //toolbar.addMode(button)

                //creates an undoManager object that allows users to be able to undo and redo

               

                //addVertex("300g",'/images/icons/flour.png', 120, 160, 'rounded0');   
                //addVertex(null,'/images/icons/whisk.png', 100, 40, 'rounded3');

                $.ajax({
                //This will retrieve the contents of the folder if the folder is configured as 'browsable'
                    
                    url: "/loadIcons/",
                    success: function (data) {
                        //console.log(data["images"][i])
                            addMeasurementVertex("1 tbsp", '/images/ingredients/measurement/tablespoon.png/', 60,80, 'measurement0')
                            addMeasurementVertex("1 tsp", '/images/ingredients/measurement/teaspoon.png/', 60,80, 'measurement1')
                            addMeasurementVertex("1 scoop", '/images/ingredients/measurement/scoop.png/', 60,80, 'measurement2')
                            addMeasurementVertex("1 cup", '/images/ingredients/measurement/cup.png/', 60,80, 'measurement3')
                            addMeasurementVertex("1 inch", '/images/ingredients/measurement/ruler.png/', 60,80, 'measurement4')

                            

                            $( "#searchEngine" ).autocomplete({
                                  source: data["allFiles"]
                                });
  

                            var addEquipmentVertex = function(label, icon, w, h, style)
                            {
                                var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                                vertex.setVertex(true);
                
                                addToolbarItem(graph, equipmentToolbar, vertex, icon);
                            };

                            for (var i = 3; i >= 0; i--) {
                                
                                addEquipmentVertex("60 Minutes",'/images/ingredients/Equipment/'+ data["equipment"][i] + "/", 60, 80, 'equipment'+i); 

                            }

                            for (var i = 4; i >= 0; i--) {
                                
                                addVertex("300g",'/images/ingredients/Bakery/'+ data["bakery"][i] + "/", 60, 80, 'rounded'+i); 

                            }

                            for (var i = 3; i >= 0; i--) {
                                
                                addBerriesVertex("300g",'/images/ingredients/Berries/'+ data["berries"][i] + "/", 60, 80, 'berries'+i); 

                            }

                            for (var i = 2; i >= 0; i--) {
                                
                                addDairiesVertex("300g",'/images/ingredients/Dairies/'+ data["dairies"][i] + "/", 60, 80, 'dairies'+i); 

                            }

                    
                            for (var i = 19; i >= 0; i--) {
                                
                                addFruitsVertex("300g",'/images/ingredients/Fruits/'+ data["fruits"][i] + "/", 60, 80, 'fruits'+i); 

                            }

                            for (var i = 8; i >= 0; i--) {
                                
                                addMeatVertex("300g",'/images/ingredients/Meat/'+ data["meat"][i] + "/", 60, 80, 'meat'+i); 

                            }

                            for (var i = 3; i >= 0; i--) {
                                
                                addNutVertex("300g",'/images/ingredients/Nut/'+ data["nut"][i] + "/", 60, 80, 'nut'+i); 

                            }

                            for (var i = 13; i >= 0; i--) {
                                
                                addOtherVertex("300g",'/images/ingredients/other/'+ data["other"][i] + "/", 60, 80, 'other'+i); 

                            }

                            for (var i = 4; i >= 0; i--) {
                                
                                addSeafoodVertex("300g",'/images/ingredients/Seafood/'+ data["seafood"][i] + "/", 60, 80, 'seafood'+i); 

                            }

                            for (var i = 26; i >= 0; i--) {
                                
                                addVegetablesVertex("300g",'/images/ingredients/Vegetables/'+ data["vegetables"][i] + "/", 60, 80, 'vegetables'+i); 

                            }

                           for (var i = 18; i >= 0; i--) {
                                
                                addDishesVertex("300g",'/images/ingredients/Dishes/'+ data["dishes"][i] + "/", 60, 80, 'dishes'+i); 

                            }

                           for (var i = 17; i >= 0; i--) {
                                
                                addDessertsVertex("300g",'/images/ingredients/Desserts/'+ data["desserts"][i] + "/", 60, 80, 'desserts'+i); 

                            }

                        }   
                });


                //addVertex(null,'/images/rounded.gif', 100, 40, 'shape=rounded');
                //addVertex(null,'/images/ellipse.gif', 40, 40, 'shape=ellipse');
                //addVertex(null,'/images/rhombus.gif', 40, 40, 'shape=rhombus');
                //addVertex(null,'/images/triangle.gif', 40, 40, 'shape=triangle');
                //addVertex(null,'/images/cylinder.gif', 40, 40, 'shape=cylinder');
                //addVertex(null,'/images/actor.gif', 30, 40, 'shape=actor');


                

            

                $.ajax({
                        
                            type: "GET",
                            url: "/home/",
                            dataType: 'text',
                            success: function(data){
                                var json = JSON.parse(data)
                                var items = json["title"]
                                var parseItems = JSON.parse(items)
                                var length = parseItems.length
                                

                                console.log(length)

                                for (var i = length - 1; i >= 0; i--) {

                                    var title = parseItems[i]["title"]
                                    var pkTitle = "/openGraph/" + parseItems[i]["id"]
                                    var pkDelete = "/deleteGraph/" + parseItems[i]["id"]

                                    var titleButton="<input type=\"button\" data-dismiss=\"modal\" class = \"openGraph btn btn-success\" value=\""+title+"\" id="+pkTitle+"/\>";

                                    //var deleteButton= "<input type=\"button\" data-toggle=\"modal\" data-target=\"#myModal\"  type=\"button\" class = \"deleteGraph btn btn-danger\" value=\"Delete\" id="+pkDelete+"/\>";

                                    if(!$("#currentTitle").val())
                                    {
                                        $("#currentTitle").attr('value', $("#openedGraphTitle").val())

                                    }

                                    /*if (!$("#currentTitle").val())
                                    {
                                            $("#currentTitle").val("Untitled graph")
                                    }*/

                                    $("#graphList").append("<tr> <td>" + titleButton + "</td> </tr>")// + "</td> <td>" + deleteButton + "</td> </tr>")

                                    
                                     //if ($("#loadAllTitles").find('#' + $.escapeSelector(pkTitle + '/')).length == 0)
                                    /*$("#graphButton").append("<td> <input type = button class = openGraph \
                                        value =" + title + "id=" + id + "> </td> \
                                        <td> <input type = button class = deleteGraph value = Delete id={% url 'deleteGraph' title=titles.id %}> </td>")*/
                                }

                                //alert(xml22)
                                //alert("hi")
                                //console.log(graph)
                                //var xmlDoc = data[0]

                                //graph.getModel().beginUpdate();
                                /*var xmlDoc = mxUtils.parseXml(xml22);
                                //var xmlDoc = mxUtils.load("/saveData/").getXml();
                                //console.log("xmlDoc " + xmlDoc)
                                var node = xmlDoc.documentElement;
                                //console.log("node " + node)
                                var dec = new mxCodec(node.ownerDocument);
                                //console.log("dec " + dec)
                                //console.log("graph model " + graph.getModel())
                                dec.decode(node, graph.getModel());
                                
                                //graph.fit()*/
                            }
                        });

                        $(document).ready(function(){ 
                        $('#searchSubmit').on('click',function(event){
                            event.preventDefault();
                            

                           $.ajax({    
                                    type: "POST",
                                    url: /search/,
                                    dataType: 'text',
                                    headers:{
                                        "X-CSRFToken": csrftoken
                                    },
                                    data:{
                                        'searchEngine': $('#searchEngine').val()
                                        },
                                    success: function(data){
                                            


                                            document.getElementById("noResults").innerHTML = "";
                                            var json = JSON.parse(data)
                                            console.log(json)
                                            
                                            //console.log(length)
                                            //console.log(directory)
                                            //alert("test")
                                            var result = json[0]['results']
                                            console.log(result)


                                           

                                            var addSearchVertex = function(label, icon, w, h, style)
                                            {
                                                var vertex = new mxCell(label, new mxGeometry(0, 0, w, h), style);
                                                vertex.setVertex(true);
                                            
                                                addToolbarItem(graph, toolbarsearchEngine, vertex, icon);


                                            };

                                            if(result){

                                                var length = json[0]['length']
                                                var directory = json[0]['file_direc']

                                                console.log(length)

                                                document.getElementById("noResults").innerHTML = "";
                                                var dir = directory.replace(/fastcookapp/,'');
                                                var cat = dir.split('/')[3]
                                                var ingredient = dir.split('/')[4]
                                                ingredient = ingredient.replace('.png','')
                                                var catLowerCase = cat.toLowerCase()


                                                if(catLowerCase == "equipment"){
                                                    clearToolbar()
                                                    addSearchVertex("60 minutes", dir, 60,80, catLowerCase+length)

                                                }
                                                    

                                                else if(ingredient == "tablespoon"){
                                                    clearToolbar()
                                                    addSearchVertex("1 tbsp", '/images/ingredients/measurement/tablespoon.png/', 60,80, 'measurement0')

                                                }


                                                else if(ingredient == "teaspoon"){
                                                    clearToolbar()
                                                    addSearchVertex("1 tsp", '/images/ingredients/measurement/teaspoon.png/', 60,80, 'measurement1')
                                                }

                                                else if(ingredient == "cup"){
                                                    clearToolbar()
                                                    addSearchVertex("1 cup", '/images/ingredients/measurement/scoop.png/', 60,80, 'measurement2')
                                                }

                                                else if(ingredient == "cup"){
                                                    clearToolbar()
                                                    addSearchVertex("1 cup", '/images/ingredients/measurement/cup.png/', 60,80, 'measurement3')
                                                }

                                                else if(ingredient == "ruler"){
                                                    clearToolbar()
                                                    addSearchVertex("1 inch", '/images/ingredients/measurement/ruler.png/', 60,80, 'measurement4')
                                                }

                                                else{
                                                    //clearToolbar()
                                                    /*toolbarsearchEngine = new mxToolbar(searchToolbar);
                                                    toolbarsearchEngine.enabled = false*/
                                                    console.log(catLowerCase+length)
                                                    clearToolbar()
                                                    addSearchVertex("300g", dir, 60,80, catLowerCase+length)
                                                    
                                                    //toolbarsearchEngine.destroy()
                                                }
                                        }

                                        else{
                                            //$("#noResults").empty()
                                            //clearToolbar(toolbarsearchEngine)
                                            clearToolbar()
                                            $("#noResults").append("</br> There are no results to be found ")
                                            //$("#noResults").empty()

                                        }

                                            
                                    }
                            });

                            
                        });


                         
                     });

                                $(document).ready(function()
                                            {
                                               $('#categoryImage').on('click',function(event){
                                                        clearToolbar()


                                                }) 
                                            })




            //opens graph
            //alert($("#openedGraphxml").val())
           

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
            form.setAttribute("target", "_blank")

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

            var rating = document.createElement("input")
            rating.setAttribute("type", "hidden")
            rating.setAttribute("name", "rating")
            rating.setAttribute("value", onStar)
            form.appendChild(rating)

            for(var key in params) {
                if(params.hasOwnProperty(key)) {
                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", key);
                    //console.log(key)
                    hiddenField.setAttribute("value", params[key]);

                    form.appendChild(hiddenField);
                }
            }

            document.body.appendChild(form);
            form.submit();
        }

        /*function loadStyleSheet(graph) {
            
            var groupStyle = new Object();
            groupStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
            groupStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            groupStyle[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
            groupStyle[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
            groupStyle[mxConstants.STYLE_FILLCOLOR] = '#6666ff';
            groupStyle[mxConstants.STYLE_STROKECOLOR] = '#7f7fff';
            groupStyle[mxConstants.STYLE_FONTCOLOR] = '#000000';
            groupStyle[mxConstants.STYLE_OPACITY] = '85';
            groupStyle[mxConstants.STYLE_STARTSIZE] = '30';
            groupStyle[mxConstants.STYLE_FONTSIZE] = '20';
            graph.getStylesheet().putCellStyle('group', groupStyle);

            var edge = graph.getStylesheet().getDefaultEdgeStyle();
            edge[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
            edge[mxConstants.STYLE_STROKEWIDTH] = '2';
            edge[mxConstants.STYLE_ROUNDED] = true;
            //edge[mxConstants.STYLE_EDGE] = mxEdgeStyle.OrthConnector;

            //edge[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;


            var style = [];
            var measurementStyle = [];
            var dir = "/loadIcons/";
            var fileextension = ".png";
            $.ajax({
                //This will retrieve the contents of the folder if the folder is configured as 'browsable'
                url: dir,
                success: function (data) {
                    //console.log(data["images"][i])

                    for (var i = 3; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;    
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/Equipment/'+ data["equipment"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('equipment' + i, style[i]);
                    }

                    for (var i = 4; i >= 0; i--) {
                        measurementStyle[i] = new Object();
                    }
                    
                    measurementStyle[0][mxConstants.STYLE_IMAGE] = '/images/ingredients/Measurement/tablespoon.png/';
                    measurementStyle[1][mxConstants.STYLE_IMAGE] = '/images/ingredients/Measurement/teaspoon.png/';
                    measurementStyle[2][mxConstants.STYLE_IMAGE] = '/images/ingredients/Measurement/scoop.png/';
                    measurementStyle[3][mxConstants.STYLE_IMAGE] = '/images/ingredients/Measurement/cup.png/';
                    measurementStyle[4][mxConstants.STYLE_IMAGE] = '/images/ingredients/Measurement/ruler.png/';

                    for (var i = 4; i >= 0; i--) {
                        
                        measurementStyle[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        measurementStyle[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        measurementStyle[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        measurementStyle[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('measurement' + i, measurementStyle[i]);
                    }

                    for (var i = 4; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;

                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/Bakery/'+ data["bakery"][i] + "/";
                        //style[i][mxConstants.VERTEX_SELECTION_COLOR] =  '#00FF00'

                        console.log(data["bakery"][i])
                        //console.log(style[i][mxConstants.STYLE_IMAGE])
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('rounded' + i, style[i]);


                        console.log(style[i][mxConstants.STYLE_IMAGE])
                    }

                    for (var i = 3; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/Berries/'+ data["berries"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('berries' + i, style[i]);
                    }

                    for (var i = 2; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/Dairies/'+ data["dairies"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('dairies' + i, style[i]);
                    }

                    for (var i = 19; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/Fruits/'+ data["fruits"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('fruits' + i, style[i]);
                    }

                    for (var i = 8; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/Meat/'+ data["meat"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('meat' + i, style[i]);
                    }

                    for (var i = 3; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/Nut/'+ data["nut"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('nut' + i, style[i]);
                    }

                    for (var i = 26; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/Vegetables/'+ data["vegetables"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('vegetables' + i, style[i]);
                    }

                    for (var i = 4; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/Seafood/'+ data["seafood"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('seafood' + i, style[i]);
                    }

                    for (var i = 13; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/other/'+ data["other"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('other' + i, style[i]);
                    }

                    for (var i = 17; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/Desserts/'+ data["desserts"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('desserts' + i, style[i]);
                    }

                    for (var i = 18; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/Dishes/'+ data["dishes"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('dishes' + i, style[i]);
                    }



                    //List all .png file names in the page
                    /*$(data).find("a:contains(" + fileextension + ")").each(function () {
                        var filename = this.href.replace(window.location.host, "").replace("http://", "");
                        $("body").append("<img src='" + dir + filename + "'>");
                    });
                    openGraph(graph);
                }
            });

                /*var style = new Object();

                style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                style[mxConstants.STYLE_IMAGE] = '/images/icons/flour.png';
                style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;



                var style2 = new Object();

                style2[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                style2[mxConstants.STYLE_IMAGE] = '/images/icons/whisk.png';
                style2[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;                

                //graph.getStylesheet().putCellStyle('rounded2', style);

                graph.getStylesheet().putCellStyle('rounded3', style2);

                var style3 = new Object();

                style3[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                style3[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;

                graph.getStylesheet().putCellStyle('text', style3);

                var style4 = new Object();

                style4[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                style4[mxConstants.STYLE_IMAGE] = '/images/block_end.gif';

                style4[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;

                graph.getStylesheet().putCellStyle('connector', style4);
        }*/

        function openGraph(graph){
            var xmlDoc1 = mxUtils.parseXml($("#openedGraphxml").val());
            var node1 = xmlDoc1.documentElement;
            var dec1 = new mxCodec(node1.ownerDocument);
            dec1.decode(node1, graph.getModel());
        }

        
        function addToolbarButton(editor, topToolbar, action, label, image, isTransparent)
        {
            var button = document.createElement('button');

            button.setAttribute('class', 'toolbarButton');

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
            topToolbar.appendChild(button);
        };

        function clearToolbar()
        {
            //
            //toolbar = new mxToolbar(searchToolbar);
            //toolbar.enabled = false



            //toolbarsearchEngine = new mxToolbar(searchToolbar);
            //toolbarsearchEngine.enabled = false
            var mxToolbarModes = $('#searchToolbar').find('.mxToolbarMode')
            Array.prototype.forEach.call( mxToolbarModes, function( node ) {
                
                    //console.log(mxToolbarModes[0])
                    node.parentNode.removeChild( node );
                
                //node.parentNode.removeChild( node );
                //mxToolbarModes[0].parentNode.removeChild(mxToolbarModes[0]);

                //
            });




            /*var nodes = document.querySelectorAll('.mxToolbarMode');
            var first = nodes[0];
            var last = nodes[nodes.length- 1];
            last.parentNode.removeChild( last );
            console.log(nodes.length)*/
        }



