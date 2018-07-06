export interface PaneSettings {
  x:number,
  y:number,
  z:number,
  width:number,
  height:number,
  depth:number,
};

export interface Hole {
  x: number,
  y: number,
  width: number,
  height: number,
  id: number,
};

export interface Block {
  x: number,
  x2: number,
  y: number,
  y2: number,
  width: number,
  height: number,
};

export interface WallSettings {
  wallWidth: number,
  wallHeight: number,
  wallThickness: number,
  holes: Array<Hole>,
};