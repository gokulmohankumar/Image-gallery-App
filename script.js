document.addEventListener('DOMContentLoaded', () => {
    const accesskey = 'dZrPEy6SdVPdG4SE7B2yx3u3ftW-WHZ2BNbtGCkc6Rs';
    const formEl = document.getElementById("form");
    const inputEl = document.getElementById("search-input");
    const searchresults = document.querySelector(".search-results");
    const showmore = document.getElementById("showmore");
    const selectImage = document.querySelector('.select-image');
    const inputFile = document.querySelector('#file');
    const gallery = document.querySelector('.Gallery-items');
    let page = 1;
    // Image Search Function
    async function searchimages() {
        const inputdata = inputEl.value;
        console.log('Search query:', inputdata);  // Debugging line
    
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`;
    
        console.log('API URL:', url);  // Debugging line
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('API response:', data);  // Debugging line
    
            displayResults(data.results);
    
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    }
    
    function displayResults(results) {
        if (page === 1) {
            searchresults.innerHTML = "";
        }
    
        results.forEach(result => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('search-result');
    
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
    
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = '_blank';
            imageLink.textContent = result.alt_description;
    
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchresults.appendChild(imageWrapper);
        });
    
        page++;
    
        if (page > 1) {
            showmore.style.display = "block";
        }
    }

    // Event listener for form submission
    if (formEl) {
        formEl.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log('Form submitted');  // Debugging line
            page = 1;
            searchimages();
        });
    }

    // Event listener for "Show More" button
    if (showmore) {
        showmore.addEventListener("click", (event) => {
            event.preventDefault();
            console.log('Show more clicked');  // Debugging line
            searchimages();
        });
    }

    // Event listener for selecting an image
    selectImage.addEventListener('click', () => {
        inputFile.click();
    });

    // Event listener for when a file is selected
    inputFile.addEventListener('change', function () {
        const image = this.files[0];
        if (image.size < 2000000) { // 2MB
            const reader = new FileReader();
            reader.onload = () => {
                const imgUrl = reader.result;
                const img = document.createElement('img');
                img.src = imgUrl;
                img.classList.add('Gallery-item');

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.innerText = 'X';

                const imgWrapper = document.createElement('div');
                imgWrapper.classList.add('Gallery-item-wrapper');
                imgWrapper.appendChild(img);
                imgWrapper.appendChild(deleteBtn);

                gallery.appendChild(imgWrapper);

                deleteBtn.addEventListener('click', () => {
                    imgWrapper.remove();
                });
            };
            reader.readAsDataURL(image);
        } else {
            alert("Image size more than 2MB");
        }
    });

    // Remove image when delete button is clicked
    gallery.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const imgWrapper = event.target.parentElement;
            imgWrapper.remove(); // Remove the entire wrapper (image + delete button)
        }
    });
});
