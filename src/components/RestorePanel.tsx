
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  RotateCcw, 
  Calendar, 
  FolderOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Download
} from "lucide-react";

interface RestorePanelProps {
  onBack: () => void;
}

const RestorePanel = ({ onBack }: RestorePanelProps) => {
  const [selectedBackup, setSelectedBackup] = useState<number | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreProgress, setRestoreProgress] = useState(0);

  const backupHistory = [
    {
      id: 1,
      date: "Hoy - 18:30",
      folders: ["📄 Documentos", "🖼️ Imágenes", "💼 Escritorio"],
      size: "2.4 GB",
      status: "complete"
    },
    {
      id: 2,
      date: "Ayer - 18:30",
      folders: ["📄 Documentos", "🖼️ Imágenes", "💼 Escritorio"],
      size: "2.4 GB",
      status: "complete"
    },
    {
      id: 3,
      date: "2 días - 18:30",
      folders: ["📄 Documentos", "🖼️ Imágenes"],
      size: "1.8 GB",
      status: "complete"
    },
    {
      id: 4,
      date: "3 días - 18:30",
      folders: ["📄 Documentos", "🖼️ Imágenes", "💼 Escritorio", "⬇️ Descargas"],
      size: "3.1 GB",
      status: "complete"
    },
    {
      id: 5,
      date: "1 semana - 18:30",
      folders: ["📄 Documentos", "🖼️ Imágenes"],
      size: "2.0 GB",
      status: "complete"
    }
  ];

  const startRestore = () => {
    if (selectedBackup === null) return;
    
    setIsRestoring(true);
    setRestoreProgress(0);
    
    const interval = setInterval(() => {
      setRestoreProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRestoring(false);
          return 100;
        }
        return prev + 25;
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Restaurar Backup</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Restore Progress */}
        {isRestoring && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full"></div>
                  <span className="font-medium text-green-800">Restaurando archivos...</span>
                </div>
                <span className="text-sm text-green-600">{restoreProgress}%</span>
              </div>
              <Progress value={restoreProgress} className="h-2" />
              <p className="text-sm text-green-700 mt-2">
                Estamos restaurando tus archivos en la ubicación original
              </p>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">¿Cómo funciona la restauración?</h3>
                <p className="text-sm text-blue-700">
                  Elegí un backup de la lista y tus archivos se van a restaurar exactamente como estaban en ese momento. 
                  Los archivos se van a guardar en las mismas carpetas donde estaban originalmente.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backup Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-purple-600" />
              Seleccioná un backup para restaurar
            </CardTitle>
            <CardDescription>
              Elegí la fecha del backup que querés recuperar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {backupHistory.map((backup) => (
                <div
                  key={backup.id}
                  onClick={() => setSelectedBackup(backup.id)}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${selectedBackup === backup.id 
                      ? 'border-purple-300 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-200 hover:bg-purple-25'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                        <Clock className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{backup.date}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <FolderOpen className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {backup.folders.length} carpetas - {backup.size}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {backup.folders.map((folder, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {folder}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      {selectedBackup === backup.id && (
                        <div className="w-4 h-4 border-2 border-purple-600 rounded-full bg-purple-600">
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {selectedBackup && (
          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" disabled={isRestoring}>
              <Download className="h-4 w-4 mr-2" />
              Descargar Backup
            </Button>
            <Button 
              onClick={startRestore}
              disabled={isRestoring}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            >
              {isRestoring ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Restaurando...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restaurar Backup
                </>
              )}
            </Button>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">¿Necesitás ayuda?</h4>
          <p className="text-sm text-gray-600 mb-2">
            • Los archivos se restauran en su ubicación original
          </p>
          <p className="text-sm text-gray-600 mb-2">
            • Si ya existe un archivo con el mismo nombre, te preguntamos qué hacer
          </p>
          <p className="text-sm text-gray-600">
            • El proceso puede tardar unos minutos dependiendo del tamaño del backup
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestorePanel;
