declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "liquid-gl" {
  export interface LiquidGLOptions {
    target?: string | HTMLElement | HTMLElement[] | NodeListOf<Element>;
    snapshot?: string | HTMLElement;
    resolution?: number;
    engine?: 'auto' | 'webgpu' | 'webgl2' | 'webgl';
    zIndex?: number;
    content?: string;
    refraction?: number;
    aberration?: number;
    bevelDepth?: number;
    bevelWidth?: number;
    frost?: number;
    shadow?: boolean;
    specular?: boolean;
    reveal?: 'fade' | 'none';
    tilt?: boolean;
    tiltFactor?: number;
    tiltEase?: number;
    draggable?: boolean;
    interaction?: 'none' | 'fluid';
    interactionStrength?: number;
    interactionRadius?: number;
    interactionViscosity?: number;
    magnify?: number;
    tint?: string | null;
    helper?: boolean;
    on?: {
      init?: (instance: any) => void;
      dragstart?: (instance: any, info: any) => void;
      drag?: (instance: any, info: any) => void;
      dragend?: (instance: any, info: any) => void;
    };
  }

  export interface LiquidGLInstance {
    destroy: () => void;
    setTint?: (color: string) => void;
    setDraggable?: (draggable: boolean) => void;
  }

  function liquidGL(options?: LiquidGLOptions): LiquidGLInstance | LiquidGLInstance[];
  export default liquidGL;
}
