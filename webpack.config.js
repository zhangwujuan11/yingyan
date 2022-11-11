const path = require('path');
module.exports = {
	    entry: "./src/main.js",
		output: {
		        // 输出目录
		        path: path.resolve(__dirname,'dist'),
		        // 公共路径前缀
		        filename: 'main.js',
		    },
	 module:{
	   rules:[{
	     test: /\.wasm$/,
	     type: "webassembly/async"
	   }]
	 },
	 experiments: {
	   asyncWebAssembly: true,
	   syncWebAssembly: true
	 },
	 mode: "development"
}