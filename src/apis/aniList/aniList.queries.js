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

export const top25AnimeQuery = `
    query {
      Page(page: 1, perPage: 25) {
        media(type: ANIME, sort: SCORE_DESC) {
          id
          coverImage {
            extraLarge
            large
            medium
            color
          }
          title {
            english
            userPreferred
          }
        }
      }
    }`;

export const top25MangaQuery = `
    query {
      Page(page: 1, perPage: 25) {
        media(type: MANGA, sort: SCORE_DESC) {
          id
          coverImage {
            large
          }
          title {
            english
            userPreferred
          }
        }
      }
    }`;

export const top25CharactersQuery = `
    query {
      Page(page: 1, perPage: 25) {
        characters(sort: FAVOURITES_DESC) {
          id
          image {
            large
          }
          name {
            userPreferred
          }
        }
      }
    }`;

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
        characters(sort:ROLE perPage: 10) {
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
