/**
 * 
 */

mainApp.controller('mainpageController' , function($scope, FileUploader, userSrv,$rootScope , $http){
		$scope.uploader = new FileUploader();
		$scope.visible = false;
		$scope.folder = {name: ''};
		
		console.log($scope.item);
	       $scope.upload = function () {
	    	   
	       }
	       $rootScope.hide = true;
	       $rootScope.showCarousel = false;
	       
	       console.log($scope.item);
	       
	       //show the form
	       $scope.showForm = function(){

	       	if($scope.visible == false){
	       		$scope.visible = true;
	       	   
	       		
	       		
	       	}else{
	       		
	       		$scope.visible = false;
	       	}
	       	
	       	
	       }
	       
	       //get name
	       $scope.addName = function(){
	    	   console.log($scope.folder.name);
	       }
	       
	       
	       
	 //tree logic      
	       
	addExpandAllCollapseAll($scope);
	$scope.treeData = null;
	$http.get("smalltree.js").success(function (data) {
		console.log(data)
		$scope.treeData = data;
	});
	$scope.drop = function (targetNode, sourceNode, sourceParentNode) {
		var children = sourceParentNode.children;
		for (var i = 0 ; i < children.length ; i++) {
			if (children[i] == sourceNode) {
				children.splice(i, 1);
				if (!targetNode.children) {
					targetNode.children = [];
				}
				targetNode.children.push(sourceNode);
				break;
			}
		}
	}
})


function addExpandAllCollapseAll($scope) {
        function rec(nodes, action) {
            for (var i = 0 ; i < nodes.length ; i++) {
                action(nodes[i]);
                if (nodes[i].children) {
                    rec(nodes[i].children, action);
                }
            }
        }
        $scope.collapseAll = function () {
            rec($scope.treeData, function (node) {
                node.collapsed = true;
            });
        };
        $scope.expandAll = function () {
            rec($scope.treeData, function (node) {
                node.collapsed = false;
            });
        };
    }


    /* ---------- functions used to build the sample trees ------------- */

    function addChild(parent, label) {
        if (!parent.children) {
            parent.children = [];
        }
        var newNode = {
            label: label,
            collapsed: false
        };
        parent.children.push(newNode);
        return newNode;
    }
    function addChildren(parent, labels) {
        for (var i = 0 ; i < labels.length ; i++) {
            addChild(parent, labels[i]);
        }
    }

    function smallTree() {
        var root = {
            label: "root"
        };
        var folderA = addChild(root, "folder A");
        var folderB = addChild(folderA, "folder B");
        var folderC = addChild(root, "folder C");
        var folderD = addChild(folderC, "folder D");
        folderD.collapsed = true;
        var folderE = addChild(folderD, "folder E");
        var folderF = addChild(folderC, "folder F");
        var folderG = addChild(root, "folder G");
        var folderH = addChild(root, "folder H");
        addChildren(folderA, ["file A1", "file A2", "file A3", "file A4"]);
        addChildren(folderB, ["file B1", "file B2"]);
        addChildren(folderC, ["file C1"]);
        addChildren(folderE, ["file E1", "file E2", "file E3"]);
        addChildren(folderF, ["file F1", "file F2"]);
        addChildren(folderG, ["file G1", "file G2", "file G3", "file G4"]);
        addChildren(folderH, ["file H1", "file H2", "file H3"]);
        return [root];
    }

    function buildTree() {
        var maxLevel = 6;
        var size = 2;
        var root = {};
        recursiveAddChildren(maxLevel, 0, size, root, "A");
        return root.children;

        function recursiveAddChildren(maxLevel, currentLevel, size, parent, prefix) {
            for (var i = 0 ; i < size ; i++) {
                var label = (currentLevel < maxLevel ? "Folder" : "File")
                    + ' ' + prefix + i;
                var node = addChild(parent, label);
                if (currentLevel < maxLevel) {
                    recursiveAddChildren(maxLevel, currentLevel + 1, size, node, prefix + i);
                }
            }
        }
}
    mainApp.directive('frangTree', function ($parse, $animate) {
        return {
            restrict: 'EA',
            controller: function($scope, $element) {
                this.insertChildren = null;
                this.init = function(insertChildren) {
                    this.insertChildren = insertChildren;
                };
            }
        };
    })

    .directive('frangTreeRepeat', function ($parse, $animate) {

        // ---------- Some necessary internal functions from angular.js ----------

        function hashKey(obj) {
            var objType = typeof obj,
                key;

            if (objType == 'object' && obj !== null) {
                if (typeof (key = obj.$$hashKey) == 'function') {
                    // must invoke on object to keep the right this
                    key = obj.$$hashKey();
                } else if (key === undefined) {
                    key = obj.$$hashKey = nextUid();
                }
            } else {
                key = obj;
            }

            return objType + ':' + key;
        }
        function isArrayLike(obj) {
            if (obj == null || isWindow(obj)) {
                return false;
            }

            var length = obj.length;

            if (obj.nodeType === 1 && length) {
                return true;
            }

            return isString(obj) || isArray(obj) || length === 0 ||
                typeof length === 'number' && length > 0 && (length - 1) in obj;
        }
        function isWindow(obj) {
            return obj && obj.document && obj.location && obj.alert && obj.setInterval;
        }
        function isString(value){return typeof value == 'string';}
        function isArray(value) {
            return toString.apply(value) == '[object Array]';
        }
        var uid               = ['0', '0', '0'];
        function nextUid() {
            var index = uid.length;
            var digit;

            while(index) {
                index--;
                digit = uid[index].charCodeAt(0);
                if (digit == 57 /*'9'*/) {
                    uid[index] = 'A';
                    return uid.join('');
                }
                if (digit == 90  /*'Z'*/) {
                    uid[index] = '0';
                } else {
                    uid[index] = String.fromCharCode(digit + 1);
                    return uid.join('');
                }
            }
            uid.unshift('0');
            return uid.join('');
        }
        function assertNotHasOwnProperty(name, context) {
            if (name === 'hasOwnProperty') {
                throw ngMinErr('badname', "hasOwnProperty is not a valid {0} name", context);
            }
        }
        var jqLite = angular.element;
        var forEach = angular.forEach;

        function minErr(module) {
            return function () {
                var code = arguments[0],
                    prefix = '[' + (module ? module + ':' : '') + code + '] ',
                    template = arguments[1],
                    templateArgs = arguments,
                    stringify = function (obj) {
                        if (isFunction(obj)) {
                            return obj.toString().replace(/ \{[\s\S]*$/, '');
                        } else if (isUndefined(obj)) {
                            return 'undefined';
                        } else if (!isString(obj)) {
                            return JSON.stringify(obj);
                        }
                        return obj;
                    },
                    message, i;

                message = prefix + template.replace(/\{\d+\}/g, function (match) {
                    var index = +match.slice(1, -1), arg;

                    if (index + 2 < templateArgs.length) {
                        arg = templateArgs[index + 2];
                        if (isFunction(arg)) {
                            return arg.toString().replace(/ ?\{[\s\S]*$/, '');
                        } else if (isUndefined(arg)) {
                            return 'undefined';
                        } else if (!isString(arg)) {
                            return toJson(arg);
                        }
                        return arg;
                    }
                    return match;
                });

                message = message + '\nhttp://errors.angularjs.org/' + version.full + '/' +
                    (module ? module + '/' : '') + code;
                for (i = 2; i < arguments.length; i++) {
                    message = message + (i == 2 ? '?' : '&') + 'p' + (i-2) + '=' +
                        encodeURIComponent(stringify(arguments[i]));
                }

                return new Error(message);
            };
        }


        // ---------- Some initializations at the beginning of ngRepeat factory ----------

        var NG_REMOVED = '$$NG_REMOVED';
        var ngRepeatMinErr = minErr('ngRepeat');
        var ngMinErr = minErr('ng');
        var toString = Object.prototype.toString;
        var isFunction = angular.isFunction;
        var isUndefined = angular.isUndefined;
        var toJson = angular.toJson;

        // ---------- Internal function at the end of ngRepeat factory ----------

        function getBlockElements(block) {
            if (block.startNode === block.endNode) {
                return jqLite(block.startNode);
            }

            var element = block.startNode;
            var elements = [element];

            do {
                element = element.nextSibling;
                if (!element) break;
                elements.push(element);
            } while (element !== block.endNode);

            return jqLite(elements);
        }


        // ---------- Add watch, extracted into a function to call it not only on the element but also on its children ----------

        function addRepeatWatch($scope, $element, _lastBlockMap, valueIdentifier, keyIdentifier,
                                rhs, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn, linker, expression) {
            var lastBlockMap = _lastBlockMap;

            //watch props
            $scope.$watchCollection(rhs, function ngRepeatAction(collection){
                var index, length,
                    previousNode = $element[0],     // current position of the node
                    nextNode,
                // Same as lastBlockMap but it has the current state. It will become the
                // lastBlockMap on the next iteration.
                    nextBlockMap = {},
                    arrayLength,
                    childScope,
                    key, value, // key/value of iteration
                    trackById,
                    trackByIdFn,
                    collectionKeys,
                    block,       // last object information {scope, element, id}
                    nextBlockOrder = [],
                    elementsToRemove;


                if (isArrayLike(collection)) {
                    collectionKeys = collection;
                    trackByIdFn = trackByIdExpFn || trackByIdArrayFn;
                } else {
                    trackByIdFn = trackByIdExpFn || trackByIdObjFn;
                    // if object, extract keys, sort them and use to determine order of iteration over obj props
                    collectionKeys = [];
                    for (key in collection) {
                        if (collection.hasOwnProperty(key) && key.charAt(0) != '$') {
                            collectionKeys.push(key);
                        }
                    }
                    collectionKeys.sort();
                }

                arrayLength = collectionKeys.length;

                // locate existing items
                length = nextBlockOrder.length = collectionKeys.length;
                for(index = 0; index < length; index++) {
                    key = (collection === collectionKeys) ? index : collectionKeys[index];
                    value = collection[key];
                    trackById = trackByIdFn(key, value, index);
                    assertNotHasOwnProperty(trackById, '`track by` id');
                    if(lastBlockMap.hasOwnProperty(trackById)) {
                        block = lastBlockMap[trackById]
                        delete lastBlockMap[trackById];
                        nextBlockMap[trackById] = block;
                        nextBlockOrder[index] = block;
                    } else if (nextBlockMap.hasOwnProperty(trackById)) {
                        // restore lastBlockMap
                        forEach(nextBlockOrder, function(block) {
                            if (block && block.startNode) lastBlockMap[block.id] = block;
                        });
                        // This is a duplicate and we need to throw an error
                        throw ngRepeatMinErr('dupes', "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}",
                            expression,       trackById);
                    } else {
                        // new never before seen block
                        nextBlockOrder[index] = { id: trackById };
                        nextBlockMap[trackById] = false;
                    }
                }

                // remove existing items
                for (key in lastBlockMap) {
                    // lastBlockMap is our own object so we don't need to use special hasOwnPropertyFn
                    if (lastBlockMap.hasOwnProperty(key)) {
                        block = lastBlockMap[key];
                        elementsToRemove = getBlockElements(block);
                        $animate.leave(elementsToRemove);
                        forEach(elementsToRemove, function(element) { element[NG_REMOVED] = true; });
                        block.scope.$destroy();
                    }
                }

                // we are not using forEach for perf reasons (trying to avoid #call)
                for (index = 0, length = collectionKeys.length; index < length; index++) {
                    key = (collection === collectionKeys) ? index : collectionKeys[index];
                    value = collection[key];
                    block = nextBlockOrder[index];
                    if (nextBlockOrder[index - 1]) previousNode = nextBlockOrder[index - 1].endNode;

                    if (block.startNode) {
                        // if we have already seen this object, then we need to reuse the
                        // associated scope/element
                        childScope = block.scope;

                        nextNode = previousNode;
                        do {
                            nextNode = nextNode.nextSibling;
                        } while(nextNode && nextNode[NG_REMOVED]);

                        if (block.startNode == nextNode) {
                            // do nothing
                        } else {
                            // existing item which got moved
                            $animate.move(getBlockElements(block), null, jqLite(previousNode));
                        }
                        previousNode = block.endNode;
                    } else {
                        // new item which we don't know about
                        childScope = $scope.$new();
                    }

                    childScope[valueIdentifier] = value;
                    if (keyIdentifier) childScope[keyIdentifier] = key;
                    childScope.$index = index;
                    childScope.$first = (index === 0);
                    childScope.$last = (index === (arrayLength - 1));
                    childScope.$middle = !(childScope.$first || childScope.$last);
                    childScope.$odd = !(childScope.$even = index%2==0);

                    if (!block.startNode) {
                        linker(childScope, function(clone) {
                            clone[clone.length++] = document.createComment(' end ngRepeat: ' + expression + ' ');
                            $animate.enter(clone, null, jqLite(previousNode));
                            previousNode = clone;
                            block.scope = childScope;
                            block.startNode = previousNode && previousNode.endNode ? previousNode.endNode : clone[0];
                            block.endNode = clone[clone.length - 1];
                            nextBlockMap[block.id] = block;
                        });
                    }
                }
                lastBlockMap = nextBlockMap;
            });
        }


        return {
            restrict: 'A',
            transclude: 'element',
            priority: 1000,
            terminal: true,
            require: '^frangTree',
            compile: function(element, attr, linker) {
                return function($scope, $element, $attr, ctrl){
                    var expression = $attr.frangTreeRepeat;
                    var match = expression.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),
                        trackByExp, trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn,
                        lhs, rhs, valueIdentifier, keyIdentifier,
                        hashFnLocals = {$id: hashKey};

                    if (!match) {
                        throw ngRepeatMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
                            expression);
                    }

                    lhs = match[1];
                    rhs = match[2];
                    trackByExp = match[4];

                    if (trackByExp) {
                        trackByExpGetter = $parse(trackByExp);
                        trackByIdExpFn = function(key, value, index) {
                            // assign key, value, and $index to the locals so that they can be used in hash functions
                            if (keyIdentifier) hashFnLocals[keyIdentifier] = key;
                            hashFnLocals[valueIdentifier] = value;
                            hashFnLocals.$index = index;
                            return trackByExpGetter($scope, hashFnLocals);
                        };
                    } else {
                        trackByIdArrayFn = function(key, value) {
                            return hashKey(value);
                        }
                        trackByIdObjFn = function(key) {
                            return key;
                        }
                    }

                    match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                    if (!match) {
                        throw ngRepeatMinErr('iidexp', "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.",
                            lhs);
                    }
                    valueIdentifier = match[3] || match[1];
                    keyIdentifier = match[2];

                    // Store a list of elements from previous run. This is a hash where key is the item from the
                    // iterator, and the value is objects with following properties.
                    //   - scope: bound scope
                    //   - element: previous element.
                    //   - index: position
                    var lastBlockMap = {};


                    addRepeatWatch($scope, $element, /*lastBlockMap*/ {}, valueIdentifier, keyIdentifier,
                        rhs, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn, linker, expression);

                    ctrl.init(function ($scope, $element, collection) {
                        addRepeatWatch($scope, $element, /*lastBlockMap*/ {}, valueIdentifier, keyIdentifier,
                            collection, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn, linker, expression)
                    });
                };

            }
        };
    })

    .directive('frangTreeInsertChildren', function () {
        return {
            restrict: 'EA',
            require: '^frangTree',
            link: function (scope, element, attrs, ctrl) {
                var comment = document.createComment('treeRepeat');
                element.append(comment);

                ctrl.insertChildren(scope, angular.element(comment), attrs.frangTreeInsertChildren);
            }
        };
    })

    
    //show Form  function
