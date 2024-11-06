let webstore = new Vue({
    el: '#lessonstore',
    data: {
        showLesson: true,
        titlename: 'Booking Lessons',
        lessons: lessons,
        cart: [],
        ascending: true,
        sortBy: '',
        order: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            postcode: '',
            country: '',
            method: 'Home',
            sendGift: 'Send as a gift',
            dontSendGift: 'Do not send as a gift'
        }
    },
    methods: {
        addToCart(lesson) {
            const cartItem = this.cart.find(item => item.id === lesson.id);
            if (cartItem) {
                if (this.canAddToCart(lesson)) {
                    cartItem.quantity++;
                }
            } else {
                this.cart.push({ id: lesson.id, quantity: 1 });
            }
        },
        showCheckout() {
            this.showLesson = !this.showLesson;
        },
        canAddToCart(lesson) {
            return lesson.availability > this.cartCount(lesson.id);
        },
        cartCount(id) {
            const cartItem = this.cart.find(item => item.id === id);

            return cartItem ? cartItem.quantity : 0;
        },
        removeFromCart(itemId) {
            const cartItemIndex = this.cart.findIndex(item => item.id === itemId);

            if (cartItemIndex > -1) {
                const cartItem = this.cart[cartItemIndex];
                if (cartItem.quantity > 1) {
                    cartItem.quantity--;
                } else {
                    this.cart.splice(cartItemIndex, 1);
                }
            }
        },
        submitForm() {
            alert('Order submitted!')
        }
    },
    computed: {
        cartItems() {
            return this.cart.map(item => {
                const lesson = this.lessons.find(lesson => lesson.id === item.id);
                return {
                    ...lesson, quantity: item.quantity
                };
            }).filter(item => item);
        },
        cartItemCount() {
            return this.cart.reduce((total, item) => total + item.quantity, 0);
        },
        totalPrice() {
            return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
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