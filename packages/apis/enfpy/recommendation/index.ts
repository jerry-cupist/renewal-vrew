import { AxiosInstance, AxiosRequestConfig } from "axios";
import { faker } from "@faker-js/faker";

const createRecommendationApi = (instance: AxiosInstance) => ({
  getNewRecommendation: (config?: AxiosRequestConfig<any>) => {
    const users = [];
    for (let i = 0; i < 3; i++) {
      users.push({
        nickname: faker.internet.userName(),
        age: faker.number.int(40),
        distance: faker.number.float(40),
        location: faker.location.city(),
        mbti: faker.helpers.arrayElement(["intp", "istj", "estp", "enfp"]),
        image: faker.image.urlPicsumPhotos(),
      });
    }
    return users;
  },
});

export type RecommendationApi = ReturnType<typeof createRecommendationApi>;

export default createRecommendationApi;
