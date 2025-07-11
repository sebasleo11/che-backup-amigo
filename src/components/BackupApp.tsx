
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  FolderOpen, 
  HardDrive, 
  Cloud, 
  Settings, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  GripVertical,
  Plus,
  Trash2
} from "lucide-react";
import FolderSelector from "@/components/FolderSelector";
import BackupConfig from "@/components/BackupConfig";
import RestorePanel from "@/components/RestorePanel";

interface BackupAppProps {
  onBack: () => void;
}

const BackupApp = ({ onBack }: BackupAppProps) => {
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<'main' | 'config' | 'restore'>('main');
  const [backupDestination, setBackupDestination] = useState<'local' | 'cloud'>('local');
  const [isBackupRunning, setIsBackupRunning] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  const handleFolderDrop = (folder: string) => {
    if (!selectedFolders.includes(folder)) {
      setSelectedFolders([...selectedFolders, folder]);
    }
  };

  const handleRemoveFolder = (folder: string) => {
    setSelectedFolders(selectedFolders.filter(f => f !== folder));
  };

  const startBackup = () => {
    setIsBackupRunning(true);
    setBackupProgress(0);
    
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackupRunning(false);
          return 100;
        }
        return prev + 20;
      });
    }, 1000);
  };

  if (currentView === 'config') {
    return <BackupConfig onBack={() => setCurrentView('main')} />;
  }

  if (currentView === 'restore') {
    return <RestorePanel onBack={() => setCurrentView('main')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
              <h1 className="text-2xl font-bold text-gray-900">CheBackup</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentView('config')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurar
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentView('restore')}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restaurar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Status Banner */}
        {isBackupRunning && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  <span className="font-medium text-blue-800">Haciendo backup...</span>
                </div>
                <span className="text-sm text-blue-600">{backupProgress}%</span>
              </div>
              <Progress value={backupProgress} className="h-2" />
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Available Folders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderOpen className="h-5 w-5 mr-2 text-blue-600" />
                Tus Carpetas
              </CardTitle>
              <CardDescription>
                Arrastrá las carpetas que querés respaldar hacia la derecha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FolderSelector onFolderDrop={handleFolderDrop} selectedFolders={selectedFolders} />
            </CardContent>
          </Card>

          {/* Right Column - Selected Folders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Para Backup
                </div>
                <Badge variant="secondary">
                  {selectedFolders.length} carpetas
                </Badge>
              </CardTitle>
              <CardDescription>
                Estas carpetas se van a respaldar automáticamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {selectedFolders.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Arrastrá carpetas desde la izquierda para empezar
                    </p>
                  </div>
                ) : (
                  selectedFolders.map((folder, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-green-800">{folder}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFolder(folder)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {/* Destination Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Destino del backup:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={backupDestination === 'local' ? 'default' : 'outline'}
                    onClick={() => setBackupDestination('local')}
                    className="p-4 h-auto flex-col"
                  >
                    <HardDrive className="h-6 w-6 mb-2" />
                    <span>Disco Local</span>
                    <span className="text-xs opacity-70">500 GB disponibles</span>
                  </Button>
                  <Button
                    variant={backupDestination === 'cloud' ? 'default' : 'outline'}
                    onClick={() => setBackupDestination('cloud')}
                    className="p-4 h-auto flex-col"
                  >
                    <Cloud className="h-6 w-6 mb-2" />
                    <span>Nube</span>
                    <span className="text-xs opacity-70">15 GB disponibles</span>
                  </Button>
                </div>
              </div>

              {/* Backup Button */}
              {selectedFolders.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <Button 
                    onClick={startBackup}
                    disabled={isBackupRunning}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    size="lg"
                  >
                    {isBackupRunning ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Haciendo Backup...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Hacer Backup Ahora
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Último Backup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">Ayer a las 18:30</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">3 carpetas, 2.4 GB</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Próximo Backup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">Hoy a las 18:30</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Backup automático diario</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Espacio Usado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={35} className="h-2" />
                <p className="text-sm text-gray-600">175 GB de 500 GB</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BackupApp;
