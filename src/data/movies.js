const movies = [
    {
      id: 1,
      title: "Inception",
      year: 2010,
      rating: 8.8,
      genre: "Sci-Fi",
      tmdbId: 27205,
    },

    {
      id: 2,
      title: "Interstellar",
      year: 2014,
      rating: 8.7,
      genre: "Sci-Fi",
      tmdbId: 157336,
    },

    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
      rating: 9.0,
      genre: "Action",
      tmdbId: 155,
    },

    {
      id: 6,
      title: "The Notebook",
      year: 2004,
      rating: 8.0,
      genre: "Love",
      tmdbId: 11036,
    },

    {
      id: 7,
      title: "La La Land",
      year: 2016,
      rating: 8.0,
      genre: "Love",
      tmdbId: 313369,
    },

    {
      id: 8,
      title: "About Time",
      year: 2013,
      rating: 7.8,
      genre: "Love",
      tmdbId: 122906,
    },

    {
      id: 9,
      title: "Shutter Island",
      year: 2010,
      rating: 8.2,
      genre: "Thriller",
      tmdbId: 11324,
    },

    {
      id: 10,
      title: "Gone Girl",
      year: 2014,
      rating: 8.1,
      genre: "Thriller",
      tmdbId: 210577,
    },

    {
      id: 11,
      title: "Prisoners",
      year: 2013,
      rating: 8.1,
      genre: "Thriller",
      tmdbId: 146233,
    },

    {
      id: 12,
      title: "The Prestige",
      year: 2006,
      rating: 8.5,
      genre: "Thriller",
      tmdbId: 1124,
    },

    {
      id: 13,
      title: "John Wick",
      year: 2014,
      rating: 7.4,
      genre: "Action",
      tmdbId: 245891,
    },

    {
      id: 14,
      title: "Gladiator",
      year: 2000,
      rating: 8.5,
      genre: "Action",
      tmdbId: 98,
    },

    {
      id: 15,
      title: "Mad Max: Fury Road",
      year: 2015,
      rating: 8.1,
      genre: "Action",
      tmdbId: 76341,
    },

    {
      id: 16,
      title: "Mission: Impossible - Fallout",
      year: 2018,
      rating: 7.7,
      genre: "Action",
      tmdbId: 353081,
    },

    {
      id: 17,
      title: "The Hangover",
      year: 2009,
      rating: 7.7,
      genre: "Comedy",
      tmdbId: 18785,
    },

    {
      id: 18,
      title: "Superbad",
      year: 2007,
      rating: 7.6,
      genre: "Comedy",
      tmdbId: 8363,
    },

    {
      id: 19,
      title: "Home Alone",
      year: 1990,
      rating: 7.7,
      genre: "Comedy",
      tmdbId: 771,
    },

    {
      id: 20,
      title: "Rush Hour",
      year: 1998,
      rating: 7.0,
      genre: "Comedy",
      tmdbId: 2109,
    },

    {
    id: 21,
    title: "Toy Story",
    year: 1995,
    rating: 8.3,
    genre: "Kids",
    tmdbId: 862,
  },

  {
    id: 22,
    title: "Finding Nemo",
    year: 2003,
    rating: 8.2,
    genre: "Kids",
    tmdbId: 12,
  },

  {
    id: 23,
    title: "The Lion King",
    year: 1994,
    rating: 8.5,
    genre: "Kids",
    tmdbId: 8587,
  },

  {
    id: 24,
    title: "Frozen",
    year: 2013,
    rating: 7.4,
    genre: "Kids",
    tmdbId: 109445,
  },

  {
    id: 25,
    title: "Moana",
    year: 2016,
    rating: 7.6,
    genre: "Kids",
    tmdbId: 277834,
  },

  {
    id: 26,
    title: "Kung Fu Panda",
    year: 2008,
    rating: 7.6,
    genre: "Kids",
    tmdbId: 9502,
  },
    
  {
    id: 27,
    title: "Toy Story 2",
    year: 1999,
    rating: 7.9,
    genre: "Animation",
    tmdbId: 863,
  },

  {
    id: 28,
    title: "Toy Story 3",
    year: 2010,
    rating: 8.3,
    genre: "Animation",
    tmdbId: 10193,
  },

  {
    id: 29,
    title: "Toy Story 4",
    year: 2019,
    rating: 7.7,
    genre: "Animation",
    tmdbId: 301528,
  },

  {
    id: 30,
    title: "Monsters, Inc.",
    year: 2001,
    rating: 8.1,
    genre: "Animation",
    tmdbId: 585,
  },

  {
    id: 31,
    title: "Monsters University",
    year: 2013,
    rating: 7.2,
    genre: "Animation",
    tmdbId: 62211,
  },

  {
    id: 32,
    title: "The Incredibles",
    year: 2004,
    rating: 8.0,
    genre: "Animation",
    tmdbId: 9806,
  },

  {
    id: 33,
    title: "The Incredibles 2",
    year: 2018,
    rating: 7.5,
    genre: "Animation",
    tmdbId: 260513,
  },

  {
    id: 34,
    title: "Up",
    year: 2009,
    rating: 8.3,
    genre: "Animation",
    tmdbId: 14160,
  },

  {
    id: 35,
    title: "Inside Out",
    year: 2015,
    rating: 8.1,
    genre: "Animation",
    tmdbId: 150540,
  },

  {
    id: 36,
    title: "Inside Out 2",
    year: 2024,
    rating: 7.6,
    genre: "Animation",
    tmdbId: 1022789,
  },

  {
    id: 37,
    title: "Coco",
    year: 2017,
    rating: 8.4,
    genre: "Animation",
    tmdbId: 354912,
  },

  {
    id: 38,
    title: "Zootopia",
    year: 2016,
    rating: 8.0,
    genre: "Animation",
    tmdbId: 269149,
  },

  {
    id: 39,
    title: "Ratatouille",
    year: 2007,
    rating: 8.1,
    genre: "Animation",
    tmdbId: 2062,
  },

  {
    id: 40,
    title: "Wall-E",
    year: 2008,
    rating: 8.4,
    genre: "Animation",
    tmdbId: 10681,
  },

  {
    id: 41,
    title: "How to Train Your Dragon",
    year: 2010,
    rating: 8.1,
    genre: "Animation",
    tmdbId: 10191,
  },

  {
    id: 42,
    title: "Despicable Me",
    year: 2010,
    rating: 7.6,
    genre: "Animation",
    tmdbId: 20352,
  },

  {
    id: 43,
    title: "Despicable Me 2",
    year: 2013,
    rating: 7.3,
    genre: "Animation",
    tmdbId: 93456,
  },

  {
    id: 44,
    title: "Minions",
    year: 2015,
    rating: 6.4,
    genre: "Animation",
    tmdbId: 211672,
  },

  {
    id: 45,
    title: "Shrek",
    year: 2001,
    rating: 7.7,
    genre: "Animation",
    tmdbId: 808,
  },

  {
    id: 46,
    title: "Shrek 2",
    year: 2004,
    rating: 7.3,
    genre: "Animation",
    tmdbId: 809,
  },

  {
    id: 47,
    title: "Madagascar",
    year: 2005,
    rating: 6.9,
    genre: "Animation",
    tmdbId: 953,
  },

  {
    id: 48,
    title: "Kung Fu Panda 2",
    year: 2011,
    rating: 7.2,
    genre: "Animation",
    tmdbId: 49444,
  },

  {
    id: 49,
    title: "The Secret Life of Pets",
    year: 2016,
    rating: 6.5,
    genre: "Animation",
    tmdbId: 328111,
  },

  {
    id: 50,
    title: "Sing",
    year: 2016,
    rating: 7.1,
    genre: "Animation",
    tmdbId: 335797,
  },


];

export default movies;