import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Award, GraduationCap, ChevronDown, ChevronUp, ExternalLink, X, Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'wouter';
import logoPath from '../../assets/logo-transparent-png.png';
import { apiGet } from '@/lib/api';
import type { Curso, Empresa, Faq } from '@/types/formacion';
import { AREAS } from '@/types/formacion';
import type { PaginatedResponse } from '@/types/catalogo';

const Formacion = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalidad, setModalidad] = useState('todas');
  const [soloConBeca, setSoloConBeca] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [filtrosActivos, setFiltrosActivos] = useState({
    beca100: false,
    oficios: false,
    tecnologia: false,
    servicios: false,
  });
  const [selectedEmpresa, setSelectedEmpresa] = useState<string | null>(null);
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const cursosRef = useRef<HTMLDivElement>(null);

  // API data
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loadingCursos, setLoadingCursos] = useState(true);
  const [loadingEmpresas, setLoadingEmpresas] = useState(true);
  const [loadingFaqs, setLoadingFaqs] = useState(true);

  const fetchCursos = useCallback(async () => {
    setLoadingCursos(true);
    try {
      const res = await apiGet<PaginatedResponse<Curso>>('/formacion/cursos?limit=50');
      setCursos(Array.isArray(res.data) ? res.data : []);
    } catch {
      setCursos([]);
    } finally {
      setLoadingCursos(false);
    }
  }, []);

  const fetchEmpresas = useCallback(async () => {
    setLoadingEmpresas(true);
    try {
      const res = await apiGet<PaginatedResponse<Empresa>>('/formacion/empresas?limit=50');
      setEmpresas(Array.isArray(res.data) ? res.data : []);
    } catch {
      setEmpresas([]);
    } finally {
      setLoadingEmpresas(false);
    }
  }, []);

  const fetchFaqs = useCallback(async () => {
    setLoadingFaqs(true);
    try {
      const res = await apiGet<Faq[]>('/formacion/faqs');
      setFaqs(Array.isArray(res) ? res : []);
    } catch {
      setFaqs([]);
    } finally {
      setLoadingFaqs(false);
    }
  }, []);

  useEffect(() => { fetchCursos(); fetchEmpresas(); fetchFaqs(); }, [fetchCursos, fetchEmpresas, fetchFaqs]);

  const cursosFiltrados = cursos.filter(curso => {
    const matchBusqueda = curso.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          curso.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchModalidad = modalidad === 'todas' || curso.modalidad === modalidad;
    const matchBeca = !soloConBeca || curso.becaDisponible;
    const matchBeca100 = !filtrosActivos.beca100 || curso.becaDisponible;
    const matchEmpresa = !selectedEmpresa || curso.empresaId === selectedEmpresa;

    let matchArea = true;
    if (filtrosActivos.oficios || filtrosActivos.tecnologia || filtrosActivos.servicios) {
      matchArea = (filtrosActivos.oficios && curso.area === 'oficios') ||
                  (filtrosActivos.tecnologia && curso.area === 'tecnologia') ||
                  (filtrosActivos.servicios && curso.area === 'servicios');
    }

    return matchBusqueda && matchModalidad && matchBeca && matchBeca100 && matchEmpresa && matchArea;
  });

  const novedadCurso = cursos[0];

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
                  <SelectItem value="hibrido">Híbrido</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Empresas Colaboradoras */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Empresas Colaboradoras para la Formación</h2>
            <p className="text-gray-600 mb-6 text-sm">Entidades comprometidas con la inserción laboral y capacitación profesional</p>

            {loadingEmpresas ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            ) : empresas.length === 0 ? (
              <p className="text-center py-8 text-gray-400 text-sm">No hay empresas colaboradoras disponibles</p>
            ) : (
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
                              Centro Certificado
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1">{empresa.nombre}</h3>
                        <p className="text-sm text-gray-600 mb-4">{empresa.descripcion}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                          onClick={() => {
                            setSelectedEmpresa(selectedEmpresa === empresa.id ? null : empresa.id);
                            cursosRef.current?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {selectedEmpresa === empresa.id ? 'Quitar filtro' : 'Ver Cursos'} <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Programas de Formación y Becas */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filtros laterales */}
            <aside className={`lg:w-64 space-y-6 ${showFilters ? '' : 'hidden lg:block'}`}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">Filtrar por Beca</h3>
                    <button className="lg:hidden text-gray-400 hover:text-gray-600" onClick={() => setShowFilters(false)}>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filtrosActivos.beca100}
                        onCheckedChange={(checked) => setFiltrosActivos({...filtrosActivos, beca100: !!checked})}
                      />
                      <span className="text-sm text-gray-700">Beca de Matrícula 100%</span>
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
            <div className="flex-1" ref={cursosRef}>
              {selectedEmpresa && (
                <div className="mb-4 flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm">
                  <span>Filtrando por: <strong>{empresas.find(e => e.id === selectedEmpresa)?.nombre}</strong></span>
                  <button onClick={() => setSelectedEmpresa(null)} className="ml-auto hover:text-blue-900">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
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

              {loadingCursos ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : cursosFiltrados.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>{cursos.length === 0 ? 'No hay cursos disponibles' : 'No se encontraron cursos con los filtros seleccionados'}</p>
                </div>
              ) : (
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
                              {curso.nivel.charAt(0).toUpperCase() + curso.nivel.slice(1)}
                            </span>
                          </div>

                          <h3 className="font-bold text-gray-800 mb-2">{curso.titulo}</h3>
                          {curso.empresa && (
                            <p className="text-xs text-blue-600 mb-2">{curso.empresa.nombre}</p>
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
                              <span>{curso.modalidad.charAt(0).toUpperCase() + curso.modalidad.slice(1)}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedCurso(curso)}>
                              Más Info
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => window.location.href = `mailto:formacion@recomenzar.es?subject=Inscripción: ${curso.titulo}`}
                            >
                              Inscribirse
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Novedades en formación */}
      {novedadCurso && (
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Novedades en formación</h2>
              {cursos.length > 0 && (
                <span className="text-sm text-gray-500">{cursos.length} cursos disponibles</span>
              )}
            </div>

            <Card className="border-l-4 border-green-500">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {novedadCurso.becaDisponible && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          Beca Disponible
                        </span>
                      )}
                      <span className="text-xs text-gray-500">Nuevo</span>
                    </div>
                    <h3 className="font-bold text-gray-800">{novedadCurso.titulo}</h3>
                    {novedadCurso.empresa && (
                      <p className="text-sm text-blue-600">{novedadCurso.empresa.nombre}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {novedadCurso.duracion}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {novedadCurso.certificacion}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="bg-amber-500 hover:bg-amber-600 text-white whitespace-nowrap"
                    onClick={() => window.location.href = `mailto:formacion@recomenzar.es?subject=Inscripción: ${novedadCurso.titulo}`}
                  >
                    Solicitar Inscripción
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* FAQ */}
      {(loadingFaqs || faqs.length > 0) && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Preguntas Frecuentes (FAQ)</h2>

            {loadingFaqs ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
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
            )}
          </div>
        </section>
      )}

      {/* Footer simple */}
      <footer className="bg-green-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Recomenzar ONG - Portal de Empleo y Formación</p>
          <p className="text-xs text-green-200 mt-1">Cuando el amor sana, la vida renace</p>
        </div>
      </footer>

      {/* Dialog detalle de curso */}
      <Dialog open={!!selectedCurso} onOpenChange={(open) => !open && setSelectedCurso(null)}>
        <DialogContent className="max-w-lg">
          {selectedCurso && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCurso.titulo}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedCurso.becaDisponible && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Beca Disponible</span>
                  )}
                  {selectedCurso.recomendado && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Recomendado</span>
                  )}
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {selectedCurso.nivel.charAt(0).toUpperCase() + selectedCurso.nivel.slice(1)}
                  </span>
                </div>
                {selectedCurso.empresa && (
                  <p className="text-sm text-blue-600 font-medium">{selectedCurso.empresa.nombre}</p>
                )}
                <p className="text-gray-600">{selectedCurso.descripcion}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{selectedCurso.duracion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{selectedCurso.modalidad.charAt(0).toUpperCase() + selectedCurso.modalidad.slice(1)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gray-400" />
                    <span>{selectedCurso.certificacion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-400" />
                    <span>{AREAS.find(a => a.value === selectedCurso.area)?.label ?? selectedCurso.area}</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => window.location.href = `mailto:formacion@recomenzar.es?subject=Inscripción: ${selectedCurso.titulo}`}
                >
                  Solicitar Inscripción
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Formacion;
