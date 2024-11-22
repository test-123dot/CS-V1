let webstore = new Vue({
    el: '#lessonstore',
    data: {
        showLesson: true,
        titlename: 'Booking Lessons',
        lessons: [],
        cart: [],
        ascending: true,
        sortBy: '',
        searchQuery: '',
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
            console.log('Attempting to remove item with ID:', itemId);
            let cartItemIndex = this.cart.findIndex(item => item.id === itemId);
            console.log('Cart item index:', cartItemIndex);

            if (cartItemIndex > -1) {
                let cartItem = this.cart[cartItemIndex];
                console.log('Current cart item:', cartItem);

                if (cartItem.quantity > 1) {
                    cartItem.quantity--;
                    console.log('Decreased quantity:', cartItem.quantity);
                } else {
                    this.cart.splice(cartItemIndex, 1);
                    console.log('Removed item from cart:', cartItem);
                }

                let lesson = this.lessons.find(lesson => lesson._id === itemId);
                if (lesson) {
                    lesson.availability++;
                    console.log('Updated lesson availability:', lesson.availability);
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
                    lessonId: this.cart.map(item => ({
                        id: item.id,
                        quantity: item.quantity
                    })),
                }),
            });

            if (response.ok) {
                alert('Order submitted!');

                for (const item of this.cart) {
                    const lessonId = item.id;
                    const purchasedQuantity = item.quantity;


                    const lessonResponse = await fetch(`http://localhost:3000/lessons`);
                    const lessons = await lessonResponse.json();
                    const lesson = lessons.find(lesson => lesson._id === lessonId);
                    const newAvailability = lesson.availability - purchasedQuantity;

                    const updateResponse = await fetch(`http://localhost:3000/update/${lessonId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            availability: newAvailability,
                        }),
                    });

                    const updateResult = await updateResponse.json();
                    console.log('Update response:', updateResult);
                }
                this.cart = []; // Clear cart after submission

                this.order = {
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
                };
            }
            else {
                alert('Error submitting order');
            }
        },
        validateName(field) {
            this.order[field] = this.order[field].replace(/[^a-zA-Z]/g, '');
        },
        validatePhone() {
            this.order.phoneNum = this.order.phoneNum.replace(/[^0-9]/g, '');
        },
        async fetchSearchResults() {
            const response = await fetch(`http://localhost:3000/search?q=${this.searchQuery}`);
            this.lessons = await response.json();
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
        webstore.lessons = await response.json();
    },
});