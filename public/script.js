const eventCardTemplate = document.querySelector("[event-card-template]");
const eventCardsContainer= document.querySelector(".event-cards");
const searchInput = document.querySelector("#search");

let events = [];


fetch("./raw/events")
  .then((res) => res.json())
  .then((data) => {
    events = data.map(event => {
        // Getting card template and datafield pointers
        const card = eventCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const description = card.querySelector("[data-description]");
        const date = card.querySelector("[data-date]");

        // Filling the text from the json
        header.textContent = event.name;
        description.textContent = event.description;
        date.textContent = new Date(event.date).toLocaleDateString('en-us');

        // Adding the cards to the div for holding cards
        eventCardsContainer.append(card);
        return {
            name: event.name,
            description: event.description,
            date: event.date,
            element: card,
        }
    });
  });
  
  // Event for whenever changes whats in the search bar
  searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      events.forEach(event => {
          const isHidden = !(event.name.toLowerCase().includes(value)
          || event.description.toLowerCase().includes(value));
          event.element.classList.toggle("hide", isHidden);
      });
  })
