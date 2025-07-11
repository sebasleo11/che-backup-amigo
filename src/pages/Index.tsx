
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, Zap, Users, ArrowRight, Play, CheckCircle } from "lucide-react";
import BackupApp from "@/components/BackupApp";

const Index = () => {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return <BackupApp onBack={() => setShowApp(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">CheBackup</h1>
          </div>
          <Button onClick={() => setShowApp(true)} className="bg-blue-600 hover:bg-blue-700">
            Probar Gratis
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Tus archivos seguros,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              sin complicaciones
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            La solución de backup más simple y confiable para familias, profesionales y empresas argentinas. 
            Arrastrá, configurás y listo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => setShowApp(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-6"
            >
              <Play className="mr-2 h-5 w-5" />
              Empezar Ahora - Gratis
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
            >
              Ver Demo
            </Button>
          </div>

          {/* Demo Preview */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 text-left">Tus Carpetas</h3>
                <div className="space-y-2">
                  {["📁 Documentos", "🖼️ Fotos", "💼 Trabajo", "🎵 Música"].map((folder, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-lg border-2 border-dashed border-gray-200 text-left">
                      {folder}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-600 text-left">Para Backup</h3>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 min-h-32 flex items-center justify-center">
                  <p className="text-green-600 text-center">
                    <ArrowRight className="h-8 w-8 mx-auto mb-2" />
                    Arrastrá carpetas acá
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ¿Por qué elegir CheBackup?
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Súper Fácil</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Arrastrás las carpetas que querés respaldar y listo. Sin configuraciones complicadas ni términos técnicos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Automático</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Se programa solo para hacer backup cuando vos querés. Diario, semanal o cuando se te ocurra.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>Seguro</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Tus archivos están encriptados y protegidos. Solo vos podés acceder a ellos, siempre.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Users className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <blockquote className="text-2xl mb-6 italic">
              "Antes perdía archivos importantes todo el tiempo. Con CheBackup me olvido del problema. 
              Se encarga de todo automáticamente y es re fácil de usar."
            </blockquote>
            <p className="text-lg opacity-90">— María González, Contadora en Buenos Aires</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Empezá a proteger tus archivos hoy
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Gratis para uso personal. Sin trucos, sin letra chica.
            </p>
            <div className="space-y-4">
              <Button 
                size="lg" 
                onClick={() => setShowApp(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg px-8 py-6"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Crear Mi Primer Backup
              </Button>
              <p className="text-sm text-gray-500">
                ¿Tenés dudas? Escribinos a hola@chebackup.com.ar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6" />
            <span className="text-lg font-semibold">CheBackup</span>
          </div>
          <p className="text-gray-400">
            Hecho con ❤️ en Argentina para proteger lo que más te importa
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
