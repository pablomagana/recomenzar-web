import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;

const contactFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(200),
  email: z.string().email("Introduce un email válido"),
  phone: z.string().optional(),
  message: z.string().min(1, "El mensaje es obligatorio").max(2000),
});

const registrationFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(200),
  email: z.string().email("Introduce un email válido"),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  relation: z.string().min(1, "Selecciona una relación"),
  contactMethod: z.string().min(1),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type RegistrationFormData = z.infer<typeof registrationFormSchema>;

const ContactForms: React.FC = () => {
  const { toast } = useToast();

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const registrationForm = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
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
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Nuevo mensaje de contacto - Recomenzar',
          ...data,
        }),
      });
      if (!res.ok) throw new Error('Error al enviar');
      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
        variant: "default",
      });
      contactForm.reset();
    } catch {
      toast({
        title: "Error",
        description: "No se pudo enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const onRegistrationSubmit = async (data: RegistrationFormData) => {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Nueva solicitud de alta - Recomenzar',
          ...data,
        }),
      });
      if (!res.ok) throw new Error('Error al enviar');
      toast({
        title: "Solicitud recibida",
        description: "Tu evaluación inicial ha sido solicitada. Te contactaremos pronto.",
        variant: "default",
      });
      registrationForm.reset();
    } catch {
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
                      {...contactForm.register('name')}
                    />
                    {contactForm.formState.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{contactForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="contact-email">Correo electrónico</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="Tu email"
                      {...contactForm.register('email')}
                    />
                    {contactForm.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{contactForm.formState.errors.email.message}</p>
                    )}
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
                      {...contactForm.register('message')}
                    />
                    {contactForm.formState.errors.message && (
                      <p className="text-red-500 text-sm mt-1">{contactForm.formState.errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full py-6"
                    disabled={contactForm.formState.isSubmitting}
                  >
                    {contactForm.formState.isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
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
                      {...registrationForm.register('name')}
                    />
                    {registrationForm.formState.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{registrationForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="reg-email">Correo electrónico</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="Tu email"
                      {...registrationForm.register('email')}
                    />
                    {registrationForm.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{registrationForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="reg-phone">Teléfono</Label>
                    <Input
                      id="reg-phone"
                      placeholder="Tu teléfono"
                      {...registrationForm.register('phone')}
                    />
                    {registrationForm.formState.errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{registrationForm.formState.errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="relation">Relación con la persona afectada</Label>
                    <Select
                      onValueChange={(value) => registrationForm.setValue('relation', value, { shouldValidate: true })}
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
                    {registrationForm.formState.errors.relation && (
                      <p className="text-red-500 text-sm mt-1">{registrationForm.formState.errors.relation.message}</p>
                    )}
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
                    disabled={registrationForm.formState.isSubmitting}
                  >
                    {registrationForm.formState.isSubmitting ? 'Enviando...' : 'Solicitar evaluación inicial'}
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
