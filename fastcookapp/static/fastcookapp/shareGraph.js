

function main()
        {            
            // Defines an icon for creating new connections in the connection handler.
            // This will automatically disable the highlighting of the source vertex.
            //mxConnectionHandler.prototype.connectImage = new mxImage("/images/connector.gif", 16, 16);
            //var mxPopupMenuShowMenu = mxPopupMenu.prototype.showMenu;
            //mxDefaultPopupMenu.prototype.addItems = function(editor){editor = editor};

            //mxPopupMenu.prototype.addItem = function(</td><td class=PParameter nowrap>title,</td></tr><tr><td></td><td class=PParameter nowrap>image,</td></tr><tr><td></td><td class=PParameter nowrap>funct,</td></tr><tr><td></td><td class=PParameter nowrap>parent,</td></tr><tr><td></td><td class=PParameter nowrap>iconCls,</td></tr><tr><td></td><td class=PParameter nowrap>enabled</td><td class=PAfterParameters nowrap>)
            //console.log(mxPopupMenu.prototype.itemCount)

            $(document).ready(function(){
  
          
          /* 2. Action to perform on click */
          
            onStar = parseInt($(this).data('value'), 10); // The star currently selected
            // pass onstar to value of share.

            var stars = $('#stars li').parent().children('li.star');
            
            
            
            for (i = 0; i < $("#rating").val(); i++) {
              $(stars[i]).addClass('selected');
            }
            
            
          });


            $('#share').on('click',function(event){
                var encoder = new mxCodec();
                var node = encoder.encode(sharedGraph.getModel());
                xml = mxUtils.getXml(node)
                post('/share/', {sharedXMLData:xml});

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
                
                // Creates the model and the sharedGraph inside the container
                // using the fastest rendering available on the browser
                var sharedModel = new mxGraphModel();
                var sharedEditor = new mxEditor();

                sharedContainer = document.getElementById('sharedContainer');
                var sharedGraph = new mxGraph(sharedContainer, sharedModel);
                sharedGraph.dropEnabled = true;

                sharedGraph.setEnabled(false);

                loadStyleSheet(sharedGraph)


                /*var sharedDiagramContainerClass = document.getElementsByClassName("diagramContainer")
                var sharedDiagramContainer = sharedDiagramContainerClass[0]


                document.body.appendChild(sharedDiagramContainer);
                sharedDiagramContainer.appendChild(sharedContainer)*/

                


            }

            

        }



        function loadStyleSheet(graph) {
            
            var groupStyle = new Object();
            groupStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
            groupStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            groupStyle[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
            groupStyle[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
            groupStyle[mxConstants.STYLE_FILLCOLOR] = '#FF9103';
            groupStyle[mxConstants.STYLE_GRADIENTCOLOR] = '#F8C48B';
            groupStyle[mxConstants.STYLE_STROKECOLOR] = '#E86A00';
            groupStyle[mxConstants.STYLE_FONTCOLOR] = '#000000';
            groupStyle[mxConstants.STYLE_ROUNDED] = true;
            groupStyle[mxConstants.STYLE_OPACITY] = '80';
            groupStyle[mxConstants.STYLE_STARTSIZE] = '30';
            groupStyle[mxConstants.STYLE_FONTSIZE] = '16';
            groupStyle[mxConstants.STYLE_FONTSTYLE] = 1;
            graph.getStylesheet().putCellStyle('group', groupStyle);

            var edge = graph.getStylesheet().getDefaultEdgeStyle();
            edge[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
            edge[mxConstants.STYLE_STROKEWIDTH] = '2';
            edge[mxConstants.STYLE_ROUNDED] = true;
            //edge[mxConstants.STYLE_EDGE] = mxEdgeStyle.OrthConnector;
            
            var style = [];
            var test = [];
            var measurementStyle = [];
            var dir = "/loadIcons/";
            var fileextension = ".png";
            $.ajax({
                //This will retrieve the contents of the folder if the folder is configured as 'browsable'
                type: "GET",
                url: dir,
                success: function (data) {
                    //alert("hey")
                //var test = [];
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

                    for (var i = 18; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/dishes/'+ data["dishes"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('dishes' + i, style[i]);
                    }

                    for (var i = 17; i >= 0; i--) {
                        style[i] = new Object();
                        style[i][mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[i][mxConstants.STYLE_IMAGE] = '/images/ingredients/desserts/'+ data["desserts"][i] + "/";
                        style[i][mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
                        style[i][mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        style[i][mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        graph.getStylesheet().putCellStyle('desserts' + i, style[i]);
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

                    openGraph(graph)

                }
            });

        
                
        }


        function openGraph(sharedGraph){
            var sharedXml = $("#sharedXMLData").val()
                //console.log("hellooo" + sharedXml)
                var sharedXmlDoc = mxUtils.parseXml(sharedXml);
                var sharedNode = sharedXmlDoc.documentElement;
                var sharedDec = new mxCodec(sharedNode.ownerDocument);
                sharedDec.decode(sharedNode, sharedGraph.getModel());
        }

        function addToolbarItem(sharedGraph, toolbar, prototype, image)
        {
            // Function that is executed when the image is dropped on
            // the sharedGraph. The cell argument points to the cell under
            // the mousepointer if there is one.
            var funct = function(sharedGraph, evt, cell)
            {
                sharedGraph.stopEditing(false);

                var pt = sharedGraph.getPointForEvent(evt);
                var vertex = sharedGraph.getModel().cloneCell(prototype);
                vertex.geometry.x = pt.x;
                vertex.geometry.y = pt.y;
                
                sharedGraph.setSelectionCells(sharedGraph.importCells([vertex], 0, 0, cell));

            }

            // Creates the image which is used as the drag icon (preview)
            var img = toolbar.addMode(null, image, funct);
            mxUtils.makeDraggable(img, sharedGraph, funct);

        }