import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Clock, Award, Building2, GraduationCap, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'wouter';
import logoPath from '../../assets/logo-transparent-png.png';

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  duracion: string;
  modalidad: string;
  certificacion: string;
  nivel: string;
  becaDisponible: boolean;
  recomendado: boolean;
  area: string;
  empresa?: string;
}

interface Empresa {
  id: number;
  nombre: string;
  descripcion: string;
  certificado: boolean;
  cursos: number;
}

const Formacion = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalidad, setModalidad] = useState('todas');
  const [soloConBeca, setSoloConBeca] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [filtrosActivos, setFiltrosActivos] = useState({
    beca100: false,
    ayudaTransporte: false,
    oficios: false,
    tecnologia: false,
    servicios: false
  });

  const empresas: Empresa[] = [
    {
      id: 1,
      nombre: "FormaPlus Valencia",
      descripcion: "Especialistas en Formación Profesional y Reinserción Laboral",
      certificado: true,
      cursos: 12
    },
    {
      id: 2,
      nombre: "TecnoFormación",
      descripcion: "Talleres en Competencias Digitales y Tecnología",
      certificado: true,
      cursos: 8
    },
    {
      id: 3,
      nombre: "Oficios Valencia",
      descripcion: "Centro de Formación en Oficios Tradicionales y Artesanía",
      certificado: true,
      cursos: 6
    }
  ];

  const cursos: Curso[] = [
    {
      id: 1,
      titulo: "Taller de Carpintería Artesanal",
      descripcion: "Aprende las técnicas fundamentales de la madera, diseño y construcción de muebles de manera profesional.",
      duracion: "120 horas (3 meses)",
      modalidad: "Presencial",
      certificacion: "Certificación Profesional I",
      nivel: "Nivel Inicial",
      becaDisponible: true,
      recomendado: false,
      area: "oficios",
      empresa: "Oficios Valencia"
    },
    {
      id: 2,
      titulo: "Competencias Digitales Básicas",
      descripcion: "Conoce las herramientas ofimáticas, correo electrónico y navegación segura en internet.",
      duracion: "40 horas (intensivo)",
      modalidad: "Híbrido",
      certificacion: "Diploma de Competencias TIC",
      nivel: "Básico",
      becaDisponible: true,
      recomendado: true,
      area: "tecnologia"
    },
    {
      id: 3,
      titulo: "Operario de Logística y Picking",
      descripcion: "Gestión de stock, manejo de terminales y normativas de seguridad en almacén.",
      duracion: "80 horas (2 meses)",
      modalidad: "Presencial",
      certificacion: "Carné de Carretillero Homologado",
      nivel: "Nivel Técnico",
      becaDisponible: true,
      recomendado: false,
      area: "servicios"
    },
    {
      id: 4,
      titulo: "Curso de Ayudante de Cocina",
      descripcion: "Formación práctica en técnicas culinarias básicas, higiene alimentaria y trabajo en cocina profesional.",
      duracion: "100 horas (2.5 meses)",
      modalidad: "Presencial",
      certificacion: "Certificación Oficial",
      nivel: "Nivel Inicial",
      becaDisponible: true,
      recomendado: false,
      area: "servicios"
    },
    {
      id: 5,
      titulo: "Jardinería y Mantenimiento de Espacios Verdes",
      descripcion: "Técnicas de cultivo, poda, diseño de jardines y mantenimiento de zonas ajardinadas.",
      duracion: "60 horas (6 semanas)",
      modalidad: "Presencial",
      certificacion: "Certificado de Aprovechamiento",
      nivel: "Nivel Inicial",
      becaDisponible: false,
      recomendado: true,
      area: "oficios"
    }
  ];

  const faqs = [
    {
      pregunta: "¿Quién puede solicitar una beca?",
      respuesta: "Pueden solicitar beca todas las personas en proceso de recuperación que estén vinculadas a Recomenzar, ya sea como usuarios directos o familiares. También se consideran casos de personas en situación de vulnerabilidad social referidas por servicios sociales."
    },
    {
      pregunta: "¿Qué gastos cubren las becas?",
      respuesta: "Las becas pueden cubrir el 100% del coste de la formación, materiales didácticos, y en algunos casos ayuda para transporte. Cada beca se evalúa de forma individual según las necesidades del solicitante."
    },
    {
      pregunta: "¿Cómo es el proceso de selección?",
      respuesta: "El proceso incluye una entrevista personal, valoración de la situación socioeconómica, motivación del candidato y disponibilidad horaria. Priorizamos a personas en recuperación activa y con compromiso demostrable."
    },
    {
      pregunta: "¿Puedo combinar formación con mi tratamiento?",
      respuesta: "Sí, los horarios de formación están diseñados para ser compatibles con los programas de tratamiento. Trabajamos coordinadamente con el equipo terapéutico para asegurar que la formación apoye tu proceso de recuperación."
    }
  ];

  const cursosFiltrados = cursos.filter(curso => {
    const matchBusqueda = curso.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          curso.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchModalidad = modalidad === 'todas' || curso.modalidad.toLowerCase() === modalidad.toLowerCase();
    const matchBeca = !soloConBeca || curso.becaDisponible;
    
    let matchArea = true;
    if (filtrosActivos.oficios || filtrosActivos.tecnologia || filtrosActivos.servicios) {
      matchArea = (filtrosActivos.oficios && curso.area === 'oficios') ||
                  (filtrosActivos.tecnologia && curso.area === 'tecnologia') ||
                  (filtrosActivos.servicios && curso.area === 'servicios');
    }
    
    return matchBusqueda && matchModalidad && matchBeca && matchArea;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src={logoPath} alt="Logo Recomenzar" className="h-10 w-auto mr-2" />
                <div>
                  <span className="text-xl font-bold text-green-800 font-montserrat">Recomenzar</span>
                  <p className="text-xs text-gray-600">Portal de Empleo y Formación</p>
                </div>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-green-800 hover:text-amber-600 transition">Inicio</Link>
              <span className="text-amber-600 font-medium">Programas y Becas</span>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full">
                Mi Perfil
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Barra de búsqueda */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Carpintería, competencias digitales, logística..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-base"
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Select value={modalidad} onValueChange={setModalidad}>
                <SelectTrigger className="w-full md:w-48 py-6">
                  <SelectValue placeholder="Modalidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Cualquier modalidad</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="híbrido">Híbrido</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Empresas Colaboradoras */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Empresas Colaboradoras para la Formación</h2>
                <p className="text-gray-600 mb-6 text-sm">Entidades comprometidas con la inserción laboral y capacitación profesional</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {empresas.map((empresa, index) => (
                    <motion.div
                      key={empresa.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300 h-full border-t-4 border-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            {empresa.certificado && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                Certified Partner
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-gray-800 mb-1">{empresa.nombre}</h3>
                          <p className="text-sm text-gray-600 mb-4">{empresa.descripcion}</p>
                          <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                            Ver Cursos <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Banner CTA */}
            <div className="lg:w-72">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white h-full">
                <CardContent className="p-6 flex flex-col justify-center h-full">
                  <Building2 className="h-10 w-10 mb-4" />
                  <h3 className="text-xl font-bold mb-2">¿Quieres formar a nuestros candidatos?</h3>
                  <p className="text-blue-100 text-sm mb-6">
                    Únete a nuestra red de empresas colaboradoras y ayuda a transformar vidas a través de la formación.
                  </p>
                  <Button className="bg-white text-blue-700 hover:bg-blue-50 w-full">
                    Colabora con nosotros
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Programas de Formación y Becas */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filtros laterales */}
            <aside className="lg:w-64 space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-800 mb-4">Filtrar por Beca</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox 
                        checked={filtrosActivos.beca100}
                        onCheckedChange={(checked) => setFiltrosActivos({...filtrosActivos, beca100: !!checked})}
                      />
                      <span className="text-sm text-gray-700">Beca de Matrícula 100%</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox 
                        checked={filtrosActivos.ayudaTransporte}
                        onCheckedChange={(checked) => setFiltrosActivos({...filtrosActivos, ayudaTransporte: !!checked})}
                      />
                      <span className="text-sm text-gray-700">Ayuda al Transporte</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-800 mb-4">Área Formativa</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox 
                        checked={filtrosActivos.oficios}
                        onCheckedChange={(checked) => setFiltrosActivos({...filtrosActivos, oficios: !!checked})}
                      />
                      <span className="text-sm text-gray-700">Oficios Tradicionales</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox 
                        checked={filtrosActivos.tecnologia}
                        onCheckedChange={(checked) => setFiltrosActivos({...filtrosActivos, tecnologia: !!checked})}
                      />
                      <span className="text-sm text-gray-700">Tecnología y Digital</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox 
                        checked={filtrosActivos.servicios}
                        onCheckedChange={(checked) => setFiltrosActivos({...filtrosActivos, servicios: !!checked})}
                      />
                      <span className="text-sm text-gray-700">Servicios Personales</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Lista de cursos */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-green-700" />
                  <h2 className="text-2xl font-bold text-gray-800">Programas de Formación y Becas</h2>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={!soloConBeca ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSoloConBeca(false)}
                    className={!soloConBeca ? "bg-blue-600" : ""}
                  >
                    Todos los cursos
                  </Button>
                  <Button 
                    variant={soloConBeca ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSoloConBeca(true)}
                    className={soloConBeca ? "bg-green-600" : ""}
                  >
                    Solo con Beca
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {cursosFiltrados.map((curso, index) => (
                  <motion.div
                    key={curso.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {curso.becaDisponible && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                              Beca Disponible
                            </span>
                          )}
                          {curso.recomendado && (
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                              Recomendado
                            </span>
                          )}
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            {curso.nivel}
                          </span>
                        </div>
                        
                        <h3 className="font-bold text-gray-800 mb-2">{curso.titulo}</h3>
                        {curso.empresa && (
                          <p className="text-xs text-blue-600 mb-2">{curso.empresa}</p>
                        )}
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{curso.descripcion}</p>
                        
                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{curso.duracion}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            <span>{curso.certificacion}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{curso.modalidad}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Más Info
                          </Button>
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                            Inscribirse
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Novedades en formación */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Novedades en formación</h2>
            <span className="text-sm text-gray-500">5 cursos nuevos este mes</span>
          </div>
          
          <Card className="border-l-4 border-green-500">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      Beca Disponible
                    </span>
                    <span className="text-xs text-gray-500">Nuevo</span>
                  </div>
                  <h3 className="font-bold text-gray-800">Curso Intensivo de Ayudante de Cocina</h3>
                  <p className="text-sm text-blue-600">Gastroforma Academy</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Inicio: 15 de Mayo
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Certificación Oficial
                    </span>
                  </div>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white whitespace-nowrap">
                  Inscripción Laboral/Operatividad
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Preguntas Frecuentes (FAQ)</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <button
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="font-medium text-gray-800">{faq.pregunta}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-gray-600">{faq.respuesta}</p>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="bg-green-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 Recomenzar ONG - Portal de Empleo y Formación</p>
          <p className="text-xs text-green-200 mt-1">Cuando el amor sana, la vida renace</p>
        </div>
      </footer>
    </div>
  );
};

export default Formacion;
