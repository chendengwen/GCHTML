// *** 通过define函数定义了一个模块

// 简单的值对
//Inside file my/shirt.js:
// define({
//     color: "green",
//     size: "unisize"
// });

// // 函数式定义
// //my/shirt.js now does setup work
// // 如果一个模块没有任何依赖，但需要一个做setup工作的函数，
// // 则在define()中定义该函数，并将其传给define()
// define(function () {
//     //Do setup work here

//     return {
//         color: "black",
//         size: "unisize"
//     }
// });

// 存在依赖的函数式定义
/*
	如果模块存在依赖：则第一个参数是依赖的名称数组；第二个参数是函数，
	在模块的所有依赖加载完毕后，该函数会被调用来定义该模块，
	因此该模块应该返回一个定义了本模块的object。
	依赖关系会以参数的形式注入到该函数上，参数列表与依赖名称列表一一对应。
*/
//my/shirt.js now has some dependencies, a cart and inventory
define(function() {
        //return an object to define the "my/shirt" module.
        return {
            color: "blue",
            size: "large",

            addToCart: function() {
                console.log(this.color)
            }
        }
    }
);

// 定义一个命名模块
//Explicitly defines the "foo/title" module:
define("foo/title",["my/cart", "my/inventory"],
    function(cart, inventory) {
        //Define foo/title object in here.
        inventory.decrement(this);
        cart.add(this);
    }
);

