const posts = [
    {
        content: 'Amazing landscapes from around the world!',
        images: [
            'https://www.muchbetteradventures.com/magazine/content/images/2021/06/Beautiful-Landscapes-Slovenia.jpg',
            'https://www.muchbetteradventures.com/magazine/content/images/2021/06/Beautiful-landscapes-Iceland.jpg',
            'https://www.muchbetteradventures.com/magazine/content/images/2021/06/Iceland-ice-caves-beautiful-landscapes.jpg',
            'https://www.muchbetteradventures.com/magazine/content/images/2021/06/Fjords-of-Norway-beautiful-landscape.jpg',
            'https://www.muchbetteradventures.com/magazine/content/images/2021/06/Old-Man-of-Storr--Skye-beautiful-landscapes.jpg'
        ]
    },
    {
        content: 'Delicious food from different cuisines.',
        images: [
            'https://c.ndtvimg.com/2021-09/10cgsus8_tacos_625x300_09_September_21.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350',
            'https://i.ndtvimg.com/i/2018-01/moussaka-greek_620x350_81515218290.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350',
            'https://c.ndtvimg.com/2022-01/313l7bq_paella-valencia_625x300_28_January_22.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350',
            'https://i.ndtvimg.com/i/2017-11/irish-stew_620x330_71510573267.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350'
        ]
    },
    {
        content: 'Cute animals that will brighten your day!',
        images: [
            'https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2dldHR5aW1hZ2VzLTE1MDIyNDY3MzUuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9LCJ0b0Zvcm1hdCI6ImF2aWYifX0=',
            'https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2dldHR5aW1hZ2VzLTUyMjYwMzg3Mi5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjgyOH0sInRvRm9ybWF0IjoiYXZpZiJ9fQ==',
            'https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2dldHR5aW1hZ2VzLTEzNDcwNjQ3MjEuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9LCJ0b0Zvcm1hdCI6ImF2aWYifX0=',
            'https://www.ultimatekilimanjaro.com/wp-content/uploads/2024/01/cuteanimals16.webp',
            'https://www.ultimatekilimanjaro.com/wp-content/uploads/2024/01/cuteanimals14.webp'
        ]
    },
    {
        content: 'Impressive architecture from various cultures.',
        images: [
            'https://media.architecturaldigest.com/photos/59a83442a8a79c392f89ea69/master/w_1600,c_limit/GettyImages-567918639.jpg',
            'https://media.architecturaldigest.com/photos/59a834cc0f5802540ef16ecf/master/w_1600,c_limit/GettyImages-104559145.jpg',
            'https://media.architecturaldigest.com/photos/59a837470f5802540ef16f7c/master/w_1600,c_limit/GettyImages-51224767.jpg',
            'https://media.architecturaldigest.com/photos/59a8386ac0ee8e17829881ad/master/w_1600,c_limit/GettyImages-498961543.jpg'
        ]
    },
    {
        content: 'Beautiful artworks from famous painters.',
        images: [
            'https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/starry-night-the-famous-painting-2.jpeg?resize=555%2C462&ssl=1',
            'https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/night-watch-the-famous-painting-2.jpeg?resize=602%2C339&ssl=1',
            'https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/impression-sunrise-1.jpeg?resize=581%2C466&ssl=1',
            'https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/the-liberty-leading-the-people-1.jpeg?resize=525%2C422&ssl=1',
            'https://bookmypainting.com/wp-content/uploads/2019/06/girl-with-a-pearl-earring-the-famous-painting-2.jpeg'
        ]
    }
];

function createPostRow(post, index) {
    const row = document.createElement('tr');

    // Image cell
    const imgCell = document.createElement('td');
    const img = document.createElement('img');
    img.src = post.images[0];
    img.alt = 'Post image';
    imgCell.appendChild(img);
    row.appendChild(imgCell);

    // Content cell
    const contentCell = document.createElement('td');
    const content = document.createElement('p');
    content.textContent = post.content;
    contentCell.appendChild(content);
    row.appendChild(contentCell);

    // Action cell
    const actionCell = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'Stop';
    button.addEventListener('click', () => toggleInterval(button, index));
    actionCell.appendChild(button);
    row.appendChild(actionCell);

    startInterval(index);

    return row;
}

function startInterval(index) {
    const post = posts[index];
    const delay = Math.floor(Math.random() * 5000) + 1000; // 1-5 seconds
    post.interval = setInterval(() => {
        const img = document.querySelectorAll('#feed img')[index];
        const currentIndex = post.images.indexOf(img.src);
        const nextIndex = (currentIndex + 1) % post.images.length;
        img.src = post.images[nextIndex];
    }, delay);
}

function toggleInterval(button, index) {
    const post = posts[index];
    if (post.interval) {
        clearInterval(post.interval);
        post.interval = null;
        button.textContent = 'Start';
    } else {
        startInterval(index);
        button.textContent = 'Stop';
    }
}

function initializeFeed() {
    const feedBody = document.querySelector('#feed tbody');
    posts.forEach((post, index) => {
        feedBody.appendChild(createPostRow(post, index));
    });
}

document.addEventListener('DOMContentLoaded', initializeFeed);