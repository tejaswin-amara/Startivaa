export const siteConfig = {
  name: "STARTIVAA",
  tagline: "Build • Fund • Scale",
  whatsappNumber: "919403283555",
  whatsappMessage: "Hi! I'd like to know more about Startivaa's services.",
  email: "hello@startivaa.com",
  phone: "+91 94032 83555",
  address: "Hyderabad, Telangana, India",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/amoloagrawal",
    instagram: "https://instagram.com/startivaa",
    youtube: "https://www.youtube.com/watch?v=mul1VqKUmjQ",
  },
};

export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;