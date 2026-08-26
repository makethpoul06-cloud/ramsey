const searchButtons = document.querySelectorAll('.search-btn');
const searchIcon = document.querySelector('.search-icon');
const categories = document.querySelectorAll('.category');
const listingCards = document.querySelectorAll('.card');
const favorites = document.querySelectorAll('.favorite');
const profile = document.querySelector('.profile-dropdown');
const profileMenu = document.querySelector('.profile-menu');
const signIn = document.querySelector('.sign-in');
const signUp = document.querySelector('.sign-up');
const signOut = document.querySelector('.sign-out');
const destinationButton = searchButtons[0];
const existingPicker = document.querySelector('.city-picker');
const destinationPicker = existingPicker || document.createElement('div');
const datePicker = document.querySelector('.date-picker');
const guestPicker = document.querySelector('.guest-picker');
const cities = window.airbnbCities || ['Nairobi', 'Mombasa', 'Zanzibar', 'Cape Town', 'Cairo', 'Kigali'];

destinationPicker.className = 'city-picker';
destinationPicker.setAttribute('role', 'listbox');
if (!destinationPicker.hasChildNodes()) {
  destinationPicker.innerHTML = cities
    .map((city) => `<button type="button" class="city-option" role="option">${city}</button>`)
    .join('');
}
destinationButton.parentElement.classList.add('destination-control');
if (!destinationPicker.parentElement) {
  destinationButton.parentElement.append(destinationPicker);
}

if (!existingPicker) {
  destinationButton.addEventListener('click', (event) => {
    event.stopPropagation();
    document.querySelectorAll('.city-picker').forEach((item) => item.classList.remove('visible'));
    destinationPicker.classList.toggle('visible');
  });
}

if (!existingPicker) {
  destinationPicker.querySelectorAll('.city-option').forEach((option) => {
    option.addEventListener('click', () => {
      destinationButton.textContent = option.textContent;
      destinationPicker.classList.remove('visible');
    });
  });
}

document.addEventListener('click', () => {
  destinationPicker.classList.remove('visible');
});

if (!datePicker) {
  searchButtons[1].addEventListener('click', () => {
    const dates = window.prompt('Which dates work for you?', searchButtons[1].textContent);
    if (dates?.trim()) {
      searchButtons[1].textContent = dates.trim();
    }
  });
}

if (!guestPicker) {
  searchButtons[2].addEventListener('click', () => {
    const guests = window.prompt('How many guests?', searchButtons[2].textContent);
    if (guests?.trim()) {
      searchButtons[2].textContent = guests.trim();
    }
  });
}

searchIcon.addEventListener('click', () => {
  window.alert(`Searching for ${searchButtons[0].textContent}, ${searchButtons[1].textContent}, for ${searchButtons[2].textContent}.`);
});

categories.forEach((category) => {
  category.addEventListener('click', () => {
    const selectedCategory = category.textContent.trim().toLowerCase();
    categories.forEach((item) => item.classList.remove('active'));
    category.classList.add('active');
    listingCards.forEach((card) => {
      card.hidden = !card.dataset.category.includes(selectedCategory);
    });
  });
});

favorites.forEach((favorite, index) => {
  const storageKey = `airbnb-favorite-${index}`;
  const updateFavorite = (isFavorite) => {
    favorite.textContent = isFavorite ? '\u2665' : '\u2661';
    favorite.classList.toggle('selected', isFavorite);
    favorite.setAttribute('aria-pressed', String(isFavorite));
  };

  updateFavorite(localStorage.getItem(storageKey) === 'true');
  favorite.setAttribute('role', 'button');
  favorite.setAttribute('tabindex', '0');
  favorite.setAttribute('aria-label', 'Save listing');

  const toggleFavorite = () => {
    const isFavorite = favorite.getAttribute('aria-pressed') !== 'true';
    localStorage.setItem(storageKey, String(isFavorite));
    updateFavorite(isFavorite);
  };

  favorite.addEventListener('click', toggleFavorite);
  favorite.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleFavorite();
    }
  });
});

if (!profile.dataset.ready) {
  profile.addEventListener('click', () => {
    const isOpen = profile.classList.toggle('open');
    profile.setAttribute('aria-expanded', String(isOpen));
  });

  profile.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      profile.click();
    }
  });

  profileMenu.addEventListener('click', (event) => event.stopPropagation());

  signIn.addEventListener('click', () => {
    const email = window.prompt('Enter your email to sign in:');
    if (email?.trim()) {
      localStorage.setItem('airbnb-user', email.trim());
      signIn.textContent = `Signed in as ${email.trim()}`;
      profile.classList.remove('open');
    }
  });

  signUp.addEventListener('click', () => {
    window.alert('Sign up is ready through the registration page.');
  });

  signOut.addEventListener('click', () => {
    localStorage.removeItem('airbnb-user');
    signIn.textContent = 'Sign in';
    profile.classList.remove('open');
    window.alert('You have been signed out.');
  });

  const signedInUser = localStorage.getItem('airbnb-user');
  if (signedInUser) {
    signIn.textContent = `Signed in as ${signedInUser}`;
  }
}

document.querySelector('.host-link').addEventListener('click', () => {
  window.alert('Hosting tools are coming soon.');
});