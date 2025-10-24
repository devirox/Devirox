export interface Project {
    id: string;
    title: string;
    description: string;
    link: string;
    imageUrl?: string;
}

export interface ContactForm {
    name: string;
    email: string;
    message: string;
}

export interface About {
    skills: string[];
    background: string;
}