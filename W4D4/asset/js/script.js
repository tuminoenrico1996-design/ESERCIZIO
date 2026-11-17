const movies = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    price: 8.5,
    availableSeats: 45,
  },
  {
    id: 2,
    title: "Inception",
    genre: "Sci-Fi",
    price: 9.0,
    availableSeats: 30,
  },
  {
    id: 3,
    title: "Titanic",
    genre: "Romance",
    price: 7.5,
    availableSeats: 60,
  },
  {
    id: 4,
    title: "The Dark Knight",
    genre: "Action",
    price: 9.5,
    availableSeats: 25,
  },
  {
    id: 5,
    title: "Avatar",
    genre: "Fantasy",
    price: 10.0,
    availableSeats: 50,
  },
  {
    id: 6,
    title: "Gladiator",
    genre: "Action",
    price: 8.0,
    availableSeats: 35,
  },
  {
    id: 7,
    title: "The Matrix",
    genre: "Sci-Fi",
    price: 7.0,
    availableSeats: 20,
  },
  {
    id: 8,
    title: "Joker",
    genre: "Drama",
    price: 8.5,
    availableSeats: 15,
  },
  {
    id: 9,
    title: "Oppenheimer",
    genre: "Drama",
    price: 10.5,
    availableSeats: 40,
  },
  {
    id: 10,
    title: "Dune",
    genre: "Sci-Fi",
    price: 9.0,
    availableSeats: 5,
  },
  {
    id: 11,
    title: "The Prestige",
    genre: "Thriller",
    price: 8.0,
    availableSeats: 18,
  },
  {
    id: 12,
    title: "Whiplash",
    genre: "Drama",
    price: 7.5,
    availableSeats: 22,
  },
  {
    id: 13,
    title: "Parasite",
    genre: "Thriller",
    price: 8.5,
    availableSeats: 28,
  },
  {
    id: 14,
    title: "The Lion King",
    genre: "Animation",
    price: 7.0,
    availableSeats: 55,
  },
  {
    id: 15,
    title: "Toy Story",
    genre: "Animation",
    price: 6.5,
    availableSeats: 40,
  },
];

let totalBookedTickets = 0;

function displayMovies() {
  const movieTable = document.getElementById("tabellaFilm");

  movieTable.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = movie.title;

    const genreCell = document.createElement("td");
    genreCell.textContent = movie.genre;

    const priceCell = document.createElement("td");
    priceCell.textContent = movie.price.toFixed(2) + " €";

    const seatsCell = document.createElement("td");

    if (movie.availableSeats === 0) {
      seatsCell.textContent = "SOLD OUT";
      seatsCell.classList.add("sold-out");
    } else {
      seatsCell.textContent = movie.availableSeats;
    }

    row.appendChild(titleCell);
    row.appendChild(genreCell);
    row.appendChild(priceCell);
    row.appendChild(seatsCell);

    movieTable.appendChild(row);
  }
}

function loadMovies() {
  const movieSelect = document.getElementById("film");

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const option = document.createElement("option");

    option.value = movie.id;
    option.textContent = movie.title;

    movieSelect.appendChild(option);
  }
}

function bookTickets(movieId, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return {
      success: false,
      message: "Inserisci una quantità valida di biglietti.",
    };
  }

  const movie = movies.find(function (item) {
    return item.id === Number(movieId);
  });

  if (!movie) {
    return {
      success: false,
      message: "Seleziona un film valido.",
    };
  }

  if (movie.availableSeats < quantity) {
    return {
      success: false,
      message: "Posti insufficienti per questa prenotazione.",
    };
  }

  let totalPrice = movie.price * quantity;
  let discountApplied = false;

  if (quantity >= 5) {
    totalPrice = totalPrice * 0.8;
    discountApplied = true;
  }

  movie.availableSeats -= quantity;
  totalBookedTickets += quantity;

  return {
    success: true,
    message: "Prenotazione effettuata con successo!",
    total: totalPrice,
    discount: discountApplied,
  };
}

document.getElementById("prenota").addEventListener("click", function () {
  const movieId = document.getElementById("film").value;
  const quantityValue = document.getElementById("quantita").value;
  const quantity = Number(quantityValue);

  const messageElement = document.getElementById("messaggio");
  const totalElement = document.getElementById("totale");

  messageElement.textContent = "";
  messageElement.className = "";
  totalElement.textContent = "";

  if (
    quantityValue.trim() === "" ||
    !Number.isInteger(quantity) ||
    quantity <= 0
  ) {
    messageElement.textContent = "Inserisci un numero valido di biglietti.";
    messageElement.classList.add("errore");
    return;
  }

  const bookingResult = bookTickets(movieId, quantity);

  messageElement.textContent = bookingResult.message;

  if (bookingResult.success) {
    messageElement.classList.add("successo");

    totalElement.textContent =
      "Il totale da pagare è " + bookingResult.total.toFixed(2) + " €";

    if (bookingResult.discount) {
      totalElement.textContent += " (sconto del 20% applicato)";
    }

    displayMovies();

    document.getElementById("bigliettiTotali").textContent = totalBookedTickets;
  } else {
    messageElement.classList.add("errore");
  }
});

loadMovies();
displayMovies();
