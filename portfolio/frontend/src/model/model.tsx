export interface Skills {
  value: string[];
}

export interface Experiences {
  category: string;
  company: string;
  dateStart: string;
  dateEnd: string;
  descriptions: string[];
  skills: string[];
  title: string;
}

export interface Projects {
  dateStart: string;
  dateEnd: string;
  descriptions: string[];
  skills: string[];
  title: string;
}


export interface Educations {
    dateStart: string;
    dateEnd: string;
    descriptions: string[];
    skills: string[];
    title: string;
    school: string[];
  }
  