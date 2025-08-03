const API_KEY = "AIzaSyBb8FweBj8ejXAmUctKxDhA_xWANWPfXrU";
const CX = "03b3ef786b8034413";

async function searchGoogle(query) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.items) {
      displayResults(data.items);
    } else {
      document.getElementById("results").innerHTML = "Tidak ada hasil ditemukan.";
    }
  } catch (err) {
    console.error("Gagal mengambil data:", err);
    document.getElementById("results").innerHTML = "Terjadi kesalahan saat memuat data.";
  }
}

function displayResults(items) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  items.forEach(item => {
    const result = document.createElement("div");
    result.className = "result";
    result.innerHTML = `
      <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
      <p>${item.snippet}</p>
    `;
    container.appendChild(result);
  });
}

document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    searchGoogle(query);
  }
});