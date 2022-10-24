import axios from "axios";
const devMode = true;
let url = "";

if (devMode) {
  url = "http://localhost:3002/";
} else {
  url = "https://us-central1-portfolio-v2-b469e.cloudfunctions.net/app/";
}

export const getFrameworks = () => {
  return axios.get(url + "frameworks").then((res) => res.data);
};

export const getExperiences = async () => {
  return axios.get(url + "experiences").then((res) => res.data);
};

export const getTechnologies = () => {
  return axios.get(url + "technologies").then((res) => res.data);
};

export const getLanguages = () => {
  return axios.get(url + "languages").then((res) => res.data);
};

export const getProjects = () => {
  return axios.get(url + "projects").then((res) => res.data);
};

export const getEducations = () => {
  return axios.get(url + "educations").then((res) => res.data);
};

export const loadDefault = () => {
  return axios.get(url);
};
