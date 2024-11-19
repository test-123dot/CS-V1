let webstore = new Vue({
    el: '#lessonstore',
    data: {
        showLesson: true,
        titlename: 'Booking Lessons',
        lessons: [],
        cart: [],
        ascending: true,
        sortBy: '',
        order: {
            firstName: '',
            lastName: '',
            phoneNum: '',
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
            let cartItem = this.cart.find(item => item.id === lesson._id);

            if (this.canAddToCart(lesson) && lesson.availability > 0) {
                if (cartItem) {
                    cartItem.quantity++;
                } else {
                    this.cart.push({ id: lesson._id, quantity: 1 });
                }
                lesson.availability--;
            }
        },
        showCheckout() {
            this.showLesson = !this.showLesson;
        },
        canAddToCart(lesson) {
            return lesson.availability > 0;
        },
        cartCount(id) {
            let cartItem = this.cart.find(item => item.id === id);
            const count = cartItem ? cartItem.quantity : 0;
            return count;
        },
        removeFromCart(itemId) {
            let cartItemIndex = this.cart.findIndex(item => item.id === itemId);

            if (cartItemIndex > -1) {
                let cartItem = this.cart[cartItemIndex];

                if (cartItem.quantity > 1) {
                    cartItem.quantity--;
                } else {
                    this.cart.splice(cartItemIndex, 1);
                }

                let lesson = this.lessons.find(lesson => lesson._id === itemId);
                if (lesson) {
                    lesson.availability++;
                }
            }
        },
        async submitForm() {
            const response = await fetch("http://localhost:3000/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: this.order.firstName,
                    lastName: this.order.lastName,
                    phoneNum: this.order.phoneNum,
                    lessonId: this.cart.map(item => item.id),
                    availability: this.cart.map(item => {
                        let lesson = this.lessons.find(lesson => lesson._id === item.id);
                        return lesson ? lesson.availability : null;
                    })
                }),
            });

            if (response.ok) {
                alert('Order submitted!');
                this.cart = []; // Clear cart after submission
            } else {
                alert('Error submitting order');
            }
        },
        validateName(field) {
            this.order[field] = this.order[field].replace(/[^a-zA-Z]/g, '');
        },
        validatePhone() {
            this.order.phoneNum = this.order.phoneNum.replace(/[^0-9]/g, '');
        },
    },
    computed: {
        cartItems() {
            return this.cart.map(item => {
                let lesson = this.lessons.find(lesson => lesson._id === item.id);
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
        sortedArray() {
            let sortedLessons = this.lessons;

            sortedLessons = sortedLessons.sort((a, b) => {
                if (this.sortBy === 'alphabeticallySubject') {
                    if (a.title.toLowerCase() < b.title.toLowerCase())
                        return -1;
                    if (a.title.toLowerCase() > b.title.toLowerCase())
                        return 1;
                    return 0;
                } else if (this.sortBy === 'alphabeticallyLocation') {
                    if (a.location.toLowerCase() < b.location.toLowerCase())
                        return -1;
                    if (a.location.toLowerCase() > b.location.toLowerCase())
                        return 1;
                    return 0;
                } else if (this.sortBy === 'lowPrice') {
                    return a.price - b.price
                } else if (this.sortBy === 'lowAvailability') {
                    return a.availability - b.availability
                }
            })
            if (!this.ascending) {
                sortedLessons.reverse()
            }
            return sortedLessons
        }
    },
    async mounted() {
        const response = await fetch("http://localhost:3000/lessons");
        this.lessons = await response.json();
    },
    async updateLesson(lessonId, updatedData) {
        const response = await fetch(`http://localhost:3000/lessons/${lessonId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (response.ok) {
            const updatedLesson = await response.json();
            const index = this.lessons.findIndex(lesson => lesson._id === lessonId);
            if (index !== -1) {
                this.$set(this.lessons, index, updatedLesson);
            }
        } else {
            alert('Error updating lesson');
        }
    }
});