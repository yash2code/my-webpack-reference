const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // for injecting script tags to html 
                                                          // automatically   
/* const VENDOR_LIBS = [
                'react' , redux', 'react-dom'   // ...etc   // 
] */

const config = {

        entry: {
                
                bundle:'./src/index.js',
               // vendor: VENDOR_LIBS            // load dependencies in separate file vendor.js 
                                                // donot update often so used for caching             
        },

        output:{

                path:path.resolve(__dirname, 'build'),
                filename:'[name].[chunkhash].js',    // it first  creates bundle.js then vendor.js 
                                                     // name -> bundle and vendor
                                                     // chunkhash  -> so that browser detect bundle
                                                                        // to  be redownloaded or not
                publicPath:'build/'
        },
        
        module:{

                rules:[
                        {
                                use:'babel-loader',
                                test:/\.js$/,
                                exclude: /node_modules/
                        },

                        {
                               // use: ['style-loader', 'css-loader'], // runs RTL ( right to left)
                                use: ExtractTextPlugin.extract({
                                        fallback: "style-loader",
                                        use: "css-loader"
                                }),
                                test:/\.css$/
                        },

                        {
                                test: /\.(gif|png|jpe?g|svg)$/i,
                                use: [
                                
                                        {
                                                loader: 'url-loader',
                                                options: {
                                                                limit:40000
                                                         }
                                        },
                                        'image-webpack-loader'
                                ]
                        }
                ]
        },

        plugins: [
                new ExtractTextPlugin("styles.css"),

               /*  new webpack.optimize.CommonsChunkPlugin({            /*
                        names: ['vendor', 'manifest']                                  makes dependencies include only 
                                                                        in vendor not bundle
                })                                                      therefore bundle.js size is reduced
                                                                        manifest -> manifest is added 
                                                                         to detect if vendor needs to be redownloaded 
                                                                        or use it from cache        */                                                   
        ]
};

module.exports = config