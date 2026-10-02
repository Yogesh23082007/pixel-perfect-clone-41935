export const contact = {
  email: "yogeshlingutla7@gmail.com",
  github: "https://github.com/Yogesh23082007",
  linkedin: "https://www.linkedin.com/in/yogesh-lingutla-b0404532b",
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    slug: "movie-recommender",
    title: "The Movie Recommender System",
    category: "AI/ML",
    description:
      "A Streamlit machine learning application that analyzes movie metadata to generate personalized recommendations.",
    tags: ["Python", "Machine Learning", "Streamlit", "Movie Metadata"],
    github: "https://github.com/Yogesh23082007/movie-recommender-system",
  },
  {
    slug: "california-housing",
    title: "California Housing Prediction",
    category: "Data Science",
    description:
      "A machine learning project predicting California housing prices using location, income, rooms, population, and house age.",
    tags: ["Python", "Machine Learning", "Data Science", "Housing Dataset"],
    github: "https://github.com/Yogesh23082007/house-expense-prediction",
    live: "https://house-expense-prediction-6eqjes2wtdpkmdngrftqqb.streamlit.app/",
  },
  {
    slug: "caffeine-cove",
    title: "Caffeine Cove",
    category: "Web Development",
    description:
      "A responsive coffee shop website showcasing its menu, gallery, testimonials, and contact details in a clear interface.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Yogesh23082007/coffee-website",
    live: "https://caffeiencove.netlify.app/",
  },
];

export const skills = [
  { title: "Programming", items: ["Python", "C", "Java", "JavaScript"] },
  { title: "Web Development", items: ["HTML", "CSS", "JavaScript"] },
  {
    title: "Computer Science",
    items: ["Data Structures & Algorithms", "Object-Oriented Programming", "Operating Systems", "SQL"],
  },
  { title: "AI & Machine Learning", items: ["Machine Learning", "Deep Learning"] },
  { title: "Tools", items: ["VS Code", "GitHub"] },
];
