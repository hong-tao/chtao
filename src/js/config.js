//重点:管理模块之间的依赖性,便于代码的编写和维护
// @配置
require.config({

    //配置短路径(别名)
    paths:{
        jquery:'../lib/jquery-3.1.1',
        common:'../js/common',
        xCarousel:'../lib/jquery-xCarousel/jquery.xcarousel'

    },

    //配置依赖
    shim:{
        //common依赖jquery
        common:['jquery'],
        xCarousel:['jquery']
    }

});

