/**
 * Created by xianrongbin on 2017/4/4.
 */
var vm = new Vue({
    el: '#app',
    data: {
        showModal: false,
        productList: [],
        totalMoney: 0,
        isSelectAll: false,
        confirmDelete: false,
        readyToDelIndex: -1
    },
    filters: {
        //局部过滤器
        formatMoney: function (value, quantity) {
            if (!quantity) {
                quantity = 1;
            }
            return "¥ " + (value * quantity).toFixed(2) + "元";
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        })

    },
    methods: {
        cartView: function () {
            //初始化商品信息
            var _this = this;
            this.$http.get('data/cart.json', {
                'id': 123
            }).then(function (res) {
                var result = res.body.result;
                _this.productList = result.list;
                this.calcTotalMoney();
            });
        },
        changeQuantity: function (productItem, operation) {
            //改变物品数量
            if (operation > 0) {
                productItem.productQuantity++;
            } else {
                productItem.productQuantity--;
                if (productItem.productQuantity <= 0) {
                    productItem.productQuantity = 1;
                }
            }
            this.calcTotalMoney();
        },
        selectedProduct: function (productItem) {
            //单个商品选择
            //如果对象里的不存在某个属性
            if (productItem.isChecked == void 0) {
                // Vue.set(productItem,"isChecked",true); 全局這測器
                this.$set(productItem, "isChecked", true)
            } else {
                var t1 = productItem.isChecked;
                productItem.isChecked = !t1;
            }

            this.isCheckAll();
            this.calcTotalMoney();
        },
        isCheckAll: function () {
            let flag = true;
            this.productList.forEach(function (item) {
                if (!item.checked) {
                    flag = false;
                }
            })
            if (flag) {
                this.checkAll = true;
            } else {
                this.checkAll = false;
            }

        },
        selectedAll: function (isCheck) {
            //全选 全不选操作
            this.isSelectAll = isCheck;
            this.productList.forEach(function (item) {
                if (typeof item.isChecked == "undefined") {
                    Vue.set(item, "isChecked", isCheck);
                } else {
                    item.isChecked = isCheck;
                }
            });

            this.calcTotalMoney();
        },
        calcTotalMoney: function () {
            //总金额计算
            let totalMoney = 0;
            this.productList.forEach(function (item) {
                if (item.isChecked) {
                    totalMoney += item.productPrice * item.productQuantity;
                }
            });
            this.totalMoney = totalMoney;
        },
        delConfirm: function (productItem) {
            //单个物品删除 是否删除确认框
            this.showModal = true;
            this.currentProduct = productItem;
        },
        delCurrentProduct: function () {
            this.showModal = false;
            var index = this.productList.indexOf(this.currentProduct);
            this.productList.splice(index, 1);
            this.calcTotalMoney();
        }
    }
});

Vue.filter('money', function (value, type) {
    return '¥' + value.toFixed(2) + type;
});