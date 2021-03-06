/** -*- compile-command: "jslint-cli osgUtil.js" -*-
 * Authors:
 *  Tuan.kuranes <tuan.kuranes@gmail.com> Jerome Etienne <Jerome.etienne@gmail.com>
 */


 /*
 *  TODO: Add stats & reports for developper per application  finer calibration (max, min, average)
 *  TODO: Debug Mode: check if not putting object twice, etc.
 *  USAGE: osg.memoryPools.stateGraph = new OsgObjectMemoryPool(osg.StateGraph).grow(50);
 */
var OsgObjectMemoryPool = function(pooledObjectClassName) {
        return {
            _memPool: [],
            reset: function() {
                this._memPool = [];
                return this;
            },
            put: function(obj) {
                this._memPool.push(obj);
            },
            get: function() {
                if(this._memPool.length > 0) return this._memPool.pop();
                this.grow();
                return this.get();
            },
            grow: function(sizeAdd) {
                if(sizeAdd === undefined) sizeAdd = (this._memPool.length > 0) ? this._memPool.length * 2: 20;
                var i = this._memPool.length;
                while(i++ < sizeAdd) this._memPool.push(new pooledObjectClassName());
                return this;
            }
        };
    };

 /*
 *  TODO: the same for  TypedArrays.
 *  TODO: Add stats reports for developper per application  finer calibration (max, min, average)
 *  TODO: Debug Mode: check if not putting object twice, etc.
 *  USAGE: osg.memoryPools.arrayPool = new OsgArrayMemoryPool();
 *  mymatrix = osg.memoryPools.arrayPool.get(16);
 *  // do use matrix, etc..
 *  osg.memoryPools.arrayPool.put(mymatrix);
 */
 var OsgArrayMemoryPool = function(){
        return {
            _mempoolofPools: [],
            reset: function() {
                this._memPoolofPools = {};
                return this;
            },
            put: function(obj) {
                if(!this._memPoolofPools[obj.length])
                    this._memPoolofPools[obj.length] = [];
                this._memPoolofPools[obj.length].push(obj);
            },
            get: function(arraySize) {
                if(!this._memPoolofPools[arraySize])
                    this._memPoolofPools[arraySize] = [];
                else if(this._memPoolofPools.length > 0)
                    return this._memPool.pop();
                this.grow(arraySize);
                return this.get();
            },
            grow: function(arraySize, sizeAdd) {
                if(sizeAdd === undefined) sizeAdd = (this._memPool.length > 0) ? this._memPool.length * 2: 20;
                var i = this._memPool.length;
                while(i++ < sizeAdd) this._memPool.push(new Array(arraySize));
                return this;
            }
        };
    };
