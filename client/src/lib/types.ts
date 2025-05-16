export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface RegistrationRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  relation: string;
  contactMethod: string;
  createdAt: string;
}

export interface NewsletterSubscription {
  id: number;
  email: string;
  createdAt: string;
}
