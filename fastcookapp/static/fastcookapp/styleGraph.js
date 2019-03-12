function loadStyleSheet(graph, sharedXml) {
            
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
                console.log(data)
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

                    var style3 = new Object();

                    style3[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                    style3[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;

                    graph.getStylesheet().putCellStyle('text', style3);

                    var style4 = new Object();

                    style4[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                    style4[mxConstants.STYLE_IMAGE] = '/images/block_end.gif';

                    style4[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;

                    graph.getStylesheet().putCellStyle('connector', style4);

                    //var sharedXml = $("#sharedXMLData").val()

                    var sharedXmlDoc = mxUtils.parseXml(sharedXml);
                    var sharedNode = sharedXmlDoc.documentElement;
                    var sharedDec = new mxCodec(sharedNode.ownerDocument);
                    sharedDec.decode(sharedNode, graph.getModel());

                }
            });

        
                
        }
