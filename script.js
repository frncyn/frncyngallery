function loadCharacters() {
    // 1. Fetch the data from the JSON file
    fetch('barbie_character.json')
        .then(response => {
            if (!response.ok) {
                // Throw an error if the HTTP status is not 200 (e.g., 404 Not Found)
                throw new Error('HTTP status: ' + response.statusText);
            }
            return response.json();
        })
        .then(characters => {
            // 2. Identify the target element
            const containerRow = document.getElementById("row1"); 
            containerRow.innerHTML = ''; // Clear any existing content

            // 3. Loop through the array and generate the HTML card for each character
           characters.forEach((character, index) => {
    const imagePath = character.image;

    const cardHTML = `
        <div class="col-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <div class="card shadow-lg" style="width: 100%; animation-delay: ${index * 0.1}s;">
                <img src="${imagePath}" class="card-img-top" alt="${character.name}">
                <div class="card-body">
                    <h5 class="card-title text-barbie-pink">${character.name}</h5>
                    <p class="card-text text-barbie-pink">${character.description}</p>
                </div>
            </div>
        </div>
    `;

    containerRow.innerHTML += cardHTML;
});

        })
        .catch(error => {
            // This catches network errors OR JSON parsing errors (from the "return response.json()")
            console.error('Error loading characters:', error);
            // Display custom error on the page
            const containerRow = document.getElementById("row1");
            if (containerRow) {
                containerRow.innerHTML = '<div class="col-12 text-center text-danger py-4">Failed to load character data. </div>';
            }
        });
}

// Execute the function to start loading the characters
loadCharacters();