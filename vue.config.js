module.exports = {
    css: {
      loaderOptions: {
        less: {
            javascriptEnabled: true
        }
      }
    },

    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          bypass: function (req, res, proxyOptions) {
            if (req.headers.accept.indexOf('html') !== -1) {
              console.log('Skipping proxy for browser request.');
              return '/index.html';
            }else if(process.env.MOCK !== "none"){
              const name = req.path.split('/api/')[1].split('/').join('_')
              const mock =  require(`./mock/${name}`)
              // /api/dashboard/chart?ID=123456',
              // dashboard_chart
              // dashboard_chart.js
              // D:\vue_study\hello-world\vue.config.js
              // D:\vue_study\hello-world\mock\dashboard_chart.js

              delete require.cache[require.resolve(`./mock/${name}`)] 
              const result = mock(req.method)
              return res.send(result)

            }
          },
        },
      },
    },
  }