import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Nombre, email y mensaje son campos requeridos' });
      }
      
      const contact = await storage.createContactMessage({
        name,
        email,
        phone: phone || '',
        message
      });
      
      res.status(201).json(contact);
    } catch (error) {
      console.error('Error saving contact message:', error);
      res.status(500).json({ message: 'Error al procesar tu mensaje' });
    }
  });
  
  // API route for registration form
  app.post('/api/register', async (req, res) => {
    try {
      const { name, email, phone, relation, contactMethod } = req.body;
      
      if (!name || !email || !phone) {
        return res.status(400).json({ message: 'Nombre, email y teléfono son campos requeridos' });
      }
      
      const registration = await storage.createRegistration({
        name,
        email,
        phone,
        relation: relation || 'self',
        contactMethod: contactMethod || 'phone'
      });
      
      res.status(201).json(registration);
    } catch (error) {
      console.error('Error processing registration:', error);
      res.status(500).json({ message: 'Error al procesar tu solicitud' });
    }
  });
  
  // API route for newsletter subscription
  app.post('/api/newsletter', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: 'Email es un campo requerido' });
      }
      
      const subscription = await storage.createNewsletterSubscription({ email });
      
      res.status(201).json(subscription);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      res.status(500).json({ message: 'Error al procesar tu suscripción' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
