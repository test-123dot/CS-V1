let webstore = new Vue({
    el: '#lessonstore',
    data: {
        showLesson: true,
        titlename: 'Booking Lessons',
        lessons: lessons,
        cart: [],
        sortBy: 'ascending'
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
        },
        priceAscending(a, b) {
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
            return 0;
        },
        priceDescending(a, b) {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
        },
        subjectABC(a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase())
                return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase())
                return 1;
            return 0;
        },
        subjectZYX(a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase())
                return 1;
            if (a.title.toLowerCase() > b.title.toLowerCase())
                return -1;
            return 0;
        },
        locationABC(a, b) {
            if (a.location.toLowerCase() < b.location.toLowerCase())
                return -1;
            if (a.location.toLowerCase() > b.location.toLowerCase())
                return 1;
            return 0;
        },
        locationZYX(a, b) {
            if (a.location.toLowerCase() < b.location.toLowerCase())
                return 1;
            if (a.location.toLowerCase() > b.location.toLowerCase())
                return -1;
            return 0;
        },
        lowAvailability(a, b) {
            if (a.availability > b.availability) return 1;
            if (a.availability < b.availability) return -1;
            return 0;
        },
        highAvailability(a, b) {
            if (a.availability > b.availability) return -1;
            if (a.availability < b.availability) return 1;
            return 0;
        }
    },
    computed: {
        cartItemCount: function () {
            return this.cart.length || "";
        },
        itemsLeft() {
            return this.lesson.availability - this.cartCounter;
        },
        sortedArray() {
            let sorted = this.lessons;
            if (this.sortBy == 'ascending') {
                return this.lessons.sort(this.priceAscending);
            } elif(this.sortBy != 'ascending'); {
                return this.lessons.sort(this.priceDescending);
            }
        }
    }
});