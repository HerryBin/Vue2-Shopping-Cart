/**
 * Created by xianrongbin on 2017/4/7.
 */
new Vue({
    el: '.container',
    data: {
        limitNum: 3,
        addressList: [],
        shippingMethod: false,
        currentIndex: 0
    },
    mounted: function () {
        if (this.$nextTick()) {
            this.addressView();
        }
    },
    computed: {
        //vue2 中去掉了很多Vue种的filter，希望用原生JS
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        addressView: function () {
            this.$http.get('data/address.json').then(function (res) {
                this.addressList = res.body.result;
            });
        },
        setDefaultAddress: function (addressId) {
            this.addressList.forEach(function (address, index) {
                if (address.addressId == addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            });
        }
    }
});