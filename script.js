let webstore = new Vue({
    el: '#lessonstore',
    data: {
        titlename: 'Booking Lessons',
        lesson1: {
            image: 'Images/music.png',
            title: 'Music Lesson',
            location: 'South West London',
            price: 25,
            availability: 5
        },
        lesson2: {
            image: 'Images/maths.png',
            title: 'Maths Lesson',
            location: 'North London',
            price: 20,
            availability: 5
        },

    }
});