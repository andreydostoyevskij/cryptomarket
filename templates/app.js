document.addEventListener('DOMContentLoaded', () => {
const searchInput = document.getElementById('searchInput');
const suggestionList = document.getElementById('suggestions');
// const tableBody = document.getElementById('cryptoTable');

// // Fetch data for table
// fetch('http://localhost:5000/api/cryptocurrencies/map')
//   .then(response => response.json())
//   .then(data => {
//     if (!data || !data.data) {
//       console.error('Invalid data format received:', data);
//       return;
//     }

//     const cryptocurrencies = data.data;
//     cryptocurrencies.forEach(crypto => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${crypto.id}</td>
//         <td>${crypto.name}</td>
//         <td>${crypto.symbol}</td>
//         <td>${crypto.slug}</td>
//         <td>${crypto.rank}</td>
//       `;
//       tableBody.appendChild(row);
//     });
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });

// Search functionality with debounce
let debounceTimeout;
searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    handleSearch();
  }, 300); // Adjust delay
});

async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    suggestionList.innerHTML = '';
    suggestionList.classList.add('hidden');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/search?q=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }
    const suggestions = await response.json();

    // Populate suggestions
    suggestionList.innerHTML = '';
    if (suggestions.length === 0) {
      suggestionList.innerHTML = '<li class=" text-gray-500">No results found</li>';
      suggestionList.classList.remove('hidden');
      return;
    }

    suggestions.forEach((crypto) => {
      const listItem = document.createElement('li');
      listItem.className =
      'crypto-item flex items-center hover:bg-gray-100 cursor-pointer px-2 py-1';
      listItem.innerHTML = `
        <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png" alt="${crypto.name}">
        <span>${crypto.name}</span>
        <span class="text-gray-500 ml-auto">${crypto.symbol}</span>
      `;
      listItem.addEventListener('click', () => {
        searchInput.value = crypto.name;
        suggestionList.innerHTML = '';
        suggestionList.classList.add('hidden');
      });
      suggestionList.appendChild(listItem);
    });

    suggestionList.classList.remove('hidden');
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
}
});
