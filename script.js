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
        },
        sortedProducts() {
            function subjectABC(a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase())
                    return -1;
                if (a.title.toLowerCase() > b.title.toLowerCase())
                    return 1;
                return 0;
            }
            function subjectZYX(a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase())
                    return 1;
                if (a.title.toLowerCase() > b.title.toLowerCase())
                    return -1;
                return 0;
            }
            function priceAscending(a, b) {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
            }
            function priceDescending(a, b) {
                if (a.price > b.price) return -1;
                if (a.price < b.price) return 1;
                return 0;
            }
            function lowAvailability(a, b) {
                if (a.availability > b.availability) return 1;
                if (a.availability < b.availability) return -1;
                return 0;
            }
            function highAvailability(a, b) {
                if (a.availability > b.availability) return -1;
                if (a.availability < b.availability) return 1;
                return 0;
            }
            return this.lessons.sort();
        }
    }
});