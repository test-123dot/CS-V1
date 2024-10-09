let webstore = new Vue({
    el: '#lessonstore',
    data: {
        titlename: 'Booking Lessons',
        lesson1: {
            id: 1001,
            image: 'Images/music.png',
            title: 'Music Lesson',
            location: 'South West London',
            price: 25,
            availability: 5,
            outofstock: 'There are no more items in stock'
        },
        lesson2: {
            id: 1002,
            image: 'Images/maths.png',
            title: 'Maths Lesson',
            location: 'North London',
            price: 20,
            availability: 5
        },
        cart: [],
    },
    methods: {
        addItem: function () {
            this.cart.push(this.lesson1.id);
        }
    },
    computed: {
        cartCounter: function () {
            return this.cart.length || "";
        },
        canAddItem: function () {
            return this.lesson1.availability > this.cartCounter;
        }
    }
});