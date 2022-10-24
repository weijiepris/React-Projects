export const Frameworks = (frameworks) => {
    return (
        <div>
            Frameworks
            {frameworks.map((framework) => (
                <div key={framework}>{framework}</div>
            ))}
        </div>
    );
};

export const Technologies = (technologies) => {
    return (
        <div>
            Technologies
            {technologies.map((technology) => (
                <div key={technology}>{technology}</div>
            ))}
        </div>
    );
};

export const Languages = (languages) => {
    return (
        <div>
            Languages
            {languages.map((language) => (
                <div key={language}>{language}</div>
            ))}
        </div>
    );
};

export const Experiences = (experiences) => {
    return (
        <div>
            Experiences
            {experiences.map((experience) => (
                <div key={experience.title}>
                    {experience.title}
                    {experience.company}
                    {experience.category}
                    {experience.dateStart}
                    {experience.dateEnd}
                    {experience.descriptions}
                    {experience.skills}
                </div>
            ))}
        </div>
    );
};

export const Projects = (projects) => {
    return (
        <div>
            Projects
            {projects.map((project) => (
                <div key={project.title}>
                    {project.title}
                    {project.dateStart}
                    {project.dateEnd}
                    {project.descriptions}
                    {project.skills}
                </div>
            ))}
        </div>
    );
};

export const Educations = (educations) => {
    return (
        <div>
            Educations
            {educations.map((education) => (
                <div key={education.title}>
                    {education.title}
                    {education.dateStart}
                    {education.dateEnd}
                    {education.school}
                </div>
            ))}
        </div>
    );
};