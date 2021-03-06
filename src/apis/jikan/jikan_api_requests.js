import jikan from "./jikan";

export const getAnimeBySearch = async (q) => {
  const { data } = await jikan.get("/anime", {
    method: "GET",
    params: {
      q: q,
    },
  });
  return data.data;
};

export const getAnimeById = async (id) => {
  try {
    const { data: animeById } = await jikan.get(`/anime/${id}/full`);
    if (animeById) {
      if (animeById.error) throw new Error("Timeout");
      return animeById;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAnimePicturesById = async (id) => {
  try {
    const { data: pictures } = await jikan.get(`/anime/${id}/pictures`);
    if (pictures) {
      if (pictures.error) throw new Error("Timeout");
      return pictures;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAnimeCharactersById = async (id) => {
  try {
    const { data: charactersByAnime } = await jikan.get(
      `/anime/${id}/characters`
    );
    if (charactersByAnime) {
      if (charactersByAnime.error) throw new Error("Timeout");
      return charactersByAnime;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAnimeRecommendationsById = async (id) => {
  try {
    const { data: animeRecommendations } = await jikan.get(
      `anime/${id}/recommendations`
    );
    if (animeRecommendations) {
      if (animeRecommendations.error) throw new Error("Timeout");
      return animeRecommendations;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTopAnime = async () => {
  try {
    const { data: topAnime } = await jikan.get("/top/anime");
    if (topAnime) {
      if (topAnime.error) throw new Error("Timeout");
      return topAnime;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTopManga = async () => {
  try {
    const { data: topManga } = await jikan.get("/top/manga");
    if (topManga) {
      if (topManga.error) throw new Error("Timeout");
      return topManga;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTopCharacters = async () => {
  try {
    const { data: top25Characters } = await jikan.get("/top/characters");
    if (top25Characters) {
      if (top25Characters.error) throw new Error("Timeout");
      return top25Characters;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAnimeReviewsById = async (id) => {
  try {
    const { data: animeReviews } = await jikan.get(`anime/${id}/reviews`);
    if (animeReviews) {
      if (animeReviews.error) throw new Error("Timeout");
      return animeReviews;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMangaById = async (id) => {
  try {
    const { data: manga } = await jikan.get(`manga/${id}/full`);
    if (manga) {
      if (manga.error) throw new Error("Timeout");
      return manga;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMangaPicturesById = async (id) => {
  try {
    const { data: pictures } = await jikan.get(`/manga/${id}/pictures`);
    if (pictures) {
      if (pictures.error) throw new Error("Timeout");
      return pictures;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMangaCharactersById = async (id) => {
  try {
    const { data: charactersByManga } = await jikan.get(
      `/manga/${id}/characters`
    );
    if (charactersByManga) {
      if (charactersByManga.error) throw new Error("Timeout");
      return charactersByManga;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMangaRecommendationsById = async (id) => {
  try {
    const { data: mangaRecommendations } = await jikan.get(
      `manga/${id}/recommendations`
    );
    if (mangaRecommendations) {
      if (mangaRecommendations.error) throw new Error("Timeout");
      return mangaRecommendations;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMangaBySearch = async (q) => {
  try {
    const { data: mangaResults } = await jikan.get("/manga", {
      method: "GET",
      params: {
        q: q,
      },
    });
    if (mangaResults) {
      if (mangaResults.error) throw new Error("Timeout");
      return mangaResults.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCharacterById = async (id) => {
  try {
    const { data: character } = await jikan.get(`characters/${id}/full`);
    if (character) {
      if (character.error) throw new Error("Timeout");
      return character.data;
    }
  } catch (e) {
    throw e;
  }
};

export const getCharacterPicturesById = async (id) => {
  try {
    const { data: charPictures } = await jikan.get(`characters/${id}/pictures`);
    if (charPictures) {
      if (charPictures.error) throw new Error("Timeout");
      return charPictures.data;
    }
  } catch (e) {
    throw e;
  }
};

export const getPeopleById = async (id) => {
  try {
    const { data: person } = await jikan.get(`people/${id}/full`);
    if (person) {
      if (person.error) throw new Error("Timeout");
      return person.data;
    }
  } catch (e) {
    throw e;
  }
};

export const getCharacterBySearch = async (q) => {
  try {
    const { data: characters } = await jikan.get("/characters", {
      params: {
        q: q,
      },
    });
    if (characters) {
      return characters.data;
    }
  } catch (e) {
    throw e;
  }
};

export const getPeopleBySearch = async (q) => {
  try {
    const { data: people } = await jikan.get("/people", {
      params: {
        q: q,
      },
    });
    if (people) {
      return people.data;
    }
  } catch (e) {
    throw e;
  }
};
