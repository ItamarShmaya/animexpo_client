import axios from "axios";

export const url = "https://graphql.anilist.co";

export const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const aniListRequests = async (query, variables, signal) => {
  try {
    const { data } = await axios({
      url,
      method: "POST",
      headers: headers,
      data: {
        query: query,
        variables,
      },
      signal,
    });
    if (data) return data;
    else throw new Error("Unable to fetch data");
  } catch (e) {
    throw e;
  }
};

export const landingPageQuery = `
query ($season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextSeasonYear: Int) {
  trending: Page(page: 1, perPage: 25) {
    media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
      ...media
    }
  }
  thisSeason: Page(page: 1, perPage: 25) {
    media(type: ANIME, sort: POPULARITY_DESC, season: $season, seasonYear: $seasonYear, isAdult: false) {
      ...media
    }
  }
  nextSeason: Page(page: 1, perPage: 25) {
    media(type: ANIME, sort: POPULARITY_DESC, season: $nextSeason, seasonYear: $nextSeasonYear, isAdult: false) {
      ...media
    }
  }
  popular: Page(page: 1, perPage: 25) {
    media(type: ANIME, sort: POPULARITY_DESC) {
      ...media
    }
  }
  top: Page(page: 1, perPage: 25) {
    media(type: ANIME, sort: SCORE_DESC) {
      ...media
    }
  }
  topManga: Page(page: 1, perPage: 25) {
    media(type: MANGA, sort: SCORE_DESC) {
      ...media
    }
  }

  topCharacters: Page(page: 1, perPage: 25) {
    characters(sort: FAVOURITES_DESC) {
      id
      image {
        large
        medium
      }
      name {
        userPreferred
      }
    }
  }
}

fragment media on Media {
  id 
  title {
    english
    userPreferred
  }
  coverImage {
    large 
    medium
  }
  startDate {
    year 
    month 
    day
  }
  endDate {
    year 
    month 
    day
  }
  bannerImage 
  season 
  seasonYear 
  description 
  type 
  format 
  status(version: 2) 
  episodes 
  volumes
  chapters
  duration 
  chapters 
  volumes 
  genres 
  isAdult 
  averageScore 
  popularity 
  nextAiringEpisode {
    airingAt 
    timeUntilAiring 
    episode
  }
  studios(isMain: true) {
    edges {
      isMain 
      node {
        id 
        name
      }
    }  
  }
}
`;

export const animeByIdQuery = `
    query ($id: Int, $type: MediaType) {
      Media(id: $id, type: $type) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          extraLarge
          large
        }
        bannerImage
        description
        averageScore
        rankings {
          rank
          type
          allTime
        }
        format
        episodes
        duration
        status
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        season
        studios {
          edges {
            node {
              name
              id
            }
          }
        }
        source
        genres
        trailer {
          id
        }
        recommendations {
          edges {
            node {
              mediaRecommendation {
                id
                title {
                  english
                }  
                coverImage {
                  large
                }
              }
            }
          }
        }
        characters(sort:[ROLE, RELEVANCE] perPage: 10) {
          edges {
            id
            role
            voiceActors {
              id
              languageV2
              name {
                first
                middle
                last
                full
                native
                userPreferred
              }
              image{
                large
              }
            }
            node {
              id
              name {
                native
                userPreferred
              }
              image {
                large
                medium
              }
            }
          }
        }
      }
    }
    `;

export const mangaByIdQuery = `
    query ($id: Int, $type: MediaType) {
      Media(id: $id, type: $type) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          extraLarge
          large
        }
        bannerImage
        description
        averageScore
        rankings {
          rank
          type
          allTime
        }
        format
        volumes
        chapters
        status
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        source
        genres
        recommendations {
          edges {
            node {
              mediaRecommendation {
                id
                title {
                  english
                }  
                coverImage {
                  large
                }
              }
            }
          }
        }
        characters(sort:ROLE perPage: 10) {
          edges {
            id
            role
            node {
              id
              name {
                native
                userPreferred
              }
              image {
                large
                medium
              }
            }
          }
        }
      }
    }
    `;

export const characterByIdQuery = `
query($id: Int) {
  Character(id: $id) {
    id
    name {
      userPreferred
    }
    dateOfBirth {
      year
      month
      day
    }
    age
    gender
    bloodType
    description
    image {
      large
      medium
    }
    media(sort: POPULARITY_DESC){
      edges {
        characterRole
        node {
          id
          type
          format
          popularity
          startDate {
            year
            month
            day
          }
          favourites
          averageScore
          title {
            english
            userPreferred
          }
          coverImage {
            extraLarge
            large
            medium
          }
          bannerImage
        }
        voiceActors {
          id
          languageV2
          name {
            userPreferred
          }
          image {
            large
            medium
          }
        }
      }
      pageInfo {
        hasNextPage
        currentPage
      }
    }
  }
}
`;

export const characterAppearancesByPage = `
query($id: Int, $page: Int, $perPage: Int) {
  Character(id: $id) {
    id
    media(page: $page, perPage: $perPage, sort: POPULARITY_DESC){
      edges {
        characterRole
        node {
          id
          type
          format
          popularity
          startDate {
            year
            month
            day
          }
          favourites
          averageScore
          title {
            english
            userPreferred
          }
          coverImage {
            extraLarge
            large
            medium
          }
        }
        voiceActors {
          id
          languageV2
          name {
            userPreferred
          }
          image {
            large
            medium
          }
        }
      }
      pageInfo {
        hasNextPage
        currentPage
      }
    }
  }
}
`;

export const staffByIdQuery = `
query($id: Int){
  Staff(id: $id) {
   id
    name {
      native
      userPreferred
    }
    description
    bloodType
    homeTown
    age
    gender
    dateOfBirth {
      year
      month
      day
    }
    dateOfDeath {
      year
      month
      day
    }
    image {
      large
      medium
    }
    characterMedia(sort:POPULARITY_DESC){
      edges {
        node{
          format
          id
          title {
            english
            userPreferred
          }
          favourites
          popularity
          averageScore
          startDate {
            year
            month
            day
          }
          coverImage {
            large
            medium
          }
        }
        characters {
          id
          name {
            userPreferred
          }
          image {
            large
            medium
          }
        }
        characterRole
      }
      pageInfo {
        currentPage
        hasNextPage
      }
    }
  }
}
`;

export const staffCharactersByPage = `
query($id: Int, $page: Int, $perPage: Int){
  Staff(id: $id) {
    id
    characterMedia(page: $page, perPage: $perPage, sort:POPULARITY_DESC){
     edges {
       node{
         format
         id
         title {
           romaji
           english
           native
           userPreferred
         }
         favourites
         popularity
         averageScore
         startDate {
           year
           month
           day
         }
         coverImage {
           extraLarge
           large
           medium
           color
         }
       }
       characters {
         id
         name {
           userPreferred
         }
         image {
           large
           medium
         }
       }
       characterRole
     }
     pageInfo {
       total
       perPage
       currentPage
       lastPage
       hasNextPage
     }
   }
  }
}
`;

export const getMediaBySearchQuery = `
query($search: String, $perPage: Int, $type: MediaType) {
  Page(perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(search: $search, sort:POPULARITY_DESC, type: $type) {
      id
      title {
        english
        userPreferred
      }
      coverImage {
        large
        medium
      }
      averageScore
      genres
      format
      startDate {
        year
        month
        day
      }
    }
  }
}
`;

export const getCharactersBySearchQuery = `
query($search: String $perPage: Int) {
  Page(perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    characters(search: $search sort:FAVOURITES_DESC) {
      id
      name {
        userPreferred
      }
      image {
        large
        medium
      }
      favourites
      media(sort: POPULARITY_DESC perPage: 1) {
        edges{
          node {
            title {
              romaji
              english
              native
              userPreferred
            }
            popularity
          }
        }
      }
    }
  }
}
`;

export const getStaffBySearchQuery = `
query($search: String $perPage: Int) {
  Page(perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    staff(search: $search sort:SEARCH_MATCH) {
      id
      name {
        userPreferred
      }
      image {
        large
        medium
      }
      dateOfBirth {
        year
        month
        day
      }
      age
      primaryOccupations
    }
  }
}
`;

export const getGenresAndTagsQuery = `
query{
  genres:GenreCollection 
  tags:MediaTagCollection {
    name 
    description 
    category 
    isAdult
  }
}
`;

export const advancedSearchQuery = `
query($page: Int = 1 $perPage: Int = 25 $id: Int $type: MediaType $isAdult: Boolean = false $search: String $format: [MediaFormat] $status: MediaStatus $countryOfOrigin: CountryCode $source: MediaSource $season: MediaSeason $seasonYear: Int $year: String $onList: Boolean $yearLesser: FuzzyDateInt $yearGreater: FuzzyDateInt $episodeLesser: Int $episodeGreater: Int $durationLesser: Int $durationGreater: Int $chapterLesser: Int $chapterGreater: Int $volumeLesser: Int $volumeGreater: Int $licensedBy: [Int] $isLicensed: Boolean $genres: [String] $excludedGenres: [String] $tags: [String] $excludedTags: [String] $minimumTagRank: Int $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total 
      perPage 
      currentPage 
      lastPage 
      hasNextPage
    }
    media(id: $id type: $type season: $season format_in: $format status: $status countryOfOrigin: $countryOfOrigin source: $source search: $search onList: $onList seasonYear: $seasonYear startDate_like: $year startDate_lesser: $yearLesser startDate_greater: $yearGreater episodes_lesser: $episodeLesser episodes_greater: $episodeGreater duration_lesser: $durationLesser duration_greater: $durationGreater chapters_lesser: $chapterLesser chapters_greater: $chapterGreater volumes_lesser: $volumeLesser volumes_greater: $volumeGreater licensedById_in: $licensedBy isLicensed: $isLicensed genre_in: $genres genre_not_in: $excludedGenres tag_in: $tags tag_not_in: $excludedTags minimumTagRank: $minimumTagRank sort: $sort isAdult: $isAdult) {
      id 
      title {
        english
        userPreferred
      }
      coverImage {
        extraLarge 
        large 
      }
      startDate {
        year 
        month 
        day
      }
      endDate {
        year 
        month 
        day        
      }
      bannerImage 
      season 
      seasonYear 
      description         
      type 
      format 
      status(version: 2) 
      episodes 
      duration 
      chapters 
      volumes 
      genres 
      isAdult 
      averageScore 
      popularity 
      trending
      nextAiringEpisode {
        airingAt 
        timeUntilAiring 
        episode
      }
      studios(isMain: true) {
        edges {
          isMain 
          node {
            id 
            name
          }
        }
      }
    }
  }
}
`;

export const getFavoriteCharactersQuery = `
query($page: Int = 1, $perPage: Int = 25, $search: String, $sort: [CharacterSort] = [FAVOURITES_DESC]) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total 
      perPage 
      currentPage 
      lastPage 
      hasNextPage
    }
    characters(search: $search, sort: $sort) {
      id
      image {
        large
        medium
      }
      name {
        userPreferred
      }
    }
  }
}
`;
