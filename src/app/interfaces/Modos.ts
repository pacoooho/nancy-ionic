export interface ModosLed {
    tipo?: number;
    intensidadMax?: number;
    intensidadMin: number;
    delayLed?: number;
    valRojo?: number;
    valVerde?: number;
    valAzul?: number;
    maxDelay?: number;
  }

  export interface ModosMotor {
    motor?: number;
    voltajeMotor?: number;
    retardoMotor?: number;
  }
  export interface Modo {
    modo?: number;    
    // estadoBlue?: number;
    // actualizado?: boolean;
  }
  
  export interface Confi {
    editaConfi?: boolean;
    editaIntensidad?: boolean; 
    editaRetardo?: boolean;
    
}
export interface Estado{
  pagina?: string;
}