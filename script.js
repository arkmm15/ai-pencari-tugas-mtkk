const apiKey = "AIzaSyBb8FweBj8ejXAmUctKxDhA_xWANWPfXrU";
const cx = "03b3ef786b8034413";

const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  const data = await res.json();

  resultsDiv.innerHTML = "";
  if (data.items) {
    data.items.forEach(item => {
      const div = document.createElement("div");
      div.className = "result";
      div.innerHTML = `
        <a href="${item.link}" target="_blank"><h3>${item.title}</h3></a>
        <p>${item.snippet}</p>
      `;
      resultsDiv.appendChild(div);
    });
  } else {
    resultsDiv.innerHTML = "<p>Tidak ada hasil ditemukan.</p>";
  }
});