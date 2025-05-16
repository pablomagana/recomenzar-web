import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  relation: string;
  contactMethod: string;
}

const ContactForms: React.FC = () => {
  const { toast } = useToast();
  
  // Contact Form
  const contactForm = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  // Registration Form
  const registrationForm = useForm<RegistrationFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      relation: '',
      contactMethod: 'phone'
    }
  });

  const onContactSubmit = async (data: ContactFormData) => {
    try {
      await apiRequest('POST', '/api/contact', data);
      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
        variant: "default",
      });
      contactForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const onRegistrationSubmit = async (data: RegistrationFormData) => {
    try {
      await apiRequest('POST', '/api/register', data);
      toast({
        title: "Solicitud recibida",
        description: "Tu evaluación inicial ha sido solicitada. Te contactaremos pronto.",
        variant: "default",
      });
      registrationForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo procesar tu solicitud. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contacto" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-white">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-800 font-montserrat">Contacta con nosotros</h2>
              <form onSubmit={contactForm.handleSubmit(onContactSubmit)}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Nombre completo</Label>
                    <Input 
                      id="contact-name" 
                      placeholder="Tu nombre" 
                      {...contactForm.register('name', { required: true })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-email">Correo electrónico</Label>
                    <Input 
                      id="contact-email" 
                      type="email" 
                      placeholder="Tu email" 
                      {...contactForm.register('email', { required: true })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-phone">Teléfono</Label>
                    <Input 
                      id="contact-phone" 
                      placeholder="Tu teléfono" 
                      {...contactForm.register('phone')}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-message">Mensaje</Label>
                    <Textarea 
                      id="contact-message" 
                      placeholder="¿Cómo podemos ayudarte?" 
                      className="min-h-[120px]"
                      {...contactForm.register('message', { required: true })}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full py-6"
                  >
                    Enviar mensaje
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Registration Form */}
          <Card id="alta" className="bg-white">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-800 font-montserrat">Darse de alta</h2>
              <p className="mb-6 text-gray-700">Completa este formulario para iniciar el proceso de evaluación inicial gratuita.</p>
              
              <form onSubmit={registrationForm.handleSubmit(onRegistrationSubmit)}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reg-name">Nombre completo</Label>
                    <Input 
                      id="reg-name" 
                      placeholder="Tu nombre" 
                      {...registrationForm.register('name', { required: true })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="reg-email">Correo electrónico</Label>
                    <Input 
                      id="reg-email" 
                      type="email" 
                      placeholder="Tu email" 
                      {...registrationForm.register('email', { required: true })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="reg-phone">Teléfono</Label>
                    <Input 
                      id="reg-phone" 
                      placeholder="Tu teléfono" 
                      {...registrationForm.register('phone', { required: true })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="relation">Relación con la persona afectada</Label>
                    <Select 
                      onValueChange={(value) => registrationForm.setValue('relation', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self">Soy yo mismo/a</SelectItem>
                        <SelectItem value="family">Familiar</SelectItem>
                        <SelectItem value="friend">Amigo/a</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Forma de contacto preferida</Label>
                    <RadioGroup 
                      defaultValue="phone"
                      onValueChange={(value) => registrationForm.setValue('contactMethod', value)}
                      className="flex space-x-4 pt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone" />
                        <Label htmlFor="phone">Teléfono</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email" />
                        <Label htmlFor="email">Email</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-green-700 hover:bg-green-800 text-white rounded-full py-6"
                  >
                    Solicitar evaluación inicial
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForms;
