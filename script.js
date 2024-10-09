let webstore = new Vue({
    el: '#lessonstore',
    data: {
        showLesson: true,
        titlename: 'Booking Lessons',
        lessons: lessons,
        cart: [],
    },
    methods: {
        addToCart(lesson) {
            this.cart.push(lesson.id);
        },
        showCheckout(lesson) {
            this.showLesson = this.showLesson ? false : true;
        },
        canAddToCart(lesson) {
            return lesson.availability > this.cartCount(lesson.id);
        },
        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        }
    },
    computed: {
        cartItemCount: function () {
            return this.cart.length || "";
        },
        itemsLeft() {
            return this.lesson.availability - this.cartCounter;
        }
    }
});