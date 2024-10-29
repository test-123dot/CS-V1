let webstore = new Vue({
    el: '#lessonstore',
    data: {
        showLesson: true,
        titlename: 'Booking Lessons',
        lessons: lessons,
        cart: [],
        ascending: true,
        sortBy: ''
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
    },
    computed: {
        cartItemCount: function () {
            return this.cart.length || "";
        },
        itemsLeft() {
            return this.lesson.availability - this.cartCounter;
        },
        sortedArray() {
            let sortedLessons = this.lessons;

            sortedLessons = sortedLessons.sort((a, b) => {
                if (this.sortBy === 'alphabeticallySubject') {
                    if (a.title.toLowerCase() < b.title.toLowerCase())
                        return -1;
                    if (a.title.toLowerCase() > b.title.toLowerCase())
                        return 1;
                    return 0;
                }
                else if (this.sortBy === 'alphabeticallyLocation') {
                    if (a.location.toLowerCase() < b.location.toLowerCase())
                        return -1;
                    if (a.location.toLowerCase() > b.location.toLowerCase())
                        return 1;
                    return 0;
                }
                else if (this.sortBy === 'lowPrice') {
                    return a.price - b.price
                }
                else if (this.sortBy === 'lowAvailability') {
                    return a.availability - b.availability
                }
            })
            if (!this.ascending) {
                sortedLessons.reverse()
            }
            return sortedLessons
        }
    }
});