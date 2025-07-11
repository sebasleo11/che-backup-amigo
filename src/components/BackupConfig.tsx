
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Clock, 
  Shield, 
  Mail, 
  HardDrive,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface BackupConfigProps {
  onBack: () => void;
}

const BackupConfig = ({ onBack }: BackupConfigProps) => {
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [email, setEmail] = useState('');
  const [maxBackupSize, setMaxBackupSize] = useState('100');
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);

  const handleSave = () => {
    // Simular guardado
    console.log('Configuración guardada');
    onBack();
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
            <h1 className="text-2xl font-bold text-gray-900">Configuración de Backup</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Backup Automático */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Backup Automático
              </CardTitle>
              <CardDescription>
                Configurá cuándo y cómo querés que se hagan los backups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-backup" className="text-base font-medium">
                    Activar backup automático
                  </Label>
                  <p className="text-sm text-gray-500">
                    CheBackup va a hacer copias de seguridad automáticamente
                  </p>
                </div>
                <Switch
                  id="auto-backup"
                  checked={autoBackup}
                  onCheckedChange={setAutoBackup}
                />
              </div>

              {autoBackup && (
                <div className="space-y-4 pl-4 border-l-2 border-blue-200">
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Frecuencia del backup
                    </Label>
                    <RadioGroup value={backupFrequency} onValueChange={setBackupFrequency}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily">Todos los días a las 18:30</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly">Una vez por semana (domingos)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manual" id="manual" />
                        <Label htmlFor="manual">Solo cuando yo lo pida</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notificaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-green-600" />
                Notificaciones
              </CardTitle>
              <CardDescription>
                Te avisamos si hay algún problema o cuando el backup está listo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="email-notifications" className="text-base font-medium">
                    Notificaciones por email
                  </Label>
                  <p className="text-sm text-gray-500">
                    Te mandamos un mail si algo sale mal o necesitás saberlo
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              {emailNotifications && (
                <div className="pl-4 border-l-2 border-green-200">
                  <Label htmlFor="email" className="text-base font-medium">
                    Tu email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu-email@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Límites y Espacio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDrive className="h-5 w-5 mr-2 text-purple-600" />
                Límites de Espacio
              </CardTitle>
              <CardDescription>
                Controlá cuánto espacio puede usar CheBackup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="max-size" className="text-base font-medium">
                  Tamaño máximo de backup (GB)
                </Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    id="max-size"
                    type="number"
                    value={maxBackupSize}
                    onChange={(e) => setMaxBackupSize(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-sm text-gray-500">GB</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Si tus archivos ocupan más que esto, te avisamos antes de hacer el backup
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Seguridad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-600" />
                Seguridad
              </CardTitle>
              <CardDescription>
                Protegé tus archivos con encriptación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="encryption" className="text-base font-medium">
                    Encriptación automática
                  </Label>
                  <p className="text-sm text-gray-500">
                    Tus archivos se protegen automáticamente. Solo vos podés acceder
                  </p>
                </div>
                <Switch
                  id="encryption"
                  checked={encryptionEnabled}
                  onCheckedChange={setEncryptionEnabled}
                />
              </div>

              {!encryptionEnabled && (
                <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      ¡Cuidado!
                    </p>
                    <p className="text-sm text-yellow-700">
                      Sin encriptación, tus archivos pueden ser menos seguros. Te recomendamos mantenerla activada.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button variant="outline" onClick={onBack}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Guardar Configuración
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupConfig;
